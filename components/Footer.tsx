import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold">Telegram</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Telegram Hub - 您的Telegram中文资源中心，提供最新功能介绍、使用教程和实用技巧，帮助您更好地使用Telegram。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">应用下载</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">博客文章</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">常见问题</Link></li>
            </ul>
          </div>

          {/* Platform Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">平台支持</h4>
            <ul className="space-y-2">
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">Android / iOS</Link></li>
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">Windows / Mac / Linux</Link></li>
              <li><a href="https://web.telegram.org/" className="text-gray-400 hover:text-white transition text-sm" target="_blank" rel="noopener noreferrer">Web 版本</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">资源</h4>
            <ul className="space-y-2">
              <li><a href="https://core.telegram.org/api" className="text-gray-400 hover:text-white transition text-sm" target="_blank" rel="noopener noreferrer">API 文档</a></li>
              <li><a href="https://translations.telegram.org/" className="text-gray-400 hover:text-white transition text-sm" target="_blank" rel="noopener noreferrer">翻译平台</a></li>
              <li><Link href="/sitemap.xml" className="text-gray-400 hover:text-white transition text-sm">网站地图</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm mb-2">本站为第三方Telegram资源站，非Telegram官方网站。Telegram商标归Telegram Messenger LLP所有。</p>
          <p className="text-sm">Copyright@2025 Telegram Hub &amp; All Rights Reserved. <Link href="/sitemap.xml" className="hover:text-white transition">SITEMAP</Link></p>
        </div>
      </div>
    </footer>
  )
}
