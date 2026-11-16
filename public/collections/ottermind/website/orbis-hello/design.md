# Orbis Hello

> About page reference for a lifestyle brand — React and Tailwind CSS, Anton, a 640x470 frame and a stats row.

- 行业：Lifestyle（lifestyle）
- 区块：About page
- 画布：640x470 · 比例 1.3617 · 0s

## 概述

Orbis Hello was captured at 640x470 and kept as a specification rather than as a gallery image. The palette is deep blue #13142D underneath, white #EFF4FF for the type and bright lime #6FFF00 carrying the accents, set in Anton. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. It is most useful when the Lifestyle about page has to survive a copy change without a redesign.

## 主标题文案

> About page reference built on deep blue #13142D and bright lime #6FFF00, set in Anton and measured against type from 14px to 68px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#EFF4FF` | Headline |
| Bright lime | `#6FFF00` | accent |
| Deep blue | `#010828` | saturated |
| Deep blue — lighter | `#13142D` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Anton | 14–68px | Control text |
| Condiment | 14–68px | Body face |

## 视觉要点

- The accent is spent on bright lime #6FFF00 and the rest of the composition holds deep blue #13142D.
- The display line is Anton at the top of a 14–68px scale, with the interface text on the same face.
- Accent and ground are both named (bright lime #6FFF00 on deep blue #13142D), so a brand swap moves one value.

## 布局

**Nothing here is inherited** — Sizes are quoted rather than inherited: type from 14px to 68px and 20px spacing steps. Swap the face or the copy and those relationships still hold. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**Proof above the fold** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #6FFF00 or the ink colour rather than a coloured card. The figures carry the #6FFF00 accent while everything around them stays on the ink colour.

**The brief names the steps** — Spacing is quoted the same way (type from 14px to 68px and 20px spacing steps), not as a scale that grows on its own.

**A stat strip, not a table** — A row of stats sits above the fold, set in Anton at the top of the scale, with #6FFF00 left for the figures that carry a claim.


## 动效

**Feedback on the controls** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. The interactive states do not move layout, so nothing jumps under the pointer. Do not animate layout on hover.

**Motion that stays out of the way** — This one is delivered as a still composition at 640x470, so the hierarchy has to work without motion, and it does. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Change #6FFF00 for your brand accent and re-check it against #13142D, because the accent is the only saturated value in this composition.
- Swap #6FFF00 for your brand colour and re-check it against #13142D, since the accent is the only place saturation is allowed.
- Change the copy before the colour: rewrite the Anton paragraphs first, then check #6FFF00 against the media behind them.
- Replace the copy in the Anton stack first, then re-check the #6FFF00 accent against the media behind it.

## 文案规则

**What this about page gets right** — The reason this works for a lifestyle brand is that it never asks the reader to assemble the message. Layout, type and colour are decided (deep blue #13142D and bright lime #6FFF00, set in Anton), so the first screen reads as a finished argument rather than a pile of parts. Orbis Hello states the offer once and lets the composition repeat it rather than adding a second claim.

**What moves in Orbis Hello** — Count the animated elements and the list is short: hover and press states. Nothing animates for its own sake in this about page.

**How the about page reflows** — The cost of a fluid scale is less control over exact sizes. What you get is a display line that stays proportionate, which is why a clamp between 14px and 68px is in the brief. The reflow keeps the action reachable at every width.


## 规格

| 项 | 值 |
|---|---|
| Page part | About page |
| Industry | Lifestyle |
| Canvas | 640x470 · 1.36:1 |
| Prompt | 5,232 characters |
| Capture date | 2026-09-17 |
| Accent tone | bright lime #6FFF00 |
| Faces | Anton, Condiment · 14–68px |
| Stack | Tailwind CSS, React |
| Animation | state changes only |

## 复刻步骤

1. Keep the measurements the brief spells out: type from 14px to 68px and 20px spacing steps.
2. Copy type from 14px to 68px and 20px spacing steps into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: type from 14px to 68px and 20px spacing steps.
4. Pin the reference measurements before you restyle anything: type from 14px to 68px and 20px spacing steps.
5. Export and check the first screen on a phone, then compare it against the 640x470 reference before you widen the copy.

---
来源：https://ottermind.ai/explore/website/orbis-hello
原始 prompt：5232 字符
