# F1 Racing Hub

> Hero section reference for a lifestyle brand — looping video, #EDB40B accent, min-width 768px and min-width 1280px breakpoints and fluid type.

- 行业：Lifestyle（lifestyle）
- 区块：Hero section
- 画布：1470x1080 · 比例 1.3611 · 7.033s

## 概述

F1 Racing Hub keeps its decision trail: the brief that produced this hero section runs 10,448 characters. The whole page is built on deep blue #0A0E1C underneath and bright orange #EDB40B carrying the accents. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is 400ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed, kept quiet enough that the copy still leads. If you are briefing a lifestyle hero section, start from this composition and replace the subject.

## 主标题文案

> Hero section reference for a lifestyle brand, captured at 1470x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#EDB40B` | accent |
| Near-black | `#0A0E1C` | composition |
| Near-black — darker | `#1A0000` | darkest |
| Red | `#8B0000` | saturated |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 13–120px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The clip is one asset at 1470x1080 and a 7s loop, so the composition has a single media dependency.
- The navigation collapses at min-width 768px and min-width 1280px, so the bar has a designed narrow state.
- Accent use is limited to bright orange #EDB40B; everything else sits on deep blue #0A0E1C.

## 布局

**The nav is deliberately thin** — Links sit on one line at a single size, and the #EDB40B action closes the row on the right so the eye finishes where the navigation ends. Below 768px the links collapse instead of wrapping onto a second line.

**A full-bleed clip behind the type** — The 1470x1080 video runs 7s on a loop behind the copy, muted and inline, with no tint layer between the two. The loop is short enough (7s) that the eye reads it as texture rather than as a timeline.

**Fluid where it needs to be** — The brief uses a clamp between 13px and 120px for the headline, which is what keeps a long line from breaking awkwardly. The type changes size, not role, as the viewport narrows.

**The bar shares the page grid** — Labels are short enough to fit one line at 768px, and the active item is marked with weight rather than with a pill.


## 动效

**The controls are the interactive layer** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card and a slider that pages through content on demand. Everything else stays still, which keeps the emphasis on the composition. Interactive targets are large enough to tap and the pointer treatment is consistent across them. If a state does not confirm an action, drop it.

**Fast enough to feel deliberate** — Motion is measured in milliseconds here: 400ms on cubic-bezier(0.16,1,0.3,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. If the easing changes, the duration has to be revisited with it.


## 可替换项

- Retint #EDB40B toward your palette but keep the step against #0A0E1C; flatten the two and the primary action stops reading.
- Replace #EDB40B last, after the copy is final, and test it against #0A0E1C at the smallest text size on the page.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1470x1080 frame.
- Swap the clip for your own footage at 1470x1080 or wider, keep it muted, and match the 7s loop point.

## 文案规则

**What to change first in F1 Racing Hub** — Where a theme hands you components, this brief hands you a composition: type from 13px to 120px, 42vh sections, 20px spacing steps and 400ms transitions and a media frame, with the subject left to you. Substitution is cheaper than composition, and that is the point.

**The timing behind the hero section** — A preset animation library would give you more movement than this. The brief asks for less: 400ms transitions, a 7s media loop and hover and press states, and nothing decorative on top. Nothing animates for its own sake in this hero section.

**What holds up for Lifestyle** — You could rebuild this as a stack of separate cards and lose only the argument. The hero section reads as one decision instead: navigation, the headline, the stats row and the card grid in a single sequence. It gives a lifestyle reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Sector | Lifestyle |
| Format | 1470x1080 · 1.36:1 |
| Duration | 7s loop |
| Source text | 10,448 characters |
| Capture date | 2026-09-17 |
| Key colour | bright orange #EDB40B |
| Stack | Tailwind CSS, React, TypeScript |
| Timing | 400ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 7s media loop |

## 复刻步骤

1. Drop your product name in, then replace #EDB40B with your own accent and re-check the contrast.
2. Set the brand first: product name, the #EDB40B accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #EDB40B accent and the headline that replaces the reference's.
4. Type the product name and the #EDB40B accent before you touch the layout.
5. Copy type from 13px to 120px, 42vh sections and 20px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/f1-racing-hub
原始 prompt：10448 字符
