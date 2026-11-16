# Peakflow Footer

> Footer reference for an AI or SaaS product — #111111 base, scroll-triggered reveals, Tailwind CSS and 100ms transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Footer
- 画布：1920x1470 · 比例 1.3061 · 7.9s

## 概述

Peakflow Footer gives an AI or SaaS product a finished first screen and the numbers that produced it. The colour scheme is black #111111 underneath and white #FAFAFA for the type, and the page is set in Inter. The entry names the stack that produced the page (Tailwind CSS) rather than hiding it. The page keeps its motion to 100ms transitions, cubic-bezier(0.5, 0, 0, 1) and a looping video bed. It is most useful when the AI & SaaS footer has to survive a copy change without a redesign.

## 主标题文案

> Footer reference for an AI or SaaS product, captured at 1920x1470 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FAFAFA` | Headline |
| Near-black | `#111111` | composition |
| Near-black — lighter | `#1A1A1A` | panel edges |
| Black | `#2A2A2A` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (100ms), so a slower rebuild reads as a different design.
- Media is specified at 1920x1470 and a 7.9s loop, so a replacement should match the crop and the loop length.

## 布局

**Sizes fixed in the brief** — The layout works on absolute values rather than ratios: 30px spacing steps, 100ms transitions and cubic-bezier(0.5, 0, 0, 1) easing. The smallest and largest values in that list set the range the composition works in.

**Media behind the type** — One muted, looping clip fills the frame at 1920x1470 and 7.9s, set to cover with the copy stacked above it. The brief keeps overlays off the video so nothing greys it out. Export at 1920x1470 or wider and the cover crop keeps working. Export at 1920x1470 or wider to keep the crop honest.

**One family, two roles** — The size steps and tracking in the brief are what give this its tone: Inter at a tight display size, then a clear drop to the supporting copy. The display face is used at one size only, so it never competes with itself.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Columns align to the same grid as the page above, so the footer feels like the same design. Keep the accent for a single action.


## 动效

**Fast enough to feel deliberate** — State changes are specified at 100ms, so the feedback on the controls is a designed value rather than a browser default. The values are short enough to read as feedback rather than as animation. If you change the easing, change it everywhere.

**Ambient motion without a scroll library** — One 7.9s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The loop is cropped to cover, which means the composition does not depend on a particular frame size.


## 可替换项

- Hold the footer to one screen on desktop; the composition is solved for a reader who never scrolls.
- Draft the new copy to the 1920x1470 frame, then check that the entrance still lands on the same number of lines.
- Keep 1920x1470 for the media and re-crop your own asset into it rather than resizing the frame.
- Keep the 1920x1470 frame when you swap the content, because the composition was solved against that ratio.

## 文案规则

**What holds up for AI & SaaS** — The claim is made once, at display size. Everything else in the footer is ordered around that line: the headline, the form and the footer, and no second promise competes for the first read. Peakflow Footer states the offer once and lets the composition repeat it rather than adding a second claim.

**What to change first in Peakflow Footer** — The trade-off is recognisability. Keep too much of Peakflow Footer and the page reads as someone else's; keep the numbers and change the content and it reads as yours. Set the new copy at the same display size and re-check the contrast before you add anything.

**How the footer reflows** — Test this footer at 1920x1470 and then at phone width: the same order holds, with the scale is fluid rather than stepped. The scale changes with the viewport; the sequence does not.


## 规格

| 项 | 值 |
|---|---|
| Block | Footer |
| Sector | AI & SaaS |
| Frame | 1920x1470 · 1.31:1 |
| Loop | 7.9s loop |
| Prompt text | 3,693 characters |
| Date | 2026-09-17 |
| Typefaces | Inter |
| Tools | Tailwind CSS |
| Animation | 100ms transitions, cubic-bezier(0.5, 0, 0, 1) easing and a 7.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1470 capture before you generate.
2. Pin the reference measurements before you restyle anything: 30px spacing steps, 100ms transitions and cubic-bezier(0.5, 0, 0, 1) easing.
3. Keep the measurements the brief spells out: 30px spacing steps, 100ms transitions and cubic-bezier(0.5, 0, 0, 1) easing.
4. Check your build against the reference measurements: 30px spacing steps, 100ms transitions and cubic-bezier(0.5, 0, 0, 1) easing.
5. Copy 30px spacing steps, 100ms transitions and cubic-bezier(0.5, 0, 0, 1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/peakflow-contact-footer
原始 prompt：3693 字符
