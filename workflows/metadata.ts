export type Workflow = 'review' | 'design';
export type Language = 'zh' | 'en';
export const workflowPaths = {review:'/ai-ui-review/',design:'/ai-website-design/'};
export const workflowMetadata = {
  "review": {
    "zh": [
      "AI UI Review / 设计审查与截图复核 / HappyHands",
      "用 HappyHands 将“AI 味”转成可复核的产品体验问题：结合截图、交互状态与项目规则进行设计审查，限定修复范围并对照前后结果。"
    ],
    "en": [
      "AI UI Review / Evidence-Based Design Review / HappyHands",
      "Review AI slop as concrete UI issues with HappyHands: check task clarity, hierarchy and interaction states against project rules, then compare scoped changes."
    ]
  },
  "design": {
    "zh": [
      "AI 网站设计 / 从生成初稿到界面优化 / HappyHands",
      "已经用 AI 做出网站？用 HappyHands 把初稿接入设计规范、组件参考与界面评审流程，限定修改范围并对照前后效果，而不是不断重新生成。"
    ],
    "en": [
      "AI Website Design / Improve AI-Generated UI / HappyHands",
      "Already built a website with AI? Use HappyHands to connect design rules, component references and UI review, make scoped improvements and compare the results."
    ]
  }
} as const;
