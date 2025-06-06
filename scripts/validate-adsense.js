#!/usr/bin/env node

/**
 * AdSense Policy Compliance Validation Script
 * Validates that all ad placements comply with Google AdSense policies
 */

import fs from 'fs';
import path from 'path';

// Configuration
const config = {
  realSlotIds: [
    '2059283552', // Homepage Header Ad
    '4214673608', // Homepage Content Ad  
    '6544714660', // Content Pages Ad
  ],
  placeholderPatterns: [
    /1234567890/g,
    /1234567891/g,
    /1234567892/g,
    /1234567893/g,
    /1234567894/g,
    /test-slot-id/g,
    /data-ad-slot="placeholder"/gi,
    /slot="placeholder"/gi,
  ],
  excludedPaths: [
    '/login',
    '/register',
    '/forgot-password',
    '/404',
    '/error',
    '/loading',
    '/dashboard',
    '/profile',
    '/service-issues',
    '/report-issue',
    '/CommunityHub',
    '/services',
    '/utilities',
  ],
  allowedPaths: [
    '/',
    '/about-us',
    '/faq',
    '/our-services',
    '/press-releases',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ],
  minContentRequirements: {
    wordCount: 400,
    paragraphs: 3,
    headings: 2,
  },
};

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  issues: [],
  summary: {},
};

/**
 * Find all files that might contain AdSense code
 */
function findAdSenseFiles() {
  const files = [];
  const searchDirs = ['src/components', 'src/pages', 'src/utils'];
  
  searchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const dirFiles = fs.readdirSync(dir, { recursive: true });
      dirFiles.forEach(file => {
        if (file.endsWith('.jsx') || file.endsWith('.js')) {
          files.push(path.join(dir, file));
        }
      });
    }
  });
  
  return files;
}

/**
 * Check file for AdSense-related content
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const issues = [];
  
  // Check for AdSense imports or usage
  const hasAdSense = content.includes('AdSenseAd') || 
                    content.includes('adsbygoogle') ||
                    content.includes('data-ad-slot');
  
  if (!hasAdSense) {
    return { hasAds: false, issues: [] };
  }
  
  console.log(`📊 Analyzing ${fileName}...`);
  
  // Check for placeholder slot IDs (excluding comments)
  const contentWithoutComments = content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, ''); // Remove line comments

  config.placeholderPatterns.forEach(pattern => {
    if (pattern.test(contentWithoutComments)) {
      issues.push({
        type: 'error',
        message: `Found placeholder slot ID pattern: ${pattern}`,
        file: fileName,
      });
    }
  });
  
  // Extract slot IDs
  const slotMatches = content.match(/data-ad-slot="([^"]+)"/g) || 
                     content.match(/slot="([^"]+)"/g) || [];
  
  slotMatches.forEach(match => {
    const slotId = match.match(/"([^"]+)"/)[1];
    if (!config.realSlotIds.includes(slotId)) {
      issues.push({
        type: 'error',
        message: `Unknown slot ID: ${slotId}`,
        file: fileName,
      });
    }
  });
  
  // Check for global script loading
  if (content.includes('pagead2.googlesyndication.com') && 
      !content.includes('loadAdSenseScript')) {
    issues.push({
      type: 'warning',
      message: 'Potential global AdSense script loading detected',
      file: fileName,
    });
  }
  
  return { hasAds: true, issues };
}

/**
 * Validate AdSense utilities configuration
 */
function validateAdSenseUtils() {
  const utilsPath = 'src/utils/adSenseUtils.js';
  if (!fs.existsSync(utilsPath)) {
    results.issues.push({
      type: 'error',
      message: 'AdSense utilities file not found',
      file: 'adSenseUtils.js',
    });
    return;
  }
  
  const content = fs.readFileSync(utilsPath, 'utf8');
  
  // Check excluded paths
  config.excludedPaths.forEach(path => {
    if (!content.includes(path)) {
      results.issues.push({
        type: 'warning',
        message: `Excluded path not found in shouldShowAds: ${path}`,
        file: 'adSenseUtils.js',
      });
    }
  });
  
  // Check for placeholder slot IDs in utils (excluding comments)
  const contentWithoutComments = content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, ''); // Remove line comments

  config.placeholderPatterns.forEach(pattern => {
    if (pattern.test(contentWithoutComments)) {
      results.issues.push({
        type: 'error',
        message: `Placeholder slot ID found in utils: ${pattern}`,
        file: 'adSenseUtils.js',
      });
    }
  });
  
  console.log('✅ AdSense utilities validated');
}

/**
 * Main validation function
 */
function validateAdSense() {
  console.log('🔍 Starting AdSense Policy Compliance Validation...\n');
  
  // Find and analyze all relevant files
  const files = findAdSenseFiles();
  let filesWithAds = 0;
  
  files.forEach(file => {
    const analysis = analyzeFile(file);
    if (analysis.hasAds) {
      filesWithAds++;
      results.issues.push(...analysis.issues);
    }
  });
  
  // Validate utilities
  validateAdSenseUtils();
  
  // Count results
  results.issues.forEach(issue => {
    if (issue.type === 'error') {
      results.failed++;
    } else if (issue.type === 'warning') {
      results.warnings++;
    }
  });
  
  results.passed = filesWithAds - results.failed;
  results.summary = {
    totalFiles: files.length,
    filesWithAds,
    realSlotIds: config.realSlotIds,
    excludedPaths: config.excludedPaths.length,
    allowedPaths: config.allowedPaths.length,
  };
  
  // Display results
  displayResults();
}

/**
 * Display validation results
 */
function displayResults() {
  console.log('\n📋 ADSENSE VALIDATION RESULTS');
  console.log('================================');
  
  console.log(`📁 Total files scanned: ${results.summary.totalFiles}`);
  console.log(`📊 Files with ads: ${results.summary.filesWithAds}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  
  if (results.issues.length > 0) {
    console.log('\n🔍 ISSUES FOUND:');
    results.issues.forEach((issue) => {
      const icon = issue.type === 'error' ? '❌' : '⚠️';
      console.log(`${icon} ${issue.file}: ${issue.message}`);
    });
  }
  
  console.log('\n📊 CONFIGURATION:');
  console.log(`Real Slot IDs: ${results.summary.realSlotIds.join(', ')}`);
  console.log(`Excluded Paths: ${results.summary.excludedPaths}`);
  console.log(`Allowed Paths: ${results.summary.allowedPaths}`);
  
  // Final verdict
  console.log('\n🎯 FINAL VERDICT:');
  if (results.failed === 0) {
    console.log('✅ PASSED - AdSense implementation is policy compliant!');
    process.exit(0);
  } else {
    console.log('❌ FAILED - Policy violations found. Please fix before deployment.');
    process.exit(1);
  }
}

// Run validation
validateAdSense();
