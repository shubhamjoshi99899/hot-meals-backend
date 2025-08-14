// src/file/file.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as multer from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: multer.memoryStorage(), // buffer files in memory
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await Promise.all(
      files.map((file) => this.fileService.uploadFile(file)),
    );
    return { urls };
  }
}
