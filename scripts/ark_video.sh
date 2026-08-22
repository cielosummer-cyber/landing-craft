#!/bin/bash
# ark_video.sh — 火山方舟 Agent Plan 生视频（Seedance 异步任务，套餐内计费）
# 用法:
#   文生视频: bash ark_video.sh 输出.mp4 "提示词"
#   图生视频（hero loop 主力）: bash ark_video.sh 输出.mp4 "提示词" <首帧图路径或URL> [时长秒=5] [模型=doubao-seedance-2.0-mini]
# hero loop 提示词公式见 references/media-recipes.md：主体静止 + 微动 + 极慢推镜 + loop-friendly
# 密钥: ~/.config/ark/agent-plan-key。API 走 /api/plan/v3，勿改 /api/v3（套餐外计费）。
set -euo pipefail

OUT="$1"; PROMPT="$2"; FIRST_FRAME="${3:-}"; DURATION="${4:-5}"; MODEL="${5:-doubao-seedance-2.0-mini}"
KEY="${ARK_API_KEY:-$(cat "$HOME/.config/ark/agent-plan-key")}"
BASE="https://ark.cn-beijing.volces.com/api/plan/v3"
mkdir -p "$(dirname "$OUT")"

# 整个请求体由一个 python 进程生成（首帧支持 http(s) URL 或本地文件转 base64 data URL）
BODY="$(mktemp)"
python3 -c "
import json, sys, base64, mimetypes
prompt, frame, model, duration = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
parts = [{'type': 'text', 'text': prompt}]
if frame:
    if frame.startswith('http'):
        url = frame
    else:
        mt = mimetypes.guess_type(frame)[0] or 'image/png'
        url = 'data:' + mt + ';base64,' + base64.b64encode(open(frame, 'rb').read()).decode()
    parts.append({'type': 'image_url', 'image_url': {'url': url}})
body = {'model': model, 'content': parts, 'duration': duration, 'ratio': 'adaptive', 'watermark': False}
open(sys.argv[5], 'w').write(json.dumps(body, ensure_ascii=False))
" "$PROMPT" "$FIRST_FRAME" "$MODEL" "$DURATION" "$BODY"

TASK=$(curl -s -m 60 -X POST "$BASE/contents/generations/tasks" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" --data-binary "@$BODY")
rm -f "$BODY"
ID=$(echo "$TASK" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null || true)
[ -n "$ID" ] || { echo "创建任务失败: $TASK" >&2; exit 1; }
echo "任务 $ID 已创建（$MODEL, ${DURATION}s），轮询中…" >&2

for i in $(seq 1 90); do   # 最长 15 分钟
  sleep 10
  R=$(curl -s -m 30 "$BASE/contents/generations/tasks/$ID" -H "Authorization: Bearer $KEY")
  ST=$(echo "$R" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status','unknown'))" 2>/dev/null || echo unknown)
  case "$ST" in
    succeeded)
      URL=$(echo "$R" | python3 -c "import json,sys; print(json.load(sys.stdin)['content']['video_url'])")
      curl -sL -m 300 -o "$OUT" "$URL"
      test -s "$OUT" && echo "[OK] $OUT" && exit 0;;
    failed|cancelled) echo "任务失败: $R" >&2; exit 1;;
    *) echo "  [$i] $ST" >&2;;
  esac
done
echo "超时：任务 15 分钟未完成，任务 id $ID 可稍后手动查询" >&2; exit 1
