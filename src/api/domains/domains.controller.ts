import { Controller, Get, Param } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { Public } from 'src/decorators/authentication/is-public.decorator';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Public()
  @Get(':domain/info')
  async getDomainInfo(@Param('domain') domain: string) {
    return await this.domainsService.getDomainInfo(domain);
  }
}
