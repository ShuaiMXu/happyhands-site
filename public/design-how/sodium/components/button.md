---
name: Button
system: sodium
kind: component
import: "import {Button, buttonVariants} from '@/components/sodium/ui/button'"
install: "npx shadcn@latest add https://design.how/r/sodium/button.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/button
---

# Button

Starts an action.

## Use when
- The person does something now: run, replay, deploy, save, cancel a job.
- A frame, footer, dialog or toolbar ends in one action, with a way out beside it.
- A row repeats one quiet action on every item (ghost, icon sizes).

## Don't use when
- The control moves to another page. Use a link; a Button acts on this page.
- The control turns a setting on or off at once. Use [Switch](/systems/sodium/components/switch.md).
- The person picks one of two to five views. Use [Segmented control](/systems/sodium/components/segmented-control.md).

## Minimal example
```tsx
<Button variant="secondary">View logs</Button>
<Button onClick={run}>Run pipeline</Button>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-one-primary MUST Give a frame, footer, dialog or any group of actions at most one primary Button: variant="primary" (the yellow slab) or "destructive". Make every other action beside it variant="secondary" or "ghost". Because the slab is the one solid yellow on the screen and marks the next step, so two of them split the eye; primary is the default variant, so two bare Buttons are two slabs.
   - Correct:
     ```tsx
     <Button variant="secondary">Keep table</Button>
     <Button variant="destructive">Drop table</Button>
     ```
   - Wrong:
     ```tsx
     <Button>Keep table</Button>
     <Button variant="destructive">Drop table</Button>
     ```
2. button-destructive-loss MUST Lead with variant="destructive" only when the action loses data or work that cannot come back: drop, purge, revoke, cancel a running job. Because red is Sodium's failure colour, so on Save or Retry it claims something already went wrong.
   - Correct: `<Button variant="destructive">Purge queue</Button>`
   - Wrong: `<Button variant="destructive">Retry job</Button>`
3. button-no-yellow-text NEVER Paint a secondary or ghost Button's label, icon or edge in yellow to make it stand out. Because yellow on white is 1.4:1 and vanishes, and in dark a yellow edge reads as a second primary.
   - Correct: `<Button>Deploy</Button>`
   - Wrong: `<Button variant="secondary" className="border-accent-fill text-accent-text">Deploy</Button>`
4. button-sentence-case MUST Write the label in sentence case as a verb and its object; the button sets the capitals. Because the label role uppercases it on screen, while a screen reader reads the source, and capitals typed in are spelled out letter by letter.
   - Correct: `<Button>Run pipeline</Button>`
   - Wrong: `<Button>RUN</Button>`
5. button-pending MUST Pass pending as a boolean from the first render; the mark stands in the label's place, or add pendingLabel for a verb. Never swap the children while an action runs. Because Button measures the pending layer only when pending is defined, and swapped children change the width and the accessible name mid-press.
   - Correct: `<Button pending={running} pendingLabel="Running">Run pipeline</Button>`
   - Wrong: `<Button pending={running || undefined}>{running ? 'Running' : 'Run'}</Button>`
6. button-icon-name MUST Give every icon size an aria-label. Because the button holds only a glyph, so a screen reader announces "button" and the development check logs an error.
   - Correct: `<Button size="icon-sm" variant="ghost" aria-label="Replay run"><Icon icon={Renew}/></Button>`
   - Wrong: `<Button size="icon-sm" variant="ghost"><Icon icon={Renew}/></Button>`
7. button-submit-type MUST Set type="submit" on the Button that submits a form. Because Base UI defaults to type="button", so the press and Enter in a field never submit the form.
   - Correct: `<form onSubmit={save}><Button type="submit">Save</Button></form>`
   - Wrong: `<form onSubmit={save}><Button>Save</Button></form>`
8. button-classname-placement NEVER Pass fills, edges, corners, heights or type in className; pass only placement, such as a margin or a width. Because a hand-set fill drops the hover, held and disabled steps and the light from below, every corner in Sodium is square, and a fixed height clips the label at 200% zoom.
   - Correct: `<Button className="w-full">Run pipeline</Button>`
   - Wrong: `<Button className="h-10 rounded-md bg-accent-fill">Run</Button>`
9. button-link-not-wrapped NEVER Wrap a Button in an `<a>`; render it as the anchor with render and nativeButton={false}. Because a button inside a link is invalid HTML, takes two tab stops and is announced as both.
   - Correct: `<Button render={<a href="/jobs"/>} nativeButton={false}>View jobs</Button>`
   - Wrong: `<a href="/jobs"><Button>View jobs</Button></a>`
10. button-size-by-place SHOULD Use size="sm" in a 40px row or a panel head, the default in forms and toolbars, and lg only for a page's one main action. Because a 26px button sits 7px inside a row's rules, where a 32px one crowds them.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'primary' \| 'destructive' \| 'secondary' \| 'ghost'` | `'primary'` | primary is the yellow slab, destructive the failure tint; one of them per group. secondary has a --line edge, the rule a card draws, on a body a hair off the page; ghost has none. primary and secondary are lit from below. |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'default'` | 26, 32 or 36px tall. Icon sizes are square and need aria-label. |
| `pending` | `boolean` |  | Keeps the name and the box, blocks presses, keeps focus, sets aria-busy, shows the pending mark. |
| `pendingLabel` | `ReactNode` |  | An -ing verb shown after the mark while pending; without it the mark stands alone in the label's place. Not announced. |
| `disabled` | `boolean` | `false` | Drops every surface to the well. Leaves the tab order unless focusableWhenDisabled. |
| `focusableWhenDisabled` | `boolean` | `false` | Keeps a disabled button in the tab order, so its reason beside it can be reached. |
| `render` | `ReactElement` |  | Renders another element, such as an anchor. Set nativeButton={false}. |
| `className` | `string` |  | Placement only: margin, width in a layout, grid area. |
Other props pass through to the button element (Base UI Button).

## Variants and states
- variant: primary, secondary, ghost, destructive
- size: sm, default, lg, icon-sm, icon, icon-lg
- states: rest, hover, held, focus-visible, disabled, pending
- when states meet, the first wins: pending > disabled > held > focus-visible > hover > rest

## Accessibility
- [ ] Focus is a 2px square outline 2px out in --focus, dark gold in light and yellow in dark, on every variant.
- [ ] Labels where they sit: ink on the slab 12.8:1, yellow on the dark tint 9.0:1, the failure word on its tint 5.7:1 and 5.6:1, text-1 on the page 18.3:1 and 16.6:1, ghost text-2 7.8:1 and 10.2:1.
- [ ] The secondary's edge is --line, the rule colour, 1.3:1 on the page; its text-1 label names it, not the edge.
- [ ] The capitals come from CSS, so a screen reader reads the sentence-case source as words.
- [ ] Name icon sizes with aria-label; the glyph is aria-hidden. Development builds log a button with no name.
- [ ] Pending sets aria-busy, keeps focus and keeps the idle name; the pending mark and verb are aria-hidden.

## Keyboard
- `Enter`: Presses the button.
- `Space`: Presses the button on release.

## Edge cases
- Long label -> Never wraps; a label wider than its container ends in an ellipsis and stays the accessible name.
- Row narrower than its buttons -> Buttons never shrink. Let the row wrap with flex-wrap.
- Zoom 200% -> The height grows with the label past its token.
- Slow request -> The box keeps its width, focus stays, the pending mark steps and repeat presses are blocked.
- Failed request -> Clear pending and the button returns to rest with its name; say what failed in a status region.
- Hover and held -> Primary and secondary are lit from below, and hover lightens the fill, the edge and the light and adds a 1px halo. Held settles them back to rest with the light out and the halo kept; ghost and destructive step a wash.
- Disabled -> Every variant drops to the well with a rule edge and the disabled label, unlit, because a control that cannot be pressed should not look like the one to press.
- Dark theme -> The slab turns into the dark yellow tint with a 1px yellow line, a yellow label and a faint yellow light; the secondary sits on a body a step off the near-black page with a fainter light.
- Forced colors -> The light from below and the halo are dropped; the slab and the destructive keep a ButtonText edge; the focus outline stays.
- Reduced motion -> The pending mark stands still with its first cell lit; the colour and light still change, at once.

## Tokens
--primary-bg, --primary-text, --primary-edge, --primary-hover, --primary-edge-hover, --primary-pressed, --primary-light, --primary-light-hover, --secondary-bg, --secondary-hover, --secondary-pressed, --secondary-edge, --secondary-edge-hover, --secondary-light, --secondary-light-hover, --primary-ring, --secondary-ring, --fail, --fail-text, --fail-tint, --line, --hover, --pressed, --well, --text-1, --text-2, --text-disabled, --control-sm, --control, --control-lg, --icon, --type-label, --type-label-sm, --type-label-lg, --focus, --focus-width, --focus-offset, --pending-cell, --dur-press, --dur-light, --dur-glow, --dur-pending, --ease-out, --ease-soft

## Related
- [Button group](/systems/sodium/components/button-group.md): Joins related buttons into one control.
- [Copy button](/systems/sodium/components/copy-button.md): Copies a value.
