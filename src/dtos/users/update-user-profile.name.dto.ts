import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserProfileName {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(64)
  firstSurname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(64)
  secondSurname: string;
}
