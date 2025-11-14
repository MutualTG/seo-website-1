'use client'

import { useEffect } from 'react'

const DOWNLOAD_URL = 'https://github.com/onedeploy1010/seo-websites-monorepo/releases/download/v1.0.8/app.2.apk'

export default function DownloadPage() {
  useEffect(() => {
    // 自动跳转到下载页面
    window.location.href = DOWNLOAD_URL
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-telegram-light to-telegram-blue">
      <div className="text-center text-white p-8">
        <div className="mb-6">
          <svg className="animate-spin h-16 w-16 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">正在跳转到下载页面...</h1>
        <p className="text-lg mb-6">如果没有自动跳转，请点击下面的链接：</p>
        <a
          href={DOWNLOAD_URL}
          className="inline-block bg-white text-telegram-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          点击下载 Telegram APK
        </a>
      </div>
    </div>
  )
}
