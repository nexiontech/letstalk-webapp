import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Saya Setona Innovations</h3>
          <Link to="#">41 Juta Street, Braamfontein</Link>
          <Link to="#">Address 2</Link>
          <Link to="#">Address 3</Link>
          <a href="mailto:info@saya-setona.co.za">info@saya-setona.co.za</a>
        </div>
        <div className="footer-column">
          <h3>Products</h3>
          <Link to="#">Our Offering</Link>
          <Link to="#">Government Services</Link>
          <Link to="#">Service Issues</Link>
          <Link to="#">Community Hub</Link>
          <Link to="#">Ask Naledi</Link>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <Link to="#">Blog</Link>
          <Link to="#">Newsroom</Link>
          <Link to="#">Press Releases</Link>
        </div>
        <div className="footer-column">
          <h3>Partners</h3>
          <Link to="#">Dell</Link>
          <Link to="#">United Nations</Link>
          <Link to="#">IBM</Link>
          <Link to="#">Amazon Web Services</Link>
        </div>
        <div className="footer-column">
          <h3>Let's Talk</h3>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
