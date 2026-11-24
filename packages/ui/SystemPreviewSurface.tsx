import type { ComponentPropsWithoutRef } from 'react';
import './system-preview-surface.css';

export function SystemPreviewSurface({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={`system-style-preview ${className}`.trimEnd()} />;
}
