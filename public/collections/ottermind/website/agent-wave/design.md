# Agent Wave

> Landing page reference for an AI or SaaS product — a stats row, 0.28s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and looping video.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1478x1080 · 比例 1.3685 · 6.867s

## 概述

Agent Wave is a SaaS landing page built from one written brief, and this page documents that brief. The palette is #000000 underneath and #FFFFFF for the type, set in Inter. Delivery is a single component, captured at 1478x1080 so the frame is fixed before any code is written. The page keeps its motion to 0.28s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 16,675-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1478x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Tint | `#FFFFFF` | Headline |
| Near-black | `#000000` | background |
| Tint — darker | `#9A9A9A` | Secondary |
| Tint — darker | `#D8D8D8` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 19px | Interface |
| Instrument Serif | 19px | Second face |

## 视觉要点

- The layout shifts at min-width 901px, so the narrow composition is designed rather than inherited.
- The navigation collapses at min-width 901px, so the bar has a designed narrow state.
- Media is specified at 1478x1080 and a 6.9s loop, so a replacement should match the crop and the loop length.

## 布局

**The nav is deliberately thin** — The bar is one row of text and one action, measured at a fixed 19px display size and 100vh sections so it reads as a strip rather than as a band. Labels are short enough to fit one line at 901px, and the active item is marked with weight rather than with a pill. If your own page has more sections, group them rather than widening the bar.

**Full-frame video, no panel** — The clip runs 6.9s at 1478x1080 and loops without a visible cut, so it reads as surface rather than as footage. A poster frame at 1478x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**The announcement pill** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title.

**One row, no drawers** — Below 901px the links collapse instead of wrapping onto a second line.


## 动效

**A loop, not a timeline** — Ambient movement is one 6.9s clip at 1478x1080, looping quietly behind the copy rather than reacting to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size. Shoot or export at 1478x1080 or wider.

**Arrival order is the trick** — Entrance motion is spent on one element only (each line rises out of an overflow-hidden window), which is what keeps a busy first screen from feeling busy. Under reduced motion the element simply appears and the layout is unchanged.


## 可替换项

- Recut your footage to the 6.9s loop, then export at 1478x1080 so the crop the reference specifies survives.
- Retime the entrance to taste. 0.28s with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Set 0.28s to your own build speed and check that cubic-bezier(0.16, 1, 0.3, 1) still lands the copy before the media starts.
- Retime the entrance to your own 0.28s, but keep cubic-bezier(0.16, 1, 0.3, 1) as the curve, because the easing is what reads as this design.

## 文案规则

**Reading Agent Wave as a spec** — The landing page is measured, not eyeballed. a fixed 19px display size and 100vh sections come from the brief, and the layout is arranged to those steps rather than nudged into place. Nothing in this landing page depends on a default.

**Why this composition works for SaaS** — Count the decisions in this landing page and they trace back to one document: 16,675 characters naming the frame at 1478x1080, the type and the rhythm. It gives a SaaS reader the shortest honest route to the offer.

**How the landing page reflows** — Wide, the composition is dense; narrow, the layout shifts at 901px, the section is held at 100vh and the motion has a reduced-motion branch. Both states are described in the brief. Both states are described in the same brief.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Category | AI & SaaS |
| Canvas | 1478x1080 · 1.37:1 |
| Clip length | 6.9s loop |
| Input brief | 16,675 characters |
| Capture date | 2026-09-17 |
| Type | Inter, Instrument Serif · 19px |
| Transitions | 0.28s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1478x1080 capture before you generate.
2. Copy a fixed 19px display size, 100vh sections and 7px corners into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: a fixed 19px display size, 100vh sections and 7px corners.
4. Pin the reference measurements before you restyle anything: a fixed 19px display size, 100vh sections and 7px corners.
5. Check your build against the reference measurements: a fixed 19px display size, 100vh sections and 7px corners.

---
来源：https://ottermind.ai/explore/website/agent-wave
原始 prompt：16675 字符
