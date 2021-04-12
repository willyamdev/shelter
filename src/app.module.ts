import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordModule } from './password/password.module';
import { EmailModule } from './email/email.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfig from './configs/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    PasswordModule,
    EmailModule,
    CryptographyModule,
  ],
})
export class AppModule {}
