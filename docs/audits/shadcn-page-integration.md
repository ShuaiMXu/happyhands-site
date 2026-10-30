# shadcn 页面接入

2026-10-30，用户明确要求所有列出的页面接入。尚未发布。

| 页面 | 实际接入 |
| --- | --- |
| 项目设计系统 / 主题工作室 | Button、Input、Textarea、Checkbox、Select、Tooltip；组件示例使用 Card、Badge、Switch、Dialog |
| Design.md | 搜索 Input、Popover + Command 筛选、Card 参考卡片、Tabs 预览/文件及 Button 下载 |
| 设计系统目录与详情 | 同一资源页组件；HappyHands 自身规范页、场景、变量表使用共享表单和操作组件 |
| 组件库 | 同一 Card、搜索筛选、共享按钮；第三方 iframe 示例保留来源实现 |
| 接入详情 | React 页面，Button、Input、Textarea、Card、Accordion 及共享 SiteHeader；完整提示词和本地交接保留 |
| 首页 | 共用资源筛选组件；无限流继续保留；主题工作室和接入详情仍为独立页面入口 |

官方来源为 shadcn b1VlItwO / radix-luma；组件由官方 CLI 生成，保存在 packages/ui/shadcn，保留 MIT 授权。除导入路径、命名空间样式适配外保留官方组件结构。使用 sc: utility 前缀，不把全局 Tailwind reset 注入旧页面和第三方样例。用户的 400 字重、0.5px 边框、44px 触达和无文案下划线规则继续生效。

预览与 HTML 导出都运行同一份打包 React/shadcn 组件，无 CDN 依赖。三个独立配置/导出适配器与站内实际使用的组件数量分开统计。66 项目录并不表示 66 项均已支持独立配置导出。

颜色、文件和范围输入保留浏览器原生控件。旧草稿和外部设计源保持独立；复杂页面模板导出仍属后续计划。

## 验证结果

- TypeScript 与生产构建通过；23 项主题、桥接和组件导出测试通过。
- Design.md 搜索浮层输入“金融”后结果为 81 项，选择后关闭浮层。
- 设计系统详情的 Radix Tabs 正常切换到资料下载；文案链接无下划线。
- 工作室 Radix Select 可用键盘打开；真实 React Input 提交显示已保存。
- 实际下载的 card.html 独立打开后操作显示已完成操作。
- Dialog 支持 Escape；关闭后焦点返回打开按钮。
- 接入页 Accordion 展开后完整提示词仍为 580 字符，复制显示已复制；本地交接字段保持挂载以保留填写内容。
- 项目规范页 Checkbox 18×18px，标签行保留触达空间；切换后计数变为已选 2 项。
- 1440px 与 390px 布局截图位于工作区 verification/shadcn-pages；手机资源页、规范页、接入页和工作室未观察到横向溢出。

shadcn CLI 版本 4.23.0。旧浏览器自动化中使用 native selectOption 的脚本需随 Radix 选择器改为键盘/option 操作，本批关键路径通过 CUA 浏览器验证；不声称所有历史浏览器脚本已通过。

## 接入详情布局修正

提示词改为常驻、按全文高度展示，复制按钮与内容同组；接入卡片取消旧段落 margin 与 Card gap 的叠加。独立页面限定阅读宽度，工具选中态明确，辅助折叠模块后置。桌面与 390px 手机检查：提示词 580 字，clientHeight 与 scrollHeight 相等，页面无横向溢出，复制反馈正常。证据：verification/shadcn-pages/setup-layout-desktop.png 与 setup-layout-mobile.png。

接入页展开态补充走查：清除流程区继承的 70px 顶部 margin、Accordion 双层内边距和固定内容高度；补齐项目连接双栏/单栏布局、步骤序号、可选字段和 FAQ。1280px 桌面、687px 反馈尺寸和 390px 手机均检查展开内容；手机所有展开面板 clientHeight=scrollHeight，无横向溢出；补充配置 Enter 收起/展开正常。保留 hidden 的记录链接隐藏行为。证据 setup-expanded-desktop.png、setup-expanded-687.png、setup-expanded-mobile.png。

## 资源筛选状态补查

ArchiveFilter 改用 Radix data-state 展开样式；分别表达已应用筛选、打开浮层与键盘焦点。移除手动重复勾选，使用 CommandItem data-checked 的单一标记，并在重开时将活动项定位到已选值。保留键盘焦点环，指针操作不残留焦点圈；窄屏按钮保留 12px 内边距，浮层保留 16px 屏幕边距。
验证 Design.md 极简 200 项、清空 1342 项、搜索空态、Escape 返回触发器和 Space 打开；组件库按钮 11 项；设计系统搜索 Quartz 1 项。检查浅/深色、1280/687/390px。类型检查与构建通过。截图 filter-states.png、filter-desktop.png、filter-mobile.png。本次覆盖资源浏览控件，不代表其他功能全部复核。
