// Run with Playwright MCP browser_run_code_unsafe(filename), against the isolated preview.
async (page, url = 'http://127.0.0.1:4317/atlas-study.html') => {
  const key = 'axiom.atlas-study.v1';
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  const apiRequests = [];
  const onError = error => errors.push(error.message);
  const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
  const onRequest = request => { if (new URL(request.url()).pathname.startsWith('/api/')) apiRequests.push(request.url()); };
  page.on('pageerror', onError);
  page.on('console', onConsole);
  page.on('request', onRequest);
  page.setDefaultTimeout(8000);
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(url);
  const previous = await page.evaluate(key => localStorage.getItem(key), key);
  const summary = [];
  try {
    await page.evaluate(key => localStorage.removeItem(key), key);
    await page.reload();
    await page.locator('.map-material').last().waitFor();
    check(await page.locator('.map-material').count() === 20, 'Expected 20 map materials');
    check(await page.locator('.map-lines path').count() === 22, 'Expected 22 relationships');
    const image = page.locator('.map-material img');
    await image.waitFor();
    await page.waitForFunction(() => document.querySelector('.map-material img')?.naturalWidth > 0);
    summary.push('20 materials, 22 relationships, NASA image loaded');

    await page.getByRole('button', { name: '开始得更多，为何完成得更少？', exact: true }).click();
    check(await page.locator('.edge-primary.edge-secondary').count() === 0, 'Primary and secondary edge styles must not overlap');
    await page.getByRole('button', { name: '放大', exact: true }).click();
    const beforePan = await page.locator('.map-world').getAttribute('style');
    const mapBounds = await page.locator('.atlas-map').boundingBox();
    await page.mouse.move(mapBounds.x + 35, mapBounds.y + 110);
    await page.mouse.down();
    await page.mouse.move(mapBounds.x + 65, mapBounds.y + 135, { steps: 4 });
    await page.mouse.up();
    const mapPosition = await page.locator('.map-world').getAttribute('style');
    check(mapPosition !== beforePan, 'Map drag did not change its position');
    await page.getByRole('button', { name: '把这个问题展开' }).click();
    await page.locator('#in-progress').focus();
    await page.keyboard.press('Home');
    await page.keyboard.press('ArrowRight');
    check((await page.locator('.cycle-chart').getAttribute('aria-label')).includes('1.0 天'), 'L=2, rate=2 must give one day');
    await page.locator('#throughput').focus();
    await page.keyboard.press('End');
    check((await page.locator('.cycle-chart').getAttribute('aria-label')).includes('0.5 天'), 'L=2, rate=4 must give half a day');
    await page.getByRole('button', { name: '回到图中的位置' }).click();
    check(await page.locator('.map-world').getAttribute('style') === mapPosition, 'Map position was not preserved');
    await page.getByRole('button', { name: '把这个问题展开' }).click();
    check(await page.locator('#in-progress').inputValue() === '2', 'Board condition was not preserved');
    await page.getByRole('tab', { name: '哪些情况不成立' }).click();
    check(await page.locator('.limits-list article').count() === 3, 'Three counterconditions must remain accessible');
    await page.keyboard.press('Home');
    check(await page.getByRole('tab', { name: '一种解释' }).getAttribute('aria-selected') === 'true', 'Keyboard tab selection failed');
    await page.getByRole('button', { name: '恢复初始条件' }).click();
    await page.getByRole('button', { name: '留待验证', exact: true }).click();
    await page.getByRole('button', { name: '这条联系有问题', exact: true }).click();
    await page.reload();
    check(await page.getByRole('button', { name: '已留待验证', exact: true }).getAttribute('aria-pressed') === 'true', 'Saved hypothesis did not persist');
    check((await page.locator('.knowledge-board .eyebrow').first().textContent()).trim() === '已标记异议', 'Disagreement did not persist');
    await page.getByRole('button', { name: '回到图中的位置' }).click();
    check(await page.locator('.map-lines .is-rejected').count() === 1, 'Disagreement must identify exactly one relationship');
    await page.goBack();
    await page.locator('.knowledge-board').waitFor({ state: 'visible' });
    await page.goForward();
    await page.locator('.material-detail').waitFor({ state: 'visible' });
    summary.push('Focus, unobscured zoom, sliders, return position, counterconditions, local judgment, browser history');

    await page.getByRole('button', { name: '查找', exact: true }).click();
    await page.getByRole('textbox', { name: '查找内容' }).fill('不存在的线索');
    check(await page.locator('.empty-state').isVisible(), 'Missing empty search result');
    await page.getByRole('textbox', { name: '查找内容' }).fill('等待');
    const results = page.locator('.search-results > button');
    check(await results.count() > 0, 'Chinese search failed');
    await results.last().focus();
    await page.keyboard.press('Tab');
    check(await page.getByRole('button', { name: '关闭窗口' }).evaluate(el => el === document.activeElement), 'Dialog focus escaped');
    await page.getByRole('textbox', { name: '查找内容' }).press('Enter');
    await page.locator('.search-dialog').waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: '最近看过', exact: true }).click();
    check(await page.locator('.search-results > button').count() >= 2, 'Local history missing');
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await page.locator('.material-detail').waitFor({ state: 'hidden' });
    summary.push('Chinese search, empty results, keyboard focus trap, recent history, Escape');

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const region of ['practice', 'systems', 'attention', 'time']) {
        await page.getByLabel('所在领域').selectOption(region);
        const layout = await page.evaluate(() => {
          const nodes = [...document.querySelectorAll('.map-material')];
          const collisions = [];
          for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i].getBoundingClientRect(), b = nodes[j].getBoundingClientRect();
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) collisions.push([i, j]);
          }
          return { overflow: document.documentElement.scrollWidth > innerWidth, collisions };
        });
        check(!layout.overflow && !layout.collisions.length, `Map layout failed: ${width}/${region}`);
      }
      await page.goto(`${url}?focus=unfinished&view=board`);
      await page.locator('.knowledge-board').waitFor({ state: 'visible' });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Board overflow: ${width}`);
      await page.getByRole('button', { name: '回到图中的位置' }).click();
      await page.getByRole('button', { name: '关闭详情' }).click();
    }
    summary.push('Four widths and four regions: no overlapping node bounds or horizontal overflow; board fits all widths');
    await page.goto(`${url}?focus=unknown&view=board`);
    check(!await page.locator('.knowledge-board').isVisible(), 'Invalid deep link opened board');
    check(await page.locator('.material-detail').count() === 0, 'Invalid deep link opened detail');
    await page.evaluate(key => localStorage.setItem(key, '{broken'), key);
    await page.reload();
    await page.locator('.map-material').first().waitFor();
    check(errors.length === 0, `Page errors: ${errors.join('; ')}`);
    check(apiRequests.length === 0, 'Preview unexpectedly called application API');
    summary.push('Invalid URLs and corrupt local preference recover; zero page errors or application API calls');
    return { passed: true, summary };
  } finally {
    await page.evaluate(({ key, previous }) => previous === null ? localStorage.removeItem(key) : localStorage.setItem(key, previous), { key, previous });
    page.off('pageerror', onError);
    page.off('console', onConsole);
    page.off('request', onRequest);
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.goto(url);
  }
}
