// Run with Playwright MCP browser_run_code_unsafe(filename), against the isolated preview.
async (page, baseUrl = 'http://127.0.0.1:4317/atlas-study.html') => {
  const url = `${baseUrl}?view=map`;
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

    await page.getByLabel('所在领域').selectOption('systems');
    await page.getByRole('button', { name: '放大', exact: true }).click();
    await page.mouse.move(45, 210); await page.mouse.down();
    await page.mouse.move(75, 235, { steps: 4 }); await page.mouse.up();
    const scopePosition = await page.locator('.map-world').getAttribute('style');
    await page.getByRole('button', { name: '在途、产出与时间', exact: true }).click();
    check(new URL(page.url()).searchParams.get('region') === 'systems', 'Reading lost its originating topic');
    check(await page.locator('.map-material.is-selected .material-excerpt').count() === 0, 'Selected map node duplicates the detail summary');
    await page.locator('.relation-item button').filter({ hasText: '开始得更多' }).click();
    check(await page.locator('.map-material.is-selected .material-title').evaluate(el => getComputedStyle(el).fontSize) === '16px', 'Selected map landmark is not compact');
    check(await page.locator('.material-detail').evaluate(el => el.scrollTop) === 0, 'Related material did not open at its beginning');
    await page.getByRole('button', { name: '把这个问题展开' }).click();
    check(new URL(page.url()).searchParams.get('region') === 'systems', 'Board lost its originating topic');
    await page.getByRole('button', { name: '回到图中的位置' }).click();
    await page.getByRole('button', { name: '关闭详情' }).click();
    check(await page.getByLabel('所在领域').inputValue() === 'systems', 'Closing a cross-topic detail lost its originating topic');
    check(await page.locator('.map-world').getAttribute('style') === scopePosition, 'Closing detail lost the topic camera');
    await page.goBack(); await page.locator('.material-detail').waitFor();
    await page.goForward(); await page.locator('.material-detail').waitFor({ state: 'hidden' });
    check(await page.getByLabel('所在领域').inputValue() === 'systems', 'History lost its topic');
    await page.getByRole('button', { name: '在途、产出与时间', exact: true }).click();
    await page.reload(); await page.locator('.material-detail').waitFor();
    await page.getByRole('button', { name: '关闭详情' }).click();
    check(await page.getByLabel('所在领域').inputValue() === 'systems', 'Reload lost the return topic');
    await page.getByLabel('所在领域').selectOption('');
    summary.push('Topic survives cross-topic reading, board, close, history and reload; camera returns in-session');

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
      await page.goto(`${baseUrl}?focus=unfinished&view=board`);
      await page.locator('.knowledge-board').waitFor({ state: 'visible' });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Board overflow: ${width}`);
      await page.getByRole('button', { name: '回到图中的位置' }).click();
      await page.getByRole('button', { name: '关闭详情' }).click();
    }
    summary.push('Four widths and four regions: no overlapping node bounds or horizontal overflow; board fits all widths');
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${baseUrl}?view=map&region=systems&focus=unfinished`);
      await page.locator('.material-detail').waitFor();
      check(await page.locator('.map-material').count() === 7, 'Compact focus must include center and all six direct neighbors');
      for (const id of ['little', 'switch']) check(await page.locator(`[data-material-id="${id}"]`).count() === 1, `Missing cross-topic neighbor ${id}`);
      check(await page.locator('.relation-region').count() === 2, 'Cross-topic context is not named in mobile detail');
      check(await page.locator('.map-lines path').count() === 6, 'Compact graph invented or omitted a primary relationship');
      const layout = await page.locator('.map-world').evaluate(element => {
        const world = element.getBoundingClientRect(), nodes = [...element.querySelectorAll('.map-material')].map(el => el.getBoundingClientRect());
        return { fits: nodes.every(box => box.left >= world.left && box.right <= world.right && box.bottom <= world.bottom),
          overlaps: nodes.some((a, i) => nodes.some((b, j) => i !== j && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)) };
      });
      check(layout.fits && !layout.overlaps, `Compact neighborhood does not fit at ${width}`);
      await page.getByRole('button', { name: '关闭详情' }).click();
      check(await page.getByLabel('所在领域').inputValue() === 'systems', 'Mobile return lost its originating topic');
      check(await page.locator('.map-material').count() === 5, 'Mobile return did not restore topic members');
      check(await page.getByLabel('所在领域').evaluate(el => el === document.activeElement), 'Return focus was lost when the selected material is outside the topic');
    }
    summary.push('Compact reading includes cross-topic neighbors, labels their topics and restores topic scope');
    await page.goto(`${baseUrl}?focus=unknown&view=map`);
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
