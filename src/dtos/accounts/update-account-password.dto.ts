import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAccountPasswordDTO {
  @MaxLength(64)
  @MinLength(10)
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @MaxLength(64)
  @MinLength(10)
  @IsNotEmpty()
  @IsString()
  password: string;
}
