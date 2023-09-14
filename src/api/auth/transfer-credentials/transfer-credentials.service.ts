import { Injectable } from '@nestjs/common';
import Cache from 'cache-manager';
import { generateRandomString } from '../../../utils/string/randomizer/random-string.util';

@Injectable()
export class TransferCredentialsService {
  constructor(private readonly cacheManager: Cache) {}

  async createCredentialsTransfer() {
    let key: string;
    do {
      key = generateRandomString(512);
    } while (this.cacheManager.get(key));

    return key;
  }
  async transferCredentials(key: string, accessToken: string) {}
  async readTransferCredentials(key: string) {
    if (this.cacheManager.get(key)) {
      this.cacheManager;
    }
  }
}
