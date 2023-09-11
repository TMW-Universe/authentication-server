import { HttpStatus } from '@nestjs/common';
import { ExtendedHttpException } from '../extended-http.exception';
import { HttpExceptionSections } from '../http-exception-sections.enum';

export class DomainNotAllowedException extends ExtendedHttpException {
  constructor() {
    super(HttpExceptionSections.DOMAIN, HttpStatus.UNAUTHORIZED);
  }
}
