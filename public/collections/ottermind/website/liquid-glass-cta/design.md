# Liquid Glass CTA

> Call to action reference for an AI or SaaS product — #9A83AB accent, a stats row, React and Tailwind CSS and a 640x466 frame.

- 行业：AI & SaaS（ai-saas）
- 区块：Call to action
- 画布：640x466 · 比例 1.3734 · 0s

## 概述

Liquid Glass CTA is a working reference for an AI or SaaS product: the call-to-action block laid out, measured and ready to rebuild. Colour is limited to black #111111 underneath and muted indigo #9A83AB carrying the accents, set in Instrument Serif. It ships as React and Tailwind CSS, so the whole call-to-action block can be lifted into a project without a design handoff. Start from the captured brief, then edit the call-to-action block rather than rebuilding it from scratch.

## 主标题文案

> Call to action reference built on black #111111 and muted indigo #9A83AB, set in Instrument Serif and measured against 200px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0D0C0E` | darkest |
| Muted indigo | `#9A83AB` | accent |
| Deep indigo | `#211927` | panel edges |
| Near-black — lighter | `#111111` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display tone |
| Barlow | Weight not fixed in the brief | Body copy |

## 视觉要点

- Accent and ground are both named (muted indigo #9A83AB on black #111111), so a brand swap moves one value.
- The accent is spent on muted indigo #9A83AB and the rest of the composition holds black #111111.
- Glass surfaces use blur(50px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**Nothing here is inherited** — The brief names the numbers: 200px spacing steps. That is why the composition holds together, because there is no invented spacing step between the type and the frame. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**A stat row instead of a claim** — The figures are set in Instrument Serif at a size closer to the headline than to the body copy. The figures carry the #9A83AB accent while everything around them stays on the ink colour.

**Numbers carried into the build** — Spacing is quoted the same way (200px spacing steps), not as a scale that grows on its own.

**Proof above the fold** — A row of stats sits above the fold, set in Instrument Serif at the top of the scale, with #9A83AB left for the figures that carry a claim.


## 动效

**Interaction kept local** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card), so the page feels responsive without turning every element into a target. Interactive targets are large enough to tap and the pointer treatment is consistent across them. Do not animate layout on hover.

**Almost no motion** — There is no scroll library here: the 640x466 composition holds still and only the elements that respond to you move. Only the elements that respond to the pointer move. Keep motion to the controls.


## 可替换项

- Keep Instrument Serif or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Keep 640x466 for the media and re-crop your own asset into it rather than resizing the frame.
- Hold the call-to-action block to one screen on desktop; the composition is solved for a reader who never scrolls.
- Change #9A83AB for your brand accent and re-check it against #111111, because the accent is the only saturated value in this composition.

## 文案规则

**Reading Liquid Glass CTA as a spec** — A screenshot tells you what the page looks like; the brief tells you why. 200px spacing steps close the gap between the two. Nothing in this call-to-action block depends on a default.

**Making the call-to-action block yours** — A straight substitution has a limit: if your product needs a different hierarchy, 200px spacing steps will fight it. Change the order first in that case, and the values second. The subject is the part that should change.

**How the call-to-action block reflows** — The desktop composition is solved against 640x466, and the narrow layout is designed rather than inherited: the scale is fluid rather than stepped. Motion has a reduced-motion branch, and the media carries a poster frame so the page still communicates when autoplay is unavailable. The mobile version is a decision, not a fallback.


## 规格

| 项 | 值 |
|---|---|
| Page section | Call to action |
| Field | AI & SaaS |
| Canvas | 640x466 · 1.37:1 |
| Prompt | 10,077 characters |
| Captured | 2026-09-17 |
| Accent hex | muted indigo #9A83AB |
| Type | Instrument Serif, Barlow |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | state changes only |

## 复刻步骤

1. Set your brand first: product name, the #9A83AB accent and the headline that replaces the reference's.
2. Type the product name and the #9A83AB accent before you touch the layout.
3. Set the brand first: product name, the #9A83AB accent and a headline that replaces the reference's.
4. Drop your product name in, then replace #9A83AB with your own accent and re-check the contrast.
5. Copy 200px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/liquid-glass-cta
原始 prompt：10077 字符
