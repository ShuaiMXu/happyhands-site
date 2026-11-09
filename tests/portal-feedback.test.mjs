import test from "node:test";
import assert from "node:assert/strict";
import { createFeedback } from "../apps/portal/feedback.js";
test("success and copy failure both expire, and a later notice cancels the earlier timer", () => {
  const visible = new Set(),
    element = {
      textContent: "",
      classList: {
        add: (x) => visible.add(x),
        remove: (x) => visible.delete(x),
      },
    },
    callbacks = new Map();
  let id = 0;
  const show = createFeedback(() => element, {
    schedule: (cb, ms) => {
      callbacks.set(++id, { cb, ms });
      return id;
    },
    cancel: (key) => callbacks.delete(key),
  });
  show("Copy unavailable. Retry.", 6000);
  assert.equal(callbacks.get(1).ms, 6000);
  assert.ok(visible.has("show"));
  show("Copied");
  assert.equal(callbacks.has(1), false);
  assert.equal(callbacks.get(2).ms, 1800);
  callbacks.get(2).cb();
  assert.ok(!visible.has("show"));
  assert.equal(element.textContent, "Copied");
});
