# CozyPaws

> Hero section reference for an ecommerce brand — cubic-bezier(0.16, 1, 0.3, 1) easing, a stats row, React and Tailwind CSS and Inter.

- 行业：Ecommerce（ecommerce）
- 区块：Hero section
- 画布：1460x1080 · 比例 1.3519 · 4.833s

## 概述

CozyPaws gives an ecommerce brand a finished first screen and the numbers that produced it. The palette runs white #EFFDF0 underneath, deep green #1A3D1A for the type and bright orange #E86A10 carrying the accents, and the type is Inter. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is limited to 0.8s transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. If you are briefing a ecommerce hero section, start from this composition and replace the subject.

## 主标题文案

> Hero section reference built on white #EFFDF0 and bright orange #E86A10, set in Inter and measured against 70vh sections.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep green | `#1A3D1A` | Headline |
| White | `#EFFDF0` | composition |
| Green | `#2A5A2A` | darker |
| Bright orange | `#E86A10` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 400 / 500 / 600 | UI text |
| DM Serif Display | 400 / 500 / 600 | Display lines — the editorial voice of the page |

## 视觉要点

- The accent is spent on bright orange #E86A10 and the rest of the composition holds white #EFFDF0.
- Accent use is limited to bright orange #E86A10; everything else sits on white #EFFDF0.
- Accent and ground are both named (bright orange #E86A10 on white #EFFDF0), so a brand swap moves one value.

## 布局

**Navigation held to one row** — The bar carries the wordmark, the section links and one #E86A10 button, measured at 70vh sections and 60px spacing steps so it never grows into a second header. The links are set below the wordmark in size, and the #E86A10 action is the only element in the bar with any weight.

**Media behind the type** — A 4.8s clip at 1460x1080 does the atmospheric work; the brief fixes its crop and leaves the type untouched on top of it. The loop is short enough (4.8s) that the eye reads it as texture rather than as a timeline.

**Faces with one job each** — With Inter doing the work, the sizes step down hard from the headline to the supporting copy and letter-spacing tightens as the size grows, so the hierarchy is carried by type rather than colour. Numerals share the interface face, so statistics and labels belong to the same system. One face, clear roles.

**A bar with nothing spare** — One action per bar. The reference was captured at 1460x1080.


## 动效

**The whole animation budget** — Motion in the controls is short and repeatable: 0.8s on each state change. Easing is specified alongside the duration (0.8s), so a rebuild cannot quietly substitute a different feel.

**A small interactive surface** — Only the controls respond to the pointer (hover states on the buttons and links rather than on every card), so the page feels responsive without turning every element into a target. A control that looks interactive behaves interactively, so there are no false affordances.


## 可替换项

- Hold the 1460x1080 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Retune #E86A10 for your brand only after the Inter copy is final, and re-check the contrast on the darkest band.
- Read the brief value by value against the 1460x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Retint #E86A10 toward your palette but keep the step against #EFFDF0; flatten the two and the primary action stops reading.

## 文案规则

**Reading CozyPaws as a spec** — Every relationship on this page is a value you can check: 70vh sections, 60px spacing steps, 0.8s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. That is what makes CozyPaws rebuildable rather than merely reproducible. Nothing in this hero section depends on a default.

**The order behind the hero section** — Read it in order: navigation, the headline, the announcement badge, the stats row and the card grid. Each element has one job, and the bright orange #E86A10 accent is spent only on the element you are meant to press. A ecommerce reader gets the offer before the options.

**Why this composition works for ecommerce** — One screen means one decision for the reader, and that is the cost of this layout: everything else moves below the fold. The brief states 70vh sections, 60px spacing steps, 0.8s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing so the lower sections keep the same rhythm. It gives a ecommerce reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | Ecommerce |
| Frame | 1460x1080 · 1.35:1 |
| Loop length | 4.8s loop |
| Prompt | 6,443 characters |
| Date | 2026-09-17 |
| Key colour | bright orange #E86A10 |
| Type | Inter, DM Serif Display |
| Tools | Tailwind CSS, React, TypeScript |
| Motion spec | 0.8s transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 4.8s media loop |

## 复刻步骤

1. Drop your product name in, then replace #E86A10 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #E86A10 accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #E86A10 accent and the headline that replaces the reference's.
4. Type the product name and the #E86A10 accent before you touch the layout.
5. Pin the reference measurements before you restyle anything: 70vh sections, 60px spacing steps and 0.8s transitions.

---
来源：https://ottermind.ai/explore/website/cozypaws
原始 prompt：6443 字符
