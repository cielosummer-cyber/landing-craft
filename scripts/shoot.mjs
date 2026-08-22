#!/usr/bin/env node
// shoot.mjs — landing-craft 验收截图：首屏 / 中段 / 全页 + console 错误报告
// 用法: node shoot.mjs <项目index.html的绝对路径> [输出目录]
// 页面带 ?shot=1 时所有 reveal 立即置完成态（landing-craft 页面约定），保证全页截图确定性。
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
if (!htmlPath) { console.error('用法: node shoot.mjs <index.html绝对路径> [输出目录]'); process.exit(1); }
const outDir = process.argv[3] || path.dirname(htmlPath);
const url = 'file://' + htmlPath + '?shot=1';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

// Google Fonts 弱网会拖死 load 事件（2026-08-20 实测）：字体请求 8s 拿不到就放弃，页面走 fallback 字体
await page.route(/fonts\.(googleapis|gstatic)\.com/, async route => {
  const resp = await route.fetch({ timeout: 8000 }).catch(() => null);
  if (resp) await route.fulfill({ response: resp }); else await route.abort();
});

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
