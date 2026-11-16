# Cybersecurity Hero

> Hero section reference for an AI or SaaS product — a logo row, fluid type, a dark stage and Inter.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Before rebuilding a hero section for an AI or SaaS product, read Cybersecurity Hero: the composition and the specification behind it are both here. The palette is #0A0A0F underneath and tint #B04090 carrying the accents, set in Inter. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The page keeps its motion to 300ms transitions and cubic-bezier(0.4, 0, 0.2, 1). Keep it open while you write: the 11,920-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built on #0A0A0F and tint #B04090, set in Inter and measured against 12px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0A0F` | background |
| Tint | `#C8A0E0` | Primary |
| Tint — darker | `#B04090` | accent |
| Near-black — lighter | `#111118` | panels |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 / 700 / 800 | Headline and interface text — one face for the whole page |

## 视觉要点

- Corner treatment is specified in the brief: 20px and 999px.
- The layout shifts at max-width 440px and max-width 620px, so the narrow composition is designed rather than inherited.
- Panel corners reuse the radius list in the brief (20px and 999px), so the grid needs no separate treatment.

## 布局

**A bar with nothing spare** — Wordmark, links and the #B04090 action share one baseline, which is what keeps a thin row from looking accidental. Labels are short enough to fit one line at 440px, and the active item is marked with weight rather than with a pill.

**One family, two roles** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Numerals share the interface face, so statistics and labels belong to the same system. The scale is quoted; use it.

**Logo strip on the baseline** — The client marks run along the lower edge at low contrast and at the smallest step in the brief, so the proof reads as texture on the hero section and never competes with the headline. The row is aligned to the same baseline as the rest of the composition. One row, one baseline. The reference was captured at 640x472.

**Links collapse at one width** — Below 440px the links collapse instead of wrapping onto a second line.


## 动效

**Timing kept in the brief** — Hover, press and focus all resolve in 300ms, which is what makes the interface feel immediate. If the easing changes, the duration has to be revisited with it.

**The controls are the interactive layer** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. Feedback is limited to the controls, so the composition stays still around them. A few reliable states beat a long list of effects.


## 可替换项

- Move #B04090 to your own hue and leave #0A0A0F where it is; the distance between them is doing the hierarchy work.
- Retint #B04090 toward your palette but keep the step against #0A0A0F; flatten the two and the primary action stops reading.
- Retune #B04090 for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Change the copy before the colour: rewrite the Inter paragraphs first, then check #B04090 against the media behind them.

## 文案规则

**What holds up for AI & SaaS** — Most SaaS pages fail by adding: more sections, more gradients, more claims. Cybersecurity Hero goes the other way. The composition stays on #0A0A0F with tint #B04090 for actions, which is enough to look deliberate. It gives a SaaS reader the shortest honest route to the offer.

**The order behind the hero section** — Read it in order: navigation, the announcement badge, the stats row, the client row and the card grid. Each element has one job, and the tint #B04090 accent is spent only on the element you are meant to press. A SaaS reader gets the offer before the options.

**The timing behind the hero section** — Ambitious motion usually costs the first screen its legibility. This brief keeps 300ms transitions and hover and press states short enough that the type never has to wait. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | AI & SaaS |
| Canvas size | 640x472 · 1.36:1 |
| Prompt text | 11,920 characters |
| Saved | 2026-09-17 |
| Key colour | tint #B04090 |
| Type | Inter |
| Tools | Tailwind CSS, React, TypeScript |
| Motion spec | 300ms transitions and cubic-bezier(0.4, 0, 0.2, 1) easing |

## 复刻步骤

1. Drop your product name in, then replace #B04090 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #B04090 accent and a headline that replaces the reference's.
3. Type the product name and the #B04090 accent before you touch the layout.
4. Set your brand first: product name, the #B04090 accent and the headline that replaces the reference's.
5. Pin the reference measurements before you restyle anything: 20px corners, 12px spacing steps and 300ms transitions.

---
来源：https://ottermind.ai/explore/website/cybersecurity-hero
原始 prompt：11920 字符
