# AI Runtime

> Landing page reference for an AI or SaaS product — fluid type, Inter, a stats row and 0.85s transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1472x1080 · 比例 1.363 · 6.867s

## 概述

This is the landing page from AI Runtime, published with the brief that produced it rather than as a screenshot. Colour is limited to neutral #28282A underneath and tint #C8C8C8 for the type, set in Inter. The build is React; every measurement in it is written down, which is what makes it reusable. Motion comes down to 0.85s transitions, cubic-bezier(0.22, 1, 0.36, 1) and a looping video bed. Keep it open while you write: the 9,593-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1472x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Neutral | `#28282A` | composition |
| Tint | `#8E8E8E` | Secondary |
| Neutral — lighter | `#2E2E2E` | panel edges |
| Tint — lighter | `#C8C8C8` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | UI text |
| Geist | Weight not fixed in the brief | Secondary copy, captions and labels |
| BubbledotICG-FinePos | Weight not fixed in the brief | Fallback and supporting interface text |

## 视觉要点

- The timing budget is state feedback rather than page choreography (0.85s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.85s, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 0.85s, which is the value to keep when the palette changes.

## 布局

**The bar shares the page grid** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1472x1080 composition without a background of its own, so the media runs edge to edge underneath it. Test the bar over your own media before giving it a background.

**Measured, not eyeballed** — Sizes are quoted rather than inherited: 100vh sections, 28px spacing steps, 0.85s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing. Swap the face or the copy and those relationships still hold. The smallest and largest values in that list set the range the composition works in.

**A stat strip, not a table** — The figures are set as type rather than in a card: Inter at the display size with labels one step below. Figures are set at one weight, so the row does not rank its own statistics. Cut a figure before you shrink the label.

**Top row, one action** — Keep the row to one line. The reference was captured at 1472x1080.


## 动效

**A quieter branch is included** — The brief includes a prefers-reduced-motion branch, so the entrance and the loop can be switched off without losing the layout. Copy that branch straight into your build. With reduced motion on, the composition holds its final state rather than snapping mid-transition.

**The loop does the ambient work** — Ambient movement comes from the 6.9s 1472x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. The clip is muted and inline, so the first frame is available without an interaction. Shoot or export at 1472x1080 or wider.


## 可替换项

- Replace the video with a still at 1472x1080 if the 6.9s loop is too heavy for the page you are shipping.
- Set 0.85s to your own build speed and check that cubic-bezier(0.22, 1, 0.36, 1) still lands the copy before the media starts.
- Keep 1472x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Swap the clip for your own. Export at 1472x1080 or wider, keep it muted, and make the 6.9s loop seamless so the cut is invisible.

## 文案规则

**How the landing page reflows** — Responsive here means the scale changes, not the hierarchy: the scale is fluid rather than stepped, the section is held at 100vh and the navigation collapses into a mobile menu. Text stays above the fold, controls stay large enough to tap, and reduced motion is honoured. The order is the last thing to change.

**The order behind the landing page** — Compare the top of this page with a typical SaaS landing screen. Both carry a headline and an action; here navigation, the headline, the announcement badge, the stats row and the client row sit in a fixed order instead of competing at the same weight. A SaaS reader gets the offer before the options.

**What an AI or SaaS product gains here** — Where a template fills the fold with modules, this landing page uses navigation, the headline, the announcement badge, the stats row and the client row and stops. The difference shows in 100vh sections and 28px spacing steps: nothing is padded to fill space. AI Runtime states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Field | AI & SaaS |
| Frame | 1472x1080 · 1.36:1 |
| Loop | 6.9s loop |
| Brief | 9,593 characters |
| Date | 2026-09-17 |
| Fonts | Inter, Geist, BubbledotICG-FinePos |
| Stack | React |
| Animation | 0.85s transitions, cubic-bezier(0.22, 1, 0.36, 1) easing and a 6.9s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 28px spacing steps and 0.85s transitions.
2. Keep the measurements the brief spells out: 100vh sections, 28px spacing steps and 0.85s transitions.
3. Copy 100vh sections, 28px spacing steps and 0.85s transitions into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 100vh sections, 28px spacing steps and 0.85s transitions.
5. Rebuild the motion last and keep the 0.85s entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/ai-runtime
原始 prompt：9593 字符
