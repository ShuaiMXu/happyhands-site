# Cyber Ronin

> Landing page reference for a 3D, game or entertainment brand — looping video, Inter, scroll-triggered reveals and one self-contained HTML file.

- 行业：3D & Games（3d-games）
- 区块：Landing page
- 画布：1920x1420 · 比例 1.3521 · 5.975s

## 概述

This is the landing page from Cyber Ronin, published with the brief that produced it rather than as a screenshot. “Cyber Ronin // Neural Edges” is the line the layout is built to carry. The palette runs orange #C45A18 underneath and cream #FBDBAF for the type, and the type is Inter. The build is one self-contained HTML file; every measurement in it is written down, which is what makes it reusable. Motion is 0.25s transitions, cubic-bezier(0.25,0.46,0.45,0.94) and a looping video bed, kept quiet enough that the copy still leads. If you are briefing a 3D landing page, start from this composition and replace the subject.

## 主标题文案

> “Cyber Ronin // Neural Edges” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Cream | `#FBDBAF` | Headline |
| Orange | `#E07020` | lighter |
| Orange — darker | `#C45A18` | composition |
| Near-black | `#080503` | darkest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Interface |
| Orbitron-Medium | Weight not fixed in the brief | Body copy |

## 视觉要点

- The clip is one asset at 1920x1420 and a 6s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1920x1420 clip, so a replacement has to work under the copy directly.
- Transitions are specified at 0.25s, short enough that the page never feels like it is waiting for an animation.

## 布局

**One scale for type and frame** — The list stays short (100vh sections, 28px spacing steps, 0.25s transitions and cubic-bezier(0.25,0.46,0.45,0.94) easing), which is why the whole system can be checked by hand. The list is short enough that a reviewer can check it element by element.

**A clip, not an illustration** — The background is a single 6s loop at 1920x1420, cropped to cover and left un-tinted. Everything else floats above it on a higher layer. Export at 1920x1420 or wider and the cover crop keeps working.

**One face, used with discipline** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. The interface text stays on one face, so the page never mixes two voices at the same size. Do not add a size without a job.

**The brief names the steps** — Spacing is quoted the same way (100vh sections, 28px spacing steps, 0.25s transitions and cubic-bezier(0.25,0.46,0.45,0.94) easing), not as a scale that grows on its own.


## 动效

**The loop does the ambient work** — The background clip runs 6s at 1920x1420 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required. Shoot or export at 1920x1420 or wider.

**Entrance as the signature** — Entrance motion is spent on one element only (the headline arrives word by word), which is what keeps a busy first screen from feeling busy. Timing is applied to the words rather than to the container, which is why the line lands as a sentence instead of a block. Test it with the motion off. The reference was captured at 1920x1420.


## 可替换项

- Read the brief value by value against the 1920x1420 capture before you edit anything; the numbers are the part that is easiest to lose.
- Swap the clip for your own footage at 1920x1420 or wider, keep it muted, and match the 6s loop point.
- Keep the supporting line as short as the reference's and measure the pair against the 1920x1420 crop.
- Rewrite “Cyber Ronin // Neural Edges” to the same line count; the mask reveals each line in turn.

## 文案规则

**Reading Cyber Ronin as a spec** — Where a mood board leaves the scale open, this brief closes it: 100vh sections and 28px spacing steps, with the surrounding values derived from that decision. Nothing in this landing page depends on a default.

**How the landing page reflows** — The narrow layout is designed, not inherited. the scale is fluid rather than stepped, the layout shifts at 360px and the section is held at 100vh at each width, so the hierarchy survives the reflow. A squeeze would have been cheaper and would not hold.

**How Cyber Ronin sequences the first read** — You could shuffle these blocks and the page would still load. It would stop reading as an argument, though: the stats row, the card grid and the feature list are a sequence, and 100vh sections and 28px spacing steps only work in that order. A 3D reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Sector | 3D & Games |
| Canvas | 1920x1420 · 1.35:1 |
| Loop | 6s loop |
| Source text | 10,993 characters |
| Capture date | 2026-09-17 |
| Type | Inter, Orbitron-Medium |
| Tech stack | single HTML file |
| Animation | 0.25s transitions, cubic-bezier(0.25,0.46,0.45,0.94) easing and a 6s media loop |

## 复刻步骤

1. Check your build against the reference measurements: 100vh sections, 28px spacing steps and 0.25s transitions.
2. Copy 100vh sections, 28px spacing steps and 0.25s transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: 100vh sections, 28px spacing steps and 0.25s transitions.
4. Keep the measurements the brief spells out: 100vh sections, 28px spacing steps and 0.25s transitions.
5. Copy the 0.25s timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/cyber-ronin
原始 prompt：10993 字符
