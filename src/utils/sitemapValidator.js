// src/utils/sitemapValidator.js

/**
 * Sitemap Validation Utilities
 * Validates sitemap accessibility and structure for Let's Talk platform
 */

export const validateSitemapAccess = async (
  baseUrl = 'https://letstalkbi.co.za'
) => {
  try {
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const response = await fetch(sitemapUrl);

    if (!response.ok) {
      throw new Error(
        `Sitemap not accessible: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('xml')) {
      console.warn('Sitemap may not have correct content-type header');
    }

    const sitemapContent = await response.text();

    // Basic XML validation
    if (
      !sitemapContent.includes('<?xml') ||
      !sitemapContent.includes('<urlset')
    ) {
      throw new Error('Invalid sitemap XML structure');
    }

    // Count URLs in sitemap
    const urlMatches = sitemapContent.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;

    return {
      accessible: true,
      url: sitemapUrl,
      contentType: contentType,
      urlCount: urlCount,
      size: sitemapContent.length,
      lastModified: response.headers.get('last-modified'),
      etag: response.headers.get('etag'),
    };
  } catch (error) {
    return {
      accessible: false,
      url: `${baseUrl}/sitemap.xml`,
      error: error.message,
    };
  }
};

export const validateRobotsAccess = async (
  baseUrl = 'https://letstalkbi.co.za'
) => {
  try {
    const robotsUrl = `${baseUrl}/robots.txt`;
    const response = await fetch(robotsUrl);

    if (!response.ok) {
      throw new Error(
        `Robots.txt not accessible: ${response.status} ${response.statusText}`
      );
    }

    const robotsContent = await response.text();

    // Check if sitemap is referenced in robots.txt
    const sitemapReference = robotsContent.includes('Sitemap:');
    const correctSitemapUrl = robotsContent.includes(`${baseUrl}/sitemap.xml`);

    return {
      accessible: true,
      url: robotsUrl,
      hasSitemapReference: sitemapReference,
      correctSitemapUrl: correctSitemapUrl,
      size: robotsContent.length,
      content: robotsContent,
    };
  } catch (error) {
    return {
      accessible: false,
      url: `${baseUrl}/robots.txt`,
      error: error.message,
    };
  }
};

export const validateSEOFiles = async (
  baseUrl = 'https://letstalkbi.co.za'
) => {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: baseUrl,
    files: {},
  };

  const filesToCheck = [
    'sitemap.xml',
    'robots.txt',
    'site.webmanifest',
    'favicon.png',
    'logo.png',
    'og-image.jpg',
    'twitter-card.jpg',
    'app-screenshot.jpg',
  ];

  for (const file of filesToCheck) {
    try {
      const response = await fetch(`${baseUrl}/${file}`);
      results.files[file] = {
        accessible: response.ok,
        status: response.status,
        contentType: response.headers.get('content-type'),
        size: response.headers.get('content-length'),
        lastModified: response.headers.get('last-modified'),
      };
    } catch (error) {
      results.files[file] = {
        accessible: false,
        error: error.message,
      };
    }
  }

  return results;
};

// Development helper to test sitemap locally
export const testSitemapLocally = async (port = 5173) => {
  const devUrl = `http://localhost:${port}`;

  console.log('🔍 Testing sitemap accessibility locally...');

  const sitemapResult = await validateSitemapAccess(devUrl);
  const robotsResult = await validateRobotsAccess(devUrl);

  console.log('\n📄 Sitemap Test Results:');
  if (sitemapResult.accessible) {
    console.log(`✅ Sitemap accessible at: ${sitemapResult.url}`);
    console.log(`📊 URL count: ${sitemapResult.urlCount}`);
    console.log(`📏 Size: ${sitemapResult.size} bytes`);
    console.log(`🏷️  Content-Type: ${sitemapResult.contentType}`);
  } else {
    console.log(`❌ Sitemap not accessible: ${sitemapResult.error}`);
  }

  console.log('\n🤖 Robots.txt Test Results:');
  if (robotsResult.accessible) {
    console.log(`✅ Robots.txt accessible at: ${robotsResult.url}`);
    console.log(
      `🗺️  Has sitemap reference: ${robotsResult.hasSitemapReference ? '✅' : '❌'}`
    );
    console.log(
      `🔗 Correct sitemap URL: ${robotsResult.correctSitemapUrl ? '✅' : '❌'}`
    );
    console.log(`📏 Size: ${robotsResult.size} bytes`);
  } else {
    console.log(`❌ Robots.txt not accessible: ${robotsResult.error}`);
  }

  return {
    sitemap: sitemapResult,
    robots: robotsResult,
  };
};

// Production validation
export const validateProductionSEO = async () => {
  console.log('🚀 Validating production SEO files...');

  const results = await validateSEOFiles();

  console.log('\n📋 Production SEO Validation Results:');
  console.log(`🌐 Base URL: ${results.baseUrl}`);
  console.log(`⏰ Timestamp: ${results.timestamp}`);

  Object.entries(results.files).forEach(([file, result]) => {
    if (result.accessible) {
      console.log(`✅ ${file}: ${result.status} (${result.contentType})`);
    } else {
      console.log(`❌ ${file}: ${result.error || 'Not accessible'}`);
    }
  });

  return results;
};

export default {
  validateSitemapAccess,
  validateRobotsAccess,
  validateSEOFiles,
  testSitemapLocally,
  validateProductionSEO,
};
