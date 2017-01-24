import { TSignalHandler, ISignalLike } from '../signal/interface.d';
import { Signal } from '../signal/Signal';

export type TStopReceivingOptions<T> = {
    readonly signal?: Signal<T>,
    readonly handler?: TSignalHandler<T>
}
