# 平台官方规范 → 可调用的设计系统

把 Material 3 / Apple HIG 这类「官方规范」变成 agent 能用的东西，关键不是抓下来，而是**拆成三层**，
因为官方规范本身不是一种东西：

| 层 | Material 3 | Apple HIG | 我们的产物 |
|---|---|---|---|
| **值**（token） | ✅ CSS + 455 个变量 | ❌ 没有 token 文件 | `material3/tokens.json` |
| **判断**（rules） | 部分（组件规范） | ✅ 全是判断（何时用 Sheet） | `*/DESIGN.md` |
| **接口**（怎么被取用） | 无 | 无 | `*/SKILL.md` |

一句话：**M3 给值，HIG 给判断，我们补接口。**

## 怎么被调用：三种形态，从轻到重

### 1. 仓库内规则文件（最轻，0 依赖）

把 `DESIGN.md` 拷到项目根，在 `AGENTS.md` / `CLAUDE.md` / `.cursor/rules` 里写一行：

```md
UI 一律遵守 DESIGN.md；颜色/字号只从 tokens.json 取，不写裸值。
```

agent 每次生成前会读到它。适合单项目、单一系统。

### 2. Skill 包（推荐，可多系统并存）

```
platform-systems/material3/
├── SKILL.md      触发条件 + 怎么用 + 边界（agent 的入口）
├── DESIGN.md     规则
├── tokens.json   值
└── css/          原始样式
```

放进 skill 搜索路径（`~/.claude/skills/` 或项目 `.claude/skills/`），agent 按 `description` 自动决定是否加载。
好处：**按需加载**，不会把 173 篇 HIG 全塞进上下文；多套系统可以并存互不干扰。

### 3. MCP / Registry（团队级，最重）

把 token 和规则包成 MCP server 或 shadcn registry，agent 运行时按 prompt 检索：
- design.how：`npx shadcn add https://…/r/<system>/<item>.json`
- Better Design：MCP 6 个工具（匹配系统 / 取 token / 取组件代码 / UI 原则 / a11y / 图标）
- Mobbin：MCP + REST，检索屏幕与流程

适合多项目复用、需要版本管理和权限的场景。代价是要维护服务。

## 这批产物

```
platform-systems/
├── material3/            Material 3（455 token + 9 个 CSS）
│   ├── SKILL.md  DESIGN.md
│   ├── tokens.json  css/
└── apple-hig/            Apple HIG 全量 173 篇
    ├── SKILL.md  DESIGN.md（含索引）
    └── docs/             每篇一个 md，文件名即路径
```

## 落地建议

- **做 Android/跨端**：`material3` 直接可用，token 是现成的
- **做 iOS**：HIG 是判断库，配你自己的 token（Apple 不给）
- **两套并用**：HIG 定交互（该不该用这个控件），M3 定视觉（用什么值），冲突时以目标平台为准

## 局限（说清楚）

- **HIG 没有 token**：颜色/字号是「建议 + 语义」，取值要靠设计侧定，不能从文档里抽变量
- **HarmonyOS 未抓**：华为设计站没有 markdown 孪生，页面是 JS 渲染，需要单独解析（还没做）
- 官方规范都不含**业务页面结构**，那层只能来自截图库或自家稿子
