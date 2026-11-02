/** The reading position is the last section above the viewport's 20% line. */
export function activeSectionIndex(tops: number[], viewportHeight: number): number {
  let index = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] <= viewportHeight * 0.2) index = i;
  }
  return index;
}

export function scrollEdges(top: number, height: number, total: number) {
  return { above: top > 1, below: top + height < total - 1 };
}

/** Isolated timing controller keeps a reversing exit from replaying the entry. */
export function createFloatingHeader(header: HTMLElement, hero: HTMLElement, reduced: () => boolean) {
  let exitTimer: ReturnType<typeof setTimeout> | undefined;
  let enterTimer: ReturnType<typeof setTimeout> | undefined;
  const clearEnter = () => {
    if (enterTimer !== undefined) clearTimeout(enterTimer);
    enterTimer = undefined;
    header.classList.remove('is-entering');
  };
  const clearExit = () => {
    if (exitTimer !== undefined) clearTimeout(exitTimer);
    exitTimer = undefined;
  };
  const finishExit = () => {
    clearExit();
    clearEnter();
    header.classList.remove('is-floating', 'is-leaving');
  };
  return {
    update() {
      if (hero.getBoundingClientRect().bottom <= 0) {
        const fresh = !header.classList.contains('is-floating');
        if (exitTimer !== undefined || reduced()) clearEnter();
        clearExit();
        header.classList.remove('is-leaving');
        header.classList.add('is-floating');
        if (fresh && !reduced()) {
          header.classList.add('is-entering');
          enterTimer = setTimeout(clearEnter, 320);
        }
      } else if (header.classList.contains('is-floating')) {
        if (reduced()) finishExit();
        else if (exitTimer === undefined) {
          clearEnter();
          header.classList.add('is-leaving');
          // Explicit user-requested 120ms exit, canceled if the hero leaves again.
          exitTimer = setTimeout(finishExit, 120);
        }
      }
    },
    destroy: finishExit,
  };
}

/** Shared enhancement for the statically rendered guide and workflow pages. */
export function setupWikiLayout() {
  const root = document.querySelector<HTMLElement>('.wiki-layout');
  const header = document.querySelector<HTMLElement>('.hh-site-header');
  const slot = document.querySelector<HTMLElement>('.wiki-header-slot');
  const hero = document.querySelector<HTMLElement>('.guide-heading');
  if (!root || !header || !slot || !hero) return () => {};

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 1100px)');
  const phone = matchMedia('(max-width: 600px)');
  const disposers: Array<() => void> = [];
  const listen = (target: EventTarget, type: string, listener: EventListener) => {
    target.addEventListener(type, listener);
    disposers.push(() => target.removeEventListener(type, listener));
  };
  let frame = 0;
  let alive = true;
  const behavior = (): ScrollBehavior => reduced.matches ? 'auto' : 'smooth';

  // Preserve the header's original flow box, including while the bar is fixed.
  const measureHeader = () => {
    const height = header.getBoundingClientRect().height;
    if (height > 0) {
      slot.style.height = `${height}px`;
      root.style.setProperty('--wiki-header-height', `${height}px`);
    }
  };
  const floatingHeader = createFloatingHeader(header, hero, () => reduced.matches);

  const pageScroll = document.querySelector<HTMLElement>('.wiki-page-scroll');
  const pages = pageScroll?.closest<HTMLElement>('.wiki-pages');
  const storageKey = `hh-wiki-scroll:${document.documentElement.lang || 'zh'}`;
  const updateEdges = () => {
    if (!pageScroll || !pages) return;
    const edges = scrollEdges(pageScroll.scrollTop, pageScroll.clientHeight, pageScroll.scrollHeight);
    pages.dataset.moreAbove = String(edges.above);
    pages.dataset.moreBelow = String(edges.below);
  };
  const keepCurrentVisible = () => {
    if (!pageScroll || pageScroll.clientHeight === 0) return;
    const current = pageScroll.querySelector<HTMLElement>('[aria-current="page"]');
    if (!current) return;
    const outer = pageScroll.getBoundingClientRect(), entry = current.getBoundingClientRect();
    // Do not center an already-visible current page over a restored scroll offset.
    if (entry.top < outer.top) pageScroll.scrollTop -= outer.top - entry.top;
    else if (entry.bottom > outer.bottom) pageScroll.scrollTop += entry.bottom - outer.bottom;
  };
  if (pageScroll) {
    try {
      const saved = Number(sessionStorage.getItem(storageKey));
      if (Number.isFinite(saved) && saved >= 0) pageScroll.scrollTop = saved;
    } catch { /* Reading still works when browser storage is unavailable. */ }
    keepCurrentVisible();
    listen(pageScroll, 'scroll', () => {
      updateEdges();
      try { sessionStorage.setItem(storageKey, String(pageScroll.scrollTop)); } catch { /* Optional persistence. */ }
    });
    pages?.querySelectorAll<HTMLButtonElement>('[data-wiki-scroll]').forEach(button => {
      listen(button, 'click', () => pageScroll.scrollBy({
        top: pageScroll.clientHeight * 0.6 * (button.dataset.wikiScroll === 'up' ? -1 : 1),
        behavior: behavior(),
      }));
    });
  }

  const outlineLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.wiki-outline a[href^="#"]'));
  const sections = outlineLinks.map(link => {
    const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    return { link, section, heading: section?.querySelector<HTMLElement>('h2, h3') ?? section };
  }).filter(item => item.heading !== null);
  const allOutlineLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.wiki-outline a[href^="#"], #wiki-outline-dialog a[href^="#"]'));
  let activeHash = '';
  const updateOutline = () => {
    if (!sections.length) return;
    const item = sections[activeSectionIndex(sections.map(item => item.heading!.getBoundingClientRect().top), innerHeight)];
    if (activeHash === item.link.hash) return;
    activeHash = item.link.hash;
    allOutlineLinks.forEach(link => {
      if (link.hash === activeHash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll<HTMLElement>('.wiki-current-section').forEach(label => {
      label.textContent = item.link.textContent;
    });
  };
  const update = () => { frame = 0; floatingHeader.update(); updateOutline(); updateEdges(); };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  listen(window, 'scroll', schedule);
  listen(window, 'resize', () => { measureHeader(); schedule(); });
  listen(reduced, 'change', () => floatingHeader.update());

  const dialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('#wiki-pages-dialog, #wiki-outline-dialog'));
  dialogs.forEach(dialog => {
    let opener: HTMLElement | null = null;
    const triggers = Array.from(document.querySelectorAll<HTMLElement>(`[data-wiki-open="${dialog.id}"]`));
    const close = () => { if (dialog.open) dialog.close(); };
    triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    triggers.forEach(trigger => listen(trigger, 'click', () => {
      if (dialog.open) return;
      dialogs.forEach(other => { if (other.open) other.close(); });
      opener = trigger;
      dialog.showModal();
      triggers.forEach(button => button.setAttribute('aria-expanded', 'true'));
      dialog.querySelector<HTMLElement>('[aria-current]')?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }));
    listen(dialog, 'close', () => {
      triggers.forEach(button => button.setAttribute('aria-expanded', 'false'));
      // Native dialog handles Escape and focus containment; also restore on custom closes.
      if (opener && opener.getClientRects().length) opener.focus({ preventScroll: true });
      opener = null;
    });
    listen(dialog, 'click', event => {
      const mouse = event as MouseEvent;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-wiki-close], a[href]')) { close(); return; }
      if (target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (mouse.clientX < rect.left || mouse.clientX > rect.right || mouse.clientY < rect.top || mouse.clientY > rect.bottom) close();
      }
    });
    listen(narrow, 'change', close);
    listen(phone, 'change', close);
    disposers.push(close);
  });

  const search = document.querySelector<HTMLInputElement>('.wiki-layout input[type="search"]');
  if (search) listen(document, 'keydown', event => {
    const key = event as KeyboardEvent;
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (key.key === '/' && !key.metaKey && !key.ctrlKey && !key.altKey && !key.isComposing
      && !target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')
      && !dialogs.some(dialog => dialog.open)) {
      key.preventDefault(); search.focus();
    }
  });

  const observer = new ResizeObserver(() => { measureHeader(); updateEdges(); schedule(); });
  observer.observe(header);
  observer.observe(hero);
  if (pageScroll) {
    observer.observe(pageScroll);
    if (pageScroll.firstElementChild) observer.observe(pageScroll.firstElementChild);
  }
  root.classList.add('wiki-enhanced');
  measureHeader();
  update();
  // Fonts can change line wrapping and list extent after first paint.
  void document.fonts?.ready.then(() => { if (alive) { measureHeader(); keepCurrentVisible(); schedule(); } });
  return () => {
    alive = false;
    disposers.forEach(dispose => dispose());
    observer.disconnect();
    floatingHeader.destroy();
    cancelAnimationFrame(frame);
    slot.style.removeProperty('height');
    root.classList.remove('wiki-enhanced');
    root.style.removeProperty('--wiki-header-height');
  };
}
