import { headers } from 'next/headers'
import { BreadcrumbJsonLd } from './JsonLd'

// 站点网络配置 - 多站点互链
const SITE_NETWORK = [
  { domain: 'telegramservice.com', name: 'Telegram中文版', desc: '中文资源站' },
  { domain: 'telegramtoolkit.com', name: 'Telegram工具箱', desc: '工具资源站' },
  { domain: 'telegranmm.com', name: 'Telegram下载', desc: 'APK下载站' },
]

// Telegram 真正的官方资源 - 外链到telegram.org (增加可信度) - 20+链接
const OFFICIAL_RESOURCES = [
  // 主要官网资源
  { url: 'https://telegram.org', name: 'Telegram官网', desc: 'Telegram Messenger官方网站', category: 'main' },
  { url: 'https://telegram.org/apps', name: '官方下载', desc: 'Telegram官方应用下载页', category: 'main' },
  { url: 'https://desktop.telegram.org', name: '桌面版', desc: 'Telegram Desktop官方下载', category: 'main' },
  { url: 'https://web.telegram.org', name: '网页版', desc: 'Telegram Web在线使用', category: 'main' },
  { url: 'https://telegram.org/blog', name: '官方博客', desc: 'Telegram官方博客和更新公告', category: 'main' },

  // 帮助与支持
  { url: 'https://telegram.org/faq', name: '帮助中心', desc: 'Telegram常见问题解答', category: 'help' },
  { url: 'https://telegram.org/faq/general', name: '基础教程', desc: 'Telegram基础使用教程', category: 'help' },
  { url: 'https://telegram.org/faq/channels-and-groups', name: '群组频道', desc: 'Telegram群组和频道使用指南', category: 'help' },
  { url: 'https://telegram.org/faq/bots', name: '机器人', desc: 'Telegram Bot使用说明', category: 'help' },
  { url: 'https://telegram.org/faq/settings', name: '设置帮助', desc: 'Telegram设置使用指南', category: 'help' },

  // 开发者资源
  { url: 'https://core.telegram.org', name: '开发者', desc: 'Telegram API开发文档', category: 'dev' },
  { url: 'https://core.telegram.org/bots', name: 'Bot开发', desc: 'Telegram Bot API文档', category: 'dev' },
  { url: 'https://core.telegram.org/api', name: 'MTProto', desc: 'Telegram MTProto协议文档', category: 'dev' },
  { url: 'https://core.telegram.org/tdlib', name: 'TDLib', desc: 'Telegram数据库库文档', category: 'dev' },

  // 隐私与安全
  { url: 'https://telegram.org/privacy', name: '隐私政策', desc: 'Telegram隐私政策', category: 'legal' },
  { url: 'https://telegram.org/tos', name: '服务条款', desc: 'Telegram服务条款', category: 'legal' },
  { url: 'https://telegram.org/faq/security', name: '安全指南', desc: 'Telegram安全功能说明', category: 'help' },

  // 特色功能
  { url: 'https://telegram.org/tour', name: '功能介绍', desc: 'Telegram功能导览', category: 'main' },
  { url: 'https://telegram.org/tour/groups', name: '超级群组', desc: 'Telegram超级群组介绍', category: 'main' },
  { url: 'https://telegram.org/tour/channels', name: '频道功能', desc: 'Telegram频道功能介绍', category: 'main' },
]

// 官方社交媒体与社区 - 增加权威性
const OFFICIAL_SOCIAL = [
  { url: 'https://twitter.com/telegram', name: 'Twitter', desc: 'Telegram官方Twitter' },
  { url: 'https://t.me/telegram', name: '官方频道', desc: 'Telegram官方公告频道' },
  { url: 'https://t.me/TelegramTips', name: '使用技巧', desc: 'Telegram官方技巧频道' },
  { url: 'https://www.facebook.com/telegram', name: 'Facebook', desc: 'Telegram官方Facebook' },
  { url: 'https://www.instagram.com/telegram', name: 'Instagram', desc: 'Telegram官方Instagram' },
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

        {/* Telegram.org官方资源链接 - 增加可信度 (20+链接) */}
        {showOfficialLinks && (
          <div className="official-links" style={{
            marginTop: '10px',
            padding: '12px 0',
            borderTop: '1px dashed #e0e0e0',
            fontSize: '12px',
            color: '#666'
          }}>
            {/* 主要官网资源 */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{ marginRight: '8px', fontWeight: 600, color: '#333' }}>Telegram官网:</span>
              {OFFICIAL_RESOURCES.filter(r => r.category === 'main').map((resource, index) => (
                <span key={resource.url}>
                  {index > 0 && <span style={{ margin: '0 5px', color: '#ddd' }}>|</span>}
                  <a
                    href={resource.url}
                    title={resource.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc', textDecoration: 'none' }}
                  >
                    {resource.name}
                  </a>
                </span>
              ))}
            </div>
            {/* 帮助与教程 */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{ marginRight: '8px', fontWeight: 600, color: '#333' }}>帮助教程:</span>
              {OFFICIAL_RESOURCES.filter(r => r.category === 'help').map((resource, index) => (
                <span key={resource.url}>
                  {index > 0 && <span style={{ margin: '0 5px', color: '#ddd' }}>|</span>}
                  <a
                    href={resource.url}
                    title={resource.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc', textDecoration: 'none' }}
                  >
                    {resource.name}
                  </a>
                </span>
              ))}
            </div>
            {/* 开发者资源 */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{ marginRight: '8px', fontWeight: 600, color: '#333' }}>开发资源:</span>
              {OFFICIAL_RESOURCES.filter(r => r.category === 'dev').map((resource, index) => (
                <span key={resource.url}>
                  {index > 0 && <span style={{ margin: '0 5px', color: '#ddd' }}>|</span>}
                  <a
                    href={resource.url}
                    title={resource.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc', textDecoration: 'none' }}
                  >
                    {resource.name}
                  </a>
                </span>
              ))}
            </div>
            {/* 法律条款 */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{ marginRight: '8px', fontWeight: 600, color: '#333' }}>政策条款:</span>
              {OFFICIAL_RESOURCES.filter(r => r.category === 'legal').map((resource, index) => (
                <span key={resource.url}>
                  {index > 0 && <span style={{ margin: '0 5px', color: '#ddd' }}>|</span>}
                  <a
                    href={resource.url}
                    title={resource.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc', textDecoration: 'none' }}
                  >
                    {resource.name}
                  </a>
                </span>
              ))}
            </div>
            {/* 官方社交媒体 */}
            <div>
              <span style={{ marginRight: '8px', fontWeight: 600, color: '#333' }}>关注官方:</span>
              {OFFICIAL_SOCIAL.map((social, index) => (
                <span key={social.url}>
                  {index > 0 && <span style={{ margin: '0 5px', color: '#ddd' }}>|</span>}
                  <a
                    href={social.url}
                    title={social.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0088cc', textDecoration: 'none' }}
                  >
                    {social.name}
                  </a>
                </span>
              ))}
            </div>
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
