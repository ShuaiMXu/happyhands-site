export function replacePreviewLocation(
  frame: HTMLIFrameElement,
  source: { src: string } | { srcDoc: string },
) {
  const target = 'src' in source ? new URL(source.src, location.href) : null;
  if (target && target.origin !== location.origin) {
    throw new Error('Owned previews must use the current origin.');
  }
  const destination = target
    ? target.href
    : `data:text/html;charset=utf-8,${encodeURIComponent('srcDoc' in source ? source.srcDoc : '')}`;
  frame.contentWindow?.location.replace(destination);
}
