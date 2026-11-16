# Gulfselite

> Hero section reference for a travel brand — a stats row, Tailwind and vanilla JavaScript, a word-by-word headline and Inter.

- 行业：Travel（travel）
- 区块：Hero section
- 画布：1920x1448 · 比例 1.326 · 9.917s

## 概述

Gulfselite gives a travel brand a finished first screen and the numbers that produced it. Colour is limited to muted orange #69574B underneath and white #FEFEFE for the type, set in Inter. The build is Tailwind and vanilla JavaScript; every measurement in it is written down, which is what makes it reusable. Motion is 120ms transitions and a looping video bed, kept quiet enough that the copy still leads. This reference is for a travel brand that wants the first screen settled before the build starts.

## 主标题文案

> Hero section reference for a travel brand, captured at 1920x1448 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep orange | `#463E39` | darkest |
| White | `#FEFEFE` | Headline |
| Muted orange | `#69574B` | composition |
| Muted orange — lighter | `#9D8C7C` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text |
| Playfair Display | Weight not fixed in the brief | Accent type |

## 视觉要点

- Transitions are specified at 120ms, which is the value to keep when the palette changes.
- Transitions are specified at 120ms, short enough that the page never feels like it is waiting for an animation.
- Nothing sits between the type and the 1920x1448 clip, so a replacement has to work under the copy directly.

## 布局

**The bar shares the page grid** — The bar is one row of text and one action, measured at 20px spacing steps and 120ms transitions so it reads as a strip rather than as a band. The bar sits over the 1920x1448 composition without a background of its own, so the media runs edge to edge underneath it. Keep the row to one line.

**The announcement pill** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition. Remove it when the news is old.

**Top row, one action** — Focus and hover states are specified for each link rather than inherited from the browser. Copy this pattern when you need navigation that survives a loud first screen.

**The sizes are in the brief, not in a scale** — The brief names the numbers: 20px spacing steps and 120ms transitions. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The smallest and largest values in that list set the range the composition works in.


## 动效

**Durations from the brief** — The animation budget is small and explicit: 120ms, applied to state changes rather than to entrances. Every state change names a value, so the browser default is never used.

**The loop does the ambient work** — Ambient movement is one 9.9s clip at 1920x1448, looping quietly behind the copy rather than reacting to the pointer. Nothing else on the page animates continuously, so the media is the only thing asking for attention.


## 可替换项

- Replace the video with a still at 1920x1448 if the 9.9s loop is too heavy for the page you are shipping.
- Keep 1920x1448 for the media and re-crop your own asset into it rather than resizing the frame.
- Set 120ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Recut your footage to the 9.9s loop, then export at 1920x1448 so the crop the reference specifies survives.

## 文案规则

**The timing behind the hero section** — Count the animated elements and the list is short: 120ms transitions, a 9.9s media loop and a word-by-word headline. Nothing animates for its own sake in this hero section.

**Making the hero section yours** — Set the new copy at the display size the brief names (20px spacing steps and 120ms transitions), and the rest of the scale follows without a redesign. Your accent has to survive the same contrast test as the reference accent.

**How the hero section reflows** — The desktop composition is solved against 1920x1448, and the narrow layout is designed rather than inherited: the scale is fluid rather than stepped. Motion has a reduced-motion branch, and the media carries a poster frame so the page still communicates when autoplay is unavailable. The hierarchy is what survives the reflow.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Category | Travel |
| Format | 1920x1448 · 1.33:1 |
| Clip length | 9.9s loop |
| Prompt | 2,498 characters |
| Captured | 2026-09-17 |
| Faces | Inter, Playfair Display |
| Tools | Tailwind CSS, vanilla JS |
| Motion spec | 120ms transitions and a 9.9s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names Tailwind and vanilla JavaScript before you press send.
2. Stage the prompt in Studio and read it once against the 1920x1448 capture before you generate.
3. Check your build against the reference measurements: 20px spacing steps and 120ms transitions.
4. Copy 20px spacing steps and 120ms transitions into your own brief before you rewrite anything else.
5. Keep the measurements the brief spells out: 20px spacing steps and 120ms transitions.

---
来源：https://ottermind.ai/explore/website/jetcrest-private-jet-hero
原始 prompt：2498 字符
