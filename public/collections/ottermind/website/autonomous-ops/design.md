# Autonomous Ops

> Landing page reference for an AI or SaaS product — Segoe UI, Arial, Helvetica, looping video, a stats row and cubic-bezier(.16,1.3,1) easing.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1022 · 比例 1.8787 · 9.7s

## 概述

Autonomous Ops gives an AI or SaaS product a finished first screen and the numbers that produced it. The headline reads “Falcon AI operations overview”, and the rest of the landing page is arranged around it. The palette runs #F0F0F0 underneath, #282828 for the type and orange #FF6900 carrying the accents, and the type is Segoe UI, Arial, Helvetica. It ships as one self-contained HTML file, so the whole landing page can be lifted into a project without a design handoff. The motion budget is 3000ms transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Start from the captured brief, then edit the landing page rather than rebuilding it from scratch.

## 主标题文案

> Landing page reference built around “Falcon AI operations overview”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Neutral | `#F0F0F0` | background |
| Shade | `#282828` | Headline |
| Neutral — lighter | `#FFFAF6` | panels |
| Orange | `#FF6900` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Segoe UI, Arial, Helvetica | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- Accent use is limited to orange #FF6900; everything else sits on #F0F0F0.
- The clip is one asset at 2028x1080 and a 9.7s loop, so the composition has a single media dependency.
- Corner treatment is specified in the brief: 1.59cqw and 1.28cqw 1.08cq.

## 布局

**A bar with nothing spare** — The row spends its contrast in one place: the #FF6900 action, with the wordmark and the links held back on the ink colour. The links are set below the wordmark in size, and the #FF6900 action is the only element in the bar with any weight. Design the collapsed state before adding a sixth link.

**One scale for type and frame** — The brief names the numbers: 100vh sections, a 3-column grid, 1.59cqw corners and 3000ms transitions. That is why the composition holds together, because there is no invented spacing step between the type and the frame. There is no invented intermediate value between the named ones; the measurement list is the whole system. Where the brief is silent, it is silent on purpose.

**The video is the background, not a panel** — The media is one 9.7s clip cropped to cover the 2028x1080 frame, so it never letterboxes at any width. The loop is short enough (9.7s) that the eye reads it as texture rather than as a timeline.

**Tracking tightens as it grows** — The faces are assigned roles rather than mixed: Segoe UI, Arial, Helvetica carries the display and the interface together. The interface text stays on one face, so the page never mixes two voices at the same size.


## 动效

**Short, named durations** — One duration covers the interactions (3000ms using cubic-bezier(.16,1.3,1)), which is what keeps hover and press reading as one system. Short timings are why the page reads as authored; a slow default would undo the composition.

**The scene is the visual** — The centrepiece is rendered live (a WebGL canvas) rather than shipped as an image, so the 2028x1080 composition reacts to the viewport instead of sitting behind it. The composition has to survive the render failing, because nothing else fills that space. Let the scene carry the depth alone.


## 可替换项

- Replace “Falcon AI operations overview” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Keep Segoe UI, Arial, Helvetica or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Set 3000ms to your own build speed and check that cubic-bezier(.16,1.3,1) still lands the copy before the media starts.
- Read the brief value by value against the 2028x1080 capture before you edit anything; the numbers are the part that is easiest to lose.

## 文案规则

**Making the landing page yours** — Start with the copy, not the colour. Rewrite “Falcon AI operations overview” as one sentence about your product, then set it in Segoe UI, Arial, Helvetica at the size the brief uses. Keep the media crop; it is doing as much work as the type.

**The order behind the landing page** — The page has a deliberate order. Navigation establishes the product and gives a returning visitor a familiar way around. The headline takes the display size, the supporting line explains the offer, and the orange #FF6900 accent marks the primary action, so the next step is never in question. Nothing else competes: there is no card grid before the first decision, which is what keeps the landing page from feeling heavy in SaaS work. A SaaS reader gets the offer before the options.

**The timing behind the landing page** — A preset animation pack would have been quicker to ship. The brief specifies 3000ms transitions, a 9.7s media loop and a masked line reveal instead, which is why the page reads as authored rather than staged. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Vertical | AI & SaaS |
| Viewport | 2028x1080 · 1.88:1 |
| Duration | 9.7s loop |
| Input brief | 18,222 characters |
| Capture date | 2026-09-17 |
| Accent tone | orange #FF6900 |
| Type | Segoe UI, Arial, Helvetica |
| Built with | single HTML file |
| Motion spec | 3000ms transitions, cubic-bezier(.16,1.3,1) easing and a 9.7s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2028x1080 capture before you generate.
2. Set the brand first: product name, the #FF6900 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #FF6900 with your own accent and re-check the contrast.
4. Type the product name and the #FF6900 accent before you touch the layout.
5. Set your brand first: product name, the #FF6900 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/autonomous-ops
原始 prompt：18222 字符
