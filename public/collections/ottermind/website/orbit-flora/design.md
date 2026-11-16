# Orbit Flora

> Landing page reference for a lifestyle brand — glass panels, #161616 base, looping video and fluid type.

- 行业：Lifestyle（lifestyle）
- 区块：Landing page
- 画布：1454x1080 · 比例 1.3463 · 8.233s

## 概述

Read Orbit Flora as a landing page spec: the values were written down before the page was built. The palette runs #161616 underneath, #FFFFFF for the type and magenta #FD86DB carrying the accents, and the type is Inter. Delivery is a single component, captured at 1454x1080 so the frame is fixed before any code is written. Motion is limited to 620ms transitions, cubic-bezier(.16, 1.3, 1) and a looping video bed. If you are briefing a lifestyle landing page, start from this composition and replace the subject.

## 主标题文案

> Landing page reference built on #161616 and magenta #FD86DB, set in Inter and measured against 55vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#161616` | panels |
| Tint | `#FFFFFF` | Headline |
| Muted red | `#FFC5DC` | lighter |
| Magenta | `#FD86DB` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1454x1080 and a 8.2s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1454x1080 and a 8.2s loop, so the composition has a single media dependency.
- Accent use is limited to magenta #FD86DB; everything else sits on #161616.

## 布局

**Top row: wordmark, links, one action** — The row spends its contrast in one place: the #FD86DB action, with the wordmark and the links held back on the ink colour. Under 900px the links collapse into a full-screen overlay. Labels are short enough to fit one line at 900px, and the active item is marked with weight rather than with a pill. The bar is a handful of elements, so it rebuilds without a component library.

**Media behind the type** — The 1454x1080 video runs 8.2s on a loop behind the copy, muted and inline, with no tint layer between the two. The loop is short enough (8.2s) that the eye reads it as texture rather than as a timeline.

**Fluid where it needs to be** — Type is sized with a clamp between 57px and 34px rather than fixed steps, so the display line stays proportionate between breakpoints instead of jumping. The type changes size, not role, as the viewport narrows.

**Display size does the talking** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. The caption step is small enough to sit under a figure without changing the rhythm of the page.


## 动效

**A canvas, not an image** — A WebGL canvas is the page's only spectacle, and the interface is arranged not to compete with it. Because the scene is live, the layout can be resized without a second set of assets.

**One duration for the controls** — Transitions are specified at 620ms on cubic-bezier(.16, 1.3, 1), which is the timing the controls are held to. Every state change names a value, so the browser default is never used.


## 可替换项

- Retune #FD86DB for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Retint #FD86DB toward your palette but keep the step against #161616; flatten the two and the primary action stops reading.
- Replace the copy in the Inter stack first, then re-check the #FD86DB accent against the media behind it.
- Retime the entrance to your own 620ms, but keep cubic-bezier(.16, 1.3, 1) as the curve, because the easing is what reads as this design.

## 文案规则

**How Orbit Flora sequences the first read** — A feature-led layout lists what the product does; this one routes the reader to a single decision. The route is visible in navigation, the announcement badge and the stats row and in how 55vh sections and 34px spacing steps space them. A lifestyle reader gets the offer before the options.

**Making the landing page yours** — The composition is the reusable part and the subject is yours. Keep 55vh sections and 34px spacing steps and replace the words, the media and the brand marks. The frame and the scale are what to leave alone.

**What a lifestyle brand gains here** — The reason this works for a lifestyle brand is that it never asks the reader to assemble the message. Layout, type and colour are decided (#161616 and magenta #FD86DB, set in Inter), so the first screen reads as a finished argument rather than a pile of parts. It gives a lifestyle reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Field | Lifestyle |
| Viewport | 1454x1080 · 1.35:1 |
| Loop | 8.2s loop |
| Prompt text | 9,402 characters |
| Date | 2026-09-17 |
| Accent hex | magenta #FD86DB |
| Faces | Inter |
| Timing | 620ms transitions, cubic-bezier(.16, 1.3, 1) easing and a 8.2s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1454x1080 capture before you generate.
2. Drop your product name in, then replace #FD86DB with your own accent and re-check the contrast.
3. Set the brand first: product name, the #FD86DB accent and a headline that replaces the reference's.
4. Type the product name and the #FD86DB accent before you touch the layout.
5. Set your brand first: product name, the #FD86DB accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/orbit-flora
原始 prompt：9402 字符
