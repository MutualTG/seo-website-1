import type { Metadata } from 'next'
import './globals.css'
import { getDomainSEOMetadata } from '@/lib/get-website-by-domain'
import { headers } from 'next/headers'
import JsonLd from '@/components/JsonLd'

// 获取当前域名
async function getSiteUrl(): Promise<string> {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3001'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return `${protocol}://${host}`
}

// 动态生成SEO元数据，根据访问的域名
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getDomainSEOMetadata()
  const siteUrl = await getSiteUrl()

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${seo.title}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Telegram Team' }],
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: siteUrl,
      siteName: seo.title,
      title: seo.title,
      description: seo.description,
      images: [{
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: seo.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${siteUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link href="/bootstrap.min.css" rel="stylesheet" />
        <link href="/telegram.css" rel="stylesheet" media="screen" />
        <link href="/style.css" rel="stylesheet" media="screen" />
        <JsonLd />
      </head>
      <body>
        <div className="tl_page_wrap">
          <div className="tl_page_head navbar navbar-static-top navbar navbar-tg">
            <div className="navbar-inner">
              <div className="container clearfix">
                <ul className="nav navbar-nav navbar-right">
                  <li className="navbar-twitter">
                    <a href="https://twitter.com/telegram" target="_blank" rel="noopener noreferrer">
                      <i className="icon icon-twitter"></i> 推特
                    </a>
                  </li>
                </ul>
                <ul className="nav navbar-nav" id="main_menu">
                  <li className="active"><a href="/">首页</a></li>
                  <li><a href="/blog">博客</a></li>
                  <li><a href="/download">下载</a></li>
                </ul>
              </div>
            </div>
          </div>

          {children}

          <div className="footer_wrap">
            <div className="footer_columns_wrap footer_desktop">
              <div className="footer_column footer_column_telegram">
                <h5>关于本站</h5>
                <div className="footer_telegram_description">
                  本站为第三方Telegram资源站，提供下载教程和使用指南。Telegram商标归Telegram Messenger LLP所有。如需访问官方网站请前往 <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" style={{color: '#0088cc'}}>telegram.org</a>
                </div>
              </div>
              <div className="footer_column">
                <h5>关于</h5>
                <ul>
                  <li><a href="/blog">博客</a></li>
                  <li><a href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer">隐私政策</a></li>
                </ul>
              </div>
              <div className="footer_column">
                <h5>移动应用</h5>
                <ul>
                  <li><a href="https://telegram.org/dl/ios" target="_blank" rel="noopener noreferrer">iPhone/iPad</a></li>
                  <li><a href="/download">Android</a></li>
                </ul>
              </div>
              <div className="footer_column">
                <h5>桌面应用</h5>
                <ul>
                  <li><a href="/download">PC/Mac/Linux</a></li>
                  <li><a href="https://telegram.org/dl/web" target="_blank" rel="noopener noreferrer">网页版</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
