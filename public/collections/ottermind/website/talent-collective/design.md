# Talent Collective

> Landing page reference for an agency or studio — React and Tailwind CSS, a stats row, Geist and 700ms transitions.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：1904x1080 · 比例 1.763 · 6.5s

## 概述

Talent Collective gives an agency or studio a finished first screen and the numbers that produced it. The palette runs gray #BAB8B5 underneath, and the type is Geist. Delivery is React and Tailwind CSS, captured at 1904x1080 so the frame is fixed before any code is written. Motion comes down to 700ms transitions and a looping video bed. Treat it as the brief for an agency or studio landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference for an agency or studio, captured at 1904x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted orange | `#7A685E` | darkest |
| Gray | `#D7D6D5` | lightest |
| Gray — darker | `#9B958E` | surface |
| Gray — darker | `#BAB8B5` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | 300 / 400 / 500 | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1904x1080 and a 6.5s loop, so a replacement should match the crop and the loop length.
- Transitions are specified at 700ms, which is the value to keep when the palette changes.
- The clip is one asset at 1904x1080 and a 6.5s loop, so the composition has a single media dependency.

## 布局

**Top row, one action** — A short run of links and a single action sit over the landing page, held at 40px spacing steps and 700ms transitions so the bar never competes with the composition behind it. The bar sits over the 1904x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Labels under the figures** — The figures are set in Geist at a size closer to the headline than to the body copy. Figures are set at one weight, so the row does not rank its own statistics.

**Columns, not a link dump** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Type sizes step down from the column headings to the links, so the hierarchy survives a dense footer. Group links; do not dump them.

**One row, no drawers** — Focus and hover states are specified for each link rather than inherited from the browser. Test the bar over your own media before giving it a background.


## 动效

**State changes, timed** — State changes are specified at 700ms, so the feedback on the controls is a designed value rather than a browser default. The same duration is reused across controls, which keeps the interactions feeling like one system. One duration per behaviour.

**The loop does the ambient work** — The background clip runs 6.5s at 1904x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Because it is muted, the loop can run under the copy without competing for sound or focus. Shoot or export at 1904x1080 or wider.


## 可替换项

- Keep Geist or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Recut your footage to the 6.5s loop, then export at 1904x1080 so the crop the reference specifies survives.
- Swap Geist for a face with the same x-height and cap height, then re-measure the headline block.
- Keep the 1904x1080 frame when you swap the content, because the composition was solved against that ratio.

## 文案规则

**How Talent Collective sequences the first read** — Attention is directed rather than left to chance. The sequence runs navigation, the headline, the stats row, the feature list and the footer, and each stop is sized against 40px spacing steps and 700ms transitions so nothing arrives out of order. A agency reader gets the offer before the options.

**Making the landing page yours** — Change the copy and the media first, the colour second, the layout last. The 1904x1080 frame and the Geist scale are what hold the page together, so substitute around them rather than through them. If a new element does not help explain the offer or the next action, it belongs below the fold.

**How the landing page reflows** — You cannot fix a narrow screen by shrinking it. This brief handles the change in the type and the navigation instead: the scale is fluid rather than stepped. Width changes the measurements, not the reading path.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Sector | Agencies & Studios |
| Format | 1904x1080 · 1.76:1 |
| Clip length | 6.5s loop |
| Prompt text | 9,583 characters |
| Saved | 2026-09-17 |
| Typefaces | Geist |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 700ms transitions and a 6.5s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1904x1080 capture before you generate.
2. Pin the reference measurements before you restyle anything: 40px spacing steps and 700ms transitions.
3. Keep the measurements the brief spells out: 40px spacing steps and 700ms transitions.
4. Check your build against the reference measurements: 40px spacing steps and 700ms transitions.
5. Copy 40px spacing steps and 700ms transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/talent-collective
原始 prompt：9583 字符
