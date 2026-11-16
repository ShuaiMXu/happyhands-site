# Rare Gallery

> Portfolio reference for an agency or studio — 400ms transitions, looping video, Instrument Serif and React and Tailwind CSS.

- 行业：Agencies & Studios（creative）
- 区块：Portfolio
- 画布：1920x1414 · 比例 1.3579 · 6.925s

## 概述

Rare Gallery keeps its decision trail: the brief that produced this portfolio page runs 4,964 characters. “A carefully curated collection beyond compare” is the line the layout is built to carry. The palette runs deep lime #222518 underneath, and the type is Instrument Serif. Delivery is React and Tailwind CSS, captured at 1920x1414 so the frame is fixed before any code is written. The brief spends its motion budget on 400ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Start from the captured brief, then edit the portfolio page rather than rebuilding it from scratch.

## 主标题文案

> “A carefully curated collection beyond compare” — the whole portfolio is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#020202` | darkest |
| Muted red | `#AD948C` | lightest |
| Near-black — lighter | `#070804` | panel edges |
| Deep lime | `#222518` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display tone |

## 视觉要点

- Nothing sits between the type and the 1920x1414 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1920x1414 and a 6.9s loop, so the composition has a single media dependency.
- Media is specified at 1920x1414 and a 6.9s loop, so a replacement should match the crop and the loop length.

## 布局

**A navigation bar that gets out of the way** — The bar overlays the portfolio page instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1920x1414 composition without a background of its own, so the media runs edge to edge underneath it.

**Measured, not eyeballed** — The brief states its sizes at capture (64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), so a rebuild can be verified instead of approximated. There is no invented intermediate value between the named ones; the measurement list is the whole system. Port the values with the layout.

**Badge above the fold** — One badge, one message: the pill sits above the headline in Instrument Serif at the smallest step, and nothing else competes for that slot. There is one announcement only, which is what makes the badge feel like news. Remove it when the news is old.

**One field, one action** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. The action sits directly under the last field, so the decision is never more than a glance away. One column, one action.


## 动效

**Ambient motion without a scroll library** — Ambient movement comes from the 6.9s 1920x1414 loop rather than from scroll effects, which keeps the page calm and the type readable. The clip is muted and inline, so the first frame is available without an interaction.

**Hover where it means something** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. Press states are specified as well as hover, so a tap gives the same confirmation as a click.


## 可替换项

- Retime the entrance to taste. 400ms with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Hold the portfolio page to one screen on desktop; the brief never asks the reader to scroll past the fold.
- Write the replacement headline first, then confirm it still fits the 1920x1414 frame at the reference's type size.
- Swap the clip for your own. Export at 1920x1414 or wider, keep it muted, and make the 6.9s loop seamless so the cut is invisible.

## 文案规则

**Making the portfolio page yours** — One line, one font, one accent: those three substitutions change the design most. 64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing are the values that should not move. Rewrite the display line before you touch the colour.

**What moves in Rare Gallery** — Motion here is a set of decisions, not a library: 400ms transitions, a 6.9s media loop and hover and press states, and nothing animates on scroll. The result is a page that feels authored: short durations, one entrance, and state changes that confirm an action rather than decorate it. Nothing animates for its own sake in this portfolio page.

**How Rare Gallery sequences the first read** — Read the first screen in one pass and the offer is already clear. navigation, the headline, the announcement badge, the form and the background clip arrive in sequence, separated by 64px spacing steps and 400ms transitions rather than by decorative dividers. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Section | Portfolio |
| Sector | Agencies & Studios |
| Frame | 1920x1414 · 1.36:1 |
| Runtime | 6.9s loop |
| Brief | 4,964 characters |
| Date | 2026-09-17 |
| Typefaces | Instrument Serif |
| Tech stack | Tailwind CSS, React, TypeScript |
| Transitions | 400ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1414 capture before you generate.
2. Keep the measurements the brief spells out: 64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
3. Check your build against the reference measurements: 64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
4. Pin the reference measurements before you restyle anything: 64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
5. Copy 64px spacing steps, 400ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/rare-gallery
原始 prompt：4964 字符
