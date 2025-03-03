import React, { useState, useEffect } from 'react';
import './styles/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend or email service
    // For demonstration, we'll just show a success message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  
  useEffect(() => {
    // Create floating background elements
    const contactContainer = document.querySelector('.contact-page-container');
    
    for (let i = 0; i < 15; i++) {
      const floatingElement = document.createElement('div');
      floatingElement.className = 'contact-page-floating-element';
      
      // Random properties
      const size = Math.random() * 60 + 20;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      floatingElement.style.width = `${size}px`;
      floatingElement.style.height = `${size}px`;
      floatingElement.style.left = `${posX}%`;
      floatingElement.style.top = `${posY}%`;
      floatingElement.style.animationDuration = `${duration}s`;
      floatingElement.style.animationDelay = `${delay}s`;
      
      contactContainer.appendChild(floatingElement);
    }
    
    return () => {
      // Clean up floating elements on unmount
      const elements = document.querySelectorAll('.contact-page-floating-element');
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="contact-page-container">
      <div className="contact-page-content">
        <div className="contact-page-heading-container">
          <h2 className="contact-page-heading">Get In Touch</h2>
          <div className="contact-page-underline"></div>
        </div>
        
        <div className="contact-page-layout">
          <div className="contact-page-info">
            <div className="contact-page-info-item">
              <div className="contact-page-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
              </div>
              <div className="contact-page-info-text">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-page-info-item">
              <div className="contact-page-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-page-info-text">
                <h3>Email</h3>
                <p>hello@yourportfolio.com</p>
              </div>
            </div>
            
            <div className="contact-page-info-item">
              <div className="contact-page-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-page-info-text">
                <h3>Location</h3>
                <p>San Francisco, CA</p>
              </div>
            </div>
            
            <div className="contact-page-social">
              <h3>Connect With Me</h3>
              <div className="contact-page-social-icons">
                <a href="#" className="contact-page-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="contact-page-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" className="contact-page-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="contact-page-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-page-form-container">
            <div className={`contact-page-form-wrapper ${isSubmitted ? 'submitted' : ''}`}>
              <form className="contact-page-form" onSubmit={handleSubmit}>
                <div className="contact-page-form-header">
                  <h3>Send Me a Message</h3>
                  <p>I'd love to hear from you!</p>
                </div>
                
                <div className="contact-page-form-group">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="contact-page-form-input" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name" className="contact-page-form-label">Your Name</label>
                </div>
                
                <div className="contact-page-form-group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="contact-page-form-input" 
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email" className="contact-page-form-label">Your Email</label>
                </div>
                
                <div className="contact-page-form-group">
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="contact-page-form-input" 
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="subject" className="contact-page-form-label">Subject</label>
                </div>
                
                <div className="contact-page-form-group">
                  <textarea 
                    id="message" 
                    name="message" 
                    className="contact-page-form-input contact-page-form-textarea" 
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message" className="contact-page-form-label">Your Message</label>
                </div>
                
                <button type="submit" className="contact-page-submit-btn">
                  <span className="contact-page-btn-text">Send Message</span>
                  <span className="contact-page-btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </span>
                </button>
              </form>
              
              <div className="contact-page-success-message">
                <div className="contact-page-success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;