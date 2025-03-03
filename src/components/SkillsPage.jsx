import React, { useState, useEffect, useRef } from 'react';
import './styles/SkillsPage.css';

const SkillsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer to trigger animations when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const technicalSkills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "MongoDB", level: 70 },
  ];

  const softSkills = [
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 85 },
    { name: "Teamwork", level: 95 },
    { name: "Time Management", level: 80 },
  ];

  const tools = [
    { name: "Git/GitHub", level: 85 },
    { name: "VS Code", level: 90 },
    { name: "Figma", level: 75 },
    { name: "Adobe XD", level: 70 },
    { name: "Docker", level: 65 },
  ];

  // Generate particles for background
  const generateParticles = (count) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(
        <div 
          key={`particle-${i}`} 
          className="skills-page__particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 15}s`
          }}
        ></div>
      );
    }
    return particles;
  };

  const SkillBar = ({ skill, delay }) => {
    const [animate, setAnimate] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      
      if (barRef.current) {
        observer.observe(barRef.current);
      }
      
      return () => {
        if (barRef.current) {
          observer.disconnect();
        }
      };
    }, []);

    return (
      <div className="skills-page__skill-item" ref={barRef}>
        <div className="skills-page__skill-info">
          <span className="skills-page__skill-name">{skill.name}</span>
          <span className="skills-page__skill-percentage">{skill.level}%</span>
        </div>
        <div className="skills-page__skill-bar">
          <div 
            className="skills-page__skill-progress" 
            style={{ 
              width: animate ? `${skill.level}%` : '0%',
              transitionDelay: `${delay}ms`
            }}
          >
            <div className="skills-page__skill-glow"></div>
          </div>
        </div>
      </div>
    );
  };

  const SkillCard = ({ title, skills, index }) => {
    return (
      <div 
        className={`skills-page__card ${isVisible ? 'skills-page__card--visible' : ''}`}
        style={{ transitionDelay: `${0.2 * index}s` }}
      >
        <div className="skills-page__card-shine"></div>
        <h3 className="skills-page__card-title">{title}</h3>
        <div className="skills-page__skills-list">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} delay={index * 200} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="skills-page" ref={sectionRef}>
      {/* Dynamic background and particles */}
      <div className="skills-page__background">
        <div className="skills-page__circle skills-page__circle--1"></div>
        <div className="skills-page__circle skills-page__circle--2"></div>
        <div className="skills-page__circle skills-page__circle--3"></div>
        <div className="skills-page__circle skills-page__circle--4"></div>
        <div className="skills-page__circle skills-page__circle--5"></div>
        
        <div className="skills-page__wave skills-page__wave--1"></div>
        <div className="skills-page__wave skills-page__wave--2"></div>
        
        <div className="skills-page__grid"></div>
        
        {generateParticles(20)}
      </div>
      
      <div className="skills-page__content">
        <div className={`skills-page__header ${isVisible ? 'skills-page__header--visible' : ''}`}>
          <h2 className="skills-page__title">
            <span className="skills-page__title-text">My</span>
            <span className="skills-page__title-highlight"> Skills</span>
          </h2>
          
          <p className="skills-page__description">
            Here's an overview of my technical expertise and professional capabilities. 
            These skills represent my journey and continuous growth in the field.
          </p>
        </div>
        
        <div className="skills-page__cards">
          <SkillCard title="Technical Skills" skills={technicalSkills} index={0} />
          <SkillCard title="Soft Skills" skills={softSkills} index={1} />
          <SkillCard title="Tools & Platforms" skills={tools} index={2} />
        </div>
      </div>

      <div className="skills-page__floating-elements">
        <div className="skills-page__code-element skills-page__code-element--1">&lt;div&gt;</div>
        <div className="skills-page__code-element skills-page__code-element--2">&lt;/&gt;</div>
        <div className="skills-page__code-element skills-page__code-element--3">{ }</div>
        <div className="skills-page__code-element skills-page__code-element--4">&lt;h1&gt;</div>
        <div className="skills-page__code-element skills-page__code-element--5">&lt;ul&gt;</div>
        <div className="skills-page__code-element skills-page__code-element--6">()</div>
        <div className="skills-page__code-element skills-page__code-element--7">import</div>
        <div className="skills-page__code-element skills-page__code-element--8">;</div>
      </div>
      
      <div className="skills-page__highlight-dots">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`dot-${i}`} 
            className={`skills-page__highlight-dot skills-page__highlight-dot--${i + 1}`}
          ></div>
        ))}
      </div>
      
      <div className="skills-page__cursor"></div>
    </section>
  );
};

export default SkillsPage;