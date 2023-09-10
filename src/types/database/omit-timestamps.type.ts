import { ITimestamps } from './timestamps.interface';

export type OmitTimestamps<T extends ITimestamps> = Omit<
  T,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;
