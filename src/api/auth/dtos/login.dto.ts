import {
  IsFQDN,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { getEnv } from 'src/utils/config/get-env';

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

  @IsString()
  @MaxLength(64)
  @ValidateIf(() => !getEnv().dev)
  @IsFQDN()
  domain: string;
}
