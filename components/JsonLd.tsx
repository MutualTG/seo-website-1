export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Telegram TGM',
    description: '专业的 Telegram 营销服务平台',
    url: 'https://www.telegramtgm.com',
    logo: 'https://www.telegramtgm.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['zh-CN', 'en'],
    },
    sameAs: [
      'https://t.me/telegramtgm',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1000',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CNY',
      lowPrice: '999',
      highPrice: '9999',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
