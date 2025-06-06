import React from 'react';
import { BLOG_IMAGES, CATEGORY_IMAGES } from '../data/blogImagesData';

/**
 * BlogImage component for displaying optimized blog images
 */
export const BlogImage = ({
  src,
  alt,
  photographer,
  className = '',
  style = {},
  showAttribution = true,
}) => {
  const defaultStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    ...style,
  };

  return (
    <div
      className={`blog-image-container ${className}`}
      style={{ marginBottom: '1.5rem' }}
    >
      <img src={src} alt={alt} loading="lazy" style={defaultStyle} />
      {showAttribution && photographer && (
        <p
          className="image-attribution"
          style={{
            fontSize: '0.8em',
            color: '#666',
            marginTop: '0.5rem',
            textAlign: 'center',
          }}
        >
          Photo by <span style={{ color: '#1976d2' }}>{photographer}</span> on{' '}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Pexels
          </a>
        </p>
      )}
    </div>
  );
};

/**
 * FeaturedImage component for blog post headers
 */
export const FeaturedImage = ({ slug, className = '' }) => {
  const imageData = BLOG_IMAGES[slug]?.featuredImage;

  if (!imageData) return null;

  return (
    <BlogImage
      src={imageData.url}
      alt={imageData.alt}
      photographer={imageData.photographer}
      className={`featured-image ${className}`}
      style={{
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        marginBottom: '2rem',
      }}
    />
  );
};

/**
 * CategoryHeader component for category pages
 */
export const CategoryHeader = ({ category, className = '' }) => {
  const imageData = CATEGORY_IMAGES[category];

  if (!imageData) return null;

  return (
    <BlogImage
      src={imageData.url}
      alt={imageData.alt}
      photographer={imageData.photographer}
      className={`category-header ${className}`}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '2rem',
      }}
    />
  );
};

/**
 * ContentImage component for in-content images
 */
export const ContentImage = ({ slug, index = 0, className = '' }) => {
  const imageData = BLOG_IMAGES[slug]?.contentImages[index];

  if (!imageData) return null;

  return (
    <BlogImage
      src={imageData.url}
      alt={imageData.alt}
      photographer={imageData.photographer}
      className={`content-image ${className}`}
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        display: 'block',
      }}
    />
  );
};

export default BlogImage;
