# Velora Hero Section

> Hero section reference for a travel brand — Archivo, #0A0A0B base, a dark stage and looping video.

- 行业：Travel（travel）
- 区块：Hero section
- 画布：1500x1080 · 比例 1.3889 · 4.9s

## 概述

Velora Hero Section is a travel hero section built from one written brief, and this page documents that brief. It leads with “Rent Your Dream Luxury Car Today” and gives that line the frame rather than shrinking it into a card. The palette runs black #0A0A0B underneath and white #FFFFFF for the type, and the type is Archivo. Delivery is one self-contained HTML file — one page, no plugin, no build tooling between you and the design. The brief spends its motion budget on a looping video bed. Borrow the structure and not the subject: the hero section and its numbers move to your brand unchanged.

## 主标题文案

> Hero section reference built around “Rent Your Dream Luxury Car Today”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0A0B` | composition |
| White | `#FAF9F5` | lighter step |
| White — darker | `#E9E9EC` | Hover tint |
| White — lighter | `#FFFFFF` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Archivo | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Nothing sits between the type and the 1500x1080 clip, so a replacement has to work under the copy directly.
- Media is specified at 1500x1080 and a 4.9s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1500x1080 and a 4.9s loop, so the composition has a single media dependency.

## 布局

**Top row: wordmark, links, one action** — Navigation is a single row with no second level under it. The bar sits over the 1500x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Sizes fixed in the brief** — The brief names the numbers: 100vh sections and 56px spacing steps. That is why the composition holds together, because there is no invented spacing step between the type and the frame. Because the values are fixed, a substitution changes the look without changing the rhythm.

**Figures as typography** — The figures are set in Archivo at a size closer to the headline than to the body copy. The label step is quoted in the brief, so it stays below the figures after a substitution. Do not box the numbers.

**Links before the action** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. Copy this pattern when you need navigation that survives a loud first screen.


## 动效

**Hover, but sparingly** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Press states are specified as well as hover, so a tap gives the same confirmation as a click.

**A loop, not a timeline** — The background clip runs 4.9s at 1500x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Nothing else on the page animates continuously, so the media is the only thing asking for attention.


## 可替换项

- Replace the video with a still at 1500x1080 if the 4.9s loop is too heavy for the page you are shipping.
- Replace “Rent Your Dream Luxury Car Today” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Keep Archivo or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1500x1080 frame.

## 文案规则

**Making the hero section yours** — A template asks you to accept its layout; this reference asks you to keep it and change everything inside. The difference is that 100vh sections and 56px spacing steps stay fixed while the subject moves. Your accent has to survive the same contrast test as the reference accent.

**Reading Velora Hero Section as a spec** — Most references show the result and keep the numbers. This one reverses that: 100vh sections and 56px spacing steps are published beside the page, so the result can be reproduced instead of approximated. Nothing in this hero section depends on a default.

**The order behind the hero section** — When a travel reader lands on a single screen, they scan before they read. The layout answers that: navigation, the headline, the stats row and the background clip are sized to be scanned, with 100vh sections and 56px spacing steps keeping each stop distinct. A travel reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Vertical | Travel |
| Canvas size | 1500x1080 · 1.39:1 |
| Duration | 4.9s loop |
| Source text | 3,216 characters |
| Archived | 2026-09-17 |
| Type | Archivo |
| Reference stack | single HTML file |
| Motion | a 4.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1500x1080 capture before you generate.
2. Keep the measurements the brief spells out: 100vh sections and 56px spacing steps.
3. Pin the reference measurements before you restyle anything: 100vh sections and 56px spacing steps.
4. Copy 100vh sections and 56px spacing steps into your own brief before you rewrite anything else.
5. Check your build against the reference measurements: 100vh sections and 56px spacing steps.

---
来源：https://ottermind.ai/explore/website/velora-car-rental-hero
原始 prompt：3216 字符
