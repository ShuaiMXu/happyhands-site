# Orbis NFT

> Landing page reference for a fintech product — #6FFF00 accent, Anton, a dark stage and #010828 base.

- 行业：Fintech（fintech）
- 区块：Landing page
- 画布：452x800 · 比例 0.565 · 9.1s

## 概述

Orbis NFT is the landing page reference for a fintech product, and the brief behind it is a full build spec rather than a mood board. The palette is deep blue #010828 underneath, white #EFF4FF for the type and bright lime #6FFF00 carrying the accents, set in Anton. Delivery is React and Tailwind CSS, captured at 452x800 so the frame is fixed before any code is written. Treat it as the brief for a fintech product landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference built on deep blue #010828 and bright lime #6FFF00, set in Anton and measured against 32px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep blue | `#010828` | composition |
| White | `#EFF4FF` | Headline |
| Bright lime | `#6FFF00` | accent |
| Bright indigo | `#B724FF` | lighter |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Anton | Weight not fixed in the brief | UI text |
| Condiment | Weight not fixed in the brief | Body face |

## 视觉要点

- Accent use is limited to bright lime #6FFF00; everything else sits on deep blue #010828.
- The accent is spent on bright lime #6FFF00 and the rest of the composition holds deep blue #010828.
- Accent and ground are both named (bright lime #6FFF00 on deep blue #010828), so a brand swap moves one value.

## 布局

**Links collapse at one width** — Wordmark, links and the #6FFF00 action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #6FFF00 action is the only element in the bar with any weight.

**Sizes fixed in the brief** — The layout is solved against fixed values (32px spacing steps), which is what keeps the first screen composed at any width. Values are quoted from the captured prompt rather than inferred, so they survive a re-render.

**A grid, not a text run** — The grid is the structure: panels of the same size, set in Anton, arranged so the eye moves across rather than down. Panel order is the reading order, so nothing depends on position cues. Let the panel count follow the copy.

**The composition is the content** — The composition is complete at 452x800: the copy, the media and the controls are all named in the brief. The page is one composition at 452x800, which is why it holds together when the copy changes.


## 动效

**Pointer states, nothing more** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. The states are drawn from the page's own palette rather than from a component default.

**Almost no motion** — There is no scroll library here: the 452x800 composition holds still and only the elements that respond to you move. There is no animation library in the brief, which keeps the rebuild small. Stillness is a valid choice.


## 可替换项

- Keep Anton or pick a face with the same proportions; the size scale is set for those widths, not for a substitute.
- Retune #6FFF00 for your brand only after the Anton copy is final, and re-check the contrast on the darkest band.
- Swap #6FFF00 for your brand colour and re-check it against #010828, since the accent is the only place saturation is allowed.
- Replace #6FFF00 last, after the copy is final, and test it against #010828 at the smallest text size on the page.

## 文案规则

**The argument this landing page makes** — You could rebuild this as a stack of separate cards and lose only the argument. The landing page reads as one decision instead: navigation, the stats row, the card grid and the background clip in a single sequence. It gives a fintech reader the shortest honest route to the offer.

**The order behind the landing page** — Order is the design here. navigation, the stats row, the card grid and the background clip are placed so the offer lands before the proof, and 32px spacing steps set the gap between them. A fintech reader gets the offer before the options.

**Making the landing page yours** — A template asks you to accept its layout; this reference asks you to keep it and change everything inside. The difference is that 32px spacing steps stay fixed while the subject moves. Rewrite the display line before you touch the colour.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Sector | Fintech |
| Frame | 452x800 · 0.56:1 |
| Input brief | 8,276 characters |
| Date | 2026-09-17 |
| Accent tone | bright lime #6FFF00 |
| Fonts | Anton, Condiment |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 452x800 capture before you generate.
2. Drop your product name in, then replace #6FFF00 with your own accent and re-check the contrast.
3. Set the brand first: product name, the #6FFF00 accent and a headline that replaces the reference's.
4. Set your brand first: product name, the #6FFF00 accent and the headline that replaces the reference's.
5. Type the product name and the #6FFF00 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/orbis-nft-landing
原始 prompt：8276 字符
