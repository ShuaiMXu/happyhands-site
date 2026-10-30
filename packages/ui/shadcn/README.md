# HappyHands shadcn components

Official radix-luma sources generated with shadcn CLI on 2026-10-30, preset b1VlItwO, Radix, Vite, monorepo, pointer. MIT license included. Radix and cmdk own keyboard, focus and overlay behavior.

Local adaptations: imports resolve within this folder; cn prefixes recognized upstream utility classes with sc: to avoid collisions; JSX class strings also use cn. The build uses upstream state variants without a global preflight. adaptations.css preserves the user's 400 weight, 0.5px borders, 44px controls and no text underlines. Dialog close label is bilingual. Generated CSS and the Studio runtime are rebuilt with npm run ui:build.

The compatibility exports in packages/ui/index.tsx and Select.tsx preserve existing call sites while forwarding to these real implementations. Color/range/file browser widgets are intentional native exceptions. Imported reference previews remain independently styled.
