# VaultShield

> Hero section reference for a fintech product — 0.45s transitions, a stats row, React and Tailwind CSS and a 640x468 frame.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

VaultShield is the hero section reference for a fintech product, and the brief behind it is a full build spec rather than a mood board. Colour is limited to gray #CFC8C5 underneath, shade #192837 for the type and shade #7342E2 carrying the accents, set in Helvetica Now Display. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion is confined to 0.45s transitions. If you are briefing a fintech hero section, start from this composition and replace the subject.

## 主标题文案

> Hero section reference built on gray #CFC8C5 and shade #7342E2, set in Helvetica Now Display and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Shade | `#192837` | Headline |
| Shade — lighter | `#7342E2` | accent |
| Tint | `#F2F2EE` | lightest |
| Gray | `#CFC8C5` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica Now Display | Weight not fixed in the brief | Control text |
| Inter | Weight not fixed in the brief | Secondary copy, captions and labels |

## 视觉要点

- The accent is spent on shade #7342E2 and the rest of the composition holds gray #CFC8C5.
- The navigation collapses at max-width 560px, so the bar has a designed narrow state.
- Accent use is limited to shade #7342E2; everything else sits on gray #CFC8C5.

## 布局

**Links before the action** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #7342E2 action, all of it sitting above the hero section without a background of its own. Below 560px the links collapse instead of wrapping onto a second line.

**The scale is clamped, not stepped** — Type is sized with a clamp between 72px and 24px rather than fixed steps, so the display line stays proportionate between breakpoints instead of jumping. The mobile menu is part of the same brief, so the collapsed state is designed too. Keep the hierarchy; change the scale.

**The type carries the tone** — Typography is Helvetica Now Display, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. Substituting the face is possible, but the proportions have to survive the swap. One family with clear roles beats two that compete.

**One row, no drawers** — Keep the row to one line. The reference was captured at 640x468.


## 动效

**Short, named durations** — State changes are specified at 0.45s, so the feedback on the controls is a designed value rather than a browser default. Easing is specified alongside the duration (0.45s), so a rebuild cannot quietly substitute a different feel.

**Interaction is on the controls** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. The states are drawn from the page's own palette rather than from a component default. Fewer states, fully specified.


## 可替换项

- Swap #7342E2 for your brand colour and re-check it against #CFC8C5, since the accent is the only place saturation is allowed.
- Replace #7342E2 last, after the copy is final, and test it against #CFC8C5 at the smallest text size on the page.
- Swap Helvetica Now Display for a face with the same x-height and cap height, then re-measure the headline block.
- Keep Helvetica Now Display or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.

## 文案规则

**What to change first in VaultShield** — If your brand runs a heavier palette, test it against the frame before you commit. gray #CFC8C5 carries the page, so a darker accent needs more contrast than the reference uses. Substitution is cheaper than composition, and that is the point.

**The numbers behind the hero section** — This is what makes the reference reusable: 100vh sections, 24px spacing steps, 0.45s transitions and a 560px breakpoint. Nothing is left to a default, so a substitution that keeps those numbers keeps the composition. Nothing in this hero section depends on a default.

**How VaultShield sequences the first read** — Where a marketing page stacks proof below the fold and hopes, this hero section puts navigation, the stats row, the feature list and the background clip in front of the reader and holds the rest back. A fintech reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Sector | Fintech |
| Format | 640x468 · 1.37:1 |
| Source text | 4,734 characters |
| Archived | 2026-09-17 |
| Key colour | shade #7342E2 |
| Faces | Helvetica Now Display, Inter |
| Tools | Tailwind CSS, React, TypeScript |
| Timing | 0.45s transitions |

## 复刻步骤

1. Drop your product name in, then replace #7342E2 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #7342E2 accent and a headline that replaces the reference's.
3. Type the product name and the #7342E2 accent before you touch the layout.
4. Set your brand first: product name, the #7342E2 accent and the headline that replaces the reference's.
5. Check your build against the reference measurements: 100vh sections, 24px spacing steps and 0.45s transitions.

---
来源：https://ottermind.ai/explore/website/vaultshield
原始 prompt：4734 字符
