import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright');
const testFile = process.argv.includes('--spatial') ? './atlas-spatial.browser.js' : './atlas-study.browser.js';
const source = await readFile(new URL(testFile, import.meta.url), 'utf8');
// The same checked-in test function also runs directly through Playwright MCP.
const run = runInNewContext(source, { URL });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
let previewServer;
try {
  let url = process.env.ATLAS_STUDY_URL;
  if (process.argv.includes('--built')) {
    const { preview } = await import('vite');
    previewServer = await preview({ configFile: resolve('vite.atlas-study.config.ts'), preview: { host: '127.0.0.1', port: 0, open: false } });
    const address = previewServer.httpServer.address();
    if (!address || typeof address === 'string') throw new Error('Preview did not bind a local TCP port');
    url = `http://127.0.0.1:${address.port}/atlas-study.html`;
  }
  const page = await browser.newPage();
  console.log(JSON.stringify(await run(page, url), null, 2));
} finally {
  try { await browser.close(); } finally { await previewServer?.close(); }
}
