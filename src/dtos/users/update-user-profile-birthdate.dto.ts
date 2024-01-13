import { Type } from 'class-transformer';
import { IsDate, Validate } from 'class-validator';
import { IsPastValidation } from '../../validations/time/is-past.validation';

export class UpdateUserProfileBirthdateDTO {
  @Validate(IsPastValidation)
  @IsDate()
  @Type(() => Date)
  birthdate: Date;
}
