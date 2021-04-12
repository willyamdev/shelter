import { IsString, MaxLength, MinLength } from 'class-validator';

export class DeletePasswordDTO {
  @IsString()
  @MinLength(32)
  @MaxLength(32)
  secretKey: string;
}
