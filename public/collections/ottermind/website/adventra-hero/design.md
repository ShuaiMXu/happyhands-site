# Adventra

> Hero section reference for an agency or studio — one self-contained HTML file, a word-by-word headline, looping video and #303230 base.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1856x1398 · 比例 1.3276 · 6.95s

## 概述

Adventra is the hero section reference for an agency or studio, and the brief behind it is a full build spec rather than a mood board. The headline reads “Home, Our Story, FAQ, Policies”, and the rest of the hero section is arranged around it. The palette runs black #303230 underneath and gray #CAC7BD for the type, and the type is Inter. The build is one self-contained HTML file; every measurement in it is written down, which is what makes it reusable. The brief spends its motion budget on a looping video bed. It is the right reference for an agency or studio hero section that has to look deliberate on the first screen.

## 主标题文案

> “Home, Our Story, FAQ, Policies” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep orange | `#2F2215` | darkest |
| Gray | `#CAC7BD` | Headline |
| Orange | `#51381A` | saturated |
| Black | `#303230` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 / 700 | Headline and interface text — one face for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 60px is the range the whole scale works in.
- Nothing sits between the type and the 1856x1398 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1856x1398 and a 7s loop, so the composition has a single media dependency.

## 布局

**Links before the action** — A slim bar sits over the hero section with the wordmark on the left and the links set in Inter, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1856x1398 composition without a background of its own, so the media runs edge to edge underneath it. Keep the link count to four or five; the row is sized for that.

**Every measurement is written down** — The layout is solved against fixed values (a fixed 60px display size, 100vh sections and 16px spacing steps), which is what keeps the first screen composed at any width. The smallest and largest values in that list set the range the composition works in.

**One row, no drawers** — The wordmark is treated as type rather than as a logo lockup, which keeps the top row on one baseline. Copy this pattern when you need navigation that survives a loud first screen.

**Measured, not eyeballed** — Spacing is quoted the same way (a fixed 60px display size, 100vh sections and 16px spacing steps), not as a scale that grows on its own.


## 动效

**Ambient motion without a scroll library** — The background clip runs 7s at 1856x1398 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.

**Interaction is on the controls** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. A control that looks interactive behaves interactively, so there are no false affordances. Fewer states, fully specified.


## 可替换项

- Replace “Home, Our Story, FAQ, Policies” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Swap the clip for your own footage at 1856x1398 or wider, keep it muted, and match the 7s loop point.
- Swap the clip for your own. Export at 1856x1398 or wider, keep it muted, and make the 7s loop seamless so the cut is invisible.
- Swap in your own headline where “Home, Our Story, FAQ, Policies” sits and keep the line breaks, because the entrance animates per line.

## 文案规则

**What moves in Adventra** — Motion here is a set of decisions, not a library: a word-by-word headline, a 7s media loop and hover and press states, and nothing animates on scroll. The result is a page that feels authored: short durations, one entrance, and state changes that confirm an action rather than decorate it. Nothing animates for its own sake in this hero section.

**What to change first in Adventra** — Re-skinning the palette first is the usual mistake. It changes the mood without touching the composition, and a fixed 60px display size and 100vh sections still carry the layout; do the copy and media first and the palette last. Rewrite the copy and the media before you re-colour anything.

**How Adventra sequences the first read** — Nothing here competes with the first decision. “Home, Our Story, FAQ, Policies” is doing that work from the first frame. The supporting material waits below the fold, and navigation and the background clip carry the top of the page alone. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Category | Agencies & Studios |
| Canvas size | 1856x1398 · 1.33:1 |
| Clip length | 7s loop |
| Source text | 3,134 characters |
| Archived | 2026-09-17 |
| Faces | Inter · 60px |
| Stack | Tailwind CSS, vanilla JS, single HTML file |
| Motion spec | a 7s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1856x1398 capture before you generate.
2. Copy a fixed 60px display size, 100vh sections and 16px spacing steps into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: a fixed 60px display size, 100vh sections and 16px spacing steps.
4. Keep the measurements the brief spells out: a fixed 60px display size, 100vh sections and 16px spacing steps.
5. Check your build against the reference measurements: a fixed 60px display size, 100vh sections and 16px spacing steps.

---
来源：https://ottermind.ai/explore/website/adventra-hero
原始 prompt：3134 字符
