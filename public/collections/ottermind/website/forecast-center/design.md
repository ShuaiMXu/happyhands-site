# Forecast Center

> Landing page reference for an AI or SaaS product — one self-contained HTML file, #04121B base, a dark stage and a masked headline reveal.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1466x1080 · 比例 1.3574 · 5.266s

## 概述

This is the landing page from Forecast Center, published with the brief that produced it rather than as a screenshot. The palette is deep blue #04121B underneath and #FFFFFF for the type, set in Inter. Delivery is one self-contained HTML file, captured at 1466x1080 so the frame is fixed before any code is written. The motion budget is 2.55s transitions, cubic-bezier(.16,1.3,1) and a looping video bed. If you are briefing a SaaS landing page, start from this composition and replace the subject.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1466x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Tint | `#FFFFFF` | Headline |
| Near-black | `#04121B` | composition |
| Near-black — lighter | `#051413` | panel edges |
| Muted yellow | `#9E9B7C` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (2.55s), so a slower rebuild reads as a different design.
- Transitions are specified at 2.55s, which is the value to keep when the palette changes.
- A reduced-motion branch is included, so keep it when you port the page.

## 布局

**Navigation held to one row** — The bar is one row of text and one action, measured at 100vh sections and 14px spacing steps so it reads as a strip rather than as a band. The bar sits over the 1466x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition.

**Links collapse at one width** — Keep the link count to four or five; the row is sized for that. The reference was captured at 1466x1080.

**Nothing here is inherited** — Nothing in the layout is left to feel: the brief quotes 100vh sections, 14px spacing steps, 2.55s transitions and cubic-bezier(.16,1.3,1) easing and the build has to hit those values. Values are quoted from the captured prompt rather than inferred, so they survive a re-render.


## 动效

**A loop, not a timeline** — Ambient movement is one 5.3s clip at 1466x1080, looping quietly behind the copy rather than reacting to the pointer. Because it is muted, the loop can run under the copy without competing for sound or focus. Shoot or export at 1466x1080 or wider.

**Motion can be switched off** — The motion layer ships with an off switch: the entrance and the loop is dropped under prefers-reduced-motion. Interaction feedback still works under reduced motion; only the entrances are dropped. Keep the reduced-motion branch when you port the page.


## 可替换项

- Swap the clip for your own. Export at 1466x1080 or wider, keep it muted, and make the 5.3s loop seamless so the cut is invisible.
- Retime the entrance to your own 2.55s, but keep cubic-bezier(.16,1.3,1) as the curve, because the easing is what reads as this design.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 1466x1080.
- Change the copy first, then the accent, then the media: the 1466x1080 frame was solved in that order and reversing it costs a re-layout.

## 文案规则

**The order behind the landing page** — Where a marketing page stacks proof below the fold and hopes, this landing page puts navigation, the headline, the announcement badge, the stats row and the card grid in front of the reader and holds the rest back. A SaaS reader gets the offer before the options.

**How the landing page reflows** — A designed narrow layout takes more decisions than a squeeze. The brief pays for them: the section is held at 100vh and the motion has a reduced-motion branch, stated rather than discovered at build time. A squeeze would have been cheaper and would not hold.

**Reading Forecast Center as a spec** — Compare this with a template that calls its spacing a preference. Here the same values are named (100vh sections, 14px spacing steps, 2.55s transitions and cubic-bezier(.16,1.3,1) easing), so an edit either keeps them or visibly breaks the composition. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Field | AI & SaaS |
| Canvas | 1466x1080 · 1.36:1 |
| Clip length | 5.3s loop |
| Source text | 11,253 characters |
| Capture date | 2026-09-17 |
| Type | Inter |
| Stack | single HTML file |
| Motion | 2.55s transitions, cubic-bezier(.16,1.3,1) easing and a 5.3s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 14px spacing steps and 2.55s transitions.
2. Pin the reference measurements before you restyle anything: 100vh sections, 14px spacing steps and 2.55s transitions.
3. Keep the measurements the brief spells out: 100vh sections, 14px spacing steps and 2.55s transitions.
4. Copy 100vh sections, 14px spacing steps and 2.55s transitions into your own brief before you rewrite anything else.
5. Port the motion last: the entrance, the 2.55s states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/forecast-center
原始 prompt：11253 字符
