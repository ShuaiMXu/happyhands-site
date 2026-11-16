---
name: apple-hig
description: Apple Human Interface Guidelines 全量规则。在生成 iOS/iPadOS/macOS/visionOS 界面、判断 Apple 平台交互模式（弹层、导航、控件、无障碍）时使用。
---

# Apple HIG

## 何时用
- 目标端是 iOS / iPadOS / macOS / watchOS / visionOS
- 需要判断「该用 Sheet 还是 Popover」「导航层级怎么切」
- 做 Apple 平台的评审基线

## 怎么用
1. 先按关键词在 `docs/` 里定位页面（文件名即路径，`_` 是层级分隔）
2. 读对应 md：每条规范都带「为什么」和平台差异
3. 与 `platform-systems/material3` 并列时：HIG 定交互判断，M3 给 token 值

## 边界
- HIG 不含 token，也没有代码；数值是参考区间
- 不同平台（iOS vs macOS）规则常相反，先确认目标平台
