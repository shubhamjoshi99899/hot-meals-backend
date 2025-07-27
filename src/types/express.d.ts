// src/types/express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      sub: string; // Add other fields if needed
    };
  }
}

export {};
