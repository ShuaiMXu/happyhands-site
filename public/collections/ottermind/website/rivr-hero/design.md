# RIVR

> Hero section reference for a fintech product — glass panels, #969BA2 base, a 800x599 frame and Helvetica.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：800x598 · 比例 1.3378 · 6.37s

## 概述

RIVR shows one way to build the hero section for a fintech product, and publishes the instructions that produced it. “Fluid Asset Streams” is the line the layout is built to carry. The palette is gray #969BA2 underneath, set in Helvetica. Delivery is React and Tailwind CSS, captured at 800x599 so the frame is fixed before any code is written. This reference is for a fintech product that wants the first screen settled before the build starts.

## 主标题文案

> “Fluid Asset Streams” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F0F0F0` | lightest |
| Muted blue | `#5E6470` | darker step |
| Muted blue — darker | `#454E57` | darkest |
| Gray | `#969BA2` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica | 12–80px | Headline and interface text — one face for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 12–80px is the range the whole scale works in.
- The type is set in Helvetica on a 12–80px scale, and the spacing follows the same steps.
- The display line is Helvetica at the top of a 12–80px scale, with the interface text on the same face.

## 布局

**Top row, one action** — Navigation is a single row with no second level under it. The bar sits over the 800x599 composition without a background of its own, so the media runs edge to edge underneath it. The bar is a handful of elements, so it rebuilds without a component library.

**Sizes fixed in the brief** — Nothing here is eyeballed. The spec fixes type from 12px to 80px and 14px spacing steps, and the rest of the layout derives from those values. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.

**Figures as typography** — The figures are set in Helvetica at a size closer to the headline than to the body copy. Numbers share the interface face, so they belong to the page instead of interrupting it.

**The bar shares the page grid** — Focus and hover states are specified for each link rather than inherited from the browser. Keep the link count to four or five; the row is sized for that.


## 动效

**Pointers only where they help** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. The interactive states do not move layout, so nothing jumps under the pointer.

**Motion that stays out of the way** — This one is delivered as a still composition at 800x599, so the hierarchy has to work without motion, and it does. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Replace “Fluid Asset Streams” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Change the copy first, then the accent, then the media: the 800x599 frame was solved in that order and reversing it costs a re-layout.
- Hold the 800x599 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Swap Helvetica for a face with the same x-height and cap height, then re-measure the headline block.

## 文案规则

**The argument this hero section makes** — The claim is made once, at display size. “Fluid Asset Streams” is doing that work from the first frame. Everything else in the hero section is ordered around that line: navigation, the stats row, the feature list and the background clip, and no second promise competes for the first read. RIVR states the offer once and lets the composition repeat it rather than adding a second claim.

**How RIVR sequences the first read** — Nothing here competes with the first decision. The supporting material waits below the fold, and navigation, the stats row, the feature list and the background clip carry the top of the page alone. A fintech reader gets the offer before the options.

**What moves in RIVR** — Motion is a short list rather than a system. The brief names hover and press states, and the rest of the page stays still. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | Fintech |
| Canvas size | 800x599 · 1.34:1 |
| Prompt text | 8,089 characters |
| Captured | 2026-09-17 |
| Type scale | Helvetica · 12–80px |
| Tech stack | Tailwind CSS, React, TypeScript |
| Motion | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x599 capture before you generate.
2. Pin the reference measurements before you restyle anything: type from 12px to 80px and 14px spacing steps.
3. Keep the measurements the brief spells out: type from 12px to 80px and 14px spacing steps.
4. Check your build against the reference measurements: type from 12px to 80px and 14px spacing steps.
5. Copy type from 12px to 80px and 14px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/rivr-hero
原始 prompt：8089 字符
