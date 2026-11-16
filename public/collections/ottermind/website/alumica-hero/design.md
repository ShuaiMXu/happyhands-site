# Alumica

> Hero section reference for a fintech product — 0.3s transitions, glass panels, Inter and #080210 base.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：1920x1304 · 比例 1.4724 · 5.833s

## 概述

Alumica was captured at 2056x1396 and kept as a specification rather than as a gallery image. The page's own headline reads “Automation & Fintech”, and the composition is built around those exact words. The palette is deep indigo #080210 underneath and bright orange #FF8A00 carrying the accents, set in Inter. Delivery is a single component — one page, no plugin, no build tooling between you and the design. Motion comes down to 0.3s transitions and a looping video bed. It is the right reference for a fintech product hero section that has to look deliberate on the first screen.

## 主标题文案

> Hero section reference built on deep indigo #080210 and bright orange #FF8A00, set in Inter and measured against 10px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#FF8A00` | accent |
| Bright orange — darker | `#EA580C` | lighter |
| Near-black | `#080210` | composition |
| Gray | `#766E6F` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 0.3s, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (0.3s), so a slower rebuild reads as a different design.
- Accent use is limited to bright orange #FF8A00; everything else sits on deep indigo #080210.

## 布局

**The bar shares the page grid** — Links sit on one line at a single size, and the #FF8A00 action closes the row on the right so the eye finishes where the navigation ends. The links are set below the wordmark in size, and the #FF8A00 action is the only element in the bar with any weight.

**The spacing steps are quoted** — The brief states its sizes at capture (10px spacing steps and 0.3s transitions), so a rebuild can be verified instead of approximated. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**A full-bleed clip behind the type** — The 2056x1396 video runs 5.8s on a loop behind the copy, muted and inline, with no tint layer between the two. A poster frame at 2056x1396 holds the composition when autoplay is unavailable, so the layout never collapses.

**The scale steps down hard** — Type is the styling system here: Inter at the display size, the same face across the interface, and no second accent colour doing the work. A face swap is safe as long as the sizes and weights stay where the brief put them.


## 动效

**The whole animation budget** — Motion in the controls is short and repeatable: 0.3s on each state change. Easing is specified alongside the duration (0.3s), so a rebuild cannot quietly substitute a different feel.

**Pointers only where they help** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. The states are drawn from the page's own palette rather than from a component default. Keep the pointer effects on the controls.


## 可替换项

- Replace the video with a still at 2056x1396 if the 5.8s loop is too heavy for the page you are shipping.
- Set 0.3s to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Rewrite “Automation & Fintech” to the same line count; the mask reveals each line in turn.
- Retime the entrance to taste. 0.3s with a standard ease-out is what the reference uses.

## 文案规则

**Reading Alumica as a spec** — Where a mood board leaves the scale open, this brief closes it: 10px spacing steps and 0.3s transitions, with the surrounding values derived from that decision. Nothing in this hero section depends on a default.

**Making the hero section yours** — Suppose you only have one afternoon. Change the headline and the action label, leave 10px spacing steps and 0.3s transitions alone, and you have a page that looks intentional. A different brand can reuse the whole frame.

**How Alumica sequences the first read** — A page like this usually buries the action under a feature grid. This one puts navigation, the headline, the announcement badge, the stats row and the background clip in a fixed sequence, with the action inside the first screen rather than after three scroll lengths. A fintech reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | Fintech |
| Frame | 2056x1396 · 1.47:1 |
| Clip length | 5.8s loop |
| Brief | 2,424 characters |
| Date | 2026-09-17 |
| Key tone | bright orange #FF8A00 |
| Type scale | Inter |
| Transitions | 0.3s transitions and a 5.8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2056x1396 capture before you generate.
2. Set your brand first: product name, the #FF8A00 accent and the headline that replaces the reference's.
3. Type the product name and the #FF8A00 accent before you touch the layout.
4. Drop your product name in, then replace #FF8A00 with your own accent and re-check the contrast.
5. Set the brand first: product name, the #FF8A00 accent and a headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/alumica-hero
原始 prompt：2424 字符
