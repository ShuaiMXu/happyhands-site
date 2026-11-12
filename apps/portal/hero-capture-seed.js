// Explicit development captures may share a cover order. Public visits stay random.
export function captureShuffleRandom(search, development) {
  if (development !== true) return Math.random;
  const seed = new URLSearchParams(search).get('hh-capture-seed');
  if (!seed || !/^[a-zA-Z0-9_-]{1,80}$/.test(seed)) return Math.random;
  let state = 2166136261;
  for (const character of seed) state = Math.imul(state ^ character.charCodeAt(0), 16777619);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ state >>> 15, state | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
