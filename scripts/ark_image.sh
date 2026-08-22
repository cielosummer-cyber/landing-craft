#!/bin/bash
# ark_image.sh — 火山方舟 Agent Plan 生图（Seedream，套餐内计费）
# 用法: bash ark_image.sh <输出路径> "<提示词>" [尺寸，默认 2K，支持 2K/3K 或 2048x2048]
# 密钥: ~/.config/ark/agent-plan-key（或环境变量 ARK_SEEDREAM_API_KEY 优先）
# 底座: byted-ark-seedream-skill 的 generate.js（API 默认 /api/plan/v3，勿改 /api/v3——会套餐外计费）
# 注意: generate.js 不支持 --save-dir，固定存到「当前目录/Seedream-Images/日期/」，
#       且会给提示词自动追加画质增强词。本脚本在临时目录里跑再把产物搬到 OUT。
set -euo pipefail

OUT="$1"; PROMPT="$2"; SIZE="${3:-2K}"
SKILL_DIR="$HOME/.agents/skills/byted-ark-seedream-skill"
KEY_FILE="$HOME/.config/ark/agent-plan-key"

export ARK_SEEDREAM_API_KEY="${ARK_SEEDREAM_API_KEY:-$(cat "$KEY_FILE")}"
mkdir -p "$(dirname "$OUT")"

STAGE="$(mktemp -d)"
# --watermark false 必加：generate.js 默认 watermark:true，产物右下角带「AI生成」标（2026-08-22 研学单实测，裁图是下策）
(cd "$STAGE" && node "$SKILL_DIR/scripts/generate.js" --prompt "$PROMPT" --size "$SIZE" --watermark false >&2)
LATEST="$(find "$STAGE" -name '*.jpg' -o -name '*.png' | head -1)"
[ -n "$LATEST" ] && mv "$LATEST" "$OUT"
rm -rf "$STAGE"
test -s "$OUT" && echo "[OK] $OUT"
