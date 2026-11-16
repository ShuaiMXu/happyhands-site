# Taskly

> Hero section reference for an agency or studio — glass panels, a 800x592 frame, Inter and a logo row.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：800x592 · 比例 1.3514 · 10.57s

## 概述

Taskly was captured at 800x592 and kept as a specification rather than as a gallery image. The headline reads “Work smarter, achieve faster”, and the rest of the hero section is arranged around it. The palette is blue #60B1FF underneath, deep blue #041320 for the type and bright orange #FF801E carrying the accents, set in Inter. The build is a single component; every measurement in it is written down, which is what makes it reusable. Treat it as the brief for an agency or studio hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference built on blue #60B1FF and bright orange #FF801E, set in Inter and measured against 16px spacing steps.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Blue | `#60B1FF` | composition |
| Bright blue | `#319AFF` | darker |
| Bright orange | `#FF801E` | accent |
| Deep blue | `#041320` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Accent use is limited to bright orange #FF801E; everything else sits on blue #60B1FF.
- The accent is spent on bright orange #FF801E and the rest of the composition holds blue #60B1FF.
- Accent and ground are both named (bright orange #FF801E on blue #60B1FF), so a brand swap moves one value.

## 布局

**One row, no drawers** — The row spends its contrast in one place: the #FF801E action, with the wordmark and the links held back on the ink colour. The links are set below the wordmark in size, and the #FF801E action is the only element in the bar with any weight.

**One scale for type and frame** — The values are the specification: 16px spacing steps, captured at 800x592 rather than inferred from a screenshot. The list is short enough that a reviewer can check it element by element. Keep the named values when you port the page.

**Faces with one job each** — The display line is set in Inter at a size the brief fixes, which makes the headline a composition element rather than a paragraph. The size steps are fixed values, which is what lets a face swap keep the same hierarchy.

**A bar with nothing spare** — The bar sits over the 800x592 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**Hover where it means something** — States are handled per component (hover states on the buttons and links rather than on every card and a sticky element that holds position while the content moves under it) rather than by a global animation layer. A control that looks interactive behaves interactively, so there are no false affordances.

**Static by design** — This one is delivered as a still composition at 800x592, so the hierarchy has to work without motion, and it does. Motion is treated as feedback rather than as decoration.


## 可替换项

- Change the copy first, then the accent, then the media: the 800x592 frame was solved in that order and reversing it costs a re-layout.
- Change #FF801E for your brand accent and re-check it against #60B1FF, because the accent is the only saturated value in this composition.
- Draft the new copy to the 800x592 frame, then check that the entrance still lands on the same number of lines.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 800x592.

## 文案规则

**Reading Taskly as a spec** — If you are handing this to a developer, the brief is the useful artefact. It states 16px spacing steps and leaves nothing for the two of you to interpret. Nothing in this hero section depends on a default.

**The order behind the hero section** — Attention is directed rather than left to chance. “Work smarter, achieve faster” is doing that work from the first frame. The sequence runs navigation, the headline, the announcement badge, the stats row and the client row, and each stop is sized against 16px spacing steps so nothing arrives out of order. A agency reader gets the offer before the options.

**Why this composition works for agency** — Where a template fills the fold with modules, this hero section uses navigation, the headline, the announcement badge, the stats row and the client row and stops. The difference shows in 16px spacing steps: nothing is padded to fill space. It gives a agency reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Field | Agencies & Studios |
| Canvas size | 800x592 · 1.35:1 |
| Prompt | 2,465 characters |
| Saved | 2026-09-17 |
| Accent | bright orange #FF801E |
| Faces | Inter |
| Motion spec | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x592 capture before you generate.
2. Set the brand first: product name, the #FF801E accent and a headline that replaces the reference's.
3. Set your brand first: product name, the #FF801E accent and the headline that replaces the reference's.
4. Drop your product name in, then replace #FF801E with your own accent and re-check the contrast.
5. Type the product name and the #FF801E accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/taskly-hero
原始 prompt：2465 字符
