'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 在这里添加 Google Analytics 或其他分析工具
    // 例如: gtag('config', 'GA_MEASUREMENT_ID', { page_path: pathname })
    if (pathname) {
      console.log('Page view:', pathname)
    }
  }, [pathname, searchParams])

  return null
}

// 使用示例：
// 1. 在 Google Analytics 注册并获取 Measurement ID
// 2. 在 app/layout.tsx 的 <head> 中添加 GA 脚本
// 3. 在 body 中添加 <Analytics /> 组件
