#!/usr/bin/env npx ts-node
/**
 * 自动SEO Agent
 *
 * 定时执行以下任务：
 * 1. 分析竞争对手网站
 * 2. 生成SEO优化建议
 * 3. 自动创建高质量文章
 * 4. 触发VPS重新部署
 *
 * 使用方法:
 *   npx ts-node auto-seo-agent.ts
 *   或配置cron定时执行
 */

import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'

import {
  analyzeAllCompetitors,
  generateArticleSuggestions,
  exportReportAsMarkdown,
  type CompetitorReport,
} from './competitor-analyzer'

import {
  generateArticles,
  generateFromSuggestions,
} from './article-generator'

const execAsync = promisify(exec)
const prisma = new PrismaClient()

// 配置
const CONFIG = {
  // VPS配置
  vps: {
    host: '107.175.126.174',
    user: 'root',
    password: 'TGura4V59k5h7UH6iV',
    projectPaths: [
      '/www/wwwroot/telegranmservice',
      '/www/wwwroot/telegramtoolkit',
    ],
  },
  // 文章生成配置
  articles: {
    minPerRun: 5,    // 每次最少生成文章数
    maxPerRun: 15,   // 每次最多生成文章数
  },
  // 报告保存路径
  reportPath: './seo-reports',
  // 日志配置
  logFile: './seo-agent.log',
}

/**
 * 写入日志
 */
function log(message: string, level: 'INFO' | 'ERROR' | 'WARN' = 'INFO') {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level}] ${message}`
  console.log(logMessage)

  try {
    fs.appendFileSync(CONFIG.logFile, logMessage + '\n')
  } catch (e) {
    // 忽略日志写入错误
  }
}

/**
 * 执行SSH命令
 */
async function sshCommand(command: string): Promise<string> {
  const { host, user, password } = CONFIG.vps
  const sshCmd = `sshpass -p '${password}' ssh -o StrictHostKeyChecking=no ${user}@${host} "${command}"`

  try {
    const { stdout, stderr } = await execAsync(sshCmd, { timeout: 120000 })
    if (stderr && !stderr.includes('Warning')) {
      log(`SSH stderr: ${stderr}`, 'WARN')
    }
    return stdout
  } catch (error: any) {
    log(`SSH命令失败: ${error.message}`, 'ERROR')
    throw error
  }
}

/**
 * 重新构建和部署网站
 */
async function deployToVPS(): Promise<boolean> {
  log('开始部署到VPS...')

  try {
    for (const projectPath of CONFIG.vps.projectPaths) {
      log(`部署: ${projectPath}`)

      // 拉取最新代码
      await sshCommand(`cd ${projectPath} && git pull origin main 2>&1 || echo 'No git changes'`)

      // 安装依赖
      await sshCommand(`cd ${projectPath} && npm install 2>&1`)

      // 构建项目
      const buildResult = await sshCommand(`cd ${projectPath} && npm run build 2>&1`)
      log(`构建结果: ${buildResult.substring(0, 200)}...`)

      // 重启PM2进程
      const appName = path.basename(projectPath)
      await sshCommand(`pm2 restart ${appName} 2>&1 || pm2 start npm --name ${appName} -- start`)

      log(`✓ ${projectPath} 部署完成`)
    }

    return true
  } catch (error: any) {
    log(`部署失败: ${error.message}`, 'ERROR')
    return false
  }
}

/**
 * 运行完整的SEO优化流程
 */
async function runSEOOptimization(): Promise<void> {
  log('=' .repeat(50))
  log('开始SEO自动优化流程')
  log('=' .repeat(50))

  try {
    // 1. 分析竞争对手
    log('步骤1: 分析竞争对手...')
    let reports: CompetitorReport[] = []

    try {
      reports = await analyzeAllCompetitors()
      log(`✓ 分析完成，获取 ${reports.length} 份竞争对手报告`)

      // 保存报告
      const reportDir = CONFIG.reportPath
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true })
      }

      const reportFile = path.join(reportDir, `report-${Date.now()}.md`)
      const reportContent = exportReportAsMarkdown(reports)
      fs.writeFileSync(reportFile, reportContent)
      log(`✓ 报告已保存到: ${reportFile}`)

    } catch (error: any) {
      log(`竞争对手分析失败: ${error.message}`, 'WARN')
      // 继续执行，使用默认建议
    }

    // 2. 生成文章建议
    log('步骤2: 生成文章建议...')
    const suggestions = generateArticleSuggestions(reports)
    log(`✓ 生成 ${suggestions.length} 条文章建议`)

    // 3. 获取网站和管理员信息
    log('步骤3: 获取网站信息...')
    const websites = await prisma.website.findMany({
      where: { status: 'ACTIVE' },
    })

    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    })

    if (!admin) {
      log('未找到管理员用户', 'ERROR')
      return
    }

    log(`✓ 找到 ${websites.length} 个活跃网站`)

    // 4. 为每个网站生成文章
    log('步骤4: 生成文章...')
    let totalCreated = 0

    for (const website of websites) {
      log(`处理网站: ${website.name}`)

      // 随机决定生成数量
      const count = Math.floor(
        Math.random() * (CONFIG.articles.maxPerRun - CONFIG.articles.minPerRun + 1)
      ) + CONFIG.articles.minPerRun

      // 先基于建议生成
      const fromSuggestions = await generateFromSuggestions(
        suggestions.slice(0, Math.ceil(count / 2)),
        website.id,
        admin.id
      )

      // 再随机生成补充
      const randomCount = count - fromSuggestions
      const fromRandom = await generateArticles(randomCount, website.id, admin.id)

      totalCreated += fromSuggestions + fromRandom
      log(`✓ ${website.name}: 创建 ${fromSuggestions + fromRandom} 篇文章`)
    }

    log(`✓ 总共创建 ${totalCreated} 篇文章`)

    // 5. 部署更新
    if (totalCreated > 0) {
      log('步骤5: 部署更新到VPS...')
      const deploySuccess = await deployToVPS()

      if (deploySuccess) {
        log('✓ 部署成功')
      } else {
        log('部署失败，请手动检查', 'WARN')
      }
    } else {
      log('无新文章，跳过部署')
    }

    // 6. 完成
    log('=' .repeat(50))
    log('SEO优化流程完成')
    log('=' .repeat(50))

  } catch (error: any) {
    log(`SEO优化流程失败: ${error.message}`, 'ERROR')
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 仅运行竞争对手分析
 */
async function runCompetitorAnalysisOnly(): Promise<void> {
  log('开始竞争对手分析...')

  try {
    const reports = await analyzeAllCompetitors()

    // 保存报告
    const reportDir = CONFIG.reportPath
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }

    const reportFile = path.join(reportDir, `analysis-${Date.now()}.md`)
    const reportContent = exportReportAsMarkdown(reports)
    fs.writeFileSync(reportFile, reportContent)

    log(`✓ 分析完成，报告保存到: ${reportFile}`)

    // 输出摘要
    reports.forEach(report => {
      log(`${report.competitor}: ${report.totalArticles} 篇文章`)
      log(`  热门关键词: ${report.topKeywords.slice(0, 5).map(k => k.keyword).join(', ')}`)
    })

  } catch (error: any) {
    log(`分析失败: ${error.message}`, 'ERROR')
  }
}

/**
 * 仅生成文章
 */
async function runArticleGenerationOnly(count: number = 10): Promise<void> {
  log(`开始生成 ${count} 篇文章...`)

  try {
    const websites = await prisma.website.findMany({
      where: { status: 'ACTIVE' },
    })

    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    })

    if (!admin) {
      log('未找到管理员用户', 'ERROR')
      return
    }

    for (const website of websites) {
      const created = await generateArticles(count, website.id, admin.id)
      log(`✓ ${website.name}: 创建 ${created} 篇文章`)
    }

  } catch (error: any) {
    log(`生成失败: ${error.message}`, 'ERROR')
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 仅部署
 */
async function runDeployOnly(): Promise<void> {
  log('开始部署到VPS...')

  try {
    const success = await deployToVPS()
    if (success) {
      log('✓ 部署成功')
    } else {
      log('部署失败', 'ERROR')
    }
  } catch (error: any) {
    log(`部署失败: ${error.message}`, 'ERROR')
  }
}

// 命令行参数处理
const args = process.argv.slice(2)
const command = args[0] || 'full'

switch (command) {
  case 'full':
    runSEOOptimization()
    break
  case 'analyze':
    runCompetitorAnalysisOnly()
    break
  case 'generate':
    const count = parseInt(args[1]) || 10
    runArticleGenerationOnly(count)
    break
  case 'deploy':
    runDeployOnly()
    break
  case 'help':
    console.log(`
SEO自动优化Agent

使用方法:
  npx ts-node auto-seo-agent.ts [command] [options]

命令:
  full      完整流程（分析+生成+部署）[默认]
  analyze   仅运行竞争对手分析
  generate  仅生成文章 [count]
  deploy    仅部署到VPS
  help      显示帮助信息

示例:
  npx ts-node auto-seo-agent.ts full
  npx ts-node auto-seo-agent.ts generate 20
  npx ts-node auto-seo-agent.ts analyze
`)
    break
  default:
    console.log(`未知命令: ${command}，使用 'help' 查看帮助`)
}
