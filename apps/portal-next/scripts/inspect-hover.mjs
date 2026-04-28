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

// Check React hydration markers
const hydratedInfo = await wikilink.evaluate((el) => {
  const fiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
  const propsKey = Object.keys(el).find(k => k.startsWith('__reactProps'));
  const hasFiber = !!fiberKey;
  const hasProps = !!propsKey;
  let onPointerEnter = null;
  if (propsKey) {
    const props = el[propsKey];
    onPointerEnter = typeof props?.onPointerEnter === 'function' ? 'function' : typeof props?.onPointerEnter;
  }
  return { hasFiber, hasProps, onPointerEnter };
});
console.log('Hydration:', hydratedInfo);

// Check sheet overlay state — bug confirmado: queda interceptando pointer events
const overlayState = await page.evaluate(() => {
  const overlay = document.querySelector('[data-slot="sheet-overlay"]');
  if (!overlay) return 'no overlay';
  return {
    state: overlay.getAttribute('data-state'),
    classes: overlay.className.slice(0, 100),
    pointerEvents: window.getComputedStyle(overlay).pointerEvents,
  };
});
console.log('Sheet overlay state:', overlayState);

// Diagnose what's at the wikilink position (might be overlay blocking events)
const overlayDiag = await wikilink.evaluate((el) => {
  const r = el.getBoundingClientRect();
  const x = r.x + r.width / 2;
  const y = r.y + r.height / 2;
  const topEl = document.elementFromPoint(x, y);
  const isLink = topEl === el;
  const computed = topEl ? window.getComputedStyle(topEl) : null;
  const ancestorPtrNone = [];
  let cur = el.parentElement;
  while (cur) {
    const cs = window.getComputedStyle(cur);
    if (cs.pointerEvents === 'none') ancestorPtrNone.push(cur.tagName + '.' + (cur.className || '').slice(0, 30));
    cur = cur.parentElement;
  }
  return {
    elementAtPoint: topEl?.tagName + '.' + (topEl?.className || '').slice(0, 50),
    isWikilinkOnTop: isLink,
    pointerEventsOnTop: computed?.pointerEvents,
    ancestorsWithPtrNone: ancestorPtrNone,
  };
});
console.log('Overlay diag:', overlayDiag);
await page.waitForTimeout(1000);

const radixContent = await page.locator('[data-radix-hover-card-content-wrapper], [data-radix-popper-content-wrapper]').count();
const stateOpen = await page.locator('[data-state="open"]').count();
const verConcepto = await page.getByText('Ver concepto completo').count();
const hoverContentVisible = await page.locator('[data-slot="hover-card-content"]').count();
console.log('Post-hover · radix-popper count:', radixContent);
console.log('Post-hover · data-state=open count:', stateOpen);
console.log('Post-hover · hover-card-content count:', hoverContentVisible);
console.log('Post-hover · "Ver concepto completo" count:', verConcepto);

// Check if the wikilink itself transitioned to open state
const wikilinkState = await wikilink.evaluate(el => el.getAttribute('data-state'));
console.log('Post-hover · wikilink data-state:', wikilinkState);

// Inspect the body of any rendered hover card
const allBodyHTML = await page.evaluate(() => {
  const cards = document.querySelectorAll('[data-slot="hover-card-content"], [data-radix-popper-content-wrapper]');
  return Array.from(cards).map(c => c.outerHTML.slice(0, 200));
});
console.log('Card HTMLs:', allBodyHTML);

console.log('Errors:', errors.length ? errors.slice(0, 3) : '(none)');
await browser.close();
