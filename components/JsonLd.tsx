import { headers } from 'next/headers'
import { getDomainSEOMetadata } from '@/lib/get-website-by-domain'

export default async function JsonLd() {
  // 动态获取当前域名的SEO信息
  const headersList = await headers()
  const host = headersList.get('host') || 'www.telegramtgm.com'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const siteUrl = `${protocol}://${host}`

  // 获取域名对应的SEO配置
  const seo = await getDomainSEOMetadata()
  const siteName = seo.title
  const siteDescription = seo.description
  // WebSite Schema - 增加搜索功能
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    alternateName: ['Telegram', 'TG', '电报', '纸飞机'],
    url: siteUrl,
    description: siteDescription,
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Organization Schema - 第三方资源站，不声称与Telegram官方有关联
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    description: `${siteDescription} - 本站为第三方资源站，非Telegram官方网站`,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['zh-CN', 'en'],
      areaServed: 'CN',
    },
    // 不再声称与Telegram官方社交媒体有关联
  }

  // SoftwareApplication Schema - 用于下载页SEO
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Telegram',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: ['Android', 'iOS', 'Windows', 'macOS', 'Linux'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000000',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'Telegram是一款快速、安全的即时通讯应用，支持端到端加密、云同步、群组聊天等功能。',
    downloadUrl: `${siteUrl}/download`,
    softwareVersion: '10.0',
    author: {
      '@type': 'Organization',
      name: 'Telegram Messenger LLP',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  )
}

// 博客文章Schema组件
interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  siteName?: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = 'Telegram Team',
  siteName = 'Telegram中文资源站',
}: ArticleJsonLdProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl || `${url.split('/blog')[0]}/og-image.png`,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${url.split('/blog')[0]}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'zh-CN',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}

// 面包屑Schema组件
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// FAQ Schema组件
interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  faqs: FAQItem[]
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}
