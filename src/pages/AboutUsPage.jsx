import React, { useEffect } from 'react';
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
import { generateSEOKeywords } from '../utils/seoUtils';
import {
  faHandshake,
  faLightbulb,
  faUsers,
  faGlobe,
  faChartLine,
  faHeart,
  faRocket,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import './AboutUsPage.css';

const AboutUsPage = () => {
  // Animation on scroll effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');

      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  // Core values data
  const coreValues = [
    {
      icon: faHandshake,
      title: 'Integrity',
      description:
        'We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions.',
    },
    {
      icon: faLightbulb,
      title: 'Innovation',
      description:
        'We continuously seek creative solutions to improve service delivery and citizen engagement.',
    },
    {
      icon: faUsers,
      title: 'Inclusivity',
      description:
        'We ensure our platform is accessible to all citizens regardless of background or technical ability.',
    },
    {
      icon: faGlobe,
      title: 'Community',
      description:
        'We foster a sense of belonging and shared responsibility within the communities we serve.',
    },
    {
      icon: faChartLine,
      title: 'Excellence',
      description:
        'We strive for excellence in every aspect of our service and continuously improve our offerings.',
    },
    {
      icon: faHeart,
      title: 'Empathy',
      description:
        'We approach every interaction with understanding and compassion for the needs of our users.',
    },
  ];

  // SEO data for About Us page
  const seoData = {
    title: 'About Us - Let\'s Talk Platform | Saya-Setona',
    description: 'Learn about Let\'s Talk, South Africa\'s leading citizen engagement platform built by Saya-Setona. Discover our mission to connect communities with government services through innovative technology.',
    keywords: generateSEOKeywords([
      'about Saya-Setona',
      'citizen engagement platform',
      'company information',
      'mission vision values',
      'South African technology company',
      'government services platform',
      'digital transformation',
      'civic technology',
      'community engagement',
      'public service innovation'
    ], 'about'),
    type: 'website',
    structuredData: generatePageStructuredData('about', {
      title: 'About Us - Let\'s Talk Platform',
      description: 'Learn about Let\'s Talk, South Africa\'s leading citizen engagement platform built by Saya-Setona.',
      path: '/about-us',
      organization: {
        name: 'Saya-Setona',
        description: 'South African technology company specializing in citizen engagement platforms and government service digitization.',
        foundingDate: '2024',
        mission: 'To empower South African citizens by providing a seamless, accessible platform that facilitates meaningful engagement with government services.',
        vision: 'A South Africa where every citizen can easily access, monitor, and engage with government services through a unified platform.',
        values: coreValues.map(value => ({
          name: value.title,
          description: value.description
        }))
      }
    })
  };

  return (
    <div className="about-us-page">
      <SEOHead {...seoData} />
      {/* Hero Section with Parallax Effect */}
      <div className="about-hero-section">
        <div className="parallax-bg"></div>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="hero-content">
              <Typography variant="h1" className="about-hero-title">
                Our Story
              </Typography>
              <div className="hero-divider"></div>
              <Typography variant="h5" className="about-hero-subtitle">
                Connecting Communities with Government Services
              </Typography>
              <Typography variant="body1" className="about-hero-text">
                Let's Talk was founded with a simple yet powerful vision: to
                bridge the gap between citizens and government services through
                technology. We believe that effective communication and easy
                access to services are fundamental rights for all citizens.
              </Typography>
            </div>
          </Box>
        </Container>
        <div className="hero-wave"></div>
      </div>

      {/* Mission & Vision Section */}
      <div className="about-mission-section">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <div className="mission-vision-card animate-on-scroll">
                <div className="mission-icon pulse-animation">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <Typography variant="h3" className="section-title">
                  Our Mission
                </Typography>
                <div className="card-divider"></div>
                <Typography variant="body1" className="mission-text">
                  To empower South African citizens by providing a seamless,
                  accessible platform that facilitates meaningful engagement
                  with government services, enhances transparency, and improves
                  service delivery through innovative technology solutions.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="mission-vision-card animate-on-scroll">
                <div className="vision-icon pulse-animation">
                  <FontAwesomeIcon icon={faEye} />
                </div>
                <Typography variant="h3" className="section-title">
                  Our Vision
                </Typography>
                <div className="card-divider"></div>
                <Typography variant="body1" className="vision-text">
                  A South Africa where every citizen can easily access, monitor,
                  and engage with government services through a unified,
                  user-friendly platform, leading to improved service delivery,
                  greater transparency, and stronger communities.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Core Values Section with Animated Cards */}
      <div className="about-values-section">
        <div className="values-bg-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
        </div>
        <Container maxWidth="lg">
          <div className="section-header animate-on-scroll">
            <Typography variant="h2" className="section-title text-center">
              Our Core Values
            </Typography>
            <div className="center-divider"></div>
            <Typography
              variant="body1"
              className="section-subtitle text-center"
            >
              The principles that guide everything we do
            </Typography>
          </div>

          <Grid
            container
            spacing={4}
            className="values-container"
            justifyContent="center"
            sx={{
              margin: '0 auto',
              maxWidth: { md: '90%', lg: '85%', xl: '80%' },
            }}
          >
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="value-card animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent>
                    <div className="value-icon-container">
                      <FontAwesomeIcon
                        icon={value.icon}
                        className="value-icon"
                      />
                    </div>
                    <Typography variant="h5" className="value-title">
                      {value.title}
                    </Typography>
                    <div className="value-divider"></div>
                    <Typography variant="body2" className="value-description">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Call to Action with Animated Background */}
      <div className="about-cta-section">
        <div className="cta-particles">
          <div className="particle p1"></div>
          <div className="particle p2"></div>
          <div className="particle p3"></div>
          <div className="particle p4"></div>
          <div className="particle p5"></div>
        </div>
        <Container maxWidth="md">
          <div className="cta-content animate-on-scroll">
            <Typography variant="h2" className="cta-title text-center">
              Join Us in Building Better Communities
            </Typography>
            <div className="center-divider light"></div>
            <Typography variant="body1" className="cta-text text-center">
              Be part of our mission to transform citizen-government
              interactions and improve service delivery across South Africa.
            </Typography>
            <Box textAlign="center" mt={4} className="cta-button-container">
              <Button
                variant="contained"
                className="cta-button"
                href="/register"
              >
                Get Started Today
              </Button>
            </Box>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUsPage;
