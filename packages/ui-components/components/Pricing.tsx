export default function Pricing() {
  const plans = [
    {
      name: '基础版',
      price: '￥999',
      period: '/月',
      features: [
        '1000+ 真实订阅者',
        '基础数据分析',
        '7x24 客户支持',
        '内容发布建议',
      ],
      popular: false,
    },
    {
      name: '专业版',
      price: '￥2999',
      period: '/月',
      features: [
        '5000+ 真实订阅者',
        '高级数据分析',
        '优先客户支持',
        '专业内容策划',
        '社群管理服务',
        '定制化推广方案',
      ],
      popular: true,
    },
    {
      name: '企业版',
      price: '定制',
      period: '',
      features: [
        '无限订阅者增长',
        '全方位数据分析',
        '专属客户经理',
        '完整内容营销',
        '全面社群运营',
        '定制化解决方案',
        '多频道管理',
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">价格方案</h2>
          <p className="text-xl text-gray-600">选择最适合您的服务套餐</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-4 ring-telegram-blue transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-telegram-blue text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  最受欢迎
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-semibold transition ${
                  plan.popular
                    ? 'bg-telegram-blue text-white hover:bg-telegram-dark'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                立即购买
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
