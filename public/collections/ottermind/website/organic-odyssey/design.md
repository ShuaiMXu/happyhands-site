# Organic Odyssey

> Hero section reference for an AI or SaaS product — a dark stage, a stats row, a 640x470 frame and 300ms transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：640x470 · 比例 1.3617 · 0s

## 概述

Organic Odyssey shows one way to build the hero section for an AI or SaaS product, and publishes the instructions that produced it. The headline reads “An odyssey through delicate living forms”, and the rest of the hero section is arranged around it. The colour scheme is black #000000 underneath, and the page is set in Geist. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. Motion is limited to 300ms transitions. Keep it open while you write: the 4,802-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “An odyssey through delicate living forms”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#010101` | panel edges |
| Near-black — darker | `#000000` | composition |
| Deep yellow | `#48483F` | lightest |
| Near-black — darker | `#020003` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | 300 / 400 / 500 | Interface |
| Garamond | 300 / 400 / 500 | Display lines — the editorial voice of the page |

## 视觉要点

- Glass surfaces use blur(20px), and the blur is what makes the panels read as material rather than as fill.
- Transitions are specified at 300ms, short enough that the page never feels like it is waiting for an animation. The reference was captured at 640x470, and every value quoted on this page comes from the same brief.

## 布局

**The nav is deliberately thin** — A slim bar sits over the hero section with the wordmark on the left and the links set in Geist, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 640x470 composition without a background of its own, so the media runs edge to edge underneath it.

**One scale for type and frame** — The layout is solved against fixed values (20px spacing steps and 300ms transitions), which is what keeps the first screen composed at any width. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. Where the brief is silent, it is silent on purpose.

**Proof in one row** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the hero section from turning into a feature list. The row is aligned to the same margin as the headline above it.

**A navigation bar that gets out of the way** — Keep the row to one line. The reference was captured at 640x470.


## 动效

**Short, matched timings** — State changes are specified at 300ms, so the feedback on the controls is a designed value rather than a browser default. Nothing waits on a scroll position, so the page responds the moment you touch it. One duration per behaviour.

**Pointer states, nothing more** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. Feedback is limited to the controls, so the composition stays still around them.


## 可替换项

- Replace “An odyssey through delicate living forms” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Set 300ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Change the copy first, then the accent, then the media: the 640x470 frame was solved in that order and reversing it costs a re-layout.
- Keep Geist or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.

## 文案规则

**How the hero section reflows** — Most responsive work stops at hiding elements. Here the layout changes shape: the navigation collapses into a mobile menu, and nothing important is dropped to make the fold fit. The hierarchy is what survives the reflow.

**The order behind the hero section** — Order is the design here. navigation, the headline, the stats row and the background clip are placed so the offer lands before the proof, and 20px spacing steps and 300ms transitions set the gap between them. A SaaS reader gets the offer before the options.

**The numbers behind the hero section** — Compare this with a template that calls its spacing a preference. Here the same values are named (20px spacing steps and 300ms transitions), so an edit either keeps them or visibly breaks the composition. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | AI & SaaS |
| Frame | 640x470 · 1.36:1 |
| Prompt | 4,802 characters |
| Captured | 2026-09-17 |
| Type scale | Geist, Garamond |
| Tech stack | Tailwind CSS, React, TypeScript |
| Transitions | 300ms transitions |

## 复刻步骤

1. Copy 20px spacing steps and 300ms transitions into your own brief before you rewrite anything else.
2. Check your build against the reference measurements: 20px spacing steps and 300ms transitions.
3. Keep the measurements the brief spells out: 20px spacing steps and 300ms transitions.
4. Pin the reference measurements before you restyle anything: 20px spacing steps and 300ms transitions.
5. Rebuild the motion last and keep the 300ms entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/organic-odyssey
原始 prompt：4802 字符
