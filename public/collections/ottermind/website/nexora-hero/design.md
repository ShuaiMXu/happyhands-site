# Nexora Automation

> Hero section reference for an AI or SaaS product — 0.6s transitions, a 800x552 frame, glass panels and React and Tailwind CSS.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x552 · 比例 1.4493 · 6.86s

## 概述

Nexora Automation was captured at 800x552 and kept as a specification rather than as a gallery image. The headline reads “Now with GPT-5 support ✨”, and the rest of the hero section is arranged around it. Colour is limited to white #FFFFFF underneath and deep teal #092128 for the type, set in Instrument Serif. Delivery is React and Tailwind CSS, captured at 800x552 so the frame is fixed before any code is written. The brief spends its motion budget on 0.6s transitions. Keep it open while you write: the 5,344-character brief is the part that transfers to your own page.

## 主标题文案

> “Now with GPT-5 support ✨” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep teal | `#092128` | Headline |
| White | `#FFFFFF` | composition |
| Deep teal — lighter | `#1C3A38` | darker step |
| White — darker | `#F8F9F8` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display tone |
| Inter | Weight not fixed in the brief | Body copy |

## 视觉要点

- The reference was captured at 800x552, and every value quoted on this page comes from the same brief.
- Transitions are specified at 0.6s, which is the value to keep when the palette changes. Transitions are specified at 0.6s, short enough that the page never feels like it is waiting for an animation.

## 布局

**The nav is deliberately thin** — The bar overlays the hero section instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 800x552 composition without a background of its own, so the media runs edge to edge underneath it.

**Tracking tightens as it grows** — The type is Instrument Serif at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. Tracking is set per size, so the display line and the caption do not share one letter-spacing value. One face, clear roles.

**One row, no drawers** — A short run of links and a single action sit over the hero section, held at 100vh sections and 25px spacing steps so the bar never competes with the composition behind it.

**Numbers carried into the build** — Sizes were read off the render at 800x552: 100vh sections, 25px spacing steps and 0.6s transitions. The type and the layout share the same steps, so nothing drifts when one of them is substituted.


## 动效

**Short, matched timings** — Motion in the controls is short and repeatable: 0.6s on each state change. Easing is specified alongside the duration (0.6s), so a rebuild cannot quietly substitute a different feel.

**A small interactive surface** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element.


## 可替换项

- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 800x552 frame.
- Change the copy first, then the accent, then the media: the 800x552 frame was solved in that order and reversing it costs a re-layout.
- Write the replacement headline first, then confirm it still fits the 800x552 frame at the reference's type size.
- Replace “Now with GPT-5 support ✨” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**How Nexora Automation sequences the first read** — Read the first screen in one pass and the offer is already clear. navigation, the headline, the announcement badge, the stats row and the card grid arrive in sequence, separated by 100vh sections and 25px spacing steps rather than by decorative dividers. A SaaS reader gets the offer before the options.

**How the hero section reflows** — You cannot fix a narrow screen by shrinking it. This brief handles the change in the type and the navigation instead: the section is held at 100vh. The hierarchy is what survives the reflow.

**What moves in Nexora Automation** — Motion is limited to 0.6s transitions and hover and press states; it runs once on entry and then gets out of the way, which is the right budget for the hero section to stay readable. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Industry | AI & SaaS |
| Canvas | 800x552 · 1.45:1 |
| Input brief | 5,344 characters |
| Captured | 2026-09-17 |
| Typefaces | Instrument Serif, Inter |
| Built with | Tailwind CSS, React, Framer Motion |
| Transitions | 0.6s transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x552 capture before you generate.
2. Copy 100vh sections, 25px spacing steps and 0.6s transitions into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: 100vh sections, 25px spacing steps and 0.6s transitions.
4. Pin the reference measurements before you restyle anything: 100vh sections, 25px spacing steps and 0.6s transitions.
5. Check your build against the reference measurements: 100vh sections, 25px spacing steps and 0.6s transitions.

---
来源：https://ottermind.ai/explore/website/nexora-hero
原始 prompt：5344 字符
