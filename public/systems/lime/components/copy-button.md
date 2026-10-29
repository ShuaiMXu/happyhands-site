---
name: Copy button
system: lime
kind: component
import: "import {CopyButton} from '@/components/lime/ui/copy-button'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/copy-button.json"
registryDependencies: [button, icon, theme]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/copy-button
---

# Copy button

Copies something with one tap, like a link or a code.

## Use when
- A value the person pastes elsewhere: a payment link, invite code, account number, reference.
- A read-only field or code block that needs a one-press copy.

## Don't use when
- The action does something other than copy. Use [Button](/systems/lime/components/button.md).
- The value needs review before sharing. Show it in a field, then offer the copy button.

## Minimal example
```tsx
<CopyButton value={url} label="Copy share link"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. copy-button-label MUST Set label to a verb and its object, such as "Copy share link", on an icon-only button. Because label defaults to "Copy", so every icon-only CopyButton gets the same name.
   - Correct: `<CopyButton value={url} label="Copy share link"/>`
   - Wrong: `<CopyButton value={url}/>`
2. copy-button-next-to-value SHOULD Put the button with the value it copies, inside the end of the field, so the person sees what was copied.
   - Correct:
     ```tsx
     <div className="relative"><Input readOnly value={url} className="pe-11"/><CopyButton value={url} size="icon-sm" label="Copy share link" className="absolute end-1 top-1/2 -translate-y-1/2"/></div>
     ```
3. copy-button-fixed-label NEVER Swap the label to Copied; keep the text and let the check and the status region carry the result. Because a new label shifts the width and renames the button while it has focus.
   - Correct: `<CopyButton value={url}>Copy link</CopyButton>`
   - Wrong: `<CopyButton value={url}>{copied ? 'Copied' : 'Copy link'}</CopyButton>`
4. copy-button-no-toast NEVER Add a toast for a copy; the check and the status region already confirm it. Because the person hears the copy twice, from the status region and the toast.
   - Correct: `<CopyButton value={url} label="Copy share link"/>`
   - Wrong: `onClick={() => { navigator.clipboard.writeText(url); toast('Copied'); }}`
5. copy-button-selectable-fallback SHOULD Show the value in a selectable field around the button; a blocked clipboard shows Copy failed only.
   - Correct:
     ```tsx
     <div className="relative"><Input readOnly value={url} className="pe-11"/><CopyButton value={url} size="icon-sm" label="Copy share link" className="absolute end-1 top-1/2 -translate-y-1/2"/></div>
     ```
6. copy-button-touch-size SHOULD Pass size="icon-lg" on a phone; the icon-only default is 32px.
   - Correct: `<CopyButton size="icon-lg" value={url} label="Copy share link"/>`
7. copy-button-no-empty MUST Render no CopyButton when there is nothing to copy; an empty value still shows the check. Because copying an empty string succeeds, so the check confirms a copy of nothing.
   - Correct: `{card.iban && <CopyButton value={card.iban} label="Copy IBAN"/>}`
   - Wrong: `<CopyButton value={card.iban ?? ''} label="Copy IBAN"/>`
8. copy-button-own-click NEVER Pass onClick or icon; CopyButton owns them. Because props spread last, so your onClick replaces the copy and your icon hides the check.
   - Correct: `<CopyButton value={iban} label="Copy IBAN"/> // track from a wrapper's onClickCapture`
   - Wrong: `<CopyButton value={iban} label="Copy IBAN" onClick={track}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value` | `string` |  | The text to copy. Required. |
| `label` | `string` | `'Copy'` | The accessible name without children. |
| `resetAfter` | `number` | `1600` | How long the check stays, in ms. |
| `variant` | `Button variant` | `'ghost'` | Passed to Button. |
| `size` | `Button size` | `'icon-sm', 'md' with children` | Passed to Button. |
Other props pass through to the root element.

## Variants and states
- children: none, text
- variant: ghost, secondary, outline
- states: rest, hover, focus-visible, active, disabled, copied, failed

## Accessibility
- [ ] A button named by label, or by its text children.
- [ ] A sibling role="status" region says "Copied" or "Copy failed"; the button name stays Copy.
- [ ] Enter and Space copy; focus stays on the button.
- [ ] Hover, focus and active come from Button.

## Edge cases
- Right to left -> The icon has no direction; in a labelled button it sits first, on the right.
- Clipboard refused -> The icon turns to a warning for the reset time and the region says Copy failed.
- Rapid presses -> Each press restarts the timer; the check stays 1.6 seconds after the last.
- Inside a form -> It does not submit; Button renders type="button".
- Forced colors -> Takes Button's border; the check uses currentColor.
- Reduced motion -> No press scale; the icon swap is not animated.

## Tokens
--control-sm, --control-md, --radius-control, --surface-2, --surface-3, --line-strong, --fg, --ring, --line-focus, --focus-offset

## Related
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
