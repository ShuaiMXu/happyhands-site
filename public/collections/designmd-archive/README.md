# designmd.app 归档

designmd.app 是一个 「DESIGN.md 素材库」：759 个风格模板 + 47 个真实品牌，每份都是
「YAML token + Markdown 说明」两段式，直接丢进项目根目录给 coding agent 读。

抓取走的是站点自己的机读目录 `llms-full.txt`（每个条目给了 page / .md / design.md 三个地址），
所以不需要解析 HTML。

## 封面

每个条目都配了封面图（`cover.png`）：

- 风格模板：来自站点图库 `/images/library/<id>.png`（按 `id` 对，不是按 slug）
- 真实品牌：取页面 og 图 `/og/en/brands/<slug>.png`（1200×630）

**801 / 806 有封面，共 140.7 MB**（平均 176 KB）。剩 5 个品牌（americabydesign-gov、
nds-core、ndstudio-gov、realfood-gov、trumprx-gov）站点本身没生成 og 图，返回 404——
它们的 design.md 是完整的，只是没封面。

浏览：打开 `gallery.html`（806 张卡片，可按「风格 / 品牌」筛选 + 关键词搜索）。

## 目录

```
designmd-archive/            157 MB（文本 14 MB + 封面 141 MB）
├── library/<slug>/          759 个风格模板
│   ├── design.md            真正的 DESIGN.md（YAML + 正文）
│   ├── page.md              该页的 markdown 版（含标题/描述/更新时间）
│   └── cover.png            封面图
├── brands/<slug>/           47 个真实品牌（Atlassian、Stripe、99、iFood…）
├── catalog/llms-full.txt    原始目录快照
├── index.json / index.csv   机读索引
└── lint-report.json         官方 linter 结果
```

单份 design.md 中位数 5.9 KB（1.1–26 KB），799/806 带 YAML frontmatter。
体积构成：文本 14 MB + 封面 141 MB。

## 官方 linter 结果（`npx @google/design.md lint`）

| 指标 | 数值 |
|---|---|
| 文件数 | 806 |
| 0 error | **780（96.8%）** |
| 有 error | 26 |

主要问题类型：

| 规则 | 出现次数 | 含义 |
|---|---|---|
| `token-summary` | 796 | info，正常回显 |
| `missing-sections` | 679 | 缺 layout / rounded / elevation 等章节 |
| `orphaned-tokens` | 419 | 定义了 token 但正文没引用 |
| `contrast-ratio` | 253 | **配色对比度不足**（值得单独看） |
| `missing-primary` | 27 | 没有 primary 色 |
| `broken-ref` | 25 | token 交叉引用指向不存在的路径 |

26 个 error 集中在品牌条目，典型是 YAML 写坏了：`'0' is not a recognized typography property`、
`'inherit' is not a valid dimension`。

## 和 refero 那批的差别

| | designmd.app | styles.refero.design |
|---|---|---|
| 数量 | 806 | 1341 |
| 结构 | YAML token + 说明 | 纯 Markdown 正文（无 YAML） |
| 官方 lint | 780/806 无 error，1341 条警告 | 0 error，但**每条都报「No YAML content found」** |
| 描述重点 | 视觉风格 / 品牌语言 | 页面实测出来的 token、布局、组件 |
| 适合 | 快速定调、"要这种风格" | 还原具体站点、拿真实测量值 |

一句话：**refero 偏「体检报告」，designmd.app 偏「风格配方」**。两边合起来用最好——
先用 designmd 定方向，再用 refero 找具体站点的真实数值。

## 怎么用

```bash
# 风格模板
cat library/aurora-ui/design.md

# 真实品牌
cat brands/atlassian/design.md

# 校验 / 导出
npx @google/design.md lint brands/atlassian/design.md
npx @google/design.md export --format=dtcg brands/atlassian/design.md
```

## 说明

- 站点自述开源（源码在 GitLab），但**内容许可未在页面明确标注**，批量留存后对外分发前请确认。
- `page.md` 是站点为 SEO/agent 生成的页面正文，价值低于 `design.md`，留着是为了保留描述与更新时间。
- 抓取时间：2026-11-02。
