# Wellbeing OS

> Hero section reference for a health or wellbeing product — Helvetica, Segoe UI, Roboto, a stats row, React and Tailwind CSS and 400ms transitions.

- 行业：Health（health）
- 区块：Hero section
- 画布：1460x1080 · 比例 1.3519 · 5.8s

## 概述

Wellbeing OS keeps its decision trail: the brief that produced this hero section runs 5,051 characters. The colour scheme is deep orange #2C221C underneath and orange #BF9423 carrying the accents, and the page is set in Helvetica, Segoe UI, Roboto. Delivery is React and Tailwind CSS, captured at 1460x1080 so the frame is fixed before any code is written. Motion is confined to 400ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed. It is most useful when the Health hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built on deep orange #2C221C and orange #BF9423, set in Helvetica, Segoe UI, Roboto and measured against 160px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep orange | `#2C221C` | composition |
| Near-black | `#010101` | darkest |
| Orange | `#DBB64D` | lighter |
| Orange — darker | `#BF9423` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Segoe UI, Roboto | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- Accent use is limited to orange #BF9423; everything else sits on deep orange #2C221C.
- Media is specified at 1460x1080 and a 5.8s loop, so a replacement should match the crop and the loop length.

## 布局

**Top row: wordmark, links, one action** — Links sit on one line at a single size, and the #BF9423 action closes the row on the right so the eye finishes where the navigation ends. The links are set below the wordmark in size, and the #BF9423 action is the only element in the bar with any weight.

**Measured against the viewport** — The layout is solved against fixed values (160px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing), which is what keeps the first screen composed at any width. The list is short enough that a reviewer can check it element by element.

**A clip, not an illustration** — The 1460x1080 frame is filled by a single loop that plays behind the copy and asks for no controls. A poster frame at 1460x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**The type carries the tone** — The display line is set in Helvetica, Segoe UI, Roboto at a size the brief fixes, which makes the headline a composition element rather than a paragraph. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.


## 动效

**Ambient motion without a scroll library** — Ambient movement is one 5.8s clip at 1460x1080, looping quietly behind the copy rather than reacting to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution.

**Timing kept in the brief** — The brief fixes the transition value at 400ms, so a rebuild cannot substitute a slower default. Every state change names a value, so the browser default is never used. The timings are part of the design, not a finishing pass.


## 可替换项

- Retime the entrance to taste. 400ms with cubic-bezier(0.16,1,0.3,1) is what the reference uses.
- Replace #BF9423 last, after the copy is final, and test it against #2C221C at the smallest text size on the page.
- Keep Helvetica, Segoe UI, Roboto or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1460x1080 frame.

## 文案规则

**How Wellbeing OS sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 160px spacing steps and 400ms transitions have to be re-cut, because the sequence is load-bearing rather than decorative. A health reader gets the offer before the options.

**What moves in Wellbeing OS** — The brief ties every transition to a value (400ms transitions, a 5.8s media loop and hover and press states). That is what keeps the page from feeling like a template with an animation preset dropped on top of it. Nothing animates for its own sake in this hero section.

**What to change first in Wellbeing OS** — Most people start with the accent colour. Start with the promise instead: rewrite the display line, then re-test orange #BF9423 against your own media. The composition is the reusable part, and it survives a different brand.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | Health |
| Canvas | 1460x1080 · 1.35:1 |
| Loop length | 5.8s loop |
| Prompt | 5,051 characters |
| Date | 2026-09-17 |
| Key tone | orange #BF9423 |
| Faces | Helvetica, Segoe UI, Roboto |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Motion spec | 400ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 5.8s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1460x1080 capture before you generate.
2. Type the product name and the #BF9423 accent before you touch the layout.
3. Set the brand first: product name, the #BF9423 accent and a headline that replaces the reference's.
4. Drop your product name in, then replace #BF9423 with your own accent and re-check the contrast.
5. Set your brand first: product name, the #BF9423 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/wellbeing-os
原始 prompt：5051 字符
