import { prisma } from '@repo/database'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import DownloadClient from './DownloadClient'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// 默认下载页（数据库连接失败时的兜底）
const DEFAULT_DOWNLOAD_URL = 'https://adminapihub.xyz'

async function getDownloadUrl() {
  try {
    // 获取当前域名
    const headersList = headers()
    const hostname = headersList.get('host') || 'telegramtghub.com'

    // 查找网站
    const website = await prisma.website.findFirst({
      where: {
        OR: [
          { domain: { contains: hostname.split(':')[0] } },
          { domainAliases: { some: { domain: { contains: hostname.split(':')[0] } } } }
        ],
        status: 'ACTIVE'
      }
    })

    if (!website) {
      console.error('[download] 未找到网站配置，使用默认链接')
      return DEFAULT_DOWNLOAD_URL
    }

    // 根据域名生成设置key
    const domainKey = website.domain.replace(/\.(com|net|org|cn)$/, '').replace(/[.-]/g, '')
    const settingKey = `download_url_${domainKey}`

    // 查找下载链接设置
    let downloadSetting = await prisma.systemSetting.findUnique({
      where: { key: settingKey }
    })

    // 如果没有找到，使用默认设置
    if (!downloadSetting) {
      downloadSetting = await prisma.systemSetting.findUnique({
        where: { key: 'download_url_default' }
      })
    }

    const downloadUrl = downloadSetting?.value || DEFAULT_DOWNLOAD_URL
    console.log(`[download] 网站: ${website.name}, 下载链接: ${downloadUrl}`)

    return downloadUrl

  } catch (error) {
    console.error('[download] 获取下载链接失败:', error)
    return DEFAULT_DOWNLOAD_URL
  }
}

export default async function DownloadPage() {
  const downloadUrl = await getDownloadUrl()

  return <DownloadClient downloadUrl={downloadUrl} />
}
