/**
 * 自动文章生成器
 *
 * 基于竞争对手分析和关键词研究，自动生成高质量SEO文章
 */

import { PrismaClient } from '@prisma/client'
import type { ArticleSuggestion } from './competitor-analyzer'

const prisma = new PrismaClient()

// 文章内容模板
interface ArticleTemplate {
  keyword: string
  titlePattern: string
  contentTemplate: string
  metaDescription: string
  tags: string[]
}

// Telegram相关文章模板库
const ARTICLE_TEMPLATES: ArticleTemplate[] = [
  {
    keyword: 'telegram下载',
    titlePattern: 'Telegram{版本}下载 - {平台}安装教程{年份}',
    contentTemplate: `# Telegram{版本}下载指南

Telegram是全球领先的即时通讯应用，本文提供{年份}年最新的下载和安装教程。

## 为什么选择Telegram

- **安全加密**：采用MTProto协议，保护通讯安全
- **云端同步**：消息永久保存在云端
- **大文件传输**：支持最大2GB文件
- **超大群组**：群组最多20万成员
- **丰富功能**：机器人、频道、贴纸等

## {平台}版下载方法

### 方法一：官方下载

1. 访问Telegram官方网站
2. 选择{平台}版本
3. 下载安装包
4. 按照提示完成安装

### 方法二：应用商店下载

{平台特定步骤}

## 注册和登录

1. 打开Telegram应用
2. 输入手机号码
3. 输入验证码
4. 设置用户名
5. 开始使用

## 常见问题

**Q: Telegram免费吗？**
A: 是的，Telegram完全免费使用。

**Q: 需要翻墙吗？**
A: 在某些地区可能需要使用代理。

**Q: 消息安全吗？**
A: Telegram采用加密技术保护消息安全，秘密聊天更是端到端加密。

## 总结

Telegram是一款功能强大、安全可靠的即时通讯应用，推荐下载使用。`,
    metaDescription: 'Telegram{版本}下载，{平台}安装教程{年份}最新版。提供官方下载链接和详细安装步骤。',
    tags: ['telegram下载', 'telegram安装', 'tg下载', '{平台}'],
  },
  {
    keyword: '秘密聊天',
    titlePattern: 'Telegram秘密聊天{主题} - {描述}',
    contentTemplate: `# Telegram秘密聊天{主题}

Telegram的秘密聊天功能提供端到端加密，确保通讯绝对安全。

## 什么是秘密聊天

秘密聊天是Telegram的高级隐私功能：

- **端到端加密**：只有收发双方能读取消息
- **阅后即焚**：可设置消息自动销毁
- **禁止转发**：消息无法被转发
- **截图通知**：截图时对方会收到通知

## 如何开启秘密聊天

### 移动端操作步骤

1. 打开与好友的对话
2. 点击好友名称
3. 选择"开始秘密聊天"
4. 等待对方接受

### 桌面端操作

1. 右键联系人
2. 选择"Start Secret Chat"

## 安全特性详解

### 加密原理

Telegram使用256位对称AES加密和RSA 2048密钥交换。

### 验证加密密钥

可以通过比对加密密钥图像来确认通讯安全。

## 自毁消息设置

1. 点击计时器图标
2. 选择销毁时间
3. 发送的消息会在设定时间后自动删除

## 适用场景

- 敏感商业信息交流
- 私密个人对话
- 需要高隐私保护的通讯

## 注意事项

- 秘密聊天不支持云端同步
- 只能在创建的设备上查看
- 不支持群组秘密聊天`,
    metaDescription: 'Telegram秘密聊天{主题}教程，了解端到端加密、阅后即焚等隐私保护功能。',
    tags: ['telegram秘密聊天', '端到端加密', 'telegram隐私', 'telegram安全'],
  },
  {
    keyword: '群组',
    titlePattern: 'Telegram群组{主题}教程 - {描述}',
    contentTemplate: `# Telegram群组{主题}教程

Telegram群组功能强大，支持最多20万成员，是社区运营的理想工具。

## 群组类型

### 普通群组
- 最多200成员
- 基础功能

### 超级群组
- 最多20万成员
- 高级管理功能
- 消息历史永久保存

## 创建群组

1. 点击新建群组
2. 添加初始成员
3. 设置名称和头像
4. 完成创建

## 群组管理

### 基本设置
- 群组名称和头像
- 群组描述
- 公开或私密设置

### 权限管理
- 发送消息权限
- 添加成员权限
- 管理员权限分配

### 高级功能
- 慢速模式
- 机器人管理
- 投票和测验

## 运营技巧

- 制定群规
- 定期活跃气氛
- 使用机器人辅助管理
- 设置管理员分工

## 常见问题

**Q: 如何升级为超级群组？**
A: 群组设置中选择升级选项。

**Q: 群组消息会保存多久？**
A: 超级群组消息永久保存。`,
    metaDescription: 'Telegram群组{主题}完整教程，学习创建、管理和运营Telegram群组的技巧。',
    tags: ['telegram群组', 'tg群', '群组管理', 'telegram社区'],
  },
  {
    keyword: '频道',
    titlePattern: 'Telegram频道{主题} - {描述}',
    contentTemplate: `# Telegram频道{主题}

Telegram频道是内容发布和品牌推广的强大工具，无订阅人数上限。

## 频道特点

- 单向广播模式
- 无订阅人数限制
- 支持评论功能
- 详细统计数据

## 创建频道

1. 点击新建频道
2. 设置频道名称和描述
3. 选择公开或私密
4. 设置频道链接

## 频道运营

### 内容策略
- 确定内容方向
- 保持更新频率
- 提供有价值内容

### 推广方法
- 群组内分享
- 社交媒体推广
- 与其他频道互推

### 数据分析
- 查看订阅增长
- 分析帖子表现
- 优化发布策略

## 变现方式

- 广告合作
- 会员付费内容
- 导流到其他平台

## 成功案例分析

优秀频道的共同特点：
- 定位清晰
- 内容有价值
- 更新稳定
- 互动活跃`,
    metaDescription: 'Telegram频道{主题}教程，学习创建和运营频道，打造成功的内容发布平台。',
    tags: ['telegram频道', 'telegram channel', '频道运营', 'telegram推广'],
  },
  {
    keyword: '机器人',
    titlePattern: 'Telegram机器人{主题} - {描述}',
    contentTemplate: `# Telegram机器人{主题}

Telegram机器人是自动化工具，可以完成各种任务，提升使用效率。

## 什么是Telegram Bot

机器人是自动化账号，可以：
- 执行预设任务
- 回复消息
- 处理命令
- 与外部服务集成

## 使用机器人

### 查找机器人
1. 搜索机器人名称
2. 或通过链接访问

### 启动使用
1. 点击Start或/start
2. 按照提示操作

### 添加到群组
1. 进入机器人对话
2. 选择添加到群组

## 实用机器人推荐

### 效率工具
- @GmailBot - 邮件管理
- @IFTTT - 自动化工作流
- @SaveMediaBot - 保存媒体

### 群组管理
- @GroupHelpBot - 管理助手
- @Combot - 统计分析
- @AntiSpamBot - 反垃圾

### 文件处理
- @FiletoBot - 格式转换
- @PDFBot - PDF处理

## 创建机器人

1. 联系@BotFather
2. 发送/newbot
3. 设置名称和用户名
4. 获取API Token
5. 开始开发

## 安全注意事项

- 只使用可信机器人
- 不提供敏感信息
- 检查权限请求`,
    metaDescription: 'Telegram机器人{主题}教程，推荐实用Bot，学习如何使用和创建机器人。',
    tags: ['telegram机器人', 'telegram bot', 'tg机器人', 'telegram自动化'],
  },
  {
    keyword: '中文纸飞机下载',
    titlePattern: '中文纸飞机下载{年份} - Telegram{平台}版安装',
    contentTemplate: `# 中文纸飞机下载{年份}

纸飞机（Telegram）是全球最流行的即时通讯应用之一，本文提供中文版下载方法。

## 什么是纸飞机

纸飞机是Telegram在中国的俗称，因其图标像纸飞机而得名。

### 核心优势
- 安全可靠的加密通讯
- 强大的群组和频道功能
- 云端同步多设备使用
- 完全免费无广告

## 中文版下载

### 安卓版下载
1. 下载官方APK
2. 安装应用
3. 设置中文语言

### iOS版下载
1. App Store搜索Telegram
2. 下载安装
3. 设置中文

### 电脑版下载
1. 访问官网
2. 下载对应系统版本
3. 安装并设置中文

## 设置中文界面

1. 打开设置
2. 选择Language
3. 找到简体中文
4. 应用语言包

## 注册使用

1. 输入手机号（需要+86）
2. 接收验证码
3. 完成注册
4. 设置用户名

## 常见问题

**Q: 纸飞机和Telegram是一个软件吗？**
A: 是的，纸飞机是Telegram的中文俗称。

**Q: 需要翻墙吗？**
A: 某些地区可能需要代理。

**Q: 安全吗？**
A: Telegram采用加密技术，非常安全。`,
    metaDescription: '中文纸飞机下载{年份}最新版，提供Telegram安卓/iOS/电脑版下载和安装教程。',
    tags: ['中文纸飞机下载', '纸飞机', 'telegram中文', 'telegram下载'],
  },
]

// 变体词库
const VARIANTS = {
  版本: ['中文版', '最新版', '官方版', '正式版'],
  平台: ['安卓', 'iOS', 'Windows', 'Mac', '电脑'],
  主题: ['使用教程', '完整指南', '入门教程', '高级技巧', '详解'],
  描述: ['新手必看', '详细步骤', '完全攻略', '最新教程'],
}

/**
 * 生成随机变体
 */
function getRandomVariant(key: keyof typeof VARIANTS): string {
  const variants = VARIANTS[key]
  return variants[Math.floor(Math.random() * variants.length)]
}

/**
 * 替换模板中的占位符
 */
function fillTemplate(template: string, replacements: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }
  return result
}

/**
 * 生成文章内容
 */
export function generateArticleContent(template: ArticleTemplate): {
  title: string
  content: string
  metaDescription: string
  metaKeywords: string[]
  slug: string
} {
  const year = new Date().getFullYear().toString()
  const replacements: Record<string, string> = {
    年份: year,
    版本: getRandomVariant('版本'),
    平台: getRandomVariant('平台'),
    主题: getRandomVariant('主题'),
    描述: getRandomVariant('描述'),
  }

  // 为特定平台添加步骤
  const platformSteps: Record<string, string> = {
    安卓: `1. 打开Google Play商店\n2. 搜索"Telegram"\n3. 点击安装\n4. 等待下载完成`,
    iOS: `1. 打开App Store\n2. 搜索"Telegram"\n3. 点击获取\n4. 完成安装`,
    Windows: `1. 访问官网下载页面\n2. 选择Windows版本\n3. 运行安装程序\n4. 完成安装`,
    Mac: `1. 从App Store下载\n2. 或官网下载DMG\n3. 拖到应用程序文件夹\n4. 打开使用`,
    电脑: `Windows和Mac都可以从官网下载对应版本安装使用。`,
  }

  replacements['平台特定步骤'] = platformSteps[replacements['平台']] || platformSteps['电脑']

  const title = fillTemplate(template.titlePattern, replacements)
  const content = fillTemplate(template.contentTemplate, replacements)
  const metaDescription = fillTemplate(template.metaDescription, replacements)
  const metaKeywords = template.tags.map(tag => fillTemplate(tag, replacements))

  // 生成slug
  const slug = title
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)

  return {
    title,
    content,
    metaDescription,
    metaKeywords,
    slug: `${slug}-${Date.now()}`,
  }
}

/**
 * 批量生成文章
 */
export async function generateArticles(
  count: number,
  websiteId: string,
  authorId: string
): Promise<number> {
  let created = 0

  for (let i = 0; i < count; i++) {
    // 随机选择模板
    const template = ARTICLE_TEMPLATES[Math.floor(Math.random() * ARTICLE_TEMPLATES.length)]
    const article = generateArticleContent(template)

    try {
      // 检查是否已存在类似标题
      const existing = await prisma.post.findFirst({
        where: {
          websiteId,
          OR: [
            { slug: article.slug },
            { title: { contains: article.title.substring(0, 20) } },
          ],
        },
      })

      if (existing) {
        console.log(`跳过重复: ${article.title.substring(0, 30)}...`)
        continue
      }

      await prisma.post.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          metaTitle: article.title,
          metaDescription: article.metaDescription,
          metaKeywords: article.metaKeywords,
          status: 'PUBLISHED',
          websiteId,
          authorId,
          publishedAt: new Date(),
        },
      })

      created++
      console.log(`✓ 创建: ${article.title.substring(0, 40)}...`)

    } catch (error: any) {
      console.error(`创建失败: ${error.message}`)
    }
  }

  return created
}

/**
 * 基于建议生成文章
 */
export async function generateFromSuggestions(
  suggestions: ArticleSuggestion[],
  websiteId: string,
  authorId: string
): Promise<number> {
  let created = 0

  for (const suggestion of suggestions) {
    // 查找匹配的模板
    const matchedTemplate = ARTICLE_TEMPLATES.find(t =>
      suggestion.targetKeywords.some(k => t.keyword.includes(k) || k.includes(t.keyword))
    )

    if (!matchedTemplate) continue

    const article = generateArticleContent(matchedTemplate)

    // 使用建议的标题（如果更好）
    const finalTitle = suggestion.title.length > article.title.length
      ? suggestion.title
      : article.title

    try {
      const existing = await prisma.post.findFirst({
        where: {
          websiteId,
          slug: suggestion.slug,
        },
      })

      if (existing) continue

      await prisma.post.create({
        data: {
          title: finalTitle,
          slug: suggestion.slug,
          content: article.content,
          metaTitle: finalTitle,
          metaDescription: article.metaDescription,
          metaKeywords: [...new Set([...suggestion.targetKeywords, ...article.metaKeywords])],
          status: 'PUBLISHED',
          websiteId,
          authorId,
          publishedAt: new Date(),
        },
      })

      created++
      console.log(`✓ 基于建议创建: ${finalTitle.substring(0, 40)}...`)

    } catch (error: any) {
      console.error(`创建失败: ${error.message}`)
    }
  }

  return created
}
