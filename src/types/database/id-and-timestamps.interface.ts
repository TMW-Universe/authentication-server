import { uuid } from '../generic/uuid.type';
import { ITimestamps } from './timestamps.interface';

export interface IIdAndTimestamps extends ITimestamps {
  id: uuid;
}
