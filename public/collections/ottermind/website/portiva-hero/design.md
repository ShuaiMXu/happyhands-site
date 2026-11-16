# Portiva Hero

> Hero section reference for an agency or studio — Inter, #C25E2E accent, glass panels and a word-by-word headline.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1466x1080 · 比例 1.3574 · 4.5s

## 概述

Portiva Hero shows one way to build the hero section for an agency or studio, and publishes the instructions that produced it. “Less complexity, more impact in every project” is the line the layout is built to carry. Colour is limited to teal #087573 underneath, white #D1E5E7 for the type and orange #C25E2E carrying the accents, set in Inter. It ships as one self-contained HTML file, so the whole hero section can be lifted into a project without a design handoff. Motion is confined to 120ms transitions and a looping video bed. Use it as the reference when you are building an agency or studio hero section and want a finished composition instead of a starting point.

## 主标题文案

> “Less complexity, more impact in every project” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Orange | `#C25E2E` | accent |
| Deep teal | `#032223` | darkest |
| White | `#D1E5E7` | Headline |
| Teal | `#087573` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1466x1080 and a 4.5s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1466x1080 and a 4.5s loop, so the composition has a single media dependency.
- The timing budget is state feedback rather than page choreography (120ms), so a slower rebuild reads as a different design.

## 布局

**Navigation without a background** — Wordmark, links and the #C25E2E action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #C25E2E action is the only element in the bar with any weight.

**The sizes are in the brief, not in a scale** — Nothing in the layout is left to feel: the brief quotes 62px spacing steps and 120ms transitions and the build has to hit those values. A rebuild that hits those numbers looks like the reference without further tuning.

**Full-frame video, no panel** — The media is doing atmospheric work rather than storytelling: one 4.5s loop at 1466x1080 behind everything else. Export at 1466x1080 or wider and the cover crop keeps working. Export at 1466x1080 or wider to keep the crop honest.

**Two faces, clear jobs** — Typography is Inter, and the brief assigns the face a job rather than mixing for variety. Weight, tracking and size steps are all specified, so the hierarchy survives a substitution. A face swap is safe as long as the sizes and weights stay where the brief put them.


## 动效

**One duration for the controls** — Motion is measured in milliseconds here: 120ms. That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. One value is reused across the controls, so their timing cannot drift apart. Fast state changes, no scroll timelines.

**A loop, not a timeline** — One 4.5s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is muted and inline, so the first frame is available without an interaction.


## 可替换项

- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1466x1080 frame.
- Swap the clip for your own. Export at 1466x1080 or wider, keep it muted, and make the 4.5s loop seamless so the cut is invisible.
- Write the replacement headline first, then confirm it still fits the 1466x1080 frame at the reference's type size.
- Replace #C25E2E last, after the copy is final, and test it against #087573 at the smallest text size on the page.

## 文案规则

**The order behind the hero section** — Read it in order: navigation, the announcement badge, the card grid and the background clip. Each element has one job, and the orange #C25E2E accent is spent only on the element you are meant to press. A agency reader gets the offer before the options.

**Reading Portiva Hero as a spec** — When a rebuild drifts, the spacing goes first. Portiva Hero avoids that by publishing 62px spacing steps and 120ms transitions with the composition. Nothing in this hero section depends on a default.

**How the hero section reflows** — The hero section is composed at 1466x1080 and then re-composed for narrow widths. the navigation collapses into a mobile menu, so the phone version is a decision rather than a squeeze. The reflow keeps the action reachable at every width.


## 规格

| 项 | 值 |
|---|---|
| Section | Hero section |
| Industry | Agencies & Studios |
| Frame | 1466x1080 · 1.36:1 |
| Loop | 4.5s loop |
| Input brief | 2,639 characters |
| Archived | 2026-09-17 |
| Accent hex | orange #C25E2E |
| Type scale | Inter |
| Tech stack | Tailwind CSS, vanilla JS, single HTML file |
| Timing | 120ms transitions and a 4.5s media loop |

## 复刻步骤

1. Type the product name and the #C25E2E accent before you touch the layout.
2. Set the brand first: product name, the #C25E2E accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #C25E2E with your own accent and re-check the contrast.
4. Set your brand first: product name, the #C25E2E accent and the headline that replaces the reference's.
5. Check your build against the reference measurements: 62px spacing steps and 120ms transitions.

---
来源：https://ottermind.ai/explore/website/portiva-hero
原始 prompt：2639 字符
