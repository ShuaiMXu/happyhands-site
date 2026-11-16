# Scaling Platform

> Landing page reference for an AI or SaaS product — looping video, Quantico, 1s transitions and a masked headline reveal.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1916x1080 · 比例 1.7741 · 5.133s

## 概述

Scaling Platform is a working reference for an AI or SaaS product: the landing page laid out, measured and ready to rebuild. The palette runs white #F2F1F0 underneath, black #3A3A3A for the type and bright teal #15BCDF carrying the accents, and the type is Quantico. It ships as a single component, so the whole landing page can be lifted into a project without a design handoff. Motion is confined to 1s transitions and a looping video bed. Use it as the reference when you are building an AI or SaaS product landing page and want a finished composition instead of a starting point.

## 主标题文案

> Landing page reference built on white #F2F1F0 and bright teal #15BCDF, set in Quantico and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F2F1F0` | composition |
| Bright teal | `#15BCDF` | accent |
| Black | `#3A3A3A` | Headline |
| Bright teal — lighter | `#3FD0EF` | darker |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Quantico | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 1s, which is the value to keep when the palette changes.
- Nothing sits between the type and the 1916x1080 clip, so a replacement has to work under the copy directly.
- Transitions are specified at 1s, short enough that the page never feels like it is waiting for an animation.

## 布局

**Top row, one action** — The row spends its contrast in one place: the #15BCDF action, with the wordmark and the links held back on the ink colour. A mobile overlay takes over below the tablet breakpoint. The links are set below the wordmark in size, and the #15BCDF action is the only element in the bar with any weight.

**Measured, not eyeballed** — The brief states its sizes at capture (100vh sections, 20px spacing steps and 1s transitions), so a rebuild can be verified instead of approximated. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**Weights named per role** — The size steps and tracking in the brief are what give this its tone: Quantico at a tight display size, then a clear drop to the supporting copy. Substituting the face is possible, but the proportions have to survive the swap. One face, clear roles.

**A bar with nothing spare** — The bar sits over the 1916x1080 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Short, named durations** — Transitions are specified at 1s, which is the timing the controls are held to. Easing is specified alongside the duration (1s), so a rebuild cannot quietly substitute a different feel. Do not ship the browser default.

**A small interactive surface** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element. Fewer states, fully specified.


## 可替换项

- Keep 1916x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace the video with a still at 1916x1080 if the 5.1s loop is too heavy for the page you are shipping.
- Recut your footage to the 5.1s loop, then export at 1916x1080 so the crop the reference specifies survives.
- Retime the entrance to your own 1s, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**The timing behind the landing page** — A preset animation library would give you more movement than this. The brief asks for less: 1s transitions, a 5.1s media loop and a masked line reveal, and nothing decorative on top. Nothing animates for its own sake in this landing page.

**How Scaling Platform sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 100vh sections and 20px spacing steps have to be re-cut, because the sequence is load-bearing rather than decorative. A SaaS reader gets the offer before the options.

**What to change first in Scaling Platform** — Most people start with the accent colour. Start with the promise instead: rewrite the display line, then re-test bright teal #15BCDF against your own media. Set the new copy at the same display size and re-check the contrast before you add anything.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Vertical | AI & SaaS |
| Canvas size | 1916x1080 · 1.77:1 |
| Clip length | 5.1s loop |
| Prompt | 5,231 characters |
| Capture date | 2026-09-17 |
| Accent hex | bright teal #15BCDF |
| Typefaces | Quantico |
| Motion | 1s transitions and a 5.1s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1916x1080 capture before you generate.
2. Set the brand first: product name, the #15BCDF accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #15BCDF with your own accent and re-check the contrast.
4. Set your brand first: product name, the #15BCDF accent and the headline that replaces the reference's.
5. Type the product name and the #15BCDF accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/scaling-platform
原始 prompt：5231 字符
