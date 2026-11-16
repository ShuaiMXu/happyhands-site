# Datacore Booking

> Hero section reference for an AI or SaaS product — a 800x553 frame, React and Tailwind CSS, #171717 base and glass panels.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x552 · 比例 1.4493 · 7.84s

## 概述

Datacore Booking shows one way to build the hero section for an AI or SaaS product, and publishes the instructions that produced it. The headline reads “Book your perfect stay instantly and hassle-free”, and the rest of the hero section is arranged around it. Colour is limited to black #171717 underneath, gray #D4D4D4 for the type and bright indigo #7B39FC carrying the accents, set in Manrope. Delivery is React and Tailwind CSS, captured at 800x553 so the frame is fixed before any code is written. Keep it open while you write: the 2,826-character brief is the part that transfers to your own page.

## 主标题文案

> “Book your perfect stay instantly and hassle-free” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright indigo | `#7B39FC` | accent |
| Deep indigo | `#2B2344` | panel edges |
| Gray | `#D4D4D4` | Headline |
| Near-black | `#171717` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Manrope | Weight not fixed in the brief | Interface |
| Instrument Serif | Weight not fixed in the brief | Emphasis |
| Inter | Weight not fixed in the brief | Body copy |

## 视觉要点

- Accent and ground are both named (bright indigo #7B39FC on black #171717), so a brand swap moves one value.
- The accent is spent on bright indigo #7B39FC and the rest of the composition holds black #171717.
- Accent use is limited to bright indigo #7B39FC; everything else sits on black #171717.

## 布局

**Links before the action** — The top row holds the wordmark, four to five links and a single action tinted #7B39FC, sized to stay quiet against the rest of the page. A mobile overlay takes over below the tablet breakpoint. The links are set below the wordmark in size, and the #7B39FC action is the only element in the bar with any weight.

**The sizes are in the brief, not in a scale** — Nothing here is eyeballed. The spec fixes 14px spacing steps, and the rest of the layout derives from those values. A rebuild that hits those numbers looks like the reference without further tuning. Where the brief is silent, it is silent on purpose.

**Type sets the hierarchy** — Typography is Manrope, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. Substituting the face is possible, but the proportions have to survive the swap.

**The nav is deliberately thin** — The bar sits over the 800x553 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Hover where it means something** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Hover and focus are specified together, so the pointer and the keyboard get the same information.

**Motion that stays out of the way** — There is no scroll library here: the 800x553 composition holds still and only the elements that respond to you move. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 800x553 crop.
- Change the copy before the colour: rewrite the Manrope paragraphs first, then check #7B39FC against the media behind them.
- Change the copy first, then the accent, then the media: the 800x553 frame was solved in that order and reversing it costs a re-layout.
- Move #7B39FC to your own hue and leave #171717 where it is; the distance between them is doing the hierarchy work.

## 文案规则

**What an AI or SaaS product gains here** — Most SaaS pages fail by adding: more sections, more gradients, more claims. Datacore Booking goes the other way. The page says it out loud: “Book your perfect stay instantly and hassle-free”. The composition stays on black #171717 with bright indigo #7B39FC for actions, which is enough to look deliberate. Datacore Booking states the offer once and lets the composition repeat it rather than adding a second claim.

**How the hero section reflows** — A fixed desktop scale would have been easier. The brief adds a clamp between 96px and 14px, which is what keeps the display line proportionate between widths. The scale changes with the viewport; the sequence does not.

**How Datacore Booking sequences the first read** — The page has a deliberate order. Navigation establishes the product and gives a returning visitor a familiar way around. The headline takes the display size, the supporting line explains the offer, and the bright indigo #7B39FC accent marks the primary action, so the next step is never in question. Nothing else competes: there is no card grid before the first decision, which is what keeps the hero section from feeling heavy in SaaS work. A SaaS reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Category | AI & SaaS |
| Canvas size | 800x553 · 1.45:1 |
| Prompt | 2,826 characters |
| Archived | 2026-09-17 |
| Key colour | bright indigo #7B39FC |
| Type | Manrope, Instrument Serif, Inter |
| Reference stack | Tailwind CSS, React |
| Timing | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x553 capture before you generate.
2. Set the brand first: product name, the #7B39FC accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #7B39FC with your own accent and re-check the contrast.
4. Set your brand first: product name, the #7B39FC accent and the headline that replaces the reference's.
5. Type the product name and the #7B39FC accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/datacore-booking-hero
原始 prompt：2826 字符
