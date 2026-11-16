# Veyra Electric

> Landing page reference for an industrial company — Space Grotesk, #6B879D base, looping video and React and Vite.

- 行业：Industrial（industrial）
- 区块：Landing page
- 画布：1920x1412 · 比例 1.3598 · 6.325s

## 概述

Veyra Electric shows one way to build the landing page for an industrial company, and publishes the instructions that produced it. The palette is muted blue #6B879D underneath and white #FFFFFF for the type, set in Space Grotesk. The entry names the stack that produced the page (React and Vite) rather than hiding it. Motion is confined to a looping video bed. This reference is for an industrial company that wants the first screen settled before the build starts.

## 主标题文案

> Landing page reference for an industrial company, captured at 1920x1412 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted blue | `#6B879D` | composition |
| Muted blue — lighter | `#708FA2` | saturated |
| White | `#FFFFFF` | Headline |
| White — darker | `#E1EAF0` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Space Grotesk | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Nothing sits between the type and the 1920x1412 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1920x1412 and a 6.3s loop, so the composition has a single media dependency.
- Media is specified at 1920x1412 and a 6.3s loop, so a replacement should match the crop and the loop length.

## 布局

**Top row, one action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Space Grotesk so the bar belongs to the page below rather than to a separate system. The bar sits over the 1920x1412 composition without a background of its own, so the media runs edge to edge underneath it. The bar is a handful of elements, so it rebuilds without a component library.

**Measured against the viewport** — The layout is solved against fixed values (12px spacing steps), which is what keeps the first screen composed at any width. The smallest and largest values in that list set the range the composition works in.

**One field, one action** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. The action sits directly under the last field, so the decision is never more than a glance away.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The accent is reused on one footer action rather than across the whole band. Keep the accent for a single action.


## 动效

**Rendered, not illustrated** — The visual is produced at runtime (a WebGL canvas) rather than loaded as a still, so the 1920x1412 frame has one fewer asset. The scene is drawn at the size of its container, so it does not depend on a fixed render resolution.

**Pointer states, nothing more** — The pointer work is small and specified: hover states on the buttons and links rather than on every card, applied to the elements that already look interactive. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element. If a state does not confirm an action, drop it.


## 可替换项

- Change the copy first, then the accent, then the media: the 1920x1412 frame was solved in that order and reversing it costs a re-layout.
- Replace the video with a still at 1920x1412 if the 6.3s loop is too heavy for the page you are shipping.
- Hold the landing page to one screen on desktop; the brief never asks the reader to scroll past the fold.
- Swap Space Grotesk for a face with the same x-height and cap height, then re-measure the headline block.

## 文案规则

**The numbers behind the landing page** — Compare this with a template that calls its spacing a preference. Here the same values are named (12px spacing steps), so an edit either keeps them or visibly breaks the composition. Nothing in this landing page depends on a default.

**The order behind the landing page** — A page like this usually buries the action under a feature grid. This one puts navigation, the stats row, the form, the countdown and the background clip in a fixed sequence, with the action inside the first screen rather than after three scroll lengths. A industrial reader gets the offer before the options.

**What this landing page gets right** — A stock hero and this landing page use the same parts. Here they are ordered by navigation, the stats row, the form, the countdown and the background clip and measured with 12px spacing steps, so the screen reads as a sequence rather than a container. It gives a industrial reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Category | Industrial |
| Viewport | 1920x1412 · 1.36:1 |
| Duration | 6.3s loop |
| Prompt text | 12,080 characters |
| Archived | 2026-09-17 |
| Faces | Space Grotesk |
| Built with | React, TypeScript, Vite |
| Motion spec | a 6.3s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names React and Vite before you press send.
2. Open the reference in Studio with the prompt staged, and read the landing page brief before you send it.
3. Start in Studio with the prompt prefilled, then delete the parts of the landing page you do not need.
4. Stage the prompt in Studio and read it once against the 1920x1412 capture before you generate.
5. Copy 12px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/veyra-electric
原始 prompt：12080 字符
