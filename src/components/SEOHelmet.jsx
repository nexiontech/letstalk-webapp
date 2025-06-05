import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  structuredData,
  noIndex = false,
  noFollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  // Default values
  const defaultTitle = "Let's Talk - Municipal Services Platform for South Africa";
  const defaultDescription = "Transform your municipal service experience with Let's Talk. Pay bills, report issues, and engage with your community through South Africa's leading digital government platform.";
  const defaultKeywords = "municipal services, south africa, government services, digital transformation, local government, bill payment, service delivery";
  const defaultImage = "https://letstalkbi.co.za/images/og-default.jpg";
  const siteUrl = "https://letstalkbi.co.za";

  // Construct full title
  const fullTitle = title ? `${title} | Let's Talk` : defaultTitle;
  
  // Use provided values or defaults
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = ogImage || defaultImage;
  const metaImageAlt = ogImageAlt || title || "Let's Talk Municipal Services";
  const canonical = canonicalUrl || window.location.href;

  // Robots meta content
  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Author and Publication Info */}
      {author && <meta name="author" content={author} />}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      {section && <meta name="article:section" content={section} />}
      
      {/* Article Tags */}
      {tags.map((tag, index) => (
        <meta key={index} name="article:tag" content={tag} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Let's Talk" />
      <meta property="og:locale" content="en_ZA" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaImageAlt} />
      <meta name="twitter:site" content="@LetsTalkSA" />
      <meta name="twitter:creator" content="@LetsTalkSA" />

      {/* Geographic and Language Meta Tags */}
      <meta name="geo.region" content="ZA" />
      <meta name="geo.country" content="South Africa" />
      <meta name="language" content="en-ZA" />
      <meta name="content-language" content="en-ZA" />

      {/* Mobile and Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Theme and Brand Colors */}
      <meta name="theme-color" content="#1976d2" />
      <meta name="msapplication-TileColor" content="#1976d2" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Default Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Let's Talk",
          "description": "South Africa's leading municipal services platform",
          "url": siteUrl,
          "logo": `${siteUrl}/images/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+27-11-123-4567",
            "contactType": "customer service",
            "availableLanguage": ["English", "Afrikaans", "isiZulu"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "ZA",
            "addressRegion": "Gauteng"
          },
          "sameAs": [
            "https://www.facebook.com/LetsTalkSA",
            "https://www.twitter.com/LetsTalkSA",
            "https://www.linkedin.com/company/letstalk-sa"
          ]
        })}
      </script>

      {/* Website Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Let's Talk",
          "url": siteUrl,
          "description": metaDescription,
          "inLanguage": "en-ZA",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* Breadcrumb Structured Data for Blog Posts */}
      {ogType === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${siteUrl}/blog`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": canonical
              }
            ]
          })}
        </script>
      )}

      {/* FAQ Structured Data for FAQ Page */}
      {canonical.includes('/faq') && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I pay my municipal bills online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can pay your municipal bills online through the Let's Talk platform using bank transfers, credit cards, or mobile payment solutions. Simply register, link your municipal account, and make secure payments 24/7."
                }
              },
              {
                "@type": "Question",
                "name": "How do I report a municipal service issue?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Report municipal issues through the Let's Talk app by selecting the issue type, providing location details, adding photos, and submitting your request. You'll receive a tracking number and status updates."
                }
              }
            ]
          })}
        </script>
      )}

      {/* Local Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Let's Talk Municipal Services",
          "description": "Digital municipal services platform serving South African communities",
          "url": siteUrl,
          "telephone": "+27-11-123-4567",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "ZA",
            "addressRegion": "Gauteng"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-26.2041",
            "longitude": "28.0473"
          },
          "openingHours": "Mo-Fr 08:00-17:00",
          "priceRange": "Free",
          "areaServed": {
            "@type": "Country",
            "name": "South Africa"
          }
        })}
      </script>

      {/* Government Service Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GovernmentService",
          "name": "Municipal Services Platform",
          "description": "Digital platform for accessing municipal services in South Africa",
          "provider": {
            "@type": "Organization",
            "name": "Let's Talk"
          },
          "areaServed": {
            "@type": "Country",
            "name": "South Africa"
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": siteUrl,
            "serviceSmsNumber": "+27-11-123-4567"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
