# LTX Video

> Landing page reference for an AI or SaaS product — #FFD7E6 base, cubic-bezier(0.22, 1, 0.36, 1) easing, one self-contained HTML file and a stats row.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1400 · 比例 1.3714 · 7.8s

## 概述

Before rebuilding a landing page for an AI or SaaS product, read LTX Video: the composition and the specification behind it are both here. It leads with “The world model” and gives that line the frame rather than shrinking it into a card. The colour scheme is muted red #FFD7E6 underneath, deep blue #0B1A26 for the type and teal #7FE3FF carrying the accents, and the page is set in Manrope. Delivery is one self-contained HTML file, captured at 1920x1400 so the frame is fixed before any code is written. Motion is confined to 420ms transitions, cubic-bezier(0.22, 1, 0.36, 1) and a looping video bed. Keep it open while you write: the 21,298-character brief is the part that transfers to your own page.

## 主标题文案

> “The world model” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Teal | `#7FE3FF` | accent |
| Deep blue | `#0B1A26` | Headline |
| White | `#FFFFFF` | lightest |
| Muted red | `#FFD7E6` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Manrope | 18–23px | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 420ms, which is the value to keep when the palette changes.
- Media is specified at 1920x1400 and a 7.8s loop, so a replacement should match the crop and the loop length.
- Card widths come from the 5-column grid rather than from the copy, so the panels stay equal.

## 布局

**Navigation without a background** — The bar is the quietest part of the composition: wordmark, a short row of links and one #7FE3FF action, all held at the smallest type step in the brief. Below 700px the links collapse instead of wrapping onto a second line.

**The poster frame matters** — One muted, looping clip fills the frame at 1920x1400 and 7.8s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. The loop is short enough (7.8s) that the eye reads it as texture rather than as a timeline.

**Two faces, clear jobs** — The size steps and tracking in the brief are what give this its tone: Manrope at a tight display size, then a clear drop to the supporting copy. Tracking tightens as the size grows, which is why the display line holds together across 18–23px. The scale is quoted; use it.

**One row, no drawers** — Labels are short enough to fit one line at 700px, and the active item is marked with weight rather than with a pill.


## 动效

**It respects reduced-motion** — The motion layer has an off switch. Under prefers-reduced-motion, the entrance and the loop is dropped and everything else stays where it is. Interaction feedback still works under reduced motion; only the entrances are dropped. Test the page with motion disabled.

**Ambient motion without a scroll library** — Ambient movement is one 7.8s clip at 1920x1400, looping quietly behind the copy rather than reacting to the pointer. Nothing else on the page animates continuously, so the media is the only thing asking for attention.


## 可替换项

- Change #7FE3FF for your brand accent and re-check it against #FFD7E6, because the accent is the only saturated value in this composition.
- Replace “The world model” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Retune #7FE3FF for your brand only after the Manrope copy is final, and re-check the contrast on the darkest band.
- Keep the supporting line as short as the reference's and measure the pair against the 1920x1400 crop.

## 文案规则

**The order behind the landing page** — The page has a deliberate order. Navigation establishes the product and gives a returning visitor a familiar way around. The headline takes the display size, the supporting line explains the offer, and the teal #7FE3FF accent marks the primary action, so the next step is never in question. Nothing else competes: there is no card grid before the first decision, which is what keeps the landing page from feeling heavy in SaaS work. A SaaS reader gets the offer before the options.

**Why this composition works for SaaS** — Count the decisions in this landing page and they trace back to one document: 21,298 characters naming the frame at 1920x1400, the type and the rhythm. LTX Video states the offer once and lets the composition repeat it rather than adding a second claim.

**How the landing page reflows** — If your breakpoints were chosen to make things fit rather than to change the layout, read this entry. the type is clamped between 18px and 23px, the layout shifts at 700px and the section is held at 100vh rather than a list of hidden elements. The order is the last thing to change.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Category | AI & SaaS |
| Frame | 1920x1400 · 1.37:1 |
| Loop length | 7.8s loop |
| Brief | 21,298 characters |
| Captured | 2026-09-17 |
| Accent hex | teal #7FE3FF |
| Fonts | Manrope · 18–23px |
| Tools | vanilla JS, single HTML file |
| Animation | 420ms transitions, cubic-bezier(0.22, 1, 0.36, 1) easing and a 7.8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1400 capture before you generate.
2. Set the brand first: product name, the #7FE3FF accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #7FE3FF with your own accent and re-check the contrast.
4. Set your brand first: product name, the #7FE3FF accent and the headline that replaces the reference's.
5. Type the product name and the #7FE3FF accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/ltx-video
原始 prompt：21298 字符
