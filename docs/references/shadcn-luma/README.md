# shadcn Luma reference

Generated 2026-10-30 with shadcn CLI from the user-selected command:

```sh
pnpm dlx shadcn@latest init --preset b1VlItwO --base radix --template vite --monorepo --pointer
```

The local pnpm Corepack launcher was broken, so the same CLI and options were run with npm in `/tmp/happyhands-preset-reference`. The generated Vite monorepo is a reference, not a replacement for this existing multi-entry application.

Preset: radix-luma, Neutral base/theme/chart colors, Inter, Lucide, medium radius, subtle/default menus. `preset.json` records the official init response. `components.json` and the text source files preserve generated configuration and Button/Input/Card reference implementations. Source: https://ui.shadcn.com/create?preset=b1VlItwO&item=preview and https://github.com/shadcn-ui/ui .

HappyHands adaptations: 400 interface weight, 0.5px borders, minimum 44px controls, no text-link underlines, restrained elevation. Shared owned controls now use the official component sources in `packages/ui/shadcn`. The standalone preview/export embeds the same React/shadcn Button, Input and Card implementation. See `docs/audits/shadcn-page-integration.md` for per-page coverage and remaining scope.

Neutral colors, Inter and shape roles are shared through canonical tokens; brand/status extensions remain. Existing drafts and source reference previews are not recolored. Lucide source is covered by the included license. Inter is self-hosted under `public/fonts/inter/LICENSE.txt`.

Known source contrast limitation: the exact preset light muted foreground on muted background is about 4.34:1, below the ordinary-text 4.5:1 threshold. Studio continues to report this instead of marking the preset fully accessible.
