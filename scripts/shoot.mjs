#!/usr/bin/env node
// shoot.mjs — landing-craft 验收截图：首屏 / 中段 / 全页 + console 错误报告
// 用法: node shoot.mjs <项目index.html的绝对路径> [输出目录] [视口WxH，默认1440x900]
// 页面带 ?shot=1 时所有 reveal 立即置完成态（landing-craft 页面约定），保证全页截图确定性。
// 视口参数位：定高舞台卡（如 860px 首屏门户）按卡面实测尺寸传，如 1728x860（2026-08-27 kimi 赣鄱星图单回填）
// playwright 从 npx 缓存动态定位，无需全局安装。
import { existsSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function findPlaywright() {
  const roots = [
    path.join(homedir(), '.npm-cache-new/_npx'),
    path.join(homedir(), '.npm/_npx'),
  ];
  const candidates = [];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root)) {
      const p = path.join(root, dir, 'node_modules', 'playwright', 'index.mjs');
      if (existsSync(p)) candidates.push(p);
    }
  }
  if (!candidates.length) {
    console.error('未找到 playwright。先跑一次: npx -y playwright --version');
    process.exit(1);
  }
  candidates.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  return candidates[0];
}

const { chromium } = await import(pathToFileURL(findPlaywright()).href);

const htmlPath = process.argv[2];
if (!htmlPath) { console.error('用法: node shoot.mjs <index.html绝对路径> [输出目录] [视口WxH，默认1440x900]'); process.exit(1); }
const outDir = process.argv[3] || path.dirname(htmlPath);
const vpMatch = /^(\d+)x(\d+)$/.exec(process.argv[4] || '');
const VP = { width: vpMatch ? +vpMatch[1] : 1440, height: vpMatch ? +vpMatch[2] : 900 };
const url = 'file://' + htmlPath + '?shot=1';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VP });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

// Google Fonts 策略（2026-08-28 重构）：先 4s 预检，网络健康就不拦截（route 拦截会把 CJK 几十个 woff2 分片拖过
// goto 超时，页面来不及 paint 出全白截图）；弱网/离线则直接整域 abort，页面秒开走 fallback 字体
let fontsOK = false;
try {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 4000);
  const r = await fetch('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap', { signal: ctrl.signal });
  clearTimeout(t); fontsOK = r.ok;
} catch {}
if (!fontsOK) {
  console.log('warn: Google Fonts 预检失败，屏蔽字体域名走 fallback');
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort().catch(() => {}));
}

try {
  await page.goto(url, { timeout: 20000 });
} catch {
  console.log('warn: page.goto 超时（疑似弱网字体阻塞），继续截图');
}
await page.waitForTimeout(2500);
await page.screenshot({ path: path.join(outDir, 'shot-hero.png') });

// 中段（触发首屏之后的滚动交互，如 scroll-expand）
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.5));
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(outDir, 'shot-mid.png') });

// 滚动全程触发 reveal，再截全页
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 450) {
  await page.evaluate(v => window.scrollTo(0, v), y);
  await page.waitForTimeout(250);
}
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(outDir, 'shot-full.png'), fullPage: true });

console.log('pageerrors:', errors.length, errors.join('; '));
console.log('shots:', ['shot-hero.png', 'shot-mid.png', 'shot-full.png'].map(f => path.join(outDir, f)).join('\n  '));
await browser.close();
