# Signal ID

> Landing page reference for an AI or SaaS product — 70ms transitions, fluid type, React and Tailwind CSS and cubic-bezier(0.16, 1, 0.3, 1) easing.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1686x1080 · 比例 1.5611 · 7s

## 概述

Signal ID is a working reference for an AI or SaaS product: the landing page laid out, measured and ready to rebuild. The page's own headline reads “YOUR VOICE ID TO THE E NETWORK”, and the composition is built around those exact words. The colour scheme is deep blue #000003 underneath and #FFFFFF for the type, and the page is set in Sora. Delivery is React and Tailwind CSS, captured at 1686x1080 so the frame is fixed before any code is written. The motion budget is 70ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 11,588-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built around “YOUR VOICE ID TO THE E NETWORK”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | background |
| Tint | `#FFFFFF` | Headline |
| Muted blue | `#768993` | lighter step |
| Near-black — lighter | `#000003` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Sora | Weight not fixed in the brief | UI text |
| JetBrains Mono | Weight not fixed in the brief | Mono labels |

## 视觉要点

- Transitions are specified at 70ms, which is the value to keep when the palette changes.
- Media is specified at 1686x1080 and a 7s loop, so a replacement should match the crop and the loop length.
- The timing budget is state feedback rather than page choreography (70ms), so a slower rebuild reads as a different design.

## 布局

**The bar shares the page grid** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1686x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**The sizes are in the brief, not in a scale** — The brief states its sizes at capture (100vh sections, 20px spacing steps, 70ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), so a rebuild can be verified instead of approximated. Each value maps to one job: a type step, a gap, a radius or a transition.

**Two faces, clear jobs** — The size steps and tracking in the brief are what give this its tone: Sora at a tight display size, then a clear drop to the supporting copy. The caption step is small enough to sit under a figure without changing the rhythm of the page.

**Navigation without a background** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. The bar is a handful of elements, so it rebuilds without a component library.


## 动效

**The entrance is the signature** — The headline is not faded in as a block: each line rises out of an overflow-hidden window. That is what separates the page from a still, because the order in which the words appear does the storytelling. Under reduced motion the element simply appears and the layout is unchanged.

**Interaction kept local** — The page answers only where it can be acted on: hover states on the buttons and links rather than on every card. The states are named in the brief, so the page does not depend on a hover-effect library. Keep the pointer effects on the controls.


## 可替换项

- Replace “YOUR VOICE ID TO THE E NETWORK” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Hold the 1686x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Keep Sora or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Swap in your own headline where “YOUR VOICE ID TO THE E NETWORK” sits and keep the line breaks, because the entrance animates per line.

## 文案规则

**What to change first in Signal ID** — Change the content first and check the frame afterwards. 100vh sections, 20px spacing steps, 70ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing are the values to protect while you swap the copy. The subject is the part that should change.

**The numbers behind the landing page** — A rebuild usually starts with a screenshot and a guess. Here it starts with 11,588 characters of specification: the frame, the spacing and the motion are written down before the first line of code. Nothing in this landing page depends on a default.

**What moves in Signal ID** — The timing is explicit: 70ms transitions, a 7s media loop and a masked line reveal, all of it written into the brief rather than tuned by feel. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Category | AI & SaaS |
| Frame | 1686x1080 · 1.56:1 |
| Runtime | 7s loop |
| Brief | 11,588 characters |
| Date | 2026-09-17 |
| Faces | Sora, JetBrains Mono |
| Built with | Tailwind CSS, React |
| Motion | 70ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 7s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1686x1080 capture before you generate.
2. Copy 100vh sections, 20px spacing steps and 70ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 100vh sections, 20px spacing steps and 70ms transitions.
4. Keep the measurements the brief spells out: 100vh sections, 20px spacing steps and 70ms transitions.
5. Pin the reference measurements before you restyle anything: 100vh sections, 20px spacing steps and 70ms transitions.

---
来源：https://ottermind.ai/explore/website/signal-id
原始 prompt：11588 字符
