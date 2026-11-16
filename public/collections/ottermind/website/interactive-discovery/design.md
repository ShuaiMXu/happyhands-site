# Interactive Discovery

> Hero section reference for an industrial company — a 640x474 frame, a stats row, Inter and cubic-bezier(0.16,1,0.3,1) easing.

- 行业：Industrial（industrial）
- 区块：Hero section
- 画布：640x474 · 比例 1.3502 · 0s

## 概述

Interactive Discovery solves the hero section problem for an industrial company with a single captured brief. Colour is limited to black #000000 underneath, white #FFFFFF for the type and bright orange #E8702A carrying the accents, set in Inter. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is 1.1s transitions and cubic-bezier(0.16,1,0.3,1), kept quiet enough that the copy still leads. Use it as the reference when you are building an industrial company hero section and want a finished composition instead of a starting point.

## 主标题文案

> Hero section reference built on black #000000 and bright orange #E8702A, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#E8702A` | accent |
| Orange | `#D2611F` | lighter |
| White | `#FFFFFF` | Headline |
| Near-black | `#000000` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Control text |
| Playfair Display | Weight not fixed in the brief | Emphasis |

## 视觉要点

- Accent and ground are both named (bright orange #E8702A on black #000000), so a brand swap moves one value.
- Transitions are specified at 1.1s, which is the value to keep when the palette changes.
- Accent use is limited to bright orange #E8702A; everything else sits on black #000000.

## 布局

**Links before the action** — The bar is the quietest part of the composition: wordmark, a short row of links and one #E8702A action, all held at the smallest type step in the brief. The links are set below the wordmark in size, and the #E8702A action is the only element in the bar with any weight.

**Measured against the viewport** — The brief fixes 100vh sections, 28px spacing steps, 1.1s transitions and cubic-bezier(0.16,1,0.3,1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. The list is short enough that a reviewer can check it element by element. Port the values with the layout.

**One face, used with discipline** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. The interface text stays on one face, so the page never mixes two voices at the same size.

**Structure in one screen** — The hero section is built so the copy lands before anything else: the type carries the hierarchy, the 640x474 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x474, which is why it holds together when the copy changes.


## 动效

**A quieter branch is included** — Reduced motion is specified rather than bolted on: with it on, the entrance stops and the composition holds its final state. The layout is identical with the motion disabled, so nothing depends on the animation.

**Depth from a render** — A WebGL canvas gives the page its depth, and the surrounding layout stays flat so the render is the only thing asking for attention. The render carries its own colour, so the palette around it is kept quiet. The reference was captured at 640x474.


## 可替换项

- Check #E8702A against the copy size in Inter before you swap either, because the accent only reads on a large line.
- Retint #E8702A toward your palette but keep the step against #000000; flatten the two and the primary action stops reading.
- Retune #E8702A for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Set 1.1s to your own build speed and check that cubic-bezier(0.16,1,0.3,1) still lands the copy before the media starts.

## 文案规则

**The timing behind the hero section** — Keeping motion this small means the page leans on the type and the frame instead. If 1.1s transitions, hover and press states and a live canvas were removed entirely, the composition would still stand. Nothing animates for its own sake in this hero section.

**The order behind the hero section** — Attention is directed rather than left to chance. The sequence runs navigation, the announcement badge and the stats row, and each stop is sized against 100vh sections and 28px spacing steps so nothing arrives out of order. A industrial reader gets the offer before the options.

**What to change first in Interactive Discovery** — When you drop your own media in, keep the crop and the layer order. The media is a still at 640x474. That placement is what keeps the copy legible. The frame and the scale are what to leave alone.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Sector | Industrial |
| Viewport | 640x474 · 1.35:1 |
| Prompt | 6,894 characters |
| Saved | 2026-09-17 |
| Accent hex | bright orange #E8702A |
| Typefaces | Inter, Playfair Display |
| Built with | Tailwind CSS, React, TypeScript |
| Motion spec | 1.1s transitions and cubic-bezier(0.16,1,0.3,1) easing |

## 复刻步骤

1. Drop your product name in, then replace #E8702A with your own accent and re-check the contrast.
2. Set the brand first: product name, the #E8702A accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #E8702A accent and the headline that replaces the reference's.
4. Type the product name and the #E8702A accent before you touch the layout.
5. Check your build against the reference measurements: 100vh sections, 28px spacing steps and 1.1s transitions.

---
来源：https://ottermind.ai/explore/website/interactive-discovery
原始 prompt：6894 字符
