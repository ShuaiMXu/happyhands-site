# 自有品牌设计系统（Meridian）

四套系统已经换成我们自己的身份：名字、scope class、目录、import 路径、作者、字体托管、
安装地址全部指向自己的域名，配色也换成了品牌主色。

**改名 / 换色只改一个文件**：`brand.json`，然后重跑一条命令。

| 原系统 | 新系统 | 定位 | 文档 | registry 条目 |
|---|---|---|---|---|
| sodium | **meridian-mono** | 紧凑、有规则感，基础设施与数据工具 | 64 | 74 |
| glaze | **meridian-glass** | 黑白紧凑，AI 产品 | 76 | 87 |
| quartz | **meridian-slate** | 冷、静，AI 支持产品与 agent 控制台 | 68 | 83 |
| lime | **meridian-clay** | 白页暖灰，消费级应用 | 58 | 64 |

## 改了哪些

| 维度 | 改动 |
|---|---|
| 系统名 | `sodium` → `meridian-mono`、`Sodium` → `Meridian Mono`，含 `SodiumPortalProvider` → `MeridianMonoPortalProvider` 这类标识符 |
| scope | `.sodium` → `.meridian-mono`，`[data-system="sodium"]` → `[data-system="meridian-mono"]` |
| 目录 / import | `components/sodium/…`、`@/lib/sodium/…`、`registry/sodium/…` 全部跟着换 |
| 配色 | meridian-mono 与 meridian-clay 的品牌色族换成主色；玻璃与石板两套本来就是无品牌色（状态色 / kind 色），保持不变 |
| 字体 | 原先从原站 CDN 拉的两份 OFL 字体已下载到 `fonts/`，`@font-face` 指向自家地址 |
| 安装地址 | `registryDependencies`、`meta.docs/page`、文档里的 `npx shadcn add …` 都指向 `--base` |
| 作者 | payload 里的 `author` 改成 Meridian Design |

## 配色是怎么换的（重点）

不是简单替换色值，而是**保持每套系统的明度与 WCAG 亮度不变、只旋转色相**：

- 只动"品牌色族"（accent / primary / check / focus / data-1…），`--warn`、`--fail`、`--ok`
  这类语义色一个没碰——它们表示状态，不该跟着品牌走。
- 每个颜色都解到 OKLCH，换成品牌色相后**数值求解明度使相对亮度与原值一致**，再回到 sRGB。
  所以文档里写的对比度（比如"6.2:1 on the page"）**依然成立**。

实测校验：

| 系统 | 改动 token | 对比度最大偏移 |
|---|---|---|
| meridian-mono | 21 | 0.084 |
| meridian-clay | 11 | 0.010 |
| meridian-glass / slate | 0（无品牌色） | 0 |

最大偏移 0.084 小于文档里对比度的一位小数精度，所以原文的数值不需要改。

> 一句话说明这个方法的边界：它换的是"色相"，保留的是"浅底深字"这类结构。如果你要的是
> "深蓝实心按钮 + 白字"那种改法，那是换调性，得逐条重定语义角色和对比度——给我一个色值和
> 明度偏好，我按那个再跑一版。

## 目录

```
brand-systems/
├── brand.json                 品牌配置（名字、主色、作者、base）
├── systems.md                 四套系统总览
├── meridian-mono/
│   ├── index.md               系统总纲
│   ├── foundations/           9 篇
│   ├── components/            54 篇
│   ├── registry/              清单 + 74 个 install payload
│   └── src/registry/meridian-mono/   tokens.css · base.css · styles.css · ui/ · blocks/ · SKILL.md
├── meridian-glass/ slate/ clay/     同上
└── fonts/<system>/*.woff2     自托管字体
```

## 怎么改

```bash
# 1. 改 brand.json 里的 name / accent / base，或直接改脚本里的 build_config
# 2. 重跑
python3 ../pipeline-dhow/rebrand.py --base https://registry.yourdomain.com
python3 ../pipeline-dhow/selfhost.py --src ../brand-systems --base https://registry.yourdomain.com --out ../brand-registry
```

安装：

```bash
npx shadcn@latest add https://registry.yourdomain.com/r/meridian-mono/button.json
```

## 已验证

- 用 shadcn CLI 4.23 真装了一遍：`meridian-mono/button` 落 8 个文件到
  `components/meridian-mono/…`、`lib/meridian-mono/…`、`.claude/skills/meridian-mono/`，
  import 是 `@/lib/meridian-mono/utils`，scope 是 `.meridian-mono`。
- 308 个 payload、1269 条依赖边全部落在包内（`check.py`）。
- 全库已无原站地址；旧系统名只保留在 `brand.json` 的重命名映射里。
