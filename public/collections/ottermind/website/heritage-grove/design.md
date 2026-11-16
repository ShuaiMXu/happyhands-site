# Heritage Grove

> Footer reference for an ecommerce brand — a dark stage, #EAE3DE base, one self-contained HTML file and fluid type.

- 行业：Ecommerce（ecommerce）
- 区块：Footer
- 画布：1920x1424 · 比例 1.3483 · 9.6s

## 概述

Heritage Grove was captured at 1920x1424 and kept as a specification rather than as a gallery image. The headline reads “Heritage Grove — Footer”, and the rest of the footer is arranged around it. The palette runs cream #EAE3DE underneath, teal #0F454F for the type and shade #2A707C carrying the accents, and the type is Poppins. Delivery is one self-contained HTML file, captured at 1920x1424 so the frame is fixed before any code is written. The motion budget is 2s transitions, cubic-bezier(.22,1.36,1) and a looping video bed. It is most useful when the Ecommerce footer has to survive a copy change without a redesign.

## 主标题文案

> Footer reference built around “Heritage Grove — Footer”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Cream | `#EAE3DE` | composition |
| Shade | `#175A67` | Headline |
| Shade — lighter | `#2A707C` | accent |
| Teal | `#0F454F` | Body text |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Poppins | 16px | Headline and interface text |
| Cormorant Garamond | 16px | Accent face |

## 视觉要点

- Transitions are specified at 2s, which is the value to keep when the palette changes.
- Accent and ground are both named (shade #2A707C on cream #EAE3DE), so a brand swap moves one value.
- Accent use is limited to shade #2A707C; everything else sits on cream #EAE3DE.

## 布局

**Links collapse at one width** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #2A707C action, all of it sitting above the footer without a background of its own. Labels are short enough to fit one line at 359px, and the active item is marked with weight rather than with a pill. Design the collapsed state before adding a sixth link.

**Media without an overlay** — The media is doing atmospheric work rather than storytelling: one 9.6s loop at 1920x1424 behind everything else. Export at 1920x1424 or wider and the cover crop keeps working.

**Behaviour is defined per width** — Width changes are handled in the type itself: a clamp between 240px and 52px carries the headline from phone to desktop without a separate mobile composition. Controls stay large enough to tap and the copy keeps its reading order at every width. Check the first screen on a phone.

**A bar with nothing spare** — Below 359px the links collapse instead of wrapping onto a second line.


## 动效

**A loop, not a timeline** — Ambient movement comes from the 9.6s 1920x1424 loop rather than from scroll effects, which keeps the page calm and the type readable. Because it is muted, the loop can run under the copy without competing for sound or focus.

**A quieter branch is included** — The brief includes a prefers-reduced-motion branch, so the entrance and the loop can be switched off without losing the layout. Copy that branch straight into your build. With reduced motion on, the composition holds its final state rather than snapping mid-transition. The layout has to survive without the animation.


## 可替换项

- Check #2A707C against the copy size in Poppins before you swap either, because the accent only reads on a large line.
- Hold the 1920x1424 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Recut your footage to the 9.6s loop, then export at 1920x1424 so the crop the reference specifies survives.
- Set 2s to your own build speed and check that cubic-bezier(.22,1.36,1) still lands the copy before the media starts.

## 文案规则

**How Heritage Grove sequences the first read** — If your page currently leads with features, this is the order to copy: navigation, the stats row, the feature list, the form and the background clip in front, the supporting detail after, and a fixed 16px display size and 100vh sections setting the distance. A ecommerce reader gets the offer before the options.

**How the footer reflows** — The footer is composed at 1920x1424 and then re-composed for narrow widths. the scale is fluid rather than stepped, the layout shifts at 359px and the section is held at 100vh, so the phone version is a decision rather than a squeeze. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**Why the ecommerce brief holds** — The reason this works for an ecommerce brand is that it never asks the reader to assemble the message. “Heritage Grove — Footer” is doing that work from the first frame. Layout, type and colour are decided (cream #EAE3DE and shade #2A707C, set in Poppins), so the first screen reads as a finished argument rather than a pile of parts. Heritage Grove states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Block | Footer |
| Industry | Ecommerce |
| Viewport | 1920x1424 · 1.35:1 |
| Clip length | 9.6s loop |
| Prompt | 12,893 characters |
| Date | 2026-09-17 |
| Accent tone | shade #2A707C |
| Fonts | Poppins, Cormorant Garamond · 16px |
| Tech stack | vanilla JS, single HTML file |
| Transitions | 2s transitions, cubic-bezier(.22,1.36,1) easing and a 9.6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1424 capture before you generate.
2. Set the brand first: product name, the #2A707C accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #2A707C with your own accent and re-check the contrast.
4. Type the product name and the #2A707C accent before you touch the layout.
5. Set your brand first: product name, the #2A707C accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/heritage-grove
原始 prompt：12893 字符
