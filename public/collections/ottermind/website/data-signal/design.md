# Data Signal

> Landing page reference for an AI or SaaS product — 520ms transitions, cubic-bezier(.16,1.3,1) easing, #050606 base and Inter.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1482x1080 · 比例 1.3722 · 5.9s

## 概述

This is the landing page from Data Signal, published with the brief that produced it rather than as a screenshot. The page's own headline reads “Abstract red and blue smoke”, and the composition is built around those exact words. The colour scheme is deep teal #050606 underneath and white #EDEDED for the type, and the page is set in Inter. Delivery is one self-contained HTML file, captured at 1482x1080 so the frame is fixed before any code is written. The page keeps its motion to 520ms transitions, cubic-bezier(.16,1.3,1) and a looping video bed. Keep it open while you write: the 12,007-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built around “Abstract red and blue smoke”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | darkest |
| White | `#EDEDED` | Headline |
| Near-black — lighter | `#050606` | composition |
| Gray | `#737778` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 16px | Interface |
| Playfair Display | 16px | Second face |

## 视觉要点

- Corner treatment is specified in the brief: 7px.
- Panels and controls share the same corner treatment (7px), so the page keeps one surface language.
- Transitions are specified at 520ms, which is the value to keep when the palette changes.

## 布局

**A navigation bar that gets out of the way** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. Labels are short enough to fit one line at 619px, and the active item is marked with weight rather than with a pill. Keep the link count to four or five; the row is sized for that.

**Media without an overlay** — Video sits on the bottom layer of the 1482x1080 composition, with the type arranged above it and nothing in between. The loop is short enough (5.9s) that the eye reads it as texture rather than as a timeline.

**The announcement pill** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. There is one announcement only, which is what makes the badge feel like news. One badge, one message.

**Navigation without a background** — The bar is a handful of elements, so it rebuilds without a component library. The reference was captured at 1482x1080.


## 动效

**The loop does the ambient work** — Ambient movement is one 5.9s clip at 1482x1080, looping quietly behind the copy rather than reacting to the pointer. The clip is muted and inline, so the first frame is available without an interaction.

**Pointers only where they help** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. The states are named in the brief, so the page does not depend on a hover-effect library.


## 可替换项

- Read the brief value by value against the 1482x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Draft the new copy to the 1482x1080 frame, then check that the entrance still lands on the same number of lines.
- Swap the clip for your own footage at 1482x1080 or wider, keep it muted, and match the 5.9s loop point.
- Replace “Abstract red and blue smoke” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**What to change first in Data Signal** — If your brand runs a heavier palette, test it against the frame before you commit. deep teal #050606 carries the page, so a darker accent needs more contrast than the reference uses. Rewrite the copy and the media before you re-colour anything.

**What an AI or SaaS product gains here** — The claim is made once, at display size. “Abstract red and blue smoke” is doing that work from the first frame. Everything else in the landing page is ordered around that line: navigation, the headline, the announcement badge, the stats row and the card grid, and no second promise competes for the first read. Data Signal states the offer once and lets the composition repeat it rather than adding a second claim.

**The timing behind the landing page** — A preset animation pack would have been quicker to ship. The brief specifies 520ms transitions, a 5.9s media loop and hover and press states instead, which is why the page reads as authored rather than staged. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Sector | AI & SaaS |
| Frame | 1482x1080 · 1.37:1 |
| Loop | 5.9s loop |
| Input brief | 12,007 characters |
| Date | 2026-09-17 |
| Faces | Inter, Playfair Display · 16px |
| Tools | single HTML file |
| Timing | 520ms transitions, cubic-bezier(.16,1.3,1) easing and a 5.9s media loop |

## 复刻步骤

1. Check your build against the reference measurements: a fixed 16px display size, 19vh sections and 7px corners.
2. Keep the measurements the brief spells out: a fixed 16px display size, 19vh sections and 7px corners.
3. Pin the reference measurements before you restyle anything: a fixed 16px display size, 19vh sections and 7px corners.
4. Copy a fixed 16px display size, 19vh sections and 7px corners into your own brief before you rewrite anything else.
5. Port the motion last: the entrance, the 520ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/data-signal
原始 prompt：12007 字符
