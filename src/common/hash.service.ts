import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  createHash(s: string): string {
    return crypto
      .createHash('sha256')
      .update(s + this.configService.get('HASH_SALT'))
      .digest('base64');
  }

  checkHash(s: string, hash: string): boolean {
    return this.createHash(s) === hash;
  }
}
