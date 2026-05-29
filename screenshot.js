import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/achievements',
  '/evaluation',
  '/performance',
  '/projects',
  '/projects/1',
  '/team',
  '/login',
  '/signup'
];

const outDir = path.resolve('screenshots/v2');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  for (const route of routes) {
    const page = await context.newPage();
    const url = `http://localhost:3000${route}`;
    console.log(`Navigating to ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait a bit for animations and hydration
      await page.waitForTimeout(2000);
      
      let safeRoute = route === '/' ? 'home' : route.replace(/\//g, '_').substring(1);
      const outPath = path.join(outDir, `${safeRoute}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved screenshot to ${outPath}`);
    } catch (err) {
      console.error(`Failed to screenshot ${route}: ${err.message}`);
    }
    await page.close();
  }
  
  await browser.close();
  console.log('Done!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
