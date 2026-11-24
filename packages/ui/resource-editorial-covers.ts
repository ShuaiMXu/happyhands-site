const root = '/resource-covers';

export const systemCover = (id: string) =>
  id === 'happyhands' ? `${root}/happyhands-system.webp` : `${root}/systems/${id}.webp`;

const libraryCovers: Record<string, string> = {
  'beautiful-ui': '/collections/beautiful-ui/cover.webp',
  'pin-ui': `${root}/pinui-library.webp`,
  'motion-primitives': `${root}/motion-primitives.webp`,
};

export const componentLibraryCover = (id: string) => libraryCovers[id];

export function systemDocumentCover(row: { collection: string; path: string; system?: string }) {
  if (row.system && row.path.endsWith('/index.md')) return systemCover(row.system);
  if (row.collection === 'app-tokens') return systemCover(row.path.split('/')[2]);
  if (row.path === 'collections/platform-systems/material3/DESIGN.md') return systemCover('material3');
  if (row.path === 'collections/platform-systems/apple-hig/DESIGN.md') return systemCover('apple-hig');
  if (row.path === 'collections/mobbin-archive/index.md') return systemCover('mobbin');
  if (row.collection === 'beautiful-ui') return systemCover('beautiful-ui');
}

export function systemOfficialCover(path: string) {
  if (path === 'collections/platform-systems/apple-hig/DESIGN.md') {
    return 'https://developer.apple.com/tutorials/images/com.apple.HIG/human-interface-guidelines-page-image-card@2x.png';
  }
  if (path === 'collections/platform-systems/material3/DESIGN.md') {
    return 'https://design.google/_next/image?q=75&url=https%3A%2F%2Fstorage.googleapis.com%2Fgd-prod%2Fimages%2F9eb4679b-45ac-4202-9749-deae98c5b904.799a99c1196c2fd4.webp&w=1080';
  }
}
