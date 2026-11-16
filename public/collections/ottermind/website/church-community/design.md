# Church Community

> Landing page reference for an education or community brand — Manrope, a stats row, #5A4C41 base and #F1E5C6 accent.

- 行业：Education & Community（education）
- 区块：Landing page
- 画布：1448x1080 · 比例 1.3407 · 5.5s

## 概述

Read Church Community as a landing page spec: the values were written down before the page was built. “Take a step toward the light” is the line the layout is built to carry. The colour scheme is muted orange #5A4C41 underneath, white #FFFFFF for the type and muted orange #F1E5C6 carrying the accents, and the page is set in Manrope. The reference is built with React and Framer Motion, and the layout decisions are stated independently of it. Motion comes down to a looping video bed. Borrow the structure and not the subject: the landing page and its numbers move to your brand unchanged.

## 主标题文案

> Landing page reference built on muted orange #5A4C41 and muted orange #F1E5C6, set in Manrope and measured against 36px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted orange | `#F1E5C6` | accent |
| Muted orange — darker | `#5A4C41` | composition |
| Black | `#2A2A2A` | darkest |
| White | `#FFFFFF` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Manrope | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The clip is one asset at 1448x1080 and a 5.5s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1448x1080 clip, so a replacement has to work under the copy directly.
- Media is specified at 1448x1080 and a 5.5s loop, so a replacement should match the crop and the loop length.

## 布局

**A bar with nothing spare** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #F1E5C6 action, all of it sitting above the landing page without a background of its own. The links are set below the wordmark in size, and the #F1E5C6 action is the only element in the bar with any weight.

**Measured, not eyeballed** — Type and spacing are drawn from one list here: 36px spacing steps. The list is short enough that a reviewer can check it element by element.

**The loop is the backdrop** — The clip runs 5.5s at 1448x1080 and loops without a visible cut, so it reads as surface rather than as footage. Export at 1448x1080 or wider and the cover crop keeps working.

**Display size does the talking** — The faces are assigned roles rather than mixed: Manrope carries the display and the interface together. The face is paired with fixed sizes, which is what keeps the display line and the interface text related. Check the scale in greyscale.


## 动效

**The reveal is the memory point** — Entrance motion is concentrated on one element: a typewriter pass types the intro line. Everything else is already in place when the page loads. Under reduced motion the element simply appears and the layout is unchanged.

**A loop, not a timeline** — Ambient movement comes from the 5.5s 1448x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. Because it is muted, the loop can run under the copy without competing for sound or focus. Shoot or export at 1448x1080 or wider.


## 可替换项

- Retint #F1E5C6 toward your palette but keep the step against #5A4C41; flatten the two and the primary action stops reading.
- Hold the landing page to one screen on desktop; the composition is solved for a reader who never scrolls.
- Keep Manrope or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Replace “Take a step toward the light” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**Reading Church Community as a spec** — When a rebuild drifts, the spacing goes first. Church Community avoids that by publishing 36px spacing steps with the composition. Nothing in this landing page depends on a default.

**Making the landing page yours** — Start with the promise, not the decoration. Rewrite “Take a step toward the light” as one sentence that names what you do, then set it in Manrope at the display size the brief uses. Replace muted orange #F1E5C6 with your own accent and check it against muted orange #5A4C41 before you touch anything else. The subject is the part that should change.

**What moves in Church Community** — The animation budget is stated: a typewriter pass and a 5.5s media loop. Nothing in the landing page moves without a value attached to it. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Vertical | Education & Community |
| Viewport | 1448x1080 · 1.34:1 |
| Loop | 5.5s loop |
| Input brief | 5,380 characters |
| Date | 2026-09-17 |
| Accent hex | muted orange #F1E5C6 |
| Fonts | Manrope |
| Tools | React, Framer Motion |
| Animation | a 5.5s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names React and Framer Motion before you press send.
2. Stage the prompt in Studio and read it once against the 1448x1080 capture before you generate.
3. Set your brand first: product name, the #F1E5C6 accent and the headline that replaces the reference's.
4. Set the brand first: product name, the #F1E5C6 accent and a headline that replaces the reference's.
5. Drop your product name in, then replace #F1E5C6 with your own accent and re-check the contrast.

---
来源：https://ottermind.ai/explore/website/church-community
原始 prompt：5380 字符
