# Celestial Renewal

> Landing page reference for a health or wellbeing product — a dark stage, glass panels, React and Tailwind CSS and #010A17 base.

- 行业：Health（health）
- 区块：Landing page
- 画布：1464x1080 · 比例 1.3556 · 5.9s

## 概述

Celestial Renewal is the landing page reference for a health or wellbeing product, and the brief behind it is a full build spec rather than a mood board. “Expert beauty and holistic wellness, delivered with warmth and intention” is the line the layout is built to carry. The palette is deep blue #010A17 underneath and blue #0A4267 carrying the accents, set in Instrument Serif. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The brief spends its motion budget on 75ms transitions, cubic-bezier(0.22,1,0.36,1) and a looping video bed. Keep it open while you write: the 7,343-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built around “Expert beauty and holistic wellness, delivered with warmth and intention”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0A0608` | darkest |
| Near-black — lighter | `#0A0A0C` | panel edges |
| Near-black — lighter | `#010A17` | composition |
| Blue | `#0A4267` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Instrument Serif | 400 / 500 / 600 / 700 | Display and headline — the editorial voice of the page |
| Inter | 400 / 500 / 600 / 700 | Body face |
| Dancing Script | 400 / 500 / 600 / 700 | Fallback and supporting interface text |

## 视觉要点

- Transitions are specified at 75ms, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 75ms, which is the value to keep when the palette changes.
- Accent use is limited to blue #0A4267; everything else sits on deep blue #010A17.

## 布局

**Navigation held to one row** — The top row holds the wordmark, four to five links and a single action tinted #0A4267, sized to stay quiet against the rest of the page. A mobile overlay takes over below the tablet breakpoint. The links are set below the wordmark in size, and the #0A4267 action is the only element in the bar with any weight. Test the bar over your own media before giving it a background.

**Numbers carried into the build** — The brief fixes type from 36px to 110px, 40px spacing steps, 75ms transitions and cubic-bezier(0.22,1,0.36,1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**Full-frame video, no panel** — The brief specifies the video at 1464x1080 with a loop of 5.9s, and every text element is placed against that frame. Export at 1464x1080 or wider and the cover crop keeps working.

**A navigation bar that gets out of the way** — Keep the link count to four or five; the row is sized for that. The reference was captured at 1464x1080.


## 动效

**Short, named durations** — Every state change in the specification has a duration attached: transitions settle around 75ms on cubic-bezier(0.22,1,0.36,1). Nothing is left at the browser default, which is why the page feels authored rather than animated. Because the values are short, a rebuild that slows them down is immediately visible.

**Rendered, not illustrated** — Runtime rendering is the design decision here (a WebGL canvas), and the layout is built to leave it room. The scene responds to the viewport instead of sitting behind it as an image. Keep the interface flat around it.


## 可替换项

- Change #0A4267 for your brand accent and re-check it against #010A17, because the accent is the only saturated value in this composition.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1464x1080 frame.
- Retint #0A4267 toward your palette but keep the step against #010A17; flatten the two and the primary action stops reading.
- Retime the entrance to taste. 75ms with cubic-bezier(0.22,1,0.36,1) is what the reference uses.

## 文案规则

**The argument this landing page makes** — If your first screen currently explains three things, this is the version that explains one. navigation, the announcement badge, the stats row, the feature list and the background clip are staged in reading order, with type from 36px to 110px and 40px spacing steps setting the rhythm. It gives a health reader the shortest honest route to the offer.

**How Celestial Renewal sequences the first read** — A feature-led layout lists what the product does; this one routes the reader to a single decision. The route is visible in navigation, the announcement badge, the stats row, the feature list and the background clip and in how type from 36px to 110px and 40px spacing steps space them. A health reader gets the offer before the options.

**How the landing page reflows** — There is no separate mobile design to maintain. the type is clamped between 36px and 110px and the navigation collapses into a mobile menu, and the same hierarchy carries across. The mobile version is a decision, not a fallback.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Category | Health |
| Format | 1464x1080 · 1.36:1 |
| Runtime | 5.9s loop |
| Brief | 7,343 characters |
| Date | 2026-09-17 |
| Key tone | blue #0A4267 |
| Faces | Instrument Serif, Inter, Dancing Script · 36–110px |
| Built with | Tailwind CSS, React, TypeScript |
| Transitions | 75ms transitions, cubic-bezier(0.22,1,0.36,1) easing and a 5.9s media loop |

## 复刻步骤

1. Set the brand first: product name, the #0A4267 accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #0A4267 with your own accent and re-check the contrast.
3. Set your brand first: product name, the #0A4267 accent and the headline that replaces the reference's.
4. Type the product name and the #0A4267 accent before you touch the layout.
5. Check your build against the reference measurements: type from 36px to 110px, 40px spacing steps and 75ms transitions.

---
来源：https://ottermind.ai/explore/website/celestial-renewal
原始 prompt：7343 字符
