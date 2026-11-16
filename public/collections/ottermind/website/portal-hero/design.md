# Portal

> Hero section reference for a lifestyle brand — a stats row, a 800x609 frame, glass panels and #E1836B accent.

- 行业：Lifestyle（lifestyle）
- 区块：Hero section
- 画布：800x608 · 比例 1.3158 · 6.3s

## 概述

Portal was captured at 800x609 and kept as a specification rather than as a gallery image. The headline reads “A voyage through forgotten realms, where past and future intertwine”, and the rest of the hero section is arranged around it. The palette is black #292926 underneath, muted orange #F3BC9E for the type and red #E1836B carrying the accents, set in Inter. Delivery is React and Tailwind CSS, captured at 800x609 so the frame is fixed before any code is written. The page keeps its motion to 300ms transitions. Treat it as the brief for a lifestyle brand hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference built around “A voyage through forgotten realms, where past and future intertwine”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep orange | `#221F1C` | darkest |
| Muted orange | `#F3BC9E` | Headline |
| Red | `#E1836B` | accent |
| Black | `#292926` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The accent is spent on red #E1836B and the rest of the composition holds black #292926.
- The timing budget is state feedback rather than page choreography (300ms), so a slower rebuild reads as a different design.
- Accent and ground are both named (red #E1836B on black #292926), so a brand swap moves one value.

## 布局

**Top row: wordmark, links, one action** — The bar carries the wordmark, the section links and one #E1836B button, measured at 20px spacing steps and 300ms transitions so it never grows into a second header. The links are set below the wordmark in size, and the #E1836B action is the only element in the bar with any weight. Test the bar over your own media before giving it a background.

**Weights named per role** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. Line height follows the size steps rather than a single global value.

**Links collapse at one width** — The bar sits over the 800x609 composition without a background of its own, so the media runs edge to edge underneath it.

**The brief names the steps** — Nothing here is eyeballed. The spec fixes 20px spacing steps and 300ms transitions, and the rest of the layout derives from those values. The type and the layout share the same steps, so nothing drifts when one of them is substituted.


## 动效

**One duration for the controls** — Motion in the controls is short and repeatable: 300ms on each state change. Because the values are short, a rebuild that slows them down is immediately visible.

**Pointers only where they help** — States are handled per component (hover states on the buttons and links rather than on every card) rather than by a global animation layer. Hover and focus are specified together, so the pointer and the keyboard get the same information.


## 可替换项

- Retint #E1836B toward your palette but keep the step against #292926; flatten the two and the primary action stops reading.
- Draft the new copy to the 800x609 frame, then check that the entrance still lands on the same number of lines.
- Change the copy first, then the accent, then the media: the 800x609 frame was solved in that order and reversing it costs a re-layout.
- Swap #E1836B for your brand colour and re-check it against #292926, since the accent is the only place saturation is allowed.

## 文案规则

**The order behind the hero section** — Attention is routed rather than scattered. The page says it out loud: “A voyage through forgotten realms, where past and future intertwine”. The eye lands on the display line first, then the supporting copy, then the action. Proof, where it appears, stays a strip or a row rather than a wall of testimonials. That sequence is the design. A lifestyle reader gets the offer before the options.

**Making the hero section yours** — Start with the promise, not the decoration. Rewrite “A voyage through forgotten realms, where past and future intertwine” as one sentence that names what you do, then set it in Inter at the display size the brief uses. Replace red #E1836B with your own accent and check it against black #292926 before you touch anything else. Rewrite the copy and the media before you re-colour anything.

**Reading Portal as a spec** — The brief is a specification, not a mood board. It fixes 20px spacing steps and 300ms transitions, and it names the media at 800x609. That level of detail is why the design survives a rebuild: change the copy and the relationships still hold. Nothing in this hero section depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Category | Lifestyle |
| Format | 800x609 · 1.32:1 |
| Input brief | 6,663 characters |
| Captured | 2026-09-17 |
| Key colour | red #E1836B |
| Faces | Inter |
| Tools | Tailwind CSS, React, Lucide icons |
| Motion spec | 300ms transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x609 capture before you generate.
2. Set the brand first: product name, the #E1836B accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #E1836B with your own accent and re-check the contrast.
4. Set your brand first: product name, the #E1836B accent and the headline that replaces the reference's.
5. Type the product name and the #E1836B accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/portal-hero
原始 prompt：6663 字符
