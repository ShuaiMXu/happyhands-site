# Innovation

> Landing page reference for an agency or studio — #020D14 base, React and Tailwind CSS, a stats row and 500ms transitions.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：446x800 · 比例 0.5575 · 8.26s

## 概述

Innovation is a agency landing page built from one written brief, and this page documents that brief. The palette is deep blue #020D14 underneath, set in Instrument Serif. Delivery is React and Tailwind CSS, captured at 447x800 so the frame is fixed before any code is written. The brief spends its motion budget on 500ms transitions. It is most useful when the Agencies & Studios landing page has to survive a copy change without a redesign.

## 主标题文案

> Landing page reference for an agency or studio, captured at 447x800 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | darkest |
| Gray | `#8B8E82` | lightest |
| Near-black — lighter | `#000001` | panel edges |
| Near-black — lighter | `#020D14` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display face |

## 视觉要点

- The reference was captured at 447x800, and every value quoted on this page comes from the same brief.
- Transitions are specified at 500ms, short enough that the page never feels like it is waiting for an animation. Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**Navigation held to one row** — A short run of links and a single action sit over the landing page, held at 20px spacing steps and 500ms transitions so the bar never competes with the composition behind it. The bar sits over the 447x800 composition without a background of its own, so the media runs edge to edge underneath it.

**The scale is the styling** — Typography is Instrument Serif, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. A face swap is safe as long as the sizes and weights stay where the brief put them.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The wordmark gets its own block, which keeps a long link list readable. Give the wordmark its own column.

**One field, one action** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. Labels sit above their inputs and the supporting copy stays above the first field.


## 动效

**State changes, timed** — State changes are specified at 500ms, so the feedback on the controls is a designed value rather than a browser default. If the easing changes, the duration has to be revisited with it. Time the feedback exactly.

**Interaction is on the controls** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card), so the page feels responsive without turning every element into a target. Interactive targets are large enough to tap and the pointer treatment is consistent across them. Check the states on a touch device.


## 可替换项

- Keep the landing page inside one viewport and move whatever does not fit into the section below it.
- Hold the 447x800 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 447x800.
- Load your own face beside Instrument Serif and compare the headline at full width before committing to the swap.

## 文案规则

**How Innovation sequences the first read** — Compare the top of this page with a typical agency landing screen. Both carry a headline and an action; here navigation, the headline, the announcement badge, the stats row and the card grid sit in a fixed order instead of competing at the same weight. A agency reader gets the offer before the options.

**Why this composition works for agency** — Count the decisions in this landing page and they trace back to one document: 8,996 characters naming the frame at 447x800, the type and the rhythm. It gives a agency reader the shortest honest route to the offer.

**What moves in Innovation** — Where a template animates every section on entry, this one animates 500ms transitions and hover and press states and then holds. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Category | Agencies & Studios |
| Format | 447x800 · 0.56:1 |
| Input brief | 8,996 characters |
| Saved | 2026-09-17 |
| Faces | Instrument Serif |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | 500ms transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 447x800 capture before you generate.
2. Copy 20px spacing steps and 500ms transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 20px spacing steps and 500ms transitions.
4. Check your build against the reference measurements: 20px spacing steps and 500ms transitions.
5. Keep the measurements the brief spells out: 20px spacing steps and 500ms transitions.

---
来源：https://ottermind.ai/explore/website/innovation-landing
原始 prompt：8996 字符
