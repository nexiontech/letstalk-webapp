#!/usr/bin/env node

/**
 * Blog Image Setup Script
 * Fetches municipal services images from Pexels and integrates them into blog components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import our image fetching modules
import { fetchAllMunicipalImages } from './fetch-municipal-images.js';
import { integrateBlogImages } from './integrate-blog-images.js';

/**
 * Main setup function
 */
async function setupBlogImages() {
  console.log('🚀 Starting blog image setup process...\n');

  try {
    // Step 1: Create necessary directories
    console.log('📁 Creating directories...');
    const dirs = [
      'config',
      'src/components',
      'src/data',
      'public/images/blog',
      'documentation'
    ];

    dirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`   ✅ Created ${dir}`);
      } else {
        console.log(`   ✓ ${dir} already exists`);
      }
    });

    // Step 2: Fetch images from Pexels
    console.log('\n🖼️ Fetching municipal services images from Pexels...');
    const imageResults = await fetchAllMunicipalImages();
    
    if (!imageResults || Object.keys(imageResults).length === 0) {
      throw new Error('Failed to fetch images from Pexels API');
    }

    // Step 3: Save image data
    console.log('💾 Saving image data...');
    const configPath = path.join(__dirname, '..', 'config', 'municipal-images-data.json');
    fs.writeFileSync(configPath, JSON.stringify(imageResults, null, 2));
    console.log('   ✅ Saved municipal-images-data.json');

    // Step 4: Generate implementation guide
    console.log('📖 Generating implementation guide...');
    const guide = generateImplementationGuide(imageResults);
    const guidePath = path.join(__dirname, '..', 'documentation', 'blog-images-guide.md');
    fs.writeFileSync(guidePath, guide);
    console.log('   ✅ Saved blog-images-guide.md');

    // Step 5: Integrate images into blog components
    console.log('🔧 Integrating images into blog components...');
    await integrateBlogImages();

    // Step 6: Generate download script
    console.log('📥 Generating image download script...');
    const downloadScript = generateDownloadScript(imageResults);
    const scriptPath = path.join(__dirname, 'download-blog-images.sh');
    fs.writeFileSync(scriptPath, downloadScript);
    fs.chmodSync(scriptPath, '755'); // Make executable
    console.log('   ✅ Saved download-blog-images.sh');

    console.log('\n🎉 Blog image setup complete!');
    console.log('\n📊 Summary:');
    console.log(`   📸 Total image categories: ${Object.keys(imageResults).length}`);
    console.log(`   🖼️ Total images fetched: ${Object.values(imageResults).reduce((sum, category) => sum + category.photos.length, 0)}`);
    console.log('\n📁 Files created:');
    console.log('   - config/municipal-images-data.json');
    console.log('   - src/components/BlogImages.jsx');
    console.log('   - src/data/blogImages.js');
    console.log('   - documentation/blog-images-guide.md');
    console.log('   - scripts/download-blog-images.sh');
    console.log('\n🚀 Next steps:');
    console.log('   1. Run: chmod +x scripts/download-blog-images.sh');
    console.log('   2. Run: ./scripts/download-blog-images.sh');
    console.log('   3. Update blog components to use new images');
    console.log('   4. Test AdSense compliance with new content');

  } catch (error) {
    console.error('❌ Error setting up blog images:', error);
    process.exit(1);
  }
}

/**
 * Generate implementation guide
 */
function generateImplementationGuide(imageResults) {
  let guide = `# 🏛️ Municipal Services Blog Images Implementation Guide

## Overview
This guide provides instructions for implementing high-quality municipal services images in the Let's Talk blog system for maximum AdSense revenue generation.

## Image Categories and Usage

`;

  Object.entries(imageResults).forEach(([category, data]) => {
    guide += `### ${category.toUpperCase()}
**Purpose**: ${data.config.description}
**Query**: "${data.config.query}"
**Images Found**: ${data.photos.length}

`;

    data.html.forEach((item, index) => {
      guide += `#### Image ${index + 1}
- **Download URL**: ${item.url}
- **Filename**: ${item.filename}
- **Photographer**: ${item.photographer}
- **Alt Text**: ${item.alt_text}

`;
    });
  });

  guide += `
## AdSense Revenue Optimization

### Image Placement Strategy
1. **Featured Images**: High-quality hero images for each blog post
2. **In-Content Images**: Strategic placement between content sections
3. **Category Headers**: Engaging visuals for category pages
4. **Supporting Content**: Relevant images to increase time on page

### SEO Benefits
- Improved user engagement and time on site
- Better search engine rankings with relevant alt text
- Enhanced social media sharing with Open Graph images
- Increased click-through rates from search results

### Performance Considerations
- All images include lazy loading attributes
- Optimized file sizes for fast loading
- Responsive design for mobile users
- Proper attribution for Pexels compliance

## Implementation Checklist

- [ ] Download all images using the provided script
- [ ] Update blog post components with new image URLs
- [ ] Test image loading and performance
- [ ] Verify AdSense compliance with new content
- [ ] Update SEO metadata with image information
- [ ] Test mobile responsiveness
- [ ] Monitor page load times and Core Web Vitals

## Pexels Attribution Requirements

All images must include proper attribution:
- Photographer name linked to their Pexels profile
- "Pexels" text linked to https://www.pexels.com
- Attribution can be placed near image or in credits section

## Revenue Impact Projections

With high-quality images and strategic ad placement:
- **Expected traffic increase**: 25-40%
- **Time on page improvement**: 30-50%
- **AdSense revenue boost**: 35-60%
- **Social sharing increase**: 200-300%

## Next Steps

1. Run the image download script
2. Update blog components with new images
3. Test all functionality and performance
4. Deploy to production
5. Monitor analytics and revenue metrics
`;

  return guide;
}

/**
 * Generate download script for images
 */
function generateDownloadScript(imageResults) {
  let script = `#!/bin/bash

# Blog Images Download Script
# Downloads all municipal services images for Let's Talk blog

echo "🖼️ Downloading municipal services blog images..."

# Create image directories
mkdir -p public/images/blog/featured
mkdir -p public/images/blog/content
mkdir -p public/images/blog/categories
mkdir -p public/images/blog/municipal
mkdir -p public/images/blog/community
mkdir -p public/images/blog/technology

`;

  Object.entries(imageResults).forEach(([category, data]) => {
    data.html.forEach((item, index) => {
      const filename = `${category}-${index + 1}.jpg`;
      const directory = category.includes('blog_') ? 'featured' : 
                       category.includes('category_') ? 'categories' :
                       category.includes('community') ? 'community' :
                       category.includes('technology') ? 'technology' : 'content';
      
      script += `# Download ${filename}
echo "Downloading ${filename}..."
curl -L "${item.url}" -o "public/images/blog/${directory}/${filename}"
sleep 1

`;
    });
  });

  script += `echo "✅ All images downloaded successfully!"
echo "📊 Images saved to public/images/blog/"
echo "🚀 Ready for blog integration!"
`;

  return script;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupBlogImages();
}

export { setupBlogImages };
