# Rocket Pricing

> Pricing section reference for an AI or SaaS product — #0E0D0E base, a 640x472 frame, React and Tailwind CSS and a dark stage.

- 行业：AI & SaaS（ai-saas）
- 区块：Pricing section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Rocket Pricing solves the pricing section problem for an AI or SaaS product with a single captured brief. It leads with “Clear pricing plans that scale with you” and gives that line the frame rather than shrinking it into a card. The colour scheme is black #0E0D0E underneath, and the page is set in Inter. It ships as React and Tailwind CSS, so the whole pricing section can be lifted into a project without a design handoff. Borrow the structure and not the subject: the pricing section and its numbers move to your brand unchanged.

## 主标题文案

> Pricing section reference built around “Clear pricing plans that scale with you”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | darkest |
| Near-black — lighter | `#161616` | panel edges |
| Black | `#252525` | lightest |
| Near-black — lighter | `#0E0D0E` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The reference was captured at 640x472, and every value quoted on this page comes from the same brief.
- The page keeps to 4 values, so the statistics and the controls draw from one palette. The reference keeps to 4 values — one bed, one ink and one accent — and adds no decorative gradients.

## 布局

**The spacing steps are quoted** — The layout works on absolute values rather than ratios: 11px spacing steps. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. Port the values with the layout.

**The announcement pill** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. There is one announcement only, which is what makes the badge feel like news.

**The composition is the content** — Everything above the fold earns its place. The brief names the copy, the 640x472 frame and the type sizes, and leaves nothing decorative competing with them. The page is one composition at 640x472, which is why it holds together when the copy changes. The brief is the specification.

**Numbers carried into the build** — Spacing is quoted the same way (11px spacing steps), not as a scale that grows on its own.


## 动效

**Interaction is on the controls** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. A control that looks interactive behaves interactively, so there are no false affordances.

**Static by design** — This one is delivered as a still composition at 640x472, so the hierarchy has to work without motion, and it does. There is no animation library in the brief, which keeps the rebuild small.


## 可替换项

- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 640x472.
- Swap in your own headline where “Clear pricing plans that scale with you” sits and keep the line breaks, because the entrance animates per line.
- Load your own face beside Inter and compare the headline at full width before committing to the swap.
- Hold the pricing section to one screen on desktop; the brief never asks the reader to scroll past the fold.

## 文案规则

**What to change first in Rocket Pricing** — Change the copy and the media first, the colour second, the layout last. The 640x472 frame and the Inter scale are what hold the page together, so substitute around them rather than through them. Rewrite the copy and the media before you re-colour anything.

**Why the SaaS brief holds** — There is one promise on this page, and 11px spacing steps hold it in place. “Clear pricing plans that scale with you” is doing that work from the first frame. Nothing below the fold is asked to carry the offer as well. Rocket Pricing states the offer once and lets the composition repeat it rather than adding a second claim.

**The order behind the pricing section** — Read the first screen in one pass and the offer is already clear. the announcement badge, the stats row, the card grid and the feature list arrive in sequence, separated by 11px spacing steps rather than by decorative dividers. A SaaS reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page part | Pricing section |
| Vertical | AI & SaaS |
| Frame | 640x472 · 1.36:1 |
| Prompt | 8,841 characters |
| Captured | 2026-09-17 |
| Typefaces | Inter |
| Stack | Tailwind CSS, React, TypeScript |
| Motion | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 640x472 capture before you generate.
2. Keep the measurements the brief spells out: 11px spacing steps.
3. Check your build against the reference measurements: 11px spacing steps.
4. Copy 11px spacing steps into your own brief before you rewrite anything else.
5. Pin the reference measurements before you restyle anything: 11px spacing steps.

---
来源：https://ottermind.ai/explore/website/rocket-pricing
原始 prompt：8841 字符
