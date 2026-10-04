// End-to-end test of the project request form WITHOUT sending a real submission:
// Formspree requests are intercepted and answered locally; the JSON payload is printed.
// Usage: node form-flow.mjs [baseUrl=http://localhost:4173] [width=1440] [prefix=form]
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , base = 'http://localhost:4173', w = '1440', pre = 'form'] = process.argv;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: 1000, isMobile: +w < 600, hasTouch: +w < 600 });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => m.type() === 'error' && console.log('[console]', m.text()));

// The mock must answer the CORS preflight too, or the browser blocks the POST.
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
await page.setRequestInterception(true);
page.on('request', (r) => {
    if (!r.url().includes('formspree.io')) return r.continue();
    if (r.method() === 'POST') console.log('FORMSPREE PAYLOAD', r.postData());
    r.respond({ status: 200, headers: cors, contentType: 'application/json', body: '{"ok":true}' });
});

const snap = async (name) => {
    await wait(700);
    const card = await page.$('#contact form, #contact [role=status]');
    const target = card ? await card.evaluateHandle((e) => e.closest('.rounded-3xl')) : page;
    await target.screenshot({ path: `${pre}-${name}.png` });
};
const click = (text) => page.evaluate((t) => {
    const el = [...document.querySelectorAll('#contact button')].find((b) => b.textContent.trim().startsWith(t));
    el?.click();
    return !!el;
}, text);

await page.goto(`${base}/?service=cloud&platform=aws#contact`, { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
await page.evaluate(() => localStorage.removeItem('vin-request-draft'));
await wait(2000);
await snap('1-needs-prefilled');
await click('Continue');
await click('Continue'); await snap('2-project-errors');
await click('Improve existing system');
await page.type('#message', 'Migrate our on-prem SQL Server to AWS and set up monitoring and backups.');
await click('1–3 months');
await click('Continue'); await wait(500);
await click('WhatsApp');
await page.type('#name', 'Test User');
await page.type('#email', 'test@example.com');
await click('Continue'); await snap('3-contact-errors');
await page.type('#phone', '+94 77 123 4567');
await page.click('#contact input[type=checkbox]');
await click('Continue'); await snap('4-review');
await click('Send request'); await wait(1500); await snap('5-success');
await browser.close();
