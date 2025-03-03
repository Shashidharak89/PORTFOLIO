import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const PortfolioScene = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cssContainerRef = useRef(null);

  // Scene state
  const [currentView, setCurrentView] = useState('intro');
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Sample portfolio data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      color: 0x5644ff,
      position: new THREE.Vector3(-8, 2, -10)
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather visualization dashboard using weather API and D3.js.",
      technologies: ["JavaScript", "D3.js", "CSS Grid", "Weather API"],
      color: 0xff4477,
      position: new THREE.Vector3(0, 2, -15)
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Mobile-responsive social media application with real-time messaging.",
      technologies: ["React", "Firebase", "Socket.io", "TailwindCSS"],
      color: 0x44ff88,
      position: new THREE.Vector3(8, 2, -10)
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);
    
    // Fog for depth effect
    scene.fog = new THREE.Fog(0x111827, 10, 50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    camera.position.y = 2;

    // Main WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    
    // CSS3D Renderer for HTML content
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.pointerEvents = 'none';
    cssContainerRef.current.appendChild(cssRenderer.domElement);

    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 1.5;
    
    // Add event listener for camera movement
    controls.addEventListener('change', () => {
      // Calculate distance from center
      const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
      
      // Show projects when zoomed in close enough
      if (distance < 10 && !projectsVisible) {
        setProjectsVisible(true);
        setCurrentView('projects');
      } else if (distance >= 10 && projectsVisible) {
        setProjectsVisible(false);
        setCurrentView('intro');
        setActiveProject(null);
      }
      
      // Check if camera is focused on any project
      projects.forEach(project => {
        const distToProject = camera.position.distanceTo(project.position);
        if (distToProject < 7 && projectsVisible) {
          setActiveProject(project.id);
        }
      });
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x3366ff, 3, 20);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff5533, 3, 20);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);

    // Create a central name display
    const createNameDisplay = () => {
      const nameGroup = new THREE.Group();
      
      // Create a platform/base
      const baseGeometry = new THREE.CylinderGeometry(3, 3.5, 0.5, 32);
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.8,
        roughness: 0.2
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.receiveShadow = true;
      nameGroup.add(base);
      
      // Create a rotating ring
      const ringGeometry = new THREE.TorusGeometry(3.2, 0.1, 16, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        emissive: 0x1133aa,
        metalness: 0.9,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.5;
      nameGroup.add(ring);
      
      // Add a holographic-like title display using CSS3D
      const nameElement = document.createElement('div');
      nameElement.className = 'name-display';
      nameElement.innerHTML = `
        <h1>John Doe</h1>
        <h2>Interactive Developer</h2>
      `;
      nameElement.style.color = 'white';
      nameElement.style.fontFamily = 'Arial, sans-serif';
      nameElement.style.textAlign = 'center';
      nameElement.style.fontSize = '16px';
      nameElement.style.textShadow = '0 0 10px rgba(0, 153, 255, 0.8)';
      nameElement.style.width = '300px';
      
      const nameObject = new CSS3DObject(nameElement);
      nameObject.position.set(0, 2.5, 0);
      nameObject.scale.set(0.02, 0.02, 0.02);
      nameGroup.add(nameObject);
      
      // Add CSS animations for the HTML content
      const style = document.createElement('style');
      style.innerHTML = `
        .name-display h1 {
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 10px;
          animation: pulse 2s infinite;
        }
        
        .name-display h2 {
          font-size: 24px;
          opacity: 0.8;
        }
        
        @keyframes pulse {
          0% { text-shadow: 0 0 10px rgba(0, 153, 255, 0.8); }
          50% { text-shadow: 0 0 20px rgba(0, 153, 255, 1); }
          100% { text-shadow: 0 0 10px rgba(0, 153, 255, 0.8); }
        }
        
        .project-card {
          background: rgba(30, 41, 59, 0.8);
          border-radius: 10px;
          padding: 20px;
          width: 400px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.5s ease;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .project-card h3 {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .project-card p {
          font-size: 16px;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .project-card .tech-tag {
          display: inline-block;
          background: rgba(59, 130, 246, 0.3);
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 12px;
        }
        
        .view-btn {
          background: rgb(37, 99, 235);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }
        
        .view-btn:hover {
          background: rgb(29, 78, 216);
        }
        
        .instruction {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          pointer-events: none;
          z-index: 100;
          transition: opacity 0.5s;
        }
      `;
      document.head.appendChild(style);
      
      return { nameGroup, ring };
    };
    
    // Create project nodes
    const createProjectNodes = () => {
      const projectGroup = new THREE.Group();
      
      // Create project cards with CSS3D
      projects.forEach(project => {
        // Create a 3D marker for the project
        const markerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const markerMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          emissive: project.color,
          emissiveIntensity: 0.3,
          metalness: 0.7,
          roughness: 0.2
        });
        
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(project.position);
        marker.castShadow = true;
        projectGroup.add(marker);
        
        // Create rings around the marker
        const ringGeometry = new THREE.TorusGeometry(0.8, 0.05, 16, 32);
        const ringMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          transparent: true,
          opacity: 0.7,
          emissive: project.color,
          emissiveIntensity: 0.2
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(project.position);
        ring.rotation.x = Math.PI / 2;
        projectGroup.add(ring);
        
        // Add a connecting line to the center
        const lineMaterial = new THREE.LineBasicMaterial({
          color: project.color,
          transparent: true,
          opacity: 0.4
        });
        
        const points = [
          new THREE.Vector3(0, 0, 0),
          project.position
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        projectGroup.add(line);
        
        // Create HTML project card
        const cardElement = document.createElement('div');
        cardElement.className = 'project-card';
        cardElement.id = `project-${project.id}`;
        cardElement.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <button class="view-btn">View Project</button>
        `;
        
        // Position card near the marker but slightly offset
        const cardObject = new CSS3DObject(cardElement);
        cardObject.position.copy(project.position);
        cardObject.position.y += 2;
        cardObject.scale.set(0.01, 0.01, 0.01);
        projectGroup.add(cardObject);
        
        // Store reference to card element for later updates
        project.cardElement = cardElement;
        project.marker = marker;
        project.ring = ring;
      });
      
      return projectGroup;
    };
    
    // Create floating skill nodes
    const createSkillNodes = () => {
      const skillsGroup = new THREE.Group();
      const skills = ['Three.js', 'React', 'JavaScript', 'WebGL', 'CSS3', 'Node.js', 'UI/UX'];
      
      skills.forEach((skill, index) => {
        // Calculate position in a spiral pattern
        const angle = index * 0.6;
        const radius = 7 + index * 0.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5) * 2 + 5;
        
        // Create skill node
        const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const nodeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xaaccff,
          emissiveIntensity: 0.5
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(x, y, z);
        skillsGroup.add(node);
        
        // Add skill label
        const skillElement = document.createElement('div');
        skillElement.textContent = skill;
        skillElement.style.color = 'white';
        skillElement.style.background = 'rgba(0, 0, 0, 0.6)';
        skillElement.style.padding = '3px 8px';
        skillElement.style.borderRadius = '12px';
        skillElement.style.fontSize = '14px';
        
        const skillObject = new CSS3DObject(skillElement);
        skillObject.position.set(x, y + 0.5, z);
        skillObject.scale.set(0.02, 0.02, 0.02);
        skillsGroup.add(skillObject);
      });
      
      return skillsGroup;
    };
    
    // Add instruction element
    const addInstructions = () => {
      const instruction = document.createElement('div');
      instruction.className = 'instruction';
      instruction.id = 'camera-instruction';
      instruction.textContent = 'Zoom in to explore projects | Drag to rotate';
      document.body.appendChild(instruction);
      
      return instruction;
    };
    
    // Create scene elements
    const { nameGroup, ring: nameRing } = createNameDisplay();
    const projectGroup = createProjectNodes();
    const skillsGroup = createSkillNodes();
    const instruction = addInstructions();
    
    // Add everything to the scene
    scene.add(nameGroup);
    scene.add(projectGroup);
    scene.add(skillsGroup);
    
    // Hide project cards initially
    projects.forEach(project => {
      if (project.cardElement) {
        project.cardElement.style.opacity = '0';
      }
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate name ring
      if (nameRing) {
        nameRing.rotation.z = elapsedTime * 0.2;
      }
      
      // Animate project rings
      projects.forEach(project => {
        if (project.ring) {
          project.ring.rotation.z = elapsedTime * 0.5;
          
          // Pulse effect for active project
          if (activeProject === project.id) {
            const scale = 1 + Math.sin(elapsedTime * 4) * 0.1;
            project.marker.scale.set(scale, scale, scale);
            project.marker.material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 4) * 0.2;
          } else {
            project.marker.scale.set(1, 1, 1);
            project.marker.material.emissiveIntensity = 0.3;
          }
        }
      });
      
      // Update orbits of skill nodes
      skillsGroup.children.forEach((child, index) => {
        if (index % 2 === 0) { // Only move the spheres, not the labels
          const orbitSpeed = 0.2 + (index * 0.01);
          const orbitRadius = 7 + (index * 0.2);
          const angle = elapsedTime * orbitSpeed;
          
          child.position.x = Math.cos(angle) * orbitRadius;
          child.position.z = Math.sin(angle) * orbitRadius;
          child.position.y = Math.sin(elapsedTime * 0.5 + index) * 2 + 5;
          
          // Update label position to follow its node
          if (index + 1 < skillsGroup.children.length) {
            skillsGroup.children[index + 1].position.x = child.position.x;
            skillsGroup.children[index + 1].position.z = child.position.z;
            skillsGroup.children[index + 1].position.y = child.position.y + 0.5;
          }
        }
      });
      
      // Update controls
      controls.update();
      
      // Render both renderers
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Update project visibility based on state
    const updateProjectVisibility = () => {
      projects.forEach(project => {
        if (project.cardElement) {
          if (projectsVisible) {
            project.cardElement.classList.add('visible');
            
            // Highlight active project
            if (activeProject === project.id) {
              project.cardElement.style.transform = 'scale(1.1)';
              project.cardElement.style.boxShadow = `0 0 30px ${new THREE.Color(project.color).getStyle()}`;
            } else {
              project.cardElement.style.transform = 'scale(1)';
              project.cardElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            }
          } else {
            project.cardElement.classList.remove('visible');
          }
        }
      });
      
      // Update instruction text
      if (instruction) {
        if (projectsVisible) {
          instruction.textContent = 'Move closer to projects to view details';
        } else {
          instruction.textContent = 'Zoom in to explore projects | Drag to rotate';
        }
      }
    };
    
    // Effect cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      projects.forEach(project => {
        if (project.marker) {
          project.marker.geometry.dispose();
          project.marker.material.dispose();
        }
        if (project.ring) {
          project.ring.geometry.dispose();
          project.ring.material.dispose();
        }
      });
      
      renderer.dispose();
      
      // Remove instruction
      if (instruction && instruction.parentNode) {
        instruction.parentNode.removeChild(instruction);
      }
      
      // Remove style
      const style = document.querySelector('style');
      if (style) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);
  
  // Update DOM when state changes
  useEffect(() => {
    // Update project visibility based on state
    projects.forEach(project => {
      const element = document.getElementById(`project-${project.id}`);
      if (element) {
        if (projectsVisible) {
          element.classList.add('visible');
          
          // Highlight active project
          if (activeProject === project.id) {
            element.style.transform = 'scale(1.1)';
            element.style.boxShadow = `0 0 30px ${new THREE.Color(project.color).getStyle()}`;
          } else {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
          }
        } else {
          element.classList.remove('visible');
        }
      }
    });
    
    // Update instruction text
    const instruction = document.getElementById('camera-instruction');
    if (instruction) {
      if (projectsVisible) {
        instruction.textContent = 'Move closer to projects to view details';
      } else {
        instruction.textContent = 'Zoom in to explore projects | Drag to rotate';
      }
    }
  }, [projectsVisible, activeProject]);

  return (
    <div className="relative w-full h-screen" ref={containerRef}>
      {/* Canvas for Three.js */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      {/* Container for CSS3D elements */}
      <div ref={cssContainerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
    </div>
  );
};

export default PortfolioScene;