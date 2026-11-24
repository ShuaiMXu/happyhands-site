import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountArchiveFilter } from './ArchiveFilter.solid';

export type { FilterOption } from './ArchiveFilter.solid';

export function ArchiveFilter(props: Parameters<typeof mountArchiveFilter>[1]) {
  return <SolidControlHost mount={mountArchiveFilter} value={props} />;
}
