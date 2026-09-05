import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright');
const source = await readFile(new URL('./atlas-study.browser.js', import.meta.url), 'utf8');
// The same checked-in test function also runs directly through Playwright MCP.
const run = runInNewContext(source, { URL });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
try {
  const page = await browser.newPage();
  console.log(JSON.stringify(await run(page, process.env.ATLAS_STUDY_URL), null, 2));
} finally {
  await browser.close();
}
