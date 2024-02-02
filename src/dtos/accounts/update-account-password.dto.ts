import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class UpdateAccountPasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
