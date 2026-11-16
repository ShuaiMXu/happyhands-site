# PROMPT

> Hero section reference for an agency or studio — Inter Tight, 80ms transitions, a stats row and a dark stage.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1472x1080 · 比例 1.363 · 5.74s

## 概述

PROMPT keeps its decision trail: the brief that produced this hero section runs 13,186 characters. Colour is limited to black #000000 underneath and white #FFFFFF for the type, set in Inter Tight. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion is limited to 80ms transitions and a looping video bed. Keep it open while you write: the 13,186-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference for an agency or studio, captured at 1472x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | Headline |
| Near-black | `#000000` | composition |
| White — darker | `#FEFEFE` | lighter step |
| Near-black — lighter | `#010000` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter Tight | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (80ms), so a slower rebuild reads as a different design.
- Transitions are specified at 80ms, which is the value to keep when the palette changes.
- The clip is one asset at 1472x1080 and a 5.7s loop, so the composition has a single media dependency.

## 布局

**Links collapse at one width** — The bar is one row of text and one action, measured at 100vh sections and 32px spacing steps so it reads as a strip rather than as a band. The bar sits over the 1472x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Cards without borders** — The grid is the structure: panels of the same size, set in Inter Tight, arranged so the eye moves across rather than down. Panel heights are driven by the copy, so a longer line does not break the alignment of the row.

**Top row, one action** — Give the wordmark no more room than its type needs. The reference was captured at 1472x1080.

**Numbers carried into the build** — Nothing in the layout is left to feel: the brief quotes 100vh sections, 32px spacing steps and 80ms transitions and the build has to hit those values. There is no invented intermediate value between the named ones; the measurement list is the whole system.


## 动效

**It respects reduced-motion** — The motion layer has an off switch. Under prefers-reduced-motion, the entrance and the loop is dropped and everything else stays where it is. With reduced motion on, the composition holds its final state rather than snapping mid-transition.

**Fast enough to feel deliberate** — The animation budget is small and explicit: 80ms, applied to state changes rather than to entrances. The same duration is reused across controls, which keeps the interactions feeling like one system.


## 可替换项

- Recut your footage to the 5.7s loop, then export at 1472x1080 so the crop the reference specifies survives.
- Write the replacement headline first, then confirm it still fits the 1472x1080 frame at the reference's type size.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 1472x1080.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1472x1080 frame.

## 文案规则

**Why this composition works for agency** — The trade-off is density: this hero section says less on the first screen than a feature-led layout would. What it keeps is the reading order, and navigation, the announcement badge, the stats row, the card grid and the feature list do the work a longer page would spread out. It gives a agency reader the shortest honest route to the offer.

**How PROMPT sequences the first read** — The brief runs 13,186 characters and names the reading order explicitly: navigation, the announcement badge, the stats row, the card grid and the feature list, with 100vh sections and 32px spacing steps between them. A agency reader gets the offer before the options.

**How the hero section reflows** — Wide, the composition is dense; narrow, the section is held at 100vh, the navigation collapses into a mobile menu and the motion has a reduced-motion branch. Both states are described in the brief. Width changes the measurements, not the reading path.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | Agencies & Studios |
| Frame | 1472x1080 · 1.36:1 |
| Runtime | 5.7s loop |
| Input brief | 13,186 characters |
| Date | 2026-09-17 |
| Type scale | Inter Tight |
| Reference stack | Tailwind CSS, React, TypeScript |
| Transitions | 80ms transitions and a 5.7s media loop |

## 复刻步骤

1. Keep the measurements the brief spells out: 100vh sections, 32px spacing steps and 80ms transitions.
2. Copy 100vh sections, 32px spacing steps and 80ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 100vh sections, 32px spacing steps and 80ms transitions.
4. Pin the reference measurements before you restyle anything: 100vh sections, 32px spacing steps and 80ms transitions.
5. Add the entrance first at 80ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/prompt-hero
原始 prompt：13186 字符
