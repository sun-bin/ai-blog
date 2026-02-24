#!/bin/bash
# 自动提交并推送新闻更新
# 用法: ./scripts/push-news.sh

cd "$(dirname "$0")/.."

# 检查是否有变更
if [ -z "$(git status --porcelain)" ]; then
  echo "📭 没有变更需要提交"
  exit 0
fi

# 添加变更
git add src/content/

# 提交
git commit -m "📰 更新内容: $(date '+%Y-%m-%d %H:%M')"

# 推送
git push origin main

echo "✅ 已推送到 GitHub，Vercel 将自动部署"
