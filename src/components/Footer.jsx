import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-title">Shashidhara K</h1>
        <p className="footer-text">Creating extraordinary experiences through web development.</p>
        <div className="social-icons">
          <a href="#" className="icon facebook"></a>
          <a href="#" className="icon twitter"></a>
          <a href="#" className="icon instagram"></a>
          <a href="#" className="icon linkedin"></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
