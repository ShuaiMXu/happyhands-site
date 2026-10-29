---
name: Button
system: lime
kind: component
import: "import {Button, Spinner, buttonVariants} from '@/components/lime/ui/button'"
install: "npx shadcn@latest add https://design.how/r/lime/button.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/button
---

# Button

Starts an action, like sending a message or saving a change.

## Use when
- The person does something with their money or account: send, pay, save, add a card.
- The view has one main action that has to be found in a second.
- A row or toolbar repeats a small action on every item (ghost, icon sizes).

## Don't use when
- The control moves to another page. Use a link; variant="link" is for actions that stay on the page.
- The control turns a setting on or off at once. Use [Switch](/systems/lime/components/switch.md).
- The person chooses one of two to five views. Use [Segmented](/systems/lime/components/segmented.md).
- It is a topic or filter the person toggles. Use [Chip](/systems/lime/components/chip.md).

## Minimal example
```tsx
<Button onClick={send}>Send money</Button>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-one-lime MUST Use variant="primary" once per view; make every other action solid, secondary, outline or ghost. Because two lime buttons leave the person guessing which one moves the money.
   - Correct:
     ```tsx
     <Button variant="secondary">Save for later</Button>
     <Button>Send</Button>
     ```
   - Wrong:
     ```tsx
     <Button>Save for later</Button>
     <Button>Send</Button>
     ```
2. button-pending-not-swap MUST Set pending and keep the children; never swap the label while an action runs. Because a new label changes the width and the accessible name mid-press.
   - Correct: `<Button pending={saving}>Save</Button>`
   - Wrong: `<Button>{saving ? 'Saving...' : 'Save'}</Button>`
3. button-submit-type MUST Set type="submit" on the Button that submits a form; Base UI defaults to type="button". Because without it the Button presses and Enter in a field never submit the form.
   - Correct: `<form onSubmit={save}><Button type="submit">Save</Button></form>`
   - Wrong: `<form onSubmit={save}><Button>Save</Button></form>`
4. button-destructive-confirm MUST Use destructive only on the confirming button inside a dialog; keep the trigger outline or ghost. Because red on the trigger alarms before anything is at stake and takes the weight from the real confirm.
   - Correct: `<Button variant="outline">Delete goal</Button> // opens a dialog`
   - Wrong: `<Button variant="destructive">Delete goal</Button> // on the page`
5. button-icon-name MUST Give icon-sm, icon and icon-lg an aria-label. Because the glyph is aria-hidden, so a screen reader announces only "button".
   - Correct: `<Button size="icon-sm" variant="ghost" aria-label="Remove card"><Icon icon={Close}/></Button>`
   - Wrong: `<Button size="icon-sm" variant="ghost"><Icon icon={Close}/></Button>`
6. button-black-on-lime NEVER Put white text on the lime fill; use variant="primary", which carries near-black text. Because white on the lime fails contrast in both themes.
   - Correct: `<Button>Add goal</Button>`
   - Wrong: `<button className="bg-accent text-white">Add goal</button>`
7. button-glow-only-primary NEVER Add glow classes to other buttons; the glow marks primary and destructive only. Because the glow marks the next step, and a glowing Share competes with Send for it.
   - Correct: `<Button variant="outline">Share</Button>`
   - Wrong: `<Button variant="secondary" className="glow glow-accent">Share</Button>`
8. button-classname-placement MUST Pass only placement classes in className, never fills, heights or radii. Because a hand-set fill skips the variant's hover, pressed and forced-colors states and its checked contrast.
   - Correct: `<Button variant="destructive">Delete</Button>`
   - Wrong: `<Button className="bg-danger text-white h-9 rounded-lg">Delete</Button>`
9. button-disabled-reason SHOULD Say why a button is disabled in text beside it; a disabled button takes no focus or hover on touch.
   - Correct:
     ```tsx
     <Button disabled>Send</Button>
     <p>Add an amount to send.</p>
     ```
10. button-verb-label SHOULD Label with a verb and its object in sentence case.
11. button-amount-in-label SHOULD Show a money amount in an Amount beside the button, not in the label.
   - Correct: `<Button>Send money</Button> <Amount value={-50}/>`
12. button-touch-size SHOULD Use size="lg" (48px) for the main action on phone-first surfaces.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'primary' \| 'solid' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` | What the button is for. One primary per view. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'md'` | 32, 40 or 48px tall. Icon sizes are square. |
| `pending` | `boolean` |  | Blocks presses, keeps focus, sets aria-busy, shows the spinner. |
| `icon` | `ReactNode` |  | An icon before the label. Hidden under the spinner. |
| `disabled` | `boolean` | `false` | Not focusable unless focusableWhenDisabled. |
| `render` | `ReactElement` |  | Renders another element. Set nativeButton={false}. |
| `className` | `string` |  | Placement only: margin, width in a layout, grid area. |
Other props pass through to the root element.

## Variants and states
- variant: primary, solid, secondary, outline, ghost, destructive, link
- size: sm, md, lg, icon-sm, icon, icon-lg
- states: rest, hover, focus-visible, active, disabled, pending

## Accessibility
- [ ] Focus shows a 2px olive outline on :focus-visible, on every variant.
- [ ] Name icon sizes with aria-label; the glyph is aria-hidden.
- [ ] Pending sets aria-busy and keeps the idle name.
- [ ] Report results in a role="status" region, never in the label.
- [ ] Text on the lime and on the red passes 4.5:1 at every glow stop, in both themes; Color lists each ratio, computed from tokens.css.

## Edge cases
- Long label -> Never wraps and never grows past its container: a text label too long for the column ends in an ellipsis, and the full label stays the accessible name.
- Row narrower than its buttons -> Buttons are shrink-0 and overflow. Use flex-wrap.
- Right to left -> The row mirrors. An arrow icon does not flip; use rtl:-scale-x-100.
- Zoom 200% -> The label grows sideways and the fixed height stays; nothing clips.
- Slow action -> Pass pending even when false so the box is as wide as the pending layer from the start.
- Double click or held Enter -> Pending blocks repeats until the parent clears it.
- Empty or unnamed icon button -> Announced as "button"; Lime has no development warning.
- Inside a form -> Submits only with type="submit".
- Inside an anchor -> Two tab stops; render the Button as the link with render.
- Forced colors -> The glow drops and every variant but link gets a 1px ButtonText border.
- Reduced motion -> No press scale; the lit layer switches without a fade; the spinner keeps turning.

## Tokens
--accent, --on-accent, --glow-accent-from, --glow-accent-to, --glow-accent-edge, --glow-accent-bloom, --glow-accent-cast, --ink, --ink-hover, --fg-inverse, --surface-2, --surface-3, --line-strong, --danger, --on-danger, --fg-disabled, --control-sm, --control-md, --control-lg, --radius-control, --ring, --focus-offset, --dur-instant, --dur-base, --ease-out, --dur-spin

## Related
- [Copy button](/systems/lime/components/copy-button.md): Copies a value, such as a payment link, and confirms with a check.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
