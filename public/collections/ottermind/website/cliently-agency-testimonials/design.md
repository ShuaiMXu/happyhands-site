# Cliently Testimonials

> Testimonials reference for an agency or studio — 1500ms transitions, #18181B base, React and Tailwind CSS and a word-by-word headline.

- 行业：Agencies & Studios（creative）
- 区块：Testimonials
- 画布：1920x1392 · 比例 1.3793 · 10.4s

## 概述

Cliently Testimonials solves the testimonials section problem for an agency or studio with a single captured brief. The page's own headline reads “Here's what they shared about their experience working with our team”, and the composition is built around those exact words. The palette is black #18181B underneath and white #F4F4F5 for the type. Delivery is React and Tailwind CSS, captured at 1920x1392 so the frame is fixed before any code is written. The brief spends its motion budget on 1500ms transitions and a looping video bed. Take it on when the testimonials section needs a decided order before any new sections are added.

## 主标题文案

> Testimonials reference built around “Here's what they shared about their experience working with our team”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#18181B` | composition |
| Gray | `#71717A` | surface |
| White | `#F4F4F5` | Headline |
| White — darker | `#E4E4E7` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 14–56px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 1500ms, which is the value to keep when the palette changes.
- Media is specified at 1920x1392 and a 10.4s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1920x1392 and a 10.4s loop, so the composition has a single media dependency.

## 布局

**Top row: wordmark, links, one action** — The bar overlays the testimonials section instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 1920x1392 composition without a background of its own, so the media runs edge to edge underneath it.

**Measured, not eyeballed** — The list stays short (type from 14px to 56px, 46px spacing steps and 1500ms transitions), which is why the whole system can be checked by hand. Values are quoted from the captured prompt rather than inferred, so they survive a re-render. The numbers are the design; the rest is arrangement.

**A navigation bar that gets out of the way** — Focus and hover states are specified for each link rather than inherited from the browser. If your own page has more sections, group them rather than widening the bar.

**The brief names the steps** — Spacing is quoted the same way (type from 14px to 56px, 46px spacing steps and 1500ms transitions), not as a scale that grows on its own.


## 动效

**Short, matched timings** — Motion in the controls is short and repeatable: 1500ms on each state change. The quoted timing covers state changes, so the feedback is the part of the motion that is specified. Carry the durations into your build.

**A loop, not a timeline** — One 10.4s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size. Shoot or export at 1920x1392 or wider.


## 可替换项

- Swap in your own headline where “Here's what they shared about their experience working with our team” sits and keep the line breaks, because the entrance animates per line.
- Hold the testimonials section to one screen on desktop; the brief never asks the reader to scroll past the fold.
- Swap the clip for your own footage at 1920x1392 or wider, keep it muted, and match the 10.4s loop point.
- Replace “Here's what they shared about their experience working with our team” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**How the testimonials section reflows** — Compared with a mobile layout that hides sections, this one keeps them and changes their shape: the scale is fluid rather than stepped. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**The order behind the testimonials section** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: navigation, the headline, the client row and the card grid are a sequence, and type from 14px to 56px and 46px spacing steps only work in that order. A agency reader gets the offer before the options.

**What to change first in Cliently Testimonials** — If your brand runs a heavier palette, test it against the frame before you commit. black #18181B carries the page, so a darker accent needs more contrast than the reference uses. Substitution is cheaper than composition, and that is the point.


## 规格

| 项 | 值 |
|---|---|
| Block | Testimonials |
| Category | Agencies & Studios |
| Canvas | 1920x1392 · 1.38:1 |
| Runtime | 10.4s loop |
| Brief | 4,333 characters |
| Archived | 2026-09-17 |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Transitions | 1500ms transitions and a 10.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1392 capture before you generate.
2. Pin the reference measurements before you restyle anything: type from 14px to 56px, 46px spacing steps and 1500ms transitions.
3. Check your build against the reference measurements: type from 14px to 56px, 46px spacing steps and 1500ms transitions.
4. Keep the measurements the brief spells out: type from 14px to 56px, 46px spacing steps and 1500ms transitions.
5. Copy type from 14px to 56px, 46px spacing steps and 1500ms transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/cliently-agency-testimonials
原始 prompt：4333 字符
