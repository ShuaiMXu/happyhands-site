# App 端设计 token 合集

把六套移动端设计系统的 **token 变量**从各自的发布包里抽出来，统一成一份可检索的产物。
不是看官网文档，是直接读包里的 CSS/SCSS —— 拿到的是工程里真正生效的那份值。

| 库 | 来源包 | token 数 | 样式文件 |
|---|---|---|---|
| nutui | @nutui/nutui | **751** | 7 |
| antd-mobile | antd-mobile | **159** | 250 |
| vant | vant | **712** | 153 |
| tdesign-mobile-vue | tdesign-mobile-vue | **230** | 11 |
| varlet | @varlet/ui | **1099** | 80 |
| material3 | material-foundation/material-tokens | **455** | 8 |

合计 **3406** 个变量。

## 为什么是这六套

覆盖国内主流移动端生态，而且都带完整设计变量：

- **nutui** — 京东，京东 APP 10.0 规范，含 5 套业务主题（default / jda / jdb / jddkh / jdt）
- **antd-mobile** — 蚂蚁，支付宝系 C 端
- **vant** — 有赞，电商 H5 / 小程序主流
- **tdesign-mobile-vue** — 腾讯
- **varlet** — Vue3 Material 风格
- **material3** — Google 官方 Material 3 token（CSS 版）

## 目录

```
app-tokens/
├── <库>/
│   ├── tokens.json        变量名 → 值（去重后的全量）
│   └── styles/…           原始 css/scss，保留主题与分组
├── material3/styles/…     M3 的 baseline/colors/elevation/motion/shape/state/typography
└── index.json             各库 token 数与文件清单
```

## 用法

```bash
cat app-tokens/nutui/tokens.json | head -40
grep -i "primary" app-tokens/nutui/tokens.json
```

想把某套库的主色换成自己的：

```css
:root {
  --nut-primary-color: #2f5cff;
  --nut-primary-color-end: #6b8cff;
}
```

NutUI 的变量都是 `var(--nut-xxx, fallback)` 形式，覆盖变量即可，不用改组件源码。

## 没抓到什么

- **Apple HIG** 没有 token 文件：设计资源是 Figma/Sketch 组件库 + SF Symbols，走 Apple 开发者协议，不能批量留存。
- **Mobbin / Page Flows / Screenlane** 是 app 截图与流程录屏库，前者付费、后两者对脚本 403。
- 这几套只覆盖 **组件库层**，不含业务页面结构与真实 App 截图。

## 说明

token 抽取自各库 npm 发布包（nutui 4.3.15-beta.1 / antd-mobile / vant / tdesign-mobile-vue / @varlet/ui / M3 CSS）。
各库许可见其仓库（多为 MIT）；变量名与值版权归各自团队。
