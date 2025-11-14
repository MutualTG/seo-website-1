'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      category: '下载安装',
      question: '什么是Telegram（电报）？',
      answer: 'Telegram是一款免费、安全、快速的即时通讯应用。它支持端到端加密的秘密聊天、云端消息同步、大文件传输、群组和频道功能。Telegram在全球拥有超过7亿活跃用户，以隐私保护和功能强大著称。',
    },
    {
      category: '下载安装',
      question: 'Telegram支持哪些平台？',
      answer: 'Telegram支持几乎所有主流平台：iOS（iPhone/iPad）、Android、Windows、macOS、Linux，以及网页版。您可以在多个设备上同时登录，消息会实时同步到所有设备。',
    },
    {
      category: '下载安装',
      question: '如何下载和安装Telegram？',
      answer: '访问我们的下载页面，选择您的设备平台。iOS用户可从App Store下载，Android用户可从Google Play或我们提供的APK下载，桌面用户可以直接下载安装包。安装过程简单，只需几分钟即可完成。',
    },
    {
      category: '下载安装',
      question: 'Telegram是免费的吗？',
      answer: '是的，Telegram完全免费。没有广告，没有订阅费用，所有功能都可以免费使用。Telegram由其创始人Pavel Durov资助，承诺永久免费。',
    },
    {
      category: '使用相关',
      question: '如何注册Telegram账号？',
      answer: '下载并打开Telegram后，输入您的手机号码，系统会发送验证码短信。输入验证码后，设置您的姓名和头像即可完成注册。整个过程不超过1分钟。',
    },
    {
      category: '使用相关',
      question: 'Telegram中文版如何设置？',
      answer: '打开Telegram，进入设置（Settings）→ 语言（Language），选择"简体中文"或"繁体中文"即可。部分第三方客户端已内置中文界面。',
    },
    {
      category: '使用相关',
      question: '如何添加好友和创建群组？',
      answer: '添加好友：通过手机号、用户名或二维码搜索添加。创建群组：点击"新建群组"，选择联系人，设置群组名称即可。Telegram群组支持最多20万成员。',
    },
    {
      category: '使用相关',
      question: '什么是频道（Channel）？如何创建？',
      answer: '频道是单向广播工具，适合发布消息给大量订阅者。点击"新建频道"，设置频道名称、简介，选择公开或私密。频道可以有无限订阅者，是内容分发的最佳选择。',
    },
    {
      category: '功能特性',
      question: 'Telegram的"秘密聊天"是什么？',
      answer: '秘密聊天提供端到端加密，只有对话双方可以阅读消息。消息不会存储在云端，支持自毁功能，可设置消息在查看后自动删除。秘密聊天无法转发，保护隐私最强。',
    },
    {
      category: '功能特性',
      question: 'Telegram可以传输多大的文件？',
      answer: 'Telegram支持传输最大2GB的单个文件，几乎没有文件类型限制。可以发送视频、文档、压缩包等任何格式的文件。文件会永久保存在云端，随时可以下载。',
    },
    {
      category: '功能特性',
      question: '什么是Telegram Bot（机器人）？',
      answer: 'Bot是自动化程序，可以提供各种服务：翻译、天气查询、新闻订阅、游戏等。您可以在聊天中@Bot名称来使用，或将Bot添加到群组提供自动化功能。',
    },
    {
      category: '功能特性',
      question: 'Telegram的贴纸和表情包如何使用？',
      answer: 'Telegram有丰富的贴纸库。点击聊天输入框的笑脸图标，选择"添加贴纸"，搜索并添加您喜欢的贴纸包。您也可以创建自己的贴纸包分享给他人。',
    },
    {
      category: '安全隐私',
      question: 'Telegram安全吗？',
      answer: '非常安全。Telegram使用MTProto加密协议，秘密聊天采用端到端加密。服务器分布在全球多个国家，数据分片存储。Telegram从未向任何政府提供过用户数据。',
    },
    {
      category: '安全隐私',
      question: '如何设置两步验证？',
      answer: '进入设置 → 隐私与安全 → 两步验证，设置一个密码。启用后，登录新设备时需要输入密码，大大提高账号安全性。建议所有用户开启此功能。',
    },
    {
      category: '安全隐私',
      question: '如何保护我的隐私？',
      answer: 'Telegram提供丰富的隐私设置：隐藏手机号、最后上线时间、头像可见性等。进入设置 → 隐私与安全，可详细配置谁能看到您的信息、添加您、呼叫您等。',
    },
    {
      category: '常见问题',
      question: 'Telegram和WhatsApp/微信有什么区别？',
      answer: 'Telegram优势：无文件大小限制、强大的群组和频道功能、开放的Bot平台、更好的隐私保护、无广告、跨平台同步。适合重视隐私和需要大文件传输的用户。',
    },
    {
      category: '常见问题',
      question: '为什么有时候无法访问Telegram？',
      answer: '部分地区可能需要使用代理或VPN访问。Telegram提供内置代理功能，您可以在设置中配置。也可以使用第三方代理服务。',
    },
    {
      category: '常见问题',
      question: '换手机号码后如何迁移账号？',
      answer: '进入设置 → 更改手机号码，输入新号码并验证。所有数据（联系人、聊天记录、群组）会自动迁移到新号码，联系人会看到您更新的号码。',
    },
  ]

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-telegram-blue pb-2">
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq)
                    const isOpen = openIndex === globalIndex
                    return (
                      <div
                        key={globalIndex}
                        className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-telegram-blue transition"
                      >
                        <button
                          className="w-full px-6 py-4 text-left flex items-center justify-between"
                          onClick={() => toggleFAQ(globalIndex)}
                        >
                          <span className="font-semibold text-lg text-gray-800">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-6 h-6 text-telegram-blue transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}

          {/* Download CTA */}
          <div className="mt-16 bg-gradient-to-r from-telegram-blue to-telegram-light text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">准备好开始使用Telegram了吗？</h3>
            <p className="mb-6 text-lg opacity-90">
              免费下载，立即体验安全、快速的即时通讯
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/download"
                className="bg-white text-telegram-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
              >
                立即下载
              </a>
              <a
                href="/blog"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-telegram-blue transition inline-block"
              >
                查看使用教程
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
