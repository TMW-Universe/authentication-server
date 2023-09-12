import { IsString, MaxLength, MinLength } from 'class-validator';

export class TransferCredentialsDTO {
  @IsString()
  @MinLength(512)
  @MaxLength(512)
  key: string;

  @IsString()
  @MaxLength(2048)
  accessToken: string;
}
