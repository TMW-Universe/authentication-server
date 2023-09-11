import { Injectable } from '@nestjs/common';
import { getEnv } from 'src/utils/config/get-env';

@Injectable()
export class KeysService {
  async getPublicKey() {
    const { jwtPublicKey } = getEnv();

    return {
      publicKey: jwtPublicKey,
    };
  }
}
