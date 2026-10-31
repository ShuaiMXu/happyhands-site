# Luma 与组件框架首批验证

2026-10-30，本地预览，尚未发布。

- 同参数生成官方 Radix/Vite/monorepo/pointer 参考工程；源配置保存在 docs/references/shadcn-luma。
- TypeScript 检查通过；Vite 构建通过（已有第三方 use client 和包体积提示）。
- component-framework、studio-core、studio-bridge 共 23 项测试通过。
- owned UI 静态审计 22 文件、5 项既有例外、0 新发现；不代表完整无障碍验收。
- 浏览器验证 Input 输入并提交显示已保存；配置刷新恢复；此前验证 Mercury 创建独立项目和 Button 操作反馈。
- 工作室及首页 1440px/390px 检查，未观察到页面横向溢出。设计系统手机宽度 390px，文案、字体、圆角及 token 表同步。
- 截图位于工作区 verification/luma：studio-desktop.png、studio-mobile.png、home-desktop.png、home-mobile.png、system-desktop.png、system-mobile.png。
- 精确预设 light muted 对比度 4.34:1，保留真实提示。
- 仍需后续逐项实现 Radix 组件、纯 Markdown 上传、更多来源字体还原、React 导出和完整键盘状态矩阵。本批三项组件为原生实现，不能称作全量 66 项已完成。
