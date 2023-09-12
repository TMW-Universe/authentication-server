import { IsString, MaxLength, MinLength } from 'class-validator';

export class ReadTransferCredentialsDTO {
  @IsString()
  @MinLength(512)
  @MaxLength(512)
  key: string;
}
