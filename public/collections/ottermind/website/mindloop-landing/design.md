# Mindloop Landing

> Landing page reference for an AI or SaaS product — #010713 base, Inter, a word-by-word headline and glass panels.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：454x800 · 比例 0.5675 · 17.22s

## 概述

This is the landing page from Mindloop Landing, published with the brief that produced it rather than as a screenshot. The palette runs deep blue #010713 underneath, and the type is Inter. Delivery is React and Tailwind CSS, captured at 455x800 so the frame is fixed before any code is written. Take it on when the landing page needs a decided order before any new sections are added.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 455x800 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | darkest |
| Gray | `#9CA494` | lightest |
| Near-black — lighter | `#00050F` | panel edges |
| Near-black — lighter | `#010713` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Interface |
| Instrument Serif | Weight not fixed in the brief | Emphasis |

## 视觉要点

- The reference was captured at 455x800, and every value quoted on this page comes from the same brief.
- Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**Links collapse at one width** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. The bar sits over the 455x800 composition without a background of its own, so the media runs edge to edge underneath it. If your own page has more sections, group them rather than widening the bar.

**Values you can check** — The list stays short (100px spacing steps), which is why the whole system can be checked by hand. Because the values are fixed, a substitution changes the look without changing the rhythm.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The wordmark gets its own block, which keeps a long link list readable. Keep the accent for a single action.

**Top row, one action** — The row is sized from its own type rather than from a fixed header height. Copy this pattern when you need navigation that survives a loud first screen.


## 动效

**Pointer states, nothing more** — Interaction is local to each control here (hover states on the buttons and links rather than on every card and a sticky element that holds position while the content moves under it), so nothing on the page moves as a side effect. Press states are specified as well as hover, so a tap gives the same confirmation as a click.

**Almost no motion** — This one is delivered as a still composition at 455x800, so the hierarchy has to work without motion, and it does. Only the elements that respond to the pointer move.


## 可替换项

- Change the copy first, then the accent, then the media: the 455x800 frame was solved in that order and reversing it costs a re-layout.
- Keep 455x800 for the media and re-crop your own asset into it rather than resizing the frame.
- Write the replacement headline first, then confirm it still fits the 455x800 frame at the reference's type size.
- Keep Inter or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.

## 文案规则

**What to change first in Mindloop Landing** — When you drop your own media in, keep the crop and the layer order. The media is a still at 455x800. That placement is what keeps the copy legible. The composition is the reusable part, and it survives a different brand.

**How Mindloop Landing sequences the first read** — If your page currently leads with features, this is the order to copy: navigation, the headline, the stats row, the card grid and the background clip in front, the supporting detail after, and 100px spacing steps setting the distance. A SaaS reader gets the offer before the options.

**Why this composition works for SaaS** — A tint layer over the media would have been the easy fix. The brief leaves it off. The copy still holds because 100px spacing steps keep the frame calm. Mindloop Landing states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Vertical | AI & SaaS |
| Canvas size | 455x800 · 0.57:1 |
| Prompt text | 7,242 characters |
| Saved | 2026-09-17 |
| Type scale | Inter, Instrument Serif |
| Stack | Tailwind CSS, React, TypeScript |
| Motion | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 455x800 capture before you generate.
2. Copy 100px spacing steps into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 100px spacing steps.
4. Check your build against the reference measurements: 100px spacing steps.
5. Keep the measurements the brief spells out: 100px spacing steps.

---
来源：https://ottermind.ai/explore/website/mindloop-landing
原始 prompt：7242 字符
