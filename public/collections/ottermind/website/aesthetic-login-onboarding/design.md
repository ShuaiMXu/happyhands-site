# Aesthetic Onboarding

> Sign-in flow reference for an AI or SaaS product — #00C6FF accent, looping video, a dark stage and React and Tailwind CSS.

- 行业：AI & SaaS（ai-saas）
- 区块：Sign-in flow
- 画布：1894x1378 · 比例 1.3745 · 5.383s

## 概述

Aesthetic Onboarding is a working reference for an AI or SaaS product: the sign-in screen laid out, measured and ready to rebuild. The headline reads “Welcome back”, and the rest of the sign-in screen is arranged around it. The palette is bright orange #F09819 underneath, deep blue #0C0C0E for the type and bright teal #00C6FF carrying the accents. It ships as React and Tailwind CSS, so the whole sign-in screen can be lifted into a project without a design handoff. Motion comes down to a looping video bed. Take it on when the sign-in screen needs a decided order before any new sections are added.

## 主标题文案

> Sign-in flow reference built around “Welcome back”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright red | `#FF512F` | darker |
| Bright orange | `#F09819` | composition |
| Bright teal | `#00C6FF` | accent |
| Near-black | `#0C0C0E` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Media is specified at 1894x1378 and a 5.4s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1894x1378 and a 5.4s loop, so the composition has a single media dependency.
- The accent is spent on bright teal #00C6FF and the rest of the composition holds bright orange #F09819.

## 布局

**Sizes fixed in the brief** — The brief states its sizes at capture (80px spacing steps), so a rebuild can be verified instead of approximated. The type and the layout share the same steps, so nothing drifts when one of them is substituted. Substitute the face or the copy, not the scale.

**A clip, not an illustration** — A 5.4s clip at 1894x1378 does the atmospheric work; the brief fixes its crop and leaves the type untouched on top of it. The loop is short enough (5.4s) that the eye reads it as texture rather than as a timeline.

**Figures as typography** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #00C6FF or the ink colour rather than a coloured card. The figures carry the #00C6FF accent while everything around them stays on the ink colour. Check the row at the narrowest width.

**The sizes are in the brief, not in a scale** — Spacing is quoted the same way (80px spacing steps), not as a scale that grows on its own.


## 动效

**Ambient motion without a scroll library** — The background clip runs 5.4s at 1894x1378 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. The loop is cropped to cover, which means the composition does not depend on a particular frame size. Shoot or export at 1894x1378 or wider.

**A small interactive surface** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. The states are drawn from the page's own palette rather than from a component default. Do not animate layout on hover.


## 可替换项

- Write the replacement headline first, then confirm it still fits the 1894x1378 frame at the reference's type size.
- Keep the sign-in screen inside one viewport and move whatever does not fit into the section below it.
- Change #00C6FF for your brand accent and re-check it against #F09819, because the accent is the only saturated value in this composition.
- Hold the 1894x1378 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.

## 文案规则

**The order behind the sign-in screen** — Read it in order: the headline, the stats row, the card grid, the background clip and the footer. Each element has one job, and the bright teal #00C6FF accent is spent only on the element you are meant to press. A SaaS reader gets the offer before the options.

**How the sign-in screen reflows** — A fluid scale and a stepped one look similar on a wide screen. Narrow the viewport and the difference shows: a clamp between 10px and 80px against fixed jumps. Controls stay large enough to tap and the copy keeps its reading order at every width.

**What an AI or SaaS product gains here** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a 5.4s 1894x1378 loop. The frame stays quiet and 80px spacing steps keep the reader on the text. It gives a SaaS reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Sign-in flow |
| Field | AI & SaaS |
| Viewport | 1894x1378 · 1.37:1 |
| Clip length | 5.4s loop |
| Prompt text | 3,133 characters |
| Capture date | 2026-09-17 |
| Key tone | bright teal #00C6FF |
| Tools | Tailwind CSS, React, Lucide icons |
| Motion | a 5.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1894x1378 capture before you generate.
2. Type the product name and the #00C6FF accent before you touch the layout.
3. Drop your product name in, then replace #00C6FF with your own accent and re-check the contrast.
4. Set the brand first: product name, the #00C6FF accent and a headline that replaces the reference's.
5. Set your brand first: product name, the #00C6FF accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/aesthetic-login-onboarding
原始 prompt：3133 字符
