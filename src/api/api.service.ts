import { Injectable } from '@nestjs/common';
import * as pj from '../../package.json';

@Injectable()
export class ApiService {
  getInfo() {
    const { name, description, author, license, version } = pj;

    return {
      name,
      description,
      version,
      author,
      license,
    };
  }
}
