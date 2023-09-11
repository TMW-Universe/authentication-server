import { Injectable } from '@nestjs/common';
import { DomainNotAllowedException } from 'src/errors/domain/domain-not-allowed.exception';
import { getEnv } from 'src/utils/config/get-env';

@Injectable()
export class DomainsService {
  async getDomainInfo(domain: string) {
    const { allowedDomains } = getEnv();

    if (!allowedDomains.includes(domain)) throw new DomainNotAllowedException();

    return {};
  }
}
