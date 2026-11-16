# Blog Showcase

> Blog section reference for an agency or studio — Outfit, #FCFCFC base, a 640x478 frame and cubic-bezier(0.33, 1, 0.68, 1) easing.

- 行业：Agencies & Studios（creative）
- 区块：Blog section
- 画布：640x478 · 比例 1.3389 · 0s

## 概述

Blog Showcase shows one way to build the blog section for an agency or studio, and publishes the instructions that produced it. Colour is limited to white #FCFCFC underneath and red #7D1A4A for the type, set in Outfit. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. Motion is confined to 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1). Borrow the structure and not the subject: the blog section and its numbers move to your brand unchanged.

## 主标题文案

> Blog section reference for an agency or studio, captured at 640x478 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F4F4F4` | panel edges |
| White — darker | `#F0F0F0` | Secondary |
| White — lighter | `#FCFCFC` | composition |
| Red | `#7D1A4A` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Outfit | Weight not fixed in the brief | Interface |
| Inter | Weight not fixed in the brief | Copy face |

## 视觉要点

- Transitions are specified at 0.5s, which is the value to keep when the palette changes.
- The reference was captured at 640x478, and every value quoted on this page comes from the same brief.
- The timing budget is state feedback rather than page choreography (0.5s), so a slower rebuild reads as a different design. Transitions are specified at 0.5s, short enough that the page never feels like it is waiting for an animation.

## 布局

**Nothing here is inherited** — The values are the specification: 20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing, captured at 640x478 rather than inferred from a screenshot. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate. Keep the values that look arbitrary.

**Type sets the hierarchy** — The type is Outfit at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. A face swap is safe as long as the sizes and weights stay where the brief put them. Keep the size steps even if you change the face.

**Columns, not a link dump** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. The accent is reused on one footer action rather than across the whole band. Give the wordmark its own column.

**Measured, not eyeballed** — Spacing is quoted the same way (20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing), not as a scale that grows on its own.


## 动效

**Fast enough to feel deliberate** — Every state change in the specification has a duration attached: transitions settle around 0.5s using cubic-bezier(0.33, 1, 0.68, 1). Nothing is left at the browser default, which is why the page feels authored rather than animated. Easing is specified alongside the duration (0.5s), so a rebuild cannot quietly substitute a different feel. If you change the easing, change it everywhere.

**Hover, but sparingly** — Feedback is limited to hover states on the buttons and links rather than on every card, so the rest of the layout is a fixed composition. Press states are specified as well as hover, so a tap gives the same confirmation as a click. If a state does not confirm an action, drop it.


## 可替换项

- Hold the blog section to one screen on desktop; the composition is solved for a reader who never scrolls.
- Change the copy first, then the accent, then the media: the 640x478 frame was solved in that order and reversing it costs a re-layout.
- Retime the entrance to taste. 0.5s with cubic-bezier(0.33, 1, 0.68, 1) is what the reference uses.
- Read the brief value by value against the 640x478 capture before you edit anything; the numbers are the part that is easiest to lose.

## 文案规则

**Why the agency brief holds** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a still at 640x478. The frame stays quiet and 20px spacing steps and 0.5s transitions keep the reader on the text. It gives a agency reader the shortest honest route to the offer.

**The order behind the blog section** — Compare the top of this page with a typical agency landing screen. Both carry a headline and an action; here the headline, the announcement badge, the card grid, the background clip and the footer sit in a fixed order instead of competing at the same weight. A agency reader gets the offer before the options.

**How the blog section reflows** — If your breakpoints were chosen to make things fit rather than to change the layout, read this entry. the scale is fluid rather than stepped rather than a list of hidden elements. Nothing important is dropped at narrow widths. The reference was captured at 640x478.


## 规格

| 项 | 值 |
|---|---|
| Screen | Blog section |
| Category | Agencies & Studios |
| Canvas size | 640x478 · 1.34:1 |
| Source text | 4,151 characters |
| Capture date | 2026-09-17 |
| Type scale | Outfit, Inter |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion spec | 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing |

## 复刻步骤

1. Check your build against the reference measurements: 20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing.
2. Pin the reference measurements before you restyle anything: 20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing.
3. Keep the measurements the brief spells out: 20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing.
4. Copy 20px spacing steps, 0.5s transitions and cubic-bezier(0.33, 1, 0.68, 1) easing into your own brief before you rewrite anything else.
5. Port the motion last: the entrance, the 0.5s states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/blog-showcase
原始 prompt：4151 字符
