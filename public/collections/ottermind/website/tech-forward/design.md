# Tech-Forward

> Hero section reference for a fintech product — Inter, a stats row, 0.8s transitions and #FDFBFA base.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：1464x1080 · 比例 1.3556 · 6.033s

## 概述

Tech-Forward was captured at 1464x1080 and kept as a specification rather than as a gallery image. The headline reads “One Card, Zero Limits. Worldwide”, and the rest of the hero section is arranged around it. The palette runs white #FDFBFA underneath, and the type is Inter. Delivery is React and Tailwind CSS, captured at 1464x1080 so the frame is fixed before any code is written. The brief spends its motion budget on 0.8s transitions and a looping video bed. Treat it as the brief for a fintech product hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference built around “One Card, Zero Limits. Worldwide”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F4F4F6` | panel edges |
| White — lighter | `#FFFFFF` | lightest |
| Gray | `#9D9D9C` | darkest |
| White — lighter | `#FDFBFA` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1464x1080 and a 6s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1464x1080 and a 6s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1464x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Links collapse at one width** — A short run of links and a single action sit over the hero section, held at 100vh sections and 13px spacing steps so the bar never competes with the composition behind it. The bar sits over the 1464x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Proof in one row** — The row is placed high in the hero section as proof rather than as decoration. Numbers share the interface face, so they belong to the page instead of interrupting it.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The accent is reused on one footer action rather than across the whole band. Group links; do not dump them.

**Navigation held to one row** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system.


## 动效

**Timings in milliseconds** — Motion is measured in milliseconds here: 0.8s. That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Easing is specified alongside the duration (0.8s), so a rebuild cannot quietly substitute a different feel. Keep the durations when you re-skin the page.

**The loop does the ambient work** — Ambient movement comes from the 6s 1464x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. The clip is muted and inline, so the first frame is available without an interaction. Shoot or export at 1464x1080 or wider.


## 可替换项

- Retime the entrance to taste. 0.8s with a standard ease-out is what the reference uses.
- Draft the new copy to the 1464x1080 frame, then check that the entrance still lands on the same number of lines.
- Set 0.8s to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Replace “One Card, Zero Limits. Worldwide” with your own line and keep the word count, because the entrance is timed per line.

## 文案规则

**What moves in Tech-Forward** — When a page feels restless, the cause is usually too many entrances. This one keeps the list short: 0.8s transitions and a 6s media loop. Nothing animates for its own sake in this hero section.

**Reading Tech-Forward as a spec** — 3,400 characters of brief produce a full specification. The load-bearing part is short: 100vh sections, 13px spacing steps and 0.8s transitions. Nothing in this hero section depends on a default.

**How the hero section reflows** — Responsive here means the scale changes, not the hierarchy: the scale is fluid rather than stepped and the section is held at 100vh. Text stays above the fold, controls stay large enough to tap, and reduced motion is honoured. The mobile version is a decision, not a fallback.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Sector | Fintech |
| Canvas | 1464x1080 · 1.36:1 |
| Loop length | 6s loop |
| Prompt | 3,400 characters |
| Capture date | 2026-09-17 |
| Type | Inter |
| Tools | Tailwind CSS, React, Vite |
| Motion | 0.8s transitions and a 6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1464x1080 capture before you generate.
2. Check your build against the reference measurements: 100vh sections, 13px spacing steps and 0.8s transitions.
3. Pin the reference measurements before you restyle anything: 100vh sections, 13px spacing steps and 0.8s transitions.
4. Keep the measurements the brief spells out: 100vh sections, 13px spacing steps and 0.8s transitions.
5. Copy 100vh sections, 13px spacing steps and 0.8s transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/tech-forward
原始 prompt：3400 字符
