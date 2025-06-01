//src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../contexts/AuthContext';
import SEOHead, { generatePageStructuredData } from '../components/SEOHead';
import { generateSEOKeywords } from '../utils/seoUtils';
import AdSenseAd from '../components/AdSenseAd';
import {
  faWater,
  faBolt,
  faComments,
  faUsers,
  faMapMarkedAlt,
  faBullhorn,
  faHandshake,
  faChevronRight,
  faShieldAlt,
  faLightbulb,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (isAuthenticated && user?.name) {
      // Extract first name from full name
      const nameParts = user.name.split(' ');
      const userFirstName = nameParts[0];
      setFirstName(userFirstName);

      // Randomly choose between "Howzit" and "Eita"
      const greetings = ['Howzit', 'Eita'];
      const randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      setGreeting(randomGreeting);
    }
  }, [isAuthenticated, user]);

  const services = [
    {
      icon: faWater,
      title: 'Water Services',
      description: 'Track water outages and get updates on repairs',
      link: '/service-issues',
    },
    {
      icon: faBolt,
      title: 'Power Updates',
      description: 'Stay informed about electricity service disruptions',
      link: '/service-issues',
    },
    {
      icon: faComments,
      title: 'Community Hub',
      description: 'Connect with your community and local officials',
      link: '/CommunityHub',
    },
  ];

  const features = [
    {
      icon: faMapMarkedAlt,
      title: 'Real-time Tracking',
      description: 'Monitor service issues in your area as they happen',
    },
    {
      icon: faBullhorn,
      title: 'Service Alerts',
      description: 'Get notified about important service disruptions',
    },
    {
      icon: faHandshake,
      title: 'Community Support',
      description: 'Connect with neighbors to address local concerns',
    },
  ];

  // SEO data for homepage
  const seoData = {
    title:
      isAuthenticated && firstName && greeting
        ? `${greeting}, ${firstName}! - Let's Talk Platform`
        : "Let's Talk - South Africa's Premier Citizen Engagement Platform",
    description:
      "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform built by Saya-Setona for seamless citizen-government interaction.",
    keywords: generateSEOKeywords(
      [
        'citizen engagement platform',
        'municipal services South Africa',
        'government services online',
        'community platform',
        'service reporting',
        'local government',
        'public services',
        'civic engagement',
        'digital government',
        'smart city solutions',
      ],
      'home'
    ),
    type: 'website',
    structuredData: generatePageStructuredData('home', {
      title: "Let's Talk - South Africa's Premier Citizen Engagement Platform",
      description:
        'Connect with municipal services, report issues, access government services, and engage with your community.',
      path: '/',
      services: services.map(service => ({
        name: service.title,
        description: service.description,
        type: 'Municipal Service',
      })),
      features: features.map(feature => ({
        name: feature.title,
        description: feature.description,
      })),
    }),
  };

  return (
    <div className="homepage">
      <SEOHead {...seoData} />
      <div className="hero-container">
        <div className="hero-content">
          {isAuthenticated && firstName && greeting ? (
            <h1 className="hero-title">
              {greeting}, {firstName}!
            </h1>
          ) : (
            <h1 className="hero-title">Let's Talk</h1>
          )}
          <h2 className="hero-subtitle">Your community service platform</h2>
          <p className="hero-description">
            Stay connected with essential services in your community. Report
            issues, track resolutions, and engage with your local government.
          </p>

          <div className="hero-cta">
            {!isAuthenticated ? (
              <Link to="/register" className="cta-button primary">
                Get Started
              </Link>
            ) : (
              <Link to="/dashboard" className="cta-button primary">
                Go to Dashboard
              </Link>
            )}
            <Link to="/service-issues" className="cta-button secondary">
              View Service Issues
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-element">
            <div className="icon-circle primary">
              <FontAwesomeIcon icon={faWater} />
            </div>
            <div className="icon-circle secondary">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <div className="icon-circle tertiary">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="connection-line"></div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Everything you need to stay connected with your community</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Link to={service.link} className="service-card" key={index}>
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-arrow">
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </Link>
          ))}
        </div>

        {/* AdSense Ad - Services Section */}
        <AdSenseAd
          slot="1234567890"
          format="auto"
          minContentLength={500}
          style={{ margin: '3rem 0' }}
        />
      </div>

      <div className="features-section">
        <div className="features-content">
          <div className="section-header left-aligned">
            <h2>Why Choose Let's Talk?</h2>
            <p>
              Our platform provides the tools you need to stay informed and
              engaged
            </p>
          </div>

          <div className="features-list">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="features-cta">
            <Link to="/register" className="cta-button primary">
              Join Now
            </Link>
          </div>
        </div>

        <div className="features-visual">
          <div className="visual-element">
            <div className="feature-highlight">
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <span>Reliable</span>
            </div>
            <div className="feature-highlight">
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <span>Innovative</span>
            </div>
            <div className="feature-highlight">
              <div className="highlight-icon">
                <FontAwesomeIcon icon={faTools} />
              </div>
              <span>Practical</span>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Ad - Before CTA Section */}
      <AdSenseAd
        slot="1234567891"
        format="rectangle"
        minContentLength={400}
        style={{ margin: '4rem 0' }}
      />

      <div className="cta-section">
        <div className="cta-content">
          {!isAuthenticated ? (
            <>
              <h2>Ready to get started?</h2>
              <p>
                Join thousands of community members already using Let's Talk
              </p>
              <div className="cta-buttons">
                <Link to="/register" className="cta-button primary">
                  Create Account
                </Link>
                <Link to="/login" className="cta-button outline">
                  Sign In
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2>Welcome to the community!</h2>
              <p>Explore all the features available to you</p>
              <div className="cta-buttons">
                <Link to="/dashboard" className="cta-button primary">
                  Go to Dashboard
                </Link>
                <Link to="/CommunityHub" className="cta-button outline">
                  Community Hub
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
