# 自托管设计系统 registry

从 design.how 的四套系统整理而来，**所有安装地址都已指向 `http://localhost:8080`**，
不再依赖原站。整个目录是纯静态文件，丢到任意静态托管即可用。

## 包里有什么

```
registry-own/
├── r/<system>/<item>.json     安装 payload（308 个）
├── r/<system>/registry.json   该系统条目清单
├── systems/<system>/…         规则文档 .md（基础规范 + 组件页）
├── index.json                 目录
└── README.md
```

改写了三类字段，全部从 `https://design.how` 换到 `http://localhost:8080`：

| 字段 | 原来是 | 现在是 |
|---|---|---|
| `registryDependencies[]` | 绝对 URL 指向原站 | 绝对 URL 指向本包 |
| `meta.docs` / `meta.page` | 原站页面 | 本包内的 `.md` |
| `docs`（自由文本） | 含原站安装命令 | 含本包的安装命令 |

组件源码、token、`files[].target` 未改动，所以安装后的目录结构和 import 路径与原来一致。

## 本地验证

```bash
cd registry-own && python3 -m http.server 8080
# 另开一个 shadcn 项目：
npx shadcn@latest add http://localhost:8080/r/glaze/button.json
```

已实测通过：单组件、跨系统组件、带依赖的复杂条目（如 quartz/chart 会带起 22 个文件）都能装，
命名空间模式也可用。

## 换成你们的域名

```bash
python3 ../pipeline-dhow/selfhost.py --base https://registry.yourdomain.com --author "你们的名字"
```

`--base` 换成线上域名后重新生成，包内所有 URL 跟着变。`--author` 可选，替换 payload 里的 author 字段。

## 两种安装方式

**1. 直接给 URL**（零配置）

```bash
npx shadcn@latest add https://registry.yourdomain.com/r/glaze/button.json
```

**2. 配命名空间**（推荐，装起来短）

在项目的 `components.json` 里加：

```json
{
  "registries": {
    "@glaze": "https://registry.yourdomain.com/r/glaze/{name}.json"
  }
}
```

之后：

```bash
npx shadcn@latest add @glaze/button
npx shadcn@latest add @glaze/theme      # token + base + styles
```

依赖会自动解析，不需要手动按顺序装。

## 自检

```bash
python3 ../pipeline-dhow/check.py --base http://localhost:8080
```

会校验每个 payload 的 JSON 结构、依赖闭包（每条 `registryDependencies` 在包内是否存在）、
`meta.docs` 链接是否可落地。

## 说明

- 系统名（sodium / glaze / quartz / lime）保持原样，因为文档、`SKILL.md`、导入路径里到处都是这些名字；
  要连命名一起换掉，需要连带改写源码与文档，那是另一轮工作。
- 设计系统本身由 design.how 制作发布，自托管/二次分发前请确认其许可与署名要求；
  `--author` 改的是 payload 元数据，不改变作品归属。
