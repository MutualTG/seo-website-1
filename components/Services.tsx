export default function Services() {
  const features = [
    {
      image: '/1.gif',
      title: '简单',
      description: ['Telegram是如此简单', '你已经知道如何使用它了。'],
    },
    {
      image: '/2.gif',
      title: '私密',
      description: ['电报中文版消息经过严格加密', '可以随时自毁。'],
    },
    {
      image: '/3.gif',
      title: '同步',
      description: ['TG下载支持从所有平台设备', '对聊天记录访问。'],
    },
    {
      image: '/4.gif',
      title: '快速',
      description: ['TG中文版比其他同行软件', '更快捷的传递消息。'],
    },
    {
      image: '/5.gif',
      title: '强大',
      description: ['Telegram对所有类型', '文件和消息大小无限制。'],
    },
    {
      image: '/6.gif',
      title: '开放',
      description: ['Telegram免费提供开放', 'API和源代码进行开发。'],
    },
    {
      image: '/7.gif',
      title: '安全',
      description: ['电报对所有类型', '文件和消息大小无限制。'],
    },
    {
      image: '/8.gif',
      title: '社交',
      description: ['Telegram可以隔离黑客攻击', '保护信息和邮件安全。'],
    },
    {
      image: '/9.gif',
      title: '趣味',
      description: ['电报中文可以发掘兴趣', '入开放、多元的平台。'],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">什么是Telegram中文版</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition"
            >
              <div className="mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 text-center">{feature.title}</h3>
              <div className="text-gray-600 text-center">
                {feature.description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
