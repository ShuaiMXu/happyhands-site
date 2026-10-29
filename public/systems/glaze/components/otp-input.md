---
name: OTP input
system: glaze
kind: component
import: "import {OtpInput} from '@/components/glaze/ui/otp-input'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/otp-input.json"
registryDependencies: [field, input, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/otp-input
---

# OTP input

Takes a one-time code.

## Use when
- A short code sent to the person or shown by an app: a sign-in code, a device pairing code.

## Don't use when
- A password or an API key. Use [Input](/systems/glaze/components/input.md).
- A quantity. Use [Number input](/systems/glaze/components/number-input.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Code from your authenticator</FieldLabel>
  <OtpInput length={6} onComplete={verify}/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. otp-input-length MUST Set length to the code's exact length. Because onComplete fires when the last slot fills, so a slot too many never completes and one too few cuts the code.
   - Correct: `<OtpInput length={6}/>`
   - Wrong: `<OtpInput length={8}/> // a 6-digit code`
2. otp-input-complete SHOULD Verify in onComplete rather than behind a Continue button. Because a pasted or autofilled code is done the moment it lands, and a button adds a press for nothing.
   - Correct: `<OtpInput length={6} onComplete={verify}/>`
3. otp-input-label MUST Name it with a Field and FieldLabel, or aria-label, saying where the code comes from. Because the slots are named only by their position, so nothing says which code goes in.
   - Correct: `<Field><FieldLabel>Code from your authenticator</FieldLabel><OtpInput length={6}/></Field>`
   - Wrong: `<OtpInput length={6}/>`
4. otp-input-error MUST On a wrong code, set aria-invalid and say why in a FieldError; keep the code in the slots. Because clearing the slots throws away what the person typed and leaves them guessing which digit was wrong.
   - Correct:
     ```tsx
     <OtpInput aria-invalid={wrong}/>
     <FieldError>That code has expired. Send a new one.</FieldError>
     ```
   - Wrong: `onComplete={c => !ok(c) && setCode("")}`
5. otp-input-one-field NEVER Build a code from separate Inputs, one per character. Because separate fields lose the paste of a whole code, the step back on Backspace and the phone's one-time-code autofill.
   - Correct: `<OtpInput length={4}/>`
   - Wrong: `{[0, 1, 2, 3].map(i => <Input key={i} maxLength={1}/>)}`
6. otp-input-no-squares NEVER Square off the slots with a radius class. Because each slot is a one-character field, and every one-line field in Glaze is a pill.
   - Correct: `<OtpInput/>`
   - Wrong: `<OtpInput className="[&_input]:rounded-tag"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `length` | `number` |  | The slots. Required. |
| `value, defaultValue, onValueChange` | `string` | `''` | The characters so far. |
| `onComplete` | `(code) => void` |  | When the last slot fills, typed or pasted. |
| `groups` | `number[]` | `halves for 6 or 8` | Slots per group, split by a dash. |
| `validationType` | `'numeric' \| 'alpha' \| 'alphanumeric' \| 'none'` | `'numeric'` | What a slot takes. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px slots. |
| `aria-invalid` | `boolean` |  | Every line turns coral. |
Other props pass through to the root element.

## Variants and states
- size: sm, default, lg
- length: 4, 6
- states: empty, focus, filling, complete, invalid, disabled
- when states meet, the first wins: disabled > invalid > focus > filled > empty

## Accessibility
- [ ] The first slot carries the label; the others are named "Character 2 of 6" and so on.
- [ ] A rejected character is announced ("Digits only") in a status region.
- [ ] autocomplete="one-time-code" lets the phone offer a code from a message.
- [ ] The slots read left to right in every language, since a code is not words.

## Keyboard
- `A character`: Fills the slot and moves to the next.
- `Backspace`: Clears the slot, or the one before an empty slot.
- `Left, Right`: Move between slots.
- `Paste`: Fills every slot from a whole code.

## Edge cases
- Pasted code with spaces or a dash -> The characters that fit the type fill in order.
- Narrow screen -> Six 32px slots and the dash need 232px; use size="sm" below that.
- Wrong code -> The slots keep it, turn coral, and the FieldError says why.

## Tokens
--paper, --field, --line-control, --line-focus, --line-faint, --line-strong, --fail, --text-1, --text-disabled, --control-sm, --control, --control-lg, --radius-pill, --type-label, --dur-state

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
