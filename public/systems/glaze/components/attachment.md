---
name: Attachment
system: glaze
kind: component
import: "import {Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentProgress, AttachmentActions, AttachmentAction, AttachmentGroup, AttachmentGlyph, AttachmentDrop, AttachmentDropTitle, AttachmentDropDescription, AttachmentDropTrigger, useAttachmentDrop, fileGlyph, formatBytes, formatByteProgress, rejectionReason, describeAccept, attachmentVariants} from '@/components/glaze/ui/attachment'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/attachment.json"
registryDependencies: [button, icon, theme, truncate, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/attachment
---

# Attachment

Shows a file and its upload state.

## Use when
- Files on a prompt or a message: screenshots, policies, exports.
- A form or settings screen takes files: AttachmentDrop variant="zone".
- A composer or a panel takes files dropped on it: AttachmentDrop around it.

## Don't use when
- A person or an agent. Use [Avatar](/systems/glaze/components/avatar.md).
- A link to a page. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
<Attachment state="uploading">
  <AttachmentMedia><AttachmentGlyph type={file.type} name={file.name}/></AttachmentMedia>
  <AttachmentContent><AttachmentTitle>{file.name}</AttachmentTitle><AttachmentDescription>1.2 of 4.8 MB</AttachmentDescription></AttachmentContent>
  <AttachmentProgress value={25} label={`Uploading ${file.name}`}/>
</Attachment>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. attachment-drop-not-input NEVER Put a bare <input type="file"> on screen; use AttachmentDrop with an AttachmentDropTrigger. Because the native input has no drag judgement, no reasons and a look Glaze cannot reach, while the trigger opens the same picker.
   - Correct:
     ```tsx
     <AttachmentDrop accept="image/*" onFiles={add}><AttachmentDropTrigger>Browse files</AttachmentDropTrigger></AttachmentDrop>
     ```
   - Wrong: `<input type="file" accept="image/*"/>`
2. attachment-reason MUST Show a refused or failed file as state="error" with the reason in AttachmentDescription. Because a file that silently vanishes makes the person try again, and rejectionReason already says why in words.
   - Correct:
     ```tsx
     <Attachment state="error">...<AttachmentDescription>{rejectionReason(r, {accept, maxSize})}</AttachmentDescription></Attachment>
     ```
   - Wrong: `onReject={() => {}}`
3. attachment-action-names MUST Name every AttachmentAction with the file: "Remove refund-policy.pdf". Because a group of chips each with a "Remove" button gives a screen reader five identical names.
4. attachment-progress-label MUST Give AttachmentProgress a label naming the file, and write the bytes in AttachmentDescription. Because the 2px bar is the progressbar's only visible part, and "1.2 of 4.8 MB" says what is left.
   - Correct: `` <AttachmentProgress value={pct} label={`Uploading ${name}`}/> ``
5. attachment-no-glass NEVER Put glass, a tint or a shadow on an Attachment chip. Because the chip is not pressed, and a raised chip reads as a button beside the composer's send.
   - Correct: `<Attachment>`
   - Wrong: `<Attachment className="glass glass-paper">`
6. attachment-accept-words SHOULD Say what the zone takes in AttachmentDropDescription: types and the size limit. Because the overlay can refuse a type during a drag, but only the words tell the person before they try.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Attachment state` | `'idle' \| 'uploading' \| 'processing' \| 'done' \| 'error'` | `'done'` | Dims the media while busy; error turns the edge coral. |
| `Attachment size` | `'default' \| 'sm'` | `'default'` | A 36 or 24px media cell; sm hides the description. |
| `AttachmentProgress value, label` | `number, string` |  | 0 to 100, and the progressbar's name. |
| `AttachmentGroup layout` | `'wrap' \| 'scroll'` | `'wrap'` | Wrap, or one row that scrolls in a composer. |
| `AttachmentDrop variant` | `'region' \| 'zone'` | `'region'` | Invisible until a drag, or a visible box. |
| `AttachmentDrop accept, maxSize, multiple` | `string, number, boolean` | `, , true` | What it takes; checked during the drag and again on drop. |
| `AttachmentDrop onFiles, onReject` | `(files) => void, (rejections) => void` |  | What passed, and what did not with a reason. |
| `AttachmentDrop paste` | `boolean` | `false` | Takes pasted files while focus is inside. |
| `AttachmentDrop dragState` | `'accept' \| 'reject'` |  | Shows the overlay without a drag, for docs and tests. |
Other props pass through to the chip div (Attachment); the region div (AttachmentDrop).

## Variants and states
- size: default, sm
- drop: region, zone
- states: idle, uploading, processing, done, error, drag accept, drag reject, disabled

## Accessibility
- [ ] A busy chip is aria-busy; AttachmentProgress is a named progressbar with the percent.
- [ ] The drag overlay is aria-hidden; the trigger is the way in for keyboard and screen reader users.
- [ ] The file name is whole in the DOM even when cut in the middle.
- [ ] The error reason is in the failure word colour, 5.9:1, and in words.

## Keyboard
- `Tab`: Moves to each chip's actions, and to the zone's trigger.
- `Enter`: Presses the focused action or opens the file picker.

## Edge cases
- Wrong type dragged -> The overlay turns coral and says what the region takes before the drop.
- Extension-only accept -> Judged on drop, since a drag shows types and not names.
- Regions nested -> The inner one takes the drop; the outer one shows nothing.
- Same file picked twice -> The picker fires again.
- Thumbnail fails to load -> Falls back to the image glyph.
- Long file name -> Cut in the middle so the extension stays.

## Tokens
--paper, --line, --line-control, --fail, --fail-text, --field, --ink, --radius-overlay, --radius-tag, --row, --type-label, --type-caption, --text-1, --text-2, --dur-state

## Related
- [Avatar](/systems/glaze/components/avatar.md): Shows who or what acted.
- [Progress](/systems/glaze/components/progress.md): Shows how far a task got.
