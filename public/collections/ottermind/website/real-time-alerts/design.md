# Real-Time Alerts

> Sign-in flow reference for an AI or SaaS product — one self-contained HTML file, fluid type and max-width 370px and max-width 500px breakpoints.

- 行业：AI & SaaS（ai-saas）
- 区块：Sign-in flow
- 画布：1738x1080 · 比例 1.6093 · 4.867s

## 概述

Real-Time Alerts solves the sign-in screen problem for an AI or SaaS product with a single captured brief. The headline reads “Built for fast-moving teams”, and the rest of the sign-in screen is arranged around it. Colour is limited to neutral #797979 underneath and shade #2F2A27 for the type, set in Eloquia. It ships as one self-contained HTML file, so the whole sign-in screen can be lifted into a project without a design handoff. The brief spends its motion budget on 3500ms transitions, cubic-bezier(.2.7.3,1) and a looping video bed. Start from the captured brief, then edit the sign-in screen rather than rebuilding it from scratch.

## 主标题文案

> “Built for fast-moving teams” — the whole sign-in flow is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Shade | `#2C3343` | darker step |
| Neutral | `#797979` | composition |
| Shade — darker | `#2F2A27` | Headline |
| Shade — lighter | `#606060` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Eloquia | 16px | Headline and interface text — one face for the whole page |

## 视觉要点

- The layout shifts at max-width 370px and max-width 500px, so the narrow composition is designed rather than inherited.
- Media is specified at 1738x1080 and a 4.9s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1738x1080 clip, so a replacement has to work under the copy directly.

## 布局

**Measured against the viewport** — Every measurement in the brief is a number you can measure back: a fixed 16px display size, 100vh sections, 26px corners and 10px spacing steps. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.

**One clip does the work** — The composition is built on top of the 1738x1080 clip rather than beside it, so the media never gets a panel or a border. The loop is short enough (4.9s) that the eye reads it as texture rather than as a timeline.

**Sign-up as the composition** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. Error and focus states are specified rather than left to the browser. One column, one action.

**Numbers instead of a claim** — The numbers row is the proof: three or four figures on one line, small labels under each, kept in the same Eloquia as the interface so it reads as data rather than decoration. The label step is quoted in the brief, so it stays below the figures after a substitution.


## 动效

**Fast enough to feel deliberate** — Transitions are specified at 3500ms using cubic-bezier(.2.7.3,1), which is the timing the controls are held to. The same duration is reused across controls, which keeps the interactions feeling like one system. Carry the durations into your build.

**A marquee carries the rhythm** — A marquee runs through the composition on an endless loop, set in Eloquia. It is the only continuous motion outside the media, which keeps the page from feeling restless.


## 可替换项

- Keep 1738x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace “Built for fast-moving teams” with your own line and keep the word count, because the entrance is timed per line.
- Draft the new copy to the 1738x1080 frame, then check that the entrance still lands on the same number of lines.
- Swap the clip for your own. Export at 1738x1080 or wider, keep it muted, and make the 4.9s loop seamless so the cut is invisible.

## 文案规则

**The order behind the sign-in screen** — Nothing here competes with the first decision. The page says it out loud: “Built for fast-moving teams”. The supporting material waits below the fold, and the headline, the announcement badge, the stats row, the card grid and the form carry the top of the page alone. A SaaS reader gets the offer before the options.

**Making the sign-in screen yours** — A template asks you to accept its layout; this reference asks you to keep it and change everything inside. The difference is that a fixed 16px display size, 100vh sections, 26px corners, 10px spacing steps and 3500ms transitions stay fixed while the subject moves. A different brand can reuse the whole frame.

**The numbers behind the sign-in screen** — If you are handing this to a developer, the brief is the useful artefact. It states a fixed 16px display size, 100vh sections, 26px corners, 10px spacing steps and 3500ms transitions and leaves nothing for the two of you to interpret. Nothing in this sign-in screen depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Screen | Sign-in flow |
| Vertical | AI & SaaS |
| Canvas | 1738x1080 · 1.61:1 |
| Runtime | 4.9s loop |
| Source text | 21,771 characters |
| Date | 2026-09-17 |
| Typefaces | Eloquia · 16px |
| Tech stack | vanilla JS, single HTML file |
| Transitions | 3500ms transitions, cubic-bezier(.2.7.3,1) easing and a 4.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1738x1080 capture before you generate.
2. Pin the reference measurements before you restyle anything: a fixed 16px display size, 100vh sections and 26px corners.
3. Copy a fixed 16px display size, 100vh sections and 26px corners into your own brief before you rewrite anything else.
4. Check your build against the reference measurements: a fixed 16px display size, 100vh sections and 26px corners.
5. Keep the measurements the brief spells out: a fixed 16px display size, 100vh sections and 26px corners.

---
来源：https://ottermind.ai/explore/website/real-time-alerts
原始 prompt：21771 字符
