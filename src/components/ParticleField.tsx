'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initRef.current) return;
    initRef.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const palette = [
      [0.0, 0.3, 0.38],   // muted cyan
      [0.25, 0.2, 0.4],   // muted purple
      [0.04, 0.3, 0.4],   // dark sky
      [0.35, 0.3, 0.2],   // dusty warm
      [0.3, 0.27, 0.2],   // tarnished metal
      [0.2, 0.2, 0.35],   // dark indigo
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      basePositions[i3] = (Math.random() - 0.5) * 140;
      basePositions[i3 + 1] = (Math.random() - 0.5) * 90;
      basePositions[i3 + 2] = (Math.random() - 0.5) * 70;

      positions[i3] = basePositions[i3];
      positions[i3 + 1] = basePositions[i3 + 1];
      positions[i3 + 2] = basePositions[i3 + 2];

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c[0];
      colors[i3 + 1] = c[1];
      colors[i3 + 2] = c[2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Connection lines
    const maxLines = 400;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Float particles
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        pos[i3] = basePositions[i3] + Math.sin(t * 0.3 + basePositions[i3 + 1] * 0.05) * 1.5;
        pos[i3 + 1] = basePositions[i3 + 1] + Math.cos(t * 0.2 + basePositions[i3] * 0.05) * 1.5;
        pos[i3 + 2] = basePositions[i3 + 2] + Math.sin(t * 0.15 + basePositions[i3] * 0.03) * 0.8;
      }
      geometry.attributes.position.needsUpdate = true;

      // Connection lines between nearby particles
      let lineIdx = 0;
      const threshold = 8;
      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i += 4) {
        for (let j = i + 4; j < PARTICLE_COUNT && lineIdx < maxLines; j += 4) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < threshold) {
            const li = lineIdx * 6;
            const fade = 1 - dist / threshold;
            linePositions[li] = pos[i * 3];
            linePositions[li + 1] = pos[i * 3 + 1];
            linePositions[li + 2] = pos[i * 3 + 2];
            linePositions[li + 3] = pos[j * 3];
            linePositions[li + 4] = pos[j * 3 + 1];
            linePositions[li + 5] = pos[j * 3 + 2];

            // Alternate warm/cool connection lines
            const warm = lineIdx % 3 === 0;
            lineColors[li] = warm ? 0.4 * fade : 0.0 * fade;
            lineColors[li + 1] = warm ? 0.25 * fade : 0.3 * fade;
            lineColors[li + 2] = warm ? 0.1 * fade : 0.4 * fade;
            lineColors[li + 3] = warm ? 0.4 * fade : 0.0 * fade;
            lineColors[li + 4] = warm ? 0.25 * fade : 0.3 * fade;
            lineColors[li + 5] = warm ? 0.1 * fade : 0.4 * fade;
            lineIdx++;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIdx * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Camera sway
      camera.position.x = Math.sin(t * 0.1) * 3;
      camera.position.y = Math.cos(t * 0.08) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      initRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
