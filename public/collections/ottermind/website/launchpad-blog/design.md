# LaunchPad Blog

> Blog section reference for a fintech product — one self-contained HTML file, #933551 accent, looping video and Inter.

- 行业：Fintech（fintech）
- 区块：Blog section
- 画布：1920x1414 · 比例 1.3579 · 2.4s

## 概述

LaunchPad Blog gives a fintech product a finished first screen and the numbers that produced it. The palette is white #FFFFFF underneath, indigo #3E23A5 for the type and red #933551 carrying the accents, set in Inter. It ships as one self-contained HTML file, so the whole blog section can be lifted into a project without a design handoff. The brief spends its motion budget on 100ms transitions and a looping video bed. Start from the captured brief, then edit the blog section rather than rebuilding it from scratch.

## 主标题文案

> Blog section reference built on white #FFFFFF and red #933551, set in Inter and measured against type from 14px to 36px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Indigo | `#3E23A5` | Headline |
| White | `#FFFFFF` | composition |
| Gray | `#B9B5C8` | darker step |
| Red | `#933551` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 14–36px | Headline and interface text — one face for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 14–36px is the range the whole scale works in.
- The clip is one asset at 2522x1858 and a 2.4s loop, so the composition has a single media dependency.
- Accent use is limited to red #933551; everything else sits on white #FFFFFF.

## 布局

**Sizes fixed in the brief** — The values are the specification: type from 14px to 36px, 20px spacing steps and 100ms transitions, captured at 2522x1858 rather than inferred from a screenshot. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**Colour with a job description** — The accent's job is fixed in the brief: red #933551 for actions, white #FFFFFF for the frame. Everything else sits on white #FFFFFF, which is what keeps a saturated palette legible.

**Measured against the viewport** — Spacing is quoted the same way (type from 14px to 36px, 20px spacing steps and 100ms transitions), not as a scale that grows on its own.

**Media without an overlay** — One muted, looping clip fills the frame at 2522x1858 and 2.4s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. Export at 2522x1858 or wider and the cover crop keeps working.


## 动效

**The controls are the interactive layer** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element.

**The loop does the ambient work** — Ambient movement is one 2.4s clip at 2522x1858, looping quietly behind the copy rather than reacting to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size.


## 可替换项

- Swap the clip for your own footage at 2522x1858 or wider, keep it muted, and match the 2.4s loop point.
- Change the copy before the colour: rewrite the Inter paragraphs first, then check #933551 against the media behind them.
- Check #933551 against the copy size in Inter before you swap either, because the accent only reads on a large line.
- Change the copy first, then the accent, then the media: the 2522x1858 frame was solved in that order and reversing it costs a re-layout.

## 文案规则

**The timing behind the blog section** — Compare the motion here with a scroll-driven page. Both move; this one moves where the brief says (100ms transitions, a 2.4s media loop and hover and press states), so the copy stays in front. Nothing animates for its own sake in this blog section.

**What holds up for Fintech** — Restraint costs you room for proof above the fold. This brief accepts that cost and spends the first screen on the offer, with type from 14px to 36px and 20px spacing steps fixed so a proof section can be added below without a rework. LaunchPad Blog states the offer once and lets the composition repeat it rather than adding a second claim.

**What to change first in LaunchPad Blog** — Most people start with the accent colour. Start with the promise instead: rewrite the display line, then re-test red #933551 against your own media. The subject is the part that should change.


## 规格

| 项 | 值 |
|---|---|
| Page part | Blog section |
| Sector | Fintech |
| Format | 2522x1858 · 1.36:1 |
| Loop length | 2.4s loop |
| Input brief | 4,286 characters |
| Captured | 2026-09-17 |
| Accent | red #933551 |
| Fonts | Inter · 14–36px |
| Built with | Tailwind CSS, single HTML file |
| Transitions | 100ms transitions and a 2.4s media loop |

## 复刻步骤

1. Set the brand first: product name, the #933551 accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #933551 with your own accent and re-check the contrast.
3. Set your brand first: product name, the #933551 accent and the headline that replaces the reference's.
4. Type the product name and the #933551 accent before you touch the layout.
5. Check your build against the reference measurements: type from 14px to 36px, 20px spacing steps and 100ms transitions.

---
来源：https://ottermind.ai/explore/website/launchpad-blog
原始 prompt：4286 字符
