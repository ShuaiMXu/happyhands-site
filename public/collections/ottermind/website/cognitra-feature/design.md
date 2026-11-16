# Cognitra Feature

> Features section reference for an AI or SaaS product — React and Tailwind CSS, Helvetica, Arial, fluid type and #877A73 base.

- 行业：AI & SaaS（ai-saas）
- 区块：Features section
- 画布：640x470 · 比例 1.3617 · 0s

## 概述

Cognitra Feature is a SaaS features section built from one written brief, and this page documents that brief. “We provide all-in-one AI automation services in one place” is the line the layout is built to carry. The colour scheme is muted orange #877A73 underneath and gray #D2CDC5 for the type, and the page is set in Helvetica, Arial. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion is confined to 0.08s transitions. It is the right reference for an AI or SaaS product features section that has to look deliberate on the first screen.

## 主标题文案

> “We provide all-in-one AI automation services in one place” — the whole features section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted red | `#5A504D` | darkest |
| Gray | `#D2CDC5` | Headline |
| Muted orange | `#877A73` | composition |
| Gray — darker | `#63605E` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | 14px | Headline and interface text — one stack for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 14px is the range the whole scale works in.
- The type is set in Helvetica, Arial on a 14px scale, and the spacing follows the same steps.
- The navigation collapses at max-width 260px and max-width 720px, so the bar has a designed narrow state.

## 布局

**The bar shares the page grid** — A short run of links and a single action sit over the features section, held at a fixed 14px display size and 100vh sections so the bar never competes with the composition behind it. Below 260px the links collapse instead of wrapping onto a second line. If your own page has more sections, group them rather than widening the bar.

**A stat strip, not a table** — The figures are set in Helvetica, Arial at a size closer to the headline than to the body copy. The label step is quoted in the brief, so it stays below the figures after a substitution. Give each figure a short label.

**Behaviour is defined per width** — Width changes are handled in the type itself: a clamp between 26px and 32px carries the headline from phone to desktop without a separate mobile composition. Controls stay large enough to tap and the copy keeps its reading order at every width.

**Copy first, decoration second** — The whole composition fits one screen and is delivered as React and Tailwind CSS, with the copy, the media and the controls named in the brief. The page is one composition at 640x470, which is why it holds together when the copy changes. Nothing decorative belongs above the fold.


## 动效

**State changes, timed** — Hover, press and focus all resolve in 0.08s, which is what makes the interface feel immediate. Easing is specified alongside the duration (0.08s), so a rebuild cannot quietly substitute a different feel.

**Almost no motion** — There is no scroll library here: the 640x470 composition holds still and only the elements that respond to you move. Motion is treated as feedback rather than as decoration.


## 可替换项

- Set your own headline in Helvetica, Arial at the size the reference uses, so the features section keeps the same optical weight.
- Rewrite “We provide all-in-one AI automation services in one place” to the same line count; the mask reveals each line in turn.
- Keep Helvetica, Arial or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Set 0.08s to your own build speed and check that a standard ease-out still lands the copy before the media starts.

## 文案规则

**Why this composition works for SaaS** — The design argues its case on one screen. The media is a still at 640x470. The media carries the atmosphere, the copy carries the offer, and a fixed 14px display size and 100vh sections keep the two apart. Cognitra Feature states the offer once and lets the composition repeat it rather than adding a second claim.

**Reading Cognitra Feature as a spec** — If you are handing this to a developer, the brief is the useful artefact. It states a fixed 14px display size, 100vh sections, 32px spacing steps, 0.08s transitions and a 260px breakpoint and leaves nothing for the two of you to interpret. Nothing in this features section depends on a default.

**What to change first in Cognitra Feature** — The trade-off is recognisability. Keep too much of Cognitra Feature and the page reads as someone else's; keep the numbers and change the content and it reads as yours. Rewrite the display line before you touch the colour. The reference was captured at 640x470.


## 规格

| 项 | 值 |
|---|---|
| Page section | Features section |
| Vertical | AI & SaaS |
| Canvas size | 640x470 · 1.36:1 |
| Source text | 3,241 characters |
| Capture date | 2026-09-17 |
| Type | Helvetica, Arial · 14px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Animation | 0.08s transitions |

## 复刻步骤

1. Check your build against the reference measurements: a fixed 14px display size, 100vh sections and 32px spacing steps.
2. Copy a fixed 14px display size, 100vh sections and 32px spacing steps into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: a fixed 14px display size, 100vh sections and 32px spacing steps.
4. Pin the reference measurements before you restyle anything: a fixed 14px display size, 100vh sections and 32px spacing steps.
5. Port the motion last: the entrance, the 0.08s states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/cognitra-feature
原始 prompt：3241 字符
