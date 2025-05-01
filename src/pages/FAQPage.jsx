// src/pages/FAQPage.jsx
import React, { useState } from 'react';
import { 
  Container, Typography, Box, Accordion, AccordionSummary, 
  AccordionDetails, TextField, Button, Grid, Card, CardContent 
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, faSearch, faUserCircle, faShieldAlt, 
  faTools, faMoneyBillWave, faExclamationCircle, faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';
import './FAQPage.css';

const FAQPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // FAQ categories
  const faqCategories = [
    {
      id: 'account',
      icon: faUserCircle,
      title: 'Account & Registration',
      color: '#0E4649'
    },
    {
      id: 'security',
      icon: faShieldAlt,
      title: 'Security & Privacy',
      color: '#267377'
    },
    {
      id: 'services',
      icon: faTools,
      title: 'Services & Features',
      color: '#FFB61D'
    },
    {
      id: 'payments',
      icon: faMoneyBillWave,
      title: 'Payments & Billing',
      color: '#FFC54A'
    },
    {
      id: 'issues',
      icon: faExclamationCircle,
      title: 'Troubleshooting',
      color: '#E6A00A'
    },
    {
      id: 'general',
      icon: faQuestionCircle,
      title: 'General Questions',
      color: '#0A3437'
    }
  ];

  // FAQ data
  const faqData = {
    account: [
      {
        question: "How do I create an account on Let's Talk?",
        answer: "To create an account, click on the 'Register' button in the top right corner of the homepage. You'll need to provide your ID number, full name, email address, and create a password. Follow the verification steps to complete your registration."
      },
      {
        question: "What information do I need to register?",
        answer: "You'll need your South African ID number, full name, valid email address, and mobile phone number. This information is used to verify your identity and ensure secure access to government services."
      },
      {
        question: "Can I use Let's Talk without creating an account?",
        answer: "You can browse public information such as press releases without an account. However, to access personalized services, report issues, or track service requests, you'll need to create an account."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on the 'Login' button, then select 'Forgot Password'. Enter your registered email address, and we'll send you instructions to reset your password. For security reasons, the reset link is valid for 24 hours."
      },
      {
        question: "Can I update my personal information after registration?",
        answer: "Yes, you can update most of your personal information through your profile settings. However, changes to your ID number may require additional verification steps for security purposes."
      }
    ],
    security: [
      {
        question: "How is my personal information protected?",
        answer: "We employ industry-standard encryption and security protocols to protect your data. Your personal information is stored securely and only accessed when necessary to provide services. We comply with all relevant data protection regulations, including POPIA."
      },
      {
        question: "Does Let's Talk share my information with third parties?",
        answer: "We only share your information with the relevant government departments necessary to fulfill your service requests. We do not sell or share your personal data with commercial third parties. For more details, please review our Privacy Policy."
      },
      {
        question: "How secure are the payments made through Let's Talk?",
        answer: "All payments are processed through secure, PCI-compliant payment gateways. We do not store your credit card information on our servers. Each transaction is encrypted and protected with multiple security layers."
      },
      {
        question: "What should I do if I notice suspicious activity on my account?",
        answer: "If you notice any suspicious activity, immediately change your password and contact our support team. We recommend enabling two-factor authentication for an additional layer of security."
      },
      {
        question: "How often should I update my password?",
        answer: "We recommend updating your password every 3-6 months. Choose a strong, unique password that includes a mix of letters, numbers, and special characters."
      }
    ],
    services: [
      {
        question: "What services are available through Let's Talk?",
        answer: "Let's Talk offers a wide range of services including water and electricity issue reporting, community engagement, government document applications, payment services for municipal bills, and more. Visit our Services page for a complete list."
      },
      {
        question: "How do I report a service issue in my area?",
        answer: "Log in to your account, navigate to the 'Report Issue' section, select the type of issue (water, electricity, etc.), provide the location and details, and submit. You'll receive a reference number to track the progress of your report."
      },
      {
        question: "Can I track the status of my service requests?",
        answer: "Yes, all service requests can be tracked through your dashboard. You'll receive updates as your request progresses through different stages, from submission to resolution."
      },
      {
        question: "Are all municipalities in South Africa covered by Let's Talk?",
        answer: "We're continuously expanding our coverage. Currently, we partner with 35 municipalities across South Africa. Check our coverage map to see if your municipality is included."
      },
      {
        question: "How can I access emergency services through Let's Talk?",
        answer: "While Let's Talk is not an emergency response platform, we provide quick access to emergency contact information. For immediate emergencies, always call the national emergency number (10111) directly."
      }
    ],
    payments: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards (Visa, Mastercard), EFT payments, and selected mobile payment options. All payment methods are secure and comply with banking regulations."
      },
      {
        question: "How do I pay my municipal bills through Let's Talk?",
        answer: "Navigate to the 'Payments' section, select the bill you wish to pay, review the amount, choose your preferred payment method, and confirm the payment. You'll receive a receipt via email."
      },
      {
        question: "Are there any fees for making payments through the platform?",
        answer: "Let's Talk does not charge any additional fees for processing payments. However, your bank or payment provider might apply their standard transaction fees."
      },
      {
        question: "How long does it take for my payment to be processed?",
        answer: "Card payments are processed immediately. EFT payments typically take 1-2 business days to reflect. Once processed, your payment will be immediately reflected in your Let's Talk account."
      },
      {
        question: "What should I do if my payment fails?",
        answer: "If your payment fails, check that your payment details are correct and that you have sufficient funds. If the problem persists, contact your bank or our support team for assistance."
      }
    ],
    issues: [
      {
        question: "The app is running slowly. What can I do?",
        answer: "Try clearing your browser cache or updating the app if you're using the mobile version. Ensure you have a stable internet connection. If problems persist, try accessing the platform from a different device or browser."
      },
      {
        question: "I'm not receiving verification emails. What should I do?",
        answer: "Check your spam or junk folder first. Ensure you've entered the correct email address. If you still don't receive the email within 10 minutes, you can request a new verification email from the login page."
      },
      {
        question: "Why can't I access certain services?",
        answer: "Some services may be restricted based on your location or verification status. Ensure your account is fully verified and that the service is available in your municipality. If you believe this is an error, contact our support team."
      },
      {
        question: "The map isn't showing my location correctly. How can I fix this?",
        answer: "Ensure you've granted location permissions to the website or app. Try refreshing the page or restarting the app. If the issue persists, you can manually enter your address or location details."
      },
      {
        question: "I've forgotten my username. How can I recover it?",
        answer: "Your username is typically your registered email address. If you've forgotten which email you used, contact our support team with your ID number, and we'll help you recover your account."
      }
    ],
    general: [
      {
        question: "Is Let's Talk affiliated with the South African government?",
        answer: "Let's Talk is an independent platform that partners with government departments and municipalities to facilitate service delivery. While we work closely with government entities, we are not a government agency."
      },
      {
        question: "Is the Let's Talk service free to use?",
        answer: "Basic access to Let's Talk is free for all South African citizens. There are no subscription fees for standard services. Certain premium features or expedited services may incur additional charges, which will be clearly indicated."
      },
      {
        question: "How can I provide feedback about the platform?",
        answer: "We welcome your feedback! You can submit suggestions or comments through the 'Feedback' option in your account menu. Alternatively, you can contact our support team directly."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Yes, Let's Talk is available as a mobile app for both Android and iOS devices. You can download it from the Google Play Store or Apple App Store. The mobile app offers the same features as the web platform with additional mobile-specific functionality."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team through the 'Contact Us' page on our website, via email at support@letstalk.co.za, or by calling our toll-free number 0800 123 456 during business hours (Monday to Friday, 8am to 5pm)."
      }
    ]
  };

  // Filter FAQs based on search term
  const filteredFAQs = Object.keys(faqData).reduce((acc, category) => {
    acc[category] = faqData[category].filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc;
  }, {});

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <div className="faq-hero-section">
        <Container maxWidth="md">
          <Typography variant="h1" className="faq-hero-title text-center">
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" className="faq-hero-text text-center">
            Find answers to common questions about Let's Talk and our services
          </Typography>
          
          <Box className="faq-search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <TextField
              fullWidth
              placeholder="Search for answers..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              className="faq-search-input"
              InputProps={{
                classes: {
                  root: 'search-input-root',
                  notchedOutline: 'search-input-outline'
                }
              }}
            />
          </Box>
        </Container>
      </div>

      {/* FAQ Categories */}
      <div className="faq-categories-section">
        <Container maxWidth="lg">
          <Grid container spacing={3} className="category-container">
            {faqCategories.map((category) => (
              <Grid item xs={6} sm={4} md={2} key={category.id}>
                <a href={`#${category.id}`} className="category-link">
                  <Card className="category-card" style={{ borderTopColor: category.color }}>
                    <CardContent className="category-content">
                      <FontAwesomeIcon icon={category.icon} className="category-icon" style={{ color: category.color }} />
                      <Typography variant="h6" className="category-title">
                        {category.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* FAQ Accordions */}
      <div className="faq-accordions-section">
        <Container maxWidth="md">
          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="faq-category-section">
              <Typography variant="h3" className="category-heading" style={{ color: category.color }}>
                <FontAwesomeIcon icon={category.icon} className="category-heading-icon" />
                {category.title}
              </Typography>
              
              {filteredFAQs[category.id].length > 0 ? (
                filteredFAQs[category.id].map((faq, index) => (
                  <Accordion
                    key={`${category.id}-${index}`}
                    expanded={expanded === `${category.id}-${index}`}
                    onChange={handleChange(`${category.id}-${index}`)}
                    className="faq-accordion"
                  >
                    <AccordionSummary
                      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                      className="faq-accordion-summary"
                    >
                      <Typography variant="h6" className="faq-question">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="faq-accordion-details">
                      <Typography variant="body1" className="faq-answer">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography variant="body1" className="no-results-message">
                  No matching questions found in this category.
                </Typography>
              )}
            </div>
          ))}
        </Container>
      </div>

      {/* Still Have Questions Section */}
      <div className="faq-contact-section">
        <Container maxWidth="md">
          <Card className="contact-card">
            <CardContent className="contact-card-content">
              <Typography variant="h4" className="contact-title">
                Still Have Questions?
              </Typography>
              <Typography variant="body1" className="contact-text">
                If you couldn't find the answer you were looking for, our support team is here to help.
              </Typography>
              <Box className="contact-buttons">
                <Button 
                  variant="contained" 
                  color="primary"
                  href="/contact"
                  className="contact-button"
                >
                  Contact Support
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  href="#"
                  className="contact-button-secondary"
                >
                  Live Chat
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default FAQPage;
