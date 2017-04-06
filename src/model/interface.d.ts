import { Model } from './Model';
import { Signal } from '../signal/Signal';

export type TModelChangeParam<T, M extends Model<any>> = {
    readonly value: T;
    readonly previous: T;
    readonly model: M;
};

export type TSignalStorage = {
    [key: string]: Signal<any>
};

export type TSchema<S> = {
    readonly [T in keyof S]: S[T];
}