import { prisma } from '@repo/database'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import DownloadClient from './DownloadClient'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// 下载页跳转地址 - 统一跳转到独立下载站
const DOWNLOAD_SITE_URL = 'https://adminapihub.xyz'

async function getDownloadUrl() {
  // 直接返回下载站地址，不再依赖数据库
  // 这样可以确保即使数据库连接失败也能正常跳转
  return DOWNLOAD_SITE_URL
}

export default async function DownloadPage() {
  const downloadUrl = await getDownloadUrl()

  return <DownloadClient downloadUrl={downloadUrl} />
}
