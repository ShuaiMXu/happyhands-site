# Lumina

> Hero section reference for an agency or studio — glass panels, a stats row, #EC4899 base and a moving marquee.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：1920x1380 · 比例 1.3913 · 5.967s

## 概述

Lumina solves the hero section problem for an agency or studio with a single captured brief. The palette is red #EC4899 underneath and bright blue #3B82F6 carrying the accents. It ships as a single component, so the whole hero section can be lifted into a project without a design handoff. The page keeps its motion to a looping video bed. If you are briefing a agency hero section, start from this composition and replace the subject.

## 主标题文案

> Hero section reference for an agency or studio, captured at 2056x1478 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright blue | `#3B82F6` | accent |
| Indigo | `#A855F7` | saturated |
| Red | `#EC4899` | composition |
| Orange | `#F8A170` | lighter |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Accent and ground are both named (bright blue #3B82F6 on red #EC4899), so a brand swap moves one value.
- Media is specified at 2056x1478 and a 6s loop, so a replacement should match the crop and the loop length.
- The accent is spent on bright blue #3B82F6 and the rest of the composition holds red #EC4899.

## 布局

**Navigation without a background** — Wordmark, links and the #3B82F6 action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #3B82F6 action is the only element in the bar with any weight.

**Values you can check** — Sizes were read off the render at 2056x1478: 70px spacing steps. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.

**The bar shares the page grid** — The bar sits over the 2056x1478 composition without a background of its own, so the media runs edge to edge underneath it.

**Every measurement is written down** — Spacing is quoted the same way (70px spacing steps), not as a scale that grows on its own.


## 动效

**Interaction kept local** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Press states are specified as well as hover, so a tap gives the same confirmation as a click. Fewer states, fully specified.

**Ambient motion without a scroll library** — One 6s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is muted and inline, so the first frame is available without an interaction.


## 可替换项

- Swap the clip for your own. Export at 2056x1478 or wider, keep it muted, and make the 6s loop seamless so the cut is invisible.
- Change #3B82F6 for your brand accent and re-check it against #EC4899, because the accent is the only saturated value in this composition.
- Change the copy first, then the accent, then the media: the 2056x1478 frame was solved in that order and reversing it costs a re-layout.

## 文案规则

**The numbers behind the hero section** — The cost of a fixed scale is less room to improvise. 70px spacing steps keep the composition coherent, but a new element has to be fitted rather than placed. Nothing in this hero section depends on a default.

**The timing behind the hero section** — Compare the motion here with a scroll-driven page. Both move; this one moves where the brief says (hover and press states, a 6s media loop and a looping marquee), so the copy stays in front. Nothing animates for its own sake in this hero section.

**Making the hero section yours** — Most people start with the accent colour. Start with the promise instead: rewrite the display line, then re-test bright blue #3B82F6 against your own media. The composition is the reusable part, and it survives a different brand.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Vertical | Agencies & Studios |
| Frame | 2056x1478 · 1.39:1 |
| Runtime | 6s loop |
| Brief | 2,677 characters |
| Date | 2026-09-17 |
| Accent | bright blue #3B82F6 |
| Animation | a 6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 2056x1478 capture before you generate.
2. Set the brand first: product name, the #3B82F6 accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #3B82F6 accent and the headline that replaces the reference's.
4. Type the product name and the #3B82F6 accent before you touch the layout.
5. Drop your product name in, then replace #3B82F6 with your own accent and re-check the contrast.

---
来源：https://ottermind.ai/explore/website/lumina-hero
原始 prompt：2677 字符
