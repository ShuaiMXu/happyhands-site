# Aetheris Voyage

> Hero section reference for a travel brand — looping video, glass panels, Instrument Serif and a stats row.

- 行业：Travel（travel）
- 区块：Hero section
- 画布：800x570 · 比例 1.4035 · 8.75s

## 概述

Aetheris Voyage keeps its decision trail: the brief that produced this hero section runs 10,190 characters. The page's own headline reads “Venture Past Our Sky Across the Universe”, and the composition is built around those exact words. The palette runs black #181719 underneath and muted orange #ECD9C1 for the type, and the type is Instrument Serif. Delivery is React and Tailwind CSS, captured at 800x570 so the frame is fixed before any code is written. Motion comes down to 100ms transitions and a looping video bed. It is most useful when the Travel hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built around “Venture Past Our Sky Across the Universe”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#010000` | darkest |
| Muted orange | `#ECD9C1` | Headline |
| Near-black — lighter | `#0E0D0E` | panel edges |
| Near-black — lighter | `#181719` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display face |
| Barlow | Weight not fixed in the brief | Body face |

## 视觉要点

- Media is specified at 800x570 and a 8.8s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 800x570 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 800x570 and a 8.8s loop, so the composition has a single media dependency.

## 布局

**Top row: wordmark, links, one action** — A slim bar sits over the hero section with the wordmark on the left and the links set in Instrument Serif, so the composition reads as content first and chrome second. The bar sits over the 800x570 composition without a background of its own, so the media runs edge to edge underneath it.

**The sizes are in the brief, not in a scale** — The brief states its sizes at capture (10px spacing steps and 100ms transitions), so a rebuild can be verified instead of approximated. A rebuild that hits those numbers looks like the reference without further tuning.

**Links collapse at one width** — The wordmark holds the left edge and the links run to the right of it, all of it set in Instrument Serif so the bar belongs to the page below rather than to a separate system. If your own page has more sections, group them rather than widening the bar.

**Every measurement is written down** — Spacing is quoted the same way (10px spacing steps and 100ms transitions), not as a scale that grows on its own.


## 动效

**Sections arrive with scroll** — Scroll reveal is the page's single scroll behaviour, so the effect has a defined place in the composition. Reduced motion drops the effect without changing the composition's final state.

**The loop does the ambient work** — One 8.8s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Keep the 800x570 frame when you swap the content, because the composition was solved against that ratio.
- Replace the video with a still at 800x570 if the 8.8s loop is too heavy for the page you are shipping.
- Swap the clip for your own footage at 800x570 or wider, keep it muted, and match the 8.8s loop point.
- Draft the new copy to the 800x570 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**How Aetheris Voyage sequences the first read** — Set your own copy into this hero section and the sequence still holds, because the elements are not interchangeable: navigation, the headline, the announcement badge, the stats row and the card grid each carry one job. A travel reader gets the offer before the options.

**How the hero section reflows** — A fixed desktop scale would have been easier. The brief adds a clamp between 11px and 10px, which is what keeps the display line proportionate between widths. A squeeze would have been cheaper and would not hold.

**What to change first in Aetheris Voyage** — Compare this with starting from a blank page. Here the frame (800x570) and 10px spacing steps and 100ms transitions are already decided, so the work is substitution rather than composition. Set the new copy at the same display size and re-check the contrast before you add anything.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Category | Travel |
| Viewport | 800x570 · 1.4:1 |
| Duration | 8.8s loop |
| Input brief | 10,190 characters |
| Date | 2026-09-17 |
| Type scale | Instrument Serif, Barlow |
| Stack | Tailwind CSS, React, Framer Motion |
| Motion | 100ms transitions and a 8.8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x570 capture before you generate.
2. Pin the reference measurements before you restyle anything: 10px spacing steps and 100ms transitions.
3. Copy 10px spacing steps and 100ms transitions into your own brief before you rewrite anything else.
4. Keep the measurements the brief spells out: 10px spacing steps and 100ms transitions.
5. Check your build against the reference measurements: 10px spacing steps and 100ms transitions.

---
来源：https://ottermind.ai/explore/website/aetheris-voyage-hero
原始 prompt：10190 字符
