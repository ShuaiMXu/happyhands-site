# 3D Collectible Hero

> Hero section reference for a 3D, game or entertainment brand — cubic-bezier(0.4,0,0.2,1) easing, a 640x470 frame, #85CC92 base and 650ms transitions.

- 行业：3D & Games（3d-games）
- 区块：Hero section
- 画布：640x470 · 比例 1.3617 · 0s

## 概述

Before rebuilding a hero section for a 3D, game or entertainment brand, read 3D Collectible Hero: the composition and the specification behind it are both here. The palette runs muted green #85CC92 underneath and red #F4845F carrying the accents, and the type is Anton. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. The page keeps its motion to 650ms transitions and cubic-bezier(0.4,0,0.2,1). It is most useful when the 3D & Games hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built on muted green #85CC92 and red #F4845F, set in Anton and measured against a fixed 22px display size.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Red | `#F4845F` | accent |
| Red — lighter | `#F79B7F` | saturated |
| Green | `#6BBF7A` | Secondary |
| Muted green | `#85CC92` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Anton | 22px | Headline and interface text |
| Inter | 22px | Copy face |

## 视觉要点

- Accent use is limited to red #F4845F; everything else sits on muted green #85CC92.
- Transitions are specified at 650ms, which is the value to keep when the palette changes.
- The type is set in Anton on a 22px scale, and the spacing follows the same steps.

## 布局

**Navigation without a background** — Wordmark, links and the #F4845F action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #F4845F action is the only element in the bar with any weight.

**Measured, not eyeballed** — Sizes are quoted rather than inherited: a fixed 22px display size, 100vh sections, 200px spacing steps and 650ms transitions. Swap the face or the copy and those relationships still hold. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.

**Structure in one screen** — The hero section is built so the copy lands before anything else: the type carries the hierarchy, the 640x470 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x470, which is why it holds together when the copy changes.

**The bar shares the page grid** — Give the wordmark no more room than its type needs. The reference was captured at 640x470.


## 动效

**State changes, timed** — Motion is measured in milliseconds here: 650ms using cubic-bezier(0.4,0,0.2,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. One value is reused across the controls, so their timing cannot drift apart.

**Texture instead of flat fill** — A grain layer sits over muted green #85CC92, so large flat areas read as material rather than as plain fill. The grain is subtle enough that it never competes with the type.


## 可替换项

- Swap #F4845F for your brand colour and re-check it against #85CC92, since the accent is the only place saturation is allowed.
- Retime the entrance to your own 650ms, but keep cubic-bezier(0.4,0,0.2,1) as the curve, because the easing is what reads as this design.
- Load your own face beside Anton and compare the headline at full width before committing to the swap.
- Set 650ms to your own build speed and check that cubic-bezier(0.4,0,0.2,1) still lands the copy before the media starts.

## 文案规则

**What moves in 3D Collectible Hero** — Motion is a short list rather than a system. The brief names 650ms transitions, hover and press states and a grain overlay, and the rest of the page stays still. Nothing animates for its own sake in this hero section.

**What this hero section gets right** — If your first screen currently explains three things, this is the version that explains one. navigation, the stats row and the feature list are staged in reading order, with a fixed 22px display size and 100vh sections setting the rhythm. 3D Collectible Hero states the offer once and lets the composition repeat it rather than adding a second claim.

**How the hero section reflows** — The brief describes what changes at each width (the scale is fluid rather than stepped and the section is held at 100vh), which means the mobile version is a decision rather than a squeeze. Contrast is held on the #F4845F accent over the media, and the video is muted and inline. The reflow keeps the action reachable at every width.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | 3D & Games |
| Viewport | 640x470 · 1.36:1 |
| Prompt text | 5,347 characters |
| Date | 2026-09-17 |
| Accent tone | red #F4845F |
| Type scale | Anton, Inter · 22px |
| Tools | Tailwind CSS, React, TypeScript |
| Motion spec | 650ms transitions and cubic-bezier(0.4,0,0.2,1) easing |

## 复刻步骤

1. Drop your product name in, then replace #F4845F with your own accent and re-check the contrast.
2. Set the brand first: product name, the #F4845F accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #F4845F accent and the headline that replaces the reference's.
4. Type the product name and the #F4845F accent before you touch the layout.
5. Copy a fixed 22px display size, 100vh sections and 200px spacing steps into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/3d-collectible-hero
原始 prompt：5347 字符
