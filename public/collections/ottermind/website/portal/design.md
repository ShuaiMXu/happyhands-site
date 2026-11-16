# Portal

> Hero section reference for an AI or SaaS product — fluid type, #7342E2 accent, 0.3s transitions and React and Tailwind CSS.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：640x474 · 比例 1.3502 · 0s

## 概述

Portal keeps its decision trail: the brief that produced this hero section runs 5,718 characters. The colour scheme is neutral #F2F2EE underneath, shade #192837 for the type and shade #7342E2 carrying the accents, and the page is set in Helvetica Now Display. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion is 0.3s transitions, kept quiet enough that the copy still leads. Keep it open while you write: the 5,718-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built on neutral #F2F2EE and shade #7342E2, set in Helvetica Now Display and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Shade | `#7342E2` | accent |
| Shade — darker | `#192837` | Headline |
| Neutral | `#F2F2EE` | composition |
| Gray | `#CFC8C5` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica Now Display | Weight not fixed in the brief | Headline and interface text |
| Inter | Weight not fixed in the brief | Text face |

## 视觉要点

- The accent is spent on shade #7342E2 and the rest of the composition holds neutral #F2F2EE.
- Accent and ground are both named (shade #7342E2 on neutral #F2F2EE), so a brand swap moves one value.
- Transitions are specified at 0.3s, which is the value to keep when the palette changes.

## 布局

**Navigation held to one row** — The bar carries the wordmark, the section links and one #7342E2 button, measured at 100vh sections and 24px spacing steps so it never grows into a second header. The links are set below the wordmark in size, and the #7342E2 action is the only element in the bar with any weight. Keep the link count to four or five; the row is sized for that.

**Tracking tightens as it grows** — With Helvetica Now Display doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. A face swap is safe as long as the sizes and weights stay where the brief put them. Set the display line last.

**Copy first, decoration second** — The whole composition fits one screen and is delivered as React and Tailwind CSS, with the copy, the media and the controls named in the brief. The page is one composition at 640x474, which is why it holds together when the copy changes.

**A navigation bar that gets out of the way** — The bar sits over the 640x474 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**The whole animation budget** — The animation budget is small and explicit: 0.3s, applied to state changes rather than to entrances. Easing is specified alongside the duration (0.3s), so a rebuild cannot quietly substitute a different feel. Time the feedback exactly.

**Interaction kept local** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. Hover and focus are specified together, so the pointer and the keyboard get the same information.


## 可替换项

- Retint #7342E2 toward your palette but keep the step against #F2F2EE; flatten the two and the primary action stops reading.
- Change the copy before the colour: rewrite the Helvetica Now Display paragraphs first, then check #7342E2 against the media behind them.
- Keep Helvetica Now Display or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Retime the entrance to your own 0.3s, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**How Portal sequences the first read** — Where a marketing page stacks proof below the fold and hopes, this hero section puts navigation, the announcement badge, the feature list and the background clip in front of the reader and holds the rest back. A SaaS reader gets the offer before the options.

**Reading Portal as a spec** — Most references show the result and keep the numbers. This one reverses that: 100vh sections, 24px spacing steps and 0.3s transitions are published beside the page, so the result can be reproduced instead of approximated. Nothing in this hero section depends on a default.

**What this hero section gets right** — The claim is made once, at display size. Everything else in the hero section is ordered around that line: navigation, the announcement badge, the feature list and the background clip, and no second promise competes for the first read. Portal states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Sector | AI & SaaS |
| Canvas size | 640x474 · 1.35:1 |
| Prompt text | 5,718 characters |
| Captured | 2026-09-17 |
| Key colour | shade #7342E2 |
| Faces | Helvetica Now Display, Inter |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 0.3s transitions |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 24px spacing steps and 0.3s transitions.
2. Copy 100vh sections, 24px spacing steps and 0.3s transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 100vh sections, 24px spacing steps and 0.3s transitions.
4. Keep the measurements the brief spells out: 100vh sections, 24px spacing steps and 0.3s transitions.
5. Add the entrance first at 0.3s, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/portal
原始 prompt：5718 字符
