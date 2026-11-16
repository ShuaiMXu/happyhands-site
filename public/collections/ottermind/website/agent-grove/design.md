# Agent Grove

> Landing page reference for an AI or SaaS product — a dark stage, React and Tailwind CSS, a stats row and 300ms transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1484x1080 · 比例 1.3741 · 5.433s

## 概述

Agent Grove is the landing page reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. The palette is black #2B2B2B underneath, set in Geist. Delivery is React and Tailwind CSS, captured at 1484x1080 so the frame is fixed before any code is written. The motion budget is 300ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed. Treat it as the brief for an AI or SaaS product landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1484x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#010101` | darkest |
| Black | `#2B2B2B` | composition |
| Near-black — lighter | `#101010` | panel edges |
| Deep teal | `#161C1F` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | Weight not fixed in the brief | Control text |
| Silkscreen | Weight not fixed in the brief | Text face |

## 视觉要点

- Media is specified at 1484x1080 and a 5.4s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1484x1080 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1484x1080 and a 5.4s loop, so the composition has a single media dependency.

## 布局

**Top row: wordmark, links, one action** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1484x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Every measurement is written down** — The brief states its sizes at capture (24px spacing steps, 300ms transitions and cubic-bezier(0.16,1,0.3,1) easing), so a rebuild can be verified instead of approximated. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length.

**Cards do the structuring** — The grid does the reading order for you: panels of equal weight, one idea each, set in Geist at a small size so the structure stays visible. Headings inside the panels sit one step above their own body copy, not one step below the page headline.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Type sizes step down from the column headings to the links, so the hierarchy survives a dense footer.


## 动效

**Short, matched timings** — The controls resolve in 300ms, fast enough that the page answers as it is touched rather than after it. The quoted timing covers state changes, so the feedback is the part of the motion that is specified. One duration per behaviour.

**The loop does the ambient work** — Ambient movement comes from the 5.4s 1484x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Swap the clip for your own. Export at 1484x1080 or wider, keep it muted, and make the 5.4s loop seamless so the cut is invisible.
- Keep 1484x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Retime the entrance to taste. 300ms with cubic-bezier(0.16,1,0.3,1) is what the reference uses.
- Read the brief value by value against the 1484x1080 capture before you edit anything; the numbers are the part that is easiest to lose.

## 文案规则

**Making the landing page yours** — The composition is the reusable part and the subject is yours. Keep 24px spacing steps and 300ms transitions and replace the words, the media and the brand marks. The composition is the reusable part, and it survives a different brand.

**How the landing page reflows** — A fixed desktop scale would have been easier. The brief adds a clamp between 16px and 24px, which is what keeps the display line proportionate between widths. The reflow keeps the action reachable at every width.

**The timing behind the landing page** — A short motion budget costs you drama on the first frame. It buys legibility, and it means 300ms transitions, a 5.4s media loop and hover and press states can be ported without a library. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Field | AI & SaaS |
| Canvas size | 1484x1080 · 1.37:1 |
| Clip length | 5.4s loop |
| Brief | 7,959 characters |
| Captured | 2026-09-17 |
| Typefaces | Geist, Silkscreen |
| Built with | Tailwind CSS, React, Lucide icons |
| Animation | 300ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 5.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1484x1080 capture before you generate.
2. Check your build against the reference measurements: 24px spacing steps, 300ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
3. Keep the measurements the brief spells out: 24px spacing steps, 300ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
4. Pin the reference measurements before you restyle anything: 24px spacing steps, 300ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
5. Copy 24px spacing steps, 300ms transitions and cubic-bezier(0.16,1,0.3,1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/agent-grove
原始 prompt：7959 字符
