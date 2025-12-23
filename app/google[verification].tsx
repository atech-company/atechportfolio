/**
 * Google Search Console Verification
 * This file handles Google Search Console verification via HTML file
 * 
 * To verify:
 * 1. Go to Google Search Console: https://search.google.com/search-console
 * 2. Add your property (domain or URL prefix)
 * 3. Choose "HTML tag" verification method
 * 4. Copy the content value from the meta tag (e.g., "abc123xyz")
 * 5. Set GOOGLE_SITE_VERIFICATION environment variable to that value
 * 
 * OR use the HTML file method:
 * 1. Download the HTML file from Google Search Console
 * 2. Rename it to match your verification code (e.g., google123abc.html)
 * 3. Place it in the public folder
 * 4. Access it via: https://yoursite.com/google[verification].html
 */

import { MetadataRoute } from 'next';

export default function GoogleVerification() {
  // This route handles Google verification files
  // The actual verification is done via meta tag in layout.tsx
  return null;
}


