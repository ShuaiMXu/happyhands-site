# Fastshot

> Landing page reference for an AI or SaaS product — fluid type, glass panels, a stats row and Inter.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1406 · 比例 1.3656 · 7.45s

## 概述

Fastshot was captured at 1920x1406 and kept as a specification rather than as a gallery image. “Describe an app. We'll build it” is the line the layout is built to carry. The palette is deep blue #0A0D12 underneath and muted indigo #9C86CE carrying the accents, set in Inter. Delivery is one self-contained HTML file, captured at 1920x1406 so the frame is fixed before any code is written. Motion is limited to 1.00s transitions, cubic-bezier(.4,0.2,1) and a looping video bed. Keep it open while you write: the 15,844-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built around “Describe an app. We'll build it”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0D12` | composition |
| Gray | `#98999C` | lighter step |
| Gray — lighter | `#A9AAAD` | lightest |
| Muted indigo | `#9C86CE` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 1.00s, which is the value to keep when the palette changes.
- Transitions are specified at 1.00s, short enough that the page never feels like it is waiting for an animation.
- Nothing sits between the type and the 1920x1406 clip, so a replacement has to work under the copy directly.

## 布局

**Navigation without a background** — Wordmark, links and the #9C86CE action share one baseline, which is what keeps a thin row from looking accidental. Below 599px the links collapse instead of wrapping onto a second line.

**Media behind the type** — One muted, looping clip fills the frame at 1920x1406 and 7.5s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. Export at 1920x1406 or wider and the cover crop keeps working.

**Type does the styling** — The display line is set in Inter at a size the brief fixes, which makes the headline a composition element rather than a paragraph. Line height follows the size steps rather than a single global value.

**The nav is deliberately thin** — Labels are short enough to fit one line at 599px, and the active item is marked with weight rather than with a pill.


## 动效

**One duration for the controls** — The brief fixes the transition value at 1.00s, so a rebuild cannot substitute a slower default. Easing is specified alongside the duration (1.00s), so a rebuild cannot quietly substitute a different feel. Fast state changes, no scroll timelines.

**The loop does the ambient work** — The background clip runs 7.5s at 1920x1406 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Nothing else on the page animates continuously, so the media is the only thing asking for attention.


## 可替换项

- Change #9C86CE for your brand accent and re-check it against #0A0D12, because the accent is the only saturated value in this composition.
- Recut your footage to the 7.5s loop, then export at 1920x1406 so the crop the reference specifies survives.
- Keep the supporting line as short as the reference's and measure the pair against the 1920x1406 crop.
- Replace the copy in the Inter stack first, then re-check the #9C86CE accent against the media behind it.

## 文案规则

**How the landing page reflows** — When the copy is long, the narrow layout breaks first. Here a clamp between 14px and 18px absorbs the change, and the scale is fluid rather than stepped, the layout shifts at 599px and the section is held at 100vh. Both states are described in the same brief.

**What this landing page gets right** — The trade-off is density: this landing page says less on the first screen than a feature-led layout would. What it keeps is the reading order, and navigation, the headline, the stats row, the card grid and the background clip do the work a longer page would spread out. It gives a SaaS reader the shortest honest route to the offer.

**Reading Fastshot as a spec** — Compare this with a template that calls its spacing a preference. Here the same values are named (100vh sections, 4px corners, 18px spacing steps and 1.00s transitions), so an edit either keeps them or visibly breaks the composition. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Category | AI & SaaS |
| Viewport | 1920x1406 · 1.37:1 |
| Loop length | 7.5s loop |
| Source text | 15,844 characters |
| Saved | 2026-09-17 |
| Accent tone | muted indigo #9C86CE |
| Type scale | Inter |
| Tools | single HTML file |
| Animation | 1.00s transitions, cubic-bezier(.4,0.2,1) easing and a 7.5s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1406 capture before you generate.
2. Set the brand first: product name, the #9C86CE accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #9C86CE with your own accent and re-check the contrast.
4. Set your brand first: product name, the #9C86CE accent and the headline that replaces the reference's.
5. Type the product name and the #9C86CE accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/fastshot
原始 prompt：15844 字符
