# Immersive Ocean

> Hero section reference for an agency or studio — a 640x478 frame, Geist, #000410 base and cubic-bezier(0.16,1,0.3,1) easing.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：640x478 · 比例 1.3389 · 0s

## 概述

Immersive Ocean is a agency hero section built from one written brief, and this page documents that brief. It leads with “Shaping visual narratives, one pixel at a time” and gives that line the frame rather than shrinking it into a card. Colour is limited to deep blue #000410 underneath, gray #C2CFCA for the type and teal #0E4154 carrying the accents, set in Geist. Delivery is React and Tailwind CSS, captured at 640x478 so the frame is fixed before any code is written. Motion is cubic-bezier(0.16,1,0.3,1), kept quiet enough that the copy still leads. This reference is for an agency or studio that wants the first screen settled before the build starts.

## 主标题文案

> “Shaping visual narratives, one pixel at a time” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#00020D` | darkest |
| Gray | `#C2CFCA` | Headline |
| Near-black — lighter | `#000410` | composition |
| Teal | `#0E4154` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The accent is spent on teal #0E4154 and the rest of the composition holds deep blue #000410.
- Accent and ground are both named (teal #0E4154 on deep blue #000410), so a brand swap moves one value.
- Accent use is limited to teal #0E4154; everything else sits on deep blue #000410.

## 布局

**Top row: wordmark, links, one action** — Wordmark, links and the #0E4154 action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #0E4154 action is the only element in the bar with any weight. Give the wordmark no more room than its type needs.

**One scale for type and frame** — The values are the specification: 100vh sections, 80px spacing steps and cubic-bezier(0.16,1,0.3,1) easing, captured at 640x478 rather than inferred from a screenshot. Each value maps to one job: a type step, a gap, a radius or a transition. Keep the values that look arbitrary.

**One family, two roles** — The size steps and tracking in the brief are what give this its tone: Geist at a tight display size, then a clear drop to the supporting copy. The interface text stays on one face, so the page never mixes two voices at the same size.

**One row, no drawers** — The bar sits over the 640x478 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Durations from the brief** — Motion is measured in milliseconds here: 0 on cubic-bezier(0.16,1,0.3,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Focus states are timed with the same value as hover, so keyboard and pointer feedback match.

**A small interactive surface** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. The states are named in the brief, so the page does not depend on a hover-effect library.


## 可替换项

- Retint #0E4154 toward your palette but keep the step against #000410; flatten the two and the primary action stops reading.
- Swap in your own headline where “Shaping visual narratives, one pixel at a time” sits and keep the line breaks, because the entrance animates per line.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 640x478.
- Check #0E4154 against the copy size in Geist before you swap either, because the accent only reads on a large line.

## 文案规则

**How the hero section reflows** — If your breakpoints were chosen to make things fit rather than to change the layout, read this entry. the section is held at 100vh and the navigation collapses into a mobile menu rather than a list of hidden elements. Both states are described in the same brief.

**What to change first in Immersive Ocean** — Compare this with starting from a blank page. Here the frame (640x478) and 100vh sections and 80px spacing steps are already decided, so the work is substitution rather than composition. Substitution is cheaper than composition, and that is the point.

**The order behind the hero section** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: navigation, the announcement badge, the stats row, the feature list and the background clip are a sequence, and 100vh sections and 80px spacing steps only work in that order. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Industry | Agencies & Studios |
| Format | 640x478 · 1.34:1 |
| Brief | 4,030 characters |
| Captured | 2026-09-17 |
| Key colour | teal #0E4154 |
| Typefaces | Geist |
| Tech stack | Tailwind CSS, React, Lucide icons |
| Motion | cubic-bezier(0.16,1,0.3,1) easing |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 640x478 capture before you generate.
2. Type the product name and the #0E4154 accent before you touch the layout.
3. Drop your product name in, then replace #0E4154 with your own accent and re-check the contrast.
4. Set your brand first: product name, the #0E4154 accent and the headline that replaces the reference's.
5. Set the brand first: product name, the #0E4154 accent and a headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/immersive-ocean
原始 prompt：4030 字符
