# Radial Diagram

> Features section reference for an agency or studio — fluid type, React and Tailwind CSS, a 640x476 frame and DM Sans.

- 行业：Agencies & Studios（creative）
- 区块：Features section
- 画布：640x476 · 比例 1.3445 · 0s

## 概述

Radial Diagram keeps its decision trail: the brief that produced this features section runs 5,364 characters. It leads with “Our Comprehensive Branding Approach” and gives that line the frame rather than shrinking it into a card. Colour is limited to black #191919 underneath and white #EAEAEA for the type, set in DM Sans. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. The motion budget is 0.7s transitions. Borrow the structure and not the subject: the features section and its numbers move to your brand unchanged.

## 主标题文案

> “Our Comprehensive Branding Approach” — the whole features section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0F0F0F` | darkest |
| Gray | `#6E6E6E` | lighter step |
| Near-black — lighter | `#191919` | composition |
| White | `#EAEAEA` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| DM Sans | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 0.7s, which is the value to keep when the palette changes.
- The timing budget is state feedback rather than page choreography (0.7s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.7s, short enough that the page never feels like it is waiting for an animation.

## 布局

**Numbers carried into the build** — The values are the specification: 60px spacing steps and 0.7s transitions, captured at 640x476 rather than inferred from a screenshot. Because the values are fixed, a substitution changes the look without changing the rhythm.

**Display size does the talking** — Typography is DM Sans, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.

**Nothing here is inherited** — Spacing is quoted the same way (60px spacing steps and 0.7s transitions), not as a scale that grows on its own.

**Faces with one job each** — Set the display line last. The reference was captured at 640x476.


## 动效

**A small interactive surface** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. Press states are specified as well as hover, so a tap gives the same confirmation as a click.

**Short, named durations** — Motion is measured in milliseconds here: 0.7s. That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Easing is specified alongside the duration (0.7s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 640x476 crop.
- Replace “Our Comprehensive Branding Approach” with your own line and keep the word count, because the entrance is timed per line.
- Keep DM Sans or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Retime the entrance to your own 0.7s, but keep a standard ease-out as the curve, because the easing is what reads as this design.

## 文案规则

**Reading Radial Diagram as a spec** — Every relationship on this page is a value you can check: 60px spacing steps and 0.7s transitions. That is what makes Radial Diagram rebuildable rather than merely reproducible. Nothing in this features section depends on a default.

**The argument this features section makes** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a still at 640x476. The frame stays quiet and 60px spacing steps and 0.7s transitions keep the reader on the text. It gives a agency reader the shortest honest route to the offer.

**The timing behind the features section** — Motion is a short list rather than a system. The brief names 0.7s transitions and hover and press states, and the rest of the page stays still. Nothing animates for its own sake in this features section.


## 规格

| 项 | 值 |
|---|---|
| Page part | Features section |
| Field | Agencies & Studios |
| Canvas | 640x476 · 1.34:1 |
| Source text | 5,364 characters |
| Date | 2026-09-17 |
| Fonts | DM Sans |
| Built with | Tailwind CSS, React, TypeScript |
| Animation | 0.7s transitions |

## 复刻步骤

1. Keep the measurements the brief spells out: 60px spacing steps and 0.7s transitions.
2. Check your build against the reference measurements: 60px spacing steps and 0.7s transitions.
3. Copy 60px spacing steps and 0.7s transitions into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 60px spacing steps and 0.7s transitions.
5. Add the entrance first at 0.7s, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/radial-diagram
原始 prompt：5364 字符
