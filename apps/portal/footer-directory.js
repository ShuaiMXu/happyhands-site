import { repositories } from './content.js';

// Public directory content only; research and candidate metadata stay out of the bundle.
export const footerDirectory = [
  { kind: 'resource', href: '/components/?provider=design-md', zh: 'Design.md', en: 'Design.md' },
  { kind: 'resource', href: '/components/?provider=systems', zh: '设计系统', en: 'Design systems' },
  { kind: 'resource', href: '/components/?provider=cult-ui', zh: '组件库', en: 'Components' },
  { kind: 'resource', href: 'https://collectui.com/', zh: 'CollectUI 灵感目录', en: 'CollectUI inspiration' },
  { kind: 'community', href: repositories.core, zh: '查看源码', en: 'View source' },
  { kind: 'community', href: 'https://x.com/ShuaiXU13', zh: '在 X 关注我们', en: 'Follow us on X' },
  { kind: 'cooperation', href: 'https://x.com/ShuaiXU13', zh: '到 X 联系', en: 'Contact us on X' },
  { kind: 'friend', href: 'https://icons.kubai.design/', zh: 'Kubai Icons', en: 'Kubai Icons' },
];
