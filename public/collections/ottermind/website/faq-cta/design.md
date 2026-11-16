# FAQ CTA

> Call to action reference for a health or wellbeing product — Inter, 6.5s transitions, a stats row and React and Tailwind CSS.

- 行业：Health（health）
- 区块：Call to action
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

FAQ CTA is a health call-to-action block built from one written brief, and this page documents that brief. The page's own headline reads “Send Money Worldwide at the Best Rates”, and the composition is built around those exact words. The palette runs white #F0F0F0 underneath and bright red #FF4B2B carrying the accents, and the type is Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion comes down to 6.5s transitions. It is the right reference for a health or wellbeing product call-to-action block that has to look deliberate on the first screen.

## 主标题文案

> “Send Money Worldwide at the Best Rates” — the whole call-to-action block is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F0F0F0` | composition |
| Orange | `#FF8E53` | darker |
| Muted yellow | `#FFF1AA` | saturated |
| Bright red | `#FF4B2B` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (6.5s), so a slower rebuild reads as a different design.
- The accent is spent on bright red #FF4B2B and the rest of the composition holds white #F0F0F0.
- Transitions are specified at 6.5s, short enough that the page never feels like it is waiting for an animation.

## 布局

**A navigation bar that gets out of the way** — Links sit on one line at a single size, and the #FF4B2B action closes the row on the right so the eye finishes where the navigation ends. The links are set below the wordmark in size, and the #FF4B2B action is the only element in the bar with any weight.

**Measured, not eyeballed** — Nothing in the layout is left to feel: the brief quotes 10px spacing steps and 6.5s transitions and the build has to hit those values. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**One face, used with discipline** — Typography is Inter, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. A face swap is safe as long as the sizes and weights stay where the brief put them. One family with clear roles beats two that compete.

**The grid sets the order** — Where a run of copy would go, this page puts a set of panels, which is what keeps the call-to-action block scannable. The accent inside the grid marks one element at most, so panels do not compete with each other. The reference was captured at 640x468.


## 动效

**A scene instead of a still** — A live canvas is doing the visual work: a WebGL canvas. The brief keeps the interface plain around the canvas so the scene is the only spectacle.

**Hover where it means something** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card and tabs or an accordion that swaps content in place), so the page feels responsive without turning every element into a target. Each state changes one property, which keeps the feedback legible. If a state does not confirm an action, drop it.


## 可替换项

- Retune #FF4B2B for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Change #FF4B2B for your brand accent and re-check it against #F0F0F0, because the accent is the only saturated value in this composition.
- Retime the entrance to taste. 6.5s with a standard ease-out is what the reference uses.
- Change the copy before the colour: rewrite the Inter paragraphs first, then check #FF4B2B against the media behind them.

## 文案规则

**What to change first in FAQ CTA** — Start with the promise, not the decoration. Rewrite “Send Money Worldwide at the Best Rates” as one sentence that names what you do, then set it in Inter at the display size the brief uses. Replace bright red #FF4B2B with your own accent and check it against white #F0F0F0 before you touch anything else. If a new element does not help explain the offer or the next action, it belongs below the fold.

**How the call-to-action block reflows** — The brief describes what changes at each width (the motion has a reduced-motion branch), which means the mobile version is a decision rather than a squeeze. Contrast is held on the #FF4B2B accent over the media, and the video is muted and inline. The mobile version is a decision, not a fallback.

**Why this composition works for health** — When you brief a health call-to-action block, the hard part is deciding what the first screen refuses to say. FAQ CTA answers that in advance: one display line, navigation, the stats row, the card grid, the feature list and the form behind it. It gives a health reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Section | Call to action |
| Vertical | Health |
| Canvas | 640x468 · 1.37:1 |
| Source text | 9,456 characters |
| Capture date | 2026-09-17 |
| Accent tone | bright red #FF4B2B |
| Typefaces | Inter |
| Stack | Tailwind CSS, React, TypeScript |
| Motion | 6.5s transitions |

## 复刻步骤

1. Set the brand first: product name, the #FF4B2B accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #FF4B2B with your own accent and re-check the contrast.
3. Set your brand first: product name, the #FF4B2B accent and the headline that replaces the reference's.
4. Type the product name and the #FF4B2B accent before you touch the layout.
5. Keep the measurements the brief spells out: 10px spacing steps and 6.5s transitions.

---
来源：https://ottermind.ai/explore/website/faq-cta
原始 prompt：9456 字符
