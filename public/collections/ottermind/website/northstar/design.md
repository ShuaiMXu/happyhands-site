# Northstar

> Landing page reference for an agency or studio — #F0DAC8 accent, Instrument Serif, a 1280x956 frame and #1D8FB8 base.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：1280x956 · 比例 1.3389 · 0s

## 概述

Northstar shows one way to build the landing page for an agency or studio, and publishes the instructions that produced it. Colour is limited to teal #1D8FB8 underneath, white #EEF2F3 for the type and muted orange #F0DAC8 carrying the accents, set in Instrument Serif. The reference is built with vanilla JS, and the layout decisions are stated independently of it. Motion is limited to 580ms transitions and cubic-bezier(.16,1.3,1). Keep it open while you write: the 11,589-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on teal #1D8FB8 and muted orange #F0DAC8, set in Instrument Serif and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Teal | `#1D8FB8` | composition |
| White | `#EEF2F3` | Headline |
| Black | `#3F3F3C` | darkest |
| Muted orange | `#F0DAC8` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display face |
| Plus Jakarta Sans | Weight not fixed in the brief | Text face |

## 视觉要点

- Transitions are specified at 580ms, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (580ms), so a slower rebuild reads as a different design.
- Accent and ground are both named (muted orange #F0DAC8 on teal #1D8FB8), so a brand swap moves one value.

## 布局

**A bar with nothing spare** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #F0DAC8 action, all of it sitting above the landing page without a background of its own. The links are set below the wordmark in size, and the #F0DAC8 action is the only element in the bar with any weight.

**Every measurement is written down** — The values are the specification: 100vh sections, 14px spacing steps, 580ms transitions and cubic-bezier(.16,1.3,1) easing, captured at 1280x956 rather than inferred from a screenshot. Spacing is quoted in the same units as the type, so the two can be compared directly. Substitute the face or the copy, not the scale.

**Tracking tightens as it grows** — Typography is Instrument Serif, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. The caption step is small enough to sit under a figure without changing the rhythm of the page.

**Top row, one action** — The bar sits over the 1280x956 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Interaction is on the controls** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Press states are specified as well as hover, so a tap gives the same confirmation as a click. Keep the interactive layer small.

**The reveal is the memory point** — Movement is concentrated in one behaviour (each line rises out of an overflow-hidden window), so the page never reads as a repertoire of effects. Under reduced motion the element simply appears and the layout is unchanged.


## 可替换项

- Read the brief value by value against the 1280x956 capture before you edit anything; the numbers are the part that is easiest to lose.
- Keep 1280x956 for the media and re-crop your own asset into it rather than resizing the frame.
- Retune #F0DAC8 for your brand only after the Instrument Serif copy is final, and re-check the contrast on the darkest band.
- Change #F0DAC8 for your brand accent and re-check it against #1D8FB8, because the accent is the only saturated value in this composition.

## 文案规则

**How Northstar sequences the first read** — When a agency reader lands on a single screen, they scan before they read. The layout answers that: navigation, the headline, the stats row, the background clip and the footer are sized to be scanned, with 100vh sections and 14px spacing steps keeping each stop distinct. A agency reader gets the offer before the options.

**What holds up for Agencies & Studios** — Northstar works because its hierarchy is decided rather than decorated. The brief sets 100vh sections, 14px spacing steps, 580ms transitions and cubic-bezier(.16,1.3,1) easing, so new copy lands inside the frame instead of reopening it. It gives a agency reader the shortest honest route to the offer.

**Making the landing page yours** — Most people start with the accent colour. Start with the promise instead: rewrite the display line, then re-test muted orange #F0DAC8 against your own media. A different brand can reuse the whole frame.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Industry | Agencies & Studios |
| Frame | 1280x956 · 1.34:1 |
| Prompt | 11,589 characters |
| Saved | 2026-09-17 |
| Accent | muted orange #F0DAC8 |
| Typefaces | Instrument Serif, Plus Jakarta Sans |
| Reference stack | vanilla JS |
| Timing | 580ms transitions and cubic-bezier(.16,1.3,1) easing |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1280x956 capture before you generate.
2. Set the brand first: product name, the #F0DAC8 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #F0DAC8 with your own accent and re-check the contrast.
4. Set your brand first: product name, the #F0DAC8 accent and the headline that replaces the reference's.
5. Type the product name and the #F0DAC8 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/northstar
原始 prompt：11589 字符
