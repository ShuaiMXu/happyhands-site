# Vectrus Energy

> Landing page reference for an industrial company — Helvetica, Arial, #C7CED7 base, fluid type and cubic-bezier(0.16,1,0.3,1) easing.

- 行业：Industrial（industrial）
- 区块：Landing page
- 画布：1468x1080 · 比例 1.3593 · 5.6s

## 概述

Vectrus Energy is a working reference for an industrial company: the landing page laid out, measured and ready to rebuild. The headline reads “Advancing resources for a cleaner future”, and the rest of the landing page is arranged around it. The colour scheme is gray #C7CED7 underneath and deep blue #1D3045 for the type, and the page is set in Helvetica, Arial. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion comes down to 200ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed. Treat it as the brief for an industrial company landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference built around “Advancing resources for a cleaner future”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep blue | `#1D3045` | Headline |
| Muted blue | `#7F8A96` | darker step |
| White | `#E4E8EE` | lightest |
| Gray | `#C7CED7` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- Media is specified at 1468x1080 and a 5.6s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1468x1080 and a 5.6s loop, so the composition has a single media dependency.
- The reference was captured at 1468x1080, and every value quoted on this page comes from the same brief.

## 布局

**One row, no drawers** — A slim bar sits over the landing page with the wordmark on the left and the links set in Helvetica, Arial, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1468x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Measured, not eyeballed** — Nothing in the layout is left to feel: the brief quotes 500vh sections, 40px spacing steps, 200ms transitions and cubic-bezier(0.16,1,0.3,1) easing and the build has to hit those values. A rebuild that hits those numbers looks like the reference without further tuning.

**Links before the action** — Give the wordmark no more room than its type needs. The reference was captured at 1468x1080.

**One scale for type and frame** — Spacing is quoted the same way (500vh sections, 40px spacing steps, 200ms transitions and cubic-bezier(0.16,1,0.3,1) easing), not as a scale that grows on its own.


## 动效

**A loop, not a timeline** — One 5.6s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution. Shoot or export at 1468x1080 or wider.

**Durations from the brief** — Motion is measured in milliseconds here: 200ms using cubic-bezier(0.16,1,0.3,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Focus states are timed with the same value as hover, so keyboard and pointer feedback match. The timings are part of the design, not a finishing pass.


## 可替换项

- Set your own headline in Helvetica, Arial at the size the reference uses, so the landing page keeps the same optical weight.
- Rewrite “Advancing resources for a cleaner future” to the same line count; the mask reveals each line in turn.
- Set 200ms to your own build speed and check that cubic-bezier(0.16,1,0.3,1) still lands the copy before the media starts.
- Retime the entrance to your own 200ms, but keep cubic-bezier(0.16,1,0.3,1) as the curve, because the easing is what reads as this design.

## 文案规则

**Making the landing page yours** — One line, one font, one accent: those three substitutions change the design most. 500vh sections, 40px spacing steps, 200ms transitions and cubic-bezier(0.16,1,0.3,1) easing are the values that should not move. Rewrite the display line before you touch the colour.

**The order behind the landing page** — The brief runs 8,300 characters and names the reading order explicitly: navigation, the headline, the stats row, the feature list and the background clip, with 500vh sections and 40px spacing steps between them. A industrial reader gets the offer before the options.

**How the landing page reflows** — Most responsive work stops at hiding elements. Here the layout changes shape: the scale is fluid rather than stepped, the section is held at 500vh and the navigation collapses into a mobile menu, and nothing important is dropped to make the fold fit. Nothing important is dropped at narrow widths.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Industry | Industrial |
| Frame | 1468x1080 · 1.36:1 |
| Loop | 5.6s loop |
| Input brief | 8,300 characters |
| Archived | 2026-09-17 |
| Typefaces | Helvetica, Arial |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion spec | 200ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 5.6s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 500vh sections, 40px spacing steps and 200ms transitions.
2. Copy 500vh sections, 40px spacing steps and 200ms transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 500vh sections, 40px spacing steps and 200ms transitions.
4. Keep the measurements the brief spells out: 500vh sections, 40px spacing steps and 200ms transitions.
5. Add the entrance first at 200ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/vectrus-energy
原始 prompt：8300 字符
