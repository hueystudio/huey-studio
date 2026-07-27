# Huey Studio 技术文档

> 本文档记录项目从初始化到当前阶段的所有技术选型、目录结构、已完成工作与后续建议。
>
> 最后更新：2026-07-27

---

## 1. 项目概述

**Huey Studio** 是一个基于 React 18 的前端 Starter 项目，使用 Vite 作为构建工具，TypeScript 作为开发语言。项目目标是提供一套可直接扩展的现代化前端基础架构，涵盖路由、数据请求、UI 组件与样式体系。

当前阶段为 **基础脚手架已完成**，包含示例页面、API 层骨架与 TanStack Query 集成，尚未接入真实后端，也未引入全局客户端状态管理库。

---

## 2. 技术选型

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | React | 18.3 | 用户指定 React 18，已从 Vite 模板默认的 React 19 降级 |
| 构建工具 | Vite | 8.x | 开发服务器与生产构建 |
| 语言 | TypeScript | 6.x | 严格类型检查 |
| 路由 | React Router | 6.30 | v6 API，`createBrowserRouter` |
| 数据请求 / 缓存 | TanStack Query | 5.x | 服务端状态管理 |
| 样式 | Tailwind CSS | 4.x | 通过 `@tailwindcss/vite` 插件集成 |
| UI 组件库 | ShadCN UI | 4.x | Nova 主题，Base UI 底层 |
| 包管理 | pnpm | 10.8.1 | 自 npm 迁移而来 |
| 代码检查 | Oxlint | 1.x | Vite 模板自带 |

### 项目环境

项目初始化与日常开发使用的运行环境如下：

| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | 22.22.2 | 当前开发环境版本；Vite 8 要求 Node `^20.19.0` 或 `>=22.12.0` |
| pnpm | 10.8.1 | 已在 `package.json` 的 `packageManager` 字段锁定 |

> 建议使用 [Corepack](https://pnpm.io/installation#using-corepack) 启用 pnpm，以确保团队使用一致的包管理器版本：
>
> ```bash
> corepack enable
> corepack prepare pnpm@10.8.1 --activate
> ```

### ShadCN UI 配置详情

- **组件库底层**：Base UI（`@base-ui/react`）
- **主题预设**：Nova
- **图标库**：Lucide React
- **字体**：Geist Variable（`@fontsource-variable/geist`）
- **配置文件**：根目录 `components.json`

---

## 3. 初始化历程

以下按时间顺序记录项目搭建过程中完成的所有工作。

### 3.1 项目脚手架

1. 使用 `npm create vite@latest . -- --template react-ts` 创建 Vite + React + TypeScript 项目
2. 将 React 降级至 18.3，匹配技术选型要求
   - Vite 官方模板默认安装 **React 19**，与技术选型（React 18）不符，需手动降级运行时与类型定义
   - 命令：
     ```bash
     npm install react@^18.3.1 react-dom@^18.3.1
     npm install -D @types/react@^18.3.12 @types/react-dom@^18.3.1
     ```
   - 降级后 `package.json` 中 `react`、`react-dom` 锁定为 `^18.3.1`
3. 安装并配置 **React Router v6**（`react-router-dom@^6.30`）
   - 命令：
     ```bash
     npm install react-router-dom@^6.30.0
     ```
   - 说明：若直接执行 `npm install react-router-dom`，默认可能安装 v7；需显式指定 `^6.30.0` 以使用 v6 API（如 `createBrowserRouter`）
4. 安装并配置 **TanStack Query**（`@tanstack/react-query`）
   - 命令：
     ```bash
     npm install @tanstack/react-query
     ```
   - 后续在 `src/providers/query-provider.tsx` 中配置全局 `QueryClientProvider`

> 以上依赖安装发生在项目初期（使用 npm）。项目后续已迁移至 pnpm，等价命令为 `pnpm add <package>`。

### 3.2 样式与 UI

#### 1. 安装 Tailwind CSS 4

Tailwind CSS 4 通过 Vite 插件集成，无需单独的 `tailwind.config.js` 或 PostCSS 配置。

命令：

```bash
npm install tailwindcss @tailwindcss/vite
```

在 `src/index.css` 入口引入 Tailwind（ShadCN 初始化前需先有这一步）：

```css
@import "tailwindcss";
```

在 `vite.config.ts` 中注册插件：

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
})
```

#### 2. 配置路径别名 `@` → `src/`

ShadCN CLI 初始化时会校验 `@/` 别名是否存在，需同时在 **Vite** 与 **TypeScript** 中配置。

**Vite**（`vite.config.ts`）：

```ts
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**TypeScript**（`tsconfig.app.json`）：

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 3. 初始化 ShadCN UI

前置条件：Tailwind CSS 4 已安装、`@` 别名已配置。否则会报错：

- `No Tailwind CSS configuration found`
- `Could not find valid path aliases`

命令及参数说明：

```bash
npx shadcn@latest init -t vite -b base -p nova -y
```

| 参数 | 含义 |
|------|------|
| `-t vite` | 使用 Vite 模板 |
| `-b base` | 组件底层库选 Base UI（非 Radix） |
| `-p nova` | 主题预设 Nova（Lucide 图标 + Geist 字体） |
| `-y` | 跳过确认提示 |

初始化完成后自动完成以下工作：

- 生成 `components.json`（ShadCN 配置文件，记录组件路径、主题风格等）
- 安装运行时依赖（见下表）
- 创建 `src/lib/utils.ts`（`cn()` 工具函数，合并 Tailwind class）
- 创建 `src/components/ui/button.tsx`（示例 Button 组件）
- 重写 `src/index.css`，追加 ShadCN 主题变量、暗色模式、`@theme inline` 等：

**依赖安装依据**

上述依赖列表并非手工指定，而是来自以下来源交叉核对：

1. **`shadcn init` CLI 输出**：初始化过程中有 `Installing dependencies` 步骤，CLI 会根据所选模板（`-t vite`）、组件库（`-b base`）、预设（`-p nova`）自动写入 `package.json`
2. **当前 `package.json`**：可在项目根目录直接查看最终安装的包及版本
3. **生成文件的 import / CSS 引用**：每个包在代码中都有对应用途，可反向验证是否为 ShadCN 初始化引入

| 依赖包 | 版本（当前） | 依据 / 用途 |
|--------|-------------|-------------|
| `class-variance-authority` | ^0.7.1 | `button.tsx` 中 `cva()` 定义组件变体样式 |
| `clsx` | ^2.1.1 | `src/lib/utils.ts` 中 `cn()` 合并 className |
| `tailwind-merge` | ^3.6.0 | 同上，`twMerge()` 处理 Tailwind 类名冲突 |
| `lucide-react` | ^1.27.0 | `components.json` 中 `"iconLibrary": "lucide"` |
| `@base-ui/react` | ^1.6.0 | `components.json` 中 `"style": "base-nova"`；`button.tsx` 引用 `@base-ui/react/button` |
| `tw-animate-css` | ^1.4.0 | `src/index.css` 中 `@import "tw-animate-css"` |
| `@fontsource-variable/geist` | ^5.3.0 | `-p nova` 预设使用 Geist 字体；`index.css` 中 `@import "@fontsource-variable/geist"` |
| `shadcn` | ^4.15.0 | CLI 本身及其 `@import "shadcn/tailwind.css"` 样式依赖 |

> **注意**：`tailwindcss` 与 `@tailwindcss/vite` 是在 **3.2 第 1 步** 手动安装的，不属于 `shadcn init` 自动安装的依赖。若跳过第 1 步，`shadcn init` 会因检测不到 Tailwind 而失败。

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";
/* ... CSS 变量、.dark 主题、@layer base ... */
```

#### 4. 修正 ShadCN CLI 路径问题

ShadCN CLI 在部分环境下会将组件误创建到项目根目录的 `@/` 文件夹（字面量目录名），而非 `src/` 下。需手动迁移：

```bash
mkdir -p src/lib src/components/ui
mv @/lib/utils.ts src/lib/utils.ts
mv @/components/ui/button.tsx src/components/ui/button.tsx
rm -rf @
```

迁移后，`components.json` 中的别名配置（`@/components`、`@/lib` 等）与 `src/` 目录结构一致，组件 import 路径 `@/components/ui/button` 可正常使用。

> 后续添加组件请使用 `pnpm dlx shadcn@latest add <component>`，添加后确认文件落在 `src/components/ui/` 而非根目录 `@/`。

### 3.3 应用架构

1. **路由层**（`src/routes/router.tsx`）
   - `/` → 首页
   - `/about` → 关于页
   - 使用嵌套路由 + 布局组件 `AppLayout`

2. **页面层**（`src/pages/`）
   - `home-page.tsx`：展示 API + TanStack Query 联调示例
   - `about-page.tsx`：静态介绍页

3. **布局组件**（`src/components/layout/app-layout.tsx`）
   - 顶部导航栏
   - 主内容区 `<Outlet />`

4. **Provider 层**（`src/providers/query-provider.tsx`）
   - 全局 `QueryClientProvider`
   - 默认配置：`staleTime: 60s`，`retry: 1`

5. **入口**（`src/App.tsx`、`src/main.tsx`）
   - `App` 组合 `QueryProvider` + `RouterProvider`
   - `main.tsx` 挂载 React 根节点

### 3.4 API 层

1. 创建 `src/api/client.ts`：通用 `fetch` 封装
   - 读取环境变量 `VITE_API_BASE_URL` 作为 base URL
   - 统一 JSON 序列化 / 反序列化
   - 自定义 `ApiError` 错误类型

2. 创建 `src/api/app.ts`：业务接口示例
   - `getSamplePost()`：请求 `/posts/1`

3. 创建 `src/api/index.ts`：统一导出

4. 创建环境变量文件：
   - `.env.example`：模板，可提交 Git
   - `.env`：本地配置，**不提交 Git**
   - 当前 demo 指向 `https://jsonplaceholder.typicode.com`

5. 创建 `src/vite-env.d.ts`：为 `VITE_API_BASE_URL` 提供 TypeScript 类型

6. 首页接入 API 层，通过 `useQuery` 展示示例数据

### 3.5 包管理迁移（npm → pnpm）

1. 删除 `node_modules` 与 `package-lock.json`
2. 执行 `pnpm install` 生成 `pnpm-lock.yaml`
3. 在 `package.json` 中声明 `"packageManager": "pnpm@10.8.1"`
4. 更新 `.gitignore`，忽略 `package-lock.json`、`.pnpm-store`
5. 更新 `README.md` 中的命令为 pnpm 写法

### 3.6 Git 仓库

1. 执行 `git init`，默认分支 `main`
2. 完善 `.gitignore`（依赖、构建产物、环境变量、编辑器、OS 文件等）
3. 首次提交：
   - **Commit**：`febe2ab`
   - **Message**：`Initial commit: React + Vite starter for Huey Studio.`
   - **范围**：31 个文件，不含 `.env`、`node_modules`、`dist`

---

## 4. 目录结构

```
huey-studio/
├── docs/
│   └── introduces.md          # 本文档
├── public/                    # 静态资源（不经 Vite 处理）
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/                   # API 层
│   │   ├── client.ts          # HTTP 客户端封装
│   │   ├── app.ts             # 业务接口
│   │   └── index.ts           # 统一导出
│   ├── assets/                # 图片、SVG 等资源
│   ├── components/
│   │   ├── layout/
│   │   │   └── app-layout.tsx # 全局布局
│   │   └── ui/
│   │       └── button.tsx     # ShadCN Button 组件
│   ├── lib/
│   │   └── utils.ts           # cn() 等工具函数
│   ├── pages/                 # 页面组件（按路由组织）
│   │   ├── home-page.tsx
│   │   └── about-page.tsx
│   ├── providers/
│   │   └── query-provider.tsx # TanStack Query Provider
│   ├── routes/
│   │   └── router.tsx         # 路由配置
│   ├── App.tsx                # 根组件
│   ├── main.tsx               # 应用入口
│   ├── index.css              # 全局样式 + Tailwind + ShadCN 主题
│   └── vite-env.d.ts          # Vite 环境变量类型
├── .env.example               # 环境变量模板（提交 Git）
├── .env                       # 本地环境变量（不提交 Git）
├── .gitignore
├── components.json            # ShadCN 配置
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 5. 核心配置说明

### 5.1 Vite（`vite.config.ts`）

- 插件：`@vitejs/plugin-react`、`@tailwindcss/vite`
- 路径别名：`@` → `./src`

### 5.2 TypeScript（`tsconfig.app.json`）

- 路径映射：`@/*` → `./src/*`
- 目标：`ES2023`
- 模块解析：`bundler`
- 启用 `ignoreDeprecations: "6.0"`（兼容 TS 6 中 `baseUrl` 弃用提示）

### 5.3 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_BASE_URL` | 后端 API 根地址，**不要**带末尾 `/` | `https://jsonplaceholder.typicode.com` |

> Vite 只有以 `VITE_` 前缀开头的变量才会暴露给客户端代码。

### 5.4 npm scripts

| 命令 | 作用 |
|------|------|
| `pnpm dev` | 启动开发服务器（默认 http://localhost:5173） |
| `pnpm build` | TypeScript 编译检查 + 生产构建 |
| `pnpm preview` | 预览生产构建结果 |
| `pnpm lint` | 运行 Oxlint |

---

## 6. 各模块完成度

### 6.1 页面（Pages）— ✅ 基础完成

| 路由 | 文件 | 功能 |
|------|------|------|
| `/` | `src/pages/home-page.tsx` | 首页，含 API + Query 示例 |
| `/about` | `src/pages/about-page.tsx` | 关于页，静态内容 |

布局与导航由 `AppLayout` 统一管理。

### 6.2 API 层 — ✅ 基础完成

```
页面 / Hook
    ↓ 调用
src/api/app.ts（业务接口函数）
    ↓ 使用
src/api/client.ts（通用 request 封装）
    ↓ 请求
VITE_API_BASE_URL + path
```

**扩展方式**：在 `src/api/` 下按领域新增文件，例如：

```
src/api/
├── client.ts
├── app.ts
├── users.ts      # getUser, updateUser ...
└── projects.ts   # getProjects, createProject ...
```

### 6.3 状态管理 — ⚠️ 部分完成

| 类型 | 方案 | 状态 |
|------|------|------|
| 服务端数据（API 响应） | TanStack Query | ✅ 已集成 |
| 组件局部 UI 状态 | React `useState` | ✅ 按需使用 |
| 全局客户端状态 | Zustand / Jotai / Redux 等 | ❌ 尚未引入 |

**当前策略**：服务端数据交给 TanStack Query；简单 UI 状态用 `useState`。当出现跨页面共享的客户端状态（如登录态、主题、侧边栏状态）时，再引入 Zustand 等方案。

---

## 7. 数据流示例（首页）

以首页加载示例文章为例：

1. `HomePage` 调用 `useQuery({ queryKey: ['sample-post'], queryFn: getSamplePost })`
2. `getSamplePost()` 在 `src/api/app.ts` 中定义，内部调用 `request('/posts/1')`
3. `request()` 读取 `VITE_API_BASE_URL`，发起 `fetch` 请求
4. TanStack Query 管理 loading / error / cache / refetch 状态
5. 页面根据 Query 状态渲染标题、正文或错误信息

---

## 8. Git 与版本控制

### 已忽略（不提交）

- `node_modules/`、`.pnpm-store/`
- `dist/`、`dist-ssr/`、`*.tsbuildinfo`
- `.env`、`.env.local`、`.env.*.local`
- `package-lock.json`、`yarn.lock`
- 日志、覆盖率、编辑器配置、OS 文件

### 应提交

- 源代码（`src/`）
- 配置文件（`vite.config.ts`、`tsconfig*.json`、`components.json`）
- `pnpm-lock.yaml`（锁定依赖版本）
- `.env.example`（环境变量模板）
- 文档（`docs/`、`README.md`）

---

## 9. 快速开始

```bash
# 克隆 / 进入项目目录后

# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env

# 3. 启动开发服务器
pnpm dev
```

浏览器访问：**http://localhost:5173/**

---

## 10. 常用开发操作

### 添加 ShadCN 组件

```bash
pnpm dlx shadcn@latest add card input dialog
```

组件会安装到 `src/components/ui/`。

### 添加新页面与路由

1. 在 `src/pages/` 创建页面组件，例如 `settings-page.tsx`
2. 在 `src/routes/router.tsx` 的 `children` 中注册路由：

```tsx
{
  path: 'settings',
  element: <SettingsPage />,
}
```

3. 如需导航入口，在 `AppLayout` 中添加链接

### 添加新 API 接口

1. 在 `src/api/` 下新建或扩展文件
2. 使用 `request<T>()` 封装接口
3. 在页面或自定义 Hook 中通过 `useQuery` / `useMutation` 调用

### 接入真实后端

1. 修改 `.env` 中的 `VITE_API_BASE_URL`
2. 在 `src/api/` 中替换 demo 接口为真实接口
3. 如需解决跨域，可在 `vite.config.ts` 中配置 `server.proxy`

```ts
export default defineConfig({
  // ...
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

---

## 11. 后续建议

以下为当前阶段尚未完成、但建议在业务推进时逐步补充的内容：

| 优先级 | 事项 | 说明 |
|--------|------|------|
| 高 | 接入真实后端 API | 替换 jsonplaceholder demo |
| 高 | 统一错误处理 | 在 `client.ts` 或 Query 全局配置中处理 401 / 500 |
| 中 | 全局状态管理 | 登录态、主题等引入 Zustand |
| 中 | 表单与校验 | 推荐 React Hook Form + Zod |
| 中 | CI/CD | GitHub Actions 运行 lint + build |
| 低 | 单元测试 | Vitest + Testing Library |
| 低 | E2E 测试 | Playwright |
| 低 | React Query Devtools | 开发环境调试 Query 缓存 |

### 推荐目录扩展

随着项目增长，可逐步引入：

```
src/
├── hooks/          # 自定义 Hooks（如 useAuth、useTheme）
├── stores/         # Zustand stores
├── types/          # 全局 TypeScript 类型
├── constants/      # 常量定义
└── features/       # 按功能模块组织（可选）
    ├── auth/
    └── dashboard/
```

---

## 12. 注意事项

1. **包管理器**：项目已统一使用 pnpm，请勿混用 npm / yarn，避免锁文件冲突。
2. **环境变量**：`.env` 含本地配置，切勿提交；只提交 `.env.example`。
3. **React 版本**：依赖锁定在 React 18，升级至 React 19 需评估类型与生态兼容性。
4. **React Router**：当前为 v6，与 v7 API 存在差异，升级前需阅读迁移指南。
5. **ShadCN 组件路径**：添加组件后确认文件落在 `src/components/ui/`，而非根目录 `@/`。

---

## 13. 参考链接

- [Vite 文档](https://vite.dev/)
- [React 文档](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [pnpm 文档](https://pnpm.io/)
