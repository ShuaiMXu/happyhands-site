---
name: Error state
system: lime
kind: component
import: "import {ErrorState} from '@/components/lime/ui/error-state'"
install: "npx shadcn@latest add https://design.how/r/lime/error-state.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/error-state
---

# Error state

Says what failed to load, in its place, and offers Try again.

## Use when
- A list, card or figure failed to load, and loading it again may work.
- Part of a screen failed while the rest works, such as the balance (layout="inline").

## Don't use when
- The load worked and there is nothing yet. Use [Empty](/systems/lime/components/empty.md).
- Still loading. Use [Skeleton](/systems/lime/components/skeleton.md).
- A value the person typed is wrong. Use [Field](/systems/lime/components/field.md).
- A payment failed. Show it on the payment with its own status. Use [Status](/systems/lime/components/status.md).

## Minimal example
```tsx
<ErrorState title="Couldn't load your activity" description="Your money is safe. Try again."
  onRetry={reload} retrying={reloading}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. error-state-in-place MUST Put it where the content would be, in the region that was loading, never as a toast or a dialog. Because a toast leaves a blank region behind and fades before the person can retry.
2. error-state-say-what MUST Name what failed in the title, plainly, without a code or blame. Because a code says nothing about which money is missing or whether to wait.
   - Correct: `title="Couldn't load your activity"`
   - Wrong: `title="Error 503"`
3. error-state-retry-pending MUST Pass retrying while the load runs, so Try again shows its spinner and keeps focus. Because without it the press shows no sign the load restarted and invites a second press.
   - Correct: `<ErrorState onRetry={reload} retrying={reloading} .../>`
4. error-state-reassure SHOULD Use description to say what is safe or what to do, such as Your money is safe.
5. error-state-inline-small SHOULD Use layout="inline" for a part of a screen and block for a whole list or card.
6. error-state-no-lime NEVER Make Try again the lime primary; it stays secondary. Because a lime retry takes the glow from the screen's one real next step.
   - Correct: `<ErrorState title="Couldn't load your cards" onRetry={reload}/>`
   - Wrong: `<p>Couldn't load your cards</p><Button onClick={reload}>Try again</Button>`
7. error-state-busy-region SHOULD Keep aria-busy on the region while retrying, as for the skeleton.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `title` | `string` | `required` | What failed. |
| `description` | `string` |  | What is safe, or what to do. One sentence. |
| `onRetry` | `() => void` |  | Runs the load again. Without it, no button. |
| `retrying` | `boolean` |  | Try again shows its spinner. |
| `retryLabel` | `string` | `'Try again'` | The button label. |
| `layout` | `'block' \| 'inline'` | `'block'` | Centred in a region, or one row. |
Other props pass through to the root element.

## Variants and states
- layout: block, inline
- retry: with, without
- states: failed, retrying

## Accessibility
- [ ] It is role="status", a polite live region, so the failure is read without cutting off speech.
- [ ] The icon is hidden; the title carries the meaning, so color is never the only signal.
- [ ] Try again is a real button that keeps focus while retrying (pending).
- [ ] Error text is 6.6:1 on the page; the icon sits on the danger tint.

## Edge cases
- Long title -> Wraps; inline keeps the button on the row and the text shrinks.
- Retry fails again -> retrying goes false and the same state stays; after a few tries, say to come back later.
- Offline -> Say so in description; Try again works once the connection is back.
- No retry possible -> Leave out onRetry and say what to do in description.

## Tokens
--danger-text, --danger-tint, --fg, --fg-2, --text-lg, --control-lg, --surface-2

## Related
- [Empty](/systems/lime/components/empty.md): An empty state with one action, such as Add a card.
- [Skeleton](/systems/lime/components/skeleton.md): Still grey shapes in place of content that is loading, such as recent activity.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Toast](/systems/lime/components/toast.md): A short note after an action, such as Moved $50 to savings, with an optional Undo.
