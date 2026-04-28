import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
});

await page.goto('https://reforma-ud.vercel.app/canonico/m01/', { waitUntil: 'networkidle' });

const wikilink = page.locator('a.wikilink[href^="/glosario/con-"]').first();
await wikilink.scrollIntoViewIfNeeded();

const html = await wikilink.evaluate((el) => el.outerHTML);
const parentTag = await wikilink.evaluate((el) => el.parentElement?.tagName);
const radixAttrs = await wikilink.evaluate((el) => {
  const attrs = el.getAttributeNames().filter((n) => n.startsWith('data-') || n.startsWith('aria-'));
  return attrs.map((n) => `${n}=${el.getAttribute(n)}`).join(' | ');
});
console.log('Wikilink HTML:', html.slice(0, 200));
console.log('Parent:', parentTag);
console.log('Data/aria attrs:', radixAttrs || '(none — no Radix hydration)');

await wikilink.hover({ force: true });
await page.waitForTimeout(800);

const radixContent = await page.locator('[data-radix-hover-card-content-wrapper], [data-radix-popper-content-wrapper]').count();
const stateOpen = await page.locator('[data-state="open"]').count();
const verConcepto = await page.getByText('Ver concepto completo').count();
console.log('Post-hover · radix-popper count:', radixContent);
console.log('Post-hover · data-state=open count:', stateOpen);
console.log('Post-hover · "Ver concepto completo" count:', verConcepto);
console.log('Errors:', errors.length ? errors.slice(0, 3) : '(none)');
await browser.close();
