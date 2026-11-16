# Equilibrium

> Hero section reference for an AI or SaaS product — React and Tailwind CSS, Geist, a stats row and a 640x472 frame.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Equilibrium is a SaaS hero section built from one written brief, and this page documents that brief. The palette is deep blue #0F1118 underneath and muted orange #CDBAB2 for the type, set in Geist. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Keep it open while you write: the 4,787-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference for an AI or SaaS product, captured at 640x472 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0F1118` | composition |
| Muted orange | `#CDBAB2` | Headline |
| Deep blue | `#102030` | panel edges |
| Deep blue — darker | `#0F161F` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The reference was captured at 640x472, and every value quoted on this page comes from the same brief. Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill.
- One face carries the page: Geist is used for the headline and the interface text, with no second typeface.

## 布局

**The nav is deliberately thin** — The wordmark holds the left edge and the links run to the right of it, all of it set in Geist so the bar belongs to the page below rather than to a separate system. The bar sits over the 640x472 composition without a background of its own, so the media runs edge to edge underneath it.

**Figures treated as typography** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the hero section from turning into a feature list. The accent is spent on the figures that make a claim, not on the row as a whole.

**Top row, one action** — A slim bar sits over the hero section with the wordmark on the left and the links set in Geist, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint.

**Every measurement is written down** — Sizes were read off the render at 640x472: 72px spacing steps. There is no invented intermediate value between the named ones; the measurement list is the whole system.


## 动效

**Interaction kept local** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Feedback is limited to the controls, so the composition stays still around them.

**Motion that stays out of the way** — The brief leaves animation out and lets the 640x472 layout carry the page, with hover and press states the only changes. Only the elements that respond to the pointer move. Stillness is a valid choice.


## 可替换项

- Replace the navigation labels with your own and drop any link that does not have a page behind it yet.
- Keep 640x472 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 640x472 frame.
- Change the copy first, then the accent, then the media: the 640x472 frame was solved in that order and reversing it costs a re-layout.

## 文案规则

**Reading Equilibrium as a spec** — Most references show the result and keep the numbers. This one reverses that: 72px spacing steps are published beside the page, so the result can be reproduced instead of approximated. Nothing in this hero section depends on a default.

**How the hero section reflows** — The narrow layout is designed, not inherited. the navigation collapses into a mobile menu at each width, so the hierarchy survives the reflow. The mobile version is a decision, not a fallback.

**The order behind the hero section** — A feature-led layout lists what the product does; this one routes the reader to a single decision. The route is visible in navigation, the announcement badge, the stats row and the background clip and in how 72px spacing steps space them. A SaaS reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | AI & SaaS |
| Canvas size | 640x472 · 1.36:1 |
| Brief | 4,787 characters |
| Captured | 2026-09-17 |
| Typefaces | Geist |
| Built with | Tailwind CSS, React, TypeScript |
| Animation | state changes only |

## 复刻步骤

1. Check your build against the reference measurements: 72px spacing steps.
2. Keep the measurements the brief spells out: 72px spacing steps.
3. Pin the reference measurements before you restyle anything: 72px spacing steps.
4. Copy 72px spacing steps into your own brief before you rewrite anything else.
5. Screenshot your build at 640x472 and put it beside the reference before the last round of edits.

---
来源：https://ottermind.ai/explore/website/equilibrium
原始 prompt：4787 字符
