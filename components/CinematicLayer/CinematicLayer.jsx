'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import styles from './CinematicLayer.module.css';

/* ------------------------------------------------------------------ */
/* Shaders: all motion runs on the GPU. One draw call for every mote.  */
/* ------------------------------------------------------------------ */
const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSize;

  void main() {
    vec3 p = position;
    float t = uTime * aSpeed;

    // Slow sine-wave drift on every axis.
    p.x += sin(t + aPhase) * 0.45 + sin(t * 0.37 + aPhase * 2.1) * 0.25;
    p.z += sin(t * 0.6 + aPhase * 0.9) * 0.6;

    // Gentle upward float that wraps around the frame.
    float h = 13.0;
    p.y = mod(position.y + 6.5 + uTime * aSpeed * 0.14, h) - 6.5;
    p.y += sin(t * 0.8 + aPhase * 1.7) * 0.5;
    float edge = smoothstep(0.0, 1.8, p.y + 6.5) * smoothstep(0.0, 1.8, 6.5 - p.y);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * uScale / -mv.z;

    // Big bokeh discs stay faint, small sparks glow brighter.
    float bokeh = smoothstep(0.08, 0.7, aSize);
    float twinkle = 0.65 + 0.35 * sin(t * 0.9 + aPhase * 2.0);
    vAlpha = mix(0.85, 0.2, bokeh) * twinkle * edge;
    vColor = aColor;
    vSize = bokeh;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSize;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    // Soft falloff: no hard edges, dreamy blur.
    float core = pow(smoothstep(0.5, 0.0, d), 2.0);
    // Faint rim on larger motes, like a real lens bokeh.
    float rim = smoothstep(0.06, 0.0, abs(d - 0.4)) * 0.22 * vSize;

    gl_FragColor = vec4(vColor * (core + rim), (core + rim) * vAlpha);
  }
`;

/* Warm orange, amber and white. */
const PALETTE = [
  [1.0, 0.52, 0.16],
  [1.0, 0.72, 0.38],
  [1.0, 0.93, 0.82],
];

function pickColor() {
  const r = Math.random();
  return r < 0.55 ? PALETTE[0] : r < 0.78 ? PALETTE[1] : PALETTE[2];
}

function init(THREE, mount, control, density) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 760px)').matches;
  const count = Math.round((isSmall ? 70 : 150) * density);
  const speedScale = reduceMotion ? 0.25 : 1;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false, // soft sprites don't need MSAA
    powerPreference: 'high-performance',
  });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 40);
  camera.position.set(0, 0, 7);

  /* Geometry: attributes are generated once, never touched again. */
  const position = new Float32Array(count * 3);
  const aSize = new Float32Array(count);
  const aPhase = new Float32Array(count);
  const aSpeed = new Float32Array(count);
  const aColor = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    position[i * 3] = (Math.random() - 0.5) * 22;
    position[i * 3 + 1] = (Math.random() - 0.5) * 13;
    position[i * 3 + 2] = -9 + Math.random() * 12;

    // Mostly small sparks, a few large bokeh discs.
    const big = Math.random() < 0.22;
    aSize[i] = big ? 0.35 + Math.random() * 0.4 : 0.07 + Math.random() * 0.14;
    aPhase[i] = Math.random() * Math.PI * 2;
    aSpeed[i] = 0.25 + Math.random() * 0.45;

    const c = pickColor();
    aColor[i * 3] = c[0];
    aColor[i * 3 + 1] = c[1];
    aColor[i * 3 + 2] = c[2];
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uScale: { value: 400 },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false; // positions are animated in the shader
  scene.add(points);

  /* Sizing */
  const resize = () => {
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    material.uniforms.uScale.value = h * 0.5;
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);

  /* Mouse parallax: target is eased inside the loop. */
  const mouse = { x: 0, y: 0 };
  const onPointerMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  /* Render loop that only runs when it can be seen. */
  let raf = 0;
  let last = 0;
  let time = 0;
  let inView = true;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    time += dt * speedScale;
    material.uniforms.uTime.value = time;

    const k = 1 - Math.exp(-dt * 2.2);
    camera.position.x += (mouse.x * 0.7 - camera.position.x) * k;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * k;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  const shouldRun = () => control.active && inView && !document.hidden;
  const sync = () => {
    if (shouldRun() && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!shouldRun() && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  control.sync = sync;

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  io.observe(mount);
  document.addEventListener('visibilitychange', sync);
  sync();

  /* Cleanup: every GPU resource is released. */
  return () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    control.sync = null;
    io.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', sync);
    window.removeEventListener('pointermove', onPointerMove);
    scene.remove(points);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}

const CinematicLayer = forwardRef(function CinematicLayer({ density = 1 }, ref) {
  const mountRef = useRef(null);
  const controlRef = useRef({ active: true, sync: null });

  // Parent can pause rendering (e.g. hero scrolled away) without re-rendering this component.
  useImperativeHandle(
    ref,
    () => ({
      setActive(value) {
        controlRef.current.active = value;
        controlRef.current.sync?.();
      },
    }),
    []
  );

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    // three.js is loaded lazily so it never blocks first paint.
    import('three').then((THREE) => {
      if (disposed || !mountRef.current) return;
      cleanup = init(THREE, mountRef.current, controlRef.current, density);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [density]);

  return <div ref={mountRef} className={styles.layer} aria-hidden="true" />;
});

export default CinematicLayer;
