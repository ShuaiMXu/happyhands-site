# Nuxt Design

> Nuxt design system, powered by Nuxt UI and Tailwind CSS v4. Dark mode is the default theme.

## Overview

Nuxt is the design language for Nuxt products. The aesthetic is developer-focused: deep navy surfaces, Nuxt green as the single accent, and generous whitespace.

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Green | `#00DC82` | Logo, brand accent, primary |
| Navy | `#020420` | Dark backgrounds |
| White | `#FFFFFF` | Text on dark surfaces |

### Green Palette

| Token | Hex |
|-------|-----|
| green-50 | `#EFFDF5` |
| green-100 | `#D9FBE8` |
| green-400 | `#00DC82` |
| green-500 | `#00C16A` |
| green-600 | `#00A155` |

### Semantic Colors

primary=green, neutral=slate, success=green, info=blue, warning=yellow, error=red

## Typography

**Font:** Public Sans (`--font-sans`)

| Role | Size | Weight |
|------|------|--------|
| Display | 48px | 700 |
| H1 | 36px | 600 |
| H2 | 30px | 600 |
| Body | 16px | 400 |

## Spacing

4px base: 1=4px, 2=8px, 4=16px, 6=24px, 8=32px

## Components

- **Primary Button**: Green bg, dark text
- **Cards**: Navy bg, 8px radius
- **Code Blocks**: Deep navy, green accents

## Do's and Don'ts

### Do's
- Use semantic color props (`color="primary"`)
- Use `text-highlighted` > `text-default` > `text-muted`
- Hold WCAG AA contrast (4.5:1)

### Don'ts
- Don't hardcode `#00DC82` — use `text-primary`
- Don't signal state with color alone

## Resources

- [nuxt.com](https://nuxt.com)
- [ui.nuxt.com](https://ui.nuxt.com)

<!-- Source: https://designmd.app/brands/nuxt · designmd.app -->
