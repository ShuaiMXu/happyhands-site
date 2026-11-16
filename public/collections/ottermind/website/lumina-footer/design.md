# Lumina

> Footer reference for an education or community brand — React and Tailwind CSS, Helvetica, #2F4458 base and a stats row.

- 行业：Education & Community（education）
- 区块：Footer
- 画布：800x584 · 比例 1.3699 · 5.67s

## 概述

Lumina keeps its decision trail: the brief that produced this footer runs 5,113 characters. The page's own headline reads “Lumina provides premium clarity on global events and cosmic wonders - shared with all for free”, and the composition is built around those exact words. The colour scheme is blue #2F4458 underneath and gray #CFC2B7 for the type, and the page is set in Helvetica. It ships as React and Tailwind CSS, so the whole footer can be lifted into a project without a design handoff. This reference is for an education or community brand that wants the first screen settled before the build starts.

## 主标题文案

> “Lumina provides premium clarity on global events and cosmic wonders - shared with all for free” — the whole footer is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Black | `#2C3130` | darkest |
| Gray | `#CFC2B7` | Headline |
| Blue | `#23384F` | saturated |
| Blue — lighter | `#2F4458` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The reference was captured at 800x585, and every value quoted on this page comes from the same brief.
- Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**Every measurement is written down** — The layout works on absolute values rather than ratios: 115vh sections and 10px spacing steps. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**The type carries the tone** — The faces are assigned roles rather than mixed: Helvetica carries the display and the interface together. Weights are specified per role, so the hierarchy does not depend on guesswork at build time.

**A footer that carries the brand** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Type sizes step down from the column headings to the links, so the hierarchy survives a dense footer. Give the wordmark its own column.

**The composition is the content** — The composition is complete at 800x585: the copy, the media and the controls are all named in the brief. The page is one composition at 800x585, which is why it holds together when the copy changes.


## 动效

**Feedback on the controls** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. Interactive targets are large enough to tap and the pointer treatment is consistent across them.

**Static by design** — The brief leaves animation out and lets the 800x585 layout carry the page, with hover and press states the only changes. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Replace “Lumina provides premium clarity on global events and cosmic wonders - shared with all for free” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Change the copy first, then the accent, then the media: the 800x585 frame was solved in that order and reversing it costs a re-layout.
- Keep Helvetica or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Write the replacement headline first, then confirm it still fits the 800x585 frame at the reference's type size.

## 文案规则

**The numbers behind the footer** — The footer is measured, not eyeballed. 115vh sections and 10px spacing steps come from the brief, and the layout is arranged to those steps rather than nudged into place. Nothing in this footer depends on a default.

**How Lumina sequences the first read** — The brief runs 5,113 characters and names the reading order explicitly: the stats row, the background clip and the footer, with 115vh sections and 10px spacing steps between them. A education reader gets the offer before the options.

**What holds up for Education & Community** — When you brief a education footer, the hard part is deciding what the first screen refuses to say. Lumina answers that in advance: one display line, the stats row, the background clip and the footer behind it. Lumina states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Page section | Footer |
| Category | Education & Community |
| Format | 800x585 · 1.37:1 |
| Prompt text | 5,113 characters |
| Capture date | 2026-09-17 |
| Fonts | Helvetica |
| Tools | Tailwind CSS, React, TypeScript |
| Transitions | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x585 capture before you generate.
2. Keep the measurements the brief spells out: 115vh sections and 10px spacing steps.
3. Copy 115vh sections and 10px spacing steps into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 115vh sections and 10px spacing steps.
5. Check your build against the reference measurements: 115vh sections and 10px spacing steps.

---
来源：https://ottermind.ai/explore/website/lumina-footer
原始 prompt：5113 字符
