# Vinyl

> Landing page reference for a lifestyle brand — looping video, one self-contained HTML file, a dark stage and a masked headline reveal.

- 行业：Lifestyle（lifestyle）
- 区块：Landing page
- 画布：1920x1420 · 比例 1.3521 · 6.6s

## 概述

Before rebuilding a landing page for a lifestyle brand, read Vinyl: the composition and the specification behind it are both here. The palette runs sky #DBE6EE underneath and #0B0B0C for the type, and the type is Instrument Serif. The entry names the stack that produced the page (one self-contained HTML file) rather than hiding it. The brief spends its motion budget on 1.2s transitions, cubic-bezier(.22,1.36,1) and a looping video bed. Use it as the reference when you are building a lifestyle brand landing page and want a finished composition instead of a starting point.

## 主标题文案

> Landing page reference for a lifestyle brand, captured at 1920x1420 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Sky | `#DBE6EE` | composition |
| Near-black | `#0B0B0C` | Headline |
| Black | `#1E1E21` | darker step |
| Deep green | `#152014` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Title face |
| UnifrakturCook | Weight not fixed in the brief | Body face |

## 视觉要点

- Transitions are specified at 1.2s, short enough that the page never feels like it is waiting for an animation.
- The clip is one asset at 1920x1420 and a 6.6s loop, so the composition has a single media dependency.
- Transitions are specified at 1.2s, which is the value to keep when the palette changes.

## 布局

**Top row: wordmark, links, one action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Instrument Serif so the bar belongs to the page below rather than to a separate system. Below 380px the links collapse instead of wrapping onto a second line.

**A clip, not an illustration** — One 6.6s asset carries the whole first screen, and the page has no second media element to keep in sync. A poster frame at 1920x1420 holds the composition when autoplay is unavailable, so the layout never collapses.

**The scale is clamped, not stepped** — The top of the scale is fluid (a clamp between 24px and 22px) and the rest is fixed, so the frame stays composed as the viewport narrows. The type changes size, not role, as the viewport narrows. Check the first screen on a phone.

**A bar with nothing spare** — Design the collapsed state before adding a sixth link. The reference was captured at 1920x1420.


## 动效

**Motion on the copy only** — A masked line reveal carries the first screen. The composition is static underneath it, so the movement reads as the page assembling itself rather than as decoration. Under reduced motion the element simply appears and the layout is unchanged. Copy the intent, not the exact curve; the point is the order of arrival.

**Short, named durations** — Hover, press and focus all resolve in 1.2s, which is what makes the interface feel immediate. Easing is specified alongside the duration (1.2s), so a rebuild cannot quietly substitute a different feel. If you change the easing, change it everywhere.


## 可替换项

- Replace the video with a still at 1920x1420 if the 6.6s loop is too heavy for the page you are shipping.
- Hold the 1920x1420 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Swap the clip for your own. Export at 1920x1420 or wider, keep it muted, and make the 6.6s loop seamless so the cut is invisible.
- Recut your footage to the 6.6s loop, then export at 1920x1420 so the crop the reference specifies survives.

## 文案规则

**The numbers behind the landing page** — Almost every decision here is a value you can check: 100vh sections, 22px spacing steps, 1.2s transitions, cubic-bezier(.22,1.36,1) easing and a 380px breakpoint. The media is a 6.6s 1920x1420 loop. The type stays in Instrument Serif, so a substitution has to keep the same proportions. Nothing in this landing page depends on a default.

**The timing behind the landing page** — Port the motion last. The brief fixes it as 1.2s transitions, a 6.6s media loop and a masked line reveal, which is easier to match once the layout is in place. Nothing animates for its own sake in this landing page.

**Making the landing page yours** — The composition is the reusable part and the subject is yours. Keep 100vh sections and 22px spacing steps and replace the words, the media and the brand marks. If a new element does not help explain the offer or the next action, it belongs below the fold.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Vertical | Lifestyle |
| Format | 1920x1420 · 1.35:1 |
| Clip length | 6.6s loop |
| Brief | 18,878 characters |
| Date | 2026-09-17 |
| Fonts | Instrument Serif, UnifrakturCook |
| Tools | vanilla JS, single HTML file |
| Timing | 1.2s transitions, cubic-bezier(.22,1.36,1) easing and a 6.6s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 22px spacing steps and 1.2s transitions.
2. Copy 100vh sections, 22px spacing steps and 1.2s transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 100vh sections, 22px spacing steps and 1.2s transitions.
4. Keep the measurements the brief spells out: 100vh sections, 22px spacing steps and 1.2s transitions.
5. Port the motion last: the entrance, the 1.2s states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/vinyl
原始 prompt：18878 字符
