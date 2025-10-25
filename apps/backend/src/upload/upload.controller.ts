import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MAX_FILES_COUNT, multerConfig } from './upload.config';
import { UploadService } from './upload.service';

import type {
  UploadFileResponseDto,
  UploadFilesResponseDto,
} from '@apartment-listing/shared';

/**
 * Controller for handling file upload operations.
 * Provides endpoints for single and multiple image uploads.
 */
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Uploads a single image file.
   * @param file - The uploaded image file
   * @returns Object containing the file URL
   */
  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Upload a single apartment image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/uploads/apartments/apartment-1234567890-123456789.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type or file too large',
  })
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): UploadFileResponseDto {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      url: this.uploadService.getFileUrl(file.filename),
    };
  }

  /**
   * Uploads multiple image files.
   * @param files - Array of uploaded image files
   * @returns Object containing array of file URLs
   */
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_COUNT, multerConfig))
  @ApiOperation({ summary: 'Upload multiple apartment images (max 10)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Images uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        urls: {
          type: 'array',
          items: { type: 'string' },
          example: [
            '/uploads/apartments/apartment-1234567890-123456789.jpg',
            '/uploads/apartments/apartment-1234567890-987654321.jpg',
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type, file too large, or no files uploaded',
  })
  uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): UploadFilesResponseDto {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    return {
      urls: this.uploadService.getFileUrls(files),
    };
  }
}
