import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionSections } from './http-exception-sections.enum';

export abstract class ExtendedHttpException extends HttpException {
  constructor(
    section: HttpExceptionSections,
    code: HttpStatus,
    message?: string,
  ) {
    super({ message, section }, code);
  }
}
