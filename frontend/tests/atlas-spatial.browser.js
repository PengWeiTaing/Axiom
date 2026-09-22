async (page, url = 'http://127.0.0.1:4317/atlas-study.html') => {
  const check = (value, message) => { if (!value) throw new Error(message); };
  const errors = [];
  const onError = error => errors.push(error.message);
  const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
  page.on('pageerror', onError); page.on('console', onConsole); page.setDefaultTimeout(8000);
  await page.addInitScript(() => {
    window.__atlasQaFrames = 0;
    const original = window.requestAnimationFrame;
    window.requestAnimationFrame = callback => original.call(window, time => { window.__atlasQaFrames++; callback(time); });
  });
  const settled = async () => {
    // Each interaction needs its own quiet interval; a previous idle sample can precede the next frame.
    await page.evaluate(() => { window.__atlasQaStable = null; });
    await page.waitForFunction(() => {
      const now = performance.now(), before = window.__atlasQaStable, count = window.__atlasQaFrames;
      if (!before || before.count !== count) window.__atlasQaStable = { count, since: now };
      return before && before.count === count && now - before.since > 200;
    }, null, { polling: 50, timeout: 5000 });
  };
  const identityPositions = () => page.locator('.spatial-dot-hit, .spatial-hit, .spatial-domain').evaluateAll(elements => elements.map(el => ({ id: el.dataset.spatialNode || el.dataset.nodeLabel || el.dataset.spatialRegion, transform: el.style.transform })));
  const inspect = () => page.locator('.spatial-overview').evaluate(element => {
    const labels = [...element.querySelectorAll('.spatial-hit, .spatial-domain')].filter(el => getComputedStyle(el).visibility === 'visible');
    const boxes = labels.map(el => el.getBoundingClientRect());
    const dots = [...element.querySelectorAll('.spatial-dot-hit')];
    return {
      labels: Number(element.querySelector('.spatial-stage').dataset.visibleLabels), domains: labels.filter(el => el.classList.contains('spatial-domain')).length,
      identities: dots.every(el => el.getAttribute('aria-label').length > 4 && el.title.includes('：')),
      overlap: boxes.some((a, i) => boxes.some((b, j) => i !== j && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)),
      outside: boxes.some(box => box.left < 0 || box.right > innerWidth || box.top < 140 || box.bottom > innerHeight - 80),
      depthTiers: new Set(dots.map(el => el.dataset.depth)).size,
      comparisonControls: element.querySelectorAll('.composition-switch').length, visibleEdges: Number(element.querySelector('.spatial-stage').dataset.visibleEdges),
      overflow: document.documentElement.scrollWidth > innerWidth,
      animations: element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length,
    };
  });
  const pixels = async () => {
    const png = await page.locator('.spatial-canvas').screenshot({ style: '.spatial-stage > :not(canvas) { visibility: hidden !important; }' });
    return page.evaluate(async bytes => {
      const image = await createImageBitmap(new Blob([new Uint8Array(bytes)], { type: 'image/png' }));
      const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext('2d'); ctx.drawImage(image, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let count = 0, signature = 0, left = canvas.width, right = 0, top = canvas.height, bottom = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.max(Math.abs(data[i] - 23), Math.abs(data[i + 1] - 25), Math.abs(data[i + 2] - 25)) < 16) continue;
        const x = i / 4 % canvas.width, y = Math.floor(i / 4 / canvas.width);
        count++; signature = (signature + (i + 1) * (data[i] + data[i + 1] * 2 + data[i + 2] * 3)) % 1000000007;
        left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
      image.close(); return { count, signature, left, right, top, bottom, width: canvas.width, height: canvas.height };
    }, [...png]);
  };
  const results = [];
  try {
    for (const [width, height] of [[1440, 960], [1440, 800], [1366, 768], [1440, 720], [768, 960], [390, 844], [320, 740]]) {
      await page.setViewportSize({ width, height });
      const start = new URL(url); start.searchParams.set('view', 'space'); start.searchParams.delete('composition');
      await page.goto(start.href); await page.locator('.spatial-overview.is-ready').waitFor();
      await page.evaluate(() => document.fonts.ready); await settled();
      check(!await page.locator('.spatial-fallback').isVisible(), 'WebGL unexpectedly unavailable');
      check(await page.locator('.spatial-dot-hit').count() === 20, 'Overview must use twenty real materials');
      const a = await inspect(), positions = await identityPositions(), before = await pixels();
      check(a.domains === 4 && a.labels >= 4 && a.labels < 20 && a.identities, `Missing meaningful overview identities at ${width}: ${JSON.stringify(a)}`);
      check(!a.overlap && !a.outside && !a.overflow && a.depthTiers === 3, `Unreadable static overview at ${width}: ${JSON.stringify(a)}`);
      check(a.comparisonControls === 0 && a.visibleEdges === 19 && a.animations === 0, 'Overview must stay static without surface controls');
      check(before.count > 100 && before.left > 5 && before.right < before.width - 5 && before.top > 80 && before.bottom < before.height - 70, `Point canvas blank or badly framed at ${width}: ${JSON.stringify(before)}`);
      for (const composition of ['points', 'surfaces']) {
        const legacy = new URL(start); legacy.searchParams.set('composition', composition);
        await page.goto(legacy.href); await page.locator('.is-ready').waitFor(); await page.evaluate(() => document.fonts.ready); await settled();
        check((await inspect()).comparisonControls === 0, 'Legacy link restored surface controls');
        check(JSON.stringify(await identityPositions()) === JSON.stringify(positions), 'Legacy link changed camera or label positions');
        check(JSON.stringify(await pixels()) === JSON.stringify(before), `Legacy ${composition} link changed point-only rendering`);
      }
      await page.reload(); await page.locator('.is-ready').waitFor(); await page.evaluate(() => document.fonts.ready); await settled();
      check(JSON.stringify(await pixels()) === JSON.stringify(before), 'Reload restored topic surfaces');
      if (width === 1440 && height === 960) {
        const still = await identityPositions();
        await page.locator('[data-node-label="unfinished"]').hover(); await settled();
        check(JSON.stringify(await identityPositions()) === JSON.stringify(still), 'Hover displaced labels');
        const focused = await page.locator('.spatial-stage').evaluate(el => ({ unrelated: el.querySelectorAll('.spatial-dot-hit[data-related="false"]').length, active: Number(el.dataset.activeEdges) }));
        check(focused.unrelated === 13 && focused.active === 6, 'Focus failed to expose the real neighborhood');
        await page.mouse.move(20, 190); await settled();
        const anchorOffsets = () => page.locator('.spatial-hit').evaluateAll(elements => elements.map(el => {
          const dot = document.querySelector('[data-spatial-node="' + el.dataset.nodeLabel + '"]');
          const matrix = new DOMMatrixReadOnly(el.style.transform);
          return { id: el.dataset.nodeLabel, x: matrix.m41 - Number(dot.dataset.anchorX), y: matrix.m42 - Number(dot.dataset.anchorY), anchorX: Number(dot.dataset.anchorX) };
        }));
        const offsets = await anchorOffsets();
        await page.mouse.move(720, 500); await page.mouse.down();
        for (let step = 1; step <= 18; step++) {
          await page.mouse.move(720 + step * 3, 500 + step); await page.waitForTimeout(20);
          const current = await anchorOffsets();
          check(current.every((item, i) => Math.hypot(item.x - offsets[i].x, item.y - offsets[i].y) < 0.02), 'Name changed its local offset during drag');
          check(!(await inspect()).overlap, 'Visible names collided during sampled drag');
        }
        await page.mouse.up(); await settled();
        check((await anchorOffsets()).some((item, i) => Math.abs(item.anchorX - offsets[i].anchorX) > 10), 'Drag did not move the 3D scene');
        const stopped = await identityPositions(); await page.waitForTimeout(400);
        check(JSON.stringify(await identityPositions()) === JSON.stringify(stopped), 'Names drifted after gesture release');
      }
      await page.getByRole('button', { name: '转动三维视角' }).click(); await settled();
      check((await pixels()).signature !== before.signature, 'Rotation did not alter canvas pixels');
      const rotated = await identityPositions();
      const reading = await inspect(); check(!reading.overlap && !reading.outside, `Rotation collisions at ${width}`);
      await page.getByRole('button', { name: '二维阅读', exact: true }).click();
      await page.getByRole('button', { name: '回到三维全貌' }).click(); await settled();
      check(JSON.stringify(await identityPositions()) === JSON.stringify(rotated), 'Returning from 2D lost the camera orientation');
      check((await inspect()).comparisonControls === 0, 'Returning from 2D restored surface controls');
      await page.getByRole('button', { name: '恢复三维全貌' }).click(); await settled();
      await page.getByRole('button', { name: '展开复杂性的秩序' }).click();
      check(await page.getByLabel('所在领域').inputValue() === 'systems', 'Topic did not open matching reading scope');
      await page.getByRole('button', { name: '回到三维全貌' }).click(); await settled();
      const overviewPosition = await identityPositions(), overviewUrl = page.url();
      const storage = await page.evaluate(() => localStorage.getItem('axiom.atlas-study.v1'));
      await page.locator('[data-node-label="little"]').click();
      await page.locator('.spatial-preview').waitFor(); await settled();
      check(page.url() === overviewUrl && !await page.locator('.material-detail').isVisible(), 'Preview navigated away from the 3D overview');
      check(await page.evaluate(() => localStorage.getItem('axiom.atlas-study.v1')) === storage, 'Preview unexpectedly persisted reading history');
      check((await page.locator('#spatial-preview-title').textContent()).includes('在途、产出与时间'), 'Preview lost material identity');
      check(await page.locator('.preview-links button').count() === 4, 'Preview must show exactly the real direct neighbors');
      check(await page.locator('[data-node-label="little"]').isVisible(), 'Pinned material lost its name in the scene');
      check((await page.locator('.preview-boundary').textContent()).includes('不单独证明'), 'Preview stripped the research boundary');
      await page.mouse.move(10, 80); await settled();
      check(await page.locator('.spatial-stage').getAttribute('data-active-edges') === '4', 'Pointer leaving cleared the pinned neighborhood');
      const fit = await page.locator('.spatial-overview').evaluate(el => {
        const stage = el.querySelector('.spatial-stage').getBoundingClientRect();
        const pane = el.querySelector('.spatial-preview').getBoundingClientRect();
        const dot = el.querySelector('[data-spatial-node="little"]').getBoundingClientRect();
        const button = el.querySelector('.preview-bottom button').getBoundingClientRect();
        return { overlap: stage.left < pane.right && stage.right > pane.left && stage.top < pane.bottom && stage.bottom > pane.top,
          dotFits: dot.left >= stage.left && dot.right <= stage.right && dot.top >= stage.top && dot.bottom <= stage.bottom,
          actionFits: button.left >= 0 && button.right <= innerWidth && button.bottom <= innerHeight + 1,
          overflow: document.documentElement.scrollWidth > innerWidth };
      });
      check(!fit.overlap && fit.dotFits && fit.actionFits && !fit.overflow, `Preview obscures the scene or action at ${width}: ${JSON.stringify(fit)}`);
      const previewPosition = await identityPositions();
      await page.locator('[data-preview-target="unfinished"]').click(); await settled();
      check(await page.locator('.preview-links button').count() === 6, 'Cross-topic preview lost its own neighborhood');
      check(await page.locator('.spatial-stage').getAttribute('data-active-edges') === '6', 'Cross-topic preview did not update highlighting');
      await page.getByRole('button', { name: '返回上一个预览' }).click(); await settled();
      check(JSON.stringify(await identityPositions()) === JSON.stringify(previewPosition), 'Following a related preview moved the camera');
      if (width === 1440 && height === 960) {
        await page.getByRole('button', { name: '查找', exact: true }).click();
        await page.keyboard.press('Escape');
        check(await page.locator('.spatial-preview').isVisible(), 'Closing search also closed the underlying preview');
      }
      await page.getByRole('button', { name: '进入局部阅读' }).click();
      check((await page.locator('.material-detail h2').textContent()).includes('在途、产出与时间'), 'Material identity changed between 3D and 2D');
      check(new URL(page.url()).searchParams.get('region') === 'systems', 'Local reading lost the preview topic');
      if (width === 1440 && height === 960) {
        await page.goBack(); await settled();
        check(await page.locator('.spatial-preview').isVisible(), 'Browser back lost the 3D preview');
        await page.goForward(); await page.locator('.material-detail').waitFor();
      }
      await page.locator('.header-location button').click(); await settled();
      check(await page.locator('.spatial-preview').isVisible(), 'Returning from reading lost the pinned preview');
      check(JSON.stringify(await identityPositions()) === JSON.stringify(previewPosition), 'Returning from reading changed the 3D camera');
      await page.keyboard.press('Escape'); await page.locator('.spatial-preview').waitFor({ state: 'hidden' }); await settled();
      check(await page.locator('[data-spatial-node="little"]').evaluate(el => el === document.activeElement), 'Closing preview lost keyboard focus');
      const restored = await identityPositions();
      check(await page.evaluate(({ before, after }) => before.every((entry, i) => {
        const a = new DOMMatrixReadOnly(entry.transform), b = new DOMMatrixReadOnly(after[i].transform);
        return Math.hypot(a.m41 - b.m41, a.m42 - b.m42) < 0.05;
      }), { before: overviewPosition, after: restored }), 'Closing preview did not restore the full scene framing');
      if (width === 1440 && height === 960) {
        await page.locator('[data-spatial-node="little"]').focus(); await page.keyboard.press('Enter'); await settled();
        check(await page.locator('.spatial-preview').evaluate(el => el === document.activeElement), 'Keyboard activation did not focus preview');
        await page.getByRole('button', { name: '转动三维视角' }).click(); await settled();
        const turnedPreview = await identityPositions();
        check(JSON.stringify(turnedPreview) !== JSON.stringify(previewPosition), 'Preview prevented scene rotation');
        await page.getByRole('button', { name: '关闭预览' }).click(); await settled();
        await page.locator('[data-spatial-node="little"]').click(); await settled();
        const reopened = await identityPositions();
        check(await page.evaluate(({ before, after }) => before.every((entry, i) => {
          const a = new DOMMatrixReadOnly(entry.transform), b = new DOMMatrixReadOnly(after[i].transform);
          return Math.hypot(a.m41 - b.m41, a.m42 - b.m42) < 0.05;
        }), { before: turnedPreview, after: reopened }), 'Reopening preview lost the user-adjusted viewing angle');
        await page.getByRole('button', { name: '查找', exact: true }).focus(); await page.keyboard.press('Escape');
        await page.locator('.spatial-preview').waitFor({ state: 'hidden' });
      }
      results.push({ width, height, pointsPixels: before.count, legacyLinksMatch: true, labels: a.labels, domains: a.domains });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url); await page.locator('.is-ready').waitFor(); await settled();
    check((await inspect()).animations === 0, 'Reduced motion must not animate the scene');
    await page.getByRole('button', { name: '二维阅读', exact: true }).click(); await settled();
    const count = await page.evaluate(() => window.__atlasQaFrames);
    await page.getByRole('button', { name: '查找', exact: true }).click();
    check(await page.evaluate(() => window.__atlasQaFrames) === count, 'Hidden 3D kept rendering');
    await page.keyboard.press('Escape'); await page.getByRole('button', { name: '回到三维全貌' }).click(); await settled();
    await page.locator('.spatial-canvas').dispatchEvent('webglcontextlost', { cancelable: true });
    await page.getByRole('button', { name: '进入二维阅读' }).click();
    check(await page.locator('.atlas-overview').isVisible(), 'GPU failure lost the reading path');
    await page.goto(url); await page.locator('.is-ready').waitFor(); await settled();
    await page.locator('[data-node-label="little"]').click(); await settled();
    await page.locator('.spatial-canvas').dispatchEvent('webglcontextlost', { cancelable: true });
    await page.getByRole('button', { name: '进入二维阅读' }).click();
    check((await page.locator('.material-detail h2').textContent()).includes('在途、产出与时间'), 'GPU failure lost the pinned material');
    check(errors.length === 0, errors.join('\n'));
    return { passed: true, results, checks: ['point-only rendering', 'legacy composition links stay point-only', 'semantic label budget', 'four named topics on mobile', 'anchored names throughout drag', 'no post-gesture drift', 'pinned real-neighbor preview without navigation or writes', 'preview trail and unobscured mobile actions', '2D return preserves preview and camera', 'Escape restores scene framing and keyboard focus', 'reduced motion and hidden idle', 'GPU fallback'] };
  } finally {
    page.off('pageerror', onError); page.off('console', onConsole); await page.emulateMedia({ reducedMotion: null });
  }
}
