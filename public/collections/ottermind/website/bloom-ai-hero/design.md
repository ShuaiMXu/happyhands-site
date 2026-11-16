# Bloom AI

> Hero section reference for an AI or SaaS product — a stats row, #030E1A base, Poppins and #2E5648 accent.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x564 · 比例 1.4184 · 4.9s

## 概述

Bloom AI is the hero section reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. The page's own headline reads “Innovating the spirit of bloom AI”, and the composition is built around those exact words. The palette runs deep blue #030E1A underneath, muted green #AAD9C3 for the type and green #2E5648 carrying the accents, and the type is Poppins. The build is React and Lucide icons; every measurement in it is written down, which is what makes it reusable. Treat it as the brief for an AI or SaaS product hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference built around “Innovating the spirit of bloom AI”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#02060F` | darkest |
| Muted green | `#AAD9C3` | Headline |
| Near-black — lighter | `#030E1A` | composition |
| Green | `#2E5648` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Poppins | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Accent use is limited to green #2E5648; everything else sits on deep blue #030E1A.
- Accent and ground are both named (green #2E5648 on deep blue #030E1A), so a brand swap moves one value.
- The accent is spent on green #2E5648 and the rest of the composition holds deep blue #030E1A.

## 布局

**Links before the action** — The bar is the quietest part of the composition: wordmark, a short row of links and one #2E5648 action, all held at the smallest type step in the brief. The links are set below the wordmark in size, and the #2E5648 action is the only element in the bar with any weight.

**Every measurement is written down** — The layout is solved against fixed values (50px spacing steps), which is what keeps the first screen composed at any width. The smallest and largest values in that list set the range the composition works in.

**Content split into panels** — The grid does the reading order for you: panels of equal weight, one idea each, set in Poppins at a small size so the structure stays visible. Panel order is the reading order, so nothing depends on position cues.

**Structure in one screen** — The whole composition fits one screen and is delivered as React and Lucide icons, with the copy, the media and the controls named in the brief. The page is one composition at 800x564, which is why it holds together when the copy changes.


## 动效

**A small interactive surface** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Press states are specified as well as hover, so a tap gives the same confirmation as a click. Keep the pointer effects on the controls.

**Static by design** — The brief leaves animation out and lets the 800x564 layout carry the page, with hover and press states the only changes. The composition holds still, so the hierarchy has to carry the page and it does. No scroll timelines needed.


## 可替换项

- Set your own headline in Poppins at the size the reference uses, so the hero section keeps the same optical weight.
- Write the replacement headline first, then confirm it still fits the 800x564 frame at the reference's type size.
- Load your own face beside Poppins and compare the headline at full width before committing to the swap.
- Hold the 800x564 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.

## 文案规则

**What an AI or SaaS product gains here** — The trade-off is density: this hero section says less on the first screen than a feature-led layout would. What it keeps is the reading order, and navigation, the announcement badge, the stats row, the card grid and the background clip do the work a longer page would spread out. Bloom AI states the offer once and lets the composition repeat it rather than adding a second claim.

**The numbers behind the hero section** — The hero section is measured, not eyeballed. 50px spacing steps come from the brief, and the layout is arranged to those steps rather than nudged into place. Nothing in this hero section depends on a default.

**Making the hero section yours** — Re-skinning the palette first is the usual mistake. It changes the mood without touching the composition, and 50px spacing steps still carry the layout; do the copy and media first and the palette last. Rewrite the copy and the media before you re-colour anything.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Category | AI & SaaS |
| Canvas size | 800x564 · 1.42:1 |
| Source text | 3,900 characters |
| Archived | 2026-09-17 |
| Key colour | green #2E5648 |
| Faces | Poppins |
| Stack | React, Lucide icons |
| Motion spec | state changes only |

## 复刻步骤

1. Load the prompt in Studio and check that it names React and Lucide icons before you press send.
2. Stage the prompt in Studio and read it once against the 800x564 capture before you generate.
3. Drop your product name in, then replace #2E5648 with your own accent and re-check the contrast.
4. Set the brand first: product name, the #2E5648 accent and a headline that replaces the reference's.
5. Set your brand first: product name, the #2E5648 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/bloom-ai-hero
原始 prompt：3900 字符
