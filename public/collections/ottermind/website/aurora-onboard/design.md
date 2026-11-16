# Aurora Onboard

> Sign-in flow reference for a lifestyle brand — #000000 base, a 1850x1352 frame, a stats row and Inter.

- 行业：Lifestyle（lifestyle）
- 区块：Sign-in flow
- 画布：1850x1352 · 比例 1.3683 · 0s

## 概述

Aurora Onboard gives a lifestyle brand a finished first screen and the numbers that produced it. The palette runs black #000000 underneath and muted indigo #DBCDE9 for the type, and the type is Inter. Delivery is React and Tailwind CSS, captured at 1850x1352 so the frame is fixed before any code is written. Treat it as the brief for a lifestyle brand sign-in screen that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Sign-in flow reference for a lifestyle brand, captured at 1850x1352 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1A1A1A` | panel edges |
| Near-black — darker | `#000000` | composition |
| Muted indigo | `#DBCDE9` | Headline |
| Near-black — darker | `#000003` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 / 700 | Headline and interface text — one face for the whole page |

## 视觉要点

- The reference was captured at 1850x1352, and every value quoted on this page comes from the same brief.
- The reference keeps to 4 values — one bed, one ink and one accent — and adds no decorative gradients.
- The page keeps to 4 values, so the statistics and the controls draw from one palette.

## 布局

**Type sets the hierarchy** — The size steps and tracking in the brief are what give this its tone: Inter at a tight display size, then a clear drop to the supporting copy. The caption step is small enough to sit under a figure without changing the rhythm of the page.

**The form is the whole first screen** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. Fields are stacked in one column, so the tab order matches the reading order. Keep labels visible; do not use placeholder-only fields.

**A footer that carries the brand** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The wordmark gets its own block, which keeps a long link list readable.

**Copy first, decoration second** — Everything above the fold earns its place. The brief names the copy, the 1850x1352 frame and the type sizes, and leaves nothing decorative competing with them. The page is one composition at 1850x1352, which is why it holds together when the copy changes.


## 动效

**The controls are the interactive layer** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Because the states are simple, they port into any component system.

**Almost no motion** — The brief leaves animation out and lets the 1850x1352 layout carry the page, with hover and press states the only changes. There is no animation library in the brief, which keeps the rebuild small.


## 可替换项

- Hold the sign-in screen to one screen on desktop; the brief never asks the reader to scroll past the fold.
- Read the brief value by value against the 1850x1352 capture before you edit anything; the numbers are the part that is easiest to lose.
- Draft the new copy to the 1850x1352 frame, then check that the entrance still lands on the same number of lines.
- Keep Inter or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.

## 文案规则

**The argument this sign-in screen makes** — The trade-off is density: this sign-in screen says less on the first screen than a feature-led layout would. What it keeps is the reading order, and the headline, the stats row, the form, the background clip and the footer do the work a longer page would spread out. Aurora Onboard states the offer once and lets the composition repeat it rather than adding a second claim.

**How Aurora Onboard sequences the first read** — Set your own copy into this sign-in screen and the sequence still holds, because the elements are not interchangeable: the headline, the stats row, the form, the background clip and the footer each carry one job. A lifestyle reader gets the offer before the options.

**How the sign-in screen reflows** — Test this sign-in screen at 1850x1352 and then at phone width: the same order holds, with the scale is fluid rather than stepped. The hierarchy is what survives the reflow.


## 规格

| 项 | 值 |
|---|---|
| Page part | Sign-in flow |
| Industry | Lifestyle |
| Canvas size | 1850x1352 · 1.37:1 |
| Prompt | 4,770 characters |
| Captured | 2026-09-17 |
| Type scale | Inter |
| Built with | Tailwind CSS, React, TypeScript |
| Motion spec | state changes only |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the sign-in screen you do not need.
2. Open the reference in Studio with the prompt staged, and read the sign-in flow brief before you send it.
3. Stage the prompt in Studio and read it once against the 1850x1352 capture before you generate.
4. Pin the reference measurements before you restyle anything: The reference keeps to 4 values — one bed, one ink and one accent — and adds no decorative gradients..
5. Check your build against the reference measurements: The reference keeps to 4 values — one bed, one ink and one accent — and adds no decorative gradients..

---
来源：https://ottermind.ai/explore/website/aurora-onboard
原始 prompt：4770 字符
