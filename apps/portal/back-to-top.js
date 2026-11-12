// Native portal control: no React root or parallel navigation state is needed.
export function setupBackToTop({ button, target, view = window }) {
  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let returning = false;
  let frame = 0;
  let disposed = false;

  function update() {
    frame = 0;
    if (disposed) return;
    const atTop = view.scrollY <= 0;
    // Keep a focused control available until the return has actually completed.
    const visible = view.scrollY > view.innerHeight ||
      (!atTop && button.ownerDocument.activeElement === button);
    if (atTop && (returning || button.ownerDocument.activeElement === button)) {
      returning = false;
      target.focus({ preventScroll: true });
    }
    button.hidden = !visible;
  }

  function schedule() {
    if (!frame) frame = view.requestAnimationFrame(update);
  }

  function activate() {
    returning = true;
    view.scrollTo({ top: 0, left: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    schedule();
  }

  function cancelReturn() { returning = false; }
  function focusChanged(event) {
    if (event.target !== button) cancelReturn();
  }
  function pointerStarted(event) {
    // Some browsers do not focus a control when it is clicked. Respect that
    // independent choice too, without intercepting or cancelling native input.
    if (!button.contains(event.target)) cancelReturn();
  }
  function motionChanged() {
    if (returning && reducedMotion.matches) view.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    schedule();
  }

  button.addEventListener('click', activate);
  view.addEventListener('scroll', schedule, { passive: true });
  view.addEventListener('resize', schedule);
  view.addEventListener('wheel', cancelReturn, { passive: true });
  view.addEventListener('touchstart', cancelReturn, { passive: true });
  view.addEventListener('focusin', focusChanged);
  view.addEventListener('pointerdown', pointerStarted, { passive: true });
  reducedMotion.addEventListener('change', motionChanged);
  update();
  return () => {
    disposed = true;
    view.cancelAnimationFrame(frame);
    button.removeEventListener('click', activate);
    view.removeEventListener('scroll', schedule);
    view.removeEventListener('resize', schedule);
    view.removeEventListener('wheel', cancelReturn);
    view.removeEventListener('touchstart', cancelReturn);
    view.removeEventListener('focusin', focusChanged);
    view.removeEventListener('pointerdown', pointerStarted);
    reducedMotion.removeEventListener('change', motionChanged);
    button.hidden = true;
  };
}
