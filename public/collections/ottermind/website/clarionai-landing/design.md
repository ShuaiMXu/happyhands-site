# ClarionAI

> Landing page reference for an AI or SaaS product — a logo row, 1000ms transitions, a moving marquee and #000000 base.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1416 · 比例 1.3559 · 18.367s

## 概述

ClarionAI solves the landing page problem for an AI or SaaS product with a single captured brief. The page's own headline reads “The intelligence layer \n for clear decisions”, and the composition is built around those exact words. The palette is black #000000 underneath. It ships as React and Tailwind CSS, so the whole landing page can be lifted into a project without a design handoff. Motion is 1000ms transitions and a looping video bed, kept quiet enough that the copy still leads. It is the right reference for an AI or SaaS product landing page that has to look deliberate on the first screen.

## 主标题文案

> “The intelligence layer \n for clear decisions” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Black | `#1F1F22` | panel edges |
| Near-black | `#1C1C1E` | Secondary |
| Black — lighter | `#2A2A2D` | lightest |
| Near-black — darker | `#000000` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 16px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The clip is one asset at 1952x1440 and a 18.4s loop, so the composition has a single media dependency.
- Transitions are specified at 1000ms, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (1000ms), so a slower rebuild reads as a different design.

## 布局

**The bar shares the page grid** — A short run of links and a single action sit over the landing page, held at a fixed 16px display size and 20px spacing steps so the bar never competes with the composition behind it. The bar sits over the 1952x1440 composition without a background of its own, so the media runs edge to edge underneath it. Keep the link count to four or five; the row is sized for that.

**The announcement pill** — A single pill carries the announcement above the headline, and nothing else competes for that position. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title. One badge, one message.

**A footer that carries the brand** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Columns align to the same grid as the page above, so the footer feels like the same design. Group links; do not dump them.

**A navigation bar that gets out of the way** — The active section is marked with weight rather than with a pill or an underline. Copy this pattern when you need navigation that survives a loud first screen.


## 动效

**The strip that never stops** — A ticker moves through the layout at a constant speed and loops without a gap, which is the only ambient motion the brief needs. The marquee shares the interface face, so it reads as content rather than as ornament.

**State changes, timed** — The timings are short and consistent (1000ms), so hover and press states read as one system instead of a set of separate effects. If the easing changes, the duration has to be revisited with it.


## 可替换项

- Hold the 1952x1440 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Retime the entrance to your own 1000ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Write the replacement headline first, then confirm it still fits the 1952x1440 frame at the reference's type size.
- Swap the clip for your own footage at 1952x1440 or wider, keep it muted, and match the 18.4s loop point.

## 文案规则

**The timing behind the landing page** — Port the motion last. The brief fixes it as 1000ms transitions, a 18.4s media loop and hover and press states, which is easier to match once the layout is in place. Nothing animates for its own sake in this landing page.

**How the landing page reflows** — A fixed desktop scale would have been easier. The brief adds a clamp between 16px and 20px, which is what keeps the display line proportionate between widths. The reflow keeps the action reachable at every width.

**Making the landing page yours** — You do not need to rebuild the landing page to make it yours. Replace the headline and the media, keep the scale (a fixed 16px display size and 20px spacing steps), and the layout still reads as designed. Keep the frame and the scale; the subject is the part that should change.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Industry | AI & SaaS |
| Format | 1952x1440 · 1.36:1 |
| Runtime | 18.4s loop |
| Input brief | 6,807 characters |
| Archived | 2026-09-17 |
| Reference stack | Tailwind CSS, React |
| Transitions | 1000ms transitions and a 18.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1952x1440 capture before you generate.
2. Copy a fixed 16px display size, 20px spacing steps and 1000ms transitions into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: a fixed 16px display size, 20px spacing steps and 1000ms transitions.
4. Pin the reference measurements before you restyle anything: a fixed 16px display size, 20px spacing steps and 1000ms transitions.
5. Check your build against the reference measurements: a fixed 16px display size, 20px spacing steps and 1000ms transitions.

---
来源：https://ottermind.ai/explore/website/clarionai-landing
原始 prompt：6807 字符
