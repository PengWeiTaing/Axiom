# Axiom Desktop

Tauri v2 桌面壳，将 Axiom 的 Vite + Vue 3 前端打包为原生桌面应用。

## 前置条件

- [Rust](https://www.rust-lang.org/) (>= 1.77.2)
- [Node.js](https://nodejs.org/) (>= 18)
- 平台相关依赖：[Tauri 前置要求](https://v2.tauri.app/start/prerequisites/)

## 快速开始

```bash
# 1. 安装前端依赖（如果还没有）
cd ../frontend && npm install

# 2. 安装桌面壳依赖
cd ../desktop && npm install

# 3. 启动开发模式（自动启动 Vite dev server + Tauri 窗口）
npm run dev
```

## 目录结构

```
desktop/
├── package.json              # Node 脚本（tauri dev / tauri build）
├── src-tauri/
│   ├── Cargo.toml            # Rust 依赖
│   ├── build.rs              # Tauri 构建脚本
│   ├── tauri.conf.json       # Tauri v2 配置
│   ├── capabilities/
│   │   └── default.json      # 权限声明
│   ├── icons/                # 应用图标（需自行放置）
│   └── src/
│       ├── main.rs           # 入口
│       └── lib.rs            # 插件注册、自定义命令（待扩展）
└── README.md
```

## 构建

```bash
npm run build
```

产物在 `src-tauri/target/release/` 下。

## 架构说明

- **前端**：`../frontend/` (Vite + Vue 3 + TypeScript)，产物输出到 `../core/static/v2/`
- **后端**：Flask，运行在 `http://127.0.0.1:5000`
- **桌面壳**：本目录，通过 Tauri v2 加载前端并暴露原生能力（shell、dialog、文件系统、HTTP）
- 目前无自定义 Rust 命令，仅通过插件提供原生能力；后续可在 `src-tauri/src/lib.rs` 中扩展 IPC 命令
