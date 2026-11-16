# Personal Showcase

> Portfolio reference for an agency or studio — a moving marquee, #050E13 base, a stats row and React and Tailwind CSS.

- 行业：Agencies & Studios（creative）
- 区块：Portfolio
- 画布：1462x1080 · 比例 1.3537 · 12.867s

## 概述

Personal Showcase is a agency portfolio page built from one written brief, and this page documents that brief. The palette runs deep blue #050E13 underneath and white #EFEEE9 for the type, and the type is Inter. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is confined to 300ms transitions, cubic-bezier(0.76, 0, 0.24, 1) and a looping video bed. Borrow the structure and not the subject: the portfolio page and its numbers move to your brand unchanged.

## 主标题文案

> Portfolio reference for an agency or studio, captured at 1462x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#EFEEE9` | Headline |
| Near-black | `#141414` | panel edges |
| Near-black — darker | `#050E13` | composition |
| Gray | `#BCB7B4` | surface |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The clip is one asset at 1462x1080 and a 12.9s loop, so the composition has a single media dependency.
- Media is specified at 1462x1080 and a 12.9s loop, so a replacement should match the crop and the loop length.
- The reference was captured at 1462x1080, and every value quoted on this page comes from the same brief.

## 布局

**A bar with nothing spare** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1462x1080 composition without a background of its own, so the media runs edge to edge underneath it. Test the bar over your own media before giving it a background.

**Measured against the viewport** — The brief states its sizes at capture (16vh sections, 28px spacing steps, 300ms transitions and cubic-bezier(0.76, 0, 0.24, 1) easing), so a rebuild can be verified instead of approximated. A rebuild that hits those numbers looks like the reference without further tuning. Keep the named values when you port the page.

**Type does the styling** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Substituting the face is possible, but the proportions have to survive the swap. Keep the steps, swap the face.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list.


## 动效

**Durations from the brief** — State changes are specified at 300ms, so the feedback on the controls is a designed value rather than a browser default. The durations are short enough that feedback reads as a response rather than as an animation. The timings are part of the design, not a finishing pass.

**The loop does the ambient work** — Ambient movement is one 12.9s clip at 1462x1080, looping quietly behind the copy rather than reacting to the pointer. Because it is muted, the loop can run under the copy without competing for sound or focus.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 1462x1080 crop.
- Keep 1462x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Change the copy first, then the accent, then the media: the 1462x1080 frame was solved in that order and reversing it costs a re-layout.
- Replace the video with a still at 1462x1080 if the 12.9s loop is too heavy for the page you are shipping.

## 文案规则

**The order behind the portfolio page** — A page like this usually buries the action under a feature grid. This one puts navigation, the stats row and the footer in a fixed sequence, with the action inside the first screen rather than after three scroll lengths. A agency reader gets the offer before the options.

**Making the portfolio page yours** — Change the copy and the media first, the colour second, the layout last. The 1462x1080 frame and the Inter scale are what hold the page together, so substitute around them rather than through them. Keep the frame and the scale; the subject is the part that should change.

**How the portfolio page reflows** — Where a template collapses to a single column and hopes, this brief states what happens (the section is held at 16vh, the navigation collapses into a mobile menu and the motion has a reduced-motion branch) and keeps the order intact. A squeeze would have been cheaper and would not hold.


## 规格

| 项 | 值 |
|---|---|
| Block | Portfolio |
| Category | Agencies & Studios |
| Viewport | 1462x1080 · 1.35:1 |
| Clip length | 12.9s loop |
| Input brief | 6,948 characters |
| Captured | 2026-09-17 |
| Fonts | Inter |
| Tools | Tailwind CSS, React, TypeScript |
| Timing | 300ms transitions, cubic-bezier(0.76, 0, 0.24, 1) easing and a 12.9s media loop |

## 复刻步骤

1. Copy 16vh sections, 28px spacing steps and 300ms transitions into your own brief before you rewrite anything else.
2. Keep the measurements the brief spells out: 16vh sections, 28px spacing steps and 300ms transitions.
3. Check your build against the reference measurements: 16vh sections, 28px spacing steps and 300ms transitions.
4. Pin the reference measurements before you restyle anything: 16vh sections, 28px spacing steps and 300ms transitions.
5. Copy the 300ms timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/personal-showcase
原始 prompt：6948 字符
