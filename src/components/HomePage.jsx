import React, { useState, useEffect, useRef } from 'react';
import './styles/HomePage.css';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  // Skills to showcase
  const skills = [
    "React", "JavaScript", "UI/UX", "Node.js", 
    "TypeScript", "CSS", "Animation", "Responsive Design"
  ];

  // Stats to showcase
  const stats = [
    { value: 35, label: "Projects" },
    { value: 12, label: "Clients" },
    { value: 4, label: "Years Experience" },
    { value: 98, label: "% Client Satisfaction" }
  ];

  useEffect(() => {
    // Set loaded state after a small delay for entrance animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        // Delayed cursor follow effect
        setTimeout(() => {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
        }, 100);
      }
      
      if (heroRef.current) {
        // Parallax effect on hero section
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Start typing animation
    const typingAnimation = setTimeout(() => {
      document.documentElement.style.setProperty('--typing-animation', 'typing 3.5s steps(40, end)');
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(typingAnimation);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Custom cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      
      {/* Animated background */}
      <div className="animated-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="grid-lines"></div>
      </div>
      
      {/* Hero Section */}
      <section 
        className={`hero-section ${isLoaded ? 'loaded' : ''}`} 
        ref={heroRef}
        style={{
          transform: `translateY(${scrollPosition * 0.2}px)`
        }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">
              <span className="greeting-hello">Hello, I'm</span>
              <div className="name-highlight">Alex Reynolds</div>
            </div>
            
            <h1 className="hero-title">
              <span className="typing-text">Creative Developer & Designer</span>
            </h1>
            
            <p className="hero-description">
              I build exceptional digital experiences that blend creativity with technical precision.
              Transforming ideas into engaging interactive solutions is my passion.
            </p>
            
            <div className="cta-buttons">
              <button className="primary-btn">View My Work</button>
              <button className="secondary-btn">Get In Touch</button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="geometric-elements">
              <div className="geo-element el-1"></div>
              <div className="geo-element el-2"></div>
              <div className="geo-element el-3"></div>
              <div className="geo-element el-4"></div>
            </div>
            
            <div className="profile-frame">
              <div className="profile-image"></div>
              <div className="frame-decoration"></div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-header">
          <h2>My Expertise</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div 
              className="skill-item" 
              key={index}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transform: `translateY(${isLoaded ? '0' : '50px'})`,
                opacity: isLoaded ? 1 : 0
              }}
            >
              <div className="skill-icon"></div>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div 
              className="stat-item" 
              key={index}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: `translateY(${isLoaded ? '0' : '30px'})`,
                opacity: isLoaded ? 1 : 0
              }}
            >
              <div className="stat-value">
                <span className="counter">{stat.value}</span>
                {stat.label === "% Client Satisfaction" && <span>%</span>}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="stats-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </section>
      
      {/* Introduction / About Brief */}
      <section className="intro-section">
        <div className="intro-content">
          <h2>Creating Digital Experiences That Matter</h2>
          <p>
            With a passion for blending aesthetics with functionality, I design and develop websites and applications 
            that not only look beautiful but also deliver exceptional user experiences.
          </p>
          <button className="learn-more-btn">Learn More About Me</button>
        </div>
        
        <div className="intro-visual">
          <div className="intro-shape shape-1"></div>
          <div className="intro-shape shape-2"></div>
          <div className="intro-shape shape-3"></div>
        </div>
      </section>
      
      {/* Featured Work Preview */}
      <section className="featured-work-section">
        <div className="section-header">
          <h2>Selected Projects</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="featured-projects">
          <div className="project-preview">
            <div className="project-image"></div>
            <div className="project-info">
              <h3>E-Commerce Platform</h3>
              <p>Complete shopping experience with seamless checkout flow</p>
              <a href="#" className="project-link">View Project</a>
            </div>
          </div>
          
          <div className="project-preview">
            <div className="project-image"></div>
            <div className="project-info">
              <h3>Finance Dashboard</h3>
              <p>Data visualization tools for financial analytics</p>
              <a href="#" className="project-link">View Project</a>
            </div>
          </div>
        </div>
        
        <div className="view-all-container">
          <button className="view-all-btn">View All Projects</button>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="contact-cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's collaborate to bring your vision to life with cutting-edge design and development.</p>
          <button className="contact-btn">Get In Touch</button>
        </div>
        
        <div className="cta-decoration">
          <div className="cta-shape"></div>
          <div className="cta-glow"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;