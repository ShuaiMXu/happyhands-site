# Zyphor

> Hero section reference for an AI or SaaS product — a word-by-word headline, looping video, #0B0C10 base and a dark stage.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：1920x1392 · 比例 1.3793 · 7.233s

## 概述

Zyphor keeps its decision trail: the brief that produced this hero section runs 3,562 characters. The page's own headline reads “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive”, and the composition is built around those exact words. The colour scheme is deep blue #0B0C10 underneath, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1930x1400 so the frame is fixed before any code is written. Motion is confined to a looping video bed. Start from the captured brief, then edit the hero section rather than rebuilding it from scratch.

## 主标题文案

> “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0E0F14` | panel edges |
| Gray | `#A1A1AA` | lightest |
| Deep blue | `#1C1D22` | Secondary |
| Near-black — darker | `#0B0C10` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Nothing sits between the type and the 1930x1400 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1930x1400 and a 7.2s loop, so the composition has a single media dependency.
- Media is specified at 1930x1400 and a 7.2s loop, so a replacement should match the crop and the loop length.

## 布局

**The nav is deliberately thin** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1930x1400 composition without a background of its own, so the media runs edge to edge underneath it. Give the wordmark no more room than its type needs.

**Sizes fixed in the brief** — The brief names the numbers: 20px spacing steps. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The list is short enough that a reviewer can check it element by element.

**The type carries the tone** — Type is the styling system here: Inter at the display size, the same face across the interface, and no second accent colour doing the work. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.

**Top row: wordmark, links, one action** — Nothing in the bar animates on scroll; it is present from the first frame and stays out of the way after that. Copy this pattern when you need navigation that survives a loud first screen.


## 动效

**Pointer states, nothing more** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. Press states are specified as well as hover, so a tap gives the same confirmation as a click. Do not animate layout on hover.

**Ambient motion without a scroll library** — One 7.2s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size.


## 可替换项

- Replace “Manage projects effortlessly with smart tools, stay on track, meet deadlines, and keep your team productive” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Read the brief value by value against the 1930x1400 capture before you edit anything; the numbers are the part that is easiest to lose.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1930x1400 frame.
- Write the replacement headline first, then confirm it still fits the 1930x1400 frame at the reference's type size.

## 文案规则

**The numbers behind the hero section** — Committing to 20px spacing steps trades flexibility for repeatability. That is the point of the reference: the same page in a different brand, without a new set of guesses. Nothing in this hero section depends on a default.

**The order behind the hero section** — A strict order costs you flexibility later. Add a section above the fold and 20px spacing steps have to be re-cut, because the sequence is load-bearing rather than decorative. A SaaS reader gets the offer before the options.

**What this hero section gets right** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a 7.2s 1930x1400 loop. The frame stays quiet and 20px spacing steps keep the reader on the text. Zyphor states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | AI & SaaS |
| Canvas | 1930x1400 · 1.38:1 |
| Loop | 7.2s loop |
| Prompt | 3,562 characters |
| Date | 2026-09-17 |
| Faces | Inter |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Motion spec | a 7.2s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1930x1400 capture before you generate.
2. Keep the measurements the brief spells out: 20px spacing steps.
3. Pin the reference measurements before you restyle anything: 20px spacing steps.
4. Copy 20px spacing steps into your own brief before you rewrite anything else.
5. Check your build against the reference measurements: 20px spacing steps.

---
来源：https://ottermind.ai/explore/website/zyphor-hero
原始 prompt：3562 字符
