import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateUserProfileBirthdateDTO {
  @IsDate()
  @Type(() => Date)
  birthdate: Date;
}
