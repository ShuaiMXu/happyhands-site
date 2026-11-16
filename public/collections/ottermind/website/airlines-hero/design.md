# Airlines Hero Section

> Hero section reference for a travel brand — a stats row, one self-contained HTML file, looping video and a moving marquee.

- 行业：Travel（travel）
- 区块：Hero section
- 画布：1466x1080 · 比例 1.3574 · 2.2s

## 概述

Airlines Hero Section is a working reference for a travel brand: the hero section laid out, measured and ready to rebuild. The palette is deep indigo #20153E underneath and indigo #56489B carrying the accents, set in Inter. The entry names the stack that produced the page (one self-contained HTML file) rather than hiding it. The brief spends its motion budget on a looping video bed. Use it as the reference when you are building a travel brand hero section and want a finished composition instead of a starting point.

## 主标题文案

> Hero section reference built on deep indigo #20153E and indigo #56489B, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1D0511` | darkest |
| Muted orange | `#CAA490` | lighter |
| Indigo | `#56489B` | accent |
| Deep indigo | `#20153E` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Accent and ground are both named (indigo #56489B on deep indigo #20153E), so a brand swap moves one value.
- The accent is spent on indigo #56489B and the rest of the composition holds deep indigo #20153E.
- The clip is one asset at 1466x1080 and a 2.2s loop, so the composition has a single media dependency.

## 布局

**The nav is deliberately thin** — The top row holds the wordmark, four to five links and a single action tinted #56489B, sized to stay quiet against the rest of the page. A mobile overlay takes over below the tablet breakpoint. The links are set below the wordmark in size, and the #56489B action is the only element in the bar with any weight.

**The sizes are in the brief, not in a scale** — Nothing here is eyeballed. The spec fixes 100vh sections and 14px spacing steps, and the rest of the layout derives from those values. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length. Change the subject, not the steps.

**Video at the bottom layer** — The background is a single 2.2s loop at 1466x1080, cropped to cover and left un-tinted. Everything else floats above it on a higher layer. The loop is short enough (2.2s) that the eye reads it as texture rather than as a timeline.

**One face, used with discipline** — Type is the styling system here: Inter at the display size, the same face across the interface, and no second accent colour doing the work. Substituting the face is possible, but the proportions have to survive the swap.


## 动效

**The controls are the interactive layer** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. Hover and focus are specified together, so the pointer and the keyboard get the same information. Check the states on a touch device.

**The loop does the ambient work** — Ambient movement is one 2.2s clip at 1466x1080, looping quietly behind the copy rather than reacting to the pointer. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Replace the copy in the Inter stack first, then re-check the #56489B accent against the media behind it.
- Keep 1466x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Draft the new copy to the 1466x1080 frame, then check that the entrance still lands on the same number of lines.
- Change #56489B for your brand accent and re-check it against #20153E, because the accent is the only saturated value in this composition.

## 文案规则

**What holds up for Travel** — Most travel pages add another section when the first screen is weak. This one removes options instead: navigation, the headline, the stats row and the background clip, in that order, and nothing that repeats the offer. Airlines Hero Section states the offer once and lets the composition repeat it rather than adding a second claim.

**The order behind the hero section** — The page has a deliberate order. Navigation establishes the product and gives a returning visitor a familiar way around. The headline takes the display size, the supporting line explains the offer, and the indigo #56489B accent marks the primary action, so the next step is never in question. Nothing else competes: there is no card grid before the first decision, which is what keeps the hero section from feeling heavy in travel work. A travel reader gets the offer before the options.

**The timing behind the hero section** — Count the animated elements and the list is short: hover and press states, a 2.2s media loop and a looping marquee. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Industry | Travel |
| Frame | 1466x1080 · 1.36:1 |
| Clip length | 2.2s loop |
| Prompt | 2,222 characters |
| Captured | 2026-09-17 |
| Key colour | indigo #56489B |
| Typefaces | Inter |
| Stack | Tailwind CSS, single HTML file |
| Motion spec | a 2.2s media loop |

## 复刻步骤

1. Set the brand first: product name, the #56489B accent and a headline that replaces the reference's.
2. Type the product name and the #56489B accent before you touch the layout.
3. Drop your product name in, then replace #56489B with your own accent and re-check the contrast.
4. Set your brand first: product name, the #56489B accent and the headline that replaces the reference's.
5. Check your build against the reference measurements: 100vh sections and 14px spacing steps.

---
来源：https://ottermind.ai/explore/website/airlines-hero
原始 prompt：2222 字符
