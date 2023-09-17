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
import { IIdAndTimestamps } from 'src/types/database/id-and-timestamps.interface';
import { OmitIdAndTimestamps } from 'src/types/database/omit-id-and-timestamps.type';
import { OmitTimestamps } from 'src/types/database/omit-timestamps.type';
import { uuid } from 'src/types/generic/uuid.type';
import { Currency } from 'src/types/user/preferences/currency.enum';
import { Language } from 'src/types/user/preferences/language.enum';
import { Theme } from 'src/types/user/preferences/theme.enum';
import { WeightUnit } from 'src/types/user/preferences/weight-unit.enum';
import { UserEntity } from './user.entity';
import { ITimestamps } from 'src/types/database/timestamps.interface';

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
