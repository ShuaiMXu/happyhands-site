# Intelligent Performance

> Landing page reference for an AI or SaaS product — cubic-bezier(.16,1.3,1) easing, glass panels, one self-contained HTML file and a masked headline reveal.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1418 · 比例 1.354 · 3.475s

## 概述

Before rebuilding a landing page for an AI or SaaS product, read Intelligent Performance: the composition and the specification behind it are both here. It leads with “Built for Intelligent Performance” and gives that line the frame rather than shrinking it into a card. The palette runs neutral #ECECEB underneath, #222222 for the type and red #FF6796 carrying the accents, and the type is Inter. Delivery is one self-contained HTML file, captured at 1920x1418 so the frame is fixed before any code is written. The page keeps its motion to 08s transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Keep it open while you write: the 26,839-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on neutral #ECECEB and red #FF6796, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Neutral | `#ECECEB` | composition |
| Shade | `#222222` | Headline |
| Shade — lighter | `#4A4A4A` | darker step |
| Red | `#FF6796` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1920x1418 and a 3.5s loop, so a replacement should match the crop and the loop length.
- The accent is spent on red #FF6796 and the rest of the composition holds neutral #ECECEB.
- Transitions are specified at 08s, short enough that the page never feels like it is waiting for an animation.

## 布局

**A bar with nothing spare** — The row spends its contrast in one place: the #FF6796 action, with the wordmark and the links held back on the ink colour. Under 767px the links collapse into a full-screen overlay. Below 767px the links collapse instead of wrapping onto a second line.

**A full-bleed clip behind the type** — One 3.5s asset carries the whole first screen, and the page has no second media element to keep in sync. The loop is short enough (3.5s) that the eye reads it as texture rather than as a timeline.

**Panels, not paragraphs** — The grid is the structure: panels of the same size, set in Inter, arranged so the eye moves across rather than down. Panels are separated by spacing rather than by borders, which keeps the grid quiet. Keep one idea per panel.

**Fluid where it needs to be** — The top of the scale is fluid (a clamp between 16px and 14px) and the rest is fixed, so the frame stays composed as the viewport narrows. Controls stay large enough to tap and the copy keeps its reading order at every width.


## 动效

**The reveal is the memory point** — A masked line reveal carries the first screen. The composition is static underneath it, so the movement reads as the page assembling itself rather than as decoration. Under reduced motion the element simply appears and the layout is unchanged.

**Short, matched timings** — Motion is measured in milliseconds here: 08s on cubic-bezier(.16,1.3,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Easing is specified alongside the duration (08s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Change the copy before the colour: rewrite the Inter paragraphs first, then check #FF6796 against the media behind them.
- Read the brief value by value against the 1920x1418 capture before you edit anything; the numbers are the part that is easiest to lose.
- Swap #FF6796 for your brand colour and re-check it against #ECECEB, since the accent is the only place saturation is allowed.
- Move #FF6796 to your own hue and leave #ECECEB where it is; the distance between them is doing the hierarchy work.

## 文案规则

**How Intelligent Performance sequences the first read** — The trade-off is patience: the page withholds the detail a scannable grid would hand over immediately. What it buys is a first screen where navigation, the headline, the stats row, the card grid and the feature list cannot be misread. A SaaS reader gets the offer before the options.

**How the landing page reflows** — The narrow layout is designed, not inherited. the scale is fluid rather than stepped, the layout shifts at 767px and the section is held at 100vh at each width, so the hierarchy survives the reflow. Nothing important is dropped at narrow widths.

**The timing behind the landing page** — The brief ties every transition to a value (08s transitions, a 3.5s media loop and a masked line reveal). That is what keeps the page from feeling like a template with an animation preset dropped on top of it. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Sector | AI & SaaS |
| Format | 1920x1418 · 1.35:1 |
| Runtime | 3.5s loop |
| Source text | 26,839 characters |
| Archived | 2026-09-17 |
| Key tone | red #FF6796 |
| Type | Inter |
| Tools | vanilla JS, single HTML file |
| Motion | 08s transitions, cubic-bezier(.16,1.3,1) easing and a 3.5s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1418 capture before you generate.
2. Drop your product name in, then replace #FF6796 with your own accent and re-check the contrast.
3. Set the brand first: product name, the #FF6796 accent and a headline that replaces the reference's.
4. Type the product name and the #FF6796 accent before you touch the layout.
5. Set your brand first: product name, the #FF6796 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/intelligent-performance
原始 prompt：26839 字符
