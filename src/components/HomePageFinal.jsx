import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './styles/HomePageFinal.css';

const HomePageFinal = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', x);
      heroRef.current.style.setProperty('--mouse-y', y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-container">
      {/* Animated background */}
      <div className="animated-bg">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="floating-shape"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>
      
      {/* Hero section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="main-heading"
          >
            Hello, I'm <span className="highlight-text">Your Name</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="typewriter"
          >
            <h2>I create <span className="changing-text">amazing websites</span></h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description"
          >
            Frontend developer specializing in crafting beautiful, 
            interactive web experiences with attention to detail.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="cta-buttons"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
            >
              View My Work
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-btn"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-graphic"
        >
          <div className="graphic-container">
            <div className="animated-circle"></div>
            <div className="geometric-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Project preview section */}
      <section className="projects-preview">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {[1, 2, 3].map((project) => (
            <motion.div 
              key={project}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: project * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-img placeholder"></div>
              <h3>Project {project}</h3>
              <p>Short description of this amazing project showcasing your skills.</p>
              <motion.a 
                whileHover={{ x: 5 }}
                whileTap={{ x: 0 }}
                className="project-link"
                href="#"
              >
                View Details →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Skills section */}
      <section className="skills-section">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          My Skills
        </motion.h2>
        
        <div className="skills-container">
          {['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Node.js'].map((skill, index) => (
            <motion.div
              key={skill}
              className="skill-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="skill-icon"></div>
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Contact preview */}
      <section className="contact-preview">
        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to work together?</h2>
          <p>Let's turn your ideas into reality.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-btn"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePageFinal;