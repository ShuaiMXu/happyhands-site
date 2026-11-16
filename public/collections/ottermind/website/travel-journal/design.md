# Travel Journal

> Blog section reference for a travel brand — React and Tailwind CSS, a stats row, 150ms transitions and Inter.

- 行业：Travel（travel）
- 区块：Blog section
- 画布：1470x1080 · 比例 1.3611 · 6.367s

## 概述

Travel Journal is a working reference for a travel brand: the blog section laid out, measured and ready to rebuild. The colour scheme is deep blue #1A1A1E underneath and muted teal #77A0B0 carrying the accents, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1470x1080 so the frame is fixed before any code is written. Motion comes down to 150ms transitions and a looping video bed. Take it on when the blog section needs a decided order before any new sections are added.

## 主标题文案

> Blog section reference built on deep blue #1A1A1E and muted teal #77A0B0, set in Inter and measured against 10px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0A0C` | darkest |
| Near-black — lighter | `#1A1A1E` | composition |
| Near-black — lighter | `#101518` | panel edges |
| Muted teal | `#77A0B0` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Nothing sits between the type and the 1470x1080 clip, so a replacement has to work under the copy directly.
- Accent use is limited to muted teal #77A0B0; everything else sits on deep blue #1A1A1E.
- The clip is one asset at 1470x1080 and a 6.4s loop, so the composition has a single media dependency.

## 布局

**One row, no drawers** — The bar is the quietest part of the composition: wordmark, a short row of links and one #77A0B0 action, all held at the smallest type step in the brief. The links are set below the wordmark in size, and the #77A0B0 action is the only element in the bar with any weight.

**Sizes fixed in the brief** — The brief states its sizes at capture (52px corners, 10px spacing steps and 150ms transitions), so a rebuild can be verified instead of approximated. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate. Verify a rebuild against the same numbers.

**Media behind the type** — The 1470x1080 video runs 6.4s on a loop behind the copy, muted and inline, with no tint layer between the two. The loop is short enough (6.4s) that the eye reads it as texture rather than as a timeline.

**The scale is the styling** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. Weights are specified per role, so the hierarchy does not depend on guesswork at build time.


## 动效

**Short, matched timings** — State changes are specified at 150ms, so the feedback on the controls is a designed value rather than a browser default. Short timings are why the page reads as authored; a slow default would undo the composition.

**Ambient motion without a scroll library** — The background clip runs 6.4s at 1470x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. The loop is cropped to cover, which means the composition does not depend on a particular frame size. Shoot or export at 1470x1080 or wider.


## 可替换项

- Move #77A0B0 to your own hue and leave #1A1A1E where it is; the distance between them is doing the hierarchy work.
- Keep the supporting line as short as the reference's and measure the pair against the 1470x1080 crop.
- Swap #77A0B0 for your brand colour and re-check it against #1A1A1E, since the accent is the only place saturation is allowed.
- Change the copy before the colour: rewrite the Inter paragraphs first, then check #77A0B0 against the media behind them.

## 文案规则

**Making the blog section yours** — Change the copy and the media first, the colour second, the layout last. The 1470x1080 frame and the Inter scale are what hold the page together, so substitute around them rather than through them. Keep the frame and the scale; the subject is the part that should change.

**What moves in Travel Journal** — The trade-off is that nothing here rewards a second look for its animation. What it rewards is the reading order, with 150ms transitions and a 6.4s media loop confirming state rather than decorating it. Nothing animates for its own sake in this blog section.

**The numbers behind the blog section** — Committing to 52px corners, 10px spacing steps and 150ms transitions trades flexibility for repeatability. That is the point of the reference: the same page in a different brand, without a new set of guesses. Nothing in this blog section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page part | Blog section |
| Vertical | Travel |
| Canvas | 1470x1080 · 1.36:1 |
| Duration | 6.4s loop |
| Prompt | 5,151 characters |
| Capture date | 2026-09-17 |
| Accent hex | muted teal #77A0B0 |
| Typefaces | Inter |
| Stack | Tailwind CSS, React, TypeScript |
| Motion spec | 150ms transitions and a 6.4s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1470x1080 capture before you generate.
2. Drop your product name in, then replace #77A0B0 with your own accent and re-check the contrast.
3. Set the brand first: product name, the #77A0B0 accent and a headline that replaces the reference's.
4. Set your brand first: product name, the #77A0B0 accent and the headline that replaces the reference's.
5. Type the product name and the #77A0B0 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/travel-journal
原始 prompt：5151 字符
