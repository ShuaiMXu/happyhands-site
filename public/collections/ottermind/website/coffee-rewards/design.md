# Coffee Rewards

> Landing page reference for an ecommerce brand — cubic-bezier(0.16, 1, 0.3, 1) easing, glass panels, Vite and a stats row.

- 行业：Ecommerce（ecommerce）
- 区块：Landing page
- 画布：1482x1080 · 比例 1.3722 · 5.9s

## 概述

Before rebuilding a landing page for an ecommerce brand, read Coffee Rewards: the composition and the specification behind it are both here. The headline reads “Plum Parfait Latte”, and the rest of the landing page is arranged around it. The palette is deep orange #070402 underneath and #EDE4D8 for the type, set in Helvetica Now Display. Delivery is Vite — one page, no plugin, no build tooling between you and the design. The page keeps its motion to 0.7s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. If you are briefing a ecommerce landing page, start from this composition and replace the subject.

## 主标题文案

> Landing page reference built around “Plum Parfait Latte”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#180A06` | background |
| Tint | `#EDE4D8` | Headline |
| Near-black — darker | `#070402` | composition |
| Near-black — darker | `#010000` | darkest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica Now Display | Weight not fixed in the brief | UI face |
| Inter | Weight not fixed in the brief | Copy face |

## 视觉要点

- Media is specified at 1482x1080 and a 5.9s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1482x1080 and a 5.9s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1482x1080 clip, so a replacement has to work under the copy directly.

## 布局

**The spacing steps are quoted** — The layout is solved against fixed values (16px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing), which is what keeps the first screen composed at any width. Values are quoted from the captured prompt rather than inferred, so they survive a re-render.

**A clip, not an illustration** — The composition is built on top of the 1482x1080 clip rather than beside it, so the media never gets a panel or a border. The loop is short enough (5.9s) that the eye reads it as texture rather than as a timeline.

**Type sets the hierarchy** — The faces are assigned roles rather than mixed: Helvetica Now Display carries the display and the interface together. Tracking is set per size, so the display line and the caption do not share one letter-spacing value.

**Numbers instead of a claim** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the landing page from turning into a feature list. The row belongs to the first screen rather than to a separate band, which keeps the proof close to the claim.


## 动效

**Ambient motion without a scroll library** — One 5.9s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. Nothing else on the page animates continuously, so the media is the only thing asking for attention.

**State changes, timed** — The controls resolve in 0.7s, fast enough that the page answers as it is touched rather than after it. Easing is specified alongside the duration (0.7s), so a rebuild cannot quietly substitute a different feel. Do not ship the browser default.


## 可替换项

- Swap the clip for your own. Export at 1482x1080 or wider, keep it muted, and make the 5.9s loop seamless so the cut is invisible.
- Write the replacement headline first, then confirm it still fits the 1482x1080 frame at the reference's type size.
- Recut your footage to the 5.9s loop, then export at 1482x1080 so the crop the reference specifies survives.
- Load your own face beside Helvetica Now Display and compare the headline at full width before committing to the swap.

## 文案规则

**What an ecommerce brand gains here** — Compared with a template hero, the difference is what is missing. There is no card grid, no carousel and no second call to action: only the headline, the announcement badge, the stats row, the card grid and the background clip, sized against 16px spacing steps and 0.7s transitions. Coffee Rewards states the offer once and lets the composition repeat it rather than adding a second claim.

**The timing behind the landing page** — Port the motion last. The brief fixes it as 0.7s transitions, a 5.9s media loop and a live canvas, which is easier to match once the layout is in place. Nothing animates for its own sake in this landing page.

**Reading Coffee Rewards as a spec** — A rebuild usually starts with a screenshot and a guess. Here it starts with 5,054 characters of specification: the frame, the spacing and the motion are written down before the first line of code. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Vertical | Ecommerce |
| Frame | 1482x1080 · 1.37:1 |
| Runtime | 5.9s loop |
| Brief | 5,054 characters |
| Date | 2026-09-17 |
| Fonts | Helvetica Now Display, Inter |
| Tools | Vite |
| Motion | 0.7s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 5.9s media loop |

## 复刻步骤

1. Load the prompt in Studio and check that it names Vite before you press send.
2. Stage the prompt in Studio and read it once against the 1482x1080 capture before you generate.
3. Pin the reference measurements before you restyle anything: 16px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
4. Check your build against the reference measurements: 16px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
5. Keep the measurements the brief spells out: 16px spacing steps, 0.7s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.

---
来源：https://ottermind.ai/explore/website/coffee-rewards
原始 prompt：5054 字符
