# Rocket CTA

> Call to action reference for an AI or SaaS product — React and Tailwind CSS, a dark stage, a stats row and #14191E base.

- 行业：AI & SaaS（ai-saas）
- 区块：Call to action
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

Read Rocket CTA as a call-to-action block spec: the values were written down before the page was built. Colour is limited to deep blue #14191E underneath, set in Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion is confined to 300ms transitions. It is the right reference for an AI or SaaS product call-to-action block that has to look deliberate on the first screen.

## 主标题文案

> Call to action reference for an AI or SaaS product, captured at 640x468 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#14191E` | composition |
| Near-black — darker | `#000000` | darkest |
| Near-black — darker | `#101010` | panel edges |
| Muted yellow | `#8F916F` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Interface |
| Instrument Serif | Weight not fixed in the brief | Second face |

## 视觉要点

- The timing budget is state feedback rather than page choreography (300ms), so a slower rebuild reads as a different design. The reference was captured at 640x468, and every value quoted on this page comes from the same brief.
- Transitions are specified at 300ms, which is the value to keep when the palette changes.
- Transitions are specified at 300ms, short enough that the page never feels like it is waiting for an animation.

## 布局

**Top row, one action** — Navigation is a single row with no second level under it. The bar sits over the 640x468 composition without a background of its own, so the media runs edge to edge underneath it.

**Values you can check** — Type and spacing are drawn from one list here: 10px spacing steps and 300ms transitions. A rebuild that hits those numbers looks like the reference without further tuning.

**Type sets the hierarchy** — The type is Inter at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. Weights are specified per role, so the hierarchy does not depend on guesswork at build time. The scale is quoted; use it.

**The nav is deliberately thin** — If your own page has more sections, group them rather than widening the bar. The reference was captured at 640x468.


## 动效

**Sections arrive with scroll** — Parallax runs while the page is moving, so the composition has a defined resting state. The composition does not depend on the effect firing, so a fast scroll past it costs nothing. Test it with reduced motion on.

**Timings in milliseconds** — Transitions are specified at 300ms, which is the timing the controls are held to. One value is reused across the controls, so their timing cannot drift apart.


## 可替换项

- Keep the call-to-action block inside one viewport and move whatever does not fit into the section below it.
- Retime the entrance to your own 300ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 640x468 frame.
- Draft the new copy to the 640x468 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**The numbers behind the call-to-action block** — This is what makes the reference reusable: 10px spacing steps and 300ms transitions. Nothing is left to a default, so a substitution that keeps those numbers keeps the composition. Nothing in this call-to-action block depends on a default.

**What this call-to-action block gets right** — The trade-off is density: this call-to-action block says less on the first screen than a feature-led layout would. What it keeps is the reading order, and navigation, the headline, the announcement badge, the stats row and the background clip do the work a longer page would spread out. Rocket CTA states the offer once and lets the composition repeat it rather than adding a second claim.

**What moves in Rocket CTA** — Ambitious motion usually costs the first screen its legibility. This brief keeps 300ms transitions, parallax layers and hover and press states short enough that the type never has to wait. Nothing animates for its own sake in this call-to-action block.


## 规格

| 项 | 值 |
|---|---|
| Block | Call to action |
| Industry | AI & SaaS |
| Canvas size | 640x468 · 1.37:1 |
| Prompt text | 11,622 characters |
| Archived | 2026-09-17 |
| Type scale | Inter, Instrument Serif |
| Built with | Tailwind CSS, React, TypeScript |
| Timing | 300ms transitions |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: 10px spacing steps and 300ms transitions.
2. Copy 10px spacing steps and 300ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 10px spacing steps and 300ms transitions.
4. Keep the measurements the brief spells out: 10px spacing steps and 300ms transitions.
5. Add the entrance first at 300ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/rocket-cta
原始 prompt：11622 字符
