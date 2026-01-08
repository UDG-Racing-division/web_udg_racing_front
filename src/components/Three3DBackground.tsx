import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
export function Three3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0
  });
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x2d4a8e, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x2d4a8e, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x00d4ff, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    // Create racing car wireframe
    const carGroup = new THREE.Group();
    // Car body (main chassis)
    const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d4a8e,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    carGroup.add(body);
    // Car cabin
    const cabinGeometry = new THREE.BoxGeometry(1.5, 0.8, 2);
    const cabinMaterial = new THREE.MeshPhongMaterial({
      color: 0x3d5ba8,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0, 1.2, -0.5);
    carGroup.add(cabin);
    // Front wing
    const wingGeometry = new THREE.BoxGeometry(2.2, 0.1, 0.5);
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const frontWing = new THREE.Mesh(wingGeometry, wingMaterial);
    frontWing.position.set(0, 0.2, 2.2);
    carGroup.add(frontWing);
    // Rear wing
    const rearWingGeometry = new THREE.BoxGeometry(2, 0.8, 0.2);
    const rearWing = new THREE.Mesh(rearWingGeometry, wingMaterial);
    rearWing.position.set(0, 1.5, -2.2);
    carGroup.add(rearWing);
    // Wheels
    const wheelGeometry = new THREE.TorusGeometry(0.4, 0.2, 8, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d4a8e,
      wireframe: true
    });
    const wheelPositions = [{
      x: -1,
      y: 0.4,
      z: 1.5
    }, {
      x: 1,
      y: 0.4,
      z: 1.5
    }, {
      x: -1,
      y: 0.4,
      z: -1.5
    }, {
      x: 1,
      y: 0.4,
      z: -1.5
    }];
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.rotation.z = Math.PI / 2;
      carGroup.add(wheel);
    });
    // Add car to scene
    carGroup.rotation.y = -Math.PI / 6;
    carGroup.rotation.x = -Math.PI / 12;
    scene.add(carGroup);
    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x2d4a8e,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    // Grid helper (racing track feel)
    const gridHelper = new THREE.GridHelper(20, 20, 0x2d4a8e, 0x1d3a7e);
    gridHelper.position.y = -2;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / window.innerWidth * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      // Rotate car slowly
      carGroup.rotation.y = -Math.PI / 6 + Math.sin(elapsedTime * 0.3) * 0.2;
      carGroup.rotation.x = -Math.PI / 12 + Math.cos(elapsedTime * 0.2) * 0.1;
      // Mouse interaction - move camera
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      // Animate particles
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;
      // Pulse lights
      pointLight1.intensity = 1 + Math.sin(elapsedTime * 2) * 0.3;
      pointLight2.intensity = 0.8 + Math.cos(elapsedTime * 1.5) * 0.3;
      // Animate wheels
      carGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
          child.rotation.x += 0.05;
        }
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      cabinGeometry.dispose();
      cabinMaterial.dispose();
      wingGeometry.dispose();
      wingMaterial.dispose();
      wheelGeometry.dispose();
      wheelMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  return <div ref={containerRef} className="absolute inset-0 opacity-40" style={{
    pointerEvents: 'none'
  }} />;
}