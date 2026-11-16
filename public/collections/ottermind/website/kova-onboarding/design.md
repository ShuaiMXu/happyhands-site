# Kova Mobile App

> Onboarding reference for an AI or SaaS product — a stats row, 800ms transitions, a dark stage and Helvetica Neue.

- 行业：AI & SaaS（ai-saas）
- 区块：Onboarding
- 画布：1252x864 · 比例 1.4491 · 7.98s

## 概述

Kova Mobile App is the onboarding flow reference for an AI or SaaS product, and the brief behind it is a full build spec rather than a mood board. It leads with “Turn your ideas into cinematic scenes” and gives that line the frame rather than shrinking it into a card. Colour is limited to white #FFFFFF underneath, black #000000 for the type and indigo #2E1065 carrying the accents, set in Helvetica Neue. It ships as a single component, so the whole onboarding flow can be lifted into a project without a design handoff. The page keeps its motion to 800ms transitions and a looping video bed. Borrow the structure and not the subject: the onboarding flow and its numbers move to your brand unchanged.

## 主标题文案

> “Turn your ideas into cinematic scenes” — the whole onboarding flow is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | composition |
| Muted indigo | `#E9D5FF` | darker |
| Indigo | `#2E1065` | accent |
| Near-black | `#000000` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica Neue | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The clip is one asset at 1252x864 and a 8s loop, so the composition has a single media dependency.
- Accent and ground are both named (indigo #2E1065 on white #FFFFFF), so a brand swap moves one value.
- Media is specified at 1252x864 and a 8s loop, so a replacement should match the crop and the loop length.

## 布局

**Navigation without a background** — The top row holds the wordmark, four to five links and a single action tinted #2E1065, sized to stay quiet against the rest of the page. The links are set below the wordmark in size, and the #2E1065 action is the only element in the bar with any weight. Test the bar over your own media before giving it a background.

**The sizes are in the brief, not in a scale** — The brief fixes 100vh sections, 24px spacing steps and 800ms transitions and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. Each value maps to one job: a type step, a gap, a radius or a transition. Port the values with the layout.

**Video at the bottom layer** — Video sits on the bottom layer of the 1252x864 composition, with the type arranged above it and nothing in between. A poster frame at 1252x864 holds the composition when autoplay is unavailable, so the layout never collapses.

**The scale is the styling** — The size steps and tracking in the brief are what give this its tone: Helvetica Neue at a tight display size, then a clear drop to the supporting copy. The caption step is small enough to sit under a figure without changing the rhythm of the page.


## 动效

**A scene instead of a still** — A WebGL canvas is doing the visual work on the 1252x864 frame, with the type set over or beside it. The surrounding interface stays flat, which lets the render carry the depth.

**Fast enough to feel deliberate** — The animation budget is small and explicit: 800ms, applied to state changes rather than to entrances. Focus states are timed with the same value as hover, so keyboard and pointer feedback match.


## 可替换项

- Read the brief value by value against the 1252x864 capture before you edit anything; the numbers are the part that is easiest to lose.
- Change the copy first, then the accent, then the media: the 1252x864 frame was solved in that order and reversing it costs a re-layout.
- Replace “Turn your ideas into cinematic scenes” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Retune #2E1065 for your brand only after the Helvetica Neue copy is final, and re-check the contrast on the darkest band.

## 文案规则

**The order behind the onboarding flow** — Attention is routed rather than scattered. “Turn your ideas into cinematic scenes” is doing that work from the first frame. The eye lands on the display line first, then the supporting copy, then the action. Proof, where it appears, stays a strip or a row rather than a wall of testimonials. That sequence is the design. A SaaS reader gets the offer before the options.

**Why this composition works for SaaS** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a 8s 1252x864 loop. The frame stays quiet and 100vh sections and 24px spacing steps keep the reader on the text. It gives a SaaS reader the shortest honest route to the offer.

**The timing behind the onboarding flow** — You could drop a preset library onto this composition and it would look busier, not better. The brief keeps 800ms transitions, a 8s media loop and hover and press states and spends the budget there. Nothing animates for its own sake in this onboarding flow.


## 规格

| 项 | 值 |
|---|---|
| Page part | Onboarding |
| Field | AI & SaaS |
| Format | 1252x864 · 1.45:1 |
| Loop length | 8s loop |
| Prompt | 3,523 characters |
| Date | 2026-09-17 |
| Accent | indigo #2E1065 |
| Typefaces | Helvetica Neue |
| Timing | 800ms transitions and a 8s media loop |

## 复刻步骤

1. Start in Studio with the prompt prefilled, then delete the parts of the onboarding flow you do not need.
2. Open the reference in Studio with the prompt staged, and read the onboarding flow brief before you send it.
3. Stage the prompt in Studio and read it once against the 1252x864 capture before you generate.
4. Set your brand first: product name, the #2E1065 accent and the headline that replaces the reference's.
5. Type the product name and the #2E1065 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/kova-onboarding
原始 prompt：3523 字符
