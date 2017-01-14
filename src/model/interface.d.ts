import { ISignalLike } from '../signal/interface.d';
import { Model } from './Model';

export type TModelChangeParam<T, S> = {
    readonly value: T;
    readonly previous: T;
    readonly model: Model<S>
};
