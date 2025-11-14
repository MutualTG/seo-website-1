import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold">Telegram</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Telegram中文版是一款功能丰富的即时通讯应用，提供端到端加密的私密聊天，支持创建大型群组和频道。
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">关于</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">FQA</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Mobile Apps */}
          <div>
            <h4 className="font-bold text-lg mb-4">移动应用</h4>
            <ul className="space-y-2">
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">Android</Link></li>
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">iPhone/iPad</Link></li>
              <li><a href="https://web.telegram.org/k/" className="text-gray-400 hover:text-white transition text-sm">Mobile Web</a></li>
            </ul>
          </div>

          {/* Desktop Apps */}
          <div>
            <h4 className="font-bold text-lg mb-4">桌面应用</h4>
            <ul className="space-y-2">
              <li><Link href="/download" className="text-gray-400 hover:text-white transition text-sm">PC/Mac/Linux</Link></li>
              <li><a href="https://telegram.org/dl/macos" className="text-gray-400 hover:text-white transition text-sm">macOS</a></li>
              <li><a href="https://web.telegram.org/a/" className="text-gray-400 hover:text-white transition text-sm">Web browser</a></li>
            </ul>
          </div>

          {/* Open Platform */}
          <div>
            <h4 className="font-bold text-lg mb-4">开放平台</h4>
            <ul className="space-y-2">
              <li><a href="https://core.telegram.org/api" className="text-gray-400 hover:text-white transition text-sm">API</a></li>
              <li><a href="https://translations.telegram.org/" className="text-gray-400 hover:text-white transition text-sm">翻译</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm">Copyright@2025 Telegram中文版 &amp; All Rights Reserved. <Link href="/sitemap.xml" className="hover:text-white transition">SITEMAP</Link></p>
        </div>
      </div>
    </footer>
  )
}
