---
name: Dropzone
system: lime
kind: component
import: "import {Dropzone} from '@/components/lime/ui/dropzone'"
install: "npx shadcn@latest add https://design.how/r/lime/dropzone.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/dropzone
---

# Dropzone

Takes files you drop in or pick, and tells you which ones won't work.

## Use when
- The person brings a file in: a receipt, a statement, a proof of address.
- Several files at once, where dragging from a folder is the quick way.

## Don't use when
- A small attach action in a message. Use a button that opens the picker. Use [Button](/systems/lime/components/button.md).
- The file is chosen from saved receipts. Use [List](/systems/lime/components/list.md).

## Minimal example
```tsx
<Dropzone
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  title="Drop a receipt to start"
  hint="JPG, PNG or PDF, up to 10 MB"
  onFiles={files => setNames(files.map(f => f.name))}
  onReject={r => setError(`${r[0].file.name} is not a receipt.`)}
/>
<p role="alert">{error}</p>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dropzone-report-rejects MUST Read onReject and say which file and why in a role="alert" line; the zone draws no error. Because files that miss accept or maxSize go only to onReject, so without it they vanish.
   - Correct: `<Dropzone onFiles={add} onReject={r => setError(r[0].file.name + " is not a receipt.")}/>`
   - Wrong: `<Dropzone onFiles={add}/>`
2. dropzone-say-accepted MUST State the types and size limit in hint. Because the check runs after the drop, so the person learns the limit only once it fails.
   - Correct: `<Dropzone accept="image/*,.pdf" maxSize={10 * MB} hint="JPG, PNG or PDF, up to 10 MB"/>`
   - Wrong: `<Dropzone accept="image/*,.pdf" maxSize={10 * MB}/>`
3. dropzone-title-verb SHOULD Start the title with a verb and name the thing, such as "Drop a receipt to start"; never "Upload".
4. dropzone-one-by-default SHOULD Leave multiple off for one file; extras are rejected with reason count.
   - Correct: `<Dropzone/>`
   - Wrong: `<Dropzone multiple/> // one receipt`
5. dropzone-no-bare-input NEVER Style a bare file input by hand. Because it loses the label wiring, the lime drag wash and the type and size checks.
   - Correct: `<Dropzone onFiles={add}/>`
   - Wrong: `<input type="file"/>`
6. dropzone-max-size-bytes MUST Set maxSize in bytes and check size again on the server. Because maxSize={10} rejects every file over 10 bytes, and a client check is easy to bypass.
   - Correct: `maxSize={10 * 1024 * 1024}`
   - Wrong: `maxSize={10} // not bytes`
7. dropzone-announce MUST Put results in a role="status" or role="alert" line beside the zone. Because the zone has no live region, so a drop or a reject is silent to a screen reader.
   - Correct: `<p role="status">{names.join(", ")}</p>`
8. dropzone-progress-outside SHOULD Show upload progress in a list below the zone; Dropzone only hands files over.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `onFiles` | `(files: File[]) => void` |  | Files that passed. Required. |
| `onReject` | `(rejected: {file, reason}[]) => void` |  | reason is 'type', 'size' or 'count'. |
| `accept` | `string` |  | The input accept syntax, such as "image/*,.pdf". |
| `maxSize` | `number` |  | Bytes. |
| `multiple` | `boolean` | `false` | Allow more than one file. |
| `title, hint` | `string` | `'Drop files here'` | The two text lines. |
| `children` | `ReactNode` |  | Replaces the icon and text. |
| `disabled` | `boolean` | `false` | Ignores presses and drops. |
Other props pass through to the root element.

## Variants and states
- content: default, children
- states: rest, hover, focus-visible, dragging-over, disabled

## Accessibility
- [ ] A label around a visually hidden file input; the input takes focus and the zone shows the ring.
- [ ] Enter and Space open the picker.
- [ ] Name comes from the title and hint.
- [ ] Report accepted and rejected files in a status or alert line.

## Edge cases
- Long title -> Wraps in the centred column.
- Narrow to 160px -> It is w-full; the text wraps in several lines.
- Right to left -> Content is centred and mirrors with no change. The default "or choose from your device" line is English; pass children for another language.
- Dropped text, not a file -> The zone highlights then does nothing; no onFiles or onReject.
- Drag over inner element -> The over state can flicker; count enters and leaves.
- Phone -> No drag; pressing the zone opens the picker.
- Forced colors -> The dashed border stays; data-over adds a Highlight outline.

## Tokens
--surface, --surface-2, --control, --radius-panel, --fg, --fg-2, --fg-3, --accent-wash, --accent-line, --ring, --line-focus, --focus-offset, --line-strong, --fg-disabled, --page

## Related
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
