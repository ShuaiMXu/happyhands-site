---
name: material3
description: Google Material Design 3 设计系统。在生成 Android、Compose、跨端 Material 界面，或需要 M3 色彩/字体/形状/动效规范时使用。
---

# Material 3

## 何时用
- 目标端是 Android / Compose / Material You
- 需要 M3 的 tonal palette、动态取色、type scale
- 需要"官方标准"作为评审基线

## 怎么用
1. 先读 `DESIGN.md` 的规则
2. 从 `tokens.json` 取具体值（键名即 CSS 变量名）
3. 生成组件时只引用 token，不写死色值

## 边界
- M3 是**组件与 token 规范**，不含业务页面结构
- 动态取色会让实际色值与 tokens.json 不同，以 `--md-sys-*` 语义为准
