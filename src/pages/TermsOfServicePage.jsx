// src/pages/TermsOfServicePage.jsx
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './LegalPages.css';

const TermsOfServicePage = () => {
  // Last updated date - current date
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="legal-page terms-of-service-page">
      {/* Hero Section */}
      <div className="legal-hero-section">
        <Container maxWidth="lg">
          <Typography variant="h1" className="legal-hero-title">
            Terms of Service
          </Typography>
          <Typography variant="body1" className="legal-hero-subtitle">
            The rules and guidelines for using our platform
          </Typography>

          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
            aria-label="breadcrumb"
            className="breadcrumbs"
          >
            <Link to="/" className="breadcrumb-link">
              <FontAwesomeIcon icon={faHome} className="breadcrumb-icon" />
              Home
            </Link>
            <Typography color="text.primary">Terms of Service</Typography>
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
                  Welcome to Let's Talk. These Terms of Service ("Terms") govern
                  your use of our website, mobile applications, and services
                  (collectively, the "Services") operated by Saya Setona
                  Innovations ("we," "us," or "our"). By accessing or using our
                  Services, you agree to be bound by these Terms. If you
                  disagree with any part of the Terms, you may not access the
                  Services.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  2. Definitions
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">"Account"</span> means a
                      unique account created for you to access our Services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">"Content"</span> refers to
                      any information, text, graphics, photos, or other
                      materials uploaded, downloaded, or appearing on the
                      Services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">"User"</span> refers to
                      individuals who access or use the Services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">"Service Provider"</span>{' '}
                      refers to government departments, municipalities, or other
                      entities that provide services through our platform.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  3. Account Registration and Security
                </Typography>
                <Typography variant="body1" className="section-content">
                  To use certain features of our Services, you must register for
                  an account. When you register, you agree to provide accurate,
                  current, and complete information about yourself and to update
                  this information to keep it accurate, current, and complete.
                </Typography>
                <Typography variant="body1" className="section-content">
                  You are responsible for safeguarding the password that you use
                  to access the Services and for any activities or actions under
                  your password. We encourage you to use "strong" passwords
                  (passwords that use a combination of upper and lower case
                  letters, numbers, and symbols) with your account. You agree
                  not to disclose your password to any third party. You must
                  notify us immediately upon becoming aware of any breach of
                  security or unauthorized use of your account.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  4. User Conduct
                </Typography>
                <Typography variant="body1" className="section-content">
                  You agree to use our Services only for lawful purposes and in
                  accordance with these Terms. You agree not to use the
                  Services:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      In any way that violates any applicable national or
                      international law or regulation.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To impersonate or attempt to impersonate another person or
                      entity.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To engage in any conduct that restricts or inhibits
                      anyone's use or enjoyment of the Services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To attempt to gain unauthorized access to, interfere with,
                      damage, or disrupt any parts of the Services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      To submit false or misleading information or reports.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  5. Content
                </Typography>
                <Typography variant="body1" className="section-content">
                  Our Services allow you to post, link, store, share and
                  otherwise make available certain information, text, graphics,
                  videos, or other material. You are responsible for the Content
                  that you post on or through the Services, including its
                  legality, reliability, and appropriateness.
                </Typography>
                <Typography variant="body1" className="section-content">
                  By posting Content on or through the Services, you represent
                  and warrant that:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      The Content is yours (you own it) or you have the right to
                      use it and grant us the rights and license as provided in
                      these Terms.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The posting of your Content on or through the Services
                      does not violate the privacy rights, publicity rights,
                      copyrights, contract rights or any other rights of any
                      person.
                    </Typography>
                  </li>
                </ul>
                <Typography variant="body1" className="section-content">
                  We reserve the right to remove any Content from the Services
                  at any time, for any reason, without notice.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  6. Service Providers
                </Typography>
                <Typography variant="body1" className="section-content">
                  Our platform connects users with various Service Providers. We
                  do not guarantee the quality, safety, or legality of services
                  provided by these Service Providers. We are not responsible
                  for the actions or inactions of Service Providers.
                </Typography>
                <Typography variant="body1" className="section-content">
                  While we strive to facilitate effective communication between
                  users and Service Providers, we cannot guarantee response
                  times or resolution of issues reported through our platform.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  7. Payments and Fees
                </Typography>
                <Typography variant="body1" className="section-content">
                  Some of our Services may require payment of fees. You agree to
                  pay all fees and charges incurred in connection with your use
                  of the Services.
                </Typography>
                <Typography variant="body1" className="section-content">
                  We use third-party payment processors to process payments made
                  to us. The processing of payments will be subject to the
                  terms, conditions, and privacy policies of the payment
                  processor in addition to these Terms.
                </Typography>
                <Typography variant="body1" className="section-content">
                  All fees are exclusive of all taxes, levies, or duties imposed
                  by taxing authorities, and you shall be responsible for
                  payment of all such taxes, levies, or duties.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  8. Intellectual Property
                </Typography>
                <Typography variant="body1" className="section-content">
                  The Services and their original content (excluding Content
                  provided by users), features, and functionality are and will
                  remain the exclusive property of Saya Setona Innovations and
                  its licensors. The Services are protected by copyright,
                  trademark, and other laws of both South Africa and foreign
                  countries.
                </Typography>
                <Typography variant="body1" className="section-content">
                  Our trademarks and trade dress may not be used in connection
                  with any product or service without the prior written consent
                  of Saya Setona Innovations.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  9. Termination
                </Typography>
                <Typography variant="body1" className="section-content">
                  We may terminate or suspend your account and bar access to the
                  Services immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </Typography>
                <Typography variant="body1" className="section-content">
                  If you wish to terminate your account, you may simply
                  discontinue using the Services or contact us to request
                  account deletion.
                </Typography>
                <Typography variant="body1" className="section-content">
                  All provisions of the Terms which by their nature should
                  survive termination shall survive termination, including,
                  without limitation, ownership provisions, warranty
                  disclaimers, indemnity, and limitations of liability.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  10. Limitation of Liability
                </Typography>
                <Typography variant="body1" className="section-content">
                  In no event shall Saya Setona Innovations, nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential or
                  punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      Your access to or use of or inability to access or use the
                      Services;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Any conduct or content of any third party on the Services;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Any content obtained from the Services; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Unauthorized access, use or alteration of your
                      transmissions or content.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  11. Disclaimer
                </Typography>
                <Typography variant="body1" className="section-content">
                  Your use of the Services is at your sole risk. The Services
                  are provided on an "AS IS" and "AS AVAILABLE" basis. The
                  Services are provided without warranties of any kind, whether
                  express or implied, including, but not limited to, implied
                  warranties of merchantability, fitness for a particular
                  purpose, non-infringement or course of performance.
                </Typography>
                <Typography variant="body1" className="section-content">
                  Saya Setona Innovations, its subsidiaries, affiliates, and its
                  licensors do not warrant that:
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      The Services will function uninterrupted, secure or
                      available at any particular time or location;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Any errors or defects will be corrected;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The Services are free of viruses or other harmful
                      components; or
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The results of using the Services will meet your
                      requirements.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  12. Governing Law
                </Typography>
                <Typography variant="body1" className="section-content">
                  These Terms shall be governed and construed in accordance with
                  the laws of South Africa, without regard to its conflict of
                  law provisions.
                </Typography>
                <Typography variant="body1" className="section-content">
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights. If any
                  provision of these Terms is held to be invalid or
                  unenforceable by a court, the remaining provisions of these
                  Terms will remain in effect.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  13. Changes to Terms
                </Typography>
                <Typography variant="body1" className="section-content">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </Typography>
                <Typography variant="body1" className="section-content">
                  By continuing to access or use our Services after any
                  revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, you are
                  no longer authorized to use the Services.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  14. Contact Us
                </Typography>
                <Typography variant="body1" className="section-content">
                  If you have any questions about these Terms, please contact
                  us:
                </Typography>
                <ul className="legal-contact-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By email:</span>{' '}
                      legal@letstalk.co.za
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By phone:</span> +27 11 123
                      4567
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By mail:</span> 41 Juta
                      Street, Braamfontein, Johannesburg, South Africa
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

export default TermsOfServicePage;
