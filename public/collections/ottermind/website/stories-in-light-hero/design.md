# Stories in Light

> Hero section reference for an agency or studio — max-width 560px breakpoints, a stats row, 0.4s transitions and looping video.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1920x1328 · 比例 1.4458 · 13.3s

## 概述

Stories in Light shows one way to build the hero section for an agency or studio, and publishes the instructions that produced it. The palette runs deep blue #2B3342 underneath and white #FFFFFF for the type, and the type is Archivo. Delivery is a single component, captured at 2502x1730 so the frame is fixed before any code is written. Motion is limited to 0.4s transitions and a looping video bed. Keep it open while you write: the 4,462-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference for an agency or studio, captured at 2502x1730 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F0F0EE` | lighter step |
| Deep blue | `#2B3342` | composition |
| White — lighter | `#F3F2F2` | Hover tint |
| White — lighter | `#FFFFFF` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Archivo | 15px | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 2502x1730 and a 13.3s loop, so a replacement should match the crop and the loop length.
- Panels and controls share the same corner treatment (999px), so the page keeps one surface language.
- The display line is Archivo at the top of a 15px scale, with the interface text on the same face.

## 布局

**A navigation bar that gets out of the way** — The bar is one row of text and one action, measured at a fixed 15px display size and 100vh sections so it reads as a strip rather than as a band. Labels are short enough to fit one line at 560px, and the active item is marked with weight rather than with a pill.

**The loop is the backdrop** — The first screen is a single clip at 2502x1730, and everything else is arranged on top of it. The loop is short enough (13.3s) that the eye reads it as texture rather than as a timeline.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in Archivo at the smallest step, and nothing else competes for that slot. There is one announcement only, which is what makes the badge feel like news. One badge, one message.

**Fluid where it needs to be** — Width changes are handled in the type itself: a clamp between 55px and 40px carries the headline from phone to desktop without a separate mobile composition. The mobile menu is part of the same brief, so the collapsed state is designed too.


## 动效

**One duration for the controls** — Every state change in the specification has a duration attached: transitions settle around 0.4s. Nothing is left at the browser default, which is why the page feels authored rather than animated. Easing is specified alongside the duration (0.4s), so a rebuild cannot quietly substitute a different feel.

**Interaction kept local** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. The interactive states do not move layout, so nothing jumps under the pointer. Keep the pointer effects on the controls.


## 可替换项

- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 2502x1730.
- Read the brief value by value against the 2502x1730 capture before you edit anything; the numbers are the part that is easiest to lose.
- Keep 2502x1730 for the media and re-crop your own asset into it rather than resizing the frame.
- Recut your footage to the 13.3s loop, then export at 2502x1730 so the crop the reference specifies survives.

## 文案规则

**Making the hero section yours** — If your brand runs a heavier palette, test it against the frame before you commit. deep blue #2B3342 carries the page, so a darker accent needs more contrast than the reference uses. Keep the frame and the scale; the subject is the part that should change.

**What moves in Stories in Light** — You could drop a preset library onto this composition and it would look busier, not better. The brief keeps 0.4s transitions, a 13.3s media loop and hover and press states and spends the budget there. Nothing animates for its own sake in this hero section.

**The order behind the hero section** — The hero section has a stated reading path. Navigation establishes the product and gives a returning visitor a familiar way around. From there the eye takes navigation, the headline, the announcement badge and the stats row in sequence, which is what keeps a single screen from reading as a list. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | Agencies & Studios |
| Canvas | 2502x1730 · 1.45:1 |
| Runtime | 13.3s loop |
| Prompt | 4,462 characters |
| Date | 2026-09-17 |
| Faces | Archivo · 15px |
| Motion spec | 0.4s transitions and a 13.3s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2502x1730 capture before you generate.
2. Copy a fixed 15px display size, 100vh sections and 999px corners into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: a fixed 15px display size, 100vh sections and 999px corners.
4. Keep the measurements the brief spells out: a fixed 15px display size, 100vh sections and 999px corners.
5. Check your build against the reference measurements: a fixed 15px display size, 100vh sections and 999px corners.

---
来源：https://ottermind.ai/explore/website/stories-in-light-hero
原始 prompt：4462 字符
