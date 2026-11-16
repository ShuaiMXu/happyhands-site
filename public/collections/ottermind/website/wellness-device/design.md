# Wellness Devicex

> Landing page reference for a health or wellbeing product — Inter, cubic-bezier(0.77, 0, 0.18, 1) easing, glass panels and 60ms transitions.

- 行业：Health（health）
- 区块：Landing page
- 画布：1460x1080 · 比例 1.3519 · 4.4s

## 概述

Wellness Devicex was captured at 1460x1080 and kept as a specification rather than as a gallery image. Colour is limited to black #0A0A0A underneath and muted blue #64748B carrying the accents, set in Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion is 60ms transitions, cubic-bezier(0.77, 0, 0.18, 1) and a looping video bed, kept quiet enough that the copy still leads. It is the right reference for a health or wellbeing product landing page that has to look deliberate on the first screen.

## 主标题文案

> Landing page reference built on black #0A0A0A and muted blue #64748B, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0A0A` | composition |
| Muted blue | `#64748B` | accent |
| Tint | `#879CBB` | supporting |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | UI face |
| Instrument Serif | Weight not fixed in the brief | Display lines — the editorial voice of the page |
| Applied via a | Weight not fixed in the brief | Text face |

## 视觉要点

- Transitions are specified at 60ms, which is the value to keep when the palette changes.
- The accent is spent on muted blue #64748B and the rest of the composition holds black #0A0A0A.
- The timing budget is state feedback rather than page choreography (60ms), so a slower rebuild reads as a different design.

## 布局

**Links collapse at one width** — The bar carries the wordmark, the section links and one #64748B button, measured at 100vh sections and 24px spacing steps so it never grows into a second header. The links are set below the wordmark in size, and the #64748B action is the only element in the bar with any weight.

**The loop is the backdrop** — The first screen is a single clip at 1460x1080, and everything else is arranged on top of it. Export at 1460x1080 or wider and the cover crop keeps working. Export at 1460x1080 or wider to keep the crop honest.

**Tracking tightens as it grows** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Numerals share the interface face, so statistics and labels belong to the same system.

**Navigation held to one row** — If your own page has more sections, group them rather than widening the bar. The reference was captured at 1460x1080.


## 动效

**Fast enough to feel deliberate** — The brief fixes the transition value at 60ms, so a rebuild cannot substitute a slower default. The quoted timing covers state changes, so the feedback is the part of the motion that is specified. Fast state changes, no scroll timelines.

**The page assembles as you move** — Parallax runs while the page is moving, so the composition has a defined resting state. Because it is tied to position, the effect resolves the same way on every visit. Never gate the copy behind a scroll trigger.


## 可替换项

- Retime the entrance to your own 60ms, but keep cubic-bezier(0.77, 0, 0.18, 1) as the curve, because the easing is what reads as this design.
- Retime the entrance to taste. 60ms with cubic-bezier(0.77, 0, 0.18, 1) is what the reference uses.
- Retint #64748B toward your palette but keep the step against #0A0A0A; flatten the two and the primary action stops reading.
- Recut your footage to the 4.4s loop, then export at 1460x1080 so the crop the reference specifies survives.

## 文案规则

**How the landing page reflows** — A fluid scale and a stepped one look similar on a wide screen. Narrow the viewport and the difference shows: a clamp between 48px and 24px against fixed jumps. The order is the last thing to change.

**What to change first in Wellness Devicex** — The brief names Inter and the scale beside it. Substitute a face with the same proportions and the composition survives. The composition is the reusable part, and it survives a different brand.

**How Wellness Devicex sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 100vh sections and 24px spacing steps have to be re-cut, because the sequence is load-bearing rather than decorative. A health reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Category | Health |
| Format | 1460x1080 · 1.35:1 |
| Clip length | 4.4s loop |
| Brief | 6,903 characters |
| Capture date | 2026-09-17 |
| Key tone | muted blue #64748B |
| Fonts | Inter, Instrument Serif, Applied via a |
| Stack | Tailwind CSS, React, TypeScript |
| Timing | 60ms transitions, cubic-bezier(0.77, 0, 0.18, 1) easing and a 4.4s media loop |

## 复刻步骤

1. Copy 100vh sections, 24px spacing steps and 60ms transitions into your own brief before you rewrite anything else.
2. Pin the reference measurements before you restyle anything: 100vh sections, 24px spacing steps and 60ms transitions.
3. Keep the measurements the brief spells out: 100vh sections, 24px spacing steps and 60ms transitions.
4. Check your build against the reference measurements: 100vh sections, 24px spacing steps and 60ms transitions.
5. Copy the 60ms timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/wellness-device
原始 prompt：6903 字符
