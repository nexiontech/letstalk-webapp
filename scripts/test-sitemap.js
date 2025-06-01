#!/usr/bin/env node

/**
 * Sitemap Accessibility Test Script
 * Tests sitemap and robots.txt accessibility for Let's Talk platform
 */

/* eslint-env node */

import { testSitemapLocally, validateProductionSEO } from '../src/utils/sitemapValidator.js';

const args = process.argv.slice(2);
const isProduction = args.includes('--production') || args.includes('-p');
const baseUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'https://letstalkbi.co.za';
const port = args.find(arg => arg.startsWith('--port='))?.split('=')[1] || 5174;

console.log('🔍 Let\'s Talk Sitemap Accessibility Test');
console.log('==========================================\n');

if (isProduction) {
  console.log(`🚀 Testing production environment: ${baseUrl}`);

  try {
    await validateProductionSEO();
    console.log('\n✅ Production SEO validation completed!');
  } catch (error) {
    console.error('\n❌ Production validation failed:', error.message);
    process.exit(1);
  }
} else {
  console.log(`🛠️  Testing local development environment on port ${port}...`);

  try {
    const results = await testSitemapLocally(port);

    if (results.sitemap.accessible && results.robots.accessible) {
      console.log('\n🎉 All tests passed! Sitemap is accessible locally.');
      console.log('\n📝 Next steps:');
      console.log('   1. Deploy to production');
      console.log('   2. Test with: npm run sitemap:test -- --production');
      console.log('   3. Submit sitemap to Google Search Console');
      console.log('   4. Verify robots.txt in Google Search Console');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the results above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Local testing failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure the development server is running (npm run dev)');
    console.log('   2. Check that sitemap.xml and robots.txt exist in public/ directory');
    console.log('   3. Verify Vite configuration serves static files correctly');
    process.exit(1);
  }
}

console.log('\n📚 Documentation:');
console.log('   - Sitemap: https://letstalkbi.co.za/sitemap.xml');
console.log('   - Robots: https://letstalkbi.co.za/robots.txt');
console.log('   - Company: Saya-Setona (saya-setona.co.za)');
console.log('   - Platform: Let\'s Talk Citizen Engagement Platform');
