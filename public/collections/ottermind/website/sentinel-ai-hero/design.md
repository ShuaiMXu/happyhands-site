# Sentinel AI

> Hero section reference for an AI or SaaS product — fluid type, a 800x594 frame, #8EB992 accent and 0.7s transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x594 · 比例 1.3468 · 7.35s

## 概述

Sentinel AI solves the hero section problem for an AI or SaaS product with a single captured brief. The headline reads “We implement security correctly”, and the rest of the hero section is arranged around it. The palette is black #000000 underneath and muted green #8EB992 carrying the accents, set in Sora. Delivery is React and Tailwind CSS, captured at 800x594 so the frame is fixed before any code is written. The page keeps its motion to 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1). Keep it open while you write: the 5,940-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built on black #000000 and muted green #8EB992, set in Sora and measured against 20px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | composition |
| Muted green | `#8EB992` | accent |
| Near-black — lighter | `#000101` | panel edges |
| Near-black — lighter | `#080C0D` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Sora | 300 / 400 / 500 / 600 / 700 | Interface |
| fontFamily | 300 / 400 / 500 / 600 / 700 | Text face |

## 视觉要点

- Accent and ground are both named (muted green #8EB992 on black #000000), so a brand swap moves one value.
- The accent is spent on muted green #8EB992 and the rest of the composition holds black #000000.
- Accent use is limited to muted green #8EB992; everything else sits on black #000000.

## 布局

**The nav is deliberately thin** — Links sit on one line at a single size, and the #8EB992 action closes the row on the right so the eye finishes where the navigation ends. The links are set below the wordmark in size, and the #8EB992 action is the only element in the bar with any weight.

**Measured, not eyeballed** — The layout works on absolute values rather than ratios: 20px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. The smallest and largest values in that list set the range the composition works in. Verify a rebuild against the same numbers.

**Two faces, clear jobs** — The display line is set in Sora at a size the brief fixes, which makes the headline a composition element rather than a paragraph. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.

**The composition is the content** — The composition is complete at 800x594: the copy, the media and the controls are all named in the brief. The page is one composition at 800x594, which is why it holds together when the copy changes.


## 动效

**Short, named durations** — One duration covers the interactions (0.7s using cubic-bezier(0.16, 1, 0.3, 1)), which is what keeps hover and press reading as one system. Easing is specified alongside the duration (0.7s), so a rebuild cannot quietly substitute a different feel.

**Hover where it means something** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. Because the states are simple, they port into any component system. Keep the interactive layer small.


## 可替换项

- Move #8EB992 to your own hue and leave #000000 where it is; the distance between them is doing the hierarchy work.
- Replace “We implement security correctly” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Read the brief value by value against the 800x594 capture before you edit anything; the numbers are the part that is easiest to lose.
- Set 0.7s to your own build speed and check that cubic-bezier(0.16, 1, 0.3, 1) still lands the copy before the media starts.

## 文案规则

**The numbers behind the hero section** — When a rebuild drifts, the spacing goes first. Sentinel AI avoids that by publishing 20px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing with the composition. Nothing in this hero section depends on a default.

**The order behind the hero section** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: navigation, the stats row and the feature list are a sequence, and 20px spacing steps and 0.7s transitions only work in that order. A SaaS reader gets the offer before the options.

**The argument this hero section makes** — Most SaaS pages fail by adding: more sections, more gradients, more claims. Sentinel AI goes the other way. “We implement security correctly” is doing that work from the first frame. The composition stays on black #000000 with muted green #8EB992 for actions, which is enough to look deliberate. It gives a SaaS reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Category | AI & SaaS |
| Canvas | 800x594 · 1.35:1 |
| Prompt text | 5,940 characters |
| Saved | 2026-09-17 |
| Accent | muted green #8EB992 |
| Fonts | Sora, fontFamily |
| Built with | Tailwind CSS, React, TypeScript |
| Motion spec | 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x594 capture before you generate.
2. Drop your product name in, then replace #8EB992 with your own accent and re-check the contrast.
3. Set the brand first: product name, the #8EB992 accent and a headline that replaces the reference's.
4. Type the product name and the #8EB992 accent before you touch the layout.
5. Set your brand first: product name, the #8EB992 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/sentinel-ai-hero
原始 prompt：5940 字符
