# Mostar Guide

> Landing page reference for a travel brand — vanilla JS, max-width 560px and max-width 640px breakpoints, looping video and #111411 base.

- 行业：Travel（travel）
- 区块：Landing page
- 画布：798x584 · 比例 1.3664 · 7.423s

## 概述

Mostar Guide gives a travel brand a finished first screen and the numbers that produced it. The headline reads “A cinematic three-screen scroll story for Mostar city”, and the rest of the landing page is arranged around it. Colour is limited to #111411 underneath, tint #FDF1E1 for the type and blue #7FB4D4 carrying the accents, set in Inter. The build is vanilla JS; every measurement in it is written down, which is what makes it reusable. Motion is limited to 640ms transitions, cubic-bezier(0.22, 1, 0.36, 1) and a looping video bed. Use it as the reference when you are building a travel brand landing page and want a finished composition instead of a starting point.

## 主标题文案

> Landing page reference built around “A cinematic three-screen scroll story for Mostar city”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Tint | `#FDF1E1` | Headline |
| Near-black | `#111411` | Body text |
| Near-black — darker | `#0B1110` | darkest |
| Blue | `#7FB4D4` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 12–24px | UI face |
| Satoshi | 12–24px | Text face |

## 视觉要点

- Transitions are specified at 640ms, short enough that the page never feels like it is waiting for an animation.
- Accent use is limited to blue #7FB4D4; everything else sits on #111411.
- The display line is Inter at the top of a 12–24px scale, with the interface text on the same face.

## 布局

**One row, no drawers** — The top row holds the wordmark, four to five links and a single action tinted #7FB4D4, sized to stay quiet against the rest of the page. Under 560px the links collapse into a full-screen overlay. Labels are short enough to fit one line at 560px, and the active item is marked with weight rather than with a pill. Test the bar over your own media before giving it a background.

**Full-frame video, no panel** — The 798x584 frame is filled by a single loop that plays behind the copy and asks for no controls. The loop is short enough (7.4s) that the eye reads it as texture rather than as a timeline.

**Top row: wordmark, links, one action** — Below 560px the links collapse instead of wrapping onto a second line.

**Measured against the viewport** — Sizes are quoted rather than inherited: type from 12px to 24px, 19vh sections, a 2-column grid and 24px corners. Swap the face or the copy and those relationships still hold. The smallest and largest values in that list set the range the composition works in. Keep the named values when you port the page.


## 动效

**Short, matched timings** — Transitions are specified at 640ms using cubic-bezier(0.22, 1, 0.36, 1), which is the timing the controls are held to. The values are short enough to read as feedback rather than as animation.

**Interaction is on the controls** — The interactive layer is deliberately small: a sticky element that holds position while the content moves under it and a slider that pages through content on demand. The states are drawn from the page's own palette rather than from a component default.


## 可替换项

- Replace “A cinematic three-screen scroll story for Mostar city” with your own line and keep the word count, because the entrance is timed per line.
- Swap the clip for your own. Export at 798x584 or wider, keep it muted, and make the 7.4s loop seamless so the cut is invisible.
- Change the copy first, then the accent, then the media: the 798x584 frame was solved in that order and reversing it costs a re-layout.
- Rewrite “A cinematic three-screen scroll story for Mostar city” to the same line count; the mask reveals each line in turn.

## 文案规则

**Making the landing page yours** — A straight substitution has a limit: if your product needs a different hierarchy, type from 12px to 24px and 19vh sections will fight it. Change the order first in that case, and the values second. The frame and the scale are what to leave alone.

**How the landing page reflows** — Type is clamped rather than stepped here (a clamp between 12px and 24px), so the display line does not jump between widths. The hierarchy is what survives the reflow.

**The order behind the landing page** — One screen, one action, and navigation, the announcement badge, the stats row, the card grid and the feature list between them. The brief fixes that order rather than leaving the first screen to a stack of sections. A travel reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Vertical | Travel |
| Canvas size | 798x584 · 1.37:1 |
| Loop | 7.4s loop |
| Prompt | 27,876 characters |
| Saved | 2026-09-17 |
| Key tone | blue #7FB4D4 |
| Type scale | Inter, Satoshi · 12–24px |
| Stack | vanilla JS |
| Motion spec | 640ms transitions, cubic-bezier(0.22, 1, 0.36, 1) easing and a 7.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 798x584 capture before you generate.
2. Drop your product name in, then replace #7FB4D4 with your own accent and re-check the contrast.
3. Set the brand first: product name, the #7FB4D4 accent and a headline that replaces the reference's.
4. Set your brand first: product name, the #7FB4D4 accent and the headline that replaces the reference's.
5. Type the product name and the #7FB4D4 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/mostar-guide
原始 prompt：27876 字符
