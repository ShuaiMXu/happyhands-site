# Neurolink Hero Section

> Hero section reference for an agency or studio — looping video, a dark stage, glass panels and vanilla JS.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1526x1080 · 比例 1.413 · 3.9s

## 概述

Neurolink Hero Section solves the hero section problem for an agency or studio with a single captured brief. The headline reads “Where Memories Live Forever”, and the rest of the hero section is arranged around it. The palette is deep blue #0D1017 underneath, white #FFFFFF for the type and bright orange #FFB733 carrying the accents, set in Inter. Delivery is vanilla JS — one page, no plugin, no build tooling between you and the design. Motion is limited to a looping video bed. Keep it open while you write: the 10,336-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “Where Memories Live Forever”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | Headline |
| Bright orange | `#FFB733` | accent |
| Near-black | `#0D1017` | composition |
| Muted orange | `#E8DDC4` | lighter |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Accent use is limited to bright orange #FFB733; everything else sits on deep blue #0D1017.
- Accent and ground are both named (bright orange #FFB733 on deep blue #0D1017), so a brand swap moves one value.
- The accent is spent on bright orange #FFB733 and the rest of the composition holds deep blue #0D1017.

## 布局

**Links before the action** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #FFB733 action, all of it sitting above the hero section without a background of its own. The links are set below the wordmark in size, and the #FFB733 action is the only element in the bar with any weight.

**Numbers carried into the build** — The brief fixes 100vh sections and 16px spacing steps and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. Because the values are fixed, a substitution changes the look without changing the rhythm. Keep the values that look arbitrary.

**One media element carries the mood** — One 3.9s asset carries the whole first screen, and the page has no second media element to keep in sync. The loop is short enough (3.9s) that the eye reads it as texture rather than as a timeline.

**Type does the styling** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. Substituting the face is possible, but the proportions have to survive the swap.


## 动效

**The controls are the interactive layer** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card), so the page feels responsive without turning every element into a target. Each state changes one property, which keeps the feedback legible. Do not animate layout on hover.

**The loop does the ambient work** — The background clip runs 3.9s at 1526x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Retint #FFB733 toward your palette but keep the step against #0D1017; flatten the two and the primary action stops reading.
- Rewrite “Where Memories Live Forever” to the same line count; the mask reveals each line in turn.
- Replace the copy in the Inter stack first, then re-check the #FFB733 accent against the media behind it.
- Replace “Where Memories Live Forever” with your own line and keep the word count, because the entrance is timed per line.

## 文案规则

**Why the agency brief holds** — The design argues its case on one screen. The media is a 3.9s 1526x1080 loop. The media carries the atmosphere, the copy carries the offer, and 100vh sections and 16px spacing steps keep the two apart. Neurolink Hero Section states the offer once and lets the composition repeat it rather than adding a second claim.

**How the hero section reflows** — Wide, the composition is dense; narrow, the scale is fluid rather than stepped and the section is held at 100vh. Both states are described in the brief. Nothing important is dropped at narrow widths.

**The order behind the hero section** — Read the first screen in one pass and the offer is already clear. navigation, the headline, the announcement badge, the stats row and the background clip arrive in sequence, separated by 100vh sections and 16px spacing steps rather than by decorative dividers. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Industry | Agencies & Studios |
| Canvas size | 1526x1080 · 1.41:1 |
| Runtime | 3.9s loop |
| Prompt | 10,336 characters |
| Capture date | 2026-09-17 |
| Key colour | bright orange #FFB733 |
| Faces | Inter |
| Stack | vanilla JS |
| Motion spec | a 3.9s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names vanilla JS before you press send.
2. Stage the prompt in Studio and read it once against the 1526x1080 capture before you generate.
3. Set the brand first: product name, the #FFB733 accent and a headline that replaces the reference's.
4. Drop your product name in, then replace #FFB733 with your own accent and re-check the contrast.
5. Set your brand first: product name, the #FFB733 accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/neurolink-memorial-hero
原始 prompt：10336 字符
