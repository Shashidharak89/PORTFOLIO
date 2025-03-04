import React, { useEffect, useRef, useState } from 'react';
import './styles/ProjectsSection.css';

const ProjectsSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const projectsContainerRef = useRef(null);
  const observerRef = useRef(null);
  
  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/path-to-your-image1.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com/yourusername/project1"
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "A machine learning powered tool that generates custom content based on user input.",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      image: "/path-to-your-image2.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com/yourusername/project2"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website with modern design principles and animations.",
      technologies: ["React", "Three.js", "GSAP", "CSS"],
      image: "/path-to-your-image3.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com/yourusername/project3"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates and notifications.",
      technologies: ["React", "Firebase", "Redux", "Material UI"],
      image: "/path-to-your-image4.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com/yourusername/project4"
    }
  ];
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for fade-in animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (projectsContainerRef.current) {
      observerRef.current.observe(projectsContainerRef.current);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current && projectsContainerRef.current) {
        observerRef.current.unobserve(projectsContainerRef.current);
      }
    };
  }, []);
  
  // Calculate floating objects positions based on scroll
  const calculatePosition = (baseValue, offset, modifier) => {
    return baseValue + Math.sin((scrollY + offset) * 0.003) * modifier;
  };
  
  // Generate random integer between min and max
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Create particles for the background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: randomInt(4, 12),
    startX: randomInt(0, 100),
    startY: randomInt(0, 100),
    speedX: randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1),
    speedY: randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1),
    delay: randomInt(0, 10) / 10,
    opacity: randomInt(3, 8) / 10
  }));

  // Project tech stack icons
  const techIcons = {
    "React": "⚛️",
    "Node.js": "🟢",
    "MongoDB": "🍃",
    "Stripe": "💳",
    "Python": "🐍",
    "TensorFlow": "📊",
    "Flask": "🧪",
    "Three.js": "🔲",
    "GSAP": "🔄",
    "CSS": "🎨",
    "Firebase": "🔥",
    "Redux": "🟣",
    "Material UI": "🎭"
  };
  
  return (
    <section className="projects_section" id="projects">
      {/* Background particles */}
      <div className="projects_particles_container">
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="projects_particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${randomInt(10, 20)}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated shapes */}
      <div className="projects_shapes_container">
        <div className="projects_shape projects_shape_circle"></div>
        <div className="projects_shape projects_shape_square"></div>
        <div className="projects_shape projects_shape_triangle"></div>
        <div className="projects_shape projects_shape_donut"></div>
        <div className="projects_shape projects_shape_plus"></div>
      </div>
      
      {/* Code snippets floating in background */}
      <div className="projects_code_snippets">
        {[...Array(5)].map((_, index) => (
          <div
            key={`code-snippet-${index}`}
            className="projects_code_snippet"
            style={{
              left: `${calculatePosition(index * 15, index * 150, 15)}%`,
              top: `${calculatePosition(index * 12, index * 80, 10)}%`,
              animationDelay: `${index * 0.6}s`,
              opacity: 0.15 + (index * 0.05)
            }}
          >
            {index === 0 && `const renderProjects = () => {\n  return projects.map(project => (\n    <ProjectCard key={project.id} {...project} />\n  ));\n};`}
            {index === 1 && `function animateOnScroll() {\n  const elements = document.querySelectorAll('.animate');\n  elements.forEach(el => {\n    el.classList.add('active');\n  });\n}`}
            {index === 2 && `@keyframes float {\n  0% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n  100% { transform: translateY(0); }\n}`}
            {index === 3 && `useEffect(() => {\n  AOS.init({\n    duration: 1000,\n    easing: 'ease-in-out'\n  });\n}, []);`}
            {index === 4 && `<motion.div\n  initial={{ opacity: 0 }}\n  animate={{ opacity: 1 }}\n  transition={{ duration: 0.5 }}\n/>`}
          </div>
        ))}
      </div>
      
      {/* Floating project-related objects */}
      <div className="projects_background">
        {[...Array(15)].map((_, index) => (
          <div
            key={`floating-obj-${index}`}
            className={`projects_floating_object projects_floating_object_${index % 4}`}
            style={{
              left: `${calculatePosition(index * 7, index * 100, 15)}%`,
              top: `${calculatePosition(index * 6, index * 50, 12)}%`,
              animationDelay: `${index * 0.2}s`,
              backgroundImage: index % 3 === 0 
                ? `linear-gradient(45deg, #EAECC6, rgba(234, 236, 198, 0.7))` 
                : index % 3 === 1
                  ? `linear-gradient(45deg, #2BC0E4, rgba(43, 192, 228, 0.7))`
                  : `linear-gradient(45deg, #8dd7e9, rgba(141, 215, 233, 0.7))`
            }}
          >
            {index % 5 === 0 && <span className="projects_icon">💻</span>}
            {index % 5 === 1 && <span className="projects_icon">🚀</span>}
            {index % 5 === 2 && <span className="projects_icon">⚙️</span>}
            {index % 5 === 3 && <span className="projects_icon">🔧</span>}
            {index % 5 === 4 && <span className="projects_icon">📱</span>}
          </div>
        ))}
      </div>

      <div 
        className={`projects_content ${isVisible ? 'projects_content_visible' : ''}`} 
        ref={projectsContainerRef}
      >
        <div className="projects_header">
          <div className="projects_title_container">
            <h2 className="projects_title">My Projects</h2>
            <div className="projects_title_bg"></div>
          </div>
          <div className="projects_underline">
            <div className="projects_underline_inner"></div>
          </div>
          <p className="projects_subtitle">
            A collection of my most significant work that showcases my skills and passion
          </p>
        </div>
        
        <div className="projects_container">
          {projects.map((project, index) => (
            <div 
              className="projects_card" 
              key={project.id}
              style={{
                animationDelay: `${0.3 + (index * 0.2)}s`
              }}
            >
              <div className="projects_card_inner">
                <div className="projects_card_front">
                  <div className="projects_card_image_container">
                    <div className="projects_card_image_overlay"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="projects_card_image" 
                    />
                    <div className="projects_card_corner projects_card_corner_tl"></div>
                    <div className="projects_card_corner projects_card_corner_tr"></div>
                    <div className="projects_card_corner projects_card_corner_bl"></div>
                    <div className="projects_card_corner projects_card_corner_br"></div>
                  </div>
                  <div className="projects_card_front_content">
                    <h3 className="projects_card_title">{project.title}</h3>
                    <div className="projects_card_shine"></div>
                    <div className="projects_view_details">View Details</div>
                  </div>
                </div>
                
                <div className="projects_card_back">
                  <div className="projects_card_back_content">
                    <h3 className="projects_card_title">{project.title}</h3>
                    <p className="projects_card_description">{project.description}</p>
                    <div className="projects_card_tech">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="projects_tech_tag">
                          <span className="projects_tech_icon">{techIcons[tech] || "🔹"}</span>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="projects_card_links">
                      <a href={project.liveLink} className="projects_card_link projects_live_link" target="_blank" rel="noopener noreferrer">
                        <span className="projects_link_text">Live Demo</span>
                        <span className="projects_link_icon">🔗</span>
                      </a>
                      <a href={project.githubLink} className="projects_card_link projects_github_link" target="_blank" rel="noopener noreferrer">
                        <span className="projects_link_text">GitHub</span>
                        <span className="projects_link_icon">📂</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="projects_card_back_decoration">
                    <div className="projects_card_back_circle"></div>
                    <div className="projects_card_back_circle"></div>
                    <div className="projects_card_back_circle"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative dots around cards */}
              <div className="projects_card_dots">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={`dot-${i}`} 
                    className="projects_card_dot"
                    style={{ 
                      animationDelay: `${i * 0.15}s`,
                      transform: `rotate(${i * 45}deg) translateX(120px)`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects_view_more">
          <button className="projects_view_more_btn">
            <span className="projects_btn_text">View More Projects</span>
            <span className="projects_btn_icon">→</span>
            <div className="projects_btn_waves"></div>
          </button>
        </div>
      </div>
      
      {/* Animated decorative elements at the bottom */}
      <div className="projects_bottom_decoration">
        <div className="projects_wave_container">
          <div className="projects_wave projects_wave_1"></div>
          <div className="projects_wave projects_wave_2"></div>
          <div className="projects_wave projects_wave_3"></div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;