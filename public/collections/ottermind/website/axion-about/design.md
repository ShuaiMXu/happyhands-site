# Axion About

> About page reference for an AI or SaaS product — cubic-bezier(0.25,0.1,0.25,1) easing, fluid type, #F26522 accent and a 640x468 frame.

- 行业：AI & SaaS（ai-saas）
- 区块：About page
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

Axion About keeps its decision trail: the brief that produced this about page runs 4,393 characters. It leads with “Through research, creative thinking and iteration we help growing brands realize their digital full potential” and gives that line the frame rather than shrinking it into a card. The whole page is built on white #EDEDEE underneath, deep red #3E3133 for the type and bright orange #F26522 carrying the accents. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion comes down to cubic-bezier(0.25,0.1,0.25,1). If you are briefing a SaaS about page, start from this composition and replace the subject.

## 主标题文案

> “Through research, creative thinking and iteration we help growing brands realize their digital full potential” — the whole about page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#F26522` | accent |
| Bright orange — darker | `#E05A1A` | darker |
| Deep red | `#3E3133` | Headline |
| White | `#EDEDEE` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 12–18px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Accent and ground are both named (bright orange #F26522 on white #EDEDEE), so a brand swap moves one value.
- Accent use is limited to bright orange #F26522; everything else sits on white #EDEDEE.
- The accent is spent on bright orange #F26522 and the rest of the composition holds white #EDEDEE.

## 布局

**The spacing steps are quoted** — The layout works on absolute values rather than ratios: type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing. Because the values are fixed, a substitution changes the look without changing the rhythm.

**Badge above the fold** — The announcement is a #F26522 pill above the headline, sized below the supporting copy so it reads as a label rather than a second title. The badge carries #F26522 while the headline stays on the ink colour.

**The composition is the content** — The composition is complete at 640x468: the copy, the media and the controls are all named in the brief. The page is one composition at 640x468, which is why it holds together when the copy changes.

**Nothing here is inherited** — Spacing is quoted the same way (type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing), not as a scale that grows on its own.


## 动效

**Interaction is on the controls** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. Press states are specified as well as hover, so a tap gives the same confirmation as a click. A few reliable states beat a long list of effects.

**Short, matched timings** — Transitions are specified at 0 using cubic-bezier(0.25,0.1,0.25,1), which is the timing the controls are held to. Because the values are short, a rebuild that slows them down is immediately visible.


## 可替换项

- Keep 640x468 for the media and re-crop your own asset into it rather than resizing the frame.
- Swap #F26522 for your brand colour and re-check it against #EDEDEE, since the accent is the only place saturation is allowed.
- Replace “Through research, creative thinking and iteration we help growing brands realize their digital full potential” with your own line and keep the word count, because the entrance is timed per line.
- Hold the about page to one screen on desktop; the brief never asks the reader to scroll past the fold.

## 文案规则

**How Axion About sequences the first read** — The trade-off is patience: the page withholds the detail a scannable grid would hand over immediately. What it buys is a first screen where the announcement badge and the stats row cannot be misread. A SaaS reader gets the offer before the options.

**What holds up for AI & SaaS** — Axion About works because its hierarchy is decided rather than decorated. The brief sets type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing, so new copy lands inside the frame instead of reopening it. Axion About states the offer once and lets the composition repeat it rather than adding a second claim.

**Making the about page yours** — The composition is the reusable part; the subject is yours. Swap the headline, keep the type scale (type from 12px to 18px), and re-test the #F26522 accent over your own media. If a new element does not help explain the offer or the next action, it belongs below the fold. Keep the media crop; it is doing as much work as the type.


## 规格

| 项 | 值 |
|---|---|
| Page part | About page |
| Vertical | AI & SaaS |
| Viewport | 640x468 · 1.37:1 |
| Input brief | 4,393 characters |
| Captured | 2026-09-17 |
| Key tone | bright orange #F26522 |
| Stack | Tailwind CSS, React, TypeScript |
| Transitions | cubic-bezier(0.25,0.1,0.25,1) easing |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing.
2. Keep the measurements the brief spells out: type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing.
3. Check your build against the reference measurements: type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing.
4. Copy type from 12px to 18px, 12px spacing steps and cubic-bezier(0.25,0.1,0.25,1) easing into your own brief before you rewrite anything else.
5. Rebuild it in React and Tailwind CSS or in your own stack; nothing in the brief depends on a plugin.

---
来源：https://ottermind.ai/explore/website/axion-about
原始 prompt：4393 字符
