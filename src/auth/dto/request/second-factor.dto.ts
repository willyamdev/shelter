import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SecondFactorDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  code: string;
}
