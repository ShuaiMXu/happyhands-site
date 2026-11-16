# Mind AI

> Landing page reference for a health or wellbeing product — looping video, max-width 520px and max-width 899px breakpoints, fluid type and a stats row.

- 行业：Health（health）
- 区块：Landing page
- 画布：1920x1414 · 比例 1.3579 · 5.025s

## 概述

Mind AI is the landing page reference for a health or wellbeing product, and the brief behind it is a full build spec rather than a mood board. The palette is #F6EAF2 underneath, #000000 for the type and indigo #A069C9 carrying the accents, set in Questrial. Delivery is one self-contained HTML file, captured at 1920x1414 so the frame is fixed before any code is written. The page keeps its motion to 4.042s transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Treat it as the brief for a health or wellbeing product landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference built on #F6EAF2 and indigo #A069C9, set in Questrial and measured against type from 14px to 28px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Neutral | `#F6EAF2` | background |
| Near-black | `#000000` | Headline |
| White | `#E8D8DC` | panel edges |
| Indigo | `#A069C9` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Questrial | 14–28px | Headline and interface text — one face for the whole page |

## 视觉要点

- The display line is Questrial at the top of a 14–28px scale, with the interface text on the same face.
- The type is set in Questrial on a 14–28px scale, and the spacing follows the same steps.
- The timing budget is state feedback rather than page choreography (4.042s), so a slower rebuild reads as a different design.

## 布局

**Top row, one action** — Links sit on one line at a single size, and the #A069C9 action closes the row on the right so the eye finishes where the navigation ends. Labels are short enough to fit one line at 520px, and the active item is marked with weight rather than with a pill.

**Media without an overlay** — The 1920x1414 video runs 5s on a loop behind the copy, muted and inline, with no tint layer between the two. The loop is short enough (5s) that the eye reads it as texture rather than as a timeline. Export at 1920x1414 or wider to keep the crop honest.

**The scale is clamped, not stepped** — Type is sized with a clamp between 14px and 28px rather than fixed steps, so the display line stays proportionate between breakpoints instead of jumping. The mobile menu is part of the same brief, so the collapsed state is designed too.

**A list, not a card wall** — Features are set as a list in Questrial rather than a grid of cards, which keeps the page dense and quick to scan on a narrow screen. Items share one size and one marker, which keeps a long list scannable. Keep markers consistent.


## 动效

**The loop does the ambient work** — Ambient movement is one 5s clip at 1920x1414, looping quietly behind the copy rather than reacting to the pointer. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.

**A live scene on the first screen** — Depth comes from the render rather than from illustration: a WebGL canvas. The render is the last element to be ready, so the page has to work in the state before it loads. The reference was captured at 1920x1414.


## 可替换项

- Replace #A069C9 last, after the copy is final, and test it against #F6EAF2 at the smallest text size on the page.
- Move #A069C9 to your own hue and leave #F6EAF2 where it is; the distance between them is doing the hierarchy work.
- Load your own face beside Questrial and compare the headline at full width before committing to the swap.
- Swap the clip for your own footage at 1920x1414 or wider, keep it muted, and match the 5s loop point.

## 文案规则

**How the landing page reflows** — Where a template collapses to a single column and hopes, this brief states what happens (the type is clamped between 14px and 28px, the layout shifts at 520px and the section is held at 100vh) and keeps the order intact. The scale changes with the viewport; the sequence does not.

**Why the health brief holds** — When you brief a health landing page, the hard part is deciding what the first screen refuses to say. Mind AI answers that in advance: one display line, navigation, the headline, the announcement badge, the stats row and the feature list behind it. It gives a health reader the shortest honest route to the offer.

**How Mind AI sequences the first read** — Set your own copy into this landing page and the sequence still holds, because the elements are not interchangeable: navigation, the headline, the announcement badge, the stats row and the feature list each carry one job. A health reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Field | Health |
| Frame | 1920x1414 · 1.36:1 |
| Loop length | 5s loop |
| Prompt | 37,004 characters |
| Saved | 2026-09-17 |
| Key colour | indigo #A069C9 |
| Fonts | Questrial · 14–28px |
| Tech stack | vanilla JS, single HTML file |
| Motion | 4.042s transitions, cubic-bezier(.16,1.3,1) easing and a 5s media loop |

## 复刻步骤

1. Drop your product name in, then replace #A069C9 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #A069C9 accent and a headline that replaces the reference's.
3. Type the product name and the #A069C9 accent before you touch the layout.
4. Set your brand first: product name, the #A069C9 accent and the headline that replaces the reference's.
5. Keep the measurements the brief spells out: type from 14px to 28px, 100vh sections and 16.0rem corners.

---
来源：https://ottermind.ai/explore/website/mind-ai
原始 prompt：37004 字符
