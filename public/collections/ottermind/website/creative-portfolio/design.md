# Creative Portfolio

> Portfolio reference for an agency or studio — Figtree, React and Tailwind CSS, #309ADA accent and fluid type.

- 行业：Agencies & Studios（creative）
- 区块：Portfolio
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

This is the portfolio page from Creative Portfolio, published with the brief that produced it rather than as a screenshot. It leads with “I craft bold brands and modern websites with purpose” and gives that line the frame rather than shrinking it into a card. The palette is deep green #181B17 underneath, white #DED9CF for the type and bright blue #309ADA carrying the accents, set in Figtree. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion is confined to 1200ms transitions and cubic-bezier(0.16, 1, 0.3, 1). Use it as the reference when you are building an agency or studio portfolio page and want a finished composition instead of a starting point.

## 主标题文案

> Portfolio reference built around “I craft bold brands and modern websites with purpose”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted magenta | `#F598F2` | lighter |
| Near-black | `#181B17` | composition |
| White | `#DED9CF` | Headline |
| Bright blue | `#309ADA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Figtree | 28–200px | Headline and interface text — one face for the whole page |

## 视觉要点

- Font roles are assigned rather than mixed here, and 28–200px is the range the whole scale works in.
- The accent is spent on bright blue #309ADA and the rest of the composition holds deep green #181B17.
- Transitions are specified at 1200ms, short enough that the page never feels like it is waiting for an animation.

## 布局

**A navigation bar that gets out of the way** — Links sit on one line at a single size, and the #309ADA action closes the row on the right so the eye finishes where the navigation ends. The links are set below the wordmark in size, and the #309ADA action is the only element in the bar with any weight. The bar is a handful of elements, so it rebuilds without a component library.

**One scale for type and frame** — Nothing here is eyeballed. The spec fixes type from 28px to 200px, 80px spacing steps, 1200ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing, and the rest of the layout derives from those values. The list is short enough that a reviewer can check it element by element.

**Copy first, decoration second** — The portfolio page is built so the copy lands before anything else: the type carries the hierarchy, the 640x468 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x468, which is why it holds together when the copy changes.

**Top row, one action** — Test the bar over your own media before giving it a background. The reference was captured at 640x468.


## 动效

**Text arrives in pieces** — The entrance gives the page its arrival, and the composition is unchanged once it has run: sections reveal as they enter the viewport. Under reduced motion the element simply appears and the layout is unchanged. If the copy changes length, the entrance still reads because it works per line.

**The page answers the scroll** — Content is tied to scroll position (sections reveal as they enter the viewport), so the composition changes as the reader moves rather than animating on a timer. The composition does not depend on the effect firing, so a fast scroll past it costs nothing. Test it with reduced motion on.


## 可替换项

- Retime the entrance to taste. 1200ms with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Swap Figtree for a face with the same x-height and cap height, then re-measure the headline block.
- Replace #309ADA last, after the copy is final, and test it against #181B17 at the smallest text size on the page.
- Change the copy before the colour: rewrite the Figtree paragraphs first, then check #309ADA against the media behind them.

## 文案规则

**The order behind the portfolio page** — Nothing here competes with the first decision. The page says it out loud: “I craft bold brands and modern websites with purpose”. The supporting material waits below the fold, and navigation, the stats row and the background clip carry the top of the page alone. A agency reader gets the offer before the options.

**Making the portfolio page yours** — Start with the promise, not the decoration. Rewrite “I craft bold brands and modern websites with purpose” as one sentence that names what you do, then set it in Figtree at the display size the brief uses. Replace bright blue #309ADA with your own accent and check it against deep green #181B17 before you touch anything else. Keep the media crop; it is doing as much work as the type.

**Reading Creative Portfolio as a spec** — You cannot fix a composition by eye when two people are rebuilding it. The brief removes the argument: type from 28px to 200px, 80px spacing steps, 1200ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing, stated once. Nothing in this portfolio page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page part | Portfolio |
| Field | Agencies & Studios |
| Canvas size | 640x468 · 1.37:1 |
| Prompt | 5,639 characters |
| Saved | 2026-09-17 |
| Accent hex | bright blue #309ADA |
| Typefaces | Figtree · 28–200px |
| Tech stack | Tailwind CSS, React, Vite |
| Animation | 1200ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing |

## 复刻步骤

1. Set the brand first: product name, the #309ADA accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #309ADA with your own accent and re-check the contrast.
3. Type the product name and the #309ADA accent before you touch the layout.
4. Set your brand first: product name, the #309ADA accent and the headline that replaces the reference's.
5. Keep the measurements the brief spells out: type from 28px to 200px, 80px spacing steps and 1200ms transitions.

---
来源：https://ottermind.ai/explore/website/creative-portfolio
原始 prompt：5639 字符
