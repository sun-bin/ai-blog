#!/usr/bin/env node
/**
 * 自动生成每日新闻 Markdown 文件
 * 用法: node scripts/generate-news.js "新闻标题" "新闻内容"
 */

const fs = require('fs');
const path = require('path');

function generateNewsFile(title, content, options = {}) {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
  const timestamp = today.toISOString();
  
  const fileName = `${dateStr}.md`;
  const filePath = path.join(__dirname, '../src/content/news', fileName);
  
  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  新闻文件 ${fileName} 已存在，追加内容`);
    const existing = fs.readFileSync(filePath, 'utf-8');
    const updated = existing + '\n\n' + content;
    fs.writeFileSync(filePath, updated);
    console.log(`✅ 已更新: ${filePath}`);
    return filePath;
  }
  
  // 生成 frontmatter
  const frontmatter = `---
title: "${title || `${dateStr} 科技新闻`}"
description: "今日科技行业重要动态汇总"
pubDate: ${timestamp}
source: "${options.source || '综合报道'}"
tags: [${(options.tags || ['科技', 'AI', '互联网']).map(t => `"${t}"`).join(', ')}]
---

`;

  const fullContent = frontmatter + (content || '今日暂无重要新闻。');
  
  fs.writeFileSync(filePath, fullContent);
  console.log(`✅ 已生成: ${filePath}`);
  return filePath;
}

// 如果直接运行脚本
if (require.main === module) {
  const args = process.argv.slice(2);
  const title = args[0];
  const content = args[1] || '';
  
  if (!title) {
    console.log('用法: node generate-news.js "新闻标题" "新闻内容"');
    console.log('示例: node generate-news.js "AI重大突破" "OpenAI发布新模型..."');
    process.exit(1);
  }
  
  generateNewsFile(title, content);
}

module.exports = { generateNewsFile };
