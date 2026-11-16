# Glow Features

> Features section reference for an agency or studio — a 1834x1362 frame, a stats row, #FF3D77 accent and a dark stage.

- 行业：Agencies & Studios（creative）
- 区块：Features section
- 画布：1834x1362 · 比例 1.3465 · 0s

## 概述

This is the features section from Glow Features, published with the brief that produced it rather than as a screenshot. It leads with “My entire desktop setup is built for power. It is silent, durable, and holds my focus” and gives that line the frame rather than shrinking it into a card. The whole page is built on black #0A0A0B underneath, muted red #FFB1CE for the type and bright red #FF3D77 carrying the accents. It ships as React and Tailwind CSS, so the whole features section can be lifted into a project without a design handoff. Keep it open while you write: the 3,072-character brief is the part that transfers to your own page.

## 主标题文案

> Features section reference built around “My entire desktop setup is built for power. It is silent, durable, and holds my focus”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1A1A1C` | panel edges |
| Near-black — darker | `#0A0A0B` | composition |
| Bright red | `#FF3D77` | accent |
| Muted red | `#FFB1CE` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 14px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The accent is spent on bright red #FF3D77 and the rest of the composition holds black #0A0A0B.
- Accent and ground are both named (bright red #FF3D77 on black #0A0A0B), so a brand swap moves one value.
- Accent use is limited to bright red #FF3D77; everything else sits on black #0A0A0B.

## 布局

**The spacing steps are quoted** — Sizes were read off the render at 1834x1362: a fixed 14px display size and 40px spacing steps. Each value maps to one job: a type step, a gap, a radius or a transition.

**A stat strip, not a table** — The row is placed high in the features section as proof rather than as decoration. The figures carry the #FF3D77 accent while everything around them stays on the ink colour.

**Nothing here is inherited** — Spacing is quoted the same way (a fixed 14px display size and 40px spacing steps), not as a scale that grows on its own.

**Labels under the figures** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #FF3D77 or the ink colour rather than a coloured card.


## 动效

**A live canvas at the centre** — The centrepiece is rendered live (a WebGL canvas) rather than shipped as an image, so the 1834x1362 composition reacts to the viewport instead of sitting behind it. Budget for the render: it is the element most likely to cost frames on a low-end device.

**Motion that stays out of the way** — The brief leaves animation out and lets the 1834x1362 layout carry the page, with hover and press states the only changes. There is no animation library in the brief, which keeps the rebuild small.


## 可替换项

- Hold the 1834x1362 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Draft the new copy to the 1834x1362 frame, then check that the entrance still lands on the same number of lines.
- Swap #FF3D77 for your brand colour and re-check it against #0A0A0B, since the accent is the only place saturation is allowed.
- Read the brief value by value against the 1834x1362 capture before you edit anything; the numbers are the part that is easiest to lose.

## 文案规则

**What to change first in Glow Features** — Change the content first and check the frame afterwards. a fixed 14px display size and 40px spacing steps are the values to protect while you swap the copy. Keep the media crop; it is doing as much work as the type.

**How the features section reflows** — The cost of a fluid scale is less control over exact sizes. What you get is a display line that stays proportionate, which is why a clamp between 14px and 40px is in the brief. Nothing important is dropped at narrow widths.

**The argument this features section makes** — Count the decisions in this features section and they trace back to one document: 3,072 characters naming the frame at 1834x1362, the type and the rhythm. It gives a agency reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Page part | Features section |
| Sector | Agencies & Studios |
| Viewport | 1834x1362 · 1.35:1 |
| Input brief | 3,072 characters |
| Saved | 2026-09-17 |
| Accent hex | bright red #FF3D77 |
| Tech stack | Tailwind CSS, React, Vite |
| Timing | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1834x1362 capture before you generate.
2. Set the brand first: product name, the #FF3D77 accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #FF3D77 accent and the headline that replaces the reference's.
4. Type the product name and the #FF3D77 accent before you touch the layout.
5. Drop your product name in, then replace #FF3D77 with your own accent and re-check the contrast.

---
来源：https://ottermind.ai/explore/website/glow-features
原始 prompt：3072 字符
