# Infrastructure

> Hero section reference for an AI or SaaS product — looping video, a logo row, React and Tailwind CSS and #010002 base.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：1920x1384 · 比例 1.3873 · 8s

## 概述

Before rebuilding a hero section for an AI or SaaS product, read Infrastructure: the composition and the specification behind it are both here. It leads with “Ready to elevate your digital infrastructure?” and gives that line the frame rather than shrinking it into a card. The whole page is built on deep indigo #010002 underneath, white #DAD6DB for the type and blue #0F2F65 carrying the accents. Delivery is React and Tailwind CSS, captured at 2076x1498 so the frame is fixed before any code is written. Motion is confined to 4s transitions and a looping video bed. Keep it open while you write: the 2,467-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “Ready to elevate your digital infrastructure?”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#010002` | composition |
| White | `#DAD6DB` | Headline |
| Blue | `#0F2F65` | accent |
| Deep magenta | `#251528` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 4s, which is the value to keep when the palette changes.
- Nothing sits between the type and the 2076x1498 clip, so a replacement has to work under the copy directly.
- Accent and ground are both named (blue #0F2F65 on deep indigo #010002), so a brand swap moves one value.

## 布局

**Top row: wordmark, links, one action** — The bar carries the wordmark, the section links and one #0F2F65 button, measured at 10px spacing steps and 4s transitions so it never grows into a second header. The links are set below the wordmark in size, and the #0F2F65 action is the only element in the bar with any weight.

**Full-frame video, no panel** — One 8s asset carries the whole first screen, and the page has no second media element to keep in sync. The loop is short enough (8s) that the eye reads it as texture rather than as a timeline.

**The composition is the content** — The hero section is built so the copy lands before anything else: the type carries the hierarchy, the 2076x1498 frame holds the composition, and the supporting values stay quiet. The page is one composition at 2076x1498, which is why it holds together when the copy changes.

**Links collapse at one width** — The bar sits over the 2076x1498 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**One duration for the controls** — The animation budget is small and explicit: 4s, applied to state changes rather than to entrances. Easing is specified alongside the duration (4s), so a rebuild cannot quietly substitute a different feel.

**The loop does the ambient work** — Ambient movement is one 8s clip at 2076x1498, looping quietly behind the copy rather than reacting to the pointer. The clip is muted and inline, so the first frame is available without an interaction.


## 可替换项

- Hold the 2076x1498 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Keep the supporting line as short as the reference's and measure the pair against the 2076x1498 crop.
- Set 4s to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Rewrite “Ready to elevate your digital infrastructure?” to the same line count; the mask reveals each line in turn.

## 文案规则

**How the hero section reflows** — A designed narrow layout takes more decisions than a squeeze. The brief pays for them: the scale is fluid rather than stepped, stated rather than discovered at build time. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**What to change first in Infrastructure** — Change the content first and check the frame afterwards. 10px spacing steps and 4s transitions are the values to protect while you swap the copy. Rewrite the display line before you touch the colour.

**The numbers behind the hero section** — A rebuild usually starts with a screenshot and a guess. Here it starts with 2,467 characters of specification: the frame, the spacing and the motion are written down before the first line of code. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Sector | AI & SaaS |
| Format | 2076x1498 · 1.39:1 |
| Duration | 8s loop |
| Input brief | 2,467 characters |
| Capture date | 2026-09-17 |
| Accent tone | blue #0F2F65 |
| Built with | Tailwind CSS, React, Lucide icons |
| Timing | 4s transitions and a 8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2076x1498 capture before you generate.
2. Drop your product name in, then replace #0F2F65 with your own accent and re-check the contrast.
3. Set your brand first: product name, the #0F2F65 accent and the headline that replaces the reference's.
4. Type the product name and the #0F2F65 accent before you touch the layout.
5. Set the brand first: product name, the #0F2F65 accent and a headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/qumica-infrastructure-hero
原始 prompt：2467 字符
