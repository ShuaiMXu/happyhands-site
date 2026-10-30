# 全站一致性优化回归

计划见 ../plans/site-experience-optimization.md。本轮为自有 UI 基础一致性和可恢复流程优化，未发布。

## 实施与验证

- 资源搜索布局从 resource-presentation 移入 resource-controls；首页和目录共用。分类可换行，390px结果计数独立一行。
- Select 补齐长文本边界、16px固定箭头；Accordion 去除默认 h3 margin、固定内容高度，统一细边框和无文字下划线。
- Design.md 无结果增加清除筛选，实测恢复1342条。
- ResourceExport 增加失败重试，空文件集合不发起无效请求。正常 HappyHands SKILL.md 已实测加载；本轮未模拟服务端失败，重试分支未声称浏览器通过。
- 官网类型检查、Vite构建通过；23项组件框架/主题/桥接测试通过。
- 核心 Harness design:check 和独立评审29项测试通过，新rubric会进入诊断与QA上下文。

## 浏览器覆盖

390px：Design.md/组件库列表、设计系统导航与HappyHands资料详情，无横向溢出；Design.md搜索无结果后清除恢复。
768px：英文资料详情及中文接入页，页面无横向溢出；接入项目与FAQ展开面板clientHeight等于scrollHeight。
1280px：首页Hero和无限流、工作室；主题预设长菜单正常；Escape关闭；工作室正文计算字号为12/14/32px（排除iframe）。浅深色均查看。

截图位于本机 /tmp/happyhands-verification/site-review/，不作为公开仓库资产提交。

## 明确限制

这不是1342份源材料或137个第三方组件的逐项验收，也未运行独立模型视觉QA或完整浏览器矩阵。沿用已批准Hero及玻璃页头例外，不把新的去冗余规范机械覆盖到第三方预览。历史测试中仍使用native selectOption的脚本需单独迁移。生产环境尚未更新。
