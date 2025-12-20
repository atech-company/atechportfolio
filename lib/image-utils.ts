/**
 * Image utility functions
 * Safe to use in both client and server components
 */

import type { Image } from './types';

/**
 * Get image URL from image object
 * This is a utility function safe to use in client components
 */
export function getStrapiImageUrl(image: Image | string | undefined | null): string | null {
  if (!image) return null;
  // If it's already a string URL, return it
  if (typeof image === 'string') return image;
  // If it's an object with data, extract URL
  if (image?.data) {
    const url = image.data.attributes?.url || image.data;
    return typeof url === 'string' ? url : null;
  }
  return null;
}

