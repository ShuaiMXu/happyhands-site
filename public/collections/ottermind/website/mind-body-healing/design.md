# Mind-Body Healing

> Landing page reference for a health or wellbeing product — looping video, glass panels, Inter and a stats row.

- 行业：Health（health）
- 区块：Landing page
- 画布：1468x1080 · 比例 1.3593 · 6.767s

## 概述

Before rebuilding a landing page for a health or wellbeing product, read Mind-Body Healing: the composition and the specification behind it are both here. The page's own headline reads “Holistic wellness. Transformative results”, and the composition is built around those exact words. The palette is muted indigo #D1C4E9 underneath and magenta #AD4A80 carrying the accents, set in Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. The brief spends its motion budget on 500ms transitions and a looping video bed. This reference is for a health or wellbeing product that wants the first screen settled before the build starts.

## 主标题文案

> Landing page reference built on muted indigo #D1C4E9 and magenta #AD4A80, set in Inter and measured against 100vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Magenta | `#AD4A80` | accent |
| White | `#E6D8F0` | lightest |
| Muted blue | `#94A5E8` | darker |
| Muted indigo | `#D1C4E9` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 / 700 | Headline and interface text — one face for the whole page |

## 视觉要点

- The accent is spent on magenta #AD4A80 and the rest of the composition holds muted indigo #D1C4E9.
- The clip is one asset at 1468x1080 and a 6.8s loop, so the composition has a single media dependency.
- Accent and ground are both named (magenta #AD4A80 on muted indigo #D1C4E9), so a brand swap moves one value.

## 布局

**Links collapse at one width** — The bar carries the wordmark, the section links and one #AD4A80 button, measured at 100vh sections and 500ms transitions so it never grows into a second header. The links are set below the wordmark in size, and the #AD4A80 action is the only element in the bar with any weight. The bar is a handful of elements, so it rebuilds without a component library.

**The poster frame matters** — The media is one 6.8s clip cropped to cover the 1468x1080 frame, so it never letterboxes at any width. The loop is short enough (6.8s) that the eye reads it as texture rather than as a timeline.

**The scale is the styling** — The type is Inter at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. Tracking is set per size, so the display line and the caption do not share one letter-spacing value. The scale is quoted; use it.

**The nav is deliberately thin** — The bar sits over the 1468x1080 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Ambient motion without a scroll library** — Ambient movement is one 6.8s clip at 1468x1080, looping quietly behind the copy rather than reacting to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution. Shoot or export at 1468x1080 or wider.

**Durations from the brief** — The timings are short and consistent (500ms), so hover and press states read as one system instead of a set of separate effects. Because the values are short, a rebuild that slows them down is immediately visible.


## 可替换项

- Replace #AD4A80 last, after the copy is final, and test it against #D1C4E9 at the smallest text size on the page.
- Replace the copy in the Inter stack first, then re-check the #AD4A80 accent against the media behind it.
- Set your own headline in Inter at the size the reference uses, so the landing page keeps the same optical weight.
- Swap the clip for your own footage at 1468x1080 or wider, keep it muted, and match the 6.8s loop point.

## 文案规则

**How the landing page reflows** — You cannot fix a narrow screen by shrinking it. This brief handles the change in the type and the navigation instead: the section is held at 100vh and the navigation collapses into a mobile menu. The hierarchy is what survives the reflow.

**What a health or wellbeing product gains here** — The reason this works for a health or wellbeing product is that it never asks the reader to assemble the message. The page says it out loud: “Holistic wellness. Transformative results”. Layout, type and colour are decided (muted indigo #D1C4E9 and magenta #AD4A80, set in Inter), so the first screen reads as a finished argument rather than a pile of parts. It gives a health reader the shortest honest route to the offer.

**Reading Mind-Body Healing as a spec** — The brief is a specification. It states 100vh sections and 500ms transitions, and it names the media frame at 1468x1080 before anything is designed around it. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Vertical | Health |
| Format | 1468x1080 · 1.36:1 |
| Duration | 6.8s loop |
| Input brief | 5,232 characters |
| Archived | 2026-09-17 |
| Accent | magenta #AD4A80 |
| Fonts | Inter |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 500ms transitions and a 6.8s media loop |

## 复刻步骤

1. Drop your product name in, then replace #AD4A80 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #AD4A80 accent and a headline that replaces the reference's.
3. Type the product name and the #AD4A80 accent before you touch the layout.
4. Set your brand first: product name, the #AD4A80 accent and the headline that replaces the reference's.
5. Keep the measurements the brief spells out: 100vh sections and 500ms transitions.

---
来源：https://ottermind.ai/explore/website/mind-body-healing
原始 prompt：5232 字符
