import { Model } from './Model';
import { Signal } from '../signal/Signal';

export type TModelChangeParam<T, M extends Model<any>> = {
    readonly value: T;
    readonly previous: T;
    readonly model: M;
};
