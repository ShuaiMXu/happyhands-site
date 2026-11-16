# Wellness Hero

> Hero section reference for a health or wellbeing product — a 640x468 frame, a stats row, glass panels and Inter.

- 行业：Health（health）
- 区块：Hero section
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

Read Wellness Hero as a hero section spec: the values were written down before the page was built. Typography is Inter, and the brief fixes the sizes rather than leaving them to a scale. It ships as React and Tailwind CSS, so the whole hero section can be lifted into a project without a design handoff. Use it as the reference when you are building a health or wellbeing product hero section and want a finished composition instead of a starting point.

## 主标题文案

> Hero section reference for a health or wellbeing product, captured at 640x468 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Primary | `#111111` | base surface |
| Support | `#FFFFFF` | panels |
| Accent | `#A78BFA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 | Headline and interface text — one face for the whole page |

## 视觉要点

- The reference keeps to 3 values — one bed, one ink and one accent — and adds no decorative gradients.
- The page keeps to 3 values, so the statistics and the controls draw from one palette.
- The reference was captured at 640x468, and every value quoted on this page comes from the same brief.

## 布局

**Top row: wordmark, links, one action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. The bar sits over the 640x468 composition without a background of its own, so the media runs edge to edge underneath it. Test the bar over your own media before giving it a background.

**Links before the action** — Hover and focus states are specified for every link, which is what stops a thin bar from feeling inert. Copy this pattern when you need navigation that survives a loud first screen.

**Type does the styling** — The type is Inter at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. Tracking is set per size, so the display line and the caption do not share one letter-spacing value.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition. One badge, one message.


## 动效

**Almost no motion** — There is no scroll library here: the 640x468 composition holds still and only the elements that respond to you move. Motion is treated as feedback rather than as decoration.

**Motion that stays out of the way** — Only the elements that respond to the pointer move.


## 可替换项

- Hold the hero section to one screen on desktop; the composition is solved for a reader who never scrolls.
- Keep the supporting line as short as the reference's and measure the pair against the 640x468 crop.
- Keep the 640x468 frame when you swap the content, because the composition was solved against that ratio.
- Write the replacement headline first, then confirm it still fits the 640x468 frame at the reference's type size.

## 文案规则

**The numbers behind the hero section** — Every relationship on this page is a value you can check: a 640x468 frame. That is what makes Wellness Hero rebuildable rather than merely reproducible. Nothing in this hero section depends on a default.

**The order behind the hero section** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: navigation, the headline, the announcement badge, the stats row and the background clip are a sequence, and a 640x468 frame only work in that order. A health reader gets the offer before the options.

**What to change first in Wellness Hero** — Compare this with starting from a blank page. Here the frame (640x468) and a 640x468 frame are already decided, so the work is substitution rather than composition. Keep the media crop; it is doing as much work as the type.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Vertical | Health |
| Frame | 640x468 · 1.37:1 |
| Prompt text | 4,719 characters |
| Capture date | 2026-09-17 |
| Faces | Inter |
| Stack | Tailwind CSS, React, Lucide icons |
| Timing | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 640x468 capture before you generate.
2. Copy The page keeps to 3 values, so the statistics and the controls draw from one palette. into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: The page keeps to 3 values, so the statistics and the controls draw from one palette..
4. Keep the measurements the brief spells out: The page keeps to 3 values, so the statistics and the controls draw from one palette..
5. Check your build against the reference measurements: The page keeps to 3 values, so the statistics and the controls draw from one palette..

---
来源：https://ottermind.ai/explore/website/wellness-hero
原始 prompt：4719 字符
