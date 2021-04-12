import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePasswordDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  label: string;
  @IsString()
  @IsEmail()
  @MinLength(8)
  @MaxLength(50)
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  password: string;
  @IsString()
  @MinLength(32)
  @MaxLength(32)
  secretKey: string;
}
