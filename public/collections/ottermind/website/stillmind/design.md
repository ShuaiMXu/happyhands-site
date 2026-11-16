# Stillmind

> Hero section reference for a health or wellbeing product — a dark stage, 1000ms transitions, cubic-bezier(0.4,0,0.2,1) easing and looping video.

- 行业：Health（health）
- 区块：Hero section
- 画布：1472x1080 · 比例 1.363 · 6.167s

## 概述

This is the hero section from Stillmind, published with the brief that produced it rather than as a screenshot. The colour scheme is deep red #48292F underneath and deep blue #182C41 carrying the accents, and the page is set in Instrument Serif. Delivery is React and Tailwind CSS, captured at 1472x1080 so the frame is fixed before any code is written. The motion budget is 1000ms transitions, cubic-bezier(0.4,0,0.2,1) and a looping video bed. Treat it as the brief for a health or wellbeing product hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference built on deep red #48292F and deep blue #182C41, set in Instrument Serif and measured against 1000ms transitions.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep blue | `#182C41` | accent |
| Deep magenta | `#20141B` | darkest |
| Muted orange | `#C4ACA4` | lightest |
| Deep red | `#48292F` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Display |

## 视觉要点

- Nothing sits between the type and the 1472x1080 clip, so a replacement has to work under the copy directly.
- The accent is spent on deep blue #182C41 and the rest of the composition holds deep red #48292F.
- The clip is one asset at 1472x1080 and a 6.2s loop, so the composition has a single media dependency.

## 布局

**Navigation held to one row** — The bar carries the wordmark, the section links and one #182C41 button, measured at 1000ms transitions and cubic-bezier(0.4,0,0.2,1) easing so it never grows into a second header. The links are set below the wordmark in size, and the #182C41 action is the only element in the bar with any weight.

**The poster frame matters** — A 6.2s clip at 1472x1080 does the atmospheric work; the brief fixes its crop and leaves the type untouched on top of it. A poster frame at 1472x1080 holds the composition when autoplay is unavailable, so the layout never collapses. Export at 1472x1080 or wider to keep the crop honest.

**The type carries the tone** — Type is the styling system here: Instrument Serif at the display size, the same face across the interface, and no second accent colour doing the work. Numerals share the interface face, so statistics and labels belong to the same system.

**Top row, one action** — The bar sits over the 1472x1080 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Pointer states, nothing more** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. Each state changes one property, which keeps the feedback legible. If a state does not confirm an action, drop it.

**Timings in milliseconds** — The controls resolve in 1000ms, fast enough that the page answers as it is touched rather than after it. The durations are short enough that feedback reads as a response rather than as an animation.


## 可替换项

- Retime the entrance to your own 1000ms, but keep cubic-bezier(0.4,0,0.2,1) as the curve, because the easing is what reads as this design.
- Read the brief value by value against the 1472x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Recut your footage to the 6.2s loop, then export at 1472x1080 so the crop the reference specifies survives.
- Draft the new copy to the 1472x1080 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**The numbers behind the hero section** — The brief is a specification, not a mood board. It fixes 1000ms transitions and cubic-bezier(0.4,0,0.2,1) easing, and it names the media at 1472x1080 and a 6.2s loop. That level of detail is why the design survives a rebuild: change the copy and the relationships still hold. Nothing in this hero section depends on a default.

**How Stillmind sequences the first read** — One screen, one action, and navigation, the announcement badge, the stats row, the feature list and the background clip between them. The brief fixes that order rather than leaving the first screen to a stack of sections. A health reader gets the offer before the options.

**The timing behind the hero section** — A short motion budget costs you drama on the first frame. It buys legibility, and it means 1000ms transitions, a 6.2s media loop and hover and press states can be ported without a library. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Industry | Health |
| Canvas size | 1472x1080 · 1.36:1 |
| Loop | 6.2s loop |
| Brief | 6,025 characters |
| Captured | 2026-09-17 |
| Key tone | deep blue #182C41 |
| Type | Instrument Serif |
| Tools | Tailwind CSS, React, TypeScript |
| Timing | 1000ms transitions, cubic-bezier(0.4,0,0.2,1) easing and a 6.2s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1472x1080 capture before you generate.
2. Set the brand first: product name, the #182C41 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #182C41 with your own accent and re-check the contrast.
4. Type the product name and the #182C41 accent before you touch the layout.
5. Set your brand first: product name, the #182C41 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/stillmind
原始 prompt：6025 字符
