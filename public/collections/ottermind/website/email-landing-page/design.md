# Email Landing Page

> Landing page reference for an AI or SaaS product — glass panels, a dark stage, #00D2FF accent and 0.3s transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：640x478 · 比例 1.3389 · 0s

## 概述

Email Landing Page was captured at 640x478 and kept as a specification rather than as a gallery image. Colour is limited to deep blue #091020 underneath, muted teal #A4F4FD for the type and bright teal #00D2FF carrying the accents, set in Inter. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. Motion is limited to 0.3s transitions and cubic-bezier(.22,1.36,1). Keep it open while you write: the 19,431-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference built on deep blue #091020 and bright teal #00D2FF, set in Inter and measured against 20px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright teal | `#00D2FF` | accent |
| Deep blue | `#091020` | composition |
| Blue | `#0B2551` | saturated |
| Muted teal | `#A4F4FD` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 400 / 500 / 600 / 700 / 800 / 900 | Headline and interface text — one face for the whole page |

## 视觉要点

- The navigation collapses at max-width 1024px and max-width 1100px, so the bar has a designed narrow state.
- Panel corners reuse the radius list in the brief (44px), so the grid needs no separate treatment.
- Accent and ground are both named (bright teal #00D2FF on deep blue #091020), so a brand swap moves one value.

## 布局

**Navigation held to one row** — Navigation is a thin strip rather than a band: wordmark left, links centre-right, one #00D2FF action, all of it sitting above the landing page without a background of its own. Below 1024px the links collapse instead of wrapping onto a second line.

**Two faces, clear jobs** — The type is Inter at the top of the scale, with the supporting copy dropped well below it so the hierarchy needs no colour to read. A face swap is safe as long as the sizes and weights stay where the brief put them.

**The composition is the content** — The composition is complete at 640x478: the copy, the media and the controls are all named in the brief. The page is one composition at 640x478, which is why it holds together when the copy changes.

**Links collapse at one width** — Labels are short enough to fit one line at 1024px, and the active item is marked with weight rather than with a pill.


## 动效

**Short, named durations** — One duration covers the interactions (0.3s on cubic-bezier(.22,1.36,1)), which is what keeps hover and press reading as one system. Easing is specified alongside the duration (0.3s), so a rebuild cannot quietly substitute a different feel.

**Pointers only where they help** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card and tabs or an accordion that swaps content in place), so the page feels responsive without turning every element into a target. Each state changes one property, which keeps the feedback legible.


## 可替换项

- Move #00D2FF to your own hue and leave #091020 where it is; the distance between them is doing the hierarchy work.
- Keep the 640x478 frame when you swap the content, because the composition was solved against that ratio.
- Replace the copy in the Inter stack first, then re-check the #00D2FF accent against the media behind it.
- Set 0.3s to your own build speed and check that cubic-bezier(.22,1.36,1) still lands the copy before the media starts.

## 文案规则

**How the landing page reflows** — The desktop composition is solved against 640x478, and the narrow layout is designed rather than inherited: the layout shifts at 1024px. Motion has a reduced-motion branch, and the media carries a poster frame so the page still communicates when autoplay is unavailable. Width changes the measurements, not the reading path.

**What to change first in Email Landing Page** — Suppose you only have one afternoon. Change the headline and the action label, leave a 3-column grid and 44px corners alone, and you have a page that looks intentional. Keep the frame and the scale; the subject is the part that should change.

**The order behind the landing page** — Compare the top of this page with a typical SaaS landing screen. Both carry a headline and an action; here navigation, the headline, the announcement badge, the stats row and the client row sit in a fixed order instead of competing at the same weight. Each element has one job, and the accent is spent only on the element you are meant to press.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Category | AI & SaaS |
| Viewport | 640x478 · 1.34:1 |
| Prompt text | 19,431 characters |
| Date | 2026-09-17 |
| Accent tone | bright teal #00D2FF |
| Typefaces | Inter |
| Tech stack | Tailwind CSS, React, TypeScript |
| Transitions | 0.3s transitions and cubic-bezier(.22,1.36,1) easing |

## 复刻步骤

1. Set the brand first: product name, the #00D2FF accent and a headline that replaces the reference's.
2. Drop your product name in, then replace #00D2FF with your own accent and re-check the contrast.
3. Type the product name and the #00D2FF accent before you touch the layout.
4. Set your brand first: product name, the #00D2FF accent and the headline that replaces the reference's.
5. Keep the measurements the brief spells out: a 3-column grid, 44px corners and 20px spacing steps.

---
来源：https://ottermind.ai/explore/website/email-landing-page
原始 prompt：19431 字符
