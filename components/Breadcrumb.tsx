import { headers } from 'next/headers'
import { BreadcrumbJsonLd } from './JsonLd'

// 站点网络配置 - 多站点互链
const SITE_NETWORK = [
  { domain: 'telegramservice.com', name: 'Telegram中文版', desc: '中文资源站' },
  { domain: 'telegramtoolkit.com', name: 'Telegram工具箱', desc: '工具资源站' },
  { domain: 'telegranmm.com', name: 'Telegram下载', desc: 'APK下载站' },
]

// Telegram 真正的官方资源 - 外链到telegram.org
const OFFICIAL_RESOURCES = [
  { url: 'https://telegram.org', name: 'Telegram.org' },
  { url: 'https://desktop.telegram.org', name: '桌面版' },
  { url: 'https://web.telegram.org', name: '网页版' },
]

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showSiteNetwork?: boolean
  showOfficialLinks?: boolean
}

export default async function Breadcrumb({
  items,
  showSiteNetwork = true,
  showOfficialLinks = true
}: BreadcrumbProps) {
  // 优先使用环境变量中的站点URL，避免localhost问题
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3001'

  // 如果配置了NEXT_PUBLIC_SITE_URL，使用它；否则从header构建
  const siteUrl = configuredSiteUrl || `https://${host}`

  // 从配置的URL或host中提取域名用于过滤
  const currentDomain = configuredSiteUrl
    ? new URL(configuredSiteUrl).hostname
    : host.split(':')[0]

  // 构建完整URL的面包屑
  const fullItems = items.map(item => ({
    ...item,
    url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
  }))

  // 过滤掉当前站点，只显示其他站点
  const otherSites = SITE_NETWORK.filter(site => {
    // 精确匹配：当前域名不能包含站点域名，且站点域名也不能包含当前域名
    return site.domain !== currentDomain && !currentDomain.includes(site.domain) && !site.domain.includes(currentDomain.replace('www.', ''))
  })

  return (
    <>
      {/* Schema.org 面包屑结构化数据 */}
      <BreadcrumbJsonLd items={fullItems} />

      <nav aria-label="Breadcrumb" className="breadcrumb-nav" style={{
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        marginBottom: '20px'
      }}>
        {/* 主面包屑导航 */}
        <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '14px'
        }}>
          {fullItems.map((item, index) => (
            <li
              key={item.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {index > 0 && (
                <span style={{ margin: '0 8px', color: '#999' }}>/</span>
              )}
              {index === fullItems.length - 1 ? (
                <span itemProp="name" style={{ color: '#333' }}>{item.name}</span>
              ) : (
                <a
                  href={item.url}
                  itemProp="item"
                  style={{ color: '#0088cc', textDecoration: 'none' }}
                >
                  <span itemProp="name">{item.name}</span>
                </a>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>

        {/* 多站点互链区域 */}
        {showSiteNetwork && otherSites.length > 0 && (
          <div className="site-network" style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px dashed #eee',
            fontSize: '12px',
            color: '#666'
          }}>
            <span style={{ marginRight: '8px' }}>相关站点:</span>
            {otherSites.map((site, index) => (
              <span key={site.domain}>
                {index > 0 && <span style={{ margin: '0 6px', color: '#ccc' }}>|</span>}
                <a
                  href={`https://${site.domain}`}
                  title={site.desc}
                  target="_blank"
                  rel="noopener"
                  style={{ color: '#0088cc', textDecoration: 'none' }}
                >
                  {site.name}
                </a>
              </span>
            ))}
          </div>
        )}

        {/* Telegram.org官方资源链接 */}
        {showOfficialLinks && (
          <div className="official-links" style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#888'
          }}>
            <span style={{ marginRight: '8px' }}>Telegram.org:</span>
            {OFFICIAL_RESOURCES.map((resource, index) => (
              <span key={resource.url}>
                {index > 0 && <span style={{ margin: '0 6px', color: '#ccc' }}>|</span>}
                <a
                  href={resource.url}
                  title={resource.name}
                  target="_blank"
                  rel="noopener"
                  style={{ color: '#0088cc', textDecoration: 'none' }}
                >
                  {resource.name}
                </a>
              </span>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}

// 简化版面包屑 - 用于文章页
export function ArticleBreadcrumb({
  categoryName = '博客',
  articleTitle
}: {
  categoryName?: string
  articleTitle: string
}) {
  const items = [
    { name: '首页', url: '/' },
    { name: categoryName, url: '/blog' },
    { name: articleTitle.length > 30 ? articleTitle.substring(0, 30) + '...' : articleTitle, url: '#' }
  ]

  return <Breadcrumb items={items} />
}

// 下载页面包屑
export function DownloadBreadcrumb() {
  const items = [
    { name: '首页', url: '/' },
    { name: 'Telegram下载', url: '/download' }
  ]

  return <Breadcrumb items={items} showOfficialLinks={true} />
}
