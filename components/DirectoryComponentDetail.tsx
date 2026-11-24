import React, { useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { mountDirectoryComponent } from './DirectoryComponentDetail.solid';

type Props = Omit<Parameters<typeof mountDirectoryComponent>[1], 'inline' | 'onPreviewTarget'> & {
  inlinePreview?: ReactNode;
};

export function DirectoryComponentDetail({ inlinePreview, name, lang, path, content, previewUrl, cover, installUrl }: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const inline = Boolean(inlinePreview);
  const value = useMemo(() => ({
    name, lang, path, content, previewUrl, cover, installUrl, inline, onPreviewTarget: setTarget,
  }), [name, lang, path, content, previewUrl, cover, installUrl, inline]);
  return <>
    <SolidControlHost mount={mountDirectoryComponent} value={value} />
    {target && inlinePreview && createPortal(inlinePreview, target)}
  </>;
}
