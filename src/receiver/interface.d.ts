import { ISignalHandler, ISignalLike } from '../signal/interface.d';

export type TStopReceivingOptions<T> = {
    readonly signals?: ISignalLike<T> | Array<ISignalLike<T>>,
    readonly handler?: ISignalHandler<T>
}
