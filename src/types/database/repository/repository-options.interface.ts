import { Includeable, Transaction } from 'sequelize';

export interface RepositoryOptions {
  transaction?: Transaction;
  include?: Includeable[];
}
