# design.how 设计系统归档

四套设计系统的完整内容：规则文档（Markdown）+ shadcn registry（真实 token 与组件源码）。

| 系统 | 定位 | 基础规范 | 组件 | registry 条目 |
|---|---|---|---|---|
| [Sodium](sodium/index.md) | Sodium is compact and ruled, for infrastructure and data tools: white and warm near-black grounds, 1px rules for structure, mono capitals for every interface word, Int… | 9 | 54 | 74 |
| [Glaze](glaze/index.md) | Glaze is compact black and white for AI products: ink and paper, greys as ink at alphas, colour only for status, and glass only on the one action a group leads with; i… | 9 | 66 | 87 |
| [Quartz](quartz/index.md) | Black and white chassis with five muted kind hues and warm trouble colors, for AI support products and agent consoles. | 10 | 57 | 83 |
| [Lime](lime/index.md) | Lime is a white page, warm-grey surfaces and near-black text with one acid lime on the main action, for consumer apps. | 8 | 49 | 64 |

合计 **36** 篇基础规范、**226** 篇组件文档、**308** 个 registry 条目、**368** 个源码文件。

## 目录结构

```
design-how-systems/
├── systems.md                 # 四套系统总览
├── sodium/                    # 同理：glaze / quartz / lime
│   ├── index.md               # 系统总纲：优先级、全局规则、如何使用
│   ├── foundations/           # color / typography / space / radius / borders / elevation / motion / iconography
│   ├── components/            # 每个组件一页：何时用、不用、anatomy、变体、可访问性
│   ├── registry/
│   │   ├── index.json         # 该系统 registry 清单（74 项）
│   │   └── items/*.json       # 每个条目的 install payload（含完整文件内容）
│   └── src/                   # 从 registry 还原的源码树
│       └── registry/sodium/
│           ├── tokens.css     # 全部设计 token（唯一要改的文件）
│           ├── base.css  styles.css
│           ├── SKILL.md       # 给编码 Agent 的系统说明
│           ├── ui/*.tsx       # 组件实现
│           ├── blocks/ hooks/ lib/ icon.tsx lint/
├── guides/                    # 10 篇构建 UI 的方法文章
├── articles/                  # 4 篇 design system 长文
├── index.json                 # 机读目录：系统 / 基础规范 / 组件 / registry / 源码
└── errors.json                # 抓取失败清单（空）
```

## 怎么用

**给 Agent 读**——先给系统总纲，再按需给组件页：

```bash
cat sodium/index.md                    # 规则、优先级、全局约束
cat sodium/components/button.md        # 单个组件的完整规格
cat sodium/src/registry/sodium/SKILL.md
```

**取 token / 装组件**——registry 里是可直接安装的条目：

```bash
npx shadcn@latest add https://design.how/r/sodium/theme.json      # tokens + base + styles
npx shadcn@latest add https://design.how/r/sodium/button.json     # 单个组件
```

`<system>/src/` 已经把每个条目的文件按原路径铺开，也可以直接拷进项目。

## 自托管安装

`../registry-own/` 是同一套 registry 的「自家地址」版本：`registryDependencies`、`meta.docs`、
`docs` 里的 `https://design.how` 全部换成可配置的 `--base`，配一个静态托管就能
`npx shadcn@latest add <你的域名>/r/sodium/button.json`。生成与自检见 `../pipeline-dhow/`。

## 内容说明

- 文档页取自每个 URL 的 `.md` 孪生版本（站点为 Agent 提供的机读稿），保留原始 frontmatter：
  `name / kind / source / install / import / registryDependencies / version / last-updated`。
- registry 条目是 shadcn 标准格式（`registry:ui`、`registry:block`、`registry:hook`、`registry:lib`、
  `registry:item`），`theme` 条目里就是 `tokens.css`、`base.css`、`styles.css`。
- 每套系统都有 `SKILL.md`，是站点给编码 Agent 的项目级说明书。
- 生成时间：2026-10-29T12:55:50+08:00
