# Prisma Creative Studio

> Landing page reference for an agency or studio — 0.08s transitions, a dark stage, a 455x800 frame and React and Tailwind CSS.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：454x800 · 比例 0.5675 · 8.12s

## 概述

Prisma Creative Studio shows one way to build the landing page for an agency or studio, and publishes the instructions that produced it. It leads with “I have skills in color grading, visual effects, and narrative design” and gives that line the frame rather than shrinking it into a card. The colour scheme is black #101010 underneath and white #E1E0CC for the type, and the page is set in Instrument Serif. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. Motion comes down to 0.08s transitions. It is the right reference for an agency or studio landing page that has to look deliberate on the first screen.

## 主标题文案

> “I have skills in color grading, visual effects, and narrative design” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#E1E0CC` | Headline |
| White — darker | `#DEDBC8` | lighter step |
| Near-black | `#101010` | composition |
| Black | `#212121` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | 300 / 400 / 700 / 800 | Display and headline — the editorial voice of the page |
| Almarai | 300 / 400 / 700 / 800 | Text face |

## 视觉要点

- Transitions are specified at 0.08s, short enough that the page never feels like it is waiting for an animation.
- The timing budget is state feedback rather than page choreography (0.08s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.08s, which is the value to keep when the palette changes.

## 布局

**The bar shares the page grid** — A slim bar sits over the landing page with the wordmark on the left and the links set in Instrument Serif, so the composition reads as content first and chrome second. The bar sits over the 455x800 composition without a background of its own, so the media runs edge to edge underneath it.

**Values you can check** — The list stays short (10px spacing steps and 0.08s transitions), which is why the whole system can be checked by hand. The list is short enough that a reviewer can check it element by element.

**One row, no drawers** — One action per bar. The reference was captured at 455x800.

**Sizes fixed in the brief** — Spacing is quoted the same way (10px spacing steps and 0.08s transitions), not as a scale that grows on its own.


## 动效

**One duration for the controls** — Transitions are specified at 0.08s, which is the timing the controls are held to. Easing is specified alongside the duration (0.08s), so a rebuild cannot quietly substitute a different feel.

**Sections arrive on scroll** — Parallax is the only scroll behaviour in the brief, which keeps the page from feeling like a sequence of separate effects. Only one scroll behaviour is used, so the page never feels like a sequence of separate effects. The layout has to work with the effect disabled.


## 可替换项

- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 455x800 frame.
- Keep the 455x800 frame when you swap the content, because the composition was solved against that ratio.
- Retime the entrance to your own 0.08s, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Replace “I have skills in color grading, visual effects, and narrative design” with your own line and keep the word count, because the entrance is timed per line.

## 文案规则

**How the landing page reflows** — Responsive here means the scale changes and the sequence does not. the scale is fluid rather than stepped, and the reading order stays where the brief put it. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**Why the agency brief holds** — Prisma Creative Studio works because its hierarchy is decided rather than decorated. The brief sets 10px spacing steps and 0.08s transitions, so new copy lands inside the frame instead of reopening it. Prisma Creative Studio states the offer once and lets the composition repeat it rather than adding a second claim.

**What to change first in Prisma Creative Studio** — A straight substitution has a limit: if your product needs a different hierarchy, 10px spacing steps and 0.08s transitions will fight it. Change the order first in that case, and the values second. Substitution is cheaper than composition, and that is the point.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Vertical | Agencies & Studios |
| Frame | 455x800 · 0.57:1 |
| Brief | 8,432 characters |
| Archived | 2026-09-17 |
| Typefaces | Instrument Serif, Almarai |
| Built with | Tailwind CSS, React, TypeScript |
| Motion spec | 0.08s transitions |

## 复刻步骤

1. Check your build against the reference measurements: 10px spacing steps and 0.08s transitions.
2. Keep the measurements the brief spells out: 10px spacing steps and 0.08s transitions.
3. Pin the reference measurements before you restyle anything: 10px spacing steps and 0.08s transitions.
4. Copy 10px spacing steps and 0.08s transitions into your own brief before you rewrite anything else.
5. Copy the 0.08s timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/prisma-landing
原始 prompt：8432 字符
