// src/file/file.service.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class FileService {
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const ext = extname(file.originalname);
    const key = `menu-items/${uuidv4()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    console.log(
      process.env.AWS_BUCKET_NAME,
      process.env.AWS_REGION,
      process.env.AWS_ACCESS_KEY,
      process.env.AWS_SECRET_KEY,
    );

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
