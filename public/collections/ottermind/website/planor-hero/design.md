# Planor

> Hero section reference for an AI or SaaS product — 0.2s transitions, looping video, #634635 base and one self-contained HTML file.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：1920x1370 · 比例 1.4015 · 6.367s

## 概述

Planor gives an AI or SaaS product a finished first screen and the numbers that produced it. The palette runs orange #634635 underneath and white #E5E7EB for the type, and the type is Inter. Delivery is one self-contained HTML file, captured at 1964x1402 so the frame is fixed before any code is written. Motion is limited to 0.2s transitions and a looping video bed. Keep it open while you write: the 3,036-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference for an AI or SaaS product, captured at 1964x1402 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#E5E7EB` | Headline |
| Near-black | `#1D1A1B` | darkest |
| Gray | `#C7C9C6` | lighter step |
| Orange | `#634635` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 58px | Headline and interface text |
| Playfair Display | 58px | Accent type |
| Import 'Inter | 58px | Body face |

## 视觉要点

- Nothing sits between the type and the 1964x1402 clip, so a replacement has to work under the copy directly.
- Media is specified at 1964x1402 and a 6.4s loop, so a replacement should match the crop and the loop length.
- Font roles are assigned rather than mixed here, and 58px is the range the whole scale works in.

## 布局

**Navigation held to one row** — A slim bar sits over the hero section with the wordmark on the left and the links set in Inter, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1964x1402 composition without a background of its own, so the media runs edge to edge underneath it. Keep the link count to four or five; the row is sized for that.

**Measured, not eyeballed** — The layout works on absolute values rather than ratios: a fixed 58px display size, 30px spacing steps and 0.2s transitions. Spacing is quoted in the same units as the type, so the two can be compared directly.

**Top row: wordmark, links, one action** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. One action per bar.

**Nothing here is inherited** — Spacing is quoted the same way (a fixed 58px display size, 30px spacing steps and 0.2s transitions), not as a scale that grows on its own.


## 动效

**A loop, not a timeline** — The background clip runs 6.4s at 1964x1402 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Because it is muted, the loop can run under the copy without competing for sound or focus.

**State changes, timed** — The controls resolve in 0.2s, fast enough that the page answers as it is touched rather than after it. Easing is specified alongside the duration (0.2s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Set 0.2s to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Draft the new copy to the 1964x1402 frame, then check that the entrance still lands on the same number of lines.
- Swap the clip for your own. Export at 1964x1402 or wider, keep it muted, and make the 6.4s loop seamless so the cut is invisible.
- Replace the video with a still at 1964x1402 if the 6.4s loop is too heavy for the page you are shipping.

## 文案规则

**How Planor sequences the first read** — Committing to one reading path means other paths are closed. The brief accepts that, fixes navigation, the headline and the background clip in place, and spends a fixed 58px display size and 30px spacing steps on making the route obvious. A SaaS reader gets the offer before the options.

**How the hero section reflows** — The cost of a fluid scale is less control over exact sizes. What you get is a display line that stays proportionate, which is why a clamp between 58px and 30px is in the brief. The scale changes with the viewport; the sequence does not.

**Making the hero section yours** — Set the new copy at the display size the brief names (a fixed 58px display size and 30px spacing steps), and the rest of the scale follows without a redesign. Set the new copy at the same display size and re-check the contrast before you add anything.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Field | AI & SaaS |
| Viewport | 1964x1402 · 1.4:1 |
| Loop length | 6.4s loop |
| Prompt | 3,036 characters |
| Capture date | 2026-09-17 |
| Fonts | Inter, Playfair Display, Import 'Inter · 58px |
| Reference stack | Tailwind CSS, vanilla JS, single HTML file |
| Animation | 0.2s transitions and a 6.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1964x1402 capture before you generate.
2. Copy a fixed 58px display size, 30px spacing steps and 0.2s transitions into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: a fixed 58px display size, 30px spacing steps and 0.2s transitions.
4. Pin the reference measurements before you restyle anything: a fixed 58px display size, 30px spacing steps and 0.2s transitions.
5. Check your build against the reference measurements: a fixed 58px display size, 30px spacing steps and 0.2s transitions.

---
来源：https://ottermind.ai/explore/website/planor-hero
原始 prompt：3036 字符
