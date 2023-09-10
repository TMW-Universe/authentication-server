import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OmitIdAndTimestamps } from 'src/types/database/omit-id-and-timestamps.type';
import { OmitTimestamps } from 'src/types/database/omit-timestamps.type';
import { ITimestamps } from 'src/types/database/timestamps.interface';
import { uuid } from 'src/types/generic/uuid.type';

export interface UserAttributes extends ITimestamps {
  id: uuid;

  username: string;
  password: string;
  twoFaEnabled: boolean;
  email: string;
}
export interface UserCreateAttributes
  extends OmitIdAndTimestamps<UserAttributes> {}

@Table({
  tableName: 'users',
  paranoid: true,
  indexes: [
    {
      fields: ['username'] satisfies (keyof UserAttributes)[],
      unique: true,
    },
  ],
})
export class UserEntity
  extends Model<UserAttributes, UserCreateAttributes>
  implements OmitTimestamps<UserAttributes>
{
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id: uuid;

  @AllowNull(false)
  @Column(DataTypes.STRING(16))
  username: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(128))
  password: string;

  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  twoFaEnabled: boolean;

  @AllowNull(false)
  @Column(DataTypes.STRING(64))
  email: string;
}
