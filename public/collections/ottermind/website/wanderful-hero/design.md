# Wanderful Hero

> Hero section reference for a travel brand — fluid type, Inter, React and Tailwind CSS and glass panels.

- 行业：Travel（travel）
- 区块：Hero section
- 画布：640x470 · 比例 1.3617 · 0s

## 概述

Before rebuilding a hero section for a travel brand, read Wanderful Hero: the composition and the specification behind it are both here. It leads with “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” and gives that line the frame rather than shrinking it into a card. The page is set in Inter, with the sizes fixed in the brief. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Treat it as the brief for a travel brand hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Primary | `#111111` | base surface |
| Support | `#FFFFFF` | panels |
| Accent | `#A78BFA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 15–17px | Control text |
| Dirtyline | 15–17px | Body face |
| Barlow | 15–17px | Fallback and supporting interface text |

## 视觉要点

- Font roles are assigned rather than mixed here, and 15–17px is the range the whole scale works in.
- The type is set in Inter on a 15–17px scale, and the spacing follows the same steps.
- The display line is Inter at the top of a 15–17px scale, with the interface text on the same face.

## 布局

**The bar shares the page grid** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. The bar sits over the 640x470 composition without a background of its own, so the media runs edge to edge underneath it.

**Measured against the viewport** — Sizes are quoted rather than inherited: type from 15px to 17px and 11px spacing steps. Swap the face or the copy and those relationships still hold. The smallest and largest values in that list set the range the composition works in. Where the brief is silent, it is silent on purpose.

**A bar with nothing spare** — One action per bar. The reference was captured at 640x470.

**The brief names the steps** — Spacing is quoted the same way (type from 15px to 17px and 11px spacing steps), not as a scale that grows on its own.


## 动效

**Scroll drives the composition** — Parallax is the page's single scroll behaviour, so the effect has a defined place in the composition. The static layout underneath is unchanged, which keeps the composition readable with the effect disabled.

**The controls are the interactive layer** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. Feedback is limited to the controls, so the composition stays still around them. Keep the pointer effects on the controls.


## 可替换项

- Swap in your own headline where “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” sits and keep the line breaks, because the entrance animates per line.
- Replace “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” with your own line and keep the word count, because the entrance is timed per line.
- Replace “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Rewrite “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure” to the same line count; the mask reveals each line in turn.

## 文案规则

**Making the hero section yours** — You do not need to rebuild the hero section to make it yours. Replace the headline and the media, keep the scale (type from 15px to 17px and 11px spacing steps), and the layout still reads as designed. A different brand can reuse the whole frame.

**How Wanderful Hero sequences the first read** — Attention is directed rather than left to chance. The page says it out loud: “Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure”. The sequence runs navigation, the headline, the stats row and the background clip, and each stop is sized against type from 15px to 17px and 11px spacing steps so nothing arrives out of order. A travel reader gets the offer before the options.

**Reading Wanderful Hero as a spec** — A screenshot tells you what the page looks like; the brief tells you why. type from 15px to 17px and 11px spacing steps close the gap between the two. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Industry | Travel |
| Canvas | 640x470 · 1.36:1 |
| Brief | 4,223 characters |
| Date | 2026-09-17 |
| Faces | Inter, Dirtyline, Barlow · 15–17px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion spec | state changes only |

## 复刻步骤

1. Copy type from 15px to 17px and 11px spacing steps into your own brief before you rewrite anything else.
2. Pin the reference measurements before you restyle anything: type from 15px to 17px and 11px spacing steps.
3. Keep the measurements the brief spells out: type from 15px to 17px and 11px spacing steps.
4. Check your build against the reference measurements: type from 15px to 17px and 11px spacing steps.
5. Build it in React and Tailwind CSS if that matches your stack, and keep the measurements either way.

---
来源：https://ottermind.ai/explore/website/wanderful-hero
原始 prompt：4223 字符
