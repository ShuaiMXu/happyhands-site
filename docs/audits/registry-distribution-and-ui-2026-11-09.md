# 组件分发链路与 UI 问题审查

日期：2026-11-09。基线：`origin/main` 03460980。范围：`public/r/**` 四个设计系统 registry、`public/design-how/**` 文档归档、`packages/ui`、`apps/portal`、`components`。

本文件只记录问题与建议，不改代码、不改数据。所有 `文件:行` 均在上述基线上复核。

## 方法与边界

- 静态追踪：registry JSON、导入脚本、渲染入口、样式表。
- 生产实测：`curl` 校验 4 个 registry 的 395 个 URL（item 依赖 + `meta.docs`/`meta.page`）；抓取预渲染 HTML 检查实际下发的安装命令。
- 端到端：在临时工程用 `npx shadcn@latest add https://happyhands.cc/r/quartz/button.json` 实际安装，核对落地文件、体积、路径。
- **未执行**：`npm run build`、`npm run typecheck`、浏览器回归。项目位于会话工作区之外，沙箱拒绝 `node_modules` 写入（EPERM）。因此本文不含运行时性能与视觉回归结论。

## 摘要

| 级别 | 问题 | 位置 |
| --- | --- | --- |
| P0 | 站内文档与命令仍指向 design.how，happyhands.cc 镜像自我作废 | `scripts/import-design-how.py:53` 等 5 处 |
| P1 | `sourceHash` 结构性永不匹配，完整性信号失效 | `scripts/sync-design-catalog.mjs:32` |
| P1 | 单个组件安装体积 217 KiB，含两份 49 KB SKILL.md | `public/r/*/theme.json` |
| P1 | 三处对比度不达 WCAG AA | `apps/portal/portal.css`、`layout.css:104` |
| P1 | Hero 淡出后内容仍可聚焦 | `apps/portal/main.js:179-205` |
| P1 | 复制失败 toast 永不消失 | `apps/portal/main.js:242` |
| P2 | 死三元、每帧 querySelector、切语言重建 DOM、aria-label 降级 | `apps/portal/main.js` |
| P2 | 主题为补丁层，48 个硬编码色绕过 token | `apps/portal/portal.css:1` |
| P2 | 双语内容只有中文可索引，无 hreflang | `packages/ui/site-seo.ts:57` |
| P2 | 四个系统页使用两套模板，信息密度不一致 | `systems/design-how-main.tsx:19` |

---

## 一、组件分发

### 1.1 P0：镜像已上线，站内仍教用户从 design.how 安装

生产环境实测（2026-11-09）：

```text
$ curl -s "https://happyhands.cc/components/?provider=systems&system=quartz&doc=components/button.md" | grep -o 'npx shadcn@latest add [^"<]*'
npx shadcn@latest add https://design.how/r/quartz/button.json
```

同一份 HTML 中 `happyhands.cc/r/` 出现 0 次。而 `https://happyhands.cc/r/quartz/button.json` 返回 200 且内容完整。

根因在导入脚本：

- `scripts/import-design-how.py:33-34`：`hosted_text()` 只替换 `design.how/r/`。
- `scripts/import-design-how.py:45-46`：`hosted_registry()` 显式跳过 `files`，组件正文保持原样（这是有意的，避免改上游代码）。
- `scripts/import-design-how.py:53`：`meta.docs`、`meta.page` 被改写成 `https://happyhands.cc/design-how/{path}.md`，而该目录是 `publish()`（`:65`）的**未改写**归档副本。

于是形成两条路径：

| 路径 | 内容 | 被谁使用 |
| --- | --- | --- |
| `public/design-how/<sys>/**` | 原始归档，`install:` 仍是 design.how | `meta.docs`、文档页、预渲染 |
| `public/systems/<sys>/**` | `hosted_text()` 改写后，`install:` 是 happyhands.cc | 无入口引用 |

扩散到 5 处：

| 位置 | 行为 |
| --- | --- |
| `scripts/import-design-how.py:53` | `meta.docs` 指向未改写副本 |
| `components/DesignHowLibrary.tsx:84` | 文档页 `fetch` 未改写副本 |
| `packages/ui/SystemCatalog.tsx:407` | 目录页复制按钮硬编码 design.how |
| `packages/ui/SystemCatalog.tsx:467` | 同页下载链接硬编码 design.how |
| `apps/portal/design-systems.js:11-22` | 首屏「复制接入提示词」prompt 中 8 处 design.how × 2 语言 |
| `scripts/prerender-resources.mjs:70,88` | 预渲染把未改写正文写入 `<pre>`，爬虫同样读到 design.how |

量化：

- `public/design-how` 下 290 个 md，**272 个含 design.how 安装命令，0 个含 happyhands.cc**。
- registry 正文中 design.how 引用：quartz 156、lime 132、glaze 180、sodium 150。
- 前端源码中 design.how 出现 43 次。

影响：镜像在可用性和归因上都没有收益；上游改版或下线时，站点所有安装指引一起失效；预渲染的 SEO 页面把外部域名当作唯一入口。

建议：

1. `scripts/import-design-how.py:53` 改为 `f'{base}/systems/{path}.md'`（`/systems/<slug>/components/button.md` 已可访问，返回 200）。
2. `SystemCatalog.tsx:407,467` 改用 `https://happyhands.cc/r/${system}/...`，或抽统一的 `REGISTRY_BASE` 常量。
3. `design-systems.js:11-22` 的 16 处 host 替换为常量。
4. 增加回归测试：`public/design-how/**` 与 `public/systems/**` 内不得出现 `npx shadcn … design.how`；`meta.docs` 必须能解析到含 happyhands.cc 安装命令的文档。

### 1.2 P1：`sourceHash` 结构性永不匹配

`scripts/sync-design-catalog.mjs:32` 对 `fetch` 回来的上游字节做 sha256，写入 `systems/<sys>/catalog.json:sourceHash`。但 `public/r/<sys>/registry.json` 是经 `hosted_registry()` 改写后的字节（每个 item 的 `registryDependencies` 都被换成 happyhands.cc）。两者不可能相等。

实测：quartz、lime 两个有 catalog 的系统，`sourceHash` 与 `public/r/<sys>/registry.json` 的 sha256 **0/2 匹配**；glaze、sodium 无 catalog。

同时 `public/design-how/manifest.json` 覆盖 963 个归档文件，**对 `public/r/**` 的 312 个文件覆盖为 0**。也就是说被真实安装的产物没有任何完整性记录，而唯一的哈希字段恒为假。

建议：删除 `sourceHash`，或改为记录 `public/r/<sys>` 产物的哈希并在 `tests/design-how.test.mjs` 中断言；后者可与 cult-ui 管线的 `provenance.json` 对齐（`scripts/build-cult-catalog.mjs:15-19` 已有构建期校验，design.how 管线缺对应实现）。

### 1.3 P1：单组件安装体积 217 KiB

实测 `add button` 落地 10 个文件（不含 node_modules）：

| 文件 | 字节 |
| --- | ---: |
| `.claude/skills/quartz/SKILL.md` | 49,544 |
| `.agents/skills/quartz/SKILL.md` | 49,544 |
| `components/quartz/tokens.css` | 46,447 |
| `components/quartz/styles.css` | 34,003 |
| `components/quartz/icon.tsx` | 14,397 |
| `components/quartz/ui/button.tsx` | 12,341 |
| `components/quartz/portal.ts` | 7,370 |
| `components/quartz/base.css` | 5,118 |
| `lib/quartz/utils.ts` | 3,004 |
| `lib/quartz/kind.ts` | 291 |
| 合计 | 222,059 |

两点：

- `theme.json` 拆为 `tokens.css` + `base.css` + `styles.css` 三个文件（共 85,568 字节），但使用说明只要求 `import '.../styles.css'`，另外两个仍会落盘，存在重复注入风险。
- `SKILL.md` 因 `theme.json` 的 `registryDependencies` 包含 `skill.json` 而被强制搭售，且写入 `.claude/skills/` 与 `.agents/skills/` 两份同样内容。这是刻意的双客户端兼容，但占到安装量的 46%。

建议：将 `skill.json` 从 `theme.json` 的依赖中摘出，作为按需 item；合并三个 CSS 或在使用说明中明确"仅 import styles.css，其余两个不要单独引入"；核对 `icon.tsx` 是否真的需要 `@fortawesome/free-solid-svg-icons` 全量包。

### 1.4 P2：可发现性、版本与缓存

- **无聚合入口**：`/r/registry.json`、`/r/index.json` 均 404，消费者需预先知道 `quartz|lime|glaze|sodium`。
- **无 namespace**：只支持完整 URL，不支持 `@happyhands/…` 形式。
- **无版本**：`version: 1` 仅存在于文档 frontmatter；registry item 无 `version` 字段，消费者无法锁定。
- **缓存头**：`/r/:path*` 未单独配置，沿用 Vercel 默认 `cache-control: public, max-age=0, must-revalidate`。`vercel.json` 中仅 `assets` 配了 CORS。

建议：新增 `/r/registry.json` 聚合四系统；为 `/r/:path*` 配 `s-maxage` 与 `stale-while-revalidate`；在 item 中补 `version`。

### 1.5 已验证正常的部分（改动时不要破坏）

- 4 个 registry 的 **395 个 URL 全部返回 200**；反向对照（构造不存在路径）返回 404，确认不是通配兜底。
- shadcn CLI 端到端安装成功，落地路径 `src/components/quartz/ui/button.tsx`，未出现异常的 `@components` 目录。
- registry index 与 item 的 `title`/`description`/`type`/`dependencies` **零漂移**（4 系统全查）。
- `public/design-how/quartz.zip` 解包后 84 个 json 与 `public/r/quartz/` **逐字节一致**。
- 所有 `registryDependencies` 均以 `https://happyhands.cc/r/` 开头，无相对路径漏网。
- 预览 iframe 的隔离到位：`sandbox="allow-scripts"` `inert` `tabindex="-1"` `loading="lazy"`。

---

## 二、UI

### 2.1 P1：三处对比度不达标

| 前景 / 背景 | 比值 | 位置 | 要求 |
| --- | ---: | --- | --- |
| `#6e6e6e` / `#191919` | 3.45 | `.card-top`，12px `--font-mono` | 正文 4.5 |
| `#646464` / `#191111` | 3.14 | `.system-preview::before`（"FOUNDATION"），12px | 正文 4.5 |
| `#ff801f` / `#f4fbf6` | 2.39 | `:root[data-theme="light"]` 下 `[id$="-rail"]:focus-visible` 描边 | 非文本 3.0（WCAG 1.4.11） |

建议：前两处改用 `--subtle`(#8d8d8d，5.30) 或 `--muted`(#b4b4b4，8.48)；浅色模式的焦点描边改用 `--brand-text`(#7e451d，7.25)。

### 2.2 P1：Hero 淡出后仍可聚焦

`apps/portal/main.js:191-194` 滚动时把 `.hero-center` 的 `opacity` 归零；`.hero` 为 `position:sticky; height:100svh`（`apps/portal/portal.css:5`），内容仍在布局流内。用户滚到中段后按 Tab，焦点会落在不可见的「复制接入提示词」「接入指南」上（2.4.3 焦点顺序、2.4.7 焦点可见）。

建议：淡出到阈值以下时对 `.hero-center` 设置 `inert` 与 `aria-hidden`，或在 `:focus-within` 时强制恢复可见。

### 2.3 P1：复制失败 toast 永不消失

`apps/portal/main.js:241` 成功分支有 `setTimeout(..., 1800)`；`:242` 失败分支只设置 `textContent` 与 `.show`，没有定时器。复制失败后提示会常驻，直到下一次复制成功。

### 2.4 P2：死三元

`apps/portal/main.js:120-121` 两个分支完全相同：

```js
? `${c.hero.h1}<span>${c.hero.h1Accent}</span>${c.hero.h1Suffix}`
: `${c.hero.h1}<span>${c.hero.h1Accent}</span>${c.hero.h1Suffix}`;
```

要么英文曾用不同结构后被抹平，要么是遗留。保留会误导后续维护者。

### 2.5 P2：每帧两次 `querySelector`

`apps/portal/main.js:184` 与 `:198` 在同一个 rAF 回调内各自查询 `.hero-whirl-host`，且 `_progress()`（`:168-175`）每帧读取 `getBoundingClientRect`。节点与页面同生命周期，提到模块作用域缓存一次即可。

### 2.6 P2：切语言重建整棵内容树

`apps/portal/main.js:139` `content.innerHTML = portalContent(lang)` 会销毁 `#portal-content` 下全部 DOM：焦点丢失、展开态丢失、视口跳变。建议切换后把焦点还回语言按钮或 `#main`。

### 2.7 P2：无障碍标签被降级

`apps/portal/main.js:103` 把 logo 链接的 `aria-label` 从 HTML 中的「HappyHands 首页」覆盖为「HappyHands」，丢掉「首页」语义，而链接指向 `#top`。

### 2.8 P2：主题是补丁层而非 token 层

- `apps/portal/portal.css:1` 自建 `--ink/--paper/--brand/--line/...` 一套变量，与 `packages/design-tokens/happyhands.css` 的 `--hh-*` 并存。
- `apps/portal/portal.css` 内硬编码色值 48 个，`layout.css` 15 个。
- 浅色模式靠 `:root[data-theme="light"]` 的 16 处选择器逐条覆盖维持（`layout.css:126` 起），新增区块容易漏。

影响：Theme Studio 导出的是 `--hh-*`，无法作用于 portal 这一层；浅色模式属于持续打补丁状态。

建议：将 `--ink/--paper/--brand` 收敛为 `--hh-*` 的别名层，硬编码值逐个映射；这项工作量大，应单独排期，不与本次修复混做。

### 2.9 P2：双语内容只有中文可索引

`en/` 仅含 3 个页面；`hreflang` 只对 guide/review/design 输出（`packages/ui/site-seo.ts:57`）。portal、systems、design-how 均通过 localStorage 在运行时切换语言。实测预渲染页面为 `<html lang="zh-CN">`、`og:locale=zh_CN`、无 `hreflang`。

即英文内容存在且可读，但没有独立 URL，爬虫与分享只能获取中文版本。

### 2.10 P2：四个系统页两套模板

`systems/quartz/main.tsx` 与 `systems/lime/main.tsx` 为定制落地页（`SystemScenes`、`FoundationSpecimen`、`SystemExample`、`SystemCatalog`）；`systems/glaze/index.html` 与 `systems/sodium/index.html` 走共用的 `systems/design-how-main.tsx:19`，只渲染 `DesignHowLibrary` 文档目录。同一层级页面信息密度相差一个量级。

另：`systems/design-how-main.tsx:17` 使用 `designHowSystems.find(...)!` 非空断言，未命中时整页崩溃。

---

## 三、与既有审查的关系

`docs/audits/project-redundancy-2026-11-02.md` 已覆盖：studio 无编辑写入草稿、public 资源体积、样式追加覆盖、资源切换两套实现、研究页进入生产构建。本文不重复。

该文仅在"多图标库、Base UI 与 Radix 依赖可能由第三方组件注册表和生成预览消费"一句中提及注册表，未审计 registry 本体与安装链路，本文补齐这一部分。

---

## 四、建议修复顺序

1. `scripts/import-design-how.py:53` 一行修正，连带解决 272 个文档、`meta.docs` 与预渲染 SEO。
2. `SystemCatalog.tsx:407,467` 与 `design-systems.js` 的 host 收敛，并补防回归测试。
3. 删除或重做 `sourceHash`，将 `public/r/**` 纳入完整性记录。
4. UI 三连：toast 定时器、hero `inert`、两处对比度与浅色焦点色。
5. 减重：`skill` 与 `theme` 解耦；CSS 合并或使用说明澄清。
6. 分发补件：`/r/registry.json` 聚合、`/r/*` 缓存头、item `version`。
7. 主题 token 收敛（独立排期）。

## 五、本次未完成

- 未运行 `npm run build`、`npm run typecheck`、`npm run test:*` 与浏览器回归：项目在会话工作区之外，`node_modules` 写入被沙箱拒绝。
- 未验证修复后的表现，本文全部结论为基线上的只读追踪与生产实测。
- 未改动任何业务代码、registry 数据或上游快照。
