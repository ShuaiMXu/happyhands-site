---
name: Button
system: glaze
kind: component
import: "import {Button, buttonVariants} from '@/components/glaze/ui/button'"
install: "npx shadcn@latest add https://design.how/r/glaze/button.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/button
---

# Button

Starts an action.

## Use when
- The person does something now: run, publish, save, join, approve, revoke.
- A card, footer, dialog or approval row ends in one action, with a way out beside it.
- A row or toolbar repeats one quiet action on every item (ghost, icon sizes).

## Don't use when
- The control moves to another page. Use a link; a Button acts on this page.
- The control turns a setting on or off at once. Use a switch.
- The person picks one of two to five views. Use a segmented control.

## Minimal example
```tsx
<Button variant="secondary">Not now</Button>
<Button onClick={join}>Join</Button>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-one-primary MUST Give a card, footer, dialog or any group of actions at most one primary Button: variant="primary" (ink), "destructive" (coral) or "confirm" (green). Make every other action beside it variant="secondary". Because the three are one glass family, so two of them side by side split the eye and neither reads as the next step; primary is the default variant, so two bare Buttons are two ink ones.
   - Correct:
     ```tsx
     <Button size="sm" variant="secondary">Cancel</Button>
     <Button size="sm" variant="destructive">Revoke key</Button>
     ```
   - Wrong:
     ```tsx
     <Button size="sm">Keep key</Button>
     <Button size="sm" variant="destructive">Revoke key</Button>
     ```
2. button-primary-by-meaning MUST Lead with variant="primary" (ink) unless the action means loss or approval: destructive for what cannot be undone, confirm for saying yes to something proposed and waiting, such as a tool call, a diff or a reviewed deploy. Because coral and green are Glaze's failure and done colours, so on Save or Join they claim something went wrong or already passed, and the approval rows where green means sign-off stop standing out.
   - Correct:
     ```tsx
     <Button variant="secondary">Deny</Button>
     <Button variant="confirm">Approve</Button>
     ```
   - Wrong: `<Button variant="confirm">Save</Button>`
3. button-secondary-flat NEVER Add glass, a gradient, a sheen or a fill to variant="secondary"; it is the plain card surface, the panel's paper with its hairline and a text-1 label. Because only the primary family is glass, so the one grey, coral or green pill leads, and two special buttons side by side give the group two leads.
   - Correct: `<Button variant="secondary">Not now</Button>`
   - Wrong: `<Button variant="secondary" className="glass glass-ink">Not now</Button>`
4. button-glass-pressables NEVER Copy the glass classes onto something nobody presses, such as a card, a badge or a field. Because glass is the one sign in Glaze that a thing can be pressed, and a glass card reads as a giant button.
   - Correct: `<div className="shell"><div className="panel p-3">Refund agent</div></div>`
   - Wrong: `<div className="glass glass-ink rounded-shell p-3">Refund agent</div>`
5. button-pending MUST Pass pending as a boolean from the first render, with pendingLabel for the verb; never swap the children while an action runs. Because Button reserves the arc's room only when pending is defined, and swapped children change the width and the accessible name mid-press.
   - Correct: `<Button pending={saving} pendingLabel="Publishing">Publish</Button>`
   - Wrong: `<Button pending={saving || undefined}>{saving ? 'Publishing' : 'Publish'}</Button>`
6. button-icon-name MUST Give every icon size an aria-label. Because the button holds only a glyph, so a screen reader announces "button" and the development check logs an error.
   - Correct: `<Button size="icon-sm" variant="ghost" aria-label="More for this run"><Icon icon={More}/></Button>`
   - Wrong: `<Button size="icon-sm" variant="ghost"><Icon icon={More}/></Button>`
7. button-submit-type MUST Set type="submit" on the Button that submits a form. Because Base UI defaults to type="button", so the press and Enter in a field never submit the form.
   - Correct: `<form onSubmit={save}><Button type="submit">Save</Button></form>`
   - Wrong: `<form onSubmit={save}><Button>Save</Button></form>`
8. button-classname-placement MUST Pass only placement classes in className, never fills, shadows, heights, radii or type. Because a hand-set fill drops the hover, held and disabled states, Glaze draws no shadows, and a fixed height clips the label at 200% zoom.
   - Correct: `<Button className="w-full">Run eval</Button>`
   - Wrong: `<Button className="h-10 rounded-tag bg-ink shadow-md">Run eval</Button>`
9. button-link-not-wrapped NEVER Wrap a Button in an `<a>`; render it as the anchor with render and nativeButton={false}. Because a button inside a link is invalid HTML, takes two tab stops and is announced as both.
   - Correct: `<Button render={<a href="/runs"/>} nativeButton={false}>View runs</Button>`
   - Wrong: `<a href="/runs"><Button>View runs</Button></a>`
10. button-size-by-place SHOULD Use size="sm" in a card footer and a row, the default in forms and toolbars, and lg only for a page's one main action. Because a 26px button sits 3px inside the card's footer row, and a 36px one there would push the shell open.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'primary' \| 'destructive' \| 'confirm' \| 'secondary' \| 'ghost'` | `'primary'` | The primary family is glass: primary ink, destructive coral, confirm green, one of them per group. secondary is the plain card surface, paper with the panel hairline; ghost is plain. |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'default'` | 26, 32 or 36px tall. Icon sizes are square and need aria-label. |
| `pending` | `boolean` |  | Keeps the name and the box, blocks presses, keeps focus, sets aria-busy, shows the arc. |
| `pendingLabel` | `ReactNode` |  | The -ing verb shown while pending. Not announced. |
| `disabled` | `boolean` | `false` | Drops the glass to a flat grey pill. Leaves the tab order unless focusableWhenDisabled. |
| `focusableWhenDisabled` | `boolean` | `false` | Keeps a disabled button in the tab order, so its reason beside it can be reached. |
| `render` | `ReactElement` |  | Renders another element, such as an anchor. Set nativeButton={false}. |
| `className` | `string` |  | Placement only: margin, width in a layout, grid area. |
Other props pass through to the button element (Base UI Button).

## Variants and states
- variant: primary, destructive, confirm, secondary, ghost
- size: sm, default, lg, icon-sm, icon, icon-lg
- states: rest, hover, held, focus-visible, disabled, pending
- when states meet, the first wins: pending > disabled > held > focus-visible > hover > rest

## Accessibility
- [ ] Focus shows a 2px ink outline 2px out on :focus-visible, on every variant, never coral.
- [ ] Labels where they sit: ink glass 8.9:1 or more, coral 5.0:1, green 5.4:1, the flat secondary's ink on white 18:1 or more, in both themes.
- [ ] Name icon sizes with aria-label; the glyph is aria-hidden. Development builds log a button with no name.
- [ ] Pending sets aria-busy, keeps focus and keeps the idle name; the pending verb is aria-hidden.
- [ ] Report the result in a role="status" region, never in the label.

## Keyboard
- `Enter`: Presses the button.
- `Space`: Presses the button on release.

## Edge cases
- Long label -> Never wraps; a label wider than its container ends in an ellipsis and stays the accessible name.
- Row narrower than its buttons -> Buttons never shrink. Let the row wrap with flex-wrap.
- Zoom 200% -> The height grows with the text and the layers scale with the pill.
- Slow request -> The box keeps its width, focus stays, the arc turns and repeat presses are blocked.
- Failed request -> Clear pending and the button returns to rest with its name; say what failed in a status region.
- Double click or held Enter -> Pending blocks repeats; the handler needs no guard of its own.
- Disabled -> Glass and flat both drop to the same flat grey pill with a faint ring, because a control that cannot be pressed should not look pressable.
- Dark theme -> Ink, coral and green glass turn light with an ink label; the secondary is the dark panel with its hairline and a light label.
- Over a photo or video -> Put the actions on the shell or a panel under the media, never over it: Glaze has no blur, so there is no glass for an image.
- Forced colors -> The layers drop and the border takes ButtonText; the focus outline stays.
- Reduced motion -> No press scale; the layers still change, and the pending arc stays as a still mark.

## Tokens
--glass-ink-base, --glass-rim, --glass-ink-text, --glass-sheen, --glass-sheen-hover, --glass-coral-base, --glass-coral-text, --glass-green-base, --glass-green-text, --flat-bg, --flat-ring, --flat-text, --flat-hover, --glass-core-held, --scale-press-glass, --scale-press-flat, --scale-press, --hover, --pressed, --field, --line-faint, --text-1, --text-disabled, --control-sm, --control, --control-lg, --icon-sm, --icon, --icon-lg, --radius-pill, --type-label, --type-label-sm, --type-label-lg, --focus, --focus-width, --focus-offset, --dur-press, --dur-spin, --ease-out
