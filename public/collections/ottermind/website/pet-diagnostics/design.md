# Pet Diagnostics

> Landing page reference for a health or wellbeing product — a dark stage, one self-contained HTML file, Inter and fluid type.

- 行业：Health（health）
- 区块：Landing page
- 画布：1920x888 · 比例 2.1622 · 7.066s

## 概述

Pet Diagnostics solves the landing page problem for a health or wellbeing product with a single captured brief. The colour scheme is #101010 underneath and cream #EEF0D0 for the type, and the page is set in Inter. Delivery is one self-contained HTML file, captured at 2336x1080 so the frame is fixed before any code is written. Motion is limited to a looping video bed. If you are briefing a health landing page, start from this composition and replace the subject.

## 主标题文案

> Landing page reference for a health or wellbeing product, captured at 2336x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Cream | `#EEF0D0` | Headline |
| Near-black | `#101010` | Body text |
| Near-black — darker | `#0D0D0D` | panel edges |
| Near-black — darker | `#0B0B0B` | darkest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 12–16px | Headline and interface text |
| Instrument Serif | 12–16px | Accent face |

## 视觉要点

- Panel corners reuse the radius list in the brief (999px), so the grid needs no separate treatment.
- The display line is Inter at the top of a 12–16px scale, with the interface text on the same face.
- The clip is one asset at 2336x1080 and a 7.1s loop, so the composition has a single media dependency.

## 布局

**Links before the action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. Labels are short enough to fit one line at 820px, and the active item is marked with weight rather than with a pill.

**A full-bleed clip behind the type** — The brief specifies the video at 2336x1080 with a loop of 7.1s, and every text element is placed against that frame. The loop is short enough (7.1s) that the eye reads it as texture rather than as a timeline.

**The scale is clamped, not stepped** — The top of the scale is fluid (a clamp between 12px and 16px) and the rest is fixed, so the frame stays composed as the viewport narrows. Controls stay large enough to tap and the copy keeps its reading order at every width.

**One row, no drawers** — Below 820px the links collapse instead of wrapping onto a second line.


## 动效

**A loop, not a timeline** — Ambient movement comes from the 7.1s 2336x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.

**Feedback on the controls** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. The states are named in the brief, so the page does not depend on a hover-effect library.


## 可替换项

- Draft the new copy to the 2336x1080 frame, then check that the entrance still lands on the same number of lines.
- Change the copy first, then the accent, then the media: the 2336x1080 frame was solved in that order and reversing it costs a re-layout.
- Hold the 2336x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 2336x1080 frame.

## 文案规则

**What to change first in Pet Diagnostics** — Where a theme hands you components, this brief hands you a composition: type from 12px to 16px, 92vh sections, 999px corners and 18px spacing steps and a media frame, with the subject left to you. The composition is the reusable part, and it survives a different brand.

**What this landing page gets right** — Compared with a template hero, the difference is what is missing. There is no card grid, no carousel and no second call to action: only navigation, the headline, the announcement badge, the stats row and the card grid, sized against type from 12px to 16px and 92vh sections. It gives a health reader the shortest honest route to the offer.

**The timing behind the landing page** — Every transition here has a number attached. That is why hover and press states and a 7.1s media loop can be ported value by value instead of re-tuned by feel. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Category | Health |
| Viewport | 2336x1080 · 2.16:1 |
| Loop | 7.1s loop |
| Source text | 18,711 characters |
| Captured | 2026-09-17 |
| Type | Inter, Instrument Serif · 12–16px |
| Stack | vanilla JS, single HTML file |
| Animation | a 7.1s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2336x1080 capture before you generate.
2. Keep the measurements the brief spells out: type from 12px to 16px, 92vh sections and 999px corners.
3. Copy type from 12px to 16px, 92vh sections and 999px corners into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: type from 12px to 16px, 92vh sections and 999px corners.
5. Check your build against the reference measurements: type from 12px to 16px, 92vh sections and 999px corners.

---
来源：https://ottermind.ai/explore/website/pet-diagnostics
原始 prompt：18711 字符
