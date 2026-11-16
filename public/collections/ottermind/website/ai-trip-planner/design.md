# AI Trip Planner

> Pricing section reference for a travel brand — looping video, max-width 760px breakpoints, Geist and a dark stage.

- 行业：Travel（travel）
- 区块：Pricing section
- 画布：1470x1080 · 比例 1.3611 · 5.966s

## 概述

AI Trip Planner solves the pricing section problem for a travel brand with a single captured brief. The headline reads “Where will you go next?”, and the rest of the pricing section is arranged around it. The colour scheme is white #FAFAFA underneath and black #0A0A0A for the type, and the page is set in Geist. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The page keeps its motion to a looping video bed. Take it on when the pricing section needs a decided order before any new sections are added.

## 主标题文案

> Pricing section reference built around “Where will you go next?”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FAFAFA` | composition |
| Near-black | `#0A0A0A` | Headline |
| Near-black — lighter | `#1A1A1A` | darker step |
| Gray | `#767676` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Geist | 15–40px | UI text |
| Special Elite | 15–40px | Copy face |

## 视觉要点

- The layout shifts at max-width 760px, so the narrow composition is designed rather than inherited.
- Font roles are assigned rather than mixed here, and 15–40px is the range the whole scale works in.
- The navigation collapses at max-width 760px, so the bar has a designed narrow state.

## 布局

**The nav is deliberately thin** — A short run of links and a single action sit over the pricing section, held at type from 15px to 40px and 15px spacing steps so the bar never competes with the composition behind it. Below 760px the links collapse instead of wrapping onto a second line.

**The video is the background, not a panel** — Video sits on the bottom layer of the 1470x1080 composition, with the type arranged above it and nothing in between. A poster frame at 1470x1080 holds the composition when autoplay is unavailable, so the layout never collapses. Export at 1470x1080 or wider to keep the crop honest.

**The announcement pill** — One badge, one message: the pill sits above the headline in Geist at the smallest step, and nothing else competes for that slot. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title.

**The form is the whole first screen** — There is one decision to make here: fill the form or leave. Everything else on the screen supports that decision. Error and focus states are specified rather than left to the browser. Specify the focus state.


## 动效

**Interaction is on the controls** — The pointer work is small and specified: hover states on the buttons and links rather than on every card, applied to the elements that already look interactive. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element.

**The loop does the ambient work** — One 6s clip is the entire ambient layer: it plays behind the copy, loops without a visible cut and never reacts to the pointer. The clip is short enough to loop without a visible seam, which matters more than its resolution.


## 可替换项

- Replace “Where will you go next?” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Swap in your own headline where “Where will you go next?” sits and keep the line breaks, because the entrance animates per line.
- Change the copy first, then the accent, then the media: the 1470x1080 frame was solved in that order and reversing it costs a re-layout.
- Write the replacement headline first, then confirm it still fits the 1470x1080 frame at the reference's type size.

## 文案规则

**How AI Trip Planner sequences the first read** — If your page currently leads with features, this is the order to copy: navigation, the headline, the announcement badge, the stats row and the card grid in front, the supporting detail after, and type from 15px to 40px and 15px spacing steps setting the distance. A travel reader gets the offer before the options.

**The argument this pricing section makes** — A tint layer over the media would have been the easy fix. The brief leaves it off. The media is a 6s 1470x1080 loop. The copy still holds because type from 15px to 40px and 15px spacing steps keep the frame calm. It gives a travel reader the shortest honest route to the offer.

**What to change first in AI Trip Planner** — Re-skinning the palette first is the usual mistake. It changes the mood without touching the composition, and type from 15px to 40px and 15px spacing steps still carry the layout; do the copy and media first and the palette last. The composition is the reusable part, and it survives a different brand.


## 规格

| 项 | 值 |
|---|---|
| Page section | Pricing section |
| Field | Travel |
| Canvas size | 1470x1080 · 1.36:1 |
| Loop length | 6s loop |
| Brief | 6,398 characters |
| Date | 2026-09-17 |
| Faces | Geist, Special Elite · 15–40px |
| Built with | Tailwind CSS, React, TypeScript |
| Motion | a 6s media loop |

## 复刻步骤

1. Copy type from 15px to 40px, 15px spacing steps and a 760px breakpoint into your own brief before you rewrite anything else.
2. Pin the reference measurements before you restyle anything: type from 15px to 40px, 15px spacing steps and a 760px breakpoint.
3. Keep the measurements the brief spells out: type from 15px to 40px, 15px spacing steps and a 760px breakpoint.
4. Check your build against the reference measurements: type from 15px to 40px, 15px spacing steps and a 760px breakpoint.
5. Swap the media for your own 1470x1080 export and keep the crop the brief specifies.

---
来源：https://ottermind.ai/explore/website/ai-trip-planner
原始 prompt：6398 字符
