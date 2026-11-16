# 3D Portfolio

> Portfolio reference for a 3D, game or entertainment brand — React and Tailwind CSS, #0C0C0C base, 200ms transitions and a stats row.

- 行业：3D & Games（3d-games）
- 区块：Portfolio
- 画布：1472x1080 · 比例 1.363 · 6.367s

## 概述

This is the portfolio page from 3D Portfolio, published with the brief that produced it rather than as a screenshot. “Jack — 3D Creator” is the line the layout is built to carry. The whole page is built on black #0C0C0C underneath and white #D7E2EA for the type. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is confined to 200ms transitions and a looping video bed. This reference is for a 3D, game or entertainment brand that wants the first screen settled before the build starts.

## 主标题文案

> Portfolio reference built around “Jack — 3D Creator”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#D7E2EA` | Headline |
| Near-black | `#0C0C0C` | composition |
| Muted blue | `#646973` | lighter step |
| Muted blue — lighter | `#BBCCD7` | Hover tint |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The clip is one asset at 1472x1080 and a 6.4s loop, so the composition has a single media dependency.
- Media is specified at 1472x1080 and a 6.4s loop, so a replacement should match the crop and the loop length.
- The timing budget is state feedback rather than page choreography (200ms), so a slower rebuild reads as a different design. Nothing sits between the type and the 1472x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Links before the action** — The bar overlays the portfolio page instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1472x1080 composition without a background of its own, so the media runs edge to edge underneath it. One action per bar.

**The spacing steps are quoted** — The layout is solved against fixed values (85vh sections, 160px spacing steps and 200ms transitions), which is what keeps the first screen composed at any width. Spacing is quoted in the same units as the type, so the two can be compared directly. Keep the named values when you port the page.

**Badge above the fold** — The badge is the only element allowed above the headline, which is what makes it read as an announcement instead of chrome. There is one announcement only, which is what makes the badge feel like news. One badge, one message.

**Numbers on the baseline** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the portfolio page from turning into a feature list. The label step is quoted in the brief, so it stays below the figures after a substitution.


## 动效

**Timings in milliseconds** — Motion is measured in milliseconds here: 200ms. That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. If the easing changes, the duration has to be revisited with it. The timings are part of the design, not a finishing pass.

**The canvas is the visual** — Runtime rendering is the design decision here (a 3D transform on the main element), and the layout is built to leave it room. The render is the last element to be ready, so the page has to work in the state before it loads.


## 可替换项

- Change the copy first, then the accent, then the media: the 1472x1080 frame was solved in that order and reversing it costs a re-layout.
- Hold the 1472x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Swap the clip for your own footage at 1472x1080 or wider, keep it muted, and match the 6.4s loop point.
- Replace the video with a still at 1472x1080 if the 6.4s loop is too heavy for the page you are shipping.

## 文案规则

**What to change first in 3D Portfolio** — One line, one font, one accent: those three substitutions change the design most. 85vh sections, 160px spacing steps and 200ms transitions are the values that should not move. The subject is the part that should change.

**The numbers behind the portfolio page** — Type is the first number: 85vh sections and 160px spacing steps. The spacing follows from it, and everything else on the page is positioned against those two values. Nothing in this portfolio page depends on a default.

**How the portfolio page reflows** — The cost of a fluid scale is less control over exact sizes. What you get is a display line that stays proportionate, which is why a clamp between 120px and 160px is in the brief. The mobile version is a decision, not a fallback.


## 规格

| 项 | 值 |
|---|---|
| Block | Portfolio |
| Sector | 3D & Games |
| Canvas size | 1472x1080 · 1.36:1 |
| Loop length | 6.4s loop |
| Prompt text | 13,877 characters |
| Capture date | 2026-09-17 |
| Tech stack | Tailwind CSS, React, TypeScript |
| Motion | 200ms transitions and a 6.4s media loop |

## 复刻步骤

1. Keep the measurements the brief spells out: 85vh sections, 160px spacing steps and 200ms transitions.
2. Copy 85vh sections, 160px spacing steps and 200ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 85vh sections, 160px spacing steps and 200ms transitions.
4. Pin the reference measurements before you restyle anything: 85vh sections, 160px spacing steps and 200ms transitions.
5. Copy the 200ms timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/3d-jack-portfolio-hero
原始 prompt：13877 字符
