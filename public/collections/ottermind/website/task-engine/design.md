# Task Engine

> Landing page reference for an ecommerce brand — #F0F0F0 base, a dark stage, looping video and Plus Jakarta Sans.

- 行业：Ecommerce（ecommerce）
- 区块：Landing page
- 画布：1920x986 · 比例 1.9473 · 10.566s

## 概述

Task Engine solves the landing page problem for an ecommerce brand with a single captured brief. The palette is white #F0F0F0 underneath and black #0D0D0D for the type, set in Plus Jakarta Sans. Delivery is one self-contained HTML file, captured at 2104x1080 so the frame is fixed before any code is written. The page keeps its motion to 2400ms transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Use it as the reference when you are building an ecommerce brand landing page and want a finished composition instead of a starting point.

## 主标题文案

> Landing page reference for an ecommerce brand, captured at 2104x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F0F0F0` | composition |
| Near-black | `#141414` | darker step |
| White — lighter | `#FFFFFF` | lightest |
| Near-black — darker | `#0D0D0D` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Plus Jakarta Sans | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The clip is one asset at 2104x1080 and a 10.6s loop, so the composition has a single media dependency.
- The navigation collapses at max-width 700px and min-width 701px, so the bar has a designed narrow state.
- Nothing sits between the type and the 2104x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Numbers carried into the build** — The values are the specification: 100vh sections, 30px spacing steps, 2400ms transitions and cubic-bezier(.16,1.3,1) easing, captured at 2104x1080 rather than inferred from a screenshot. The list is short enough that a reviewer can check it element by element.

**Faces with one job each** — With Plus Jakarta Sans doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Substituting the face is possible, but the proportions have to survive the swap.

**Nothing here is inherited** — Spacing is quoted the same way (100vh sections, 30px spacing steps, 2400ms transitions and cubic-bezier(.16,1.3,1) easing), not as a scale that grows on its own.

**A clip, not an illustration** — The composition is built on top of the 2104x1080 clip rather than beside it, so the media never gets a panel or a border. A poster frame at 2104x1080 holds the composition when autoplay is unavailable, so the layout never collapses.


## 动效

**The whole animation budget** — Motion in the controls is short and repeatable: 2400ms on each state change. If the easing changes, the duration has to be revisited with it.

**Ambient motion without a scroll library** — The background clip runs 10.6s at 2104x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 2104x1080 crop.
- Keep the 2104x1080 frame when you swap the content, because the composition was solved against that ratio.
- Replace the video with a still at 2104x1080 if the 10.6s loop is too heavy for the page you are shipping.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 2104x1080 frame.

## 文案规则

**What this landing page gets right** — There is one promise on this page, and 100vh sections and 30px spacing steps hold it in place. Nothing below the fold is asked to carry the offer as well. Task Engine states the offer once and lets the composition repeat it rather than adding a second claim.

**How the landing page reflows** — Wide, the composition is dense; narrow, the layout shifts at 700px, the section is held at 100vh and the motion has a reduced-motion branch. Both states are described in the brief. The order is the last thing to change.

**What to change first in Task Engine** — Set the new copy at the display size the brief names (100vh sections and 30px spacing steps), and the rest of the scale follows without a redesign. Set the new copy at the same display size and re-check the contrast before you add anything.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Field | Ecommerce |
| Viewport | 2104x1080 · 1.95:1 |
| Clip length | 10.6s loop |
| Source text | 14,503 characters |
| Capture date | 2026-09-17 |
| Type scale | Plus Jakarta Sans |
| Stack | single HTML file |
| Timing | 2400ms transitions, cubic-bezier(.16,1.3,1) easing and a 10.6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2104x1080 capture before you generate.
2. Keep the measurements the brief spells out: 100vh sections, 30px spacing steps and 2400ms transitions.
3. Copy 100vh sections, 30px spacing steps and 2400ms transitions into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 100vh sections, 30px spacing steps and 2400ms transitions.
5. Check your build against the reference measurements: 100vh sections, 30px spacing steps and 2400ms transitions.

---
来源：https://ottermind.ai/explore/website/task-engine
原始 prompt：14503 字符
