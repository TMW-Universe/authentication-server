import { IIdAndTimestamps } from './id-and-timestamps.interface';
import { OmitTimestamps } from './omit-timestamps.type';

export type OmitIdAndTimestamps<T extends IIdAndTimestamps> = OmitTimestamps<
  Omit<T, 'id'>
>;
