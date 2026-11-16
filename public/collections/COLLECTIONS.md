# 设计素材总集

这段时间攒下来的 8 个归档，按「拿来干什么」分四类。

## 一、找风格 / 找参考

| 归档 | 内容 | 数量 | 体积 |
|---|---|---|---|
| [design-archive](design-archive/README.md) | 站点风格库 | 1341 个站点 | 5.1G |
| [designmd-archive](designmd-archive/README.md) | DESIGN.md 素材库 | 806 份 | 157M |
| [ottermind](ottermind/README.md) | 落地页设计参考 | 201 个 | 33M |

## 二、拿 token / 拿组件

| 归档 | 内容 | 数量 | 体积 |
|---|---|---|---|
| [app-tokens](app-tokens/README.md) | App 端 token | 6 套 / 3406 变量 | 5.1M |
| [platform-systems](platform-systems/README.md) | 官方平台规范 | M3 455 token + HIG 173 篇 | 2.6M |

## 三、装进项目

| 归档 | 内容 | 数量 | 体积 |
|---|---|---|---|
| [design-how-systems](design-how-systems/README.md) | 设计系统规则 | 4 套系统 / 267 篇 | 12M |
| [registry-own](registry-own/README.md) | 可安装 registry | 308 条目 | 7.5M |
| [brand-systems](brand-systems/README.md) | 品牌化系统 | 4 套 | 12M |
| [brand-registry](brand-registry/README.md) | 品牌化 registry | 308 条目 | 7.5M |

## 四、够不着 / 单独存

| 归档 | 内容 | 数量 | 体积 |
|---|---|---|---|
| [mobbin-archive](mobbin-archive/README.md) | App 屏幕库（公开部分） | 6 篇文档 | 48K |

## 怎么选

- **要"这个站点长什么样"** → `design-archive`（实测值）或 `designmd-archive`（风格配方）
- **要"一套能装的系统"** → `design-how-systems` / `registry-own`（原版）或 `brand-*`（自有品牌）
- **做 App** → `app-tokens`（六套组件库变量）+ `platform-systems`（M3 token / HIG 判断）
- **做落地页** → `ottermind`（201 个规格化参考）
- **要真实 App 屏幕** → 只能走 Mobbin MCP（`mobbin-archive` 里有接入说明）

## 一件事没做到

**App 端的"页面结构"层还是空的**：token 有了、组件库有了、官方判断有了，但"商详页怎么分层、Feed 怎么排"这类结构知识，公开库里没有，只能来自截图库（付费）或自家稿子。
如果要做，最实际的路是用 Mobbin MCP 拉一批自家竞品的流程，再按 `relay-to-design-md` 的格式沉淀。