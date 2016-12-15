import { ISignalLike } from '../signal/interface.d';
import { IReceiver } from '../receiver/interface.d';

export interface IModel<S> extends IReceiver {

    idAttribute: string;

    readonly schema: {
        readonly [T in keyof S]: keyof S;
    };

    readonly on: {
        readonly change: {
            readonly [T in keyof S]: ISignalLike<TModelChangeParam<S[T], S>>;
        },
        readonly changeAny: ISignalLike<TModelChangeParam<Partial<S>, S>>;
    };

    toJSON(): S;
    toJSON<T>(): T;
    performTransaction(fn: (model: IModel<S>) => void): void;
    performSilentTransaction(fn: (model: IModel<S>) => void): void;
    update(data: Partial<S>): void;
}

export type TModelChangeParam<T, S> = {
    readonly value: T;
    readonly previous: T;
    readonly model: IModel<S>
};
