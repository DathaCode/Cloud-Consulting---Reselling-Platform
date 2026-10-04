// Screenshot one section of the running site.
// Usage: node shot.mjs <url> <out.png> [width=1440] [height=900] [cssSelectorToScrollTo] [jsToRunBeforeShot]
// Example: node shot.mjs http://localhost:4173/ work.png 1440 1000 "#work"
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , url, out, w = '1440', h = '900', sel = '', extra = ''] = process.argv;

const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
const mobile = +w < 600;
await page.setViewport({ width: +w, height: +h, isMobile: mobile, hasTouch: mobile });
page.on('console', (m) => ['error', 'warn'].includes(m.type()) && !m.text().includes('THREE.Clock') && console.log(`[console.${m.type()}]`, m.text().slice(0, 300)));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(url, { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
if (sel) await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel);
await new Promise((r) => setTimeout(r, 3500)); // let reveal animations + 3D settle
if (extra) {
    await page.evaluate(extra);
    await new Promise((r) => setTimeout(r, 1500));
}
await page.screenshot({ path: out });
await browser.close();
