export default function Features() {
  const features = [
    {
      title: '快速增长',
      description: '利用专业的推广渠道和策略，帮助您的频道快速获得订阅者',
      stat: '500%',
      label: '平均增长率',
    },
    {
      title: '真实用户',
      description: '所有会员都是真实活跃用户，保证高质量的互动和转化',
      stat: '100%',
      label: '真实用户',
    },
    {
      title: '数据透明',
      description: '提供详细的数据报告，让您随时掌握推广效果',
      stat: '24/7',
      label: '实时监控',
    },
    {
      title: '安全保障',
      description: '严格遵守 Telegram 规则，保证账号安全',
      stat: '0',
      label: '封号风险',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">为什么选择我们</h2>
          <p className="text-xl text-gray-600">专业、可靠、高效的营销服务</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-telegram-blue/10 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-telegram-blue">{feature.stat}</div>
                  <div className="text-sm text-telegram-dark">{feature.label}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
