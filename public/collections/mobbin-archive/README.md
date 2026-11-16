# Mobbin 公开文档归档

> Mobbin 是最大的 App 屏幕与流程参考库，但**屏幕本身在付费墙后**，且官方通过 MCP / REST API 提供，不提供网页抓取。
这里存的是它对 agent 公开的那部分。

## 抓到了什么 / 没抓什么

| 项 | 状态 |
|---|---|
| `llms.txt` / `llms-full.txt` | ✅ 已存，产品全貌 + agent 使用指引 |
| `index.md` / `mcp.md` / `colors.md` / `pricing.md` | ✅ 已存 |
| 屏幕截图、流程、App 目录 | ❌ 需要登录 / Pro 订阅，走 MCP 或 REST（rate limit 60 req/min） |

## 官方给 agent 的两条路

1. **MCP**（Streamable HTTP + OAuth，Pro/Team/Enterprise）：`search_screens` / `search_flows` / `search_sections`，还能读写用户收藏
2. **REST API**（workspace bearer key，Team/Enterprise）：可编程检索屏幕

## 我们能拿它干什么

- 需要 App 屏幕素材时，接 MCP（有账号），而不是抓网页
- `colors.md` 里有 Mobbin 自己整理的配色方法，可当参考

## 说明

robots.txt 对 `*` 是 `Allow: /`，但对 AI 爬虫（GPTBot）只开 `.md` 文档、其余 `Disallow: /` —— 这批公开 .md 就是它愿意被读的部分。