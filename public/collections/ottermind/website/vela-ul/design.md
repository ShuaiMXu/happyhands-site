# Vela Ul

> Features section reference for an AI or SaaS product — cubic-bezier(.22,1.36,1) easing, a masked headline reveal, glass panels and a stats row.

- 行业：AI & SaaS（ai-saas）
- 区块：Features section
- 画布：1920x1418 · 比例 1.354 · 4.7s

## 概述

Read Vela Ul as a features section spec: the values were written down before the page was built. The colour scheme is #16120C underneath and #F7F5F2 for the type, and the page is set in Arial, Helvetica. It ships as one self-contained HTML file, so the whole features section can be lifted into a project without a design handoff. The brief spends its motion budget on 720ms transitions, cubic-bezier(.22,1.36,1) and a looping video bed. It is most useful when the AI & SaaS features section has to survive a copy change without a redesign.

## 主标题文案

> Features section reference for an AI or SaaS product, captured at 1920x1418 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#16120C` | panels |
| Tint | `#F7F5F2` | Headline |
| Tint — darker | `#AAA7AA` | Secondary |
| Near-black — lighter | `#17130E` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Arial, Helvetica | 25px | UI face |
| Times New Roman | 25px | Accent face |

## 视觉要点

- Transitions are specified at 720ms, which is the value to keep when the palette changes.
- The clip is one asset at 1920x1418 and a 4.7s loop, so the composition has a single media dependency.
- Media is specified at 1920x1418 and a 4.7s loop, so a replacement should match the crop and the loop length.

## 布局

**Links before the action** — A short run of links and a single action sit over the features section, held at a fixed 25px display size and 100vh sections so the bar never competes with the composition behind it. Below 410px the links collapse instead of wrapping onto a second line.

**One media element carries the mood** — The composition is built on top of the 1920x1418 clip rather than beside it, so the media never gets a panel or a border. A poster frame at 1920x1418 holds the composition when autoplay is unavailable, so the layout never collapses.

**Figures at display size** — The figures are set in Arial, Helvetica at a size closer to the headline than to the body copy. Labels sit under the figures at the smallest step in the brief, so the row reads as data rather than decoration. If a figure needs a paragraph, it is not a stat.

**Behaviour is defined per width** — Type is sized with a clamp between 14px and 20px rather than fixed steps, so the display line stays proportionate between breakpoints instead of jumping. Because the scale is clamped, the display line never jumps between breakpoints.


## 动效

**Timings in milliseconds** — Transitions are specified at 720ms using cubic-bezier(.22,1.36,1), which is the timing the controls are held to. The values are short enough to read as feedback rather than as animation. Keep the durations when you re-skin the page.

**Ambient motion without a scroll library** — Ambient movement comes from the 4.7s 1920x1418 loop rather than from scroll effects, which keeps the page calm and the type readable. The clip is short enough to loop without a visible seam, which matters more than its resolution.


## 可替换项

- Retime the entrance to your own 720ms, but keep cubic-bezier(.22,1.36,1) as the curve, because the easing is what reads as this design.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1920x1418 frame.
- Keep Arial, Helvetica or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Keep the supporting line as short as the reference's and measure the pair against the 1920x1418 crop.

## 文案规则

**Making the features section yours** — Re-skinning the palette first is the usual mistake. It changes the mood without touching the composition, and a fixed 25px display size and 100vh sections still carry the layout; do the copy and media first and the palette last. Keep the media crop; it is doing as much work as the type.

**What an AI or SaaS product gains here** — You could rebuild this as a stack of separate cards and lose only the argument. The features section reads as one decision instead: navigation, the headline, the announcement badge, the stats row and the card grid in a single sequence. Vela Ul states the offer once and lets the composition repeat it rather than adding a second claim.

**How the features section reflows** — Compared with a mobile layout that hides sections, this one keeps them and changes their shape: the scale is fluid rather than stepped, the layout shifts at 410px and the section is held at 100vh. Width changes the measurements, not the reading path.


## 规格

| 项 | 值 |
|---|---|
| Screen | Features section |
| Vertical | AI & SaaS |
| Format | 1920x1418 · 1.35:1 |
| Loop | 4.7s loop |
| Source text | 25,889 characters |
| Archived | 2026-09-17 |
| Type | Arial, Helvetica, Times New Roman · 25px |
| Tools | vanilla JS, single HTML file |
| Timing | 720ms transitions, cubic-bezier(.22,1.36,1) easing and a 4.7s media loop |

## 复刻步骤

1. Copy a fixed 25px display size, 100vh sections and a 3-column grid into your own brief before you rewrite anything else.
2. Check your build against the reference measurements: a fixed 25px display size, 100vh sections and a 3-column grid.
3. Keep the measurements the brief spells out: a fixed 25px display size, 100vh sections and a 3-column grid.
4. Pin the reference measurements before you restyle anything: a fixed 25px display size, 100vh sections and a 3-column grid.
5. Port the motion last: the entrance, the 720ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/vela-ul
原始 prompt：25889 字符
