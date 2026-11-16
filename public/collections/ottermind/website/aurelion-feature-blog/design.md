# Aurelion Blog

> Blog section reference for an AI or SaaS product — 700ms transitions, #F3F4F4 base, looping video and React and Tailwind CSS.

- 行业：AI & SaaS（ai-saas）
- 区块：Blog section
- 画布：1400x1080 · 比例 1.2963 · 6.5s

## 概述

Before rebuilding a blog section for an AI or SaaS product, read Aurelion Blog: the composition and the specification behind it are both here. The palette is white #F3F4F4 underneath, black #1A1A1A for the type and yellow #F3DE58 carrying the accents. It ships as React and Tailwind CSS, so the whole blog section can be lifted into a project without a design handoff. The motion budget is 700ms transitions and a looping video bed. Treat it as the brief for an AI or SaaS product blog section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Blog section reference for an AI or SaaS product, captured at 1400x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Yellow | `#F3DE58` | accent |
| White | `#F3F4F4` | composition |
| Near-black | `#1A1A1A` | Headline |
| Near-black — lighter | `#1C1C1C` | darker step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The accent is spent on yellow #F3DE58 and the rest of the composition holds white #F3F4F4.
- Accent use is limited to yellow #F3DE58; everything else sits on white #F3F4F4.
- The timing budget is state feedback rather than page choreography (700ms), so a slower rebuild reads as a different design.

## 布局

**Links before the action** — The row spends its contrast in one place: the #F3DE58 action, with the wordmark and the links held back on the ink colour. The links are set below the wordmark in size, and the #F3DE58 action is the only element in the bar with any weight.

**Nothing here is inherited** — The brief fixes 30px spacing steps and 700ms transitions and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well. The numbers are the design; the rest is arrangement.

**Media without an overlay** — The 1400x1080 frame is filled by a single loop that plays behind the copy and asks for no controls. A poster frame at 1400x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**Navigation held to one row** — The bar sits over the 1400x1080 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**The loop does the ambient work** — Ambient movement is one 6.5s clip at 1400x1080, looping quietly behind the copy rather than reacting to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size.

**Interaction is on the controls** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card and a slider that pages through content on demand. Everything else stays still, which keeps the emphasis on the composition. Feedback is limited to the controls, so the composition stays still around them.


## 可替换项

- Replace the video with a still at 1400x1080 if the 6.5s loop is too heavy for the page you are shipping.
- Read the brief value by value against the 1400x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Hold the blog section to one screen on desktop; the brief never asks the reader to scroll past the fold.
- Move #F3DE58 to your own hue and leave #F3F4F4 where it is; the distance between them is doing the hierarchy work.

## 文案规则

**What moves in Aurelion Blog** — A short motion budget costs you drama on the first frame. It buys legibility, and it means 700ms transitions, a 6.5s media loop and a word-by-word headline can be ported without a library. Nothing animates for its own sake in this blog section.

**What to change first in Aurelion Blog** — You do not need to rebuild the blog section to make it yours. Replace the headline and the media, keep the scale (30px spacing steps and 700ms transitions), and the layout still reads as designed. If a new element does not help explain the offer or the next action, it belongs below the fold.

**How the blog section reflows** — When the copy is long, the narrow layout breaks first. Here a clamp between 56px and 30px absorbs the change, and the scale is fluid rather than stepped. Width changes the measurements, not the reading path.


## 规格

| 项 | 值 |
|---|---|
| Block | Blog section |
| Sector | AI & SaaS |
| Frame | 1400x1080 · 1.3:1 |
| Loop length | 6.5s loop |
| Source text | 5,024 characters |
| Archived | 2026-09-17 |
| Accent tone | yellow #F3DE58 |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Transitions | 700ms transitions and a 6.5s media loop |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the blog section you do not need.
2. Open the reference in Studio with the prompt staged, and read the blog section brief before you send it.
3. Stage the prompt in Studio and read it once against the 1400x1080 capture before you generate.
4. Set the brand first: product name, the #F3DE58 accent and a headline that replaces the reference's.
5. Type the product name and the #F3DE58 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/aurelion-feature-blog
原始 prompt：5024 字符
