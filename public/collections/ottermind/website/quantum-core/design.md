# Quantum Core

> Landing page reference for an AI or SaaS product — cubic-bezier(0.16, 1, 0.3, 1) easing, looping video, a stats row and 700ms transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1420 · 比例 1.3521 · 6.75s

## 概述

Quantum Core shows one way to build the landing page for an AI or SaaS product, and publishes the instructions that produced it. The headline reads “Talk with the team”, and the rest of the landing page is arranged around it. The palette is deep blue #080A19 underneath and white #E9E9E9 for the type, set in Suisse Intl. Delivery is React and Tailwind CSS, captured at 1920x1420 so the frame is fixed before any code is written. Motion is confined to 700ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 27,320-character brief is the part that transfers to your own page.

## 主标题文案

> “Talk with the team” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#E9E9E9` | Headline |
| Near-black | `#080A19` | composition |
| Near-black — darker | `#0A0707` | darkest |
| Near-black — darker | `#000C12` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Suisse Intl | 12–72px | Headline and interface text — one face for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 12–72px is the range the whole scale works in.
- Media is specified at 1920x1420 and a 6.8s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1920x1420 and a 6.8s loop, so the composition has a single media dependency.

## 布局

**The nav is deliberately thin** — The wordmark holds the left edge and the links run to the right of it, all of it set in Suisse Intl so the bar belongs to the page below rather than to a separate system. The bar sits over the 1920x1420 composition without a background of its own, so the media runs edge to edge underneath it.

**Sizes fixed in the brief** — The list stays short (type from 12px to 72px, 20px spacing steps, 700ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), which is why the whole system can be checked by hand. Each value maps to one job: a type step, a gap, a radius or a transition.

**One row, no drawers** — One action per bar. The reference was captured at 1920x1420.

**The spacing steps are quoted** — Spacing is quoted the same way (type from 12px to 72px, 20px spacing steps, 700ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), not as a scale that grows on its own.


## 动效

**A loop, not a timeline** — One 6.8s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution.

**A small interactive surface** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. The states are drawn from the page's own palette rather than from a component default. Keep the interactive layer small.


## 可替换项

- Keep 1920x1420 for the media and re-crop your own asset into it rather than resizing the frame.
- Recut your footage to the 6.8s loop, then export at 1920x1420 so the crop the reference specifies survives.
- Keep Suisse Intl or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Retime the entrance to your own 700ms, but keep cubic-bezier(0.16, 1, 0.3, 1) as the curve, because the easing is what reads as this design.

## 文案规则

**Making the landing page yours** — Suppose you only have one afternoon. Change the headline and the action label, leave type from 12px to 72px and 20px spacing steps alone, and you have a page that looks intentional. Your accent has to survive the same contrast test as the reference accent.

**Reading Quantum Core as a spec** — The cost of a fixed scale is less room to improvise. type from 12px to 72px and 20px spacing steps keep the composition coherent, but a new element has to be fitted rather than placed. Nothing in this landing page depends on a default.

**What this landing page gets right** — A stock hero and this landing page use the same parts. Here they are ordered by navigation, the headline, the announcement badge, the stats row and the card grid and measured with type from 12px to 72px, 20px spacing steps, 700ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing, so the screen reads as a sequence rather than a container. Quantum Core states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Sector | AI & SaaS |
| Frame | 1920x1420 · 1.35:1 |
| Clip length | 6.8s loop |
| Prompt | 27,320 characters |
| Date | 2026-09-17 |
| Type scale | Suisse Intl · 12–72px |
| Stack | Tailwind CSS, React, TypeScript |
| Motion spec | 700ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.8s media loop |

## 复刻步骤

1. Keep the measurements the brief spells out: type from 12px to 72px, 20px spacing steps and 700ms transitions.
2. Check your build against the reference measurements: type from 12px to 72px, 20px spacing steps and 700ms transitions.
3. Pin the reference measurements before you restyle anything: type from 12px to 72px, 20px spacing steps and 700ms transitions.
4. Copy type from 12px to 72px, 20px spacing steps and 700ms transitions into your own brief before you rewrite anything else.
5. Copy the 700ms timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/quantum-core
原始 prompt：27320 字符
