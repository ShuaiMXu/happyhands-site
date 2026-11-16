# Brightly

> Hero section reference for an agency or studio — 3.5s transitions, #050505 base, looping video and a word-by-word headline.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1920x1314 · 比例 1.4612 · 13.667s

## 概述

Brightly is the hero section reference for an agency or studio, and the brief behind it is a full build spec rather than a mood board. The headline reads “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive”, and the rest of the hero section is arranged around it. The whole page is built on black #050505 underneath and bright orange #F97316 carrying the accents. Delivery is React and Tailwind CSS, captured at 2046x1400 so the frame is fixed before any code is written. Motion is confined to 3.5s transitions and a looping video bed. It is most useful when the Agencies & Studios hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built around “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#F97316` | accent |
| Red | `#FF4D4D` | lighter |
| Red — darker | `#EC4899` | Secondary |
| Near-black | `#050505` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Accent use is limited to bright orange #F97316; everything else sits on black #050505.
- Transitions are specified at 3.5s, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 3.5s, which is the value to keep when the palette changes.

## 布局

**The bar shares the page grid** — The bar is the quietest part of the composition: wordmark, a short row of links and one #F97316 action, all held at the smallest type step in the brief. The links are set below the wordmark in size, and the #F97316 action is the only element in the bar with any weight.

**Measured against the viewport** — Nothing in the layout is left to feel: the brief quotes 24px spacing steps and 3.5s transitions and the build has to hit those values. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.

**One clip does the work** — The first screen is a single clip at 2046x1400, and everything else is arranged on top of it. The loop is short enough (13.7s) that the eye reads it as texture rather than as a timeline.

**Navigation without a background** — The bar sits over the 2046x1400 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Ambient motion without a scroll library** — One 13.7s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution.

**Timings in milliseconds** — The controls resolve in 3.5s, fast enough that the page answers as it is touched rather than after it. Easing is specified alongside the duration (3.5s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Swap #F97316 for your brand colour and re-check it against #050505, since the accent is the only place saturation is allowed.
- Set 3.5s to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Rewrite “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive” to the same line count; the mask reveals each line in turn.
- Keep 2046x1400 for the media and re-crop your own asset into it rather than resizing the frame.

## 文案规则

**How the hero section reflows** — Most responsive work stops at hiding elements. Here the layout changes shape: the navigation collapses into a mobile menu, and nothing important is dropped to make the fold fit. A squeeze would have been cheaper and would not hold.

**The timing behind the hero section** — Keeping motion this small means the page leans on the type and the frame instead. If 3.5s transitions, a 13.7s media loop and a word-by-word headline were removed entirely, the composition would still stand. Nothing animates for its own sake in this hero section.

**Why the agency brief holds** — Restraint costs you room for proof above the fold. This brief accepts that cost and spends the first screen on the offer, with 24px spacing steps and 3.5s transitions fixed so a proof section can be added below without a rework. It gives a agency reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Category | Agencies & Studios |
| Canvas size | 2046x1400 · 1.46:1 |
| Runtime | 13.7s loop |
| Prompt text | 2,298 characters |
| Capture date | 2026-09-17 |
| Key tone | bright orange #F97316 |
| Stack | Tailwind CSS, React |
| Motion spec | 3.5s transitions and a 13.7s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2046x1400 capture before you generate.
2. Set the brand first: product name, the #F97316 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #F97316 with your own accent and re-check the contrast.
4. Set your brand first: product name, the #F97316 accent and the headline that replaces the reference's.
5. Type the product name and the #F97316 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/brightly-hero
原始 prompt：2298 字符
