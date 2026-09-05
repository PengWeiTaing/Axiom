import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// The study never overwrites the Flask application's production assets.
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist/atlas-study',
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      input: fileURLToPath(new URL('./atlas-study.html', import.meta.url)),
      output: { manualChunks: { three: ['three'], 'atlas-forces': ['d3-force-3d'] } },
    },
  },
});
