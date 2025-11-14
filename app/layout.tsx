import type { Metadata } from 'next'
import './globals.css'
import { getDomainSEOMetadata } from '@/lib/get-website-by-domain'

// 动态生成SEO元数据，根据访问的域名
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getDomainSEOMetadata()

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="/bootstrap.min.css" rel="stylesheet" />
        <link href="/telegram.css" rel="stylesheet" media="screen" />
        <link href="/style.css" rel="stylesheet" media="screen" />
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
                <h5>Telegram</h5>
                <div className="footer_telegram_description">
                  Telegram中文版是一款安全、快速的即时通讯应用，支持多设备同步、端到端加密，提供丰富的聊天功能和全球用户社群。
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
