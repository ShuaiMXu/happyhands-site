# Growth Decisions

> Landing page reference for an AI or SaaS product — Inter, #FFFFFF base, #006CD2 accent and min-width 821px breakpoints.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1468x1080 · 比例 1.3593 · 7.067s

## 概述

Read Growth Decisions as a landing page spec: the values were written down before the page was built. Colour is limited to #FFFFFF underneath, #0A0A0A for the type and blue #006CD2 carrying the accents, set in Inter. Delivery is a single component, captured at 1468x1080 so the frame is fixed before any code is written. Motion is limited to 0.16s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 11,164-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on #FFFFFF and blue #006CD2, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Blue | `#006CD2` | accent |
| Near-black | `#0A0A0A` | Headline |
| Neutral | `#FFFFFF` | background |
| Blue dark | `#0053A3` | darker |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 / 700 | Headline and interface text — one face for the whole page |

## 视觉要点

- The accent is spent on blue #006CD2 and the rest of the composition holds #FFFFFF.
- Transitions are specified at 0.16s, which is the value to keep when the palette changes.
- Transitions are specified at 0.16s, short enough that the page never feels like it is waiting for an animation.

## 布局

**The nav is deliberately thin** — The bar carries the wordmark, the section links and one #006CD2 button, measured at 100vh sections and 18px spacing steps so it never grows into a second header. Labels are short enough to fit one line at 821px, and the active item is marked with weight rather than with a pill. Keep the link count to four or five; the row is sized for that.

**Full-frame video, no panel** — The 1468x1080 video runs 7.1s on a loop behind the copy, muted and inline, with no tint layer between the two. The loop is short enough (7.1s) that the eye reads it as texture rather than as a timeline.

**The type carries the tone** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. The display face is used at one size only, so it never competes with itself. Keep the size steps even if you change the face.

**The bar shares the page grid** — If your own page has more sections, group them rather than widening the bar. The reference was captured at 1468x1080.


## 动效

**Short, matched timings** — Hover, press and focus all resolve in 0.16s, which is what makes the interface feel immediate. Easing is specified alongside the duration (0.16s), so a rebuild cannot quietly substitute a different feel.

**The reveal is the memory point** — A masked line reveal is the only entrance on the page, so there is one motion idea to maintain. Under reduced motion the element simply appears and the layout is unchanged.


## 可替换项

- Replace #006CD2 last, after the copy is final, and test it against #FFFFFF at the smallest text size on the page.
- Swap #006CD2 for your brand colour and re-check it against #FFFFFF, since the accent is the only place saturation is allowed.
- Read the brief value by value against the 1468x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Change the copy before the colour: rewrite the Inter paragraphs first, then check #006CD2 against the media behind them.

## 文案规则

**The argument this landing page makes** — Compared with a template hero, the difference is what is missing. There is no card grid, no carousel and no second call to action: only navigation, the headline, the announcement badge, the stats row and the background clip, sized against 100vh sections and 18px spacing steps. It gives a SaaS reader the shortest honest route to the offer.

**How Growth Decisions sequences the first read** — Set your own copy into this landing page and the sequence still holds, because the elements are not interchangeable: navigation, the headline, the announcement badge, the stats row and the background clip each carry one job. A SaaS reader gets the offer before the options.

**How the landing page reflows** — Type is clamped rather than stepped here (a clamp between 28px and 18px), so the display line does not jump between widths. Both states are described in the same brief.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Industry | AI & SaaS |
| Canvas size | 1468x1080 · 1.36:1 |
| Duration | 7.1s loop |
| Input brief | 11,164 characters |
| Saved | 2026-09-17 |
| Accent hex | blue #006CD2 |
| Fonts | Inter |
| Transitions | 0.16s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 7.1s media loop |

## 复刻步骤

1. Drop your product name in, then replace #006CD2 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #006CD2 accent and a headline that replaces the reference's.
3. Type the product name and the #006CD2 accent before you touch the layout.
4. Set your brand first: product name, the #006CD2 accent and the headline that replaces the reference's.
5. Pin the reference measurements before you restyle anything: 100vh sections, 18px spacing steps and 0.16s transitions.

---
来源：https://ottermind.ai/explore/website/growth-decisions
原始 prompt：11164 字符
