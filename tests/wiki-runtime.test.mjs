import test from 'node:test';
import assert from 'node:assert/strict';
import { activeSectionIndex, scrollEdges } from '../guide/wiki-layout.ts';

test('outline selects last heading above the 20% reading line', () => {
  assert.equal(activeSectionIndex([300, 600, 900], 1000), 0);
  assert.equal(activeSectionIndex([-500, 200, 600], 1000), 1);
  assert.equal(activeSectionIndex([-500, -200, 199], 1000), 2);
  assert.equal(activeSectionIndex([-20, 150, 300], 500), 0);
});

test('edge indicators occur only where more list content exists', () => {
  assert.deepEqual(scrollEdges(0, 300, 200), { above: false, below: false });
  assert.deepEqual(scrollEdges(0, 300, 800), { above: false, below: true });
  assert.deepEqual(scrollEdges(250, 300, 800), { above: true, below: true });
  assert.deepEqual(scrollEdges(500, 300, 800), { above: true, below: false });
  assert.deepEqual(scrollEdges(0.5, 300, 300.5), { above: false, below: false });
});

test('floating header leaves at 120ms and a reversal cancels the exit without replaying entry', async t => {
  const { createFloatingHeader } = await import('../guide/wiki-layout.ts');
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const classes = new Set();
  const header = { classList: {
    add: (...values) => values.forEach(value => classes.add(value)),
    remove: (...values) => values.forEach(value => classes.delete(value)),
    contains: value => classes.has(value),
  } };
  let bottom = 1;
  let reduced = false;
  const state = createFloatingHeader(header, { getBoundingClientRect: () => ({ bottom }) }, () => reduced);
  state.update();
  assert.equal(classes.has('is-floating'), false);
  bottom = 0; state.update();
  assert.equal(classes.has('is-floating'), true);
  assert.equal(classes.has('is-entering'), true);
  t.mock.timers.tick(320);
  assert.equal(classes.has('is-entering'), false);
  bottom = 1; state.update();
  t.mock.timers.tick(119);
  assert.equal(classes.has('is-floating'), true);
  bottom = 0; state.update();
  t.mock.timers.tick(1000);
  assert.equal(classes.has('is-floating'), true);
  assert.equal(classes.has('is-entering'), false);
  assert.equal(classes.has('is-leaving'), false);
  bottom = 1; state.update();
  t.mock.timers.tick(120);
  assert.equal(classes.has('is-floating'), false);
  bottom = -1; state.update();
  reduced = true; bottom = 1; state.update();
  assert.equal(classes.has('is-floating'), false);
  state.destroy();
});

function fakeStyle(initial = {}) {
  const values = new Map(Object.entries(initial).map(([name, value]) => [name, Array.isArray(value) ? value : [value, '']]));
  return {
    getPropertyValue: name => values.get(name)?.[0] || '',
    getPropertyPriority: name => values.get(name)?.[1] || '',
    setProperty: (name, value, priority = '') => values.set(name, [value, priority]),
    removeProperty: name => values.delete(name),
  };
}

test('sheet scroll lock preserves styles and position; stale releases cannot unlock a new owner', async () => {
  const { createPageScrollLock } = await import('../guide/wiki-layout.ts');
  const body = fakeStyle({ position: ['relative', 'important'], top: '2px', width: '90%' });
  const html = fakeStyle({ overflow: 'clip', 'overscroll-behavior': 'contain' });
  const calls = [];
  const view = { innerWidth: 1000, scrollX: 12, scrollY: 900, scrollTo(value) { calls.push(value); this.scrollX = value.left; this.scrollY = value.top; } };
  const lock = createPageScrollLock({ body: { style: body }, documentElement: { style: html, clientWidth: 985 } }, view);
  const releaseFirst = lock.acquire({ id: 'pages' });
  assert.equal(body.getPropertyValue('position'), 'fixed');
  assert.equal(body.getPropertyValue('width'), 'calc(100% - 15px)');
  assert.equal(body.getPropertyValue('top'), '-900px');
  assert.equal(body.getPropertyValue('left'), '-12px');
  assert.equal(html.getPropertyValue('overflow'), 'hidden');
  view.scrollX = 0; view.scrollY = 0;
  const releaseSecond = lock.acquire({ id: 'outline' });
  assert.equal(body.getPropertyValue('top'), '-900px');
  releaseFirst(); // Delayed native close from the previous sheet.
  assert.equal(body.getPropertyValue('position'), 'fixed');
  releaseSecond();
  assert.equal(body.getPropertyValue('position'), 'relative');
  assert.equal(body.getPropertyPriority('position'), 'important');
  assert.equal(body.getPropertyValue('top'), '2px');
  assert.equal(body.getPropertyValue('left'), '');
  assert.equal(body.getPropertyValue('width'), '90%');
  assert.equal(html.getPropertyValue('overflow'), 'clip');
  assert.equal(html.getPropertyValue('overscroll-behavior'), 'contain');
  assert.deepEqual(calls.at(-1), { left: 12, top: 900, behavior: 'instant' });
  const count = calls.length;
  body.setProperty('top', '7px');
  releaseSecond(); lock.release();
  assert.equal(calls.length, count);
  assert.equal(body.getPropertyValue('top'), '7px', 'duplicate cleanup must not overwrite later styles');
});

test('sheet lock cleanup does not overwrite a property changed by another interface', async () => {
  const { createPageScrollLock } = await import('../guide/wiki-layout.ts');
  const style = fakeStyle();
  const lock = createPageScrollLock({ body: { style }, documentElement: { style: fakeStyle() } }, { scrollX: 0, scrollY: 0, scrollTo() {} });
  const release = lock.acquire({});
  style.setProperty('width', '95%');
  release();
  assert.equal(style.getPropertyValue('width'), '95%');
  assert.equal(style.getPropertyValue('position'), '');
});
