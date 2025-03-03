import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-text">Portfolio</span>
            <div className="logo-dot"></div>
          </div>
        </div>

        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-elements ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={activeLink === 'home' ? 'active' : ''}
                onClick={() => handleLinkClick('home')}
              >
                Home
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={activeLink === 'about' ? 'active' : ''}
                onClick={() => handleLinkClick('about')}
              >
                About
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={activeLink === 'projects' ? 'active' : ''}
                onClick={() => handleLinkClick('projects')}
              >
                Projects
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/skills" 
                className={activeLink === 'skills' ? 'active' : ''}
                onClick={() => handleLinkClick('skills')}
              >
                Skills
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={activeLink === 'contact' ? 'active' : ''}
                onClick={() => handleLinkClick('contact')}
              >
                Contact
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-cta">
          <button className="cta-button">
            <span>Hire Me</span>
            <svg className="cta-arrow" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7.5H14M14 7.5L7.5 1M14 7.5L7.5 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
