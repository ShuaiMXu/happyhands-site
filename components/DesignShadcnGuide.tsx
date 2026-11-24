import React from 'react';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountDesignShadcnGuide } from './DesignShadcnGuide.solid';

export function DesignShadcnGuide(props: Parameters<typeof mountDesignShadcnGuide>[1]) {
  return <SolidControlHost mount={mountDesignShadcnGuide} value={props} />;
}
