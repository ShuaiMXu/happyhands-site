# Impact Ventures

> Hero section reference for a fintech product — 700ms transitions, React and Tailwind CSS, Instrument Serif and cubic-bezier(0.76,0,0.24,1) easing.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Impact Ventures solves the hero section problem for a fintech product with a single captured brief. The page's own headline reads “We shape digital products that define brands”, and the composition is built around those exact words. The palette runs blue #2D64B0 underneath and white #C5D5DE for the type, and the type is Instrument Serif. Delivery is React and Tailwind CSS, captured at 640x472 so the frame is fixed before any code is written. Motion is confined to 700ms transitions and cubic-bezier(0.76,0,0.24,1). Use it as the reference when you are building a fintech product hero section and want a finished composition instead of a starting point.

## 主标题文案

> “We shape digital products that define brands” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep blue | `#263349` | darkest |
| White | `#C5D5DE` | Headline |
| Blue | `#2351A4` | saturated |
| Blue — lighter | `#2D64B0` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | 300 / 400 / 500 / 600 | Display and headline — the editorial voice of the page |
| Inter | 300 / 400 / 500 / 600 | Text face |

## 视觉要点

- Transitions are specified at 700ms, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 700ms, which is the value to keep when the palette changes. The reference was captured at 640x472, and every value quoted on this page comes from the same brief.

## 布局

**Navigation without a background** — A slim bar sits over the hero section with the wordmark on the left and the links set in Instrument Serif, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 640x472 composition without a background of its own, so the media runs edge to edge underneath it.

**Every measurement is written down** — The list stays short (700ms transitions and cubic-bezier(0.76,0,0.24,1) easing), which is why the whole system can be checked by hand. Values are quoted from the captured prompt rather than inferred, so they survive a re-render.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The accent is reused on one footer action rather than across the whole band.

**One row, no drawers** — Give the wordmark no more room than its type needs. The reference was captured at 640x472.


## 动效

**Hover, but sparingly** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. The states are drawn from the page's own palette rather than from a component default.

**Timing kept in the brief** — The brief fixes the transition value at 700ms, so a rebuild cannot substitute a slower default. Focus states are timed with the same value as hover, so keyboard and pointer feedback match. Fast state changes, no scroll timelines.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 640x472 crop.
- Set 700ms to your own build speed and check that cubic-bezier(0.76,0,0.24,1) still lands the copy before the media starts.
- Replace “We shape digital products that define brands” with your own line and keep the word count, because the entrance is timed per line.

## 文案规则

**What a fintech product gains here** — Where a template fills the fold with modules, this hero section uses navigation, the stats row, the feature list, the background clip and the footer and stops. The difference shows in 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing: nothing is padded to fill space. Impact Ventures states the offer once and lets the composition repeat it rather than adding a second claim.

**How Impact Ventures sequences the first read** — Nothing here competes with the first decision. The page says it out loud: “We shape digital products that define brands”. The supporting material waits below the fold, and navigation, the stats row, the feature list, the background clip and the footer carry the top of the page alone. A fintech reader gets the offer before the options.

**How the hero section reflows** — The narrow layout is designed, not inherited. the navigation collapses into a mobile menu at each width, so the hierarchy survives the reflow. Nothing important is dropped at narrow widths.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | Fintech |
| Viewport | 640x472 · 1.36:1 |
| Input brief | 4,400 characters |
| Saved | 2026-09-17 |
| Fonts | Instrument Serif, Inter |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Animation | 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing |

## 复刻步骤

1. Copy 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing into your own brief before you rewrite anything else.
2. Keep the measurements the brief spells out: 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing.
3. Check your build against the reference measurements: 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing.
4. Pin the reference measurements before you restyle anything: 700ms transitions and cubic-bezier(0.76,0,0.24,1) easing.
5. Port the motion last: the entrance, the 700ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/impact-ventures
原始 prompt：4400 字符
