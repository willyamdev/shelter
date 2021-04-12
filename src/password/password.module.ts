import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CryptographyModule } from 'src/cryptography/cryptography.module';
import { PasswordController } from './password.controller';
import { PasswordRepository } from './password.repository';
import { PasswordService } from './password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordRepository]),
    AuthModule,
    CryptographyModule,
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
