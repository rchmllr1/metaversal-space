'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    const colorPalette = [
      new THREE.Color('#00d4ff'), // cyan
      new THREE.Color('#8b5cf6'), // purple
      new THREE.Color('#ec4899'), // pink
      new THREE.Color('#0ea5e9'), // sky blue
      new THREE.Color('#6366f1'), // indigo
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Gentle floating motion
          pos.x += sin(uTime * 0.3 + position.y * 0.1) * 0.5;
          pos.y += cos(uTime * 0.2 + position.x * 0.1) * 0.5;
          pos.z += sin(uTime * 0.1 + position.x * 0.05) * 0.3;
          
          // Mouse influence
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vec2 screenPos = mvPosition.xy / mvPosition.w;
          float dist = distance(screenPos, uMouse);
          float influence = smoothstep(0.8, 0.0, dist);
          
          // Push particles gently away from cursor and make them glow
          pos.x += (screenPos.x - uMouse.x) * influence * 3.0;
          pos.y += (screenPos.y - uMouse.y) * influence * 3.0;
          
          vAlpha = 0.3 + influence * 0.7;
          
          mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (30.0 / -mvPosition.z) * (1.0 + influence * 2.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          
          // Soft glow falloff
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
          
          // Add core brightness
          float core = smoothstep(0.2, 0.0, d) * 0.5;
          
          gl_FragColor = vec4(vColor + core, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = 500;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Update connection lines
      const posArr = geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const connectionDist = 8;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i += 4) {
        for (let j = i + 4; j < PARTICLE_COUNT && lineIdx < maxLines; j += 4) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            const li = lineIdx * 6;
            linePositions[li] = posArr[i * 3];
            linePositions[li + 1] = posArr[i * 3 + 1];
            linePositions[li + 2] = posArr[i * 3 + 2];
            linePositions[li + 3] = posArr[j * 3];
            linePositions[li + 4] = posArr[j * 3 + 1];
            linePositions[li + 5] = posArr[j * 3 + 2];

            const alpha = 1 - dist / connectionDist;
            lineColors[li] = 0 * alpha;
            lineColors[li + 1] = 0.83 * alpha;
            lineColors[li + 2] = 1 * alpha;
            lineColors[li + 3] = 0 * alpha;
            lineColors[li + 4] = 0.83 * alpha;
            lineColors[li + 5] = 1 * alpha;

            lineIdx++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Gentle camera sway
      camera.position.x = Math.sin(elapsed * 0.1) * 2;
      camera.position.y = Math.cos(elapsed * 0.08) * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
