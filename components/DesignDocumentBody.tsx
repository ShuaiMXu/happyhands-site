import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountDesignDocument } from './DesignDocumentBody.solid';

export function DesignDocumentBody(props: Parameters<typeof mountDesignDocument>[1]) {
  return <SolidControlHost mount={mountDesignDocument} value={props} />;
}
