import assert from 'node:assert/strict';
import test from 'node:test';
import { handleSearchKeyDown } from '../components/resource-search-keydown.ts';

// Shared handler replay: the component and this test import the same function, so
// a refactor cannot silently invalidate the event-order expectations.
const RESULTS = [{ id: 'apple', label: 'Apple HIG', href: '/apple' }];

function fixture(options = {}) {
  const { query = 'Apple', open = true, focused = 'result' } = options;
  // `'results' in options` keeps an explicit `results: undefined` distinct from
  // "no results option", which the component treats differently.
  const results = 'results' in options ? options.results : RESULTS;
  const state = { query, results, open, focused, prevented: false };
  const setOpen = (value) => { state.open = value; };
  const input = {};
  // Focusing the input fires the bubbling focus handler that reopens the panel.
  const focusInput = () => { if (state.focused !== 'input') { state.focused = 'input'; setOpen(true); } };
  const focusFirstResult = () => { if (state.results?.length) { state.focused = 'result'; setOpen(true); } };
  return {
    state,
    press(key, isComposing = false) {
      state.prevented = false;
      handleSearchKeyDown(
        { key, nativeEvent: { isComposing }, target: state.focused === 'input' ? input : null, preventDefault() { state.prevented = true; } },
        {
          input,
          query: state.query,
          results: state.results,
          expanded: state.open && !!state.query.trim() && state.results !== undefined,
          setOpen,
          focusInput,
          focusFirstResult,
        },
      );
    },
  };
}

test('Escape from result returns focus, dismisses and preserves query/results', () => {
  const f = fixture();
  const results = f.state.results;
  f.press('Escape');
  assert.equal(f.state.open, false);
  assert.equal(f.state.focused, 'input');
  assert.equal(f.state.prevented, true);
  assert.equal(f.state.query, 'Apple');
  assert.equal(f.state.results, results);
  f.press('Escape');
  assert.equal(f.state.open, false);
  f.press('ArrowDown');
  assert.equal(f.state.open, true);
  assert.equal(f.state.focused, 'input');
  f.press('ArrowDown');
  assert.equal(f.state.focused, 'result');
  f.press('Enter');
  assert.equal(f.state.prevented, false, 'native link navigation remains available');
});

test('composition does not consume Escape or ArrowDown', () => {
  const f = fixture();
  f.press('Escape', true);
  assert.equal(f.state.open, true);
  assert.equal(f.state.focused, 'result');
  assert.equal(f.state.prevented, false);
  const input = fixture({ focused: 'input', open: false });
  input.press('ArrowDown', true);
  assert.equal(input.state.open, false);
  assert.equal(input.state.prevented, false);
});

test('empty suggestions reopen without moving focus; absent suggestions and blank query keep native arrows', () => {
  const empty = fixture({ results: [], focused: 'input', open: false });
  empty.press('ArrowDown');
  assert.equal(empty.state.open, true);
  assert.equal(empty.state.prevented, true);
  empty.press('ArrowDown');
  assert.equal(empty.state.focused, 'input');
  for (const options of [{ query: ' ' }, { results: undefined }]) {
    const f = fixture({ focused: 'input', open: false, ...options });
    f.press('ArrowDown');
    assert.equal(f.state.open, false);
    assert.equal(f.state.prevented, false);
  }
});
