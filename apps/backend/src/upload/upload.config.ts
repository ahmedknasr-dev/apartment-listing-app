import { extname } from 'path';

import { BadRequestException } from '@nestjs/common';

import { UPLOAD_CONSTANTS } from '@apartment-listing/shared';
import { diskStorage } from 'multer';

import type { Request } from 'express';

/**
 * Allowed image file extensions from shared constants
 */
export const ALLOWED_IMAGE_EXTENSIONS = [
  ...UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS,
];

/**
 * Maximum file size in bytes from shared constants
 */
export const MAX_FILE_SIZE = UPLOAD_CONSTANTS.MAX_FILE_SIZE;

/**
 * Maximum number of files per upload from shared constants
 */
export const MAX_FILES_COUNT = UPLOAD_CONSTANTS.MAX_FILES_COUNT;

/**
 * Upload directory path
 */
export const UPLOAD_DIR = './uploads/apartments';

/**
 * Multer storage configuration for apartment images
 */
export const multerConfig = {
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req: Request, file: Express.Multer.File, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      callback(null, `apartment-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const ext = extname(file.originalname).toLowerCase();
    const allowedExtensions: readonly string[] = ALLOWED_IMAGE_EXTENSIONS;

    if (!allowedExtensions.includes(ext)) {
      return callback(
        new BadRequestException(
          `Invalid file type. Allowed types: ${ALLOWED_IMAGE_EXTENSIONS.join(', ')}`,
        ),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};
