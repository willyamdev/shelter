import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { EncryptionType } from './interfaces/encryption-type.interface';

@Injectable()
export class CryptographyService {
  encrypt(password: string, secretKey: string): EncryptionType {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      encryptedValue: encrypted.toString('hex'),
      initializationVector: iv.toString('hex'),
    };
  }

  decrypt(
    { encryptedValue, initializationVector }: EncryptionType,
    secretKey: string,
  ): string {
    const iv = Buffer.from(initializationVector, 'hex');
    const encryptedText = Buffer.from(encryptedValue, 'hex');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(secretKey),
      iv,
    );

    try {
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      throw new UnauthorizedException('Your secretKey is not valid');
    }
  }
}
