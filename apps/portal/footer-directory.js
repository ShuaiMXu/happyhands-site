import { repositories } from './content.js';

// Public directory content only; research and candidate metadata stay out of the bundle.
// One guide list: the footer is the only place the site keeps these links, so a page
// never shows the same guidance twice.
export const footerDirectory = [
  { kind: 'guide', href: '/guide/', zh: '快速开始', en: 'Getting started' },
  { kind: 'guide', href: '/ai-website-design/', zh: '设计工作流', en: 'Design workflow' },
  { kind: 'guide', href: '/ai-ui-review/', zh: '界面审查', en: 'Interface review' },
  { kind: 'guide', href: '/ai-ui-review/#ai-slop', zh: 'AI Slop 检查', en: 'AI slop review' },
  { kind: 'guide', href: '/nonprofit-website-design/', zh: '公益网站', en: 'Nonprofit review' },
  // Setup has no English page yet, so it always points at the Chinese route.
  { kind: 'guide', href: '/apps/setup/', zh: '接入详情', en: 'Setup details', localize: false },
  { kind: 'community', href: repositories.core, zh: '查看源码', en: 'View source' },
  { kind: 'cooperation', href: 'https://x.com/ShuaiXU13', zh: '在 X 关注我', en: 'Follow me on X' },
  { kind: 'friend', href: 'https://icons.kubai.design/', zh: 'Kubai Icons', en: 'Kubai Icons' },
  { kind: 'friend', href: 'https://collectui.com/', zh: 'CollectUI', en: 'CollectUI' },
  { kind: 'facts', href: '/llms.txt', zh: '产品信息摘要', en: 'Product facts', localize: false },
];
