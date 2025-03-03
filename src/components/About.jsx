import React, { useEffect, useRef } from 'react';
import './styles/About.css';

const About = () => {
  const bioRef = useRef(null);
  const timelineRef = useRef(null);
  const photoBorderRef = useRef(null);
  const interestsRef = useRef(null);

  useEffect(() => {
    // Animate elements when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animatable elements
    if (bioRef.current) observer.observe(bioRef.current);
    if (timelineRef.current) observer.observe(timelineRef.current);
    if (photoBorderRef.current) observer.observe(photoBorderRef.current);
    if (interestsRef.current) observer.observe(interestsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Me</h1>
        <div className="header-underline"></div>
      </div>

      <div className="about-content">
        <div className="about-left">
          <div className="photo-container" ref={photoBorderRef}>
            <div className="photo-frame">
              <img src="/api/placeholder/400/400" alt="Portrait" className="portrait" />
            </div>
          </div>

          <div className="quick-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">John Doe</span>
            </div>
            <div className="info-item">
              <span className="info-label">Based in</span>
              <span className="info-value">New York, USA</span>
            </div>
            <div className="info-item">
              <span className="info-label">Specialty</span>
              <span className="info-value">Frontend Development</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-bio" ref={bioRef}>
            <h2>Who I Am</h2>
            <p>
              Hello! I'm a passionate developer with a keen eye for detail and a love for creating
              intuitive, dynamic user experiences. I blend technical expertise with creative
              problem-solving to build applications that are both functional and beautiful.
            </p>
            <p>
              My journey in tech began 5 years ago, and since then I've worked on a variety of 
              projects ranging from e-commerce platforms to interactive data visualizations.
              I believe in writing clean, maintainable code and staying current with emerging
              technologies and best practices.
            </p>
          </div>

          <div className="experience-timeline" ref={timelineRef}>
            <h2>My Journey</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Senior Frontend Developer</h3>
                  <p className="timeline-place">TechCorp Inc.</p>
                  <p className="timeline-date">2022 - Present</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>UI/UX Developer</h3>
                  <p className="timeline-place">DesignStudio</p>
                  <p className="timeline-date">2020 - 2022</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Web Development Bootcamp</h3>
                  <p className="timeline-place">Code Academy</p>
                  <p className="timeline-date">2019</p>
                </div>
              </div>
            </div>
          </div>

          <div className="interests-section" ref={interestsRef}>
            <h2>What I Love</h2>
            <div className="interests-grid">
              <div className="interest-item">
                <div className="interest-icon coding"></div>
                <p>Coding</p>
              </div>
              <div className="interest-item">
                <div className="interest-icon design"></div>
                <p>Design</p>
              </div>
              <div className="interest-item">
                <div className="interest-icon travel"></div>
                <p>Travel</p>
              </div>
              <div className="interest-item">
                <div className="interest-icon photography"></div>
                <p>Photography</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;