# Sparkform

> Landing page reference for an agency or studio — fluid type, a stats row, #89CFF0 accent and a moving marquee.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：1460x1080 · 比例 1.3519 · 7.6s

## 概述

Sparkform is a working reference for an agency or studio: the landing page laid out, measured and ready to rebuild. The palette is bright orange #EC612C underneath, white #FFFFFF for the type and teal #89CFF0 carrying the accents, set in Inter. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is confined to 0.05s transitions and a looping video bed. Keep it open while you write: the 6,724-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on bright orange #EC612C and teal #89CFF0, set in Inter and measured against 120vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#EC612C` | composition |
| White | `#FFFFFF` | Headline |
| Muted green | `#90EE90` | lighter |
| Teal | `#89CFF0` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | UI face |
| Poppins | Weight not fixed in the brief | Secondary copy, captions and labels |
| Bamboly Demo | Weight not fixed in the brief | Fallback and supporting interface text |

## 视觉要点

- Media is specified at 1460x1080 and a 7.6s loop, so a replacement should match the crop and the loop length.
- The timing budget is state feedback rather than page choreography (0.05s), so a slower rebuild reads as a different design.
- Accent and ground are both named (teal #89CFF0 on bright orange #EC612C), so a brand swap moves one value.

## 布局

**A navigation bar that gets out of the way** — The row spends its contrast in one place: the #89CFF0 action, with the wordmark and the links held back on the ink colour. The links are set below the wordmark in size, and the #89CFF0 action is the only element in the bar with any weight. One action per bar.

**Numbers carried into the build** — Every measurement in the brief is a number you can measure back: 120vh sections, 12px spacing steps and 0.05s transitions. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**The loop is the backdrop** — One 7.6s asset carries the whole first screen, and the page has no second media element to keep in sync. Export at 1460x1080 or wider and the cover crop keeps working.

**Display size does the talking** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.


## 动效

**A loop, not a timeline** — The background clip runs 7.6s at 1460x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Because it is muted, the loop can run under the copy without competing for sound or focus.

**Hover where it means something** — The pointer work is small and specified: a sticky element that holds position while the content moves under it, applied to the elements that already look interactive. Because the states are simple, they port into any component system.


## 可替换项

- Swap the clip for your own. Export at 1460x1080 or wider, keep it muted, and make the 7.6s loop seamless so the cut is invisible.
- Draft the new copy to the 1460x1080 frame, then check that the entrance still lands on the same number of lines.
- Keep the supporting line as short as the reference's and measure the pair against the 1460x1080 crop.
- Move #89CFF0 to your own hue and leave #EC612C where it is; the distance between them is doing the hierarchy work.

## 文案规则

**Making the landing page yours** — The composition is the reusable part; the subject is yours. Swap the headline, keep the type scale (a fluid type scale), and re-test the #89CFF0 accent over your own media. If a new element does not help explain the offer or the next action, it belongs below the fold. Your accent has to survive the same contrast test as the reference accent.

**The order behind the landing page** — The trade-off is patience: the page withholds the detail a scannable grid would hand over immediately. What it buys is a first screen where navigation, the stats row and the feature list cannot be misread. A agency reader gets the offer before the options.

**What holds up for Agencies & Studios** — One screen means one decision for the reader, and that is the cost of this layout: everything else moves below the fold. The brief states 120vh sections, 12px spacing steps and 0.05s transitions so the lower sections keep the same rhythm. It gives a agency reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Sector | Agencies & Studios |
| Canvas size | 1460x1080 · 1.35:1 |
| Duration | 7.6s loop |
| Source text | 6,724 characters |
| Archived | 2026-09-17 |
| Accent | teal #89CFF0 |
| Type | Inter, Poppins, Bamboly Demo |
| Stack | Tailwind CSS, React, TypeScript |
| Motion spec | 0.05s transitions and a 7.6s media loop |

## 复刻步骤

1. Set the brand first: product name, the #89CFF0 accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #89CFF0 with your own accent and re-check the contrast.
3. Type the product name and the #89CFF0 accent before you touch the layout.
4. Set your brand first: product name, the #89CFF0 accent and the headline that replaces the reference's.
5. Pin the reference measurements before you restyle anything: 120vh sections, 12px spacing steps and 0.05s transitions.

---
来源：https://ottermind.ai/explore/website/sparkform
原始 prompt：6724 字符
