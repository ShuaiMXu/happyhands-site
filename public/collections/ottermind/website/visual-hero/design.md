# Visual Hero

> Hero section reference for an AI or SaaS product — fluid type, a stats row, glass panels and React and Tailwind CSS.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：996x720 · 比例 1.3833 · 6.933s

## 概述

Read Visual Hero as a hero section spec: the values were written down before the page was built. It leads with “Forma's AI understands context, composition, and style like a creative director would” and gives that line the frame rather than shrinking it into a card. Typography is Instrument Serif, and the brief fixes the sizes rather than leaving them to a scale. Delivery is React and Tailwind CSS, captured at 996x720 so the frame is fixed before any code is written. Motion comes down to a looping video bed. If you are briefing a SaaS hero section, start from this composition and replace the subject.

## 主标题文案

> “Forma's AI understands context, composition, and style like a creative director would” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Primary | `#111111` | base surface |
| Support | `#FFFFFF` | panels |
| Accent | `#A78BFA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | Weight not fixed in the brief | Title face |
| Dirtyline | Weight not fixed in the brief | Text face |
| Barlow | Weight not fixed in the brief | Fallback and supporting interface text |

## 视觉要点

- The clip is one asset at 996x720 and a 6.9s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 996x720 clip, so a replacement has to work under the copy directly.
- Media is specified at 996x720 and a 6.9s loop, so a replacement should match the crop and the loop length.

## 布局

**Navigation without a background** — The wordmark holds the left edge and the links run to the right of it, all of it set in Instrument Serif so the bar belongs to the page below rather than to a separate system. The bar sits over the 996x720 composition without a background of its own, so the media runs edge to edge underneath it. If your own page has more sections, group them rather than widening the bar.

**Measured, not eyeballed** — Every measurement in the brief is a number you can measure back: 50px spacing steps. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length. Substitute the face or the copy, not the scale.

**Proof in one row** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the hero section from turning into a feature list. Figures are set at one weight, so the row does not rank its own statistics.

**Links collapse at one width** — Focus and hover states are specified for each link rather than inherited from the browser. The bar is a handful of elements, so it rebuilds without a component library.


## 动效

**Scroll drives the sequence** — Parallax is the only scroll behaviour in the brief, which keeps the page from feeling like a sequence of separate effects. The scroll behaviour is measured against the same layout the static page uses, so nothing shifts when it is removed.

**The loop does the ambient work** — The background clip runs 6.9s at 996x720 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. The clip is muted and inline, so the first frame is available without an interaction.


## 可替换项

- Recut your footage to the 6.9s loop, then export at 996x720 so the crop the reference specifies survives.
- Keep Instrument Serif or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Hold the 996x720 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Rewrite “Forma's AI understands context, composition, and style like a creative director would” to the same line count; the mask reveals each line in turn.

## 文案规则

**The numbers behind the hero section** — Committing to 50px spacing steps trades flexibility for repeatability. That is the point of the reference: the same page in a different brand, without a new set of guesses. Nothing in this hero section depends on a default.

**How Visual Hero sequences the first read** — Committing to one reading path means other paths are closed. The brief accepts that, fixes navigation, the announcement badge, the stats row and the background clip in place, and spends 50px spacing steps on making the route obvious. A SaaS reader gets the offer before the options.

**Why this composition works for SaaS** — If your first screen currently explains three things, this is the version that explains one. navigation, the announcement badge, the stats row and the background clip are staged in reading order, with 50px spacing steps setting the rhythm. It gives a SaaS reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | AI & SaaS |
| Canvas size | 996x720 · 1.38:1 |
| Loop length | 6.9s loop |
| Input brief | 8,275 characters |
| Archived | 2026-09-17 |
| Fonts | Instrument Serif, Dirtyline, Barlow |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | a 6.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 996x720 capture before you generate.
2. Check your build against the reference measurements: 50px spacing steps.
3. Copy 50px spacing steps into your own brief before you rewrite anything else.
4. Keep the measurements the brief spells out: 50px spacing steps.
5. Pin the reference measurements before you restyle anything: 50px spacing steps.

---
来源：https://ottermind.ai/explore/website/visual-hero
原始 prompt：8275 字符
