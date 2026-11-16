# Vision Reveal

> Hero section reference for an agency or studio — max-width 447px and min-width 768px breakpoints, 0.3s transitions, a dark stage and Inter.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1460x1080 · 比例 1.3519 · 5.78s

## 概述

Vision Reveal keeps its decision trail: the brief that produced this hero section runs 16,723 characters. It leads with “I build compelling visual stories & motion that make ideas shine” and gives that line the frame rather than shrinking it into a card. The palette is white #E4E4E4 underneath, black #111111 for the type and teal #75C5DE carrying the accents, set in Inter. The entry names the stack that produced the page (Framer Motion) rather than hiding it. The motion budget is 0.3s transitions, cubic-bezier(0.96,-0.02,0.38,1.01) and a looping video bed. Keep it open while you write: the 16,723-character brief is the part that transfers to your own page.

## 主标题文案

> “I build compelling visual stories & motion that make ideas shine” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F4F1E8` | lightest |
| Near-black | `#111111` | Headline |
| Teal | `#75C5DE` | accent |
| White — darker | `#E4E4E4` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 14–42px | Headline and interface text — one face for the whole page |

## 视觉要点

- The display line is Inter at the top of a 14–42px scale, with the interface text on the same face.
- The navigation collapses at max-width 447px and min-width 768px, so the bar has a designed narrow state.
- The clip is one asset at 1460x1080 and a 5.8s loop, so the composition has a single media dependency.

## 布局

**The bar shares the page grid** — Links sit on one line at a single size, and the #75C5DE action closes the row on the right so the eye finishes where the navigation ends. Labels are short enough to fit one line at 447px, and the active item is marked with weight rather than with a pill.

**The loop is the backdrop** — The composition is built on top of the 1460x1080 clip rather than beside it, so the media never gets a panel or a border. A poster frame at 1460x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**Tracking tightens as it grows** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Tracking tightens as the size grows, which is why the display line holds together across 14–42px.

**Links collapse at one width** — Test the bar over your own media before giving it a background. The reference was captured at 1460x1080.


## 动效

**The scene is the visual** — A WebGL canvas is the page's only spectacle, and the interface is arranged not to compete with it. Because it is a render rather than a still, the focal element holds up at any size.

**Motion can be switched off** — The motion layer has an off switch. Under prefers-reduced-motion, the entrance and the loop is dropped and everything else stays where it is. Interaction feedback still works under reduced motion; only the entrances are dropped. The layout has to survive without the animation.


## 可替换项

- Check #75C5DE against the copy size in Inter before you swap either, because the accent only reads on a large line.
- Retune #75C5DE for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Swap the clip for your own. Export at 1460x1080 or wider, keep it muted, and make the 5.8s loop seamless so the cut is invisible.
- Replace “I build compelling visual stories & motion that make ideas shine” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**Why the agency brief holds** — A tint layer over the media would have been the easy fix. The brief leaves it off. The media is a 5.8s 1460x1080 loop. The copy still holds because type from 14px to 42px and 100vh sections keep the frame calm. Vision Reveal states the offer once and lets the composition repeat it rather than adding a second claim.

**The order behind the hero section** — Where a marketing page stacks proof below the fold and hopes, this hero section puts navigation, the headline, the stats row and the feature list in front of the reader and holds the rest back. A agency reader gets the offer before the options.

**Making the hero section yours** — Set the new copy at the display size the brief names (type from 14px to 42px and 100vh sections), and the rest of the scale follows without a redesign. Keep the media crop; it is doing as much work as the type.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Field | Agencies & Studios |
| Format | 1460x1080 · 1.35:1 |
| Loop length | 5.8s loop |
| Source text | 16,723 characters |
| Capture date | 2026-09-17 |
| Accent tone | teal #75C5DE |
| Fonts | Inter · 14–42px |
| Reference stack | Framer Motion |
| Motion | 0.3s transitions, cubic-bezier(0.96,-0.02,0.38,1.01) easing and a 5.8s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names Framer Motion before you press send.
2. Drop your product name in, then replace #75C5DE with your own accent and re-check the contrast.
3. Set the brand first: product name, the #75C5DE accent and a headline that replaces the reference's.
4. Type the product name and the #75C5DE accent before you touch the layout.
5. Set your brand first: product name, the #75C5DE accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/vision-reveal
原始 prompt：16723 字符
