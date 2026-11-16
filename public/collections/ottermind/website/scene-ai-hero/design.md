# Scene AI

> Hero section reference for an AI or SaaS product — a stats row, Tailwind CSS, Inter and a dark stage.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：1920x1378 · 比例 1.3933 · 8s

## 概述

Scene AI shows one way to build the hero section for an AI or SaaS product, and publishes the instructions that produced it. “Create awesome 3D scenes with AI” is the line the layout is built to carry. The colour scheme is black #000000 underneath and white #EBEAD0 for the type, and the page is set in Inter. Delivery is Tailwind CSS — one page, no plugin, no build tooling between you and the design. The motion budget is a looping video bed. It is most useful when the AI & SaaS hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built around “Create awesome 3D scenes with AI”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | composition |
| White | `#EBEAD0` | Headline |
| Near-black — lighter | `#000100` | panel edges |
| Near-black — lighter | `#0D0602` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Nothing sits between the type and the 2056x1476 clip, so a replacement has to work under the copy directly.
- Media is specified at 2056x1476 and a 8s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 2056x1476 and a 8s loop, so the composition has a single media dependency.

## 布局

**One row, no drawers** — A slim bar sits over the hero section with the wordmark on the left and the links set in Inter, so the composition reads as content first and chrome second. The bar sits over the 2056x1476 composition without a background of its own, so the media runs edge to edge underneath it.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Columns align to the same grid as the page above, so the footer feels like the same design.

**Links collapse at one width** — Link spacing comes from padding rather than from dividers, so the row reads as one object. Copy this pattern when you need navigation that survives a loud first screen.

**The video is the background, not a panel** — One muted, looping clip fills the frame at 2056x1476 and 8s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. Export at 2056x1476 or wider and the cover crop keeps working. Export at 2056x1476 or wider to keep the crop honest.


## 动效

**Hover, but sparingly** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. The states are named in the brief, so the page does not depend on a hover-effect library.

**A loop, not a timeline** — Ambient movement is one 8s clip at 2056x1476, looping quietly behind the copy rather than reacting to the pointer. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Keep 2056x1476 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace “Create awesome 3D scenes with AI” with your own line and keep the word count, because the entrance is timed per line.
- Hold the 2056x1476 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Draft the new copy to the 2056x1476 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**What to change first in Scene AI** — A straight substitution has a limit: if your product needs a different hierarchy, a 2056x1476 frame will fight it. Change the order first in that case, and the values second. Keep the frame and the scale; the subject is the part that should change.

**Reading Scene AI as a spec** — This is what makes the reference reusable: a 2056x1476 frame. Nothing is left to a default, so a substitution that keeps those numbers keeps the composition. Nothing in this hero section depends on a default.

**What this hero section gets right** — Compared with a template hero, the difference is what is missing. There is no card grid, no carousel and no second call to action: only navigation, the announcement badge, the stats row, the background clip and the footer, sized against a 2056x1476 frame. It gives a SaaS reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | AI & SaaS |
| Format | 2056x1476 · 1.39:1 |
| Duration | 8s loop |
| Input brief | 2,425 characters |
| Archived | 2026-09-17 |
| Type | Inter |
| Tech stack | Tailwind CSS |
| Timing | a 8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2056x1476 capture before you generate.
2. Pin the reference measurements before you restyle anything: The page keeps to 4 values, so the statistics and the controls draw from one palette..
3. Copy The page keeps to 4 values, so the statistics and the controls draw from one palette. into your own brief before you rewrite anything else.
4. Port the motion last: the entrance and the hover states, in that order.
5. Add the entrance last and rebuild the hover states after it; nothing else in the composition moves.

---
来源：https://ottermind.ai/explore/website/scene-ai-hero
原始 prompt：2425 字符
