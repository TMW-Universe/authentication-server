import { Sequelize } from 'sequelize-typescript';
import { getEnv } from '../utils/config/get-env';
import { WeightEntity } from './entities/metrics/weight.entity';
import { Logger } from '@nestjs/common';
import { UserSettingsEntity } from './entities/platform/user-settings.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const {
        database: {
          host,
          user: username,
          password,
          name: database,
          port,
          schema,
          logging,
        },
      } = getEnv();
      const sequelize = new Sequelize({
        dialect: 'mssql',
        schema,
        host,
        port,
        username,
        password,
        database,
        sync: {
          alter: true,
          force: false,
        },
        logging: logging ? Logger.log : undefined,
      });
      sequelize.addModels([WeightEntity, UserSettingsEntity]);
      await sequelize.sync({
        alter: true,
        force: false,
      });
      return sequelize;
    },
  },
];

export const entityProviders = {
  weightEntity: {
    provide: 'WEIGHT_ENTITY_PROVIDER',
    useValue: WeightEntity,
  },
  userSettingsEntity: {
    provide: 'USER_SETTINGS_PROVIDER',
    useValue: UserSettingsEntity,
  }
};
