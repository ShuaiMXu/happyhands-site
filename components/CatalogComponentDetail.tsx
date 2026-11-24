import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountCatalogComponentDetail } from './CatalogComponentDetail.solid';

export function CatalogComponentDetail(props: Parameters<typeof mountCatalogComponentDetail>[1]) {
  return <SolidControlHost mount={mountCatalogComponentDetail} value={props} />;
}
