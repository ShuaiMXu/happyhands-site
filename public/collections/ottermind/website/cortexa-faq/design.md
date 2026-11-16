# Cortexa FAQ

> FAQ section reference for an AI or SaaS product — 400ms transitions, React and Tailwind CSS, a word-by-word headline and looping video.

- 行业：AI & SaaS（ai-saas）
- 区块：FAQ section
- 画布：1826x1302 · 比例 1.4025 · 0s

## 概述

Cortexa FAQ is a working reference for an AI or SaaS product: the FAQ section laid out, measured and ready to rebuild. It leads with “How do I start the process of buying a home?” and gives that line the frame rather than shrinking it into a card. It ships as React and Tailwind CSS, so the whole FAQ section can be lifted into a project without a design handoff. Motion comes down to 400ms transitions and a looping video bed. Start from the captured brief, then edit the FAQ section rather than rebuilding it from scratch.

## 主标题文案

> FAQ section reference built around “How do I start the process of buying a home?”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Primary | `#111111` | base surface |
| Support | `#FFFFFF` | panels |
| Accent | `#A78BFA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Media is specified at 1826x1302 and a 0.1s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1826x1302 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1826x1302 and a 0.1s loop, so the composition has a single media dependency.

## 布局

**Numbers carried into the build** — The layout works on absolute values rather than ratios: 15px spacing steps and 400ms transitions. A rebuild that hits those numbers looks like the reference without further tuning.

**One clip does the work** — The brief specifies the video at 1826x1302 with a loop of 0.1s, and every text element is placed against that frame. A poster frame at 1826x1302 holds the composition when autoplay is unavailable, so the layout never collapses.

**The form is the whole first screen** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. Labels sit above their inputs and the supporting copy stays above the first field. Specify the focus state.

**The brief names the steps** — Spacing is quoted the same way (15px spacing steps and 400ms transitions), not as a scale that grows on its own.


## 动效

**Interaction kept local** — The page answers only where it can be acted on: hover states on the buttons and links rather than on every card and tabs or an accordion that swaps content in place. Each state changes one property, which keeps the feedback legible. Do not animate layout on hover.

**Fast enough to feel deliberate** — State changes are specified at 400ms, so the feedback on the controls is a designed value rather than a browser default. Nothing waits on a scroll position, so the page responds the moment you touch it.


## 可替换项

- Read the brief value by value against the 1826x1302 capture before you edit anything; the numbers are the part that is easiest to lose.
- Swap in your own headline where “How do I start the process of buying a home?” sits and keep the line breaks, because the entrance animates per line.
- Keep 1826x1302 for the media and re-crop your own asset into it rather than resizing the frame.
- Retime the entrance to your own 400ms, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**What this FAQ section gets right** — There is one promise on this page, and 15px spacing steps and 400ms transitions hold it in place. “How do I start the process of buying a home?” is doing that work from the first frame. Nothing below the fold is asked to carry the offer as well. It gives a SaaS reader the shortest honest route to the offer.

**How Cortexa FAQ sequences the first read** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: the form are a sequence, and 15px spacing steps and 400ms transitions only work in that order. A SaaS reader gets the offer before the options.

**How the FAQ section reflows** — The desktop composition is solved against 1826x1302, and the narrow layout is designed rather than inherited: the scale is fluid rather than stepped. Motion has a reduced-motion branch, and the media carries a poster frame so the page still communicates when autoplay is unavailable. The mobile version is a decision, not a fallback.


## 规格

| 项 | 值 |
|---|---|
| Section | FAQ section |
| Industry | AI & SaaS |
| Frame | 1826x1302 · 1.4:1 |
| Loop length | 0.1s loop |
| Source text | 4,955 characters |
| Saved | 2026-09-17 |
| Stack | Tailwind CSS, React, Lucide icons |
| Animation | 400ms transitions and a 0.1s media loop |

## 复刻步骤

1. Open the reference in Studio with the prompt staged, and read the FAQ section brief before you send it.
2. Start in Studio with the prompt prefilled, then delete the parts of the FAQ section you do not need.
3. Stage the prompt in Studio and read it once against the 1826x1302 capture before you generate.
4. Keep the measurements the brief spells out: 15px spacing steps and 400ms transitions.
5. Check your build against the reference measurements: 15px spacing steps and 400ms transitions.

---
来源：https://ottermind.ai/explore/website/cortexa-faq
原始 prompt：4955 字符
