# Asme

> Hero section reference for an AI or SaaS product — a stats row, glass panels, #000000 base and a 800x582 frame.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x582 · 比例 1.3746 · 8.89s

## 概述

Read Asme as a hero section spec: the values were written down before the page was built. The colour scheme is black #000000 underneath and gray #C9CAB9 for the type, and the page is set in Instrument Serif. Delivery is React and Tailwind CSS, captured at 800x582 so the frame is fixed before any code is written. Motion is 500ms transitions, kept quiet enough that the copy still leads. Use it as the reference when you are building an AI or SaaS product hero section and want a finished composition instead of a starting point.

## 主标题文案

> Hero section reference for an AI or SaaS product, captured at 800x582 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | composition |
| Gray | `#C9CAB9` | Headline |
| Near-black — lighter | `#000102` | panel edges |
| Muted yellow | `#A09D7F` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display |

## 视觉要点

- Transitions are specified at 500ms, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 500ms, which is the value to keep when the palette changes.

## 布局

**A bar with nothing spare** — Navigation is a single row with no second level under it. The bar sits over the 800x582 composition without a background of its own, so the media runs edge to edge underneath it. Design the collapsed state before adding a sixth link.

**One scale for type and frame** — Nothing here is eyeballed. The spec fixes 500ms transitions, and the rest of the layout derives from those values. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. Change the subject, not the steps.

**Type sets the hierarchy** — With Instrument Serif doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Numerals share the interface face, so statistics and labels belong to the same system.

**A footer that carries the brand** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The wordmark gets its own block, which keeps a long link list readable. Group links; do not dump them.


## 动效

**Pointer states, nothing more** — The page answers only where it can be acted on: hover states on the buttons and links rather than on every card. The interactive states do not move layout, so nothing jumps under the pointer.

**Fast enough to feel deliberate** — Hover, press and focus all resolve in 500ms, which is what makes the interface feel immediate. The quoted timing covers state changes, so the feedback is the part of the motion that is specified.


## 可替换项

- Set 500ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Read the brief value by value against the 800x582 capture before you edit anything; the numbers are the part that is easiest to lose.
- Write the replacement headline first, then confirm it still fits the 800x582 frame at the reference's type size.
- Retime the entrance to your own 500ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**How the hero section reflows** — The narrow layout is designed, not inherited. the scale is fluid rather than stepped at each width, so the hierarchy survives the reflow. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**What this hero section gets right** — A tint layer over the media would have been the easy fix. The brief leaves it off. The media is a still at 800x582. The copy still holds because 500ms transitions keep the frame calm. It gives a SaaS reader the shortest honest route to the offer.

**How Asme sequences the first read** — Compare the top of this page with a typical SaaS landing screen. Both carry a headline and an action; here navigation, the headline, the stats row, the background clip and the footer sit in a fixed order instead of competing at the same weight. A SaaS reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Field | AI & SaaS |
| Frame | 800x582 · 1.37:1 |
| Source text | 4,360 characters |
| Saved | 2026-09-17 |
| Type scale | Instrument Serif |
| Tech stack | Tailwind CSS, React, TypeScript |
| Animation | 500ms transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x582 capture before you generate.
2. Check your build against the reference measurements: 500ms transitions.
3. Pin the reference measurements before you restyle anything: 500ms transitions.
4. Keep the measurements the brief spells out: 500ms transitions.
5. Copy 500ms transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/asme-hero
原始 prompt：4360 字符
