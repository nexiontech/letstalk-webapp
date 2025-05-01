// src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './LegalPages.css';

const PrivacyPolicyPage = () => {
  // Last updated date - current date
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="legal-page privacy-policy-page">
      {/* Hero Section */}
      <div className="legal-hero-section">
        <Container maxWidth="lg">
          <Typography variant="h1" className="legal-hero-title">
            Privacy Policy
          </Typography>
          <Typography variant="body1" className="legal-hero-subtitle">
            How we collect, use, and protect your information
          </Typography>

          {/* Breadcrumbs */}
          <Breadcrumbs separator={<FontAwesomeIcon icon={faChevronRight} size="xs" />} aria-label="breadcrumb" className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">
              <FontAwesomeIcon icon={faHome} className="breadcrumb-icon" />
              Home
            </Link>
            <Typography color="text.primary">Privacy Policy</Typography>
          </Breadcrumbs>
        </Container>
      </div>

      {/* Content Section */}
      <div className="legal-content-section">
        <Container maxWidth="md">
          <Box className="legal-content-container">
            <Box className="legal-content-header">
              <Typography variant="body2" className="legal-last-updated">
                Last Updated: {lastUpdated}
              </Typography>
            </Box>

            <div className="legal-content">
              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  1. Introduction
                </Typography>
                <Typography variant="body1" className="section-content">
                  Welcome to Let's Talk. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services and tell you about your privacy rights and how the law protects you.
                </Typography>
                <Typography variant="body1" className="section-content">
                  This privacy policy applies to all personal information we process about you when you use our services, visit our website, mobile applications, or otherwise interact with us.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  2. Information We Collect
                </Typography>
                <Typography variant="body1" className="section-content">
                  We collect several types of information from and about users of our services, including:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Personal Identifiers:</span> Such as your name, ID number, email address, postal address, phone number, and other similar contact data.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Account Information:</span> Your username and password, account preferences, and account activity.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Service Data:</span> Information about the services you access, the time, date, and duration of your use of our services, and other details about your interaction with our content.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Location Data:</span> We collect real-time information about the location of your device, with your consent, to provide location-based services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Technical Data:</span> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our services.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  3. How We Use Your Information
                </Typography>
                <Typography variant="body1" className="section-content">
                  We use the information we collect for various purposes, including:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      To provide and maintain our services, including to monitor the usage of our services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To manage your account, including processing payments and providing customer support.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To contact you regarding your account, updates to our terms or privacy policy, or other information we need to share with you.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To provide you with news, special offers, and general information about other goods, services, and events which we offer.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To improve our services, conduct research, and analyze user behavior.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  4. Legal Basis for Processing
                </Typography>
                <Typography variant="body1" className="section-content">
                  We process your personal information based on the following legal grounds:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Consent:</span> We process your data based on your explicit consent, which you can withdraw at any time.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Contract:</span> Processing is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into a contract.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Legal Obligation:</span> Processing is necessary for compliance with a legal obligation to which we are subject.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Legitimate Interests:</span> Processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  5. Data Sharing and Disclosure
                </Typography>
                <Typography variant="body1" className="section-content">
                  We may share your personal information with:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Service Providers:</span> Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Government Entities:</span> We may share your information with relevant government departments or municipalities to fulfill your service requests or as required by law.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Business Transfers:</span> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">With Your Consent:</span> We may share your information with third parties when you have given us your consent to do so.
                    </Typography>
                  </li>
                </ul>
                <Typography variant="body1" className="section-content">
                  We do not sell your personal information to third parties.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  6. Data Security
                </Typography>
                <Typography variant="body1" className="section-content">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                </Typography>
                <Typography variant="body1" className="section-content">
                  We maintain administrative, technical, and physical safeguards designed to protect the personal information you provide against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure, or use.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  7. Data Retention
                </Typography>
                <Typography variant="body1" className="section-content">
                  We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  8. Your Data Protection Rights
                </Typography>
                <Typography variant="body1" className="section-content">
                  Under South African data protection laws, you have rights including:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Access:</span> You have the right to request copies of your personal information.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Rectification:</span> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Erasure:</span> You have the right to request that we erase your personal information, under certain conditions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Restrict Processing:</span> You have the right to request that we restrict the processing of your personal information, under certain conditions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Object to Processing:</span> You have the right to object to our processing of your personal information, under certain conditions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Right to Data Portability:</span> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.
                    </Typography>
                  </li>
                </ul>
                <Typography variant="body1" className="section-content">
                  If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: privacy@letstalk.co.za
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  9. Children's Privacy
                </Typography>
                <Typography variant="body1" className="section-content">
                  Our services are not intended for use by children under the age of 18, and we do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information as quickly as possible.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  10. Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" className="section-content">
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this privacy policy periodically for any changes.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  11. Contact Us
                </Typography>
                <Typography variant="body1" className="section-content">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </Typography>
                <ul className="legal-contact-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By email:</span> privacy@letstalk.co.za
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By phone:</span> +27 11 123 4567
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By mail:</span> 41 Juta Street, Braamfontein, Johannesburg, South Africa
                    </Typography>
                  </li>
                </ul>
              </section>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
