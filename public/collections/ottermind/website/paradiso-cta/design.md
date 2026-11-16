# Paradiso CTA

> Call to action reference for a travel brand — #EFF3F4 base, one self-contained HTML file, a word-by-word headline and looping video.

- 行业：Travel（travel）
- 区块：Call to action
- 画布：1920x1414 · 比例 1.3579 · 4.617s

## 概述

Paradiso CTA keeps its decision trail: the brief that produced this call-to-action block runs 1,665 characters. It leads with “Enter your email address” and gives that line the frame rather than shrinking it into a card. The whole page is built on white #EFF3F4 underneath and deep lime #1B200B for the type. The reference is built with one self-contained HTML file, and the layout decisions are stated independently of it. Motion is confined to a looping video bed. Borrow the structure and not the subject: the call-to-action block and its numbers move to your brand unchanged.

## 主标题文案

> “Enter your email address” — the whole call-to-action block is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep lime | `#1B200B` | Headline |
| White | `#F6F7F8` | lightest |
| White — darker | `#EFF3F4` | composition |
| Gray | `#4B4748` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- The clip is one asset at 2522x1858 and a 4.6s loop, so the composition has a single media dependency.
- Media is specified at 2522x1858 and a 4.6s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 2522x1858 clip, so a replacement has to work under the copy directly.

## 布局

**Measured, not eyeballed** — The list stays short (15px spacing steps), which is why the whole system can be checked by hand. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length.

**A full-bleed clip behind the type** — The 2522x1858 video runs 4.6s on a loop behind the copy, muted and inline, with no tint layer between the two. Export at 2522x1858 or wider and the cover crop keeps working. Export at 2522x1858 or wider to keep the crop honest.

**The spacing steps are quoted** — Spacing is quoted the same way (15px spacing steps), not as a scale that grows on its own.

**Media without an overlay** — The loop is short enough (4.6s) that the eye reads it as texture rather than as a timeline.


## 动效

**The loop does the ambient work** — The background clip runs 4.6s at 2522x1858 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. Nothing else on the page animates continuously, so the media is the only thing asking for attention.

**Static by design** — This one is delivered as a still composition at 2522x1858, so the hierarchy has to work without motion, and it does. The composition holds still, so the hierarchy has to carry the page and it does.


## 可替换项

- Recut your footage to the 4.6s loop, then export at 2522x1858 so the crop the reference specifies survives.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 2522x1858 frame.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 2522x1858.
- Change the navigation copy last; the bar is the one place a longer label breaks the alignment.

## 文案规则

**Making the call-to-action block yours** — Set the new copy at the display size the brief names (15px spacing steps), and the rest of the scale follows without a redesign. If a new element does not help explain the offer or the next action, it belongs below the fold.

**How Paradiso CTA sequences the first read** — A strict order costs you flexibility later. Add a section above the fold and 15px spacing steps have to be re-cut, because the sequence is load-bearing rather than decorative. A travel reader gets the offer before the options.

**Reading Paradiso CTA as a spec** — 1,665 characters of brief produce a full specification. The load-bearing part is short: 15px spacing steps. Nothing in this call-to-action block depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Block | Call to action |
| Field | Travel |
| Viewport | 2522x1858 · 1.36:1 |
| Loop | 4.6s loop |
| Source text | 1,665 characters |
| Capture date | 2026-09-17 |
| Tech stack | Tailwind CSS, single HTML file |
| Motion | a 4.6s media loop |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the call-to-action block you do not need.
2. Open the reference in Studio with the prompt staged, and read the call-to-action block brief before you send it.
3. Load the prompt in Studio and check that it names one self-contained HTML file before you press send.
4. Stage the prompt in Studio and read it once against the 2522x1858 capture before you generate.
5. Copy 15px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/paradiso-cta
原始 prompt：1665 字符
