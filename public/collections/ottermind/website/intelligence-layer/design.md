# Intelligence Layer

> Landing page reference for an AI or SaaS product — a logo row, 0.9s transitions, a moving marquee and #050505 base.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1462x1080 · 比例 1.3537 · 6.566s

## 概述

Intelligence Layer shows one way to build the landing page for an AI or SaaS product, and publishes the instructions that produced it. The colour scheme is near-black #050505 underneath and #FAFAFA for the type, and the page is set in Manrope. Delivery is one self-contained HTML file, captured at 1462x1080 so the frame is fixed before any code is written. Motion is confined to 0.9s transitions, cubic-bezier(.22, 1.36, 1) and a looping video bed. Keep it open while you write: the 11,825-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1462x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#050505` | composition |
| Tint | `#8B8A8A` | lighter step |
| Tint — lighter | `#FAFAFA` | Headline |
| Tint — lighter | `#A7A6A6` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Manrope | Weight not fixed in the brief | UI face |
| Inter | Weight not fixed in the brief | Body copy |

## 视觉要点

- The timing budget is state feedback rather than page choreography (0.9s), so a slower rebuild reads as a different design.
- Media is specified at 1462x1080 and a 6.6s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1462x1080 and a 6.6s loop, so the composition has a single media dependency.

## 布局

**Top row, one action** — Navigation is a single row with no second level under it. The bar sits over the 1462x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Values you can check** — The brief names the numbers: 100vh sections, 25px spacing steps, 0.9s transitions and cubic-bezier(.22, 1.36, 1) easing. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The list is short enough that a reviewer can check it element by element.

**The scale is the styling** — Typography is Manrope, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. Tracking is set per size, so the display line and the caption do not share one letter-spacing value. One face, clear roles.

**The nav is deliberately thin** — The bar is a handful of elements, so it rebuilds without a component library. The reference was captured at 1462x1080.


## 动效

**The canvas is the visual** — The first screen is built by the browser rather than shipped as an image: a WebGL canvas. The render carries its own colour, so the palette around it is kept quiet. Keep the interface flat around it.

**Timings in milliseconds** — The controls resolve in 0.9s, fast enough that the page answers as it is touched rather than after it. Easing is specified alongside the duration (0.9s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Retime the entrance to your own 0.9s, but keep cubic-bezier(.22, 1.36, 1) as the curve, because the easing is what reads as this design.
- Swap the clip for your own footage at 1462x1080 or wider, keep it muted, and match the 6.6s loop point.
- Swap Manrope for a face with the same x-height and cap height, then re-measure the headline block.
- Set 0.9s to your own build speed and check that cubic-bezier(.22, 1.36, 1) still lands the copy before the media starts.

## 文案规则

**How the landing page reflows** — A designed narrow layout takes more decisions than a squeeze. The brief pays for them: the scale is fluid rather than stepped, the section is held at 100vh and the motion has a reduced-motion branch, stated rather than discovered at build time. The hierarchy is what survives the reflow.

**Reading Intelligence Layer as a spec** — Type is the first number: 100vh sections and 25px spacing steps. The spacing follows from it, and everything else on the page is positioned against those two values. Nothing in this landing page depends on a default.

**Making the landing page yours** — Re-skinning the palette first is the usual mistake. It changes the mood without touching the composition, and 100vh sections and 25px spacing steps still carry the layout; do the copy and media first and the palette last. Rewrite the copy and the media before you re-colour anything.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Sector | AI & SaaS |
| Canvas size | 1462x1080 · 1.35:1 |
| Duration | 6.6s loop |
| Prompt | 11,825 characters |
| Date | 2026-09-17 |
| Faces | Manrope, Inter |
| Stack | vanilla JS, single HTML file |
| Transitions | 0.9s transitions, cubic-bezier(.22, 1.36, 1) easing and a 6.6s media loop |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: 100vh sections, 25px spacing steps and 0.9s transitions.
2. Check your build against the reference measurements: 100vh sections, 25px spacing steps and 0.9s transitions.
3. Copy 100vh sections, 25px spacing steps and 0.9s transitions into your own brief before you rewrite anything else.
4. Keep the measurements the brief spells out: 100vh sections, 25px spacing steps and 0.9s transitions.
5. Rebuild the motion last and keep the 0.9s entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/intelligence-layer
原始 prompt：11825 字符
