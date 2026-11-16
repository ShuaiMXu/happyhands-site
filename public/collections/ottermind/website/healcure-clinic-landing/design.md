# Healcure

> Hero section reference for a health or wellbeing product — Tailwind CSS, looping video, #374251 base and a stats row.

- 行业：Health（health）
- 区块：Hero section
- 画布：1466x1080 · 比例 1.3574 · 5.433s

## 概述

Before rebuilding a hero section for a health or wellbeing product, read Healcure: the composition and the specification behind it are both here. The headline reads “Healthcare for Good. Today. Tomorrow. Always.”, and the rest of the hero section is arranged around it. The palette is muted blue #374251 underneath. Delivery is Tailwind CSS, captured at 1466x1080 so the frame is fixed before any code is written. Motion is limited to a looping video bed. Take it on when the hero section needs a decided order before any new sections are added.

## 主标题文案

> “Healthcare for Good. Today. Tomorrow. Always.” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#14191C` | darkest |
| Gray | `#979DA6` | lightest |
| Orange | `#5F4638` | saturated |
| Muted blue | `#374251` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Media is specified at 1466x1080 and a 5.4s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1466x1080 and a 5.4s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1466x1080 clip, so a replacement has to work under the copy directly.

## 布局

**The nav is deliberately thin** — The bar overlays the hero section instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1466x1080 composition without a background of its own, so the media runs edge to edge underneath it. If your own page has more sections, group them rather than widening the bar.

**The sizes are in the brief, not in a scale** — The brief fixes 14px spacing steps and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**A stat strip, not a table** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the hero section from turning into a feature list. Labels are set at one size, so a long label does not change the height of the row.

**The announcement pill** — The badge is the only element allowed above the headline, which is what makes it read as an announcement instead of chrome. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title.


## 动效

**Ambient motion without a scroll library** — Ambient movement is one 5.4s clip at 1466x1080, looping quietly behind the copy rather than reacting to the pointer. Because it is muted, the loop can run under the copy without competing for sound or focus. Shoot or export at 1466x1080 or wider.

**Almost no motion** — The brief leaves animation out and lets the 1466x1080 layout carry the page, with hover and press states the only changes. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Hold the 1466x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Keep the 1466x1080 frame when you swap the content, because the composition was solved against that ratio.
- Replace “Healthcare for Good. Today. Tomorrow. Always.” with your own line and keep the word count, because the entrance is timed per line.
- Rewrite the four or five navigation labels for your own sections and keep the single action at the right edge.

## 文案规则

**What to change first in Healcure** — If your brand runs a heavier palette, test it against the frame before you commit. muted blue #374251 carries the page, so a darker accent needs more contrast than the reference uses. The frame and the scale are what to leave alone.

**The order behind the hero section** — The brief runs 3,021 characters and names the reading order explicitly: navigation, the announcement badge and the stats row, with 14px spacing steps between them. A health reader gets the offer before the options.

**The numbers behind the hero section** — Type is the first number: 14px spacing steps. The spacing follows from it, and everything else on the page is positioned against those two values. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Sector | Health |
| Viewport | 1466x1080 · 1.36:1 |
| Loop length | 5.4s loop |
| Input brief | 3,021 characters |
| Captured | 2026-09-17 |
| Tools | Tailwind CSS |
| Animation | a 5.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1466x1080 capture before you generate.
2. Load the prompt in Studio and check that it names Tailwind CSS before you press send.
3. Set the brand first: product name, palette and headline, all three before any layout edit.
4. Set your brand first: product name, the palette and the headline that replace the reference's.
5. Replace the product name and the palette before you move a single block.

---
来源：https://ottermind.ai/explore/website/healcure-clinic-landing
原始 prompt：3021 字符
