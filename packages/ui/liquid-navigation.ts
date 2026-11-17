/** Sliding capsule adaptation of PinUI Liquid Tabs' measured active surface.
 * Original source: public/components/pin-ui/liquid-tabs.json (MIT).
 * Keep real route links / existing panel keyboard semantics; never filter text.
 */
export function setupLiquidNavigation(nav: HTMLElement) {
  const group = nav.querySelector<HTMLElement>('.hh-resource-group');
  if (!group) return () => {};
  const surface = document.createElement('span');
  surface.className = 'hh-liquid-surface';
  surface.setAttribute('aria-hidden', 'true');
  surface.innerHTML = '<span class="hh-liquid-goo"><span class="hh-liquid-blob"></span></span>';
  group.prepend(surface);
  nav.classList.add('hh-liquid-navigation');
  const blob = surface.querySelector<HTMLElement>('.hh-liquid-blob')!;
  let previous: Element | null = null;
  const update = () => {
    const selected = group.querySelector<HTMLElement>('[aria-selected="true"],[aria-current="page"]');
    if (!selected) { surface.hidden = true; return; }
    surface.hidden = false;
    blob.style.transform = `translateX(${selected.offsetLeft}px)`;
    blob.style.width = `${selected.offsetWidth}px`;
    if (previous && previous !== selected) {
      // Scroll only this rail: selecting a tab must never jump the whole page.
      const left = selected.offsetLeft, right = left + selected.offsetWidth;
      if (left < group.scrollLeft) group.scrollLeft = left;
      else if (right > group.scrollLeft + group.clientWidth) group.scrollLeft = right - group.clientWidth;
    }
    previous = selected;
  };
  update();
  // Do not animate the initial layout measurement.
  const frame = requestAnimationFrame(() => nav.classList.add('hh-liquid-ready'));
  const mutation = new MutationObserver(update);
  mutation.observe(group, {subtree:true, attributes:true, attributeFilter:['aria-current','aria-selected'], childList:true, characterData:true});
  const resize = new ResizeObserver(update);
  resize.observe(group);
  for (const item of group.querySelectorAll('a,button')) resize.observe(item);
  let disposed = false;
  document.fonts.ready.then(() => { if (!disposed) update(); });
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    mutation.disconnect(); resize.disconnect(); surface.remove();
    nav.classList.remove('hh-liquid-navigation','hh-liquid-ready');
  };
}
