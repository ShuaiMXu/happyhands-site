# Aurex Finance

> Landing page reference for a fintech product — #000000 base, #AFDDFF accent, cubic-bezier(0.16, 1, 0.3, 1) easing and looping video.

- 行业：Fintech（fintech）
- 区块：Landing page
- 画布：1920x1410 · 比例 1.3617 · 6.5s

## 概述

Before rebuilding a landing page for a fintech product, read Aurex Finance: the composition and the specification behind it are both here. The palette runs black #000000 underneath, white #FFFFFF for the type and muted blue #AFDDFF carrying the accents, and the type is Manrope. Delivery is React and Tailwind CSS, captured at 1920x1410 so the frame is fixed before any code is written. The brief spends its motion budget on 900ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. It is the right reference for a fintech product landing page that has to look deliberate on the first screen.

## 主标题文案

> Landing page reference built on black #000000 and muted blue #AFDDFF, set in Manrope and measured against type from 12px to 68px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted blue | `#AFDDFF` | accent |
| Muted blue — lighter | `#C8E8FF` | lighter |
| White | `#FFFFFF` | Headline |
| Near-black | `#000000` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Manrope | 12–68px | Headline and interface text |
| Graphik LCG Regular Regular | 12–68px | Body face |

## 视觉要点

- The type is set in Manrope on a 12–68px scale, and the spacing follows the same steps.
- Nothing sits between the type and the 1920x1410 clip, so a replacement has to work under the copy directly.
- The accent is spent on muted blue #AFDDFF and the rest of the composition holds black #000000.

## 布局

**Links collapse at one width** — Wordmark, links and the #AFDDFF action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #AFDDFF action is the only element in the bar with any weight.

**Measured against the viewport** — The brief names the numbers: type from 12px to 68px, 20px spacing steps, 900ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length. Change the subject, not the steps.

**The video is the background, not a panel** — The 1920x1410 video runs 6.5s on a loop behind the copy, muted and inline, with no tint layer between the two. Export at 1920x1410 or wider and the cover crop keeps working.

**Panels carry the middle** — The grid is the structure: panels of the same size, set in Manrope, arranged so the eye moves across rather than down. Panel heights are driven by the copy, so a longer line does not break the alignment of the row.


## 动效

**Ambient motion without a scroll library** — The background clip runs 6.5s at 1920x1410 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. The loop is cropped to cover, which means the composition does not depend on a particular frame size.

**Durations from the brief** — The timings are short and consistent (900ms using cubic-bezier(0.16, 1, 0.3, 1)), so hover and press states read as one system instead of a set of separate effects. If the easing changes, the duration has to be revisited with it. Time the feedback exactly.


## 可替换项

- Change the copy first, then the accent, then the media: the 1920x1410 frame was solved in that order and reversing it costs a re-layout.
- Draft the new copy to the 1920x1410 frame, then check that the entrance still lands on the same number of lines.
- Retime the entrance to taste. 900ms with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Change the copy before the colour: rewrite the Manrope paragraphs first, then check #AFDDFF against the media behind them.

## 文案规则

**What to change first in Aurex Finance** — When you drop your own media in, keep the crop and the layer order. The media is a 6.5s 1920x1410 loop. That placement is what keeps the copy legible. Set the new copy at the same display size and re-check the contrast before you add anything.

**What a fintech product gains here** — Count the decisions in this landing page and they trace back to one document: 29,337 characters naming the frame at 1920x1410, the type and the rhythm. It gives a fintech reader the shortest honest route to the offer.

**How the landing page reflows** — A fluid scale and a stepped one look similar on a wide screen. Narrow the viewport and the difference shows: a clamp between 12px and 68px against fixed jumps. The order is the last thing to change.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Category | Fintech |
| Canvas | 1920x1410 · 1.36:1 |
| Runtime | 6.5s loop |
| Source text | 29,337 characters |
| Archived | 2026-09-17 |
| Accent hex | muted blue #AFDDFF |
| Fonts | Manrope, Graphik LCG Regular Regular · 12–68px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Transitions | 900ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.5s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1410 capture before you generate.
2. Drop your product name in, then replace #AFDDFF with your own accent and re-check the contrast.
3. Set the brand first: product name, the #AFDDFF accent and a headline that replaces the reference's.
4. Type the product name and the #AFDDFF accent before you touch the layout.
5. Set your brand first: product name, the #AFDDFF accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/aurex-finance
原始 prompt：29337 字符
