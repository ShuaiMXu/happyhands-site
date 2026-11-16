# Transform Data

> Hero section reference for an AI or SaaS product — 250ms transitions, #505050 base, a dark stage and a stats row.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x592 · 比例 1.3514 · 8.05s

## 概述

Transform Data keeps its decision trail: the brief that produced this hero section runs 3,605 characters. It leads with “Transform Data Quickly” and gives that line the frame rather than shrinking it into a card. The palette is gray #505050 underneath and white #F8F8F8 for the type, set in Inter. Delivery is a single component, captured at 800x592 so the frame is fixed before any code is written. The motion budget is 250ms transitions. Keep it open while you write: the 3,605-character brief is the part that transfers to your own page.

## 主标题文案

> “Transform Data Quickly” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Gray | `#505050` | composition |
| Near-black | `#000000` | darkest |
| White | `#F8F8F8` | Headline |
| Near-black — lighter | `#0E1311` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 400 / 500 / 600 / 700 | Control text |
| Transform Data Quickly | 400 / 500 / 600 / 700 | Secondary copy, captions and labels |
| Schibsted Grotesk | 400 / 500 / 600 / 700 | Fallback and supporting interface text |

## 视觉要点

- Transitions are specified at 250ms, which is the value to keep when the palette changes.
- Transitions are specified at 250ms, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (250ms), so a slower rebuild reads as a different design.

## 布局

**Top row, one action** — Navigation is a single row with no second level under it. The bar sits over the 800x592 composition without a background of its own, so the media runs edge to edge underneath it. The bar is a handful of elements, so it rebuilds without a component library.

**The brief names the steps** — Sizes are quoted rather than inherited: 16px spacing steps and 250ms transitions. Swap the face or the copy and those relationships still hold. The type and the layout share the same steps, so nothing drifts when one of them is substituted. The numbers are the design; the rest is arrangement.

**One face, used with discipline** — Type is the styling system here: Inter at the display size, the same face across the interface, and no second accent colour doing the work. Weights are specified per role, so the hierarchy does not depend on guesswork at build time.

**Top row: wordmark, links, one action** — Keep the row to one line. The reference was captured at 800x592.


## 动效

**Timing kept in the brief** — The animation budget is small and explicit: 250ms, applied to state changes rather than to entrances. Focus states are timed with the same value as hover, so keyboard and pointer feedback match. One duration per behaviour.

**Almost no motion** — This one is delivered as a still composition at 800x592, so the hierarchy has to work without motion, and it does. Motion is treated as feedback rather than as decoration. Stillness is a valid choice.


## 可替换项

- Retime the entrance to your own 250ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 800x592 frame.
- Rewrite “Transform Data Quickly” to the same line count; the mask reveals each line in turn.
- Hold the 800x592 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.

## 文案规则

**How the hero section reflows** — You cannot fix a narrow screen by shrinking it. This brief handles the change in the type and the navigation instead: the scale is fluid rather than stepped. The scale changes with the viewport; the sequence does not.

**What holds up for AI & SaaS** — 3,605 characters of brief produce one screen with no filler. The values in it are explicit (16px spacing steps and 250ms transitions), which is why the composition still reads when the words change. Transform Data states the offer once and lets the composition repeat it rather than adding a second claim.

**The numbers behind the hero section** — Where a mood board leaves the scale open, this brief closes it: 16px spacing steps and 250ms transitions, with the surrounding values derived from that decision. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Sector | AI & SaaS |
| Format | 800x592 · 1.35:1 |
| Prompt | 3,605 characters |
| Saved | 2026-09-17 |
| Type scale | Inter, Transform Data Quickly, Schibsted Grotesk |
| Timing | 250ms transitions |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: 16px spacing steps and 250ms transitions.
2. Keep the measurements the brief spells out: 16px spacing steps and 250ms transitions.
3. Check your build against the reference measurements: 16px spacing steps and 250ms transitions.
4. Copy 16px spacing steps and 250ms transitions into your own brief before you rewrite anything else.
5. Port the motion last: the entrance, the 250ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/transform-data-hero
原始 prompt：3605 字符
