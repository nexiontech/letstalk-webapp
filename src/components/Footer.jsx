/*src/components/Footer.jsx*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faGlobe,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import letsTalkLogo from '../assets/images/lets-talk-logo.png';
import ComingSoonModal from './ComingSoonModal';
import './Footer.css';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  // State for the coming soon modal
  const [modalOpen, setModalOpen] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState('');

  // Handler for social media links
  const handleSocialClick = (e, platform) => {
    e.preventDefault();
    setSocialPlatform(platform);
    setModalOpen(true);
  };

  return (
    <footer className="footer">
      <div className="footer-wave-container">
        <div className="footer-wave"></div>
      </div>

      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={letsTalkLogo}
              alt="Let's Talk Logo"
              className="footer-logo"
            />
            <p className="footer-tagline">Your community service platform</p>
            <p className="footer-description">
              Stay connected with essential services in your community. Report
              issues, track resolutions, and engage with your local government.
            </p>

            <div className="footer-social">
              <a
                href="#"
                className="social-icon"
                aria-label="Facebook"
                onClick={e => handleSocialClick(e, 'Facebook')}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="Twitter"
                onClick={e => handleSocialClick(e, 'Twitter')}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="Instagram"
                onClick={e => handleSocialClick(e, 'Instagram')}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="LinkedIn"
                onClick={e => handleSocialClick(e, 'LinkedIn')}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="YouTube"
                onClick={e => handleSocialClick(e, 'YouTube')}
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          <div className="footer-links-container">
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="link-icon"
                    />{' '}
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/press-releases">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="link-icon"
                    />{' '}
                    Press Releases
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/service-issues">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Service Issues
                      </Link>
                    </li>
                    <li>
                      <Link to="/services">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Government Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/CommunityHub">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Community Hub
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Dashboard
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="footer-column">
              <h3>Services</h3>
              <ul className="footer-links">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/utilities">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Utilities
                      </Link>
                    </li>
                    <li>
                      <Link to="/report-issue">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Report an Issue
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Ask Naledi
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Payment Services
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Emergency Contacts
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/about-us">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/our-services">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="link-icon"
                        />{' '}
                        FAQ
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul className="footer-contact-info">
                <li>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="contact-icon"
                  />
                  <span>
                    41 Juta Street, Braamfontein
                    <br />
                    Johannesburg, South Africa
                  </span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                  <span>+27 11 123 4567</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <a href="mailto:info@saya-setona.co.za">
                    info@saya-setona.co.za
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faGlobe} className="contact-icon" />
                  <a
                    href="https://www.saya-setona.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.saya-setona.co.za
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} Saya Setona Innovations. All Rights Reserved.
            </p>
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        feature={`${socialPlatform} social media`}
      />
    </footer>
  );
};

export default Footer;
