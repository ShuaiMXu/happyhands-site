# CoreOS

> Hero section reference for an industrial company — a word-by-word headline, 0.5s transitions, #2E3233 base and looping video.

- 行业：Industrial（industrial）
- 区块：Hero section
- 画布：1468x1080 · 比例 1.3593 · 4.933s

## 概述

This is the hero section from CoreOS, published with the brief that produced it rather than as a screenshot. The whole page is built on black #2E3233 underneath. Delivery is React and Tailwind CSS, captured at 1468x1080 so the frame is fixed before any code is written. Motion is 0.5s transitions and a looping video bed, kept quiet enough that the copy still leads. Keep it open while you write: the 5,790-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference for an industrial company, captured at 1468x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#020202` | darkest |
| Gray | `#626A6A` | lightest |
| Deep teal | `#2A3234` | panel edges |
| Black | `#2E3233` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 62px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 0.5s, short enough that the page never feels like it is waiting for an animation.
- Nothing sits between the type and the 1468x1080 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1468x1080 and a 4.9s loop, so the composition has a single media dependency.

## 布局

**The nav is deliberately thin** — The bar is one row of text and one action, measured at a fixed 62px display size and 14px spacing steps so it reads as a strip rather than as a band. The bar sits over the 1468x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Navigation held to one row** — The action carries the accent while the links stay on the ink colour, so the hierarchy in the bar matches the page below it. Copy this pattern when you need navigation that survives a loud first screen.

**The brief names the steps** — The brief states its sizes at capture (a fixed 62px display size, 14px spacing steps and 0.5s transitions), so a rebuild can be verified instead of approximated. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well. Measure before you adjust.

**A full-bleed clip behind the type** — The composition is built on top of the 1468x1080 clip rather than beside it, so the media never gets a panel or a border. A poster frame at 1468x1080 holds the composition when autoplay is unavailable, so the layout never collapses. Export at 1468x1080 or wider to keep the crop honest.


## 动效

**The loop does the ambient work** — Ambient movement comes from the 4.9s 1468x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. Nothing else on the page animates continuously, so the media is the only thing asking for attention.

**The whole animation budget** — Transitions are specified at 0.5s, which is the timing the controls are held to. Easing is specified alongside the duration (0.5s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Keep 1468x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1468x1080 frame.
- Keep the 1468x1080 frame when you swap the content, because the composition was solved against that ratio.
- Retime the entrance to taste. 0.5s with a standard ease-out is what the reference uses.

## 文案规则

**Making the hero section yours** — One line, one font, one accent: those three substitutions change the design most. a fixed 62px display size, 14px spacing steps and 0.5s transitions are the values that should not move. Substitution is cheaper than composition, and that is the point.

**The order behind the hero section** — Committing to one reading path means other paths are closed. The brief accepts that, fixes navigation and the background clip in place, and spends a fixed 62px display size and 14px spacing steps on making the route obvious. A industrial reader gets the offer before the options.

**The numbers behind the hero section** — Most references show the result and keep the numbers. This one reverses that: a fixed 62px display size, 14px spacing steps and 0.5s transitions are published beside the page, so the result can be reproduced instead of approximated. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Category | Industrial |
| Viewport | 1468x1080 · 1.36:1 |
| Duration | 4.9s loop |
| Prompt text | 5,790 characters |
| Captured | 2026-09-17 |
| Tools | Tailwind CSS, React, Lucide icons |
| Motion | 0.5s transitions and a 4.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1468x1080 capture before you generate.
2. Keep the measurements the brief spells out: a fixed 62px display size, 14px spacing steps and 0.5s transitions.
3. Pin the reference measurements before you restyle anything: a fixed 62px display size, 14px spacing steps and 0.5s transitions.
4. Check your build against the reference measurements: a fixed 62px display size, 14px spacing steps and 0.5s transitions.
5. Copy a fixed 62px display size, 14px spacing steps and 0.5s transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/coreos-product-hero
原始 prompt：5790 字符
