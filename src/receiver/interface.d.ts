import { IBase } from '../base/interface.d';
import { ISignalLike, ISignalHandler } from '../signal/interface.d';

export interface IReceiver extends IBase {

    receive<T>(signal: ISignalLike<T>, handler: ISignalHandler<T> ): void;
    receiveOnce<T>(signal: ISignalLike<T>, handler: ISignalHandler<T> ): void;

    stopReceiving<T>(options?: TStopReceivingOptions<T>): void;

}

export type TStopReceivingOptions<T> = {
    signal?: ISignalLike<T>,
    handler?: ISignalHandler<T>
}
