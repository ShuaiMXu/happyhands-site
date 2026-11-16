# Network Hero

> Hero section reference for an agency or studio — 35ms transitions, #070319 base, a 640x472 frame and React and Vite.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Network Hero solves the hero section problem for an agency or studio with a single captured brief. “Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!” is the line the layout is built to carry. The palette is deep indigo #070319 underneath, white #FFFFFF for the type and indigo #A068FF carrying the accents, set in Inter. The reference is built with React and Vite, and the layout decisions are stated independently of it. Motion is 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1), kept quiet enough that the copy still leads. Keep it open while you write: the 7,543-character brief is the part that transfers to your own page.

## 主标题文案

> “Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Indigo | `#A068FF` | accent |
| Near-black | `#000000` | darkest |
| White | `#FFFFFF` | Headline |
| Near-black — lighter | `#070319` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 35ms, short enough that the page never feels like it is waiting for an animation.
- The accent is spent on indigo #A068FF and the rest of the composition holds deep indigo #070319.
- Accent and ground are both named (indigo #A068FF on deep indigo #070319), so a brand swap moves one value.

## 布局

**Navigation held to one row** — Wordmark, links and the #A068FF action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #A068FF action is the only element in the bar with any weight. Give the wordmark no more room than its type needs.

**Sizes fixed in the brief** — Sizes were read off the render at 640x472: 64px spacing steps, 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**Top row: wordmark, links, one action** — Test the bar over your own media before giving it a background. The reference was captured at 640x472.

**Values you can check** — Spacing is quoted the same way (64px spacing steps, 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing), not as a scale that grows on its own.


## 动效

**Short, named durations** — Motion in the controls is short and repeatable: 35ms on each state change. The values are short enough to read as feedback rather than as animation.

**One element arrives** — Entrance motion is spent on the page's own message rather than on the frame around it: a typewriter pass types the intro line. The entrance is confined to the elements it names, so the rest of the layout never animates.


## 可替换项

- Retune #A068FF for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Swap in your own headline where “Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!” sits and keep the line breaks, because the entrance animates per line.
- Replace #A068FF last, after the copy is final, and test it against #070319 at the smallest text size on the page.
- Swap #A068FF for your brand colour and re-check it against #070319, since the accent is the only place saturation is allowed.

## 文案规则

**Making the hero section yours** — Change the content first and check the frame afterwards. 64px spacing steps, 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing are the values to protect while you swap the copy. The subject is the part that should change.

**The timing behind the hero section** — Every transition here has a number attached. That is why 35ms transitions, a typewriter pass and per-character headline timing can be ported value by value instead of re-tuned by feel. Nothing animates for its own sake in this hero section.

**What an agency or studio gains here** — The design argues its case on one screen. The media is a still at 640x472. The media carries the atmosphere, the copy carries the offer, and 64px spacing steps and 35ms transitions keep the two apart. It gives a agency reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Field | Agencies & Studios |
| Format | 640x472 · 1.36:1 |
| Source text | 7,543 characters |
| Captured | 2026-09-17 |
| Accent | indigo #A068FF |
| Faces | Inter |
| Tech stack | React, Vite |
| Timing | 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing |

## 复刻步骤

1. Drop your product name in, then replace #A068FF with your own accent and re-check the contrast.
2. Set the brand first: product name, the #A068FF accent and a headline that replaces the reference's.
3. Type the product name and the #A068FF accent before you touch the layout.
4. Set your brand first: product name, the #A068FF accent and the headline that replaces the reference's.
5. Copy 64px spacing steps, 35ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/network-hero
原始 prompt：7543 字符
