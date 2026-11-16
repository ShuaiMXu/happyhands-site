# Neon Logic

> Landing page reference for an AI or SaaS product — #010103 base, React and Tailwind CSS, fluid type and Space Mono.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：640x474 · 比例 1.3502 · 0s

## 概述

Neon Logic is a SaaS landing page built from one written brief, and this page documents that brief. Colour is limited to deep blue #010103 underneath and white #FFFFFF for the type, set in Space Mono. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion comes down to 800ms transitions. Keep it open while you write: the 13,601-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 640x474 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | Headline |
| Muted indigo | `#8E7F94` | lighter step |
| White — darker | `#E2E2E6` | Hover tint |
| Near-black | `#010103` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Space Mono | 400 / 700 | Mono labels |
| Anton | 400 / 700 | Body copy |

## 视觉要点

- Transitions are specified at 800ms, which is the value to keep when the palette changes.
- The type is set in Space Mono on a 12–42px scale, and the spacing follows the same steps.
- Font roles are assigned rather than mixed here, and 12–42px is the range the whole scale works in.

## 布局

**Links before the action** — The bar is one row of text and one action, measured at type from 12px to 42px and 100vh sections so it reads as a strip rather than as a band. The bar sits over the 640x474 composition without a background of its own, so the media runs edge to edge underneath it. Keep the row to one line.

**Proof above the fold** — The figures are set as type rather than in a card: Space Mono at the display size with labels one step below. There are no dividers inside the row; spacing alone separates the figures.

**Navigation held to one row** — Design the collapsed state before adding a sixth link. The reference was captured at 640x474.

**Numbers carried into the build** — The values are the specification: type from 12px to 42px, 100vh sections, 14px spacing steps and 800ms transitions, captured at 640x474 rather than inferred from a screenshot. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. Port the values with the layout.


## 动效

**State changes, timed** — The brief fixes the transition value at 800ms, so a rebuild cannot substitute a slower default. Nothing waits on a scroll position, so the page responds the moment you touch it. Do not ship the browser default.

**Depth from a render** — Depth comes from the render rather than from illustration: a 3D transform on the main element. The brief keeps the interface plain around the canvas so the scene is the only spectacle.


## 可替换项

- Set 800ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Retime the entrance to taste. 800ms with a standard ease-out is what the reference uses.
- Swap Space Mono for a face with the same x-height and cap height, then re-measure the headline block.
- Retime the entrance to your own 800ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**How the landing page reflows** — If your breakpoints were chosen to make things fit rather than to change the layout, read this entry. the type is clamped between 12px and 42px, the section is held at 100vh and the navigation collapses into a mobile menu rather than a list of hidden elements. The scale changes with the viewport; the sequence does not.

**The numbers behind the landing page** — A rebuild usually starts with a screenshot and a guess. Here it starts with 13,601 characters of specification: the frame, the spacing and the motion are written down before the first line of code. Nothing in this landing page depends on a default.

**The timing behind the landing page** — Ambitious motion usually costs the first screen its legibility. This brief keeps 800ms transitions, hover and press states and a live canvas short enough that the type never has to wait. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Industry | AI & SaaS |
| Format | 640x474 · 1.35:1 |
| Prompt text | 13,601 characters |
| Saved | 2026-09-17 |
| Typefaces | Space Mono, Anton · 12–42px |
| Tech stack | Tailwind CSS, React, TypeScript |
| Motion | 800ms transitions |

## 复刻步骤

1. Check your build against the reference measurements: type from 12px to 42px, 100vh sections and 14px spacing steps.
2. Keep the measurements the brief spells out: type from 12px to 42px, 100vh sections and 14px spacing steps.
3. Copy type from 12px to 42px, 100vh sections and 14px spacing steps into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: type from 12px to 42px, 100vh sections and 14px spacing steps.
5. Add the entrance first at 800ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/neon-logic
原始 prompt：13601 字符
