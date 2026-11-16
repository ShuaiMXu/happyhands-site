# Innovation Lab

> Landing page reference for an agency or studio — cubic-bezier(0.16, 1, 0.3, 1) easing, glass panels, React and Tailwind CSS and looping video.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：1466x1080 · 比例 1.3574 · 6.9s

## 概述

Read Innovation Lab as a landing page spec: the values were written down before the page was built. “We push past conventions, reshaping the virtual terrain with next-level technologies” is the line the layout is built to carry. The palette runs deep indigo #080219 underneath and white #F8F3EF for the type, and the type is Inter. Delivery is React and Tailwind CSS, captured at 1466x1080 so the frame is fixed before any code is written. The brief spends its motion budget on 0.2s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 6,911-character brief is the part that transfers to your own page.

## 主标题文案

> “We push past conventions, reshaping the virtual terrain with next-level technologies” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | darkest |
| Near-black — lighter | `#010007` | panel edges |
| White | `#F8F3EF` | Headline |
| Near-black — lighter | `#080219` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The clip is one asset at 1466x1080 and a 6.9s loop, so the composition has a single media dependency.
- Media is specified at 1466x1080 and a 6.9s loop, so a replacement should match the crop and the loop length.
- Transitions are specified at 0.2s, which is the value to keep when the palette changes.

## 布局

**A bar with nothing spare** — A short run of links and a single action sit over the landing page, held at 12px spacing steps and 0.2s transitions so the bar never competes with the composition behind it. The bar sits over the 1466x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Numbers where the proof goes** — The figures are set as type rather than in a card: Inter at the display size with labels one step below. The accent is spent on the figures that make a claim, not on the row as a whole.

**Links before the action** — One action per bar. The reference was captured at 1466x1080.

**Measured against the viewport** — Nothing here is eyeballed. The spec fixes 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing, and the rest of the layout derives from those values. Each value maps to one job: a type step, a gap, a radius or a transition.


## 动效

**Ambient motion without a scroll library** — The background clip runs 6.9s at 1466x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. The clip is muted and inline, so the first frame is available without an interaction. Shoot or export at 1466x1080 or wider.

**Interaction is on the controls** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. The states are drawn from the page's own palette rather than from a component default. A few reliable states beat a long list of effects.


## 可替换项

- Swap the clip for your own. Export at 1466x1080 or wider, keep it muted, and make the 6.9s loop seamless so the cut is invisible.
- Rewrite “We push past conventions, reshaping the virtual terrain with next-level technologies” to the same line count; the mask reveals each line in turn.
- Keep the supporting line as short as the reference's and measure the pair against the 1466x1080 crop.
- Read the brief value by value against the 1466x1080 capture before you edit anything; the numbers are the part that is easiest to lose.

## 文案规则

**Making the landing page yours** — A template asks you to accept its layout; this reference asks you to keep it and change everything inside. The difference is that 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing stay fixed while the subject moves. Keep the media crop; it is doing as much work as the type.

**The numbers behind the landing page** — Almost every decision here is a value you can check: 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. The media is a 6.9s 1466x1080 loop. The type stays in Inter, so a substitution has to keep the same proportions. Nothing in this landing page depends on a default.

**How the landing page reflows** — There is no separate mobile design to maintain. the scale is fluid rather than stepped, and the same hierarchy carries across. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Sector | Agencies & Studios |
| Format | 1466x1080 · 1.36:1 |
| Loop | 6.9s loop |
| Source text | 6,911 characters |
| Date | 2026-09-17 |
| Type | Inter |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 0.2s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.9s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
2. Copy 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
4. Pin the reference measurements before you restyle anything: 12px spacing steps, 0.2s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
5. Copy the 0.2s timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/innovation-lab
原始 prompt：6911 字符
