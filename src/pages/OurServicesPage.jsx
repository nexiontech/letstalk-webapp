// src/pages/OurServicesPage.jsx
import React from 'react';
// import letsTalkLogo from '../assets/images/lets-talk-logo.png'; // TODO: Use logo in services page
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SEOHead, { generatePageStructuredData } from '../components/SEOHead';
import {
  generateSEOKeywords,
} from '../utils/seoUtils';
import {
  faWater,
  faBolt,
  faComments,
  faMapMarkedAlt,
  faFileAlt,
  faHandHoldingUsd,
  faIdCard,
  faShieldAlt,
  faChartLine,
  faMobileAlt,
  faUserShield,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import './OurServicesPage.css';

const OurServicesPage = () => {
  // Main services data
  const mainServices = [
    {
      icon: faWater,
      title: 'Water Services',
      description:
        'Track water outages, report issues, and get real-time updates on repairs and maintenance in your area.',
      link: '/service-issues',
    },
    {
      icon: faBolt,
      title: 'Electricity Services',
      description:
        'Stay informed about power outages, report electrical issues, and monitor restoration progress.',
      link: '/service-issues',
    },
    {
      icon: faComments,
      title: 'Community Hub',
      description:
        'Connect with your community and local officials, participate in discussions, and stay informed about local events.',
      link: '/CommunityHub',
    },
    {
      icon: faMapMarkedAlt,
      title: 'Service Tracking',
      description:
        'Monitor the status of reported issues and service requests with real-time updates and notifications.',
      link: '/service-issues',
    },
  ];

  // Additional services data
  const additionalServices = [
    {
      icon: faFileAlt,
      title: 'Document Services',
      description:
        'Access, submit, and track applications for government documents and certificates.',
    },
    {
      icon: faHandHoldingUsd,
      title: 'Payment Services',
      description:
        'Securely pay for municipal services, fines, and fees through our integrated payment system.',
    },
    {
      icon: faIdCard,
      title: 'Identity Verification',
      description:
        'Verify your identity securely to access personalized government services.',
    },
    {
      icon: faShieldAlt,
      title: 'Emergency Alerts',
      description:
        'Receive critical alerts about emergencies and safety concerns in your area.',
    },
    {
      icon: faChartLine,
      title: 'Service Analytics',
      description:
        'Access data and insights about service delivery in your community.',
    },
    {
      icon: faMobileAlt,
      title: 'Mobile Accessibility',
      description:
        'Access all services through our mobile-friendly platform or dedicated mobile app.',
    },
    {
      icon: faUserShield,
      title: 'Privacy Protection',
      description:
        'Your data is protected with state-of-the-art security measures and privacy controls.',
    },
    {
      icon: faBuilding,
      title: 'Municipal Information',
      description:
        'Access important information about your local municipality and government services.',
    },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: '01',
      title: 'Create an Account',
      description:
        "Register with your ID number and contact details to create your personalized Let's Talk account.",
    },
    {
      number: '02',
      title: 'Verify Your Identity',
      description:
        'Complete the verification process to ensure secure access to government services.',
    },
    {
      number: '03',
      title: 'Access Services',
      description:
        'Browse and access the full range of services available in your municipality.',
    },
    {
      number: '04',
      title: 'Report & Track',
      description:
        'Report service issues and track their progress through our intuitive dashboard.',
    },
  ];

  // Combine all services for structured data
  const allServices = [...mainServices, ...additionalServices];

  // SEO data for Services page
  const seoData = {
    title:
      "Our Services - Municipal & Government Services | Let's Talk Platform",
    description:
      'Discover our comprehensive range of municipal and government services including water services, electricity, community engagement, document services, payments, and more. Access all South African government services in one platform.',
    keywords: generateSEOKeywords(
      [
        'municipal services',
        'government services',
        'water services',
        'electricity services',
        'community engagement',
        'service delivery',
        'public services',
        'document services',
        'payment services',
        'emergency alerts',
        'service tracking',
        'identity verification',
        'mobile accessibility',
        'privacy protection',
      ],
      'services'
    ),
    type: 'website',
    structuredData: generatePageStructuredData('service', {
      title: 'Our Services - Municipal & Government Services',
      description:
        'Comprehensive range of municipal and government services for South African citizens.',
      path: '/our-services',
      services: allServices.map(service => ({
        name: service.title,
        description: service.description,
        type: 'Government Service',
      })),
      benefits: [
        'Time-saving access to multiple government services',
        'Real-time tracking of service requests',
        'Community engagement and connection',
        '24/7 accessibility from any device',
        'Personalized updates and alerts',
        'Advanced security measures',
      ],
    }),
  };

  return (
    <div className="services-page">
      <SEOHead {...seoData} />
      {/* Hero Section */}
      <div className="services-hero-section">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h1" className="services-hero-title">
              Our Services
            </Typography>
            <Typography variant="h5" className="services-hero-subtitle">
              Connecting You with Essential Government Services
            </Typography>
            <Typography variant="body1" className="services-hero-text">
              Let's Talk provides a comprehensive platform that connects South
              African citizens with essential government and municipal services.
              Our user-friendly interface makes it easy to access services,
              report issues, and track progress all in one place.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/register"
                className="services-hero-button"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="#main-services"
                className="services-hero-button-secondary"
              >
                Explore Services
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="services-hero-visual">
            <div className="services-hero-image"></div>
          </Grid>
        </Grid>
      </div>

      {/* Main Services Section */}
      <div id="main-services" className="main-services-section">
        <Typography variant="h2" className="section-title text-center">
          Core Services
        </Typography>
        <Typography variant="body1" className="section-subtitle text-center">
          Our primary services designed to improve your community experience
        </Typography>

        <Grid container spacing={4} className="services-container">
          {mainServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="service-card main-service-card">
                <CardContent>
                  <div className="service-icon main-service-icon">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <Typography variant="h5" className="service-title">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="service-description">
                    {service.description}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    href={service.link}
                    className="service-link"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <Typography variant="h2" className="section-title text-center">
          How It Works
        </Typography>
        <Typography variant="body1" className="section-subtitle text-center">
          Getting started with Let's Talk is simple
        </Typography>

        <div className="steps-container">
          {howItWorksSteps.map((step, index) => (
            <div className="step-item" key={index}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <Typography variant="h5" className="step-title">
                  {step.title}
                </Typography>
                <Typography variant="body2" className="step-description">
                  {step.description}
                </Typography>
              </div>
              {index < howItWorksSteps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="additional-services-section">
        <Typography variant="h2" className="section-title text-center">
          Additional Services
        </Typography>
        <Typography variant="body1" className="section-subtitle text-center">
          Explore our full range of services designed to meet your needs
        </Typography>

        <Grid container spacing={4} className="services-container">
          {additionalServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="service-card additional-service-card">
                <CardContent>
                  <div className="service-icon additional-service-icon">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <Typography variant="h5" className="service-title">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="service-description">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className="benefits-image"></div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className="section-title">
              Benefits of Using Let's Talk
            </Typography>
            <Typography variant="body1" className="benefits-intro">
              Our platform offers numerous advantages for citizens and
              communities:
            </Typography>
            <ul className="benefits-list">
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">Time-saving:</span> Access
                  multiple government services through a single platform
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">Transparency:</span> Track
                  the status of your service requests in real-time
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">
                    Community engagement:
                  </span>{' '}
                  Connect with your community and local officials
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">Accessibility:</span>{' '}
                  Access services 24/7 from any device with internet connection
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">Personalization:</span>{' '}
                  Receive updates and alerts relevant to your location
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className="benefit-item">
                  <span className="benefit-highlight">Security:</span> Your data
                  is protected with advanced security measures
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>

      {/* Call to Action */}
      <div className="services-cta-section">
        <Typography variant="h2" className="cta-title text-center">
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" className="cta-text text-center">
          Join thousands of South Africans who are already benefiting from our
          services.
        </Typography>
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/register"
            className="cta-button"
          >
            Register Now
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default OurServicesPage;
