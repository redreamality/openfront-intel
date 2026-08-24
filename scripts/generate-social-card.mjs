import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(ROOT, 'public', 'openfront-intel-social.png');
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
          body {
            position: relative;
            background: #0b0f17;
            color: #f6f7f9;
            font-family: Arial, Helvetica, sans-serif;
          }
          .frame {
            position: absolute;
            inset: 32px;
            border: 2px solid #3a4253;
          }
          .rule-top, .rule-bottom {
            position: absolute;
            left: 32px;
            right: 32px;
            height: 6px;
          }
          .rule-top { top: 32px; background: #4d7c0f; }
          .rule-bottom { bottom: 32px; background: #d97706; }
          .content {
            position: absolute;
            left: 92px;
            top: 92px;
            width: 680px;
          }
          .eyebrow {
            color: #fbbf24;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 4px;
          }
          h1 {
            margin: 22px 0 18px;
            max-width: 670px;
            font-size: 78px;
            line-height: 0.95;
            letter-spacing: 0;
          }
          .lead {
            margin: 0;
            max-width: 640px;
            color: #cdd2b3;
            font-size: 29px;
            line-height: 1.35;
          }
          .domain {
            position: absolute;
            left: 92px;
            bottom: 76px;
            color: #b0b9ca;
            font-size: 22px;
            font-weight: 700;
          }
          .scope {
            position: absolute;
            right: 80px;
            top: 76px;
            width: 340px;
            height: 340px;
            border: 6px solid #d97706;
            border-radius: 50%;
          }
          .scope::before, .scope::after {
            content: '';
            position: absolute;
            background: #4d7c0f;
          }
          .scope::before { left: 164px; top: -34px; width: 4px; height: 396px; }
          .scope::after { left: -34px; top: 164px; width: 396px; height: 4px; }
          .inner-ring {
            position: absolute;
            inset: 72px;
            border: 3px solid #84905a;
            border-radius: 50%;
          }
          .center {
            position: absolute;
            left: 145px;
            top: 145px;
            width: 40px;
            height: 40px;
            border: 8px solid #fbbf24;
            border-radius: 50%;
            background: #0b0f17;
          }
          .map-a, .map-b, .map-c {
            position: absolute;
            background: #374822;
            border: 3px solid #84905a;
          }
          .map-a { left: 52px; top: 54px; width: 104px; height: 90px; clip-path: polygon(5% 16%, 75% 0, 100% 42%, 74% 100%, 14% 78%); }
          .map-b { right: 46px; top: 76px; width: 92px; height: 116px; clip-path: polygon(24% 0, 100% 18%, 80% 85%, 24% 100%, 0 46%); }
          .map-c { left: 72px; bottom: 38px; width: 174px; height: 88px; clip-path: polygon(0 38%, 28% 0, 68% 20%, 100% 66%, 66% 100%, 18% 82%); }
          .legend {
            position: absolute;
            right: 90px;
            bottom: 82px;
            width: 310px;
            color: #d5dae3;
            font-size: 19px;
            line-height: 1.7;
            text-transform: uppercase;
          }
          .legend span { color: #fbbf24; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="frame"></div>
        <div class="rule-top"></div>
        <div class="rule-bottom"></div>
        <main class="content">
          <div class="eyebrow">OPENFRONT.IO FIELD GUIDE</div>
          <h1>OpenFront Intel</h1>
          <p class="lead">Source-checked mechanics, maps, data and strategy for the current game.</p>
        </main>
        <div class="scope" aria-hidden="true">
          <div class="inner-ring"></div>
          <div class="center"></div>
          <div class="map-a"></div>
          <div class="map-b"></div>
          <div class="map-c"></div>
        </div>
        <div class="domain">openfront.fyi</div>
        <div class="legend"><span>Mechanics</span> · Maps<br /><span>Data</span> · Strategy</div>
      </body>
    </html>
  `);
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`[social-card] wrote ${outputPath}`);
} finally {
  await browser.close();
}
