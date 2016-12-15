import { IBase } from '../base/interface.d';

export interface ISignalLike<T> {

    dispatch(data: T): void;

    on(handler: ISignalHandler<T>): void;
    once(handler: ISignalHandler<T>): void;

    off(): void;
    off(handler: ISignalHandler<T>);

}

export interface ISignal<T> extends ISignalLike<T>, IBase {

}

export interface ISignalHandler<T> {
    (data: T): void;
}
