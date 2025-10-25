import { unlink } from 'fs/promises';
import { join } from 'path';

import { Injectable, Logger } from '@nestjs/common';

/**
 * Service for handling file upload operations.
 * Manages file paths, URLs, and file deletion.
 */
@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  /**
   * Generates the public URL for an uploaded file.
   * @param filename - The name of the uploaded file
   * @returns The public URL to access the file
   */
  getFileUrl(filename: string): string {
    return `/uploads/apartments/${filename}`;
  }

  /**
   * Generates public URLs for multiple uploaded files.
   * @param files - Array of uploaded files
   * @returns Array of public URLs
   */
  getFileUrls(files: Express.Multer.File[]): string[] {
    return files.map((file) => this.getFileUrl(file.filename));
  }

  /**
   * Deletes a file from the file system.
   * @param filepath - The relative path to the file
   */
  async deleteFile(filepath: string): Promise<void> {
    try {
      const fullPath = join(process.cwd(), filepath);
      await unlink(fullPath);
      this.logger.log(`Deleted file: ${filepath}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete file: ${filepath}`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  /**
   * Deletes multiple files from the file system.
   * @param filepaths - Array of relative file paths
   */
  async deleteFiles(filepaths: string[]): Promise<void> {
    await Promise.all(filepaths.map((path) => this.deleteFile(path)));
  }
}
