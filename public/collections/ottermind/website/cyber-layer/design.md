# Cyber Layer

> Landing page reference for an AI or SaaS product — looping video, 1000ms transitions, a stats row and fluid type.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1460x1080 · 比例 1.3519 · 7s

## 概述

Cyber Layer is the landing page reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. The palette runs red #B01617 underneath and tint #E6E6E6 for the type, and the type is Space Grotesk. Delivery is one self-contained HTML file, captured at 1460x1080 so the frame is fixed before any code is written. The page keeps its motion to 1000ms transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Keep it open while you write: the 14,235-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1460x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Red | `#C81B1C` | saturated |
| Tint | `#E6E6E6` | Headline |
| Tint — darker | `#949494` | lighter step |
| Red — darker | `#B01617` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Space Grotesk | Weight not fixed in the brief | UI text |
| JetBrains Mono | Weight not fixed in the brief | Labels, numerals and technical detail |

## 视觉要点

- The navigation collapses at max-width 599px and max-width 1023px, so the bar has a designed narrow state.
- The clip is one asset at 1460x1080 and a 7s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1460x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Navigation without a background** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. Labels are short enough to fit one line at 599px, and the active item is marked with weight rather than with a pill.

**The video is the background, not a panel** — The media is doing atmospheric work rather than storytelling: one 7s loop at 1460x1080 behind everything else. The loop is short enough (7s) that the eye reads it as texture rather than as a timeline.

**Type does the styling** — The type is Space Grotesk at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. A face swap is safe as long as the sizes and weights stay where the brief put them. Do not add a size without a job.

**The scale is clamped, not stepped** — The top of the scale is fluid (a clamp between 25px and 82px) and the rest is fixed, so the frame stays composed as the viewport narrows. The mobile menu is part of the same brief, so the collapsed state is designed too.


## 动效

**Entrance as the signature** — The first frame is deliberately incomplete: each line rises out of an overflow-hidden window, with the rest of the composition already in place underneath it. The effect runs once per element rather than repeating while the page is open. The reference was captured at 1460x1080.

**A live canvas at the centre** — The visual is produced at runtime (a WebGL canvas) rather than loaded as a still, so the 1460x1080 frame has one fewer asset. The composition has to survive the render failing, because nothing else fills that space.


## 可替换项

- Write the replacement headline first, then confirm it still fits the 1460x1080 frame at the reference's type size.
- Keep Space Grotesk or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Keep 1460x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 1460x1080.

## 文案规则

**How Cyber Layer sequences the first read** — The trade-off is patience: the page withholds the detail a scannable grid would hand over immediately. What it buys is a first screen where navigation, the headline, the stats row, the background clip and the footer cannot be misread. A SaaS reader gets the offer before the options.

**Making the landing page yours** — If your brand runs a heavier palette, test it against the frame before you commit. red #B01617 carries the page, so a darker accent needs more contrast than the reference uses. Your accent has to survive the same contrast test as the reference accent.

**The numbers behind the landing page** — Take the landing page apart and the values still describe it: 100vh sections and 82px spacing steps for the frame and the rhythm below. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Category | AI & SaaS |
| Canvas | 1460x1080 · 1.35:1 |
| Loop length | 7s loop |
| Prompt | 14,235 characters |
| Archived | 2026-09-17 |
| Typefaces | Space Grotesk, JetBrains Mono |
| Tools | single HTML file |
| Motion | 1000ms transitions, cubic-bezier(.16,1.3,1) easing and a 7s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 82px spacing steps and 1000ms transitions.
2. Copy 100vh sections, 82px spacing steps and 1000ms transitions into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: 100vh sections, 82px spacing steps and 1000ms transitions.
4. Pin the reference measurements before you restyle anything: 100vh sections, 82px spacing steps and 1000ms transitions.
5. Add the entrance first at 1000ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/cyber-layer
原始 prompt：14235 字符
