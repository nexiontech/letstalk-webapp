// src/pages/CookiePolicyPage.jsx
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

const CookiePolicyPage = () => {
  // Last updated date - current date
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="legal-page cookie-policy-page">
      {/* Hero Section */}
      <div className="legal-hero-section">
        <Container maxWidth="lg">
          <Typography variant="h1" className="legal-hero-title">
            Cookie Policy
          </Typography>
          <Typography variant="body1" className="legal-hero-subtitle">
            How we use cookies and similar technologies
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
            <Typography color="text.primary">Cookie Policy</Typography>
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
                  This Cookie Policy explains how Let's Talk ("we", "us", or
                  "our") uses cookies and similar technologies to recognize you
                  when you visit our website and use our services. It explains
                  what these technologies are and why we use them, as well as
                  your rights to control our use of them.
                </Typography>
                <Typography variant="body1" className="section-content">
                  This Cookie Policy should be read together with our Privacy
                  Policy and Terms of Service.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  2. What Are Cookies?
                </Typography>
                <Typography variant="body1" className="section-content">
                  Cookies are small data files that are placed on your computer
                  or mobile device when you visit a website. Cookies are widely
                  used by website owners to make their websites work, or to work
                  more efficiently, as well as to provide reporting information.
                </Typography>
                <Typography variant="body1" className="section-content">
                  Cookies set by the website owner (in this case, Let's Talk)
                  are called "first-party cookies". Cookies set by parties other
                  than the website owner are called "third-party cookies".
                  Third-party cookies enable third-party features or
                  functionality to be provided on or through the website (e.g.,
                  advertising, interactive content, and analytics). The parties
                  that set these third-party cookies can recognize your computer
                  both when it visits the website in question and also when it
                  visits certain other websites.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  3. Why Do We Use Cookies?
                </Typography>
                <Typography variant="body1" className="section-content">
                  We use first-party and third-party cookies for several
                  reasons. Some cookies are required for technical reasons in
                  order for our website to operate, and we refer to these as
                  "essential" or "strictly necessary" cookies. Other cookies
                  also enable us to track and target the interests of our users
                  to enhance the experience on our website. Third parties serve
                  cookies through our website for advertising, analytics, and
                  other purposes.
                </Typography>
                <Typography variant="body1" className="section-content">
                  The specific types of first and third-party cookies served
                  through our website and the purposes they perform are
                  described below:
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  4. Types of Cookies We Use
                </Typography>
                <ul className="legal-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Essential Cookies:</span>{' '}
                      These cookies are strictly necessary to provide you with
                      services available through our website and to use some of
                      its features, such as access to secure areas. Because
                      these cookies are strictly necessary to deliver the
                      website, you cannot refuse them without impacting how our
                      website functions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">
                        Performance and Functionality Cookies:
                      </span>{' '}
                      These cookies are used to enhance the performance and
                      functionality of our website but are non-essential to
                      their use. However, without these cookies, certain
                      functionality may become unavailable.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">
                        Analytics and Customization Cookies:
                      </span>{' '}
                      These cookies collect information that is used either in
                      aggregate form to help us understand how our website is
                      being used or how effective our marketing campaigns are,
                      or to help us customize our website for you in order to
                      enhance your experience.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Advertising Cookies:</span>{' '}
                      These cookies are used to make advertising messages more
                      relevant to you. They perform functions like preventing
                      the same ad from continuously reappearing, ensuring that
                      ads are properly displayed, and in some cases selecting
                      advertisements that are based on your interests.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">Social Media Cookies:</span>{' '}
                      These cookies are used to enable you to share pages and
                      content that you find interesting on our website through
                      third-party social networking and other websites. These
                      cookies may also be used for advertising purposes.
                    </Typography>
                  </li>
                </ul>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  5. Specific Cookies We Use
                </Typography>
                <Typography variant="body1" className="section-content">
                  Below is a detailed list of the cookies we use on our website:
                </Typography>
                <Box className="cookie-table-container">
                  <table className="cookie-table">
                    <thead>
                      <tr>
                        <th>Cookie Name</th>
                        <th>Type</th>
                        <th>Purpose</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_session</td>
                        <td>Essential</td>
                        <td>
                          Used to maintain your session and authentication
                          status
                        </td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td>_csrf</td>
                        <td>Essential</td>
                        <td>
                          Used to prevent cross-site request forgery attacks
                        </td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td>_preferences</td>
                        <td>Functionality</td>
                        <td>
                          Stores your preferences such as language and region
                        </td>
                        <td>1 year</td>
                      </tr>
                      <tr>
                        <td>_ga</td>
                        <td>Analytics</td>
                        <td>Used by Google Analytics to distinguish users</td>
                        <td>2 years</td>
                      </tr>
                      <tr>
                        <td>_gid</td>
                        <td>Analytics</td>
                        <td>Used by Google Analytics to distinguish users</td>
                        <td>24 hours</td>
                      </tr>
                      <tr>
                        <td>_fbp</td>
                        <td>Advertising</td>
                        <td>Used by Facebook to deliver advertisements</td>
                        <td>3 months</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  6. How Can You Control Cookies?
                </Typography>
                <Typography variant="body1" className="section-content">
                  You have the right to decide whether to accept or reject
                  cookies. You can exercise your cookie preferences by clicking
                  on the appropriate opt-out links provided in the cookie banner
                  on our website.
                </Typography>
                <Typography variant="body1" className="section-content">
                  You can also set or amend your web browser controls to accept
                  or refuse cookies. If you choose to reject cookies, you may
                  still use our website though your access to some functionality
                  and areas of our website may be restricted. As the means by
                  which you can refuse cookies through your web browser controls
                  vary from browser-to-browser, you should visit your browser's
                  help menu for more information.
                </Typography>
                <Typography variant="body1" className="section-content">
                  In addition, most advertising networks offer you a way to opt
                  out of targeted advertising. If you would like to find out
                  more information, please visit{' '}
                  <MuiLink
                    href="http://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.aboutads.info/choices/
                  </MuiLink>{' '}
                  or{' '}
                  <MuiLink
                    href="http://www.youronlinechoices.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.youronlinechoices.com
                  </MuiLink>
                  .
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  7. Other Tracking Technologies
                </Typography>
                <Typography variant="body1" className="section-content">
                  Cookies are not the only way to recognize or track visitors to
                  a website. We may use other, similar technologies from time to
                  time, like web beacons (sometimes called "tracking pixels" or
                  "clear gifs"). These are tiny graphics files that contain a
                  unique identifier that enable us to recognize when someone has
                  visited our website or opened an e-mail that we have sent
                  them. This allows us, for example, to monitor the traffic
                  patterns of users from one page within our website to another,
                  to deliver or communicate with cookies, to understand whether
                  you have come to our website from an online advertisement
                  displayed on a third-party website, to improve site
                  performance, and to measure the success of e-mail marketing
                  campaigns. In many instances, these technologies are reliant
                  on cookies to function properly, and so declining cookies will
                  impair their functioning.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  8. Do Not Track
                </Typography>
                <Typography variant="body1" className="section-content">
                  Currently, various browsers — including Internet Explorer,
                  Firefox, and Safari — offer a "do not track" or "DNT" option
                  that relies on a technology known as a DNT header, which sends
                  a signal to websites visited by the user about the user's
                  browser DNT preference setting. Let's Talk does not currently
                  respond to DNT signals. We continue to monitor developments
                  around DNT technology and may adopt a DNT response policy in
                  the future.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  9. Updates to This Cookie Policy
                </Typography>
                <Typography variant="body1" className="section-content">
                  We may update this Cookie Policy from time to time in order to
                  reflect, for example, changes to the cookies we use or for
                  other operational, legal, or regulatory reasons. Please
                  therefore re-visit this Cookie Policy regularly to stay
                  informed about our use of cookies and related technologies.
                </Typography>
                <Typography variant="body1" className="section-content">
                  The date at the top of this Cookie Policy indicates when it
                  was last updated.
                </Typography>
              </section>

              <section className="legal-section">
                <Typography variant="h2" className="section-title">
                  10. Contact Us
                </Typography>
                <Typography variant="body1" className="section-content">
                  If you have any questions about our use of cookies or other
                  technologies, please contact us:
                </Typography>
                <ul className="legal-contact-list">
                  <li>
                    <Typography variant="body1">
                      <span className="list-title">By email:</span>{' '}
                      privacy@letstalk.co.za
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

export default CookiePolicyPage;
