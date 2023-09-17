import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import {
  Currency,
  ITimestamps,
  Language,
  OmitIdAndTimestamps,
  OmitTimestamps,
  Theme,
  WeightUnit,
  uuid,
} from '@tmw-universe/tmw-universe-types';

export interface UserPreferencesAttributes
  extends Omit<ITimestamps, 'deletedAt'> {
  id: uuid;

  userId: uuid;
  language: Language;
  weightUnit: WeightUnit;
  currency: Currency;
  color: string;
  theme: Theme;

  // Associations
  user?: UserEntity;
}

export interface UserPreferencesCreateAttributes
  extends OmitIdAndTimestamps<UserPreferencesAttributes> {}

@Table({
  tableName: 'user_preferences',
  paranoid: false,
  indexes: [
    {
      fields: ['userId'] as (keyof UserPreferencesAttributes)[],
      unique: true,
    },
  ],
})
export class UserPreferencesEntity
  extends Model<UserPreferencesAttributes, UserPreferencesCreateAttributes>
  implements OmitTimestamps<UserPreferencesAttributes>
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: uuid;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: uuid;

  @AllowNull(true)
  @Column(DataType.STRING(5))
  language: Language;

  @AllowNull(true)
  @Column(DataType.STRING(2))
  weightUnit: WeightUnit;

  @AllowNull(true)
  @Column(DataType.STRING(3))
  currency: Currency;

  @AllowNull(true)
  @Column(DataType.STRING(7))
  color: string;

  @AllowNull(true)
  @Column(DataType.STRING(5))
  theme: Theme;

  // Associations
  @BelongsTo(() => UserEntity)
  user?: UserEntity;
}
