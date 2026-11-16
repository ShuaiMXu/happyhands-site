# Pixel Grid Hover

> Portfolio reference for an agency or studio — a stats row, a 640x472 frame, a moving marquee and #EBEBEB base.

- 行业：Agencies & Studios（creative）
- 区块：Portfolio
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Read Pixel Grid Hover as a portfolio page spec: the values were written down before the page was built. “Brand Strategy & Product Design” is the line the layout is built to carry. Colour is limited to white #EBEBEB underneath and black #1A1819 for the type, set in DM Sans. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The motion budget is 0.7s transitions and cubic-bezier(0.22,1,0.36,1). Treat it as the brief for an agency or studio portfolio page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> “Brand Strategy & Product Design” — the whole portfolio is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1A1819` | Headline |
| White | `#EEEEEE` | lightest |
| Muted blue | `#727A83` | surface |
| White — darker | `#EBEBEB` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| DM Sans | 12–14px | Headline and interface text — one face for the whole page |

## 视觉要点

- The type is set in DM Sans on a 12–14px scale, and the spacing follows the same steps.
- Font roles are assigned rather than mixed here, and 12–14px is the range the whole scale works in.
- The display line is DM Sans at the top of a 12–14px scale, with the interface text on the same face.

## 布局

**Sizes fixed in the brief** — The brief names the numbers: type from 12px to 14px, 12px spacing steps, 0.7s transitions and cubic-bezier(0.22,1,0.36,1) easing. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The smallest and largest values in that list set the range the composition works in.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in DM Sans at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition.

**Cards do the structuring** — Where a run of copy would go, this page puts a set of panels, which is what keeps the portfolio page scannable. The accent inside the grid marks one element at most, so panels do not compete with each other. Space the panels; do not outline them. The reference was captured at 640x472.

**Values you can check** — Spacing is quoted the same way (type from 12px to 14px, 12px spacing steps, 0.7s transitions and cubic-bezier(0.22,1,0.36,1) easing), not as a scale that grows on its own.


## 动效

**The page answers the scroll** — Parallax is the page's single scroll behaviour, so the effect has a defined place in the composition. The effect is decorative: turn it off and the hierarchy still works.

**Feedback on the controls** — The page answers only where it can be acted on: hover states on the buttons and links rather than on every card. The interactive states do not move layout, so nothing jumps under the pointer. Do not animate layout on hover.


## 可替换项

- Set your own headline in DM Sans at the size the reference uses, so the portfolio page keeps the same optical weight.
- Replace “Brand Strategy & Product Design” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Keep the portfolio page inside one viewport and move whatever does not fit into the section below it.

## 文案规则

**How the portfolio page reflows** — Responsive here means the scale changes and the sequence does not. the type is clamped between 12px and 14px, and the reading order stays where the brief put it. The narrow layout is a decision rather than a squeeze, and the hierarchy survives it.

**Why the agency brief holds** — A stock hero and this portfolio page use the same parts. Here they are ordered by the announcement badge, the stats row, the card grid and the footer and measured with type from 12px to 14px, 12px spacing steps, 0.7s transitions and cubic-bezier(0.22,1,0.36,1) easing, so the screen reads as a sequence rather than a container. Pixel Grid Hover states the offer once and lets the composition repeat it rather than adding a second claim.

**Reading Pixel Grid Hover as a spec** — 8,672 characters of brief produce a full specification. The load-bearing part is short: type from 12px to 14px, 12px spacing steps, 0.7s transitions and cubic-bezier(0.22,1,0.36,1) easing. Nothing in this portfolio page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page section | Portfolio |
| Vertical | Agencies & Studios |
| Canvas | 640x472 · 1.36:1 |
| Prompt text | 8,672 characters |
| Capture date | 2026-09-17 |
| Faces | DM Sans · 12–14px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion spec | 0.7s transitions and cubic-bezier(0.22,1,0.36,1) easing |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: type from 12px to 14px, 12px spacing steps and 0.7s transitions.
2. Check your build against the reference measurements: type from 12px to 14px, 12px spacing steps and 0.7s transitions.
3. Keep the measurements the brief spells out: type from 12px to 14px, 12px spacing steps and 0.7s transitions.
4. Copy type from 12px to 14px, 12px spacing steps and 0.7s transitions into your own brief before you rewrite anything else.
5. Rebuild the motion last and keep the 0.7s entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/pixel-grid-hover
原始 prompt：8672 字符
