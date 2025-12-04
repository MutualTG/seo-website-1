export default function DownloadSection() {
  const platforms = [
    {
      name: 'Windows',
      icon: '💻',
      description: 'Windows 7 及以上版本',
      downloads: [
        { label: 'Windows 64-bit', url: 'https://telegram.org/dl/desktop/win64' },
        { label: 'Windows 32-bit', url: 'https://telegram.org/dl/desktop/win' },
        { label: 'Windows Portable', url: 'https://telegram.org/dl/desktop/win_portable' },
      ],
    },
    {
      name: 'macOS',
      icon: '🍎',
      description: 'macOS 10.13 及以上版本',
      downloads: [
        { label: 'Mac App Store', url: 'https://telegram.org/dl/macos' },
        { label: '直接下载', url: 'https://telegram.org/dl/desktop/mac' },
      ],
    },
    {
      name: 'Linux',
      icon: '🐧',
      description: '支持多种 Linux 发行版',
      downloads: [
        { label: 'Linux 64-bit', url: 'https://telegram.org/dl/desktop/linux' },
        { label: 'Flatpak', url: 'https://flathub.org/apps/details/org.telegram.desktop' },
        { label: 'Snap', url: 'https://snapcraft.io/telegram-desktop' },
      ],
    },
    {
      name: 'iOS',
      icon: '📱',
      description: 'iPhone 和 iPad',
      downloads: [
        { label: 'App Store 下载', url: 'https://telegram.org/dl/ios' },
      ],
    },
    {
      name: 'Android',
      icon: '🤖',
      description: 'Android 5.0 及以上版本',
      downloads: [
        { label: 'Google Play', url: 'https://telegram.org/dl/android' },
        { label: 'APK 直接下载', url: 'https://telegranmm.com' },
      ],
    },
    {
      name: 'Web',
      icon: '🌐',
      description: '无需安装，浏览器直接使用',
      downloads: [
        { label: 'Telegram Web', url: 'https://web.telegram.org' },
        { label: 'Telegram WebK', url: 'https://webk.telegram.org' },
        { label: 'Telegram WebZ', url: 'https://webz.telegram.org' },
      ],
    },
  ]

  const features = [
    {
      icon: '🔒',
      title: '安全加密',
      description: '端到端加密，保护您的隐私',
    },
    {
      icon: '⚡',
      title: '超快速度',
      description: '全球分布式服务器，传输速度极快',
    },
    {
      icon: '☁️',
      title: '云端同步',
      description: '所有设备无缝同步，随时访问',
    },
    {
      icon: '📦',
      title: '无限存储',
      description: '文件大小无限制，免费云存储',
    },
    {
      icon: '🎨',
      title: '强大功能',
      description: '群组、频道、机器人等丰富功能',
    },
    {
      icon: '🆓',
      title: '完全免费',
      description: '无广告，无订阅费用',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            为什么选择 Telegram？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Platforms */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            选择您的平台
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-telegram-blue hover:shadow-lg transition"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{platform.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{platform.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                </div>
                <div className="space-y-2">
                  {platform.downloads.map((download, downloadIndex) => (
                    <a
                      key={downloadIndex}
                      href={download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-telegram-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-telegram-dark transition"
                    >
                      {download.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                手机扫码下载
              </h3>
              <p className="text-gray-600 mb-6">
                使用手机扫描二维码，快速下载 Telegram 移动应用
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">支持 iOS 和 Android</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">快速安装，简单便捷</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">正版下载，安全可靠</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">📱</span>
                </div>
                <p className="text-center mt-4 text-sm text-gray-600">
                  扫描二维码下载
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">需要帮助？</h3>
          <p className="text-gray-600 mb-6">
            如果您在下载或安装过程中遇到问题，请查看我们的常见问题解答或使用教程
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/faq"
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              查看 FAQ
            </a>
            <a
              href="/blog"
              className="bg-telegram-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-telegram-dark transition"
            >
              使用教程
            </a>
            <a
              href="https://telegram.org/support"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              技术支持
            </a>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">系统要求</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-gray-800">桌面版</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Windows 7 或更高版本</li>
                <li>• macOS 10.13 或更高版本</li>
                <li>• Linux（64 位）</li>
                <li>• 至少 100 MB 可用磁盘空间</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-gray-800">移动版</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• iOS 12.0 或更高版本</li>
                <li>• Android 5.0 或更高版本</li>
                <li>• 至少 50 MB 可用存储空间</li>
                <li>• 稳定的网络连接</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
