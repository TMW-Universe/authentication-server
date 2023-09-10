import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  twoFaCode?: string;
}
