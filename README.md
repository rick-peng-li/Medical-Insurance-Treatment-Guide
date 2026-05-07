# 医保政策解读与就医指南项目

本项目是一个基于 React 和 Tailwind CSS 开发的现代化医保政策解读与就医指南前端应用。旨在为用户提供清晰、便捷的医保政策查询及就医流程指引服务。

## ✨ 项目特点

- **全端适配 (Responsive Design)**：精心设计的响应式布局，完美适配 PC 端大屏与 H5 移动端（<750px）。
- **智能导航 (Smart Navigation)**：
  - **PC 端**：左侧悬浮目录，实时高亮当前阅读章节。
  - **H5 端**：顶部横向滚动菜单，支持选中项自动居中显示的流畅交互体验。
- **现代化 UI**：基于 Tailwind CSS v4 构建的清爽蓝色主题界面，视觉体验舒适。
- **丰富交互**：
  - 平滑滚动定位 (Smooth Scrolling)
  - FAQ 折叠/展开动画
  - 动态二维码生成（实时生成公众号关注二维码）
  - 医院卡片点击反馈
- **高性能**：采用 Vite 构建，秒级启动，极致轻量。

## 🛠️ 技术栈

- **核心框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS v4
- **容器化**：Docker + Nginx 多阶段构建

## 🚀 快速开始

您可以选择使用 Docker 快速部署，或在本地进行开发调试。

### 方式一：Docker 启动（推荐）

适合快速预览或部署。

**前置要求**：请确保已安装 Docker 和 Docker Compose。

**启动命令**：

在项目根目录下执行：

```bash
docker-compose up -d --build
```

**访问项目**：
启动成功后，浏览器访问 [http://localhost:3000](http://localhost:3000)

---

### 方式二：本地开发 (NPM)

适合开发者进行代码修改和调试。

**前置要求**：请确保已安装 Node.js (推荐 v18+)。

**启动步骤**：

1. **进入前端目录**：
   ```bash
   cd frontend
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **启动开发服务器**：
   ```bash
   npm run dev
   ```

**访问项目**：
开发服务器启动后，浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📂 目录结构

```
├── frontend/                # 前端源代码
│   ├── src/                 # 源码目录
│   │   ├── pages/           # 页面组件
│   │   ├── index.css        # 全局样式 (Tailwind 引入)
│   │   └── App.tsx          # 根组件
│   ├── vite.config.ts       # Vite 配置
│   └── package.json         # 项目依赖配置
├── docker-compose.yml       # Docker 编排文件
├── Dockerfile               # Docker 构建文件
└── README.md                # 项目说明文档
```

## 📝 常用命令

| 命令 | 说明 |
|Data | Description|
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产环境代码 |
| `npm run preview` | 预览构建后的生产环境代码 |
| `npm run lint` | 运行 ESLint 代码检查 |
