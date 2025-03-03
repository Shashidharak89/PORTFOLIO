import React, { useEffect, useRef } from 'react';
import './styles/HomeSection.css';
import Profile from './images/profile.jpg';

const HomeSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    // Add animation classes after component mounts for entrance animations
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const shapes = shapesRef.current;

    setTimeout(() => title.classList.add('home_unique_title-animated'), 300);
    setTimeout(() => subtitle.classList.add('home_unique_subtitle-animated'), 800);
    setTimeout(() => cta.classList.add('home_unique_cta-animated'), 1300);
    setTimeout(() => shapes.classList.add('home_unique_shapes-animated'), 500);

    // Create floating animation for background shapes
    const createFloatingAnimation = () => {
      const shapes = document.querySelectorAll('.home_unique_shape');
      shapes.forEach((shape) => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDuration = 15 + Math.random() * 10;
        
        shape.style.animation = `home_unique_floating ${randomDuration}s ease-in-out infinite alternate`;
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
    };

    // Create moving background elements
    const createMovingBackgroundElements = () => {
      const container = document.querySelector('.home_unique_section');
      
      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'home_unique_moving_element';
        
        // Random size
        const size = 5 + Math.random() * 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        
        // Random speed
        const duration = 15 + Math.random() * 40;
        element.style.animation = `home_unique_float ${duration}s linear infinite`;
        
        // Random delay
        element.style.animationDelay = `${Math.random() * duration}s`;
        
        // Random opacity
        element.style.opacity = 0.1 + Math.random() * 0.3;
        
        // Random shape (circle or square)
        if (Math.random() > 0.5) {
          element.style.borderRadius = '50%';
        }
        
        container.appendChild(element);
      }
    };

    createFloatingAnimation();
    createMovingBackgroundElements();

    return () => {
      // Cleanup - remove moving elements when component unmounts
      const movingElements = document.querySelectorAll('.home_unique_moving_element');
      movingElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <section className="home_unique_section">
      <div className="home_unique_container">
        <div className="home_unique_content">
          <h1 ref={titleRef} className="home_unique_title">
            <span className="home_unique_title-name">Hi, I'm <span className="home_unique_highlight">Shashidhara K</span></span>
            <span className="home_unique_title-role">Creative Developer</span>
          </h1>
          
          <p ref={subtitleRef} className="home_unique_subtitle">
            I build <span className="home_unique_highlight">exceptional</span> digital experiences 
            that combine stunning design with powerful functionality
          </p>

          <div ref={ctaRef} className="home_unique_cta-container">
            <a href="#projects" className="home_unique_cta-button home_unique_cta-primary">
              View My Work
              <span className="home_unique_cta-arrow">→</span>
            </a>
            <a href="#contact" className="home_unique_cta-button home_unique_cta-secondary">
              Let's Connect
            </a>
          </div>
        </div>

        <div ref={shapesRef} className="home_unique_graphic-container">
          <div className="home_unique_shape home_unique_circle"></div>
          <div className="home_unique_shape home_unique_square"></div>
          <div className="home_unique_shape home_unique_triangle"></div>
          <div className="home_unique_shape home_unique_dots"></div>
          <div className="home_unique_portrait-container">
            <div className="home_unique_portrait-frame">
              <div className="home_unique_portrait-placeholder">
                {/* Replace with your actual image */}
                <div className="home_unique_portrait-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home_unique_scroll-indicator">
        <div className="home_unique_mouse">
          <div className="home_unique_mouse-wheel"></div>
        </div>
        <p className="home_unique_scroll-text">Scroll to explore</p>
      </div>
      
      {/* Code blocks UI element */}
      <div className="home_unique_code-blocks">
        <div className="home_unique_code-block home_unique_code-block-1"></div>
        <div className="home_unique_code-block home_unique_code-block-2"></div>
        <div className="home_unique_code-block home_unique_code-block-3"></div>
      </div>
    </section>
  );
};

export default HomeSection;