# Wellness Companion

> Landing page reference for a health or wellbeing product — 0.5s transitions, Helvetica, Arial, #1A1A1E base and a stats row.

- 行业：Health（health）
- 区块：Landing page
- 画布：1440x1080 · 比例 1.3333 · 5.9s

## 概述

Wellness Companion is the landing page reference for a health or wellbeing product, and the brief behind it is a full build spec rather than a mood board. The palette runs deep blue #1A1A1E underneath, and the type is Helvetica, Arial. Delivery is React and Tailwind CSS, captured at 1440x1080 so the frame is fixed before any code is written. Motion is 0.5s transitions, cubic-bezier(0.22, 1, 0.36, 1) and a looping video bed, kept quiet enough that the copy still leads. Use it as the reference when you are building a health or wellbeing product landing page and want a finished composition instead of a starting point.

## 主标题文案

> Landing page reference for a health or wellbeing product, captured at 1440x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted blue | `#8A9AAA` | lightest |
| Near-black | `#1A1A1E` | composition |
| Tint | `#232328` | supporting |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- The clip is one asset at 1440x1080 and a 5.9s loop, so the composition has a single media dependency.
- The timing budget is state feedback rather than page choreography (0.5s), so a slower rebuild reads as a different design.
- Nothing sits between the type and the 1440x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Measured against the viewport** — The brief fixes 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. Spacing is quoted in the same units as the type, so the two can be compared directly. Measure before you adjust.

**A full-bleed clip behind the type** — The background is a single 5.9s loop at 1440x1080, cropped to cover and left un-tinted. Everything else floats above it on a higher layer. A poster frame at 1440x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**One idea per panel** — The grid does the reading order for you: panels of equal weight, one idea each, set in Helvetica, Arial at a small size so the structure stays visible. The grid collapses to one column without changing the panel order.

**Measured, not eyeballed** — Spacing is quoted the same way (12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing), not as a scale that grows on its own.


## 动效

**A loop, not a timeline** — One 5.9s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. Because it is muted, the loop can run under the copy without competing for sound or focus.

**State changes, timed** — The animation budget is small and explicit: 0.5s using cubic-bezier(0.22, 1, 0.36, 1), applied to state changes rather than to entrances. Easing is specified alongside the duration (0.5s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Hold the 1440x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Replace the video with a still at 1440x1080 if the 5.9s loop is too heavy for the page you are shipping.
- Retime the entrance to taste. 0.5s with cubic-bezier(0.22, 1, 0.36, 1) is what the reference uses.
- Draft the new copy to the 1440x1080 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**What moves in Wellness Companion** — Compare the motion here with a scroll-driven page. Both move; this one moves where the brief says (0.5s transitions and a 5.9s media loop), so the copy stays in front. Nothing animates for its own sake in this landing page.

**The numbers behind the landing page** — You cannot fix a composition by eye when two people are rebuilding it. The brief removes the argument: 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing, stated once. Nothing in this landing page depends on a default.

**Why this composition works for health** — A stock hero and this landing page use the same parts. Here they are ordered by the headline, the announcement badge, the stats row, the card grid and the countdown and measured with 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing, so the screen reads as a sequence rather than a container. It gives a health reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Industry | Health |
| Canvas size | 1440x1080 · 1.33:1 |
| Loop length | 5.9s loop |
| Prompt text | 4,095 characters |
| Capture date | 2026-09-17 |
| Fonts | Helvetica, Arial |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 0.5s transitions, cubic-bezier(0.22, 1, 0.36, 1) easing and a 5.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1440x1080 capture before you generate.
2. Pin the reference measurements before you restyle anything: 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
3. Keep the measurements the brief spells out: 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
4. Check your build against the reference measurements: 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
5. Copy 12px spacing steps, 0.5s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/wellness-companion
原始 prompt：4095 字符
