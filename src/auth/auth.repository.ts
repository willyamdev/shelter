import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/request/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentials;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validiateUserPassword(
    authCredentials: AuthCredentialsDTO,
  ): Promise<User> {
    const { username, password } = authCredentials;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
