/**
 * Utility functions for handling image URLs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Converts a relative image URL to a full URL
 * If the URL is already a full URL (starts with http/https), returns it as-is
 * @param imageUrl - The image URL (can be relative or absolute)
 * @returns The full image URL
 */
export const getFullImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';

  // If it's already a full URL, return it as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If it's a relative URL, prepend the API base URL
  // Remove leading slash if present to avoid double slashes
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${API_BASE_URL}${cleanUrl}`;
};

/**
 * Converts an array of image URLs to full URLs
 * @param imageUrls - Array of image URLs
 * @returns Array of full image URLs
 */
export const getFullImageUrls = (imageUrls: string[]): string[] => imageUrls.map(getFullImageUrl);
