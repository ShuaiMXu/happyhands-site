# Synth Mode

> Landing page reference for an ecommerce brand — React and Tailwind CSS, looping video, Plus Jakarta Sans and #EBEBED base.

- 行业：Ecommerce（ecommerce）
- 区块：Landing page
- 画布：1920x1396 · 比例 1.3754 · 7.267s

## 概述

Synth Mode is a ecommerce landing page built from one written brief, and this page documents that brief. “LGPSM — Future Forward Fashion” is the line the layout is built to carry. Colour is limited to white #EBEBED underneath and muted blue #64748B carrying the accents, set in Plus Jakarta Sans. Delivery is React and Tailwind CSS, captured at 1920x1396 so the frame is fixed before any code is written. Motion comes down to 3s transitions and a looping video bed. It is most useful when the Ecommerce landing page has to survive a copy change without a redesign.

## 主标题文案

> “LGPSM — Future Forward Fashion” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted blue | `#64748B` | accent |
| Gray | `#8B817E` | darker step |
| White | `#EFEFF1` | lightest |
| White — darker | `#EBEBED` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Plus Jakarta Sans | Weight not fixed in the brief | UI text |
| Orbitron | Weight not fixed in the brief | Body copy |
| Chakra Petch | Weight not fixed in the brief | Fallback and supporting interface text |

## 视觉要点

- Media is specified at 1920x1396 and a 7.3s loop, so a replacement should match the crop and the loop length.
- The timing budget is state feedback rather than page choreography (3s), so a slower rebuild reads as a different design.
- Nothing sits between the type and the 1920x1396 clip, so a replacement has to work under the copy directly.

## 布局

**Links collapse at one width** — The top row holds the wordmark, four to five links and a single action tinted #64748B, sized to stay quiet against the rest of the page. The links are set below the wordmark in size, and the #64748B action is the only element in the bar with any weight.

**One scale for type and frame** — The layout works on absolute values rather than ratios: 3s transitions. Spacing is quoted in the same units as the type, so the two can be compared directly.

**Panels carry the middle** — The grid does the reading order for you: panels of equal weight, one idea each, set in Plus Jakarta Sans at a small size so the structure stays visible. Each panel pairs one idea with an icon, so the scan path stays horizontal. One idea per panel.

**A navigation bar that gets out of the way** — The bar sits over the 1920x1396 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Interaction is on the controls** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. Each state changes one property, which keeps the feedback legible. Fewer states, fully specified.

**A loop, not a timeline** — Ambient movement is one 7.3s clip at 1920x1396, looping quietly behind the copy rather than reacting to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size. Shoot or export at 1920x1396 or wider.


## 可替换项

- Retime the entrance to your own 3s, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Change the copy first, then the accent, then the media: the 1920x1396 frame was solved in that order and reversing it costs a re-layout.
- Keep the 1920x1396 frame when you swap the content, because the composition was solved against that ratio.
- Swap Plus Jakarta Sans for a face with the same x-height and cap height, then re-measure the headline block.

## 文案规则

**How Synth Mode sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 3s transitions have to be re-cut, because the sequence is load-bearing rather than decorative. A ecommerce reader gets the offer before the options.

**The numbers behind the landing page** — The landing page is measured, not eyeballed. 3s transitions come from the brief, and the layout is arranged to those steps rather than nudged into place. Nothing in this landing page depends on a default.

**What moves in Synth Mode** — Motion is limited to 3s transitions, a 7.3s media loop and parallax layers; it runs once on entry and then gets out of the way, which is the right budget for the landing page to stay readable. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Field | Ecommerce |
| Viewport | 1920x1396 · 1.38:1 |
| Loop | 7.3s loop |
| Brief | 10,533 characters |
| Date | 2026-09-17 |
| Key tone | muted blue #64748B |
| Typefaces | Plus Jakarta Sans, Orbitron, Chakra Petch |
| Tech stack | Tailwind CSS, React, TypeScript |
| Timing | 3s transitions and a 7.3s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1396 capture before you generate.
2. Set the brand first: product name, the #64748B accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #64748B with your own accent and re-check the contrast.
4. Set your brand first: product name, the #64748B accent and the headline that replaces the reference's.
5. Type the product name and the #64748B accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/synth-mode
原始 prompt：10533 字符
