import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// 产物输出到 core/static/v2/，由 Flask serve
// 第二阶段加 Tauri 时，这里再加 envPrefix / clearScreen / server 配置
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: command === 'build' ? '/static/v2/' : '/',
  build: {
    outDir: '../core/static/v2',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 开发时把所有 API 代理到本地 Flask
      '^/(add|upload|fetch|item|file|archive|restore|recent|search|stats|overview|memories|tasks|decisions|parse|chat|suggestions|brief|report|alerts|system|metrics|health|ping|export|import|audit-log|admin|automation|artifacts|processing|tools|m)': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
}));
