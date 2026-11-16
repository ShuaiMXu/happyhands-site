# Aethera Studio

> Hero section reference for an agency or studio — React and Tailwind CSS, #FFFFFF base, a 800x582 frame and 100ms transitions.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：800x582 · 比例 1.3746 · 8.19s

## 概述

Aethera Studio is a working reference for an agency or studio: the hero section laid out, measured and ready to rebuild. The page's own headline reads “Beyond silence, we build the eternal”, and the composition is built around those exact words. The colour scheme is white #FFFFFF underneath and black #000000 for the type, and the page is set in Instrument Serif. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. The motion budget is 100ms transitions. Keep it open while you write: the 3,169-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “Beyond silence, we build the eternal”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | Headline |
| Gray | `#6F6F6F` | surface |
| White | `#FFFFFF` | composition |
| Deep lime | `#232B13` | darker step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display |
| Inter | Weight not fixed in the brief | Body face |

## 视觉要点

- The reference was captured at 800x582, and every value quoted on this page comes from the same brief.
- Transitions are specified at 100ms, which is the value to keep when the palette changes.

## 布局

**Navigation without a background** — The bar is one row of text and one action, measured at 75px spacing steps and 100ms transitions so it reads as a strip rather than as a band. The bar sits over the 800x582 composition without a background of its own, so the media runs edge to edge underneath it. Give the wordmark no more room than its type needs.

**One family, two roles** — The display line is set in Instrument Serif at a size the brief fixes, which makes the headline a composition element rather than a paragraph. The face is paired with fixed sizes, which is what keeps the display line and the interface text related. Check the scale in greyscale.

**A bar with nothing spare** — The bar overlays the hero section instead of pushing it down, so the composition keeps the full height of the first screen. Copy this pattern when you need navigation that survives a loud first screen.

**The sizes are in the brief, not in a scale** — The brief states its sizes at capture (75px spacing steps and 100ms transitions), so a rebuild can be verified instead of approximated. A rebuild that hits those numbers looks like the reference without further tuning.


## 动效

**The whole animation budget** — One duration covers the interactions (100ms), which is what keeps hover and press reading as one system. Nothing waits on a scroll position, so the page responds the moment you touch it.

**A small interactive surface** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. A control that looks interactive behaves interactively, so there are no false affordances. Check the states on a touch device.


## 可替换项

- Retime the entrance to your own 100ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Rewrite “Beyond silence, we build the eternal” to the same line count; the mask reveals each line in turn.
- Keep the supporting line as short as the reference's and measure the pair against the 800x582 crop.
- Set your own headline in Instrument Serif at the size the reference uses, so the hero section keeps the same optical weight.

## 文案规则

**What to change first in Aethera Studio** — Compare this with starting from a blank page. Here the frame (800x582) and 75px spacing steps and 100ms transitions are already decided, so the work is substitution rather than composition. Keep the frame and the scale; the subject is the part that should change.

**What this hero section gets right** — One screen means one decision for the reader, and that is the cost of this layout: everything else moves below the fold. The brief states 75px spacing steps and 100ms transitions so the lower sections keep the same rhythm. Aethera Studio states the offer once and lets the composition repeat it rather than adding a second claim.

**How the hero section reflows** — The desktop composition is solved against 800x582, and the narrow layout is designed rather than inherited: the scale is fluid rather than stepped. Motion has a reduced-motion branch, and the media carries a poster frame so the page still communicates when autoplay is unavailable. The scale changes with the viewport; the sequence does not.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Category | Agencies & Studios |
| Viewport | 800x582 · 1.37:1 |
| Prompt text | 3,169 characters |
| Date | 2026-09-17 |
| Faces | Instrument Serif, Inter |
| Stack | Tailwind CSS, React, TypeScript |
| Animation | 100ms transitions |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: 75px spacing steps and 100ms transitions.
2. Keep the measurements the brief spells out: 75px spacing steps and 100ms transitions.
3. Copy 75px spacing steps and 100ms transitions into your own brief before you rewrite anything else.
4. Check your build against the reference measurements: 75px spacing steps and 100ms transitions.
5. Add the entrance first at 100ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/aethera-hero
原始 prompt：3169 字符
