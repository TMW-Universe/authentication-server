import { Controller, Get, Param } from '@nestjs/common';
import { DomainsService } from './domains.service';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get(':domain/info')
  async getDomainInfo(@Param('domain') domain: string) {
    return await this.domainsService.getDomainInfo(domain);
  }
}
