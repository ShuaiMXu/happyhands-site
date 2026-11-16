# Playful Idea

> Footer reference for an agency or studio — #F0EEFA base, fluid type, looping video and Epilogue.

- 行业：Agencies & Studios（creative）
- 区块：Footer
- 画布：1564x1080 · 比例 1.4481 · 6.9s

## 概述

Before rebuilding a footer for an agency or studio, read Playful Idea: the composition and the specification behind it are both here. The palette runs #F0EEFA underneath and near-black #080909 for the type, and the type is Epilogue. Delivery is one self-contained HTML file, captured at 1564x1080 so the frame is fixed before any code is written. The motion budget is 2.54167s transitions and a looping video bed. If you are briefing a agency footer, start from this composition and replace the subject.

## 主标题文案

> Footer reference for an agency or studio, captured at 1564x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#080909` | Headline |
| Neutral | `#F0EEFA` | background |
| Neutral — darker | `#DFE4F2` | Background |
| White | `#F7F8FA` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Epilogue | 14–17px | Interface |
| DM Sans | 14–17px | Text face |

## 视觉要点

- Nothing sits between the type and the 1564x1080 clip, so a replacement has to work under the copy directly.
- Media is specified at 1564x1080 and a 6.9s loop, so a replacement should match the crop and the loop length.
- Card widths come from the 2-column grid rather than from the copy, so the panels stay equal.

## 布局

**Links collapse at one width** — The wordmark holds the left edge and the links run to the right of it, all of it set in Epilogue so the bar belongs to the page below rather than to a separate system. Labels are short enough to fit one line at 700px, and the active item is marked with weight rather than with a pill.

**The video is the background, not a panel** — A 6.9s clip at 1564x1080 does the atmospheric work; the brief fixes its crop and leaves the type untouched on top of it. Export at 1564x1080 or wider and the cover crop keeps working.

**Fluid where it needs to be** — Width changes are handled in the type itself: a clamp between 14px and 17px carries the headline from phone to desktop without a separate mobile composition. Controls stay large enough to tap and the copy keeps its reading order at every width.

**Figures as typography** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the footer from turning into a feature list. There are no dividers inside the row; spacing alone separates the figures.


## 动效

**Motion can be switched off** — The motion layer ships with an off switch: the entrance and the loop is dropped under prefers-reduced-motion. Interaction feedback still works under reduced motion; only the entrances are dropped.

**The canvas holds the first screen** — The visual is produced at runtime (a WebGL canvas) rather than loaded as a still, so the 1564x1080 frame has one fewer asset. The scene is drawn at the size of its container, so it does not depend on a fixed render resolution.


## 可替换项

- Replace the video with a still at 1564x1080 if the 6.9s loop is too heavy for the page you are shipping.
- Keep Epilogue or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Keep 1564x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Keep Epilogue or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.

## 文案规则

**Reading Playful Idea as a spec** — Every relationship on this page is a value you can check: type from 14px to 17px, 100vh sections, a 2-column grid, 100px corners and 30px spacing steps. That is what makes Playful Idea rebuildable rather than merely reproducible. Nothing in this footer depends on a default.

**What to change first in Playful Idea** — Change the copy and the media first, the colour second, the layout last. The 1564x1080 frame and the Epilogue scale are what hold the page together, so substitute around them rather than through them. Rewrite the copy and the media before you re-colour anything.

**How Playful Idea sequences the first read** — The footer has a stated reading path. Navigation establishes the product and gives a returning visitor a familiar way around. From there the eye takes navigation, the headline, the announcement badge, the stats row and the background clip in sequence, which is what keeps a single screen from reading as a list. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Section | Footer |
| Vertical | Agencies & Studios |
| Canvas | 1564x1080 · 1.45:1 |
| Clip length | 6.9s loop |
| Input brief | 30,665 characters |
| Capture date | 2026-09-17 |
| Type scale | Epilogue, DM Sans · 14–17px |
| Reference stack | React, TypeScript, single HTML file |
| Animation | 2.54167s transitions and a 6.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1564x1080 capture before you generate.
2. Keep the measurements the brief spells out: type from 14px to 17px, 100vh sections and a 2-column grid.
3. Pin the reference measurements before you restyle anything: type from 14px to 17px, 100vh sections and a 2-column grid.
4. Copy type from 14px to 17px, 100vh sections and a 2-column grid into your own brief before you rewrite anything else.
5. Check your build against the reference measurements: type from 14px to 17px, 100vh sections and a 2-column grid.

---
来源：https://ottermind.ai/explore/website/playful-idea
原始 prompt：30665 字符
