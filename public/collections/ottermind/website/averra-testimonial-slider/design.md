# Averra Testimonials

> Testimonials reference for an agency or studio — React and Tailwind CSS, #EBEFE5 base, #A5E038 accent and looping video.

- 行业：Agencies & Studios（creative）
- 区块：Testimonials
- 画布：1920x1208 · 比例 1.5894 · 4.617s

## 概述

Averra Testimonials is a agency testimonials section built from one written brief, and this page documents that brief. “A truly collaborative process from start to finish. The results completely exceeded our initial expectations” is the line the layout is built to carry. The palette is white #EBEFE5 underneath, black #111111 for the type and bright lime #A5E038 carrying the accents. It ships as React and Tailwind CSS, so the whole testimonials section can be lifted into a project without a design handoff. Motion is limited to 0.04s transitions, cubic-bezier(0.22, 1, 0.36, 1) and a looping video bed. If you are briefing a agency testimonials section, start from this composition and replace the subject.

## 主标题文案

> “A truly collaborative process from start to finish. The results completely exceeded our initial expectations” — the whole testimonials section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright lime | `#A5E038` | accent |
| White | `#EBEFE5` | composition |
| Near-black | `#111111` | Headline |
| Near-black — lighter | `#181A15` | darker step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 0.04s, which is the value to keep when the palette changes.
- Accent and ground are both named (bright lime #A5E038 on white #EBEFE5), so a brand swap moves one value.
- Media is specified at 1920x1208 and a 4.6s loop, so a replacement should match the crop and the loop length.

## 布局

**A navigation bar that gets out of the way** — A short run of links and a single action sit over the testimonials section, held at 28px spacing steps and 0.04s transitions so the bar never competes with the composition behind it. The links are set below the wordmark in size, and the #A5E038 action is the only element in the bar with any weight.

**Video at the bottom layer** — The media is doing atmospheric work rather than storytelling: one 4.6s loop at 1920x1208 behind everything else. Export at 1920x1208 or wider and the cover crop keeps working.

**Navigation held to one row** — The bar sits over the 1920x1208 composition without a background of its own, so the media runs edge to edge underneath it.

**The spacing steps are quoted** — Sizes were read off the render at 1920x1208: 28px spacing steps, 0.04s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing. Spacing is quoted in the same units as the type, so the two can be compared directly.


## 动效

**Hover where it means something** — Feedback is limited to hover states on the buttons and links rather than on every card and a slider that pages through content on demand, so the rest of the layout is a fixed composition. Hover and focus are specified together, so the pointer and the keyboard get the same information.

**A loop, not a timeline** — Ambient movement comes from the 4.6s 1920x1208 loop rather than from scroll effects, which keeps the page calm and the type readable. Because it is muted, the loop can run under the copy without competing for sound or focus.


## 可替换项

- Move #A5E038 to your own hue and leave #EBEFE5 where it is; the distance between them is doing the hierarchy work.
- Keep the 1920x1208 frame when you swap the content, because the composition was solved against that ratio.
- Swap the clip for your own. Export at 1920x1208 or wider, keep it muted, and make the 4.6s loop seamless so the cut is invisible.
- Change #A5E038 for your brand accent and re-check it against #EBEFE5, because the accent is the only saturated value in this composition.

## 文案规则

**The argument this testimonials section makes** — Most agency pages add another section when the first screen is weak. This one removes options instead: navigation and the stats row, in that order, and nothing that repeats the offer. Averra Testimonials states the offer once and lets the composition repeat it rather than adding a second claim.

**Reading Averra Testimonials as a spec** — The page has more numbers in it than it appears to. 28px spacing steps, 0.04s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing are the ones a rebuild has to keep; the rest can move. Nothing in this testimonials section depends on a default.

**How Averra Testimonials sequences the first read** — The trade-off is patience: the page withholds the detail a scannable grid would hand over immediately. What it buys is a first screen where navigation and the stats row cannot be misread. A agency reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Block | Testimonials |
| Sector | Agencies & Studios |
| Canvas | 1920x1208 · 1.59:1 |
| Runtime | 4.6s loop |
| Brief | 3,584 characters |
| Date | 2026-09-17 |
| Key colour | bright lime #A5E038 |
| Reference stack | Tailwind CSS, React |
| Timing | 0.04s transitions, cubic-bezier(0.22, 1, 0.36, 1) easing and a 4.6s media loop |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the testimonials section you do not need.
2. Open the reference in Studio with the prompt staged, and read the testimonials section brief before you send it.
3. Stage the prompt in Studio and read it once against the 1920x1208 capture before you generate.
4. Set your brand first: product name, the #A5E038 accent and the headline that replaces the reference's.
5. Type the product name and the #A5E038 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/averra-testimonial-slider
原始 prompt：3584 字符
