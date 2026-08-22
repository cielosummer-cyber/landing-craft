#!/bin/bash
# gen_image.sh — codex 内置 image_gen (gpt-image-2) 生图兜底
# 用法: bash gen_image.sh <输出路径.png> "<提示词>"
# 提示词要求: 具体视觉特征 + 色板色值 + 摄影参数 + 横竖版，不写「极简」等虚词
# 依赖: 本机 codex CLI 已登录 ChatGPT（复用其登录态，无需 API key）
set -euo pipefail

OUT="$1"
PROMPT="$2"
mkdir -p "$(dirname "$OUT")"   # 目标目录可能不存在（无图项目首次生图，2026-08-20 实测翻车）
DIR="$(cd "$(dirname "$OUT")" && pwd)"
BASE="$(basename "$OUT")"

# codex exec 要求在 git 仓库内工作
cd "$DIR"
CREATED_GIT=0
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init -q
  CREATED_GIT=1   # 记住 .git 是我们建的，跑完清理（残留 .git 污染项目 assets，2026-08-20 实测）
fi

codex exec --sandbox workspace-write --skip-git-repo-check \
  "Use your built-in image_gen tool (gpt-image-2) to generate ONE image and save it to $BASE. $PROMPT" \
  < /dev/null || true   # 生图成功但整体 exit 1 的情况存在，以文件落盘为准

[ "$CREATED_GIT" = "1" ] && rm -rf "$DIR/.git"

test -s "$OUT" && echo "[OK] $OUT"
