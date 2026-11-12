import test from 'node:test';
import assert from 'node:assert/strict';
import { setupBackToTop } from '../apps/portal/back-to-top.js';

function fixture(reduce = false) {
  const document = { activeElement: null };
  const button = Object.assign(new EventTarget(), { hidden: true, ownerDocument: document });
  const target = { focus(options) { assert.equal(options.preventScroll, true); document.activeElement = target; } };
  const media = Object.assign(new EventTarget(), { matches: reduce });
  let frame = 0;
  const frames = new Map();
  const calls = [];
  const view = Object.assign(new EventTarget(), {
    scrollY: 0, innerHeight: 900,
    matchMedia: () => media,
    requestAnimationFrame: fn => { frames.set(++frame, fn); return frame; },
    cancelAnimationFrame: id => frames.delete(id),
    scrollTo(options) { calls.push(options); if (options.behavior === 'instant') this.scrollY = options.top; },
  });
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  const scroll = y => { view.scrollY = y; view.dispatchEvent(new Event('scroll')); flush(); };
  const dispose = setupBackToTop({ button, target, view });
  return { document, button, target, media, view, frames, calls, flush, scroll, dispose };
}

test('hidden at top; shows after a viewport; a focused return is not stranded mid-scroll', () => {
  const f = fixture();
  assert.equal(f.button.hidden, true);
  f.scroll(900); assert.equal(f.button.hidden, true);
  f.scroll(901); assert.equal(f.button.hidden, false);
  f.document.activeElement = f.button;
  f.button.dispatchEvent(new Event('click'));
  assert.deepEqual(f.calls.at(-1), { top: 0, left: 0, behavior: 'smooth' });
  f.scroll(400); assert.equal(f.button.hidden, false);
  assert.equal(f.document.activeElement, f.button);
  f.scroll(0); assert.equal(f.button.hidden, true);
  assert.equal(f.document.activeElement, f.target);
  f.dispose();
});

test('reduced motion returns immediately and hands focus to the visible header', () => {
  const f = fixture(true); f.scroll(1600);
  f.document.activeElement = f.button;
  f.button.dispatchEvent(new Event('click')); f.flush();
  assert.equal(f.view.scrollY, 0);
  assert.equal(f.calls.at(-1).behavior, 'instant');
  assert.equal(f.button.hidden, true);
  assert.equal(f.document.activeElement, f.target);
  f.dispose();
});

test('changing motion preference completes a pending return; disposal removes handlers and frames', () => {
  const f = fixture(); f.scroll(1600);
  f.button.dispatchEvent(new Event('click'));
  f.media.matches = true; f.media.dispatchEvent(new Event('change')); f.flush();
  assert.equal(f.view.scrollY, 0);
  f.view.dispatchEvent(new Event('resize')); assert.equal(f.frames.size, 1);
  f.dispose(); assert.equal(f.frames.size, 0);
  const count = f.calls.length;
  f.button.dispatchEvent(new Event('click')); f.view.dispatchEvent(new Event('scroll'));
  f.media.dispatchEvent(new Event('change'));
  assert.equal(f.calls.length, count); assert.equal(f.frames.size, 0);
  const again = setupBackToTop({ button: f.button, target: f.target, view: f.view });
  f.button.dispatchEvent(new Event('click'));
  assert.equal(f.calls.length, count + 1);
  again();
});

test('interrupted pointer return does not later steal focus', () => {
  const f = fixture(); f.scroll(1600);
  f.button.dispatchEvent(new Event('click'));
  f.view.dispatchEvent(new Event('wheel'));
  const other = {}; f.document.activeElement = other;
  f.scroll(0); assert.equal(f.document.activeElement, other);
  f.dispose();
});
