# 404 Planet

> 404 page reference for an AI or SaaS product — #01010C base, glass panels, 200ms transitions and #0D214E accent.

- 行业：AI & SaaS（ai-saas）
- 区块：404 page
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

404 Planet gives an AI or SaaS product a finished first screen and the numbers that produced it. The headline reads “This page seems to have”, and the rest of the 404 page is arranged around it. The palette runs deep blue #01010C underneath, muted teal #D1ECF4 for the type and blue #0D214E carrying the accents, and the type is Helvetica, Arial. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion is limited to 200ms transitions. Treat it as the brief for an AI or SaaS product 404 page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> “This page seems to have” — the whole 404 page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000001` | darkest |
| Muted teal | `#D1ECF4` | Headline |
| Near-black — lighter | `#01010C` | composition |
| Blue | `#0D214E` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | 80–260px | Headline and interface text — one stack for the whole page |

## 视觉要点

- Accent and ground are both named (blue #0D214E on deep blue #01010C), so a brand swap moves one value.
- Font roles are assigned rather than mixed here, and 80–260px is the range the whole scale works in.
- The accent is spent on blue #0D214E and the rest of the composition holds deep blue #01010C.

## 布局

**Navigation without a background** — The bar carries the wordmark, the section links and one #0D214E button, measured at type from 80px to 260px and 10px spacing steps so it never grows into a second header. The links are set below the wordmark in size, and the #0D214E action is the only element in the bar with any weight.

**A bar with nothing spare** — Design the collapsed state before adding a sixth link. The reference was captured at 640x468.

**Sizes fixed in the brief** — The list stays short (type from 80px to 260px, 10px spacing steps and 200ms transitions), which is why the whole system can be checked by hand. A rebuild that hits those numbers looks like the reference without further tuning.

**Numbers where the proof goes** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #0D214E or the ink colour rather than a coloured card. The figures carry the #0D214E accent while everything around them stays on the ink colour.


## 动效

**One duration for the controls** — The timings are short and consistent (200ms), so hover and press states read as one system instead of a set of separate effects. Short timings are why the page reads as authored; a slow default would undo the composition.

**Pointer states, nothing more** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Press states are specified as well as hover, so a tap gives the same confirmation as a click.


## 可替换项

- Replace the copy in the Helvetica, Arial stack first, then re-check the #0D214E accent against the media behind it.
- Swap in your own headline where “This page seems to have” sits and keep the line breaks, because the entrance animates per line.
- Move #0D214E to your own hue and leave #01010C where it is; the distance between them is doing the hierarchy work.
- Swap Helvetica, Arial for a face with the same x-height and cap height, then re-measure the headline block.

## 文案规则

**The numbers behind the 404 page** — Type is the first number: type from 80px to 260px and 10px spacing steps. The spacing follows from it, and everything else on the page is positioned against those two values. Nothing in this 404 page depends on a default.

**The timing behind the 404 page** — A preset animation pack would have been quicker to ship. The brief specifies 200ms transitions and hover and press states instead, which is why the page reads as authored rather than staged. Nothing animates for its own sake in this 404 page.

**How the 404 page reflows** — The brief describes what changes at each width (the navigation collapses into a mobile menu), which means the mobile version is a decision rather than a squeeze. Contrast is held on the #0D214E accent over the media, and the video is muted and inline. Nothing important is dropped at narrow widths.


## 规格

| 项 | 值 |
|---|---|
| Page part | 404 page |
| Industry | AI & SaaS |
| Format | 640x468 · 1.37:1 |
| Source text | 7,598 characters |
| Captured | 2026-09-17 |
| Accent | blue #0D214E |
| Type scale | Helvetica, Arial · 80–260px |
| Tech stack | Tailwind CSS, React, Lucide icons |
| Timing | 200ms transitions |

## 复刻步骤

1. Drop your product name in, then replace #0D214E with your own accent and re-check the contrast.
2. Set the brand first: product name, the #0D214E accent and a headline that replaces the reference's.
3. Type the product name and the #0D214E accent before you touch the layout.
4. Set your brand first: product name, the #0D214E accent and the headline that replaces the reference's.
5. Copy type from 80px to 260px, 10px spacing steps and 200ms transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/404-planet
原始 prompt：7598 字符
