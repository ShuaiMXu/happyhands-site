const svgNS = "http://www.w3.org/2000/svg";

// Encode the rounded lens's edge normals as red/green displacement channels.
// The neutral center leaves the background sharp; only the bevel bends it.
function lensMap(width, height, radius) {
  const ratio = Math.min(1, 720 / width, 480 / height);
  const w = Math.max(1, Math.round(width * ratio));
  const h = Math.max(1, Math.round(height * ratio));
  const r = Math.min(radius * ratio, w / 2, h / 2);
  const bevel = Math.max(4, Math.min(24 * ratio, h / 2));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const pixels = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - w / 2,
        py = y + 0.5 - h / 2;
      const qx = Math.abs(px) - (w / 2 - r),
        qy = Math.abs(py) - (h / 2 - r);
      const cx = Math.max(qx, 0),
        cy = Math.max(qy, 0);
      const corner = Math.hypot(cx, cy);
      const distance = corner + Math.min(Math.max(qx, qy), 0) - r;
      const depth = Math.max(0, -distance);
      const bend =
        distance > 0 ? 0 : Math.pow(Math.max(0, 1 - depth / bevel), 1.35);
      let nx = 0,
        ny = 0;
      if (corner > 0) {
        nx = (cx / corner) * Math.sign(px);
        ny = (cy / corner) * Math.sign(py);
      } else if (qx > qy) nx = Math.sign(px);
      else ny = Math.sign(py);
      const i = (y * w + x) * 4;
      // Low-frequency surface variation adds optical roughness without a noise overlay.
      const ripple = Math.sin(x / 28) * Math.sin(y / 11) * 5;
      pixels.data[i] = 128 + nx * bend * 108 + ripple;
      pixels.data[i + 1] = 128 + ny * bend * 108 + ripple;
      pixels.data[i + 2] = 128;
      pixels.data[i + 3] = 255;
    }
  ctx.putImageData(pixels, 0, 0);
  return canvas.toDataURL();
}

export function setupLiquidGlass() {
  const targets = [...document.querySelectorAll(".portal-glass-header")];
  const defs = document.createElementNS(svgNS, "svg");
  defs.classList.add("liquid-glass-defs");
  defs.setAttribute("aria-hidden", "true");
  // Specular light follows the actual logo alpha, rather than a rounded tile.
  defs.innerHTML = `<filter id="hh-glass-mark" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation=".65" result="bevel"/>
    <feSpecularLighting in="bevel" surfaceScale="4" specularConstant="1.4" specularExponent="28" lighting-color="white" result="shine"><feDistantLight azimuth="225" elevation="50"/></feSpecularLighting>
    <feComposite in="shine" in2="SourceAlpha" operator="in" result="edge-light"/>
    <feComponentTransfer in="SourceGraphic" result="body"><feFuncA type="linear" slope=".16"/></feComponentTransfer>
    <feMerge><feMergeNode in="body"/><feMergeNode in="edge-light"/></feMerge>
  </filter>`;
  document.body.append(defs);
  const cleanup = [];
  for (const [index, target] of targets.entries()) {
    const surface = document.createElement("div");
    surface.className = "liquid-glass-surface";
    surface.setAttribute("aria-hidden", "true");
    target.prepend(surface);
    const filter = document.createElementNS(svgNS, "filter");
    filter.id = `hh-glass-lens-${index}`;
    filter.setAttribute("x", "0%");
    filter.setAttribute("y", "0%");
    filter.setAttribute("width", "100%");
    filter.setAttribute("height", "100%");
    filter.setAttribute("color-interpolation-filters", "sRGB");
    const image = document.createElementNS(svgNS, "feImage");
    image.setAttribute("result", "lens-map");
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("preserveAspectRatio", "none");
    const displace = document.createElementNS(svgNS, "feDisplacementMap");
    displace.setAttribute("in", "SourceGraphic");
    displace.setAttribute("in2", "lens-map");
    displace.setAttribute("scale", "34");
    displace.setAttribute("xChannelSelector", "R");
    displace.setAttribute("yChannelSelector", "G");
    filter.append(image, displace);
    defs.append(filter);
    let sizeKey = "",
      resizeFrame = 0,
      pointerFrame = 0;
    const resize = () => {
      resizeFrame = 0;
      const { width, height } = target.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(target).borderRadius) || 0;
      const key = `${Math.round(width)}:${Math.round(height)}:${radius}`;
      if (!width || !height || key === sizeKey) return;
      sizeKey = key;
      document.documentElement.style.setProperty(
        "--portal-header-height",
        `${height}px`,
      );
      const map = lensMap(width, height, radius);
      if (!map) return;
      image.setAttribute("href", map);
      surface.style.setProperty("--glass-lens", `url("#${filter.id}")`);
      surface.dataset.refraction = "";
    };
    const observer = new ResizeObserver(() => {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(resize);
    });
    observer.observe(target);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let x = 24,
      y = 0;
    const move = (event) => {
      if (motion.matches || event.pointerType === "touch") return;
      const bounds = target.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width) * 100;
      y = ((event.clientY - bounds.top) / bounds.height) * 100;
      if (!pointerFrame)
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          surface.style.setProperty("--glass-x", `${x}%`);
          surface.style.setProperty("--glass-y", `${y}%`);
        });
    };
    const leave = () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      surface.style.removeProperty("--glass-x");
      surface.style.removeProperty("--glass-y");
    };
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", leave);
    motion.addEventListener("change", leave);
    cleanup.push(() => {
      observer.disconnect();
      cancelAnimationFrame(resizeFrame);
      leave();
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      motion.removeEventListener("change", leave);
      surface.remove();
    });
  }
  return () => {
    cleanup.forEach((dispose) => dispose());
    defs.remove();
    document.documentElement.style.removeProperty("--portal-header-height");
  };
}
