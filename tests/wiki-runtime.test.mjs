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
