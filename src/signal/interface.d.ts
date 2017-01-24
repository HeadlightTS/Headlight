export interface ISignalLike<T> {

    dispatch(data: T): void;

    on(handler: TSignalHandler<T>): void;
    once(handler: TSignalHandler<T>): void;

    off(handler?: TSignalHandler<T>): void;

}

export type TSignalHandler<T> = {
    (data: T): void;
}

export type TEventGroup<T> = {
    handler: TSignalHandler<T>;
    once: boolean;
}; 

// export interface IEventStorage<T> {
//     common: TEventGroups<T>;
//     [key: string]: TEventGroups<T>;
// }
