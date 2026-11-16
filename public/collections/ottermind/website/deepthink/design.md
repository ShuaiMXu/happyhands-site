# DeepThink

> Landing page reference for an AI or SaaS product — Inter, scroll-triggered reveals, #0C0C0C base and a stats row.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1280x1928 · 比例 0.6639 · 0s

## 概述

DeepThink is a SaaS landing page built from one written brief, and this page documents that brief. The colour scheme is #0C0C0C underneath and tint #FAFAFA for the type, and the page is set in Inter. Delivery is one self-contained HTML file, captured at 1280x1928 so the frame is fixed before any code is written. The brief spends its motion budget on 90ms transitions and cubic-bezier(.22,1.36,1). Keep it open while you write: the 13,695-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1280x1928 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0C0C0C` | background |
| Tint | `#FAFAFA` | Headline |
| Near-black — lighter | `#111111` | panel edges |
| Tint — darker | `#9E9E9E` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 90ms, which is the value to keep when the palette changes.
- Transitions are specified at 90ms, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (90ms), so a slower rebuild reads as a different design.

## 布局

**A bar with nothing spare** — The bar is one row of text and one action, measured at 100vh sections and 10px spacing steps so it reads as a strip rather than as a band. The bar sits over the 1280x1928 composition without a background of its own, so the media runs edge to edge underneath it.

**A card grid carries the middle** — The grid does the reading order for you: panels of equal weight, one idea each, set in Inter at a small size so the structure stays visible. The grid collapses to a single column without changing the panel order.

**A navigation bar that gets out of the way** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. Keep the link count to four or five; the row is sized for that.

**The spacing steps are quoted** — Nothing here is eyeballed. The spec fixes 100vh sections, 10px spacing steps, 90ms transitions and cubic-bezier(.22,1.36,1) easing, and the rest of the layout derives from those values. Because the values are fixed, a substitution changes the look without changing the rhythm.


## 动效

**Reveals tied to movement** — Scroll is treated as a trigger rather than a timeline: sections reveal as they enter the viewport, and the reader sets the pace. The scroll behaviour is measured against the same layout the static page uses, so nothing shifts when it is removed. Test it with reduced motion on.

**Timings in milliseconds** — The brief fixes the transition value at 90ms, so a rebuild cannot substitute a slower default. The same duration is reused across controls, which keeps the interactions feeling like one system.


## 可替换项

- Change the copy first, then the accent, then the media: the 1280x1928 frame was solved in that order and reversing it costs a re-layout.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 1280x1928.
- Read the brief value by value against the 1280x1928 capture before you edit anything; the numbers are the part that is easiest to lose.
- Retime the entrance to taste. 90ms with cubic-bezier(.22,1.36,1) is what the reference uses.

## 文案规则

**The argument this landing page makes** — A tint layer over the media would have been the easy fix. The brief leaves it off. The media is a still at 1280x1928. The copy still holds because 100vh sections and 10px spacing steps keep the frame calm. It gives a SaaS reader the shortest honest route to the offer.

**What moves in DeepThink** — The brief ties every transition to a value (90ms transitions, a masked line reveal and a scroll reveal). That is what keeps the page from feeling like a template with an animation preset dropped on top of it. Nothing animates for its own sake in this landing page.

**The numbers behind the landing page** — Committing to 100vh sections, 10px spacing steps, 90ms transitions and cubic-bezier(.22,1.36,1) easing trades flexibility for repeatability. That is the point of the reference: the same page in a different brand, without a new set of guesses. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Industry | AI & SaaS |
| Canvas size | 1280x1928 · 0.66:1 |
| Input brief | 13,695 characters |
| Saved | 2026-09-17 |
| Type | Inter |
| Tech stack | Tailwind CSS, React, GSAP |
| Motion | 90ms transitions and cubic-bezier(.22,1.36,1) easing |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1280x1928 capture before you generate.
2. Keep the measurements the brief spells out: 100vh sections, 10px spacing steps and 90ms transitions.
3. Pin the reference measurements before you restyle anything: 100vh sections, 10px spacing steps and 90ms transitions.
4. Check your build against the reference measurements: 100vh sections, 10px spacing steps and 90ms transitions.
5. Copy 100vh sections, 10px spacing steps and 90ms transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/deepthink
原始 prompt：13695 字符
