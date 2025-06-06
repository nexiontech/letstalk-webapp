/**
 * Pexels API Image Fetcher for Let's Talk Municipal Services Blog
 * Fetches high-quality South African municipal services images and generates HTML with proper attribution
 */

const PEXELS_API_KEY = 'zTaRryXkxs9uaCP2OU7pSNjii45CpdNv3JJT1tgKty6LDLsioVqFkeNX';
const PEXELS_API_BASE = 'https://api.pexels.com/v1';

// Image requirements for Let's Talk municipal services blog
const IMAGE_REQUIREMENTS = {
  // Main blog featured images
  blog_municipal_revolution: {
    query: 'south african government building modern',
    size: 'landscape', // 1200x627
    count: 3,
    description: 'Revolutionizing Municipal Services blog post'
  },
  blog_bela_bela_success: {
    query: 'municipal office technology digital',
    size: 'landscape',
    count: 3,
    description: 'Bela Bela Municipality Success blog post'
  },
  blog_digital_guide: {
    query: 'smartphone government app mobile',
    size: 'landscape',
    count: 3,
    description: 'Digital Municipal Service Guide blog post'
  },
  blog_technology_transformation: {
    query: 'digital transformation government technology',
    size: 'landscape',
    count: 3,
    description: 'Technology Transforming Local Government blog post'
  },
  blog_community_stories: {
    query: 'community meeting local government south africa',
    size: 'landscape',
    count: 3,
    description: 'Communities Embracing Digital Services blog post'
  },

  // Supporting content images
  municipal_buildings: {
    query: 'south african city hall government building',
    size: 'medium', // height 350px
    count: 5,
    description: 'Municipal buildings and government offices'
  },
  digital_services: {
    query: 'mobile app government services digital',
    size: 'medium',
    count: 6,
    description: 'Digital government services and apps'
  },
  community_engagement: {
    query: 'community meeting town hall discussion',
    size: 'medium',
    count: 4,
    description: 'Community engagement and participation'
  },
  infrastructure: {
    query: 'south african cities infrastructure development',
    size: 'medium',
    count: 5,
    description: 'Municipal infrastructure and development'
  },
  technology_solutions: {
    query: 'government technology solutions digital transformation',
    size: 'medium',
    count: 6,
    description: 'Technology solutions for government'
  },

  // Specific municipal services
  water_services: {
    query: 'water infrastructure municipal services',
    size: 'medium',
    count: 3,
    description: 'Water and sanitation services'
  },
  electricity_services: {
    query: 'electrical infrastructure power grid',
    size: 'medium',
    count: 3,
    description: 'Electricity and power services'
  },
  waste_management: {
    query: 'waste collection recycling municipal',
    size: 'medium',
    count: 3,
    description: 'Waste management and recycling'
  },
  road_maintenance: {
    query: 'road construction maintenance infrastructure',
    size: 'medium',
    count: 3,
    description: 'Road maintenance and construction'
  },

  // South African context
  sa_cities: {
    query: 'johannesburg cape town durban skyline',
    size: 'landscape',
    count: 6,
    description: 'South African cities and urban areas'
  },
  sa_communities: {
    query: 'south african township community development',
    size: 'medium',
    count: 4,
    description: 'South African communities and townships'
  },
  sa_government: {
    query: 'south african flag government official',
    size: 'medium',
    count: 3,
    description: 'South African government and officials'
  },

  // Technology and innovation
  mobile_technology: {
    query: 'smartphone mobile app interface',
    size: 'medium',
    count: 5,
    description: 'Mobile technology and apps'
  },
  digital_payment: {
    query: 'mobile payment digital wallet transaction',
    size: 'medium',
    count: 4,
    description: 'Digital payments and transactions'
  },
  cloud_technology: {
    query: 'cloud computing data center technology',
    size: 'medium',
    count: 3,
    description: 'Cloud technology and infrastructure'
  },
  iot_sensors: {
    query: 'smart city sensors iot technology',
    size: 'medium',
    count: 4,
    description: 'IoT sensors and smart city technology'
  },

  // People and success stories
  government_workers: {
    query: 'government employee office professional',
    size: 'medium',
    count: 4,
    description: 'Government workers and professionals'
  },
  citizens_services: {
    query: 'people using government services happy',
    size: 'medium',
    count: 5,
    description: 'Citizens using government services'
  },
  elderly_technology: {
    query: 'elderly person using smartphone tablet',
    size: 'medium',
    count: 3,
    description: 'Elderly citizens using technology'
  },
  youth_technology: {
    query: 'young people technology digital natives',
    size: 'medium',
    count: 4,
    description: 'Youth and technology adoption'
  },

  // Blog category headers
  category_municipal_services: {
    query: 'municipal services government building',
    size: 'landscape',
    count: 2,
    description: 'Municipal Services category header'
  },
  category_government_guides: {
    query: 'government guide handbook information',
    size: 'landscape',
    count: 2,
    description: 'Government Guides category header'
  },
  category_community_stories: {
    query: 'community success story celebration',
    size: 'landscape',
    count: 2,
    description: 'Community Stories category header'
  },
  category_news_updates: {
    query: 'news update announcement government',
    size: 'landscape',
    count: 2,
    description: 'News Updates category header'
  }
};

/**
 * Fetch images from Pexels API
 */
async function fetchPexelsImages(query, perPage = 10) {
  const url = `${PEXELS_API_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

/**
 * Generate HTML img tag with proper attribution
 */
function generateImageHTML(photo, size = 'medium', altText = '') {
  const imageUrl = photo.src[size] || photo.src.medium;
  const attribution = `Photo by ${photo.photographer} on Pexels`;

  return `<img src="${imageUrl}" alt="${altText || photo.alt || 'Municipal services image'}" title="${attribution}" data-photographer="${photo.photographer}" data-photographer-url="${photo.photographer_url}" data-pexels-url="${photo.url}" loading="lazy" style="width: 100%; height: auto;">`;
}

/**
 * Generate attribution link
 */
function generateAttribution(photo) {
  return `<p class="image-attribution" style="font-size: 0.8em; color: #666; margin-top: 5px;">Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener">${photo.photographer}</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a></p>`;
}

/**
 * Main function to fetch all required images
 */
async function fetchAllMunicipalImages() {
  console.log('🏛️ Fetching municipal services images from Pexels...\n');

  const results = {};

  for (const [section, config] of Object.entries(IMAGE_REQUIREMENTS)) {
    console.log(`📸 Fetching ${config.description}...`);
    console.log(`   Query: "${config.query}"`);
    console.log(`   Size: ${config.size}`);
    console.log(`   Count needed: ${config.count}\n`);

    const photos = await fetchPexelsImages(config.query, config.count + 2); // Get extra for options

    if (photos.length > 0) {
      results[section] = {
        config,
        photos: photos.slice(0, config.count),
        html: photos.slice(0, config.count).map((photo, index) => ({
          filename: `${section}-${index + 1}.jpg`,
          url: photo.src[config.size] || photo.src.medium,
          html: generateImageHTML(photo, config.size, `${config.description} ${index + 1}`),
          attribution: generateAttribution(photo),
          photographer: photo.photographer,
          pexels_url: photo.url,
          alt_text: `${config.description} ${index + 1}`,
          width: photo.width,
          height: photo.height
        }))
      };

      console.log(`✅ Found ${photos.length} images for ${section}`);
    } else {
      console.log(`❌ No images found for ${section}`);
      results[section] = { config, photos: [], html: [] };
    }

    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// Export functions for use in other scripts
export {
  fetchPexelsImages,
  generateImageHTML,
  generateAttribution,
  fetchAllMunicipalImages,
  IMAGE_REQUIREMENTS
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAllMunicipalImages().then(results => {
    console.log('\n🎉 Municipal services images fetched successfully!');
    console.log(`📊 Total sections: ${Object.keys(results).length}`);
    console.log(`📸 Total images: ${Object.values(results).reduce((sum, section) => sum + section.photos.length, 0)}`);
  }).catch(error => {
    console.error('❌ Error fetching images:', error);
  });
}
