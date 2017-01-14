export interface ISignalLike<T> {

    dispatch(data: T): void;

    on(handler: ISignalHandler<T>): void;
    once(handler: ISignalHandler<T>): void;

    off(handler?: ISignalHandler<T>): void;

}

export interface ISignalHandler<T> {
    (data: T): void;
}
