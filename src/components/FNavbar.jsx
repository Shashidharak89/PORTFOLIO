import React, { useState, useEffect } from 'react';
import './styles/FNavbar.css'; // We'll create this file below

const FNavbar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-text">Portfolio</span>
            <div className="logo-orbit">
              <div className="planet"></div>
            </div>
          </div>
        </div>

        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-items ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li 
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <a href={`#${item.id}`} className="nav-link">
                {item.label}
                <span className="link-hover-effect"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default FNavbar;