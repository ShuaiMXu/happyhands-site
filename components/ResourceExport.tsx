import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountResourceExport } from './ResourceExport.solid';

export type { ExportFile } from './ResourceExport.solid';

export function ResourceExport(props: Parameters<typeof mountResourceExport>[1]) {
  return <SolidControlHost mount={mountResourceExport} value={props} />;
}
