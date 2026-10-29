---
name: Activity
system: glaze
kind: component
import: "import {Activity, ActivityText, ActivityArc, ActivityGroup, Disclosure, StepGlyph, pastTense, joinSummary, pickActivity, useAntiFlicker, useHeldPhrase, splitForce, formatElapsed, formatCount, MIN_DISPLAY, activityVariants, rowVariants} from '@/components/glaze/ai/activity'"
install: "npx shadcn@latest add https://design.how/r/glaze/activity.json"
registryDependencies: [icon, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/activity
---

# Activity

Says what the agent is doing now.

## Use when
- A product without a thread shows one live line for an agent: "Searching docs", then "Searched docs".
- The first wait of a turn needs a loader that never flashes for a fast reply.
- A summary line should fold rows that came before.

## Don't use when
- The calls themselves, with their output. Use [Tool call](/systems/glaze/components/tool-call.md).
- Where a piece of work stands in a list or table. Use [Status](/systems/glaze/components/status.md).

## Minimal example
```tsx
<Activity waiting={!firstToken} {...toolActivity(calls)}/>
<ActivityGroup summary="Worked for 14s">{rows}</ActivityGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. activity-phrase MUST Write label as an -ing verb and its object, and pass active while the work runs. Because the done line is its past tense, so "Searching docs" settles into "Searched docs"; a noun has no past tense.
   - Correct: `<Activity label="Searching docs" active={running}/>`
   - Wrong: `<Activity label="Docs search" active/>`
2. activity-waiting MUST Use waiting for the first gap of a turn, before any token, reasoning or call. Because it waits 150ms before it shows and holds 400ms once shown, so a fast reply never flashes a loader.
   - Correct: `<Activity waiting={!firstEvent}/>`
   - Wrong: `{loading && <Activity label="Thinking" active/>}`
3. activity-from-calls SHOULD Feed it from a turn's calls with toolActivity(calls) rather than hand-picking a phrase. Because it follows the newest running call, never headlines a failure, and settles on a summary like "Edited 3 files, 1 failed".
4. activity-status-words MUST Pass status="warn" or "fail" when the work ended badly; never colour the label yourself. Because the word in its status colour is what survives grayscale, forced colours and a screen reader.
   - Correct: `<Activity doneLabel="Refunded 2 orders" status="fail"/>`
   - Wrong: `<Activity doneLabel="Refund failed" className="text-fail-text"/>`
5. activity-one-region SHOULD Set announce={false} inside a Conversation. Because the thread announces the turn's end itself, and two regions read the same news twice.
6. activity-no-spinner NEVER Add a spinner or animated dots of your own; the pending arc is the only loop. Because Glaze has one loop, and it stands still under reduced motion while the word still says running.
   - Correct: `<Activity waiting/>`
   - Wrong: `<span className="animate-pulse">Thinking…</span>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | The -ing phrase. While waiting, defaults to "Thinking". |
| `active` | `boolean` | `false` | Work runs now. |
| `waiting` | `boolean` | `false` | The first-wait loader. |
| `doneLabel` | `string` | `past tense of label` | The finished phrase or turn summary. |
| `status` | `'ok' \| 'warn' \| 'fail' \| 'stopped'` | `'ok'` | warn and fail add their word. |
| `size` | `'default' \| 'sm'` | `'default'` | 13/500 label or 13 body text. |
| `minDisplay, settle, delay, minLoader` | `number` | `1000, 400, 150, 400` | Ms a phrase holds, the wait before done, before the loader, and the loader's least time. |
| `announce` | `boolean` | `true` | Owns a polite region for the settled phrase. |
| `ActivityGroup summary, meta, live, size` | `ReactNode, ReactNode, boolean` |  | A line that opens the rows it stands for. |
| `StepGlyph state` | `'running' \| 'done' \| 'fail' \| 'stopped'` |  | The 16px state cell of a step. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- group: closed, open
- step: running, done, fail, stopped
- states: waiting, active, done, warned, failed, stopped, hover
- when states meet, the first wins: waiting > active > done

## Accessibility
- [ ] One polite status region reads the loader's label and the settled phrase; live phrases are not read.
- [ ] The arc is aria-hidden; aria-busy is set while waiting or active.
- [ ] Warn and fail add their word, never colour alone.
- [ ] An ActivityGroup line is a button with aria-expanded.

## Edge cases
- A burst of phrases -> Each holds 1s; ones that arrive in between are skipped.
- A tool ends and the next starts -> The 400ms settle reads them as one live line.
- Reply in 80ms -> The loader never shows.
- Summary already says "1 stopped" -> The end word is not read twice.
- Reduced motion -> The arc stands still.

## Tokens
--type-label, --type-body-sm, --text-1, --text-2, --text-3, --fail-text, --warn-text, --hover, --radius-tag, --control, --dur-spin, --wait-show, --wait-hold

## Related
- [Tool call](/systems/glaze/components/tool-call.md): Shows one tool an agent called.
- [Status](/systems/glaze/components/status.md): Says where a piece of work stands.
- [Reasoning](/systems/glaze/components/reasoning.md): Shows what the model thought before answering.
