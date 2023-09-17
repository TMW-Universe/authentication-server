import { Model } from 'sequelize-typescript';
import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OmitIdAndTimestamps } from 'src/types/database/omit-id-and-timestamps.type';
import { OmitTimestamps } from 'src/types/database/omit-timestamps.type';
import { ITimestamps } from 'src/types/database/timestamps.interface';
import { uuid } from 'src/types/generic/uuid.type';
import { UserEntity } from '../user.entity';
import { DataTypes } from 'sequelize';

export interface LogAttributes extends Omit<ITimestamps, 'deletedAt'> {
  id: uuid;

  userId: uuid;

  // Client info
  address: string;
  userAgent: string | null;
  origin: string;

  type: LogType;

  // Associations
  user?: UserEntity;
}
export interface LogCreateAttributes
  extends OmitIdAndTimestamps<LogAttributes> {}

@Table({
  tableName: 'logs',
  paranoid: false,
  indexes: [
    {
      fields: ['userId'] as (keyof LogAttributes)[],
      unique: false,
    },
    {
      fields: [
        {
          name: 'createdAt' as keyof LogAttributes,
          order: 'DESC',
        },
      ],
      unique: false,
    },
  ],
})
export class LogEntity
  extends Model<LogAttributes, LogCreateAttributes>
  implements OmitTimestamps<LogAttributes>
{
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id: uuid;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column(DataTypes.UUID)
  userId: uuid;

  @AllowNull(false)
  @Column(DataTypes.STRING(80))
  address: string;

  @AllowNull(true)
  @Column(DataTypes.STRING(256))
  userAgent: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(256))
  origin: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(20))
  type: LogType;

  // Associations
  @BelongsTo(() => UserEntity)
  user?: UserEntity;
}

// Max length is 8
export enum LogType {
  LOGIN = 'login',
}
