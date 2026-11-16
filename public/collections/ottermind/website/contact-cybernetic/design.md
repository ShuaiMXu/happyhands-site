# Contact Cybernetic

> Hero section reference for an AI or SaaS product — 1s transitions, a 640x458 frame, a stats row and Inter.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：640x458 · 比例 1.3974 · 0s

## 概述

Contact Cybernetic solves the hero section problem for an AI or SaaS product with a single captured brief. The page's own headline reads “). Inside, display an acknowledgment banner reading”, and the composition is built around those exact words. The palette is white #F1F3F1 underneath and deep green #1C2E1E for the type, set in Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion comes down to 1s transitions. Keep it open while you write: the 6,423-character brief is the part that transfers to your own page.

## 主标题文案

> “). Inside, display an acknowledgment banner reading” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep green | `#1C2E1E` | Headline |
| White | `#F1F3F1` | composition |
| White — darker | `#EAECE9` | panel edges |
| Gray | `#5A635A` | darker step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 21–76px | Headline and interface text — one face for the whole page |

## 视觉要点

- The timing budget is state feedback rather than page choreography (1s), so a slower rebuild reads as a different design.
- Font roles are assigned rather than mixed here, and 21–76px is the range the whole scale works in.
- The type is set in Inter on a 21–76px scale, and the spacing follows the same steps.

## 布局

**The nav is deliberately thin** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 640x458 composition without a background of its own, so the media runs edge to edge underneath it. Test the bar over your own media before giving it a background.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition. Keep it above the headline, never beside it.

**Top row, one action** — One action per bar. The reference was captured at 640x458.

**The brief names the steps** — Sizes were read off the render at 640x458: type from 21px to 76px, 23px spacing steps and 1s transitions. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.


## 动效

**A small interactive surface** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. Interactive targets are large enough to tap and the pointer treatment is consistent across them. If a state does not confirm an action, drop it.

**The whole animation budget** — The animation budget is small and explicit: 1s, applied to state changes rather than to entrances. Easing is specified alongside the duration (1s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Keep 640x458 for the media and re-crop your own asset into it rather than resizing the frame.
- Rewrite “). Inside, display an acknowledgment banner reading” to the same line count; the mask reveals each line in turn.
- Replace “). Inside, display an acknowledgment banner reading” with your own line and keep the word count, because the entrance is timed per line.
- Write the replacement headline first, then confirm it still fits the 640x458 frame at the reference's type size.

## 文案规则

**How the hero section reflows** — Compared with a mobile layout that hides sections, this one keeps them and changes their shape: the navigation collapses into a mobile menu. The mobile version is a decision, not a fallback.

**The order behind the hero section** — When a SaaS reader lands on a single screen, they scan before they read. The layout answers that: navigation, the headline, the announcement badge, the stats row and the background clip are sized to be scanned, with type from 21px to 76px and 23px spacing steps keeping each stop distinct. A SaaS reader gets the offer before the options.

**Reading Contact Cybernetic as a spec** — The page has more numbers in it than it appears to. type from 21px to 76px, 23px spacing steps and 1s transitions are the ones a rebuild has to keep; the rest can move. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Vertical | AI & SaaS |
| Canvas | 640x458 · 1.4:1 |
| Source text | 6,423 characters |
| Archived | 2026-09-17 |
| Typefaces | Inter · 21–76px |
| Built with | Tailwind CSS, React, Framer Motion |
| Animation | 1s transitions |

## 复刻步骤

1. Check your build against the reference measurements: type from 21px to 76px, 23px spacing steps and 1s transitions.
2. Copy type from 21px to 76px, 23px spacing steps and 1s transitions into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: type from 21px to 76px, 23px spacing steps and 1s transitions.
4. Keep the measurements the brief spells out: type from 21px to 76px, 23px spacing steps and 1s transitions.
5. Add the entrance first at 1s, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/contact-cybernetic
原始 prompt：6423 字符
