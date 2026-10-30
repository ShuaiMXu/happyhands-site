import test from "node:test";
import assert from "node:assert/strict";
import { autoSizeFrame } from "../packages/ui/frame-sizing";
test("embedded sizing accepts only its own frame and expected origin", () => {
  let listener: (event: any) => void = () => {};
  const frameWindow = {};
  const frame = {
    contentWindow: frameWindow,
    closest: () => null,
    style: { height: "" },
    getBoundingClientRect: () => ({ height: 640 }),
  };
  const previousWindow = globalThis.window,
    previousLocation = globalThis.location;
  Object.assign(globalThis, {
    window: {
      addEventListener: (_name: string, fn: any) => (listener = fn),
      removeEventListener: () => {},
    },
    location: { origin: "https://happyhands.cc" },
  });
  try {
    const dispose = autoSizeFrame(frame as any);
    const event = {
      source: frameWindow,
      origin: "https://happyhands.cc",
      data: { type: "hh:tool-height", height: 1800 },
    };
    listener({ ...event, source: {} });
    assert.equal(frame.style.height, "");
    listener({ ...event, origin: "https://other.example" });
    assert.equal(frame.style.height, "");
    listener(event);
    assert.equal(frame.style.height, "1800px");
    for (const height of [NaN, Infinity, 100001, -1]) {
      frame.style.height = "";
      listener({ ...event, data: { type: "hh:tool-height", height } });
      assert.equal(frame.style.height, "");
    }
    dispose();
  } finally {
    Object.assign(globalThis, {
      window: previousWindow,
      location: previousLocation,
    });
  }
});
test("sandbox component frames require an opaque origin and hidden panels stay unchanged", () => {
  let listener: (event: any) => void = () => {};
  let hidden = false;
  const frameWindow = {};
  const frame = {
    contentWindow: frameWindow,
    closest: () => (hidden ? {} : null),
    style: { height: "" },
    getBoundingClientRect: () => ({ height: 640 }),
  };
  const previousWindow = globalThis.window,
    previousLocation = globalThis.location;
  Object.assign(globalThis, {
    window: {
      addEventListener: (_name: string, fn: any) => (listener = fn),
      removeEventListener: () => {},
    },
    location: { origin: "https://happyhands.cc" },
  });
  try {
    autoSizeFrame(frame as any, "hh:component-height", true);
    const event = {
      source: frameWindow,
      origin: "null",
      data: { type: "hh:component-height", height: 1200 },
    };
    hidden = true;
    listener(event);
    assert.equal(frame.style.height, "");
    hidden = false;
    listener({ ...event, origin: "https://happyhands.cc" });
    assert.equal(frame.style.height, "");
    listener(event);
    assert.equal(frame.style.height, "1200px");
  } finally {
    Object.assign(globalThis, {
      window: previousWindow,
      location: previousLocation,
    });
  }
});
