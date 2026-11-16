# Meridian registry（自托管）

`npx shadcn@latest add <base>/r/<system>/<item>.json`

四个系统：`meridian-mono` · `meridian-glass` · `meridian-slate` · `meridian-clay`，
共 308 个条目。包内所有安装地址、依赖、文档链接都指向 `http://localhost:8080`（当前 base）。

## 本地跑

```bash
cd brand-registry && python3 -m http.server 8080
# 另开终端，在 shadcn 项目里：
npx shadcn@latest add http://localhost:8080/r/meridian-mono/button.json
```

## 上线

```bash
python3 ../pipeline-dhow/rebrand.py   --base https://registry.yourdomain.com
python3 ../pipeline-dhow/selfhost.py  --src ../brand-systems --base https://registry.yourdomain.com --out ../brand-registry
```

然后整目录静态托管即可。`fonts/` 必须一起发，`tokens.css` 里的 `@font-face` 指向
`<base>/fonts/<system>/…`。

## 命名空间用法

`components.json`：

```json
{"registries": {"@mono": "https://registry.yourdomain.com/r/meridian-mono/{name}.json"}}
```

```bash
npx shadcn@latest add @mono/button
```
