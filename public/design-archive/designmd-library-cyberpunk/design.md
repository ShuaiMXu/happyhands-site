---
version: "alpha"
name: "Cyberpunk"
description: "Cyberpunk visual system, translated from the Claude Artisan catalog for use in digital products. Neon glow (cyan/magenta) on near-black; Dense HUD/glitch overlays, mono type, scanlines"
colors:
  primary: "#00fff5"
  background: "#05010d"
  surface: "#0d0221"
  text: "#e8f9ff"
  accent: "#ff003c"
  on-primary: "#000000"
  on-surface: "#FFFFFF"
  on-accent: "#000000"
typography:
  h1:
    fontFamily: "'Orbitron', 'Rajdhani', sans-serif"
    fontSize: "4rem"
    fontWeight: "700"
    lineHeight: "1.05"
  body-md:
    fontFamily: "'Rajdhani', 'Chakra Petch', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
  label-caps:
    fontFamily: "'Rajdhani', 'Chakra Petch', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: "600"
    letterSpacing: "0.06em"
rounded:
  sm: "0px"
  md: "2px"
  lg: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "16px"
  button-secondary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: "16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    padding: "16px"
---
## Overview

Cyberpunk visual system, translated from the Claude Artisan catalog for use in digital products. Neon glow (cyan/magenta) on near-black; Dense HUD/glitch overlays, mono type, scanlines

- **Category:** retrofuturism
- **Era:** 1982–present
- **Origin:** Literary roots (Gibson 'Neuromancer' 1984); visual codex from Blade Runner (1982); revived by Cyberpunk 2077.
- **Reference:** Blade Runner; Cyberpunk 2077 UI; Ghost in the Shell.
- **Structural base:** hero, superfície, conteúdo e grade responsiva

**Defining traits:**
- Neon glow (cyan/magenta) on near-black
- Dense HUD/glitch overlays, mono type, scanlines
- Rain-slick megacity noir, holograms
- High-contrast, dystopian, tech-saturated

## Colors

- **bg** — #05010d
- **surface** — #0d0221
- **surface-2** — #160a2b
- **text** — #e8f9ff
- **text-muted** — #7a8fa6
- **primary** — #00fff5
- **accent** — #ff003c
- **magenta** — #ff00e6
- **yellow** — #faff00
- **border** — #00fff5

## Typography

- Display: 'Orbitron', 'Rajdhani', sans-serif
- Body: 'Rajdhani', 'Chakra Petch', system-ui, sans-serif
- Mono: 'Share Tech Mono', ui-monospace, monospace

## Layout

- hero, superfície, conteúdo e grade responsiva
- Use a responsive grid and preserve content hierarchy.
- Collapse columns below 768px without horizontal overflow.

## Elevation & Depth

- Neon glow (cyan/magenta) on near-black; Dense HUD/glitch overlays, mono type, scanlines; Rain-slick megacity noir, holograms; High-contrast, dystopian, tech-saturated; sombras e elevação; transparência e blur

## Shapes

- Radius scale: 0px, 2px, 4px.

## Components

- Buttons keep visible focus and predictable hover/pressed states.
- Cards use the surface and radius scale from the tokens.
- Forms expose persistent labels, textual errors, and keyboard focus.

## Do's and Don'ts

- Do: follow the tokens and the structural composition.
- Do: maintain WCAG AA contrast and `prefers-reduced-motion`.
- Avoid: using the style as decoration without functional hierarchy.

<!-- Source: https://designmd.app/library/cyberpunk · designmd.app -->
