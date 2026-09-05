async (page, url = 'http://127.0.0.1:4317/atlas-study.html') => {
  const check = (value, message) => { if (!value) throw new Error(message); };
  const errors = [];
  const onError = error => errors.push(error.message);
  const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
  page.on('pageerror', onError); page.on('console', onConsole);
  page.setDefaultTimeout(8000);
  await page.addInitScript(() => {
    window.__atlasQaFrames = 0;
    const original = window.requestAnimationFrame;
    window.requestAnimationFrame = callback => original.call(window, time => { window.__atlasQaFrames++; callback(time); });
  });
  const settled = () => page.waitForFunction(() => {
    const now = performance.now();
    const before = window.__atlasQaStable;
    const count = window.__atlasQaFrames;
    if (!before || before.count !== count) window.__atlasQaStable = { count, since: now };
    return before && before.count === count && now - before.since > 200;
  }, null, { polling: 50, timeout: 5000 });
  const pixels = async () => {
    const png = await page.locator('.spatial-canvas').screenshot({ style: '.spatial-overview > :not(canvas) { visibility: hidden !important; }' });
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
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width > 650 ? 960 : 844 });
      await page.goto(url);
      await page.locator('.spatial-overview.is-ready').waitFor();
      check(!await page.locator('.spatial-fallback').isVisible(), 'WebGL unexpectedly unavailable');
      check(await page.locator('.spatial-domain').count() === 4, 'Expected four overview domains');
      check(await page.locator('.spatial-hit').count() === 20, 'Overview must not invent extra nodes');
      await page.getByRole('button', { name: '恢复三维全貌' }).click();
      await settled();
      const staticReading = await page.locator('.spatial-overview').evaluate(element => {
        const labels = [...element.querySelectorAll('.spatial-hit, .spatial-domain')];
        const boxes = labels.map(el => el.getBoundingClientRect());
        const dots = [...element.querySelectorAll('.spatial-hit')];
        const fieldStyles = [...element.querySelectorAll('.field-shape')].map(el => {
          const css = getComputedStyle(el); return css.fill + css.strokeDasharray;
        });
        const alphas = [...element.querySelectorAll('.edge-ink')].map(el => Number(el.getAttribute('opacity')));
        return {
          visible: labels.every(el => getComputedStyle(el).visibility === 'visible'),
          identities: dots.every(el => el.textContent.trim().length > 1 && el.querySelector('svg') && el.getAttribute('title').includes('：')),
          overlap: boxes.some((a, i) => boxes.some((b, j) => i !== j && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)),
          outside: boxes.some(box => box.left < 0 || box.right > innerWidth || box.top < 140 || box.bottom > innerHeight - 80),
          depthTiers: new Set(dots.map(el => el.dataset.depth)).size,
          fields: new Set(fieldStyles).size,
          contours: [...element.querySelectorAll('.field-shape')].every(el => el.getAttribute('d')?.endsWith('Z')),
          depthRange: Math.max(...alphas) - Math.min(...alphas),
          runningAnimations: element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length,
        };
      });
      check(staticReading.visible && staticReading.identities, `Unnamed or hidden node at ${width}`);
      check(!staticReading.overlap && !staticReading.outside, `Static identity collision at ${width}`);
      check(staticReading.depthTiers === 3 && staticReading.depthRange > 0.15, `Missing static depth cues at ${width}`);
      check(staticReading.fields === 4 && staticReading.contours, `Undifferentiated regions at ${width}`);
      check(staticReading.runningAnimations === 0, 'Default overview must not depend on continuous motion');
      if (width === 1440) {
        await page.locator('[data-spatial-node="unfinished"]').hover();
        await settled();
        const pulsing = await page.locator('.edge-active .edge-ink').evaluateAll(elements => elements.filter(el => el.getAnimations().some(animation => animation.playState === 'running')).length);
        check(pulsing === 6, 'Only the six actual focus connections should pulse');
        await page.waitForFunction(() => [...document.querySelectorAll('.edge-ink')].every(el => !el.getAnimations().some(animation => animation.playState === 'running')), null, { polling: 50, timeout: 3000 });
        await page.mouse.move(10, 10); await settled();
      }
      const before = await pixels();
      check(before.count > 300 && before.right - before.left > width * 0.35, `Blank or undersized 3D scene at ${width}`);
      check(before.left > 2 && before.right < width - 2 && before.top > 75 && before.bottom < before.height - 70, `Clipped 3D scene at ${width}`);
      await page.getByRole('button', { name: '转动三维视角' }).click();
      await settled();
      const after = await pixels();
      check(before.signature !== after.signature, `Rotation did not change rendered pixels at ${width}`);
      if (width === 1440) {
        const bounds = await page.locator('.spatial-canvas').boundingBox();
        await page.mouse.move(bounds.x + 80, bounds.y + 180); await page.mouse.down();
        await page.mouse.move(bounds.x + 200, bounds.y + 225, { steps: 6 }); await page.mouse.up();
        await settled();
        check((await pixels()).signature !== after.signature, 'Pointer drag did not orbit the 3D scene');
      }
      const layout = await page.locator('.spatial-domain, .spatial-hit').evaluateAll(elements => {
        const boxes = elements.map(el => el.getBoundingClientRect());
        return { overflow: document.documentElement.scrollWidth > innerWidth, hidden: elements.some(el => getComputedStyle(el).visibility !== 'visible'), overlap: boxes.some((a, i) => boxes.some((b, j) => i !== j && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)) };
      });
      check(!layout.overflow && !layout.overlap && !layout.hidden, `Overview label collision at ${width}`);
      const point = page.locator('[data-spatial-node="little"]');
      const getPosition = () => point.evaluate(el => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return { x: matrix.m41, y: matrix.m42, depth: Number(el.style.getPropertyValue('--depth-opacity')) };
      });
      const position = await getPosition();
      await page.getByRole('button', { name: '展开复杂性的秩序' }).click();
      check(await page.getByLabel('所在领域').inputValue() === 'systems', 'Domain did not open matching 2D scope');
      await page.getByRole('button', { name: '回到三维全貌' }).click();
      await settled();
      const returned = await getPosition();
      check(Math.hypot(returned.x - position.x, returned.y - position.y) < 0.5 && Math.abs(returned.depth - position.depth) < 0.0001, '3D orientation changed after returning');
      await page.getByRole('button', { name: '恢复三维全貌' }).click();
      await settled();
      await point.click();
      check((await page.locator('.material-detail h2').textContent()).includes('在途、产出与时间'), 'Point did not open the same material in 2D');
      results.push({ width, visiblePixels: before.count, bounds: [before.left, before.top, before.right, before.bottom], staticReading, rotated: true });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url);
    await page.locator('.spatial-overview.is-ready').waitFor();
    await settled();
    await page.locator('[data-spatial-node="unfinished"]').hover();
    await settled();
    const focused = await page.locator('.spatial-overview').evaluate(el => ({
      activeEdges: el.querySelectorAll('.edge-active').length,
      unrelated: el.querySelectorAll('.spatial-hit[data-related="false"]').length,
      animations: el.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length,
    }));
    check(focused.activeEdges === 6 && focused.unrelated === 13, 'Focus must only emphasize the actual local neighborhood');
    check(focused.animations === 0, 'Reduced motion must also disable local edge pulses');
    await page.getByRole('button', { name: '二维阅读', exact: true }).click();
    await settled();
    const frameCount = await page.evaluate(() => window.__atlasQaFrames);
    await page.getByRole('button', { name: '查找', exact: true }).click();
    check(await page.evaluate(() => window.__atlasQaFrames) === frameCount, 'Hidden 3D scene kept rendering');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: '回到三维全貌' }).click();
    await settled();
    check(errors.length === 0, errors.join('\n'));
    // Simulate a lost GPU context without changing the user's browser configuration.
    await page.locator('.spatial-canvas').dispatchEvent('webglcontextlost', { cancelable: true });
    await page.getByRole('button', { name: '进入二维阅读' }).click();
    check(await page.locator('.atlas-overview').isVisible(), 'GPU failure did not retain the reading path');
    return { passed: true, results, checks: ['canvas-only pixels', 'static node identity and depth', 'four region silhouettes', 'rotation and framing', 'all label collisions', 'domain and node identity', 'return orientation', 'bounded local pulse', 'reduced motion and hidden idle', 'GPU fallback'] };
  } finally {
    page.off('pageerror', onError); page.off('console', onConsole);
    await page.emulateMedia({ reducedMotion: null });
  }
}
