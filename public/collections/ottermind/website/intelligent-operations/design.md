# Intelligent Operations

> Landing page reference for an AI or SaaS product — glass panels, looping video, a dark stage and scroll-triggered reveals.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1476x1080 · 比例 1.3667 · 7.933s

## 概述

Read Intelligent Operations as a landing page spec: the values were written down before the page was built. The palette is gray #BCCCD4 underneath and black #0A0A0A for the type, set in Inter. Delivery is React and Tailwind CSS, captured at 1476x1080 so the frame is fixed before any code is written. The brief spends its motion budget on 700ms transitions and a looping video bed. It is most useful when the AI & SaaS landing page has to survive a copy change without a redesign.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1476x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0A0A` | Headline |
| Gray | `#9B9492` | darker step |
| White | `#E4E3E4` | lightest |
| Gray — lighter | `#BCCCD4` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1476x1080 and a 7.9s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1476x1080 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1476x1080 and a 7.9s loop, so the composition has a single media dependency.

## 布局

**A bar with nothing spare** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. The bar sits over the 1476x1080 composition without a background of its own, so the media runs edge to edge underneath it. One action per bar.

**The nav is deliberately thin** — Focus and hover states are specified for each link rather than inherited from the browser. Design the collapsed state before adding a sixth link.

**Measured against the viewport** — Nothing here is eyeballed. The spec fixes 100vh sections, 10px spacing steps and 700ms transitions, and the rest of the layout derives from those values. There is no invented intermediate value between the named ones; the measurement list is the whole system. Measure before you adjust.

**Media behind the type** — One muted, looping clip fills the frame at 1476x1080 and 7.9s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. A poster frame at 1476x1080 holds the composition when autoplay is unavailable, so the layout never collapses.


## 动效

**State changes, timed** — One duration covers the interactions (700ms), which is what keeps hover and press reading as one system. The durations are short enough that feedback reads as a response rather than as an animation.

**Pointer states, nothing more** — Feedback is limited to hover states on the buttons and links rather than on every card and a sticky element that holds position while the content moves under it, which is what keeps a dense first screen from feeling busy. Because the states are simple, they port into any component system.


## 可替换项

- Keep the 1476x1080 frame when you swap the content, because the composition was solved against that ratio.
- Replace the video with a still at 1476x1080 if the 7.9s loop is too heavy for the page you are shipping.
- Retime the entrance to taste. 700ms with a standard ease-out is what the reference uses.
- Draft the new copy to the 1476x1080 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**The numbers behind the landing page** — Every relationship on this page is a value you can check: 100vh sections, 10px spacing steps and 700ms transitions. That is what makes Intelligent Operations rebuildable rather than merely reproducible. Nothing in this landing page depends on a default.

**What moves in Intelligent Operations** — The timing is explicit: 700ms transitions, a 7.9s media loop and a scroll reveal, all of it written into the brief rather than tuned by feel. Nothing animates for its own sake in this landing page.

**How the landing page reflows** — Type is clamped rather than stepped here (a clamp between 80px and 10px), so the display line does not jump between widths. The reflow keeps the action reachable at every width.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Vertical | AI & SaaS |
| Frame | 1476x1080 · 1.37:1 |
| Loop | 7.9s loop |
| Source text | 10,447 characters |
| Date | 2026-09-17 |
| Typefaces | Inter |
| Reference stack | Tailwind CSS, React, TypeScript |
| Transitions | 700ms transitions and a 7.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1476x1080 capture before you generate.
2. Check your build against the reference measurements: 100vh sections, 10px spacing steps and 700ms transitions.
3. Copy 100vh sections, 10px spacing steps and 700ms transitions into your own brief before you rewrite anything else.
4. Keep the measurements the brief spells out: 100vh sections, 10px spacing steps and 700ms transitions.
5. Pin the reference measurements before you restyle anything: 100vh sections, 10px spacing steps and 700ms transitions.

---
来源：https://ottermind.ai/explore/website/intelligent-operations
原始 prompt：10447 字符
