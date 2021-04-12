import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
