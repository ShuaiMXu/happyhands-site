# Stark Minimal Footer

> Footer reference for an industrial company — #0A0A0A base, Geist, 180ms transitions and max-width 1820px breakpoints.

- 行业：Industrial（industrial）
- 区块：Footer
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Stark Minimal Footer is the footer reference for an industrial company, and the brief behind it is a full build spec rather than a mood board. “© 2026 EngineTech. All rights reserved” is the line the layout is built to carry. The palette runs black #0A0A0A underneath and white #FFFFFF for the type, and the type is Geist. It ships as a single component, so the whole footer can be lifted into a project without a design handoff. The motion budget is 180ms transitions. It is most useful when the Industrial footer has to survive a copy change without a redesign.

## 主标题文案

> “© 2026 EngineTech. All rights reserved” — the whole footer is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | Headline |
| Near-black | `#000000` | darkest |
| Near-black — lighter | `#0A0A0A` | composition |
| White — darker | `#EDEDED` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | Weight not fixed in the brief | UI face |
| Inter | Weight not fixed in the brief | Body face |

## 视觉要点

- The timing budget is state feedback rather than page choreography (180ms), so a slower rebuild reads as a different design.
- Transitions are specified at 180ms, which is the value to keep when the palette changes.
- Transitions are specified at 180ms, short enough that the page never feels like it is waiting for an animation.

## 布局

**Top row: wordmark, links, one action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Geist so the bar belongs to the page below rather than to a separate system. Labels are short enough to fit one line at 1820px, and the active item is marked with weight rather than with a pill.

**Labels under the figures** — The row is placed high in the footer as proof rather than as decoration. The accent is spent on the figures that make a claim, not on the row as a whole.

**The scale is clamped, not stepped** — Type is sized with a clamp between 22px and 14px rather than fixed steps, so the display line stays proportionate between breakpoints instead of jumping. The mobile menu is part of the same brief, so the collapsed state is designed too. Keep the hierarchy; change the scale.

**Columns, not a link dump** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Type sizes step down from the column headings to the links, so the hierarchy survives a dense footer. Keep the accent for a single action.


## 动效

**Entrance as the signature** — Movement is concentrated in one behaviour (each line rises out of an overflow-hidden window), so the page never reads as a repertoire of effects. If the technique is dropped, the content is present and the layout does not shift. The reference was captured at 640x472.

**Short, named durations** — The timings are short and consistent (180ms), so hover and press states read as one system instead of a set of separate effects. The values are short enough to read as feedback rather than as animation. Do not ship the browser default.


## 可替换项

- Keep the footer inside one viewport and move whatever does not fit into the section below it.
- Set your own headline in Geist at the size the reference uses, so the footer keeps the same optical weight.
- Hold the 640x472 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Replace “© 2026 EngineTech. All rights reserved” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**The order behind the footer** — Order is the design here. navigation, the stats row and the footer are placed so the offer lands before the proof, and 14px spacing steps and 180ms transitions set the gap between them. A industrial reader gets the offer before the options.

**Reading Stark Minimal Footer as a spec** — The cost of a fixed scale is less room to improvise. 14px spacing steps and 180ms transitions keep the composition coherent, but a new element has to be fitted rather than placed. Nothing in this footer depends on a default.

**How the footer reflows** — When the copy is long, the narrow layout breaks first. Here a clamp between 22px and 14px absorbs the change, and the scale is fluid rather than stepped and the layout shifts at 1820px. Width changes the measurements, not the reading path.


## 规格

| 项 | 值 |
|---|---|
| Block | Footer |
| Sector | Industrial |
| Format | 640x472 · 1.36:1 |
| Input brief | 5,437 characters |
| Saved | 2026-09-17 |
| Type scale | Geist, Inter |
| Animation | 180ms transitions |

## 复刻步骤

1. Copy 14px spacing steps, 180ms transitions and a 1820px breakpoint into your own brief before you rewrite anything else.
2. Check your build against the reference measurements: 14px spacing steps, 180ms transitions and a 1820px breakpoint.
3. Pin the reference measurements before you restyle anything: 14px spacing steps, 180ms transitions and a 1820px breakpoint.
4. Keep the measurements the brief spells out: 14px spacing steps, 180ms transitions and a 1820px breakpoint.
5. Rebuild the motion last and keep the 180ms entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/stark-minimal-footer
原始 prompt：5437 字符
