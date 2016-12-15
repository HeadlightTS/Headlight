import { ISignalLike } from '../signal/interface.d';
import { IReceiver } from '../receiver/interface.d';

export interface IModel<S> extends IReceiver {

    idAttribute: string;
    schema: {
        [T in keyof S]: string;
    };

    on: TModelEvents<S>;
    once: TModelEvents<S>;


    toJSON(): S;
    performTransaction(fn: (model: IModel<S>) => void): void;
    performSilentTransaction(fn: (model: IModel<S>) => void): void;

}

export type TModelEvents<S> = {
    change: {
        [T in keyof S]: ISignalLike<S[T]>;
    },
    changeAll: ISignalLike<S>;
}
