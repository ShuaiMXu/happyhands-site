import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import './system-preview-surface.css';

export function SystemPreviewSurface({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={`system-style-preview ${className}`.trimEnd()} />;
}

type SystemPreviewFrameProps = Omit<ComponentPropsWithRef<'iframe'>, 'srcDoc' | 'sandbox'> & {
  src: string;
  title: string;
};

export function SystemPreviewFrame(props: SystemPreviewFrameProps) {
  return <iframe {...props} sandbox="allow-scripts allow-same-origin" />;
}
