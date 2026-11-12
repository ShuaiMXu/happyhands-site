# Homepage motion verification

`tests/homepage-motion-browser.mjs` is a specialist evidence producer for the explicitly adopted HappyHands homepage-Hero profile. It writes real viewport PNGs and a `result.json` consumed by the existing Harness verification stage. It does not grant visual or human acceptance. Missing WebGL motion returns `needs-evidence`; a reproduced duplicate mark, overflow, hidden action, changed 189-cover count or runtime error returns `fail`. Do not substitute this result with the earlier reduced-motion smoke-test pass.

## Bound invocation

From this website checkout, the configured check uses the real after preview and the host's context:

```json
{
  "id": "hero-motion",
  "command": "node",
  "args": ["tests/homepage-motion-browser.mjs", "--url", "{url}", "--out", "{out}", "--context", "{context}"],
  "stage": "normal-interaction",
  "stateIds": ["hero-dark", "hero-light"],
  "method": "Observe actual WebGL draws and changed canvas pixels in every captured viewport, exercise pointer/scroll, reduced-motion, WebGL-unavailable/context-loss fallback and the language control.",
  "limitations": ["Chrome viewports and emulated preferences; independent source and original-image review still decides perspective, brand material, readability and true interaction quality."],
  "screenshots": ["frame-01.png", "frame-02.png", "frame-03.png", "frame-04.png", "frame-05.png", "frame-06.png", "frame-07.png", "frame-08.png", "frame-09.png", "frame-10.png", "frame-11.png", "frame-12.png"]
}
```

This example names four actual state/configuration contexts: both `hero-dark` and `hero-light` captured at desktop and phone dimensions. Replace `stateIds` with the real Capture Plan IDs. The host context must contain its bound after `states` with `stateId`, `configurationId`, integer `width`/`height`, `start`/`finalUrl` and observed `appearance.theme`. The script does not guess theme or viewport from a filename. The integrated core must supply these fields; older hosts without them require an explicit `--contexts FILE` declaration and a scope check against the real capture.

Each context needs two motion originals. Four supplemental originals cover preference change, unavailable WebGL, context loss and language switching, giving `2 × contexts + 4` declared filenames in the exact `frame-01.png` order. Use one to four contexts per run to preserve the twelve-image verification limit; do not silently omit contexts. Smaller runs must shorten the declared screenshot list accordingly. All normal desktop/phone contexts are inspected before the supplemental tests.

For a local engineering check without a bound Run, `--contexts FILE` accepts `{ "contexts": [...] }`, with each entry explicitly naming `stateId`, `configurationId`, `width`, `height`, `url`, `theme` and optional `lang`. Without either context argument the script examines fixed desktop/phone light/dark sample contexts. That standalone output does not establish a source-bound product repair.

## What the record establishes

`heroMotion.version` is 1. Every context retains its captured IDs, measured viewport, theme/language, real sample times and the indexes of its two distinct motion originals. A `motionObserved:true` context needs actual WebGL draw progression and changed canvas pixels in that context. Pointer events, scroll pause/resume and the single logo layer are recorded separately. Static theme pairs and desktop-only evidence cannot stand in for another context.

Fallback and language images are supplemental originals, with explicit roles and runtime checks. A failed page, missing context, missing motion, wrong route or failed preference/fallback check remains `fail` or `needs-evidence`. Inspect `result.json` and retained originals; do not infer success from process termination alone. The existing host must archive all declared PNGs and bind them to the actual after source and preview before independent QA can accept the record.

Context-loss verification separately records `contextLost` and `fallbackRecovered`. Firing the loss event does not establish recovery: an induced loss followed by a missing/empty fallback is `fail`, even when the page has no JavaScript exception. Preference-change and unavailable-WebGL checks also retain their failure and screenshot rather than turning a fallback timeout into missing evidence.

## Reproducible development originals

An explicit `?hh-capture-seed=CASE_ID` controls only the development cover shuffle. Use the same valid ID (letters, digits, hyphens or underscores, at most 80 characters) in both Capture Plans. It retains the original pool, 189 tiles, widths, positions and phase/speed model. Production ignores the parameter and ordinary development visits without it stay randomized. No global random function is replaced.

The primary Harness capture already uses reduced motion, so the same seed yields the same original covers at the static phase for matched before/after review. This is separate from the producer's actual running RAF/draw/pointer evidence. A seed neither freezes that motion nor establishes its quality. If an implementation replaces the renderer, it must retain this same development shuffle contract; selecting nicer different media cannot count as a repair.

The producer cannot certify aesthetic quality or all browsers. In particular, a pointer event and continued drawing do not by themselves isolate causal parallax. Independent review must inspect the actual camera/material implementation, complete original frames, foreground readability, preserved cover pool/orbit/scale, both themes and fallback composition. Randomized decorative covers must be controlled or explicitly recorded as a comparison limitation; replacing media is not a quality improvement.
