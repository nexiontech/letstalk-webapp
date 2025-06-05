// src/components/AdSenseAd.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { shouldShowAds } from '../utils/adSenseUtils';

/**
 * AdSense Ad Component
 * Only loads and displays ads on pages with substantial content
 * Ensures compliance with Google AdSense policies
 */
const AdSenseAd = ({
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  minContentLength = 300,
  className = '',
}) => {
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);
  const [hasEnoughContent, setHasEnoughContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if page has enough content to show ads
  useEffect(() => {
    const checkContentLength = () => {
      // Get current pathname
      const pathname = window.location.pathname;

      // Use shouldShowAds utility for comprehensive checking
      const shouldShow = shouldShowAds(pathname);
      if (!shouldShow) {
        setHasEnoughContent(false);
        console.log('AdSense: Ads not allowed on this page:', pathname);
        return;
      }

      // Get all text content from the page
      const textContent =
        document.body.innerText || document.body.textContent || '';
      const contentLength = textContent.trim().length;

      // Additional content quality checks
      const paragraphs = document.querySelectorAll('p').length;
      const headings = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
      ).length;

      // Check if page has enough content and structure
      const hasContent =
        contentLength >= minContentLength && paragraphs >= 3 && headings >= 2;

      setHasEnoughContent(hasContent);

      console.log('AdSense Content Check:', {
        pathname,
        contentLength,
        paragraphs,
        headings,
        minRequired: minContentLength,
        hasEnoughContent: hasContent,
        slot,
      });
    };

    // Check content length after a longer delay to ensure page is fully rendered
    const timer = setTimeout(checkContentLength, 2000);

    return () => clearTimeout(timer);
  }, [minContentLength, slot]);

  // Load AdSense script only when needed
  useEffect(() => {
    if (!hasEnoughContent) return;

    const loadAdSenseScript = () => {
      // Check if script is already loaded
      if (
        window.adsbygoogle ||
        document.querySelector('script[src*="adsbygoogle"]')
      ) {
        setIsAdSenseLoaded(true);
        return;
      }

      // Create and load AdSense script
      const script = document.createElement('script');
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4572960626705389';
      script.crossOrigin = 'anonymous';

      script.onload = () => {
        setIsAdSenseLoaded(true);
        console.log('AdSense script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load AdSense script');
      };

      document.head.appendChild(script);
    };

    loadAdSenseScript();
  }, [hasEnoughContent]);

  // Initialize ad when script is loaded and component is visible
  useEffect(() => {
    if (!isAdSenseLoaded || !hasEnoughContent || !isVisible) return;

    try {
      // Initialize AdSense ad
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense ad initialized for slot:', slot);
      }
    } catch (error) {
      console.error('Error initializing AdSense ad:', error);
    }
  }, [isAdSenseLoaded, hasEnoughContent, isVisible, slot]);

  // Intersection Observer to only load ads when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const adElement = document.getElementById(`adsense-${slot}`);
    if (adElement) {
      observer.observe(adElement);
    }

    return () => observer.disconnect();
  }, [slot]);

  // Don't render if page doesn't have enough content or ads aren't loaded
  if (!hasEnoughContent || !isAdSenseLoaded) {
    return null;
  }

  return (
    <Box
      id={`adsense-${slot}`}
      className={`adsense-container ${className}`}
      sx={{
        margin: '2rem 0',
        textAlign: 'center',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {isAdSenseLoaded && hasEnoughContent ? (
        <>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              ...style,
            }}
            data-ad-client="ca-pub-4572960626705389"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive.toString()}
          />
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              color: 'text.secondary',
              fontSize: '0.7rem',
            }}
          >
            Advertisement
          </Typography>
        </>
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 3,
            backgroundColor: 'grey.50',
            border: '1px dashed',
            borderColor: 'grey.300',
            width: '100%',
            maxWidth: '728px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {!hasEnoughContent
              ? 'Content loading...'
              : 'Advertisement loading...'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AdSenseAd;
