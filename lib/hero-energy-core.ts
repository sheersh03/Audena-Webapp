import * as THREE from "three";

const LOOP_DURATION = 10;
const PARTICLE_COUNT = 12000;
const CURVE_COUNT = 14;
const CURVE_POINTS = 220;

const particleVertexShader = `
  precision highp float;

  attribute float aAngle;
  attribute float aRadius;
  attribute float aHeight;
  attribute float aSpeed;
  attribute float aScale;
  attribute float aBand;
  attribute float aDrift;

  uniform float uTime;
  uniform float uLoopDuration;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  const float TAU = 6.28318530718;

  vec3 palette(float t) {
    vec3 cyan = vec3(0.22, 0.96, 1.0);
    vec3 teal = vec3(0.04, 0.84, 0.78);
    vec3 violet = vec3(0.78, 0.28, 1.0);
    vec3 electric = vec3(0.10, 0.36, 1.0);
    vec3 mixA = mix(cyan, teal, smoothstep(0.0, 0.45, t));
    vec3 mixB = mix(violet, electric, smoothstep(0.45, 1.0, t));
    return mix(mixA, mixB, smoothstep(0.35, 0.85, t));
  }

  float loopNoise(vec3 p, float phase) {
    return sin(p.x + phase)
      + 0.5 * sin(p.y * 1.7 - phase * 1.3)
      + 0.35 * cos(p.z * 2.1 + phase * 0.7)
      + 0.2 * sin((p.x + p.z) * 2.7 - phase * 1.9);
  }

  void main() {
    float loopT = mod(uTime, uLoopDuration) / uLoopDuration;
    float phase = loopT * TAU;

    float swirl = aAngle + phase * (0.55 + aSpeed * 1.4);
    float turbulence = loopNoise(
      vec3(aAngle * 1.7 + aDrift, aHeight * 2.0, aRadius * 2.6),
      phase + aBand * 4.0
    );

    float radius = aRadius + 0.16 * sin(phase + aBand * TAU + aDrift * 2.0) + 0.06 * turbulence;
    float angle = swirl + turbulence * 0.22;
    float lift = aHeight
      + 0.26 * sin(phase * 1.7 + aAngle * 2.5 + aBand * 6.0)
      + 0.08 * turbulence;

    vec3 pos = vec3(cos(angle) * radius, lift, sin(angle) * radius);
    pos += normalize(vec3(pos.x, 0.3 + abs(pos.y), pos.z)) * (0.08 + 0.06 * aBand);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aScale * (280.0 / max(-mvPosition.z, 0.1)) * uPixelRatio;

    float tint = fract(aBand * 0.8 + aDrift * 0.3);
    vColor = palette(tint);
    vAlpha = 0.55 + 0.45 * smoothstep(-0.6, 1.2, radius);
  }
`;

const particleFragmentShader = `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float dist = length(centered);
    float glow = exp(-10.0 * dist * dist);
    float alpha = smoothstep(0.52, 0.12, dist) * glow * vAlpha;
    gl_FragColor = vec4(vColor * (0.75 + glow * 2.2), alpha);
  }
`;

const sphereVertexShader = `
  precision highp float;

  varying vec3 vWorldPosition;
  varying vec3 vNormalDir;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormalDir = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const sphereFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uLoopDuration;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  varying vec3 vWorldPosition;
  varying vec3 vNormalDir;

  const float TAU = 6.28318530718;

  void main() {
    float loopT = mod(uTime, uLoopDuration) / uLoopDuration;
    float phase = loopT * TAU;

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormalDir), viewDir), 0.0), 2.8);
    float pulse = 0.55 + 0.45 * sin(phase * 2.0);
    float bands = 0.5 + 0.5 * sin(phase * 3.0 + vNormalDir.y * 7.0 + vNormalDir.x * 4.0);

    vec3 color = mix(uColorA, uColorB, 0.5 + 0.5 * vNormalDir.y);
    color += uColorC * bands * 0.58;
    color *= 1.18;

    float alpha = 0.2 + fresnel * 0.84 + pulse * 0.12;
    gl_FragColor = vec4(color, alpha);
  }
`;

const haloFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uLoopDuration;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec3 vWorldPosition;
  varying vec3 vNormalDir;

  const float TAU = 6.28318530718;

  void main() {
    float loopT = mod(uTime, uLoopDuration) / uLoopDuration;
    float phase = loopT * TAU;

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(normalize(vNormalDir), viewDir), 0.0), 1.8);
    float shimmer = 0.65 + 0.35 * sin(phase * 2.0 + vNormalDir.y * 5.0);
    vec3 color = mix(uColorA, uColorB, 0.5 + 0.5 * vNormalDir.y) * 1.3;

    gl_FragColor = vec4(color * shimmer, fresnel * 0.48);
  }
`;

const lineVertexShader = `
  precision highp float;

  attribute float aProgress;

  uniform float uTime;
  uniform float uLoopDuration;
  uniform float uSeed;

  varying vec3 vColor;
  varying float vAlpha;

  const float TAU = 6.28318530718;

  vec3 palette(float t) {
    vec3 cyan = vec3(0.22, 0.96, 1.0);
    vec3 teal = vec3(0.04, 0.84, 0.78);
    vec3 violet = vec3(0.78, 0.28, 1.0);
    vec3 electric = vec3(0.10, 0.36, 1.0);
    return mix(mix(cyan, teal, smoothstep(0.0, 0.5, t)), mix(violet, electric, smoothstep(0.2, 1.0, t)), 0.5);
  }

  void main() {
    float loopT = mod(uTime, uLoopDuration) / uLoopDuration;
    float phase = loopT * TAU;
    float t = aProgress * TAU;

    float orbit = t + phase * (0.22 + uSeed * 0.15) + uSeed * TAU;
    float radius = 1.32
      + 0.28 * sin(t * 3.0 + phase * 1.1 + uSeed * 8.0)
      + 0.1 * cos(t * 7.0 - phase * 1.5 + uSeed * 5.0);
    float vertical = 0.58 * sin(t * (1.6 + uSeed * 0.6) + phase * 1.7 + uSeed * 4.0);

    vec3 pos = vec3(cos(orbit) * radius, vertical, sin(orbit) * radius);
    pos += vec3(
      0.16 * cos(t * 4.0 + phase * 2.0 + uSeed * 12.0),
      0.12 * sin(t * 5.0 - phase * 1.6 + uSeed * 7.0),
      0.16 * sin(t * 3.0 + phase * 1.8 + uSeed * 9.0)
    );

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.22 + 0.78 * sin(aProgress * 3.14159);
    vColor = palette(fract(uSeed + aProgress * 0.15));
  }
`;

const lineFragmentShader = `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(vColor * 1.15, vAlpha * 0.56);
  }
`;

function makeParticleField() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const angles = new Float32Array(PARTICLE_COUNT);
  const radii = new Float32Array(PARTICLE_COUNT);
  const heights = new Float32Array(PARTICLE_COUNT);
  const speeds = new Float32Array(PARTICLE_COUNT);
  const scales = new Float32Array(PARTICLE_COUNT);
  const bands = new Float32Array(PARTICLE_COUNT);
  const drifts = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    angles[i] = Math.random() * Math.PI * 2;
    radii[i] = 0.82 + Math.pow(Math.random(), 0.72) * 1.5;
    heights[i] = (Math.random() - 0.5) * 1.7;
    speeds[i] = 0.35 + Math.random() * 0.9;
    scales[i] = 1.6 + Math.random() * 3.6;
    bands[i] = Math.random();
    drifts[i] = Math.random() * 2.0 - 1.0;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
  geometry.setAttribute("aHeight", new THREE.BufferAttribute(heights, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aBand", new THREE.BufferAttribute(bands, 1));
  geometry.setAttribute("aDrift", new THREE.BufferAttribute(drifts, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLoopDuration: { value: LOOP_DURATION },
      uPixelRatio: { value: 1 },
    },
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return {
    geometry,
    material,
    points: new THREE.Points(geometry, material),
  };
}

function makeFieldLines() {
  const lines: THREE.LineLoop[] = [];
  const materials: THREE.ShaderMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  for (let i = 0; i < CURVE_COUNT; i += 1) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(CURVE_POINTS * 3);
    const progress = new Float32Array(CURVE_POINTS);

    for (let p = 0; p < CURVE_POINTS; p += 1) {
      progress[p] = p / CURVE_POINTS;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uLoopDuration: { value: LOOP_DURATION },
        uSeed: { value: i / CURVE_COUNT },
      },
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const line = new THREE.LineLoop(geometry, material);
    lines.push(line);
    materials.push(material);
    geometries.push(geometry);
  }

  return { lines, materials, geometries };
}

export function mountHeroEnergyCore(container: HTMLElement) {
  container.innerHTML = "";

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 1);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.zIndex = "2";

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");

  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.1, 5.8);

  const root = new THREE.Group();
  scene.add(root);

  const sphereGeometry = new THREE.SphereGeometry(0.92, 96, 96);
  const sphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLoopDuration: { value: LOOP_DURATION },
      uColorA: { value: new THREE.Color("#59f6ff") },
      uColorB: { value: new THREE.Color("#1d53ff") },
      uColorC: { value: new THREE.Color("#bb4dff") },
    },
    vertexShader: sphereVertexShader,
    fragmentShader: sphereFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  root.add(sphere);

  const haloMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLoopDuration: { value: LOOP_DURATION },
      uColorA: { value: new THREE.Color("#5ef7ff") },
      uColorB: { value: new THREE.Color("#9b48ff") },
    },
    vertexShader: sphereVertexShader,
    fragmentShader: haloFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const halo = new THREE.Mesh(sphereGeometry, haloMaterial);
  halo.scale.setScalar(1.44);
  root.add(halo);

  const field = makeParticleField();
  root.add(field.points);

  const lines = makeFieldLines();
  lines.lines.forEach((line) => root.add(line));

  const ambientGeometry = new THREE.BufferGeometry();
  const ambientCount = 1800;
  const ambientPositions = new Float32Array(ambientCount * 3);
  for (let i = 0; i < ambientCount; i += 1) {
    const radius = 2.2 + Math.random() * 1.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    ambientPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    ambientPositions[i * 3 + 1] = radius * Math.cos(phi) * 0.75;
    ambientPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  ambientGeometry.setAttribute("position", new THREE.BufferAttribute(ambientPositions, 3));
  const ambientMaterial = new THREE.PointsMaterial({
    color: "#6ceeff",
    size: 0.024,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ambientDust = new THREE.Points(ambientGeometry, ambientMaterial);
  root.add(ambientDust);

  const resize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    field.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
  };

  resize();

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(container);

  const start = performance.now();

  const render = () => {
    const elapsedSeconds = (performance.now() - start) / 1000;
    const loopTime = elapsedSeconds % LOOP_DURATION;
    const orbit = (loopTime / LOOP_DURATION) * Math.PI * 2;

    sphereMaterial.uniforms.uTime.value = loopTime;
    haloMaterial.uniforms.uTime.value = loopTime;
    field.material.uniforms.uTime.value = loopTime;
    lines.materials.forEach((material) => {
      material.uniforms.uTime.value = loopTime;
    });

    root.rotation.y = orbit * 0.45;
    root.rotation.x = Math.sin(orbit) * 0.08;
    ambientDust.rotation.y = -orbit * 0.2;

    camera.position.x = Math.sin(orbit) * 0.55;
    camera.position.y = 0.1 + Math.sin(orbit * 2.0) * 0.18;
    camera.position.z = 5.7 + Math.cos(orbit) * 0.12;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(render);

  return () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();

    sphereGeometry.dispose();
    sphereMaterial.dispose();
    haloMaterial.dispose();
    field.geometry.dispose();
    field.material.dispose();
    lines.geometries.forEach((geometry) => geometry.dispose());
    lines.materials.forEach((material) => material.dispose());
    ambientGeometry.dispose();
    ambientMaterial.dispose();
    renderer.dispose();

    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };
}
