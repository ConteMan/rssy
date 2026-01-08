import { ref, computed } from 'vue'

const currentLocale = ref('en')

const messages = {
  en: {
    app: {
      title: 'rssy',
      subtitle: 'RSS Feed Viewer & Validator',
      footer: 'rssy - A simple RSS feed viewer and validator'
    },
    input: {
      placeholder: 'Enter RSS feed URL...',
      parse: 'Parse',
      parsing: 'Parsing...'
    },
    tabs: {
      overview: 'Overview',
      items: 'Items'
    },
    validation: {
      title: 'Validation Report',
      valid: 'Valid',
      invalid: 'Invalid'
    },
    feed: {
      type: 'Type',
      language: 'Language',
      generator: 'Generator',
      items: 'Items',
      itemsCount: 'Items ({count})'
    },
    item: {
      showDetails: 'Show details',
      hideDetails: 'Hide details',
      guid: 'GUID',
      rawDate: 'Raw Date',
      enclosures: 'Enclosures',
      fullContent: 'Full Content',
      noTitle: '(No title)'
    },
    checks: {
      'Feed Title': 'Feed Title',
      'Feed Link': 'Feed Link',
      'Feed Description': 'Feed Description',
      'Language': 'Language',
      'Last Update Date': 'Last Update Date',
      'Generator': 'Generator',
      'Feed Image': 'Feed Image',
      'Item Count': 'Item Count',
      'Item Titles': 'Item Titles',
      'Item Links': 'Item Links',
      'Item Dates': 'Item Dates',
      'Item GUIDs': 'Item GUIDs',
      'Item Content': 'Item Content'
    },
    nav: {
      home: 'Home',
      about: 'About RSS'
    },
    about: {
      title: 'What is RSS?',
      whatIsRss: 'What is RSS?',
      whatIsRssDesc: 'RSS (Really Simple Syndication) is a web feed format used to publish frequently updated content such as blog posts, news headlines, and podcasts. It allows users to subscribe to websites and receive updates automatically without visiting each site individually.',
      history: 'History',
      historyDesc: 'RSS was first created by Netscape in 1999. Over the years, it evolved through several versions. RSS 2.0, released in 2002, became the most widely adopted version. Despite the rise of social media, RSS remains a powerful tool for content aggregation and distribution.',
      formats: 'Feed Formats',
      rss2Desc: 'The most common format. Simple XML structure with channel and item elements. Widely supported by all feed readers.',
      atomDesc: 'A more rigorous standard developed by IETF. Offers better internationalization and content typing than RSS.',
      jsonFeedDesc: 'A modern alternative using JSON instead of XML. Easier to parse for web developers.',
      structure: 'RSS Structure',
      benefits: 'Benefits of RSS',
      benefit1: 'No algorithm - you see all updates in chronological order',
      benefit2: 'Privacy - no tracking or data collection',
      benefit3: 'Efficiency - aggregate content from multiple sources',
      benefit4: 'Control - you decide what to subscribe to'
    }
  },
  zh: {
    app: {
      title: 'rssy',
      subtitle: 'RSS Feed 查看器 & 验证器',
      footer: 'rssy - 简洁的 RSS Feed 查看和验证工具'
    },
    input: {
      placeholder: '输入 RSS Feed URL...',
      parse: '解析',
      parsing: '解析中...'
    },
    tabs: {
      overview: '概览',
      items: '文章列表'
    },
    validation: {
      title: '验证报告',
      valid: '有效',
      invalid: '无效'
    },
    feed: {
      type: '类型',
      language: '语言',
      generator: '生成器',
      items: '条目数',
      itemsCount: '文章列表 ({count})'
    },
    item: {
      showDetails: '显示详情',
      hideDetails: '隐藏详情',
      guid: 'GUID',
      rawDate: '原始日期',
      enclosures: '附件',
      fullContent: '完整内容',
      noTitle: '(无标题)'
    },
    checks: {
      'Feed Title': 'Feed 标题',
      'Feed Link': 'Feed 链接',
      'Feed Description': 'Feed 描述',
      'Language': '语言',
      'Last Update Date': '最后更新日期',
      'Generator': '生成器',
      'Feed Image': 'Feed 图片',
      'Item Count': '条目数量',
      'Item Titles': '条目标题',
      'Item Links': '条目链接',
      'Item Dates': '条目日期',
      'Item GUIDs': '条目 GUID',
      'Item Content': '条目内容'
    },
    nav: {
      home: '首页',
      about: '关于 RSS'
    },
    about: {
      title: '什么是 RSS？',
      whatIsRss: '什么是 RSS？',
      whatIsRssDesc: 'RSS（Really Simple Syndication，简易信息聚合）是一种用于发布频繁更新内容的网络订阅格式，如博客文章、新闻标题和播客。它允许用户订阅网站并自动接收更新，无需逐个访问每个网站。',
      history: '发展历史',
      historyDesc: 'RSS 最初由 Netscape 于 1999 年创建。多年来，它经历了多个版本的演变。2002 年发布的 RSS 2.0 成为最广泛采用的版本。尽管社交媒体兴起，RSS 仍然是内容聚合和分发的强大工具。',
      formats: '订阅格式',
      rss2Desc: '最常见的格式。简单的 XML 结构，包含 channel 和 item 元素。所有订阅阅读器都广泛支持。',
      atomDesc: '由 IETF 开发的更严格的标准。比 RSS 提供更好的国际化和内容类型支持。',
      jsonFeedDesc: '使用 JSON 而非 XML 的现代替代方案。对 Web 开发者来说更容易解析。',
      structure: 'RSS 结构',
      benefits: 'RSS 的优势',
      benefit1: '无算法 - 按时间顺序查看所有更新',
      benefit2: '隐私保护 - 无跟踪或数据收集',
      benefit3: '高效 - 从多个来源聚合内容',
      benefit4: '自主控制 - 由你决定订阅什么'
    }
  }
}

export function useI18n() {
  const locale = computed(() => currentLocale.value)

  function t(key, params = {}) {
    const keys = key.split('.')
    let value = messages[currentLocale.value]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }

    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '')
    }

    return value || key
  }

  function setLocale(lang) {
    currentLocale.value = lang
  }

  function toggleLocale() {
    currentLocale.value = currentLocale.value === 'en' ? 'zh' : 'en'
  }

  return { locale, t, setLocale, toggleLocale }
}
