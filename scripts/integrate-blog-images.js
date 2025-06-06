/**
 * Blog Image Integration Script
 * Integrates Pexels images into existing blog posts and creates optimized image components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog post to image mapping
const BLOG_IMAGE_MAPPING = {
  'revolutionizing-municipal-services': {
    featured: 'blog_municipal_revolution',
    content: ['municipal_buildings', 'digital_services', 'sa_cities'],
    category: 'municipal-services'
  },
  'bela-bela-municipality-success': {
    featured: 'blog_bela_bela_success',
    content: ['technology_solutions', 'government_workers', 'citizens_services'],
    category: 'community-stories'
  },
  'digital-municipal-service-guide': {
    featured: 'blog_digital_guide',
    content: ['mobile_technology', 'digital_payment', 'elderly_technology'],
    category: 'government-guides'
  },
  'technology-transforming-local-government': {
    featured: 'blog_technology_transformation',
    content: ['cloud_technology', 'iot_sensors', 'infrastructure'],
    category: 'municipal-services'
  },
  'communities-embracing-digital-services': {
    featured: 'blog_community_stories',
    content: ['community_engagement', 'youth_technology', 'sa_communities'],
    category: 'community-stories'
  }
};

// Category header images
const CATEGORY_IMAGES = {
  'municipal-services': 'category_municipal_services',
  'government-guides': 'category_government_guides',
  'community-stories': 'category_community_stories',
  'news-updates': 'category_news_updates'
};

/**
 * Create optimized image component for React
 */
function createImageComponent(imageData, className = '', style = {}) {
  const defaultStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    ...style
  };

  return `
<div className="blog-image-container ${className}" style={{marginBottom: '1.5rem'}}>
  <img 
    src="${imageData.url}"
    alt="${imageData.alt_text}"
    title="Photo by ${imageData.photographer} on Pexels"
    loading="lazy"
    style={${JSON.stringify(defaultStyle)}}
    data-photographer="${imageData.photographer}"
    data-pexels-url="${imageData.pexels_url}"
  />
  <p className="image-attribution" style={{
    fontSize: '0.8em',
    color: '#666',
    marginTop: '0.5rem',
    textAlign: 'center'
  }}>
    Photo by <a 
      href="${imageData.photographer_url || '#'}" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{color: '#1976d2', textDecoration: 'none'}}
    >
      ${imageData.photographer}
    </a> on <a 
      href="https://www.pexels.com" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{color: '#1976d2', textDecoration: 'none'}}
    >
      Pexels
    </a>
  </p>
</div>`;
}

/**
 * Create blog post data with integrated images
 */
function createBlogPostData(slug, imageResults) {
  const mapping = BLOG_IMAGE_MAPPING[slug];
  if (!mapping) return null;

  const featuredImage = imageResults[mapping.featured]?.html[0];
  const contentImages = mapping.content.map(category => 
    imageResults[category]?.html[0]
  ).filter(Boolean);

  return {
    slug,
    featuredImage: featuredImage ? {
      url: featuredImage.url,
      alt: featuredImage.alt_text,
      photographer: featuredImage.photographer,
      attribution: featuredImage.attribution,
      component: createImageComponent(featuredImage, 'featured-image', {
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover'
      })
    } : null,
    contentImages: contentImages.map((img, index) => ({
      url: img.url,
      alt: img.alt_text,
      photographer: img.photographer,
      attribution: img.attribution,
      position: index + 1,
      component: createImageComponent(img, `content-image-${index + 1}`)
    })),
    category: mapping.category
  };
}

/**
 * Generate updated blog post components with images
 */
function generateBlogComponents(imageResults) {
  const blogData = {};

  // Process each blog post
  Object.keys(BLOG_IMAGE_MAPPING).forEach(slug => {
    blogData[slug] = createBlogPostData(slug, imageResults);
  });

  // Process category images
  const categoryData = {};
  Object.entries(CATEGORY_IMAGES).forEach(([category, imageKey]) => {
    const categoryImage = imageResults[imageKey]?.html[0];
    if (categoryImage) {
      categoryData[category] = {
        url: categoryImage.url,
        alt: categoryImage.alt_text,
        photographer: categoryImage.photographer,
        component: createImageComponent(categoryImage, 'category-header', {
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        })
      };
    }
  });

  return { blogData, categoryData };
}

/**
 * Create React component file for blog images
 */
function createBlogImageComponent(blogData, categoryData) {
  return `import React from 'react';

// Blog post images data
export const BLOG_IMAGES = ${JSON.stringify(blogData, null, 2)};

// Category header images data
export const CATEGORY_IMAGES = ${JSON.stringify(categoryData, null, 2)};

/**
 * BlogImage component for displaying optimized blog images
 */
export const BlogImage = ({ 
  src, 
  alt, 
  photographer, 
  className = '', 
  style = {},
  showAttribution = true 
}) => {
  const defaultStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    ...style
  };

  return (
    <div className={\`blog-image-container \${className}\`} style={{marginBottom: '1.5rem'}}>
      <img 
        src={src}
        alt={alt}
        loading="lazy"
        style={defaultStyle}
      />
      {showAttribution && photographer && (
        <p className="image-attribution" style={{
          fontSize: '0.8em',
          color: '#666',
          marginTop: '0.5rem',
          textAlign: 'center'
        }}>
          Photo by <span style={{color: '#1976d2'}}>{photographer}</span> on{' '}
          <a 
            href="https://www.pexels.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{color: '#1976d2', textDecoration: 'none'}}
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
      className={\`featured-image \${className}\`}
      style={{
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        marginBottom: '2rem'
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
      className={\`category-header \${className}\`}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '2rem'
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
      className={\`content-image \${className}\`}
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        display: 'block'
      }}
    />
  );
};

export default BlogImage;`;
}

/**
 * Main integration function
 */
async function integrateBlogImages() {
  console.log('🖼️ Starting blog image integration...\n');

  try {
    // Check if image data exists
    const imageDataPath = path.join(__dirname, '..', 'config', 'municipal-images-data.json');
    
    if (!fs.existsSync(imageDataPath)) {
      console.log('❌ Image data not found. Please run fetch-municipal-images.js first.');
      return;
    }

    // Load image data
    const imageResults = JSON.parse(fs.readFileSync(imageDataPath, 'utf8'));
    console.log('✅ Loaded image data from municipal-images-data.json');

    // Generate blog components
    const { blogData, categoryData } = generateBlogComponents(imageResults);
    console.log('✅ Generated blog component data');

    // Create React component file
    const componentCode = createBlogImageComponent(blogData, categoryData);
    
    // Ensure components directory exists
    const componentsDir = path.join(__dirname, '..', 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }

    // Write component file
    const componentPath = path.join(componentsDir, 'BlogImages.jsx');
    fs.writeFileSync(componentPath, componentCode);
    console.log('✅ Created BlogImages.jsx component');

    // Create blog data file
    const blogDataPath = path.join(__dirname, '..', 'src', 'data', 'blogImages.js');
    const dataDir = path.dirname(blogDataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const blogDataCode = `export const BLOG_IMAGES = ${JSON.stringify(blogData, null, 2)};

export const CATEGORY_IMAGES = ${JSON.stringify(categoryData, null, 2)};
`;
    
    fs.writeFileSync(blogDataPath, blogDataCode);
    console.log('✅ Created blog images data file');

    console.log('\n🎉 Blog image integration complete!');
    console.log(`📊 Processed ${Object.keys(blogData).length} blog posts`);
    console.log(`📸 Processed ${Object.keys(categoryData).length} category headers`);
    console.log('\n📁 Files created:');
    console.log('   - src/components/BlogImages.jsx');
    console.log('   - src/data/blogImages.js');

  } catch (error) {
    console.error('❌ Error integrating blog images:', error);
  }
}

// Export functions
export {
  createImageComponent,
  createBlogPostData,
  generateBlogComponents,
  integrateBlogImages,
  BLOG_IMAGE_MAPPING,
  CATEGORY_IMAGES
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  integrateBlogImages();
}
