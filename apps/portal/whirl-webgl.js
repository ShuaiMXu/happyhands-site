import {CanvasTexture, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, SRGBColorSpace, WebGLRenderer} from 'three';

// Local to the homepage: layout, selection and phase belong to whirl.js.
// Perspective accounts for the existing radius-based size, rather than adding
// another scale multiplier or replacing the original cover dimensions.
export function createWhirlRenderer(host, images, widths, onLost) {
  const renderer = new WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
  const canvas = renderer.domElement;
  canvas.className = 'pd-whirl-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;';
  renderer.setClearColor(0, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const distance = 3000;
  const camera = new PerspectiveCamera(45, 1, 1, 100000);
  camera.position.z = distance;
  const geometry = new PlaneGeometry(1, 1);
  const meshes = new Array(images.length);
  let disposed = false, previous = 0, firstVisible, px = 0, py = 0;
  const lost = event => { event.preventDefault(); if (!disposed) onLost(); };
  canvas.addEventListener('webglcontextlost', lost);
  host.append(canvas);

  function resize() {
    const mask = host.parentElement;
    const width = Math.max(1, mask.clientWidth), height = Math.max(1, mask.clientHeight);
    const unit = host.offsetWidth / 2500;
    camera.aspect = width / height;
    camera.fov = 2 * Math.atan(height / unit / (2 * distance)) * 180 / Math.PI;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function cover(image, index) {
    if (!image.complete || !image.naturalWidth) return;
    // Match the original 8:5 object-fit:cover and 8% elliptical corners.
    // Small GPU textures bound memory without changing any source asset.
    const bitmap = document.createElement('canvas');
    bitmap.width = 256; bitmap.height = 160;
    const ctx = bitmap.getContext('2d');
    if (!ctx) throw new Error('Cover texture context unavailable');
    ctx.beginPath();
    ctx.roundRect(0, 0, 256, 160, [{x:20.48, y:12.8}]);
    ctx.clip();
    const factor = Math.max(256 / image.naturalWidth, 160 / image.naturalHeight);
    const w = image.naturalWidth * factor, h = image.naturalHeight * factor;
    ctx.drawImage(image, (256-w)/2, (160-h)/2, w, h);
    const texture = new CanvasTexture(bitmap);
    texture.colorSpace = SRGBColorSpace;
    const material = new MeshBasicMaterial({map:texture, transparent:true, depthWrite:false, toneMapped:false});
    const mesh = new Mesh(geometry, material);
    mesh.renderOrder = index;
    scene.add(mesh);
    meshes[index] = mesh;
    return mesh;
  }

  resize();
  return {
    resize,
    render(positions, pointer) {
      if (disposed) return false;
      const now = performance.now();
      const dt = previous ? Math.min((now-previous)/1000, .15) : 0;
      previous = now;
      const settle = 1 - Math.exp(-dt / .18);
      px += (pointer.x-px)*settle;
      py += (pointer.y-py)*settle;
      // One 800ms opening Z-axis tilt. Foreground and header never move.
      const opening = firstVisible === undefined ? 1 : Math.pow(Math.max(0, 1-(now-firstVisible)/800), 3);
      scene.rotation.z = -opening*.045;
      let ready = 0;
      positions.forEach((position, index) => {
        const mesh = meshes[index] || cover(images[index], index);
        if (!mesh) return;
        ready++;
        const scale = Math.max(.025, position.scale);
        const z = distance * (1-1/scale);
        mesh.position.set(position.x/scale, -position.y/scale, z);
        // Perspective of physical planes preserves the old projected width at rest.
        mesh.scale.set(widths[index % widths.length], widths[index % widths.length]*5/8, 1);
        mesh.rotation.set(py*.025, px*.025, -position.angle);
        mesh.material.opacity = position.opacity;
      });
      // Camera translation gives bounded, depth-dependent parallax (<= 12 CSS
      // scene units) without moving the task UI or filling the center clearance.
      camera.position.x = px * 12;
      camera.position.y = -py * 12;
      if (!ready) return false;
      firstVisible ??= now;
      renderer.render(scene, camera);
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      canvas.removeEventListener('webglcontextlost', lost);
      for (const mesh of meshes) {
        mesh?.material.map?.dispose();
        mesh?.material.dispose();
      }
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    }
  };
}
