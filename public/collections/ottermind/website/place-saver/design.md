# Place Saver

> Landing page reference for a travel brand — cubic-bezier(0.16, 1, 0.3, 1) easing, #F4F4F4 base, Playfair Display and a stats row.

- 行业：Travel（travel）
- 区块：Landing page
- 画布：1480x1080 · 比例 1.3704 · 5.6s

## 概述

Place Saver is a travel landing page built from one written brief, and this page documents that brief. The page's own headline reads “The place for all your places”, and the composition is built around those exact words. The palette runs white #F4F4F4 underneath and deep blue #0C0C0E for the type, and the type is Playfair Display. Delivery is a single component, captured at 1480x1080 so the frame is fixed before any code is written. The motion budget is 0.9s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. It is the right reference for a travel brand landing page that has to look deliberate on the first screen.

## 主标题文案

> Landing page reference built around “The place for all your places”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#14151D` | darker step |
| White | `#F4F4F4` | composition |
| Near-black — lighter | `#1A1A1A` | Secondary |
| Near-black — darker | `#0C0C0E` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Playfair Display | Weight not fixed in the brief | Display |
| Inter | Weight not fixed in the brief | Body copy |
| ITC Garamond Std Narrow | Weight not fixed in the brief | Second face |

## 视觉要点

- Corner treatment is specified in the brief: 48px.
- Transitions are specified at 0.9s, short enough that the page never feels like it is waiting for an animation.
- The clip is one asset at 1480x1080 and a 5.6s loop, so the composition has a single media dependency.

## 布局

**The spacing steps are quoted** — The brief fixes 48px corners, 28px spacing steps, 0.9s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length. Measure before you adjust.

**One media element carries the mood** — Video sits on the bottom layer of the 1480x1080 composition, with the type arranged above it and nothing in between. A poster frame at 1480x1080 holds the composition when autoplay is unavailable, so the layout never collapses. Export at 1480x1080 or wider to keep the crop honest.

**Weights named per role** — Typography is Playfair Display, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. The face is paired with fixed sizes, which is what keeps the display line and the interface text related.

**Measured, not eyeballed** — Spacing is quoted the same way (48px corners, 28px spacing steps, 0.9s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), not as a scale that grows on its own.


## 动效

**Ambient motion without a scroll library** — One 5.6s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution.

**The whole animation budget** — Motion in the controls is short and repeatable: 0.9s on each state change. Easing is specified alongside the duration (0.9s), so a rebuild cannot quietly substitute a different feel. Keep the durations when you re-skin the page.


## 可替换项

- Draft the new copy to the 1480x1080 frame, then check that the entrance still lands on the same number of lines.
- Swap the clip for your own footage at 1480x1080 or wider, keep it muted, and match the 5.6s loop point.
- Swap in your own headline where “The place for all your places” sits and keep the line breaks, because the entrance animates per line.
- Keep 1480x1080 for the media and re-crop your own asset into it rather than resizing the frame.

## 文案规则

**Reading Place Saver as a spec** — Almost every decision here is a value you can check: 48px corners, 28px spacing steps, 0.9s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. The media is a 5.6s 1480x1080 loop. The type stays in Playfair Display, so a substitution has to keep the same proportions. Nothing in this landing page depends on a default.

**How the landing page reflows** — A fluid scale and a stepped one look similar on a wide screen. Narrow the viewport and the difference shows: a clamp between 66px and 28px against fixed jumps. The reflow keeps the action reachable at every width.

**What moves in Place Saver** — Every transition here has a number attached. That is why 0.9s transitions and a 5.6s media loop can be ported value by value instead of re-tuned by feel. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Field | Travel |
| Canvas size | 1480x1080 · 1.37:1 |
| Duration | 5.6s loop |
| Input brief | 8,226 characters |
| Archived | 2026-09-17 |
| Type scale | Playfair Display, Inter, ITC Garamond Std Narrow |
| Motion spec | 0.9s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 5.6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1480x1080 capture before you generate.
2. Pin the reference measurements before you restyle anything: 48px corners, 28px spacing steps and 0.9s transitions.
3. Copy 48px corners, 28px spacing steps and 0.9s transitions into your own brief before you rewrite anything else.
4. Check your build against the reference measurements: 48px corners, 28px spacing steps and 0.9s transitions.
5. Keep the measurements the brief spells out: 48px corners, 28px spacing steps and 0.9s transitions.

---
来源：https://ottermind.ai/explore/website/place-saver
原始 prompt：8226 字符
