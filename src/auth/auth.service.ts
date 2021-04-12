import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDTO } from './dto/request/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
import { AccessTokenDTO } from './dto/response/access-token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { EmailService } from 'src/email/email.service';
import { FistFactorSuccessTDO } from './dto/response/first-factor-success.tdo';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { SecondFactorDTO } from './dto/request/second-factor.dto';
import { EncryptionType } from 'src/cryptography/interfaces/encryption-type.interface';
import { EmailAuthorization } from './entities/email-authorization.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
    private cryptographyService: CryptographyService,
  ) {}
  async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.authRepository.signUp(authCredentials);
  }

  async signInFirstFactor(
    authCredentials: AuthCredentialsDTO,
  ): Promise<FistFactorSuccessTDO> {
    const user = await this.authRepository.validiateUserPassword(
      authCredentials,
    );

    const generatedCode = this.randomCode(10000, 99999);

    // console.log(generatedCode);
    await this.emailService.sendEmail(generatedCode);

    const codeEncrypted = this.cryptographyService.encrypt(
      generatedCode.toString(),
      process.env.EMAIL_CODE_SECRET_KEY,
    );

    if (user.emailAuthorization) {
      user.emailAuthorization.code = codeEncrypted.encryptedValue;
      user.emailAuthorization.codeIv = codeEncrypted.initializationVector;
    } else {
      const emailAuthorization = new EmailAuthorization();
      emailAuthorization.code = codeEncrypted.encryptedValue;
      emailAuthorization.codeIv = codeEncrypted.initializationVector;
      user.emailAuthorization = emailAuthorization;
    }

    await user.save();

    const response = new FistFactorSuccessTDO();
    response.message = 'success';
    return response;
  }

  async signInSecondFactor(
    secondFactor: SecondFactorDTO,
  ): Promise<AccessTokenDTO> {
    const user = await this.authRepository.findOne({
      username: secondFactor.username,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const encryptedValues: EncryptionType = {
      encryptedValue: user.emailAuthorization.code,
      initializationVector: user.emailAuthorization.codeIv,
    };

    const decryptedCode = this.cryptographyService.decrypt(
      encryptedValues,
      process.env.EMAIL_CODE_SECRET_KEY,
    );

    if (decryptedCode === secondFactor.code) {
      user.emailAuthorization.code = null;
      user.emailAuthorization.codeIv = null;
      await user.save();

      const payload: JwtPayload = { username: (await user).username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('your code is wrong!');
    }
  }

  randomCode(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
