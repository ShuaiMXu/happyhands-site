// Public listing, navigation and static output share this rollout switch.
export const designMdCatalogEnabled: boolean = true;
export const isDesignMdProvider = (value: string | null) => value === 'design-md' || value === 'kage' || value === 'refero';
export const isDesignMdCollection = (value: string | null) => value === 'design-archive' || value === 'designmd-archive' || value === 'ottermind';
export const resourceSections = [
  { id: 'design-md', zh: 'Design.md', en: 'Design.md' },
  { id: 'systems', zh: '设计系统', en: 'Design systems' },
  { id: 'cult-ui', zh: '组件库', en: 'Components' },
].filter(({id}) => id !== 'design-md' || designMdCatalogEnabled);
export const resourceTools = [
  { id: 'setup', href: '/apps/setup/', zh: '接入详情', en: 'Setup details' },
];
