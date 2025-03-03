import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles/AnimatedPortfolio.css';

const AnimatedPortfolio = ({ userInfo }) => {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Default user info if none provided
  const defaultInfo = {
    name: "Your Name",
    title: "Web Developer & 3D Designer",
    skills: ["React", "Three.js", "JavaScript", "CSS", "Node.js"],
    projects: ["Portfolio", "E-commerce Site", "3D Visualizer", "Data Dashboard"],
    contact: "youremail@example.com"
  };
  
  const info = userInfo || defaultInfo;

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6633ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x33ff99, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Central object - Name representation
    const centralGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const centralMaterial = new THREE.MeshStandardMaterial({
      color: 0x33aaff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x112244,
      emissiveIntensity: 0.5
    });
    const centralObject = new THREE.Mesh(centralGeometry, centralMaterial);
    scene.add(centralObject);
    
    // Create particle system for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create animated cubes for skills
    const skillCubes = [];
    
    info.skills.forEach((skill, index) => {
      const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${index * 60}, 100%, 70%)`),
        metalness: 0.7,
        roughness: 0.2
      });
      
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      const angle = (index / info.skills.length) * Math.PI * 2;
      const radius = 3;
      
      cube.position.x = Math.cos(angle) * radius;
      cube.position.y = Math.sin(angle) * radius;
      cube.position.z = -2;
      
      scene.add(cube);
      skillCubes.push({ mesh: cube, initialAngle: angle, radius });
    });
    
    // Main animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the central object
      centralObject.rotation.x = elapsedTime * 0.2;
      centralObject.rotation.y = elapsedTime * 0.5;
      
      // Animate skill cubes
      skillCubes.forEach((cube, index) => {
        const { mesh, initialAngle, radius } = cube;
        mesh.rotation.x = elapsedTime * 0.5;
        mesh.rotation.y = elapsedTime * 0.3;
        
        // Orbit animation
        mesh.position.x = Math.cos(initialAngle + elapsedTime * 0.5) * radius;
        mesh.position.y = Math.sin(initialAngle + elapsedTime * 0.5) * radius;
        
        // Pulse size
        const pulse = Math.sin(elapsedTime * 2 + index) * 0.1 + 1;
        mesh.scale.set(pulse, pulse, pulse);
      });
      
      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      
      // Moving lights
      pointLight.position.x = Math.sin(elapsedTime * 0.3) * 5;
      pointLight.position.z = Math.cos(elapsedTime * 0.3) * 5;
      
      pointLight2.position.x = Math.sin(elapsedTime * 0.4 + 2) * 5;
      pointLight2.position.z = Math.cos(elapsedTime * 0.4 + 2) * 5;
      
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = currentRef;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (currentRef && renderer.domElement && currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      if (renderer) renderer.dispose();
      if (controls) controls.dispose();
    };
  }, [info]);
  
  return (
    <div className="animated-portfolio-container">
      <div 
        ref={mountRef} 
        className="canvas-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setActive(!active)}
      />
      
      <div className={`info-overlay ${active ? 'active' : hovered ? 'hovered' : ''}`}>
        <h1>{info.name}</h1>
        <h2>{info.title}</h2>
        
        <div className="info-section">
          <h3>Skills</h3>
          <ul>
            {info.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Projects</h3>
          <ul>
            {info.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
        
        <div className="contact-info">
          <h3>Contact</h3>
          <p>{info.contact}</p>
        </div>
      </div>
      
      <div className="instructions">
        Click to show/hide details • Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default AnimatedPortfolio;