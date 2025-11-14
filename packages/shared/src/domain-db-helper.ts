/**
 * 数据库域名配置助手（服务端使用）
 * 从Prisma数据库读取域名配置
 */

import type { DomainConfig } from './domain-config'

// 这个类型需要与Prisma的DomainAlias模型匹配
export interface DomainAliasFromDB {
  id: string
  domain: string
  siteName: string
  siteDescription: string
  primaryTags: string[]
  secondaryTags: string[]
  status: string
  isPrimary: boolean
  websiteId: string
}

/**
 * 将数据库的DomainAlias转换为DomainConfig
 */
export function convertDomainAliasToDomainConfig(alias: DomainAliasFromDB): DomainConfig {
  // 映射websiteId
  let websiteId: 'website1' | 'website2' | 'websiteTg' = 'website1'

  // 这里需要根据实际的websiteId来映射
  // 您可能需要查询website表来获取正确的映射
  // 临时解决方案：基于站点名称判断
  if (alias.siteName.includes('Telegram') || alias.siteName.includes('TG') || alias.siteName.includes('纸飞机')) {
    websiteId = 'websiteTg'
  } else if (alias.siteName.includes('中文')) {
    websiteId = 'website2'
  }

  return {
    domain: alias.domain,
    siteName: alias.siteName,
    siteDescription: alias.siteDescription,
    primaryTags: alias.primaryTags,
    secondaryTags: alias.secondaryTags,
    isPrimary: alias.isPrimary,
    websiteId: websiteId,
  }
}

/**
 * 根据域名查找配置（从数据库域名列表中）
 */
export function getDomainConfigFromList(
  hostname: string,
  domainAliases: DomainAliasFromDB[]
): DomainConfig | null {
  const domain = hostname.toLowerCase()

  // 精确匹配
  let alias = domainAliases.find(
    (a) => a.domain.toLowerCase() === domain && a.status === 'ACTIVE'
  )

  // 部分匹配（用于localhost:port）
  if (!alias) {
    alias = domainAliases.find(
      (a) => domain.includes(a.domain.toLowerCase()) && a.status === 'ACTIVE'
    )
  }

  // localhost处理
  if (!alias && domain.includes('localhost')) {
    // 返回isPrimary的域名作为默认值
    alias = domainAliases.find((a) => a.isPrimary && a.status === 'ACTIVE')
  }

  return alias ? convertDomainAliasToDomainConfig(alias) : null
}

/**
 * 计算文章与域名的匹配分数
 */
export function calculateTagMatchScoreFromDB(
  articleTags: string[],
  domainAlias: DomainAliasFromDB
): number {
  let score = 0

  // 主要标签匹配：权重3
  for (const tag of articleTags) {
    if (domainAlias.primaryTags.some((pt) => tag.toLowerCase().includes(pt.toLowerCase()))) {
      score += 3
    }
  }

  // 次要标签匹配：权重1
  for (const tag of articleTags) {
    if (domainAlias.secondaryTags.some((st) => tag.toLowerCase().includes(st.toLowerCase()))) {
      score += 1
    }
  }

  return score
}
