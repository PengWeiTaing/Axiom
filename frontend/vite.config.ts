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
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        manualChunks: {
          three: ['three'],
          vue: ['vue', 'pinia'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 开发时把所有 API 代理到本地 Flask
      // 注意：所有规则必须用单词边界（结尾加 / 或 $），否则像 `m` 会误匹配 `/mock/...`、`/manifest.webmanifest` 等静态资源
      '^/(add|upload|fetch|recent|stats|overview|cosmos|api|memories|tasks|decisions|parse|chat|suggestions|brief|report|alerts|system|metrics|health|ping|export|import|timeline)(/|$|\\?)': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      },
      '^/(item|file|archive|restore|search|audit-log|admin|automation|artifacts|processing|tools)/': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      },
      // Board 白板页面（React 应用，由 Flask serve）
      '^/board': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      // jianzhi 模块前缀
      '^/m/': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
}));
