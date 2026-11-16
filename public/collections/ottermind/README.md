# Ottermind 落地页设计参考

> ottermind.ai/explore/website 的 201 个落地页，每个都带色板、字体、布局、动效、规格和一份生成 brief。

## 每条里有什么

```
website/<slug>/
├── design.md     结构化整理：概述 / 色板 / 字体 / 布局 / 动效 / 规格 / 复刻步骤
├── entry.json    原始结构化数据（含 related、FAQ、audience）
├── still.webp    静帧（16:10 左右）
└── poster.webp   封面图
```

## 分布

| 行业 | 数量 |
|---|---|
| AI & SaaS | 79 |
| Agencies & Studios | 42 |
| Fintech | 16 |
| Health | 15 |
| Travel | 11 |
| Ecommerce | 9 |
| Education & Community | 9 |
| Lifestyle | 8 |
| Industrial | 7 |
| 3D & Games | 5 |

全部 201 条都带 6 秒左右的循环视频（源站提供 `preview.mp4` / `full.mp4`，本归档**没下视频**，只存了静帧和封面）。

## 为什么这批有价值

- 它不是"截图墙"，而是**规格化描述**：每条写明画布尺寸（多为 1740×1080）、色板及角色、字体与用途、布局要点、动效时长
- 带 `steps`（复刻步骤）和 `specs`（规格表），agent 可以直接照着做，而不是"照猫画虎"
- 覆盖 AI & SaaS / Agency / Fintech / Health / Travel 等，偏营销落地页（landing / hero）

## 用法

```bash
cat ottermind/website/3d-character-studio/design.md
# 或打开 gallery.html 浏览 201 个
```