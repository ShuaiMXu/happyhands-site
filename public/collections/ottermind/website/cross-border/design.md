# Cross-Border

> Landing page reference for an industrial company — 0.6s transitions, React and Tailwind CSS, fluid type and Helvetica, Arial.

- 行业：Industrial（industrial）
- 区块：Landing page
- 画布：1440x1080 · 比例 1.3333 · 5.833s

## 概述

Cross-Border keeps its decision trail: the brief that produced this landing page runs 6,698 characters. “Complete the form and our team will contact you soon” is the line the layout is built to carry. The palette runs bright yellow #FFDA00 underneath, black #1A1A1A for the type and deep teal #002A35 carrying the accents, and the type is Helvetica, Arial. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion is confined to 0.6s transitions and a looping video bed. It is the right reference for an industrial company landing page that has to look deliberate on the first screen.

## 主标题文案

> “Complete the form and our team will contact you soon” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright yellow | `#FFDA00` | composition |
| Near-black | `#1A1A1A` | Headline |
| Deep blue | `#0A1F2B` | darker step |
| Deep teal | `#002A35` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- The clip is one asset at 1440x1080 and a 5.8s loop, so the composition has a single media dependency.
- Media is specified at 1440x1080 and a 5.8s loop, so a replacement should match the crop and the loop length.
- Accent use is limited to deep teal #002A35; everything else sits on bright yellow #FFDA00.

## 布局

**Top row: wordmark, links, one action** — The top row holds the wordmark, four to five links and a single action tinted #002A35, sized to stay quiet against the rest of the page. A mobile overlay takes over below the tablet breakpoint. The links are set below the wordmark in size, and the #002A35 action is the only element in the bar with any weight.

**Every measurement is written down** — The layout is solved against fixed values (12vh sections, 20px spacing steps and 0.6s transitions), which is what keeps the first screen composed at any width. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**One clip does the work** — The 1440x1080 frame is filled by a single loop that plays behind the copy and asks for no controls. A poster frame at 1440x1080 holds the composition when autoplay is unavailable, so the layout never collapses.

**The type carries the tone** — Type is the styling system here: Helvetica, Arial at the display size, the same face across the interface, and no second accent colour doing the work. The face is paired with fixed sizes, which is what keeps the display line and the interface text related.


## 动效

**Ambient motion without a scroll library** — One 5.8s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is muted and inline, so the first frame is available without an interaction.

**Fast enough to feel deliberate** — Every state change in the specification has a duration attached: transitions settle around 0.6s. Nothing is left at the browser default, which is why the page feels authored rather than animated. Easing is specified alongside the duration (0.6s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Check #002A35 against the copy size in Helvetica, Arial before you swap either, because the accent only reads on a large line.
- Move #002A35 to your own hue and leave #FFDA00 where it is; the distance between them is doing the hierarchy work.
- Keep 1440x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1440x1080 frame.

## 文案规则

**The argument this landing page makes** — Cross-Border is the landing page reference for an industrial company, and it answers the problem that audience actually has. The page says it out loud: “Complete the form and our team will contact you soon”. The palette stays disciplined (bright yellow #FFDA00 and deep teal #002A35) and the type is set in Helvetica, Arial, so nothing in the composition depends on a borrowed trend. When you brief a build, this is the part worth copying: one promise at display size, with the supporting detail held below it. Cross-Border states the offer once and lets the composition repeat it rather than adding a second claim.

**The numbers behind the landing page** — The brief is a specification. It states 12vh sections, 20px spacing steps and 0.6s transitions, and it names the media frame at 1440x1080 before anything is designed around it. Nothing in this landing page depends on a default.

**What moves in Cross-Border** — Motion here is a set of decisions, not a library: 0.6s transitions, a 5.8s media loop and hover and press states, and nothing animates on scroll. The result is a page that feels authored: short durations, one entrance, and state changes that confirm an action rather than decorate it. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Industry | Industrial |
| Format | 1440x1080 · 1.33:1 |
| Runtime | 5.8s loop |
| Brief | 6,698 characters |
| Captured | 2026-09-17 |
| Key tone | deep teal #002A35 |
| Type scale | Helvetica, Arial |
| Tools | Tailwind CSS, React, TypeScript |
| Timing | 0.6s transitions and a 5.8s media loop |

## 复刻步骤

1. Drop your product name in, then replace #002A35 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #002A35 accent and a headline that replaces the reference's.
3. Type the product name and the #002A35 accent before you touch the layout.
4. Set your brand first: product name, the #002A35 accent and the headline that replaces the reference's.
5. Copy 12vh sections, 20px spacing steps and 0.6s transitions into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/cross-border
原始 prompt：6698 字符
