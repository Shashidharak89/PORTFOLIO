import React, { useEffect, useState } from 'react';
import './styles/PFooter.css';

const PFooter = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pfooter-container">
      <div className="pfooter-wave-container">
        <svg className="pfooter-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#1e1e2e" 
            fillOpacity="1" 
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,122.7C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></path>
        </svg>
        <svg className="pfooter-wave pfooter-wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#0d0d17" 
            fillOpacity="0.8" 
            d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,128C672,117,768,107,864,122.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></path>
        </svg>
      </div>
      
      <div className="pfooter-content">
        <div className="pfooter-left">
          <div className="pfooter-logo">
            <svg className="pfooter-logo-icon" width="40" height="40" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="64" cy="64" r="60" stroke="#6366f1" strokeWidth="8" />
              <path d="M40 48L64 28L88 48V80L64 100L40 80V48Z" fill="#6366f1" />
              <circle className="pfooter-logo-circle" cx="64" cy="64" r="12" fill="#f471b5" />
            </svg>
            <span className="pfooter-brand-name">Shashidhara K</span>
          </div>
          <p className="pfooter-tagline">Creating digital experiences that inspire</p>
          
          <div className="pfooter-contact-info">
            <h3 className="pfooter-section-title">Contact Information</h3>
            <ul className="pfooter-contact-list">
              <li className="pfooter-contact-item">
                <svg className="pfooter-contact-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="pfooter-contact-text">shashidhara.k@example.com</span>
              </li>
              <li className="pfooter-contact-item">
                <svg className="pfooter-contact-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="pfooter-contact-text">+91 9876543210</span>
              </li>
              <li className="pfooter-contact-item">
                <svg className="pfooter-contact-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="pfooter-contact-text">123 Tech Park, Bangalore, Karnataka, India - 560001</span>
              </li>
              <li className="pfooter-contact-item">
                <svg className="pfooter-contact-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="pfooter-contact-text">Full Stack Developer</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pfooter-right">
          <div className="pfooter-links-section">
            <h3 className="pfooter-links-title">Connect</h3>
            <ul className="pfooter-links-list">
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">
                  <svg className="pfooter-social-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">
                  <svg className="pfooter-social-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">
                  <svg className="pfooter-social-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">
                  <svg className="pfooter-social-icon" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          
          <div className="pfooter-links-section">
            <h3 className="pfooter-links-title">Quick Links</h3>
            <ul className="pfooter-links-list">
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">Home</a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">About Me</a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">Portfolio</a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">Services</a>
              </li>
              <li className="pfooter-link-item">
                <a href="#" className="pfooter-link">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="pfooter-links-section">
            <h3 className="pfooter-links-title">Skills</h3>
            <div className="pfooter-skills">
              <span className="pfooter-skill-tag">React</span>
              <span className="pfooter-skill-tag">JavaScript</span>
              <span className="pfooter-skill-tag">Node.js</span>
              <span className="pfooter-skill-tag">MongoDB</span>
              <span className="pfooter-skill-tag">HTML/CSS</span>
              <span className="pfooter-skill-tag">UI/UX</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pfooter-bottom">
        <div className="pfooter-particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="pfooter-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        <p className="pfooter-copyright">© {currentYear} Shashidhara K. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PFooter;