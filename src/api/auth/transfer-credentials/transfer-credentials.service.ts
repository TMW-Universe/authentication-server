import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferCredentialsService {
  async createCredentialsTransfer() {}
  async transferCredentials(key: string, accessToken: string) {}
  async readTransferCredentials(key: string) {}
}
