# HAUL!

> Footer reference for an AI or SaaS product — 0.8s transitions, a 1832x1354 frame, Inter and #FFFFFF base.

- 行业：AI & SaaS（ai-saas）
- 区块：Footer
- 画布：1832x1354 · 比例 1.353 · 0s

## 概述

HAUL! is the footer reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. It leads with “`. Next to the logo block, add the text” and gives that line the frame rather than shrinking it into a card. The colour scheme is white #FFFFFF underneath and orange #BB420D carrying the accents, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1832x1354 so the frame is fixed before any code is written. The motion budget is 0.8s transitions. Take it on when the footer needs a decided order before any new sections are added.

## 主标题文案

> Footer reference built on white #FFFFFF and orange #BB420D, set in Inter and measured against 50vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F8F9FA` | panel edges |
| White — lighter | `#FDFDFD` | Secondary |
| Orange | `#BB420D` | accent |
| White — lighter | `#FFFFFF` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 400 / 500 / 600 / 700 | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (0.8s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.8s, short enough that the page never feels like it is waiting for an animation.
- Accent and ground are both named (orange #BB420D on white #FFFFFF), so a brand swap moves one value.

## 布局

**Values you can check** — The values are the specification: 50vh sections and 0.8s transitions, captured at 1832x1354 rather than inferred from a screenshot. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**Scanning beats reading here** — Where a run of copy would go, this page puts a set of panels, which is what keeps the footer scannable. The grid collapses to a single column without changing the panel order.

**Accent on controls only** — Everything that is not #BB420D sits on white #FFFFFF, which is what makes the accent read as a signal rather than as decoration. Everything else sits on white #FFFFFF, which is what keeps a saturated palette legible.

**Every measurement is written down** — Spacing is quoted the same way (50vh sections and 0.8s transitions), not as a scale that grows on its own.


## 动效

**Feedback on the controls** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. A control that looks interactive behaves interactively, so there are no false affordances.

**One scroll behaviour only** — Parallax runs while the page is moving, so the composition has a defined resting state. Nothing about the effect changes the reading order of the sections. Check the composition with the effect removed.


## 可替换项

- Retune #BB420D for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Keep the supporting line as short as the reference's and measure the pair against the 1832x1354 crop.
- Change the copy first, then the accent, then the media: the 1832x1354 frame was solved in that order and reversing it costs a re-layout.
- Keep the 1832x1354 frame when you swap the content, because the composition was solved against that ratio.

## 文案规则

**What to change first in HAUL!** — Set the new copy at the display size the brief names (50vh sections and 0.8s transitions), and the rest of the scale follows without a redesign. Your accent has to survive the same contrast test as the reference accent.

**The numbers behind the footer** — Where a mood board leaves the scale open, this brief closes it: 50vh sections and 0.8s transitions, with the surrounding values derived from that decision. Nothing in this footer depends on a default.

**How the footer reflows** — The brief describes what changes at each width (the section is held at 50vh), which means the mobile version is a decision rather than a squeeze. Contrast is held on the #BB420D accent over the media, and the video is muted and inline. A squeeze would have been cheaper and would not hold.


## 规格

| 项 | 值 |
|---|---|
| Block | Footer |
| Category | AI & SaaS |
| Canvas size | 1832x1354 · 1.35:1 |
| Source text | 4,329 characters |
| Captured | 2026-09-17 |
| Accent | orange #BB420D |
| Fonts | Inter |
| Stack | Tailwind CSS, React, Framer Motion |
| Motion | 0.8s transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1832x1354 capture before you generate.
2. Set the brand first: product name, the #BB420D accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #BB420D with your own accent and re-check the contrast.
4. Type the product name and the #BB420D accent before you touch the layout.
5. Set your brand first: product name, the #BB420D accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/haul-footer
原始 prompt：4329 字符
