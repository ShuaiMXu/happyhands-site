import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountResourceSearch } from './ResourceSearchCard.solid';

export type { SearchResult } from './resource-search-keydown';

export function ResourceSearchCard(props: Parameters<typeof mountResourceSearch>[1]) {
  return <SolidControlHost mount={mountResourceSearch} value={props} />;
}
