export const expectedHeroCoverCount = 189;

export function heroLayoutFails(layout) {
  return !layout.singleMark || layout.overflow || !layout.actionsVisible || layout.coverCount !== expectedHeroCoverCount;
}

export function normalHeroStatus(item) {
  if (heroLayoutFails(item.layout) || item.errors.length) return 'fail';
  return item.motionObserved && item.openingSampled && item.pointerEventObserved && item.scroll.paused && item.scroll.resumed ? 'pass' : 'needs-evidence';
}

export function contextLossStatus({contextLost, fallbackRecovered, errors, layout}) {
  if (errors.length || heroLayoutFails(layout) || contextLost && !fallbackRecovered) return 'fail';
  return contextLost && fallbackRecovered ? 'pass' : 'needs-evidence';
}
