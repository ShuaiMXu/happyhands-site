# Website Design System 归档

每个条目都保存了页面布局截图、滚动预览视频、完整的 **DESIGN.md**，以及配套的
**Tailwind v4 主题 / CSS Variables / Design Tokens** 导出。

- 条目数：**1341**，七类文本产物齐全的：**1341**，含滚动预览视频的：**1341**
- 主题分布：light 915 · dark 293 · mixed 133
- DESIGN.md 总量：**26.2 MB**，预览视频总量：**4.52 GB**
- 生成时间：2026-11-02 17:15 CST

## 目录结构

```
design-archive/
├── styles/<站点名>-<id 前 8 位>/
│   ├── design.md              # DESIGN.md（extended / 默认视图）
│   ├── theme.css              # Tailwind v4（@theme）
│   ├── variables.css          # CSS Variables（:root）
│   ├── tokens.json            # Design Tokens（W3C DTCG 格式）
│   ├── design-system.json     # Design JSON（结构化设计系统）
│   ├── raw-result.json        # 原始提取结果
│   ├── prompt.txt             # 导出集合中的固定项（该字段普遍为空快照）
│   ├── compact/               # 同一套产物的 compact 精简版
│   │   ├── design.md
│   │   ├── theme.css
│   │   ├── variables.css
│   │   └── tokens.json
│   ├── screenshot.jpg         # 1440×900 页面布局截图
│   ├── thumbnail.jpg          # 卡片缩略图
│   ├── preview.mp4            # 滚动预览视频
│   ├── preview-poster.jpg     # 视频首帧封面
│   ├── result.json            # 该站点完整提取数据（meta / raw / designSystem）
│   └── meta.json              # 索引用的精简元数据
├── index.csv                  # 全量索引（名称 / 域名 / 主题 / 行业 / 字体 / 色板 / 路径）
├── index.json                 # 同上，JSON 版
├── gallery.html               # 本地可打开的缩略图画廊（支持搜索过滤）
├── errors.json                # 抓取失败清单（正常为空）
└── errors-videos.json         # 视频下载失败清单（正常为空）
```

## 素材地址

截图、缩略图、滚动预览视频、首帧海报全部在本地，`meta.json` / `result.json` / `design-system.json`
里引用的地址统一指向 `https://assets.example.com/styles/<slug>/<file>`：

| 文件 | 路径 |
|---|---|
| 布局截图 | `/styles/<slug>/screenshot.jpg` |
| 卡片缩略图 | `/styles/<slug>/thumbnail.jpg` |
| 滚动预览 | `/styles/<slug>/preview.mp4` |
| 视频首帧 | `/styles/<slug>/preview-poster.jpg` |

换 CDN 只要重跑一次，`styles/` 目录按原样上传即可，路径不用改：

```bash
python3 ../pipeline/sanitize.py --base https://cdn.yourdomain.com
python3 ../pipeline/build_index.py
```

## 格式体检（官方 `@google/design.md` linter）

对 1341 份 design.md 跑了一遍官方 linter：

- **0 个 error**
- 但 **1341 份全部命中一条 warning**：`No YAML content found` —— 这批文件是纯 Markdown 正文，
  没有 YAML front matter 里的 token 声明。

这不是坏文件，而是两种不同的 DESIGN.md 写法：refero 输出的是「页面实测结果 + 设计意图」的散文，
token 写在正文表格和 CSS 变量代码块里；Google 规范那套则要求顶部有一段机器可读的 YAML。
两者 agent 都能读，但**机器解析 token 的场景**（对比度校验、导出 DTCG、diff 回归）只有后者能跑。

如果要在后面接 lint / export，可以拿 `tokens.json` 反向生成一份带 YAML 的版本 —— 数据都在，只是格式。

## 怎么用

按需挑风格，把目录里的文件直接丢给编码 Agent：

```bash
# 只带 DESIGN.md
cat styles/linear-xxxx/design.md

# 带 Tailwind 主题 / CSS 变量 / tokens
cat styles/linear-xxxx/theme.css
cat styles/linear-xxxx/variables.css
cat styles/linear-xxxx/tokens.json
```

看整体效果：浏览器打开 `gallery.html`（缩略图 + 搜索过滤），或直接播放各目录下的 `preview.mp4`。

## 说明

- `design.md` / `theme.css` / `variables.css` / `tokens.json` 等产物由站点自身的导出逻辑
  在同一份提取数据上生成，与页面上「Download / Copy」得到的内容一致
  （已逐字节比对 DESIGN.md 验证）。
- `preview.mp4` 是对应站点的滚动预览录屏，`preview-poster.jpg` 为其首帧。
- `prompt.txt` 是导出菜单里的固定一项，本批条目未保存 prompt 快照，保留它只为对齐导出集合。
- 每个条目的 `result.json` 保留了完整原始数据，可据此自行再生成任意格式。

## 重新抓取 / 复现

流水线在仓库同级目录 `../pipeline/`：

```bash
cd ../pipeline
python3 crawl.py --workers 8                              # 抓取页面数据 + 截图
node render_all.js generators.js ../design-archive/styles # 生成 7 类文本产物
python3 videos.py --workers 8                             # 补滚动预览视频
python3 build_index.py                                    # 重建索引 / 画廊 / 本 README
```

- `generators.js` 是负责导出 DESIGN.md / Tailwind / CSS Variables / Tokens 的前端模块，
  `render_all.js` 在 Node 里直接调用它，因此输出与页面上的「Download / Copy」逐字节一致。
- 若页面结构变化，从详情页重新取一份包含 `generateDesignMd` 的脚本覆盖 `generators.js` 即可。
