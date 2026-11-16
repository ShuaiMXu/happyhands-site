# TrustFlow

> Landing page reference for a fintech product — #FFFFFF base, looping video, a stats row and React and Tailwind CSS.

- 行业：Fintech（fintech）
- 区块：Landing page
- 画布：1462x1080 · 比例 1.3537 · 6.3s

## 概述

TrustFlow shows one way to build the landing page for a fintech product, and publishes the instructions that produced it. Colour is limited to white #FFFFFF underneath and black #191919 for the type, set in Inter. Delivery is React and Tailwind CSS, captured at 1462x1080 so the frame is fixed before any code is written. Motion is limited to 200ms transitions and a looping video bed. If you are briefing a fintech landing page, start from this composition and replace the subject.

## 主标题文案

> Landing page reference for a fintech product, captured at 1462x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#191919` | Headline |
| White | `#F4F3F3` | panel edges |
| White — lighter | `#FFFFFF` | composition |
| White — darker | `#EAEAEA` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 | UI text |
| P22 Mackinac W01 Book | 300 / 400 / 500 / 600 | Secondary copy, captions and labels |

## 视觉要点

- Nothing sits between the type and the 1462x1080 clip, so a replacement has to work under the copy directly.
- Media is specified at 1462x1080 and a 6.3s loop, so a replacement should match the crop and the loop length.
- The type is set in Inter on a 15px scale, and the spacing follows the same steps.

## 布局

**Navigation without a background** — Navigation is a single row with no second level under it. The bar sits over the 1462x1080 composition without a background of its own, so the media runs edge to edge underneath it. The bar is a handful of elements, so it rebuilds without a component library.

**The sizes are in the brief, not in a scale** — Type and spacing are drawn from one list here: a fixed 15px display size, 11px spacing steps and 200ms transitions. The smallest and largest values in that list set the range the composition works in.

**Numbers on the baseline** — The figures are set in Inter at a size closer to the headline than to the body copy. Numbers share the interface face, so they belong to the page instead of interrupting it.

**The bar shares the page grid** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. Copy this pattern when you need navigation that survives a loud first screen.


## 动效

**A small interactive surface** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Interactive targets are large enough to tap and the pointer treatment is consistent across them.

**Timing kept in the brief** — Hover, press and focus all resolve in 200ms, which is what makes the interface feel immediate. Because the values are short, a rebuild that slows them down is immediately visible.


## 可替换项

- Draft the new copy to the 1462x1080 frame, then check that the entrance still lands on the same number of lines.
- Set 200ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1462x1080 frame.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 1462x1080.

## 文案规则

**The timing behind the landing page** — Keeping motion this small means the page leans on the type and the frame instead. If 200ms transitions, a 6.3s media loop and hover and press states were removed entirely, the composition would still stand. Nothing animates for its own sake in this landing page.

**What to change first in TrustFlow** — Change the content first and check the frame afterwards. a fixed 15px display size, 11px spacing steps and 200ms transitions are the values to protect while you swap the copy. Keep the media crop; it is doing as much work as the type.

**Why the fintech brief holds** — Restraint costs you room for proof above the fold. This brief accepts that cost and spends the first screen on the offer, with a fixed 15px display size and 11px spacing steps fixed so a proof section can be added below without a rework. TrustFlow states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Industry | Fintech |
| Viewport | 1462x1080 · 1.35:1 |
| Runtime | 6.3s loop |
| Prompt text | 6,275 characters |
| Captured | 2026-09-17 |
| Fonts | Inter, P22 Mackinac W01 Book · 15px |
| Tech stack | Tailwind CSS, React, TypeScript |
| Timing | 200ms transitions and a 6.3s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1462x1080 capture before you generate.
2. Keep the measurements the brief spells out: a fixed 15px display size, 11px spacing steps and 200ms transitions.
3. Copy a fixed 15px display size, 11px spacing steps and 200ms transitions into your own brief before you rewrite anything else.
4. Check your build against the reference measurements: a fixed 15px display size, 11px spacing steps and 200ms transitions.
5. Pin the reference measurements before you restyle anything: a fixed 15px display size, 11px spacing steps and 200ms transitions.

---
来源：https://ottermind.ai/explore/website/trustflow
原始 prompt：6275 字符
