#!/usr/bin/env node

// Simple direct deployment script for Vercel
// Run with: node deploy-direct.js

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting Vercel deployment...\n');

try {
  // Check if build exists
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('📥 Installing Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }
  
  // Deploy to production
  console.log('🚀 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}