import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isPast } from 'date-fns';

@ValidatorConstraint({ name: 'date', async: true })
@Injectable()
export class IsPastValidation implements ValidatorConstraintInterface {
  async validate(value: Date): Promise<boolean> {
    return isPast(value);
  }
}
