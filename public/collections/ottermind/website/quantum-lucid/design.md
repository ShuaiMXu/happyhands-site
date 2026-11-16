# Quantum Lucid

> Landing page reference for an AI or SaaS product — cubic-bezier(.22, 1.36, 1) easing, looping video, one self-contained HTML file and Figtree.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1412 · 比例 1.3598 · 6.65s

## 概述

Quantum Lucid is the landing page reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. The palette is neutral #F2F2F2 underneath, near-black #000000 for the type and shade #38C6EC carrying the accents, set in Figtree. Delivery is one self-contained HTML file, captured at 1920x1412 so the frame is fixed before any code is written. Motion is 1200ms transitions, cubic-bezier(.22, 1.36, 1) and a looping video bed, kept quiet enough that the copy still leads. Keep it open while you write: the 20,249-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on neutral #F2F2F2 and shade #38C6EC, set in Figtree and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Shade | `#38C6EC` | accent |
| Near-black | `#000000` | Headline |
| Neutral | `#F2F2F2` | composition |
| Shade — darker | `#2E2E2E` | darker step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Figtree | Weight not fixed in the brief | Control text |
| Inter | Weight not fixed in the brief | Body copy |

## 视觉要点

- The clip is one asset at 1920x1412 and a 6.7s loop, so the composition has a single media dependency.
- The navigation collapses at min-width 216px and min-width 940px, so the bar has a designed narrow state.
- Panel corners reuse the radius list in the brief (26px and 17px), so the grid needs no separate treatment.

## 布局

**The bar shares the page grid** — The row spends its contrast in one place: the #38C6EC action, with the wordmark and the links held back on the ink colour. Under 216px the links collapse into a full-screen overlay. Labels are short enough to fit one line at 216px, and the active item is marked with weight rather than with a pill.

**The video is the background, not a panel** — The first screen is a single clip at 1920x1412, and everything else is arranged on top of it. Export at 1920x1412 or wider and the cover crop keeps working.

**The type carries the tone** — The type is Figtree at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. Substituting the face is possible, but the proportions have to survive the swap.

**A navigation bar that gets out of the way** — Design the collapsed state before adding a sixth link. The reference was captured at 1920x1412.


## 动效

**Timing kept in the brief** — Hover, press and focus all resolve in 1200ms, which is what makes the interface feel immediate. Every state change names a value, so the browser default is never used.

**One element arrives** — The entrance gives the page its arrival, and the composition is unchanged once it has run: each line rises out of an overflow-hidden window. Under reduced motion the element simply appears and the layout is unchanged.


## 可替换项

- Retime the entrance to your own 1200ms, but keep cubic-bezier(.22, 1.36, 1) as the curve, because the easing is what reads as this design.
- Load your own face beside Figtree and compare the headline at full width before committing to the swap.
- Set 1200ms to your own build speed and check that cubic-bezier(.22, 1.36, 1) still lands the copy before the media starts.
- Keep Figtree or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.

## 文案规则

**What holds up for AI & SaaS** — Where a template fills the fold with modules, this landing page uses navigation, the headline, the announcement badge, the stats row and the card grid and stops. The difference shows in 100vh sections and 26px corners: nothing is padded to fill space. It gives a SaaS reader the shortest honest route to the offer.

**How Quantum Lucid sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 100vh sections and 26px corners have to be re-cut, because the sequence is load-bearing rather than decorative. A SaaS reader gets the offer before the options.

**What to change first in Quantum Lucid** — Change the copy and the media first, the colour second, the layout last. The 1920x1412 frame and the Figtree scale are what hold the page together, so substitute around them rather than through them. Keep the frame and the scale; the subject is the part that should change.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Industry | AI & SaaS |
| Viewport | 1920x1412 · 1.36:1 |
| Duration | 6.7s loop |
| Brief | 20,249 characters |
| Archived | 2026-09-17 |
| Accent tone | shade #38C6EC |
| Typefaces | Figtree, Inter |
| Tech stack | Tailwind CSS, React, single HTML file |
| Transitions | 1200ms transitions, cubic-bezier(.22, 1.36, 1) easing and a 6.7s media loop |

## 复刻步骤

1. Set the brand first: product name, the #38C6EC accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #38C6EC with your own accent and re-check the contrast.
3. Type the product name and the #38C6EC accent before you touch the layout.
4. Set your brand first: product name, the #38C6EC accent and the headline that replaces the reference's.
5. Pin the reference measurements before you restyle anything: 100vh sections, 26px corners and 14px spacing steps.

---
来源：https://ottermind.ai/explore/website/quantum-lucid
原始 prompt：20249 字符
