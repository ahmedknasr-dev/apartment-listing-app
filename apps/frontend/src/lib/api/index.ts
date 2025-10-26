/**
 * API Layer
 * Central export for all API services
 */

export { default as apiClient } from './client';
export { apartmentsApi } from './apartments.api';
export { uploadApi } from './upload.api';

// Re-export shared types for convenience
export * from '@apartment-listing/shared';
