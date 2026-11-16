# Skybridge 404

> 404 page reference for an ecommerce brand — a stats row, Geist Mono, looping video and max-width 640px breakpoints.

- 行业：Ecommerce（ecommerce）
- 区块：404 page
- 画布：1456x1080 · 比例 1.3481 · 4.666s

## 概述

Skybridge 404 shows one way to build the 404 page for an ecommerce brand, and publishes the instructions that produced it. The palette runs blue #1165B4 underneath and white #E7E1D8 for the type, and the type is Geist Mono. It ships as React and Tailwind CSS, so the whole 404 page can be lifted into a project without a design handoff. The motion budget is a looping video bed. Borrow the structure and not the subject: the 404 page and its numbers move to your brand unchanged.

## 主标题文案

> 404 page reference for an ecommerce brand, captured at 1456x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep teal | `#17282E` | darkest |
| White | `#E7E1D8` | Headline |
| Blue | `#1165B4` | composition |
| Deep teal — lighter | `#253740` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist Mono | Weight not fixed in the brief | Technical |

## 视觉要点

- Media is specified at 1456x1080 and a 4.7s loop, so a replacement should match the crop and the loop length.
- The layout shifts at max-width 640px, so the narrow composition is designed rather than inherited.
- Nothing sits between the type and the 1456x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Top row, one action** — The bar overlays the 404 page instead of pushing it down, so the composition keeps the full height of the first screen. Labels are short enough to fit one line at 640px, and the active item is marked with weight rather than with a pill. One action per bar.

**One clip does the work** — Video sits on the bottom layer of the 1456x1080 composition, with the type arranged above it and nothing in between. The loop is short enough (4.7s) that the eye reads it as texture rather than as a timeline.

**Display size does the talking** — Type is the styling system here: Geist Mono at the display size, the same face across the interface, and no second accent colour doing the work. Line height follows the size steps rather than a single global value.

**Navigation without a background** — Below 640px the links collapse instead of wrapping onto a second line.


## 动效

**Pointers only where they help** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. Feedback is limited to the controls, so the composition stays still around them.

**The canvas holds the first screen** — The visual is produced at runtime (a WebGL canvas) rather than loaded as a still, so the 1456x1080 frame has one fewer asset. Because it is a render rather than a still, the focal element holds up at any size.


## 可替换项

- Load your own face beside Geist Mono and compare the headline at full width before committing to the swap.
- Hold the 1456x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Keep the 1456x1080 frame when you swap the content, because the composition was solved against that ratio.
- Hold the 404 page to one screen on desktop; the brief never asks the reader to scroll past the fold.

## 文案规则

**How the 404 page reflows** — Type is clamped rather than stepped here (a clamp between 14px and 40px), so the display line does not jump between widths. The narrow layout is a decision rather than a squeeze, and the hierarchy survives it.

**The timing behind the 404 page** — Ambitious motion usually costs the first screen its legibility. This brief keeps hover and press states, a 4.7s media loop and a live canvas short enough that the type never has to wait. Nothing animates for its own sake in this 404 page.

**The order behind the 404 page** — Where a marketing page stacks proof below the fold and hopes, this 404 page puts navigation, the stats row and the background clip in front of the reader and holds the rest back. A ecommerce reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Screen | 404 page |
| Industry | Ecommerce |
| Format | 1456x1080 · 1.35:1 |
| Loop length | 4.7s loop |
| Brief | 7,104 characters |
| Saved | 2026-09-17 |
| Typefaces | Geist Mono |
| Tech stack | Tailwind CSS, React, Vite |
| Timing | a 4.7s media loop |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the 404 page you do not need.
2. Open the reference in Studio with the prompt staged, and read the 404 page brief before you send it.
3. Stage the prompt in Studio and read it once against the 1456x1080 capture before you generate.
4. Pin the reference measurements before you restyle anything: 100vh sections, 40px spacing steps and a 640px breakpoint.
5. Copy 100vh sections, 40px spacing steps and a 640px breakpoint into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/skybridge-404
原始 prompt：7104 字符
