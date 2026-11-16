# Material 3 设计系统（可调用版）

> Google Material Design 3 的 token 与规则，供 agent 在生成 Android / Compose / 跨端界面时调用。

## 调用方式

```bash
# agent 读这份 + tokens.json 即可生成符合 M3 的界面
cat platform-systems/material3/DESIGN.md
cat platform-systems/material3/tokens.json | jq '.["--md-sys-color-primary"]'
```

## Token 分组

- **sys**：370 个
- **ref**：85 个

## 核心规则

1. **只用 token，不写裸值**：颜色取 `--md-sys-color-*`，字号取 `--md-sys-typescale-*`，圆角取 `--md-sys-shape-*`。
2. **语义优先**：`primary` 用于主行动，`surface` 用于承载面，`on-*` 是对应前景色；不要用 `primary` 当背景又配白字而不查 `on-primary`。
3. **深浅两套**：M3 的 token 在 light/dark 下取值不同，切换主题只换 token，不改组件。
4. **动态取色**：Android 12+ 可从壁纸生成 tonal palette，此时 `--md-ref-palette-*` 会被替换，组件仍只读 `--md-sys-*`。
5. **高度用 tonal elevation**，不是阴影堆叠：surface 随层级调 tone，而不是加 blur。

## 目录

```
platform-systems/material3/
├── DESIGN.md        本文件（规则）
├── SKILL.md         agent skill 入口
├── tokens.json      455 个 token
└── tokens.css       原始 CSS（可直接引）
```
