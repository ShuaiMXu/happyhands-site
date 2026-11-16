# Email Marketing

> Hero section reference for an AI or SaaS product — a stats row, a 800x702 frame, #D8F90A accent and Instrument Serif.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x702 · 比例 1.1396 · 7.42s

## 概述

Email Marketing shows one way to build the hero section for an AI or SaaS product, and publishes the instructions that produced it. It leads with “Design Rocket Certificates” and gives that line the frame rather than shrinking it into a card. The colour scheme is black #0A0A0A underneath, bright yellow #DCFF00 for the type and bright yellow #D8F90A carrying the accents, and the page is set in Instrument Serif. Delivery is React and Tailwind CSS, captured at 800x702 so the frame is fixed before any code is written. Keep it open while you write: the 7,972-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “Design Rocket Certificates”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1E1E1E` | panel edges |
| Bright yellow | `#DCFF00` | Headline |
| Near-black — darker | `#0A0A0A` | composition |
| Bright yellow — darker | `#D8F90A` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | 400 / 500 / 600 / 700 | Display and headline — the editorial voice of the page |
| Inter | 400 / 500 / 600 / 700 | Copy face |

## 视觉要点

- Accent and ground are both named (bright yellow #D8F90A on black #0A0A0A), so a brand swap moves one value.
- The type is set in Instrument Serif on a 12–58px scale, and the spacing follows the same steps.
- Font roles are assigned rather than mixed here, and 12–58px is the range the whole scale works in.

## 布局

**Values you can check** — The brief names the numbers: type from 12px to 58px and 18px spacing steps. That is why the composition holds together, because there is no invented spacing step between the type and the frame. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. Substitute the face or the copy, not the scale.

**Numbers on the baseline** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #D8F90A or the ink colour rather than a coloured card. The figures carry the #D8F90A accent while everything around them stays on the ink colour. Match the label size to the caption step.

**Cards do the structuring** — Where a run of copy would go, this page puts a set of panels, which is what keeps the hero section scannable. Panels share the interface face at one size, which keeps the grid from becoming a second layout. One idea per panel.

**One scale for type and frame** — Spacing is quoted the same way (type from 12px to 58px and 18px spacing steps), not as a scale that grows on its own.


## 动效

**Hover, but sparingly** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. A control that looks interactive behaves interactively, so there are no false affordances. Check the states on a touch device.

**Static by design** — The brief leaves animation out and lets the 800x702 layout carry the page, with hover and press states the only changes. There is no animation library in the brief, which keeps the rebuild small. No scroll timelines needed.


## 可替换项

- Swap in your own headline where “Design Rocket Certificates” sits and keep the line breaks, because the entrance animates per line.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 800x702.
- Swap #D8F90A for your brand colour and re-check it against #0A0A0A, since the accent is the only place saturation is allowed.
- Keep the supporting line as short as the reference's and measure the pair against the 800x702 crop.

## 文案规则

**Why this composition works for SaaS** — There is one promise on this page, and type from 12px to 58px and 18px spacing steps hold it in place. “Design Rocket Certificates” is doing that work from the first frame. Nothing below the fold is asked to carry the offer as well. It gives a SaaS reader the shortest honest route to the offer.

**How the hero section reflows** — Type is clamped rather than stepped here (a clamp between 12px and 58px), so the display line does not jump between widths. The hierarchy is what survives the reflow.

**How Email Marketing sequences the first read** — The page has a deliberate order. The headline takes the display size, the supporting line explains the offer, and the bright yellow #D8F90A accent marks the primary action, so the next step is never in question. Nothing else competes: there is no card grid before the first decision, which is what keeps the hero section from feeling heavy in SaaS work. A SaaS reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Vertical | AI & SaaS |
| Canvas size | 800x702 · 1.14:1 |
| Prompt text | 7,972 characters |
| Archived | 2026-09-17 |
| Accent tone | bright yellow #D8F90A |
| Faces | Instrument Serif, Inter · 12–58px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x702 capture before you generate.
2. Drop your product name in, then replace #D8F90A with your own accent and re-check the contrast.
3. Set the brand first: product name, the #D8F90A accent and a headline that replaces the reference's.
4. Set your brand first: product name, the #D8F90A accent and the headline that replaces the reference's.
5. Type the product name and the #D8F90A accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/design-rocket-email-hero
原始 prompt：7972 字符
