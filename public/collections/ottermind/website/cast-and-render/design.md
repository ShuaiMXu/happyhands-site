# Cast and Render

> Landing page reference for a 3D, game or entertainment brand — looping video, scroll-triggered reveals and one self-contained HTML file.

- 行业：3D & Games（3d-games）
- 区块：Landing page
- 画布：1920x1432 · 比例 1.3408 · 4.925s

## 概述

Read Cast and Render as a landing page spec: the values were written down before the page was built. Colour is limited to neutral #F2F0EC underneath and near-black #0A0908 for the type, set in Inter. Delivery is one self-contained HTML file, captured at 1920x1432 so the frame is fixed before any code is written. Motion comes down to 3s transitions, cubic-bezier(.22.61.36,1) and a looping video bed. Treat it as the brief for a 3D, game or entertainment brand landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference for a 3D, game or entertainment brand, captured at 1920x1432 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0D0C0B` | Headline |
| Neutral | `#F2F0EC` | composition |
| Near-black — darker | `#0A0908` | Body text |
| Neutral — lighter | `#FFFFFF` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 12–15px | Headline and interface text — one face for the whole page |

## 视觉要点

- The navigation collapses at max-width 280px and max-width 420px, so the bar has a designed narrow state.
- Transitions are specified at 3s, which is the value to keep when the palette changes.
- Font roles are assigned rather than mixed here, and 12–15px is the range the whole scale works in.

## 布局

**Navigation without a background** — A short run of links and a single action sit over the landing page, held at type from 12px to 15px and 560vh sections so the bar never competes with the composition behind it. Below 280px the links collapse instead of wrapping onto a second line.

**One media element carries the mood** — The clip runs 4.9s at 1920x1432 and loops without a visible cut, so it reads as surface rather than as footage. A poster frame at 1920x1432 holds the composition when autoplay is unavailable, so the layout never collapses.

**A list, not a card wall** — Features are set as a list in Inter rather than a grid of cards, which keeps the page dense and quick to scan on a narrow screen. The list is left-aligned to the same margin as the headline.

**Proof in one row** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the landing page from turning into a feature list. The figures sit on the same baseline as the copy around them, so the row reads as one object. Cut a figure before you shrink the label.


## 动效

**Sections arrive with scroll** — Scroll reveal is the only scroll behaviour in the brief, which keeps the page from feeling like a sequence of separate effects. Only one scroll behaviour is used, so the page never feels like a sequence of separate effects. Keep one scroll behaviour, not three.

**Timings in milliseconds** — The timings are short and consistent (3s using cubic-bezier(.22.61.36,1)), so hover and press states read as one system instead of a set of separate effects. Easing is specified alongside the duration (3s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 1920x1432 crop.
- Swap the clip for your own. Export at 1920x1432 or wider, keep it muted, and make the 4.9s loop seamless so the cut is invisible.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1920x1432 frame.
- Retime the entrance to taste. 3s with cubic-bezier(.22.61.36,1) is what the reference uses.

## 文案规则

**The numbers behind the landing page** — 18,074 characters of brief produce a full specification. The load-bearing part is short: type from 12px to 15px, 560vh sections, 999px corners and 14px spacing steps. Nothing in this landing page depends on a default.

**The order behind the landing page** — Order is the design here. navigation, the announcement badge, the stats row, the feature list and the countdown are placed so the offer lands before the proof, and type from 12px to 15px and 560vh sections set the gap between them. A 3D reader gets the offer before the options.

**What this landing page gets right** — Compared with a template hero, the difference is what is missing. There is no card grid, no carousel and no second call to action: only navigation, the announcement badge, the stats row, the feature list and the countdown, sized against type from 12px to 15px and 560vh sections. Cast and Render states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Field | 3D & Games |
| Canvas size | 1920x1432 · 1.34:1 |
| Clip length | 4.9s loop |
| Prompt text | 18,074 characters |
| Captured | 2026-09-17 |
| Type scale | Inter · 12–15px |
| Tools | Tailwind CSS, React, GSAP |
| Motion | 3s transitions, cubic-bezier(.22.61.36,1) easing and a 4.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1432 capture before you generate.
2. Check your build against the reference measurements: type from 12px to 15px, 560vh sections and 999px corners.
3. Copy type from 12px to 15px, 560vh sections and 999px corners into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: type from 12px to 15px, 560vh sections and 999px corners.
5. Keep the measurements the brief spells out: type from 12px to 15px, 560vh sections and 999px corners.

---
来源：https://ottermind.ai/explore/website/cast-and-render
原始 prompt：18074 字符
