/**
 * Data Transfer Objects (DTOs) for Upload API
 * Used for file upload responses
 */

/**
 * Response DTO for single file upload
 */
export interface UploadFileResponseDto {
  url: string;
}

/**
 * Response DTO for multiple files upload
 */
export interface UploadFilesResponseDto {
  urls: string[];
}

/**
 * Upload configuration constants
 */
export const UPLOAD_CONSTANTS = {
  /**
   * Allowed image file extensions
   */
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'] as const,

  /**
   * Maximum file size in bytes (5MB)
   */
  MAX_FILE_SIZE: 5 * 1024 * 1024,

  /**
   * Maximum number of files per upload
   */
  MAX_FILES_COUNT: 10,
} as const;
