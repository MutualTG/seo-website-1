/**
 * 根据访问域名动态获取Website和域名配置
 *
 * 这个函数实现了多域名管理的核心逻辑：
 * 1. 从请求头中获取当前访问的域名
 * 2. 查询DomainAlias表，找到域名对应的Website
 * 3. 返回Website信息和该域名的SEO配置
 *
 * 这样就能实现：
 * - 同一个服务器项目绑定多个域名
 * - 每个域名可以有不同的SEO配置（蜘蛛池策略）
 * - Admin端统一管理所有域名和网站的关系
 */

import { prisma } from '@repo/database'
import { headers } from 'next/headers'
import type { Website, DomainAlias } from '@prisma/client'

export interface WebsiteWithDomain {
  website: Website
  domainConfig: DomainAlias | null
}

/**
 * 根据当前访问的域名获取Website和域名配置
 */
export async function getWebsiteByDomain(): Promise<WebsiteWithDomain | null> {
  try {
    // 获取当前请求的域名
    const headersList = await headers()
    const host = headersList.get('host') || ''

    // 移除端口号（如果有）
    const domain = host.split(':')[0]

    console.log(`[getWebsiteByDomain] 当前访问域名: ${domain}`)

    // 查询域名配置
    const domainConfig = await prisma.domainAlias.findFirst({
      where: {
        domain: {
          equals: domain,
          mode: 'insensitive' // 不区分大小写
        }
      },
      include: {
        website: true
      }
    })

    if (domainConfig) {
      console.log(`[getWebsiteByDomain] ✅ 找到域名配置: ${domainConfig.domain} → ${domainConfig.website.name}`)
      return {
        website: domainConfig.website,
        domainConfig: domainConfig
      }
    }

    // 如果没找到域名配置，尝试通过环境变量兜底
    console.log(`[getWebsiteByDomain] ⚠️  未找到域名配置，使用环境变量兜底`)
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Demo Website 1'

    const website = await prisma.website.findFirst({
      where: {
        OR: [
          { name: { contains: siteName } },
          { domain: { contains: domain } }
        ]
      }
    })

    if (website) {
      console.log(`[getWebsiteByDomain] ✅ 通过环境变量找到网站: ${website.name}`)
      return {
        website,
        domainConfig: null
      }
    }

    console.log(`[getWebsiteByDomain] ❌ 未找到任何网站配置`)
    return null

  } catch (error) {
    console.error('[getWebsiteByDomain] 错误:', error)
    return null
  }
}

/**
 * 获取当前域名的SEO元数据
 */
export async function getDomainSEOMetadata() {
  const result = await getWebsiteByDomain()

  if (!result) {
    return {
      title: 'Telegram官网',
      description: 'Telegram官方网站'
    }
  }

  const { domainConfig, website } = result

  // 优先使用域名配置的SEO信息
  if (domainConfig) {
    return {
      title: domainConfig.siteName || website.name,
      description: domainConfig.siteDescription || `${website.name} - 官方网站`,
      keywords: [...(domainConfig.primaryTags || []), ...(domainConfig.secondaryTags || [])].join(', ')
    }
  }

  // 兜底使用Website的基本信息
  return {
    title: website.name,
    description: `${website.name} - 官方网站`
  }
}
