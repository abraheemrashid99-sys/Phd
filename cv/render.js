const { chromium } = require('playwright');
(async () => {
  const [,, inp, out] = process.argv;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + inp, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-family:Caladea,serif;font-size:8pt;color:#555;padding:0 17mm;display:flex;justify-content:space-between;"><span>Raja Abraheem Rashid Ejaz · Curriculum Vitae</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>' });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
