import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/request/auth-credentials.dto';
import { SecondFactorDTO } from './dto/request/second-factor.dto';
import { AccessTokenDTO } from './dto/response/access-token.dto';
import { FistFactorSuccessTDO } from './dto/response/first-factor-success.tdo';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Get('/check-token')
  @UseGuards(AuthGuard())
  async checkToken(): Promise<{ token_status: string }> {
    return { token_status: 'valid' };
  }

  @Post('/signin-first-factor')
  @UsePipes(ValidationPipe)
  async signInFirstFactor(
    @Body() authCredentials: AuthCredentialsDTO,
  ): Promise<FistFactorSuccessTDO> {
    return this.authService.signInFirstFactor(authCredentials);
  }

  @Post('/signin-second-factor')
  @UsePipes(ValidationPipe)
  async signInSecondFactor(
    @Body() factor: SecondFactorDTO,
  ): Promise<AccessTokenDTO> {
    return this.authService.signInSecondFactor(factor);
  }
}
