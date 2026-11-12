// The DOM fallback and WebGL enhancement share the original spiral and capture seed.
import {captureShuffleRandom} from './hero-capture-seed.js';

function buildSpiral() {
  const TURNS = 8 * Math.PI * 2;
  const SAMPLES = 16384;
  const MAX_R = 1875;
  const STEPS = 4096;

  const pts = [];
  for (let a = 0; a <= SAMPLES; a++) {
    const u = a / SAMPLES;
    const angle = u * TURNS;
    const r = MAX_R * (1 - u);
    pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
  }
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const total = cum[SAMPLES];
  const lut = new Array(STEPS + 1);
  let cursor = 0;
  for (let c = 0; c <= STEPS; c++) {
    const d = (c / STEPS) * total;
    while (cursor < SAMPLES && cum[cursor + 1] < d) cursor++;
    const span = cum[cursor + 1] - cum[cursor];
    const t = span > 0 ? (d - cum[cursor]) / span : 0;
    const a = pts[cursor];
    const b = pts[Math.min(cursor + 1, SAMPLES)];
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    const ua = (cursor + t) / SAMPLES;
    const angle = ua * TURNS;
    const r = MAX_R * (1 - ua);
    // tangent: derivative of (r * cos, r * sin) along u
    const dx = -MAX_R * Math.cos(angle) - r * Math.sin(angle) * TURNS;
    const dy = -MAX_R * Math.sin(angle) + r * Math.cos(angle) * TURNS;
    const len = Math.hypot(dx, dy);
    lut[c] = { x, y, tx: len > 0 ? dx / len : 1, ty: len > 0 ? dy / len : 0 };
  }
  lut.count = Math.ceil(total / 250);
  return lut;
}

export function startWhirl(container, images) {
  if (!container || !images.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const lut = buildSpiral();
  // Shuffle without replacement so each tile has its own cover on every visit.
  const pool = [...new Set(images)];
  const random = captureShuffleRandom(window.location.search, import.meta.env.DEV);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const count = Math.min(lut.count, pool.length);
  const widths = [120, 118, 85];
  const rotor = document.createElement('div');
  rotor.className = 'pd-whirl-rotor';
  rotor.style.animation = 'none';
  container.appendChild(rotor);
  const tiles = Array.from({length: count}, (_, i) => {
    const tile = document.createElement('div');
    tile.className = 'pd-whirl-tile';
    tile.style.width = `${widths[i % widths.length] / 2500 * 100}%`;
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.addEventListener('load', () => { img.style.opacity = '1'; }, {once:true});
    img.src = pool[i];
    tile.appendChild(img);
    rotor.appendChild(tile);
    return tile;
  });
  let phase = 0, velocity = 0, lastScroll = window.scrollY;
  const start = performance.now();
  let previous = start, frame = 0, visible = true, disposed = false;
  let renderer, loading = false, failed = false;
  const hero = container.closest('.hero');
  const events = new AbortController();
  const pointer = {x: 0, y: 0};
  const positions = [];
  function canAnimate() {
    return !disposed && visible && !document.hidden && !motion.matches && !failed
      && container.style.opacity !== '0.0000' && container.style.opacity !== '0';
  }
  function fallback() {
    renderer?.dispose();
    renderer = undefined;
    rotor.hidden = false;
    container.dataset.whirlRenderer = 'dom';
  }
  function fail() {
    failed = true;
    fallback();
    cancelAnimationFrame(frame);
    frame = 0;
    draw();
  }
  function sync() {
    if (motion.matches) {
      fallback();
      phase = 0;
      pointer.x = pointer.y = 0;
      draw();
    }
    if (!canAnimate()) {
      cancelAnimationFrame(frame);
      frame = 0;
      velocity = 0;
      return;
    }
    if (!frame) {
      previous = performance.now();
      lastScroll = window.scrollY;
      frame = requestAnimationFrame(tick);
    }
    if (renderer || loading) return;
    loading = true;
    import('./whirl-webgl.js').then(({createWhirlRenderer}) => {
      if (!canAnimate()) return;
      renderer = createWhirlRenderer(container, tiles.map(tile => tile.firstChild), widths, fail);
      draw();
    }).catch(fail).finally(() => { loading = false; });
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(container.parentElement);
  // The existing scroll controller owns the host's fade; stop actual draws at its exit.
  const fadeObserver = new MutationObserver(sync);
  fadeObserver.observe(container, {attributes:true, attributeFilter:['style']});
  const resizeObserver = new ResizeObserver(() => { renderer?.resize(); draw(); });
  resizeObserver.observe(container.parentElement);
  hero?.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || motion.matches) return;
    const bounds = hero.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  }, {passive:true, signal:events.signal});
  hero?.addEventListener('pointerleave', () => { pointer.x = pointer.y = 0; }, {signal:events.signal});
  document.addEventListener('visibilitychange', sync, {signal:events.signal});
  motion.addEventListener('change', sync, {signal:events.signal});
  function draw() {
    tiles.forEach((tile, i) => {
      const u = (phase + i / count) % 1;
      const sample = u * 4096;
      const index = Math.min(Math.floor(sample), 4095);
      const a = lut[index], b = lut[index + 1], t = sample - index;
      const x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
      const angle = Math.atan2(a.ty + (b.ty-a.ty)*t, a.tx + (b.tx-a.tx)*t);
      const d = Math.hypot(x,y);
      const radius = 1875 * (d / 1875) ** 1.0526315789473684;
      const h = d > 0 ? radius / d : 1;
      const scale = Math.min(radius / 1875,1) ** .35;
      positions[i] = {x:x*h, y:y*h, angle, scale, opacity:u < .08 ? u/.08 : u > .92 ? (1-u)/.08 : 1};
      if (renderer && !motion.matches) return;
      tile.style.left = `${50 + x*h/2500*100}%`;
      tile.style.top = `${50 + y*h/2500*100}%`;
      tile.style.transform = `translate(-50%,-50%) rotate(${angle}rad) scale(${scale})`;
      tile.style.opacity = String(u < .08 ? u/.08 : u > .92 ? (1-u)/.08 : 1);
    });
    if (renderer && !motion.matches && canAnimate()) {
      try {
        if (renderer.render(positions, pointer, performance.now() - start)) {
          rotor.hidden = true;
          container.dataset.whirlRenderer = 'webgl';
        }
      } catch { fail(); }
    }
  }
  function tick(now) {
    frame = 0;
    if (!canAnimate()) return;
    const dt = Math.min(now - previous,150)/1000;
    previous = now;
    if (dt > 0 && visible && !document.hidden && !motion.matches) {
      const speed = (window.scrollY-lastScroll)/dt;
      velocity += (speed-velocity)*Math.min(1,dt/.22);
      const elapsed = now-start;
      const boost = elapsed < 1900 ? 1+23*(elapsed<600?(elapsed/600)**2:1)*(1-elapsed/1900)**2 : 1;
      phase = (phase + .0032*(1+Math.abs(velocity)/1000*8)*boost*dt)%1;
      draw();
    } else { velocity = 0; }
    lastScroll = window.scrollY;
    frame = requestAnimationFrame(tick);
  }
  draw();
  rotor.style.opacity = '1';
  sync();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    events.abort();
    observer.disconnect();
    fadeObserver.disconnect();
    resizeObserver.disconnect();
    fallback();
    rotor.remove();
    delete container.dataset.whirlRenderer;
  };
}
