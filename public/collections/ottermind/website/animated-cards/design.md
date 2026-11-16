# Animated Cards

> Features section reference for a fintech product — a dark stage, #FF9500 accent, a stats row and a 640x464 frame.

- 行业：Fintech（fintech）
- 区块：Features section
- 画布：640x464 · 比例 1.3793 · 0s

## 概述

Read Animated Cards as a features section spec: the values were written down before the page was built. Colour is limited to black #000000 underneath and bright orange #FF9500 carrying the accents, set in JetBrains Mono. Delivery is React and Tailwind CSS, captured at 640x464 so the frame is fixed before any code is written. Take it on when the features section needs a decided order before any new sections are added.

## 主标题文案

> Features section reference built on black #000000 and bright orange #FF9500, set in JetBrains Mono and measured against a fixed 12px display size.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | composition |
| Gray | `#808080` | lighter step |
| Bright red | `#FF3B30` | lighter |
| Bright orange | `#FF9500` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| JetBrains Mono | 12px | Numerals |

## 视觉要点

- The type is set in JetBrains Mono on a 12px scale, and the spacing follows the same steps.
- Accent and ground are both named (bright orange #FF9500 on black #000000), so a brand swap moves one value.
- The accent is spent on bright orange #FF9500 and the rest of the composition holds black #000000.

## 布局

**Sizes fixed in the brief** — Type and spacing are drawn from one list here: a fixed 12px display size and 16px spacing steps. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**Colour with a job description** — There is one accent (bright orange #FF9500) against black #000000, and the type does the rest of the work rather than a second colour. Everything else sits on black #000000, which is what keeps a saturated palette legible.

**Panels carry the middle** — The grid does the reading order for you: panels of equal weight, one idea each, set in JetBrains Mono at a small size so the structure stays visible. Every panel uses the same internal arrangement, so the grid can be scanned by shape.

**The brief names the steps** — Spacing is quoted the same way (a fixed 12px display size and 16px spacing steps), not as a scale that grows on its own.


## 动效

**Interaction kept local** — The pointer work is small and specified: a slider that pages through content on demand, applied to the elements that already look interactive. The states are named in the brief, so the page does not depend on a hover-effect library. A few reliable states beat a long list of effects.

**A canvas, not an image** — A 3D transform is doing the visual work on the 640x464 frame, with the type set over or beside it. The scene responds to the viewport instead of sitting behind it as an image. Keep the interface flat around it.


## 可替换项

- Keep JetBrains Mono or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Hold the features section to one screen on desktop; the composition is solved for a reader who never scrolls.
- Retint #FF9500 toward your palette but keep the step against #000000; flatten the two and the primary action stops reading.
- Load your own face beside JetBrains Mono and compare the headline at full width before committing to the swap.

## 文案规则

**The numbers behind the features section** — Specific numbers age: a value that suits 640x464 may not suit your frame. The brief states a fixed 12px display size and 16px spacing steps anyway, because a stated value is easier to change than an unstated one. Nothing in this features section depends on a default.

**What this features section gets right** — Animated Cards works because its hierarchy is decided rather than decorated. The brief sets a fixed 12px display size and 16px spacing steps, so new copy lands inside the frame instead of reopening it. It gives a fintech reader the shortest honest route to the offer.

**How Animated Cards sequences the first read** — Order is the design here. the stats row, the card grid, the feature list and the background clip are placed so the offer lands before the proof, and a fixed 12px display size and 16px spacing steps set the gap between them. A fintech reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Screen | Features section |
| Field | Fintech |
| Canvas | 640x464 · 1.38:1 |
| Brief | 36,212 characters |
| Date | 2026-09-17 |
| Key tone | bright orange #FF9500 |
| Faces | JetBrains Mono · 12px |
| Tech stack | Tailwind CSS, React, TypeScript |
| Animation | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 640x464 capture before you generate.
2. Set the brand first: product name, the #FF9500 accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #FF9500 accent and the headline that replaces the reference's.
4. Drop your product name in, then replace #FF9500 with your own accent and re-check the contrast.
5. Type the product name and the #FF9500 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/animated-cards
原始 prompt：36212 字符
