# Cordex

> Landing page reference for an industrial company — a stats row, #0A0A0B base, one self-contained HTML file and 0.7s transitions.

- 行业：Industrial（industrial）
- 区块：Landing page
- 画布：1920x1416 · 比例 1.3559 · 6.75s

## 概述

Read Cordex as a landing page spec: the values were written down before the page was built. It leads with “We protect transport safer across all industries” and gives that line the frame rather than shrinking it into a card. Colour is limited to black #0A0A0B underneath, #F7F7F8 for the type and red #E23B32 carrying the accents, set in Inter. Delivery is one self-contained HTML file, captured at 1920x1416 so the frame is fixed before any code is written. The motion budget is 0.7s transitions and a looping video bed. It is most useful when the Industrial landing page has to survive a copy change without a redesign.

## 主标题文案

> “We protect transport safer across all industries” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Tint | `#F7F7F8` | Headline |
| Red | `#E23B32` | accent |
| Near-black | `#0A0A0B` | composition |
| Near-black — lighter | `#0D0D0E` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 12–21px | Headline and interface text — one face for the whole page |

## 视觉要点

- The navigation collapses at max-width 480px and max-width 900px, so the bar has a designed narrow state.
- The clip is one asset at 1920x1416 and a 6.8s loop, so the composition has a single media dependency.
- The type is set in Inter on a 12–21px scale, and the spacing follows the same steps.

## 布局

**The bar shares the page grid** — Links sit on one line at a single size, and the #E23B32 action closes the row on the right so the eye finishes where the navigation ends. Labels are short enough to fit one line at 480px, and the active item is marked with weight rather than with a pill. One action per bar.

**A full-bleed clip behind the type** — A 6.8s clip at 1920x1416 does the atmospheric work; the brief fixes its crop and leaves the type untouched on top of it. Export at 1920x1416 or wider and the cover crop keeps working.

**The grid sets the order** — The grid does the reading order for you: panels of equal weight, one idea each, set in Inter at a small size so the structure stays visible. Panel heights are driven by the copy, so a longer line does not break the alignment of the row. Keep one idea per panel.

**Fluid where it needs to be** — The brief uses a clamp between 12px and 21px for the headline, which is what keeps a long line from breaking awkwardly. Because the scale is clamped, the display line never jumps between breakpoints.


## 动效

**Ambient motion without a scroll library** — Ambient movement comes from the 6.8s 1920x1416 loop rather than from scroll effects, which keeps the page calm and the type readable. The loop is cropped to cover, which means the composition does not depend on a particular frame size.

**State changes, timed** — The controls resolve in 0.7s, fast enough that the page answers as it is touched rather than after it. Easing is specified alongside the duration (0.7s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Swap the clip for your own footage at 1920x1416 or wider, keep it muted, and match the 6.8s loop point.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1920x1416 frame.
- Write the replacement headline first, then confirm it still fits the 1920x1416 frame at the reference's type size.
- Swap the clip for your own. Export at 1920x1416 or wider, keep it muted, and make the 6.8s loop seamless so the cut is invisible.

## 文案规则

**The order behind the landing page** — Attention is routed rather than scattered. “We protect transport safer across all industries” is doing that work from the first frame. The eye lands on the display line first, then the supporting copy, then the action. Proof, where it appears, stays a strip or a row rather than a wall of testimonials. That sequence is the design. A industrial reader gets the offer before the options.

**The numbers behind the landing page** — The brief is a specification, not a mood board. It fixes type from 12px to 21px, 100vh sections, 14px spacing steps, 0.7s transitions and a 480px breakpoint, and it names the media at 1920x1416 and a 6.8s loop. That level of detail is why the design survives a rebuild: change the copy and the relationships still hold. Nothing in this landing page depends on a default.

**How the landing page reflows** — A designed narrow layout takes more decisions than a squeeze. The brief pays for them: the type is clamped between 12px and 21px, the layout shifts at 480px and the section is held at 100vh, stated rather than discovered at build time. The narrow layout is a decision rather than a squeeze, and the hierarchy survives it.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Field | Industrial |
| Canvas | 1920x1416 · 1.36:1 |
| Duration | 6.8s loop |
| Prompt | 29,696 characters |
| Capture date | 2026-09-17 |
| Key tone | red #E23B32 |
| Faces | Inter · 12–21px |
| Stack | vanilla JS, single HTML file |
| Motion | 0.7s transitions and a 6.8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1416 capture before you generate.
2. Set the brand first: product name, the #E23B32 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #E23B32 with your own accent and re-check the contrast.
4. Set your brand first: product name, the #E23B32 accent and the headline that replaces the reference's.
5. Type the product name and the #E23B32 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/cordex
原始 prompt：29696 字符
