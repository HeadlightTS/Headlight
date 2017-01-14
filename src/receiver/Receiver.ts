import { Base, toArray } from '../base/Base';
import { cidPrefix } from '../base/decorators';
import { TStopReceivingOptions } from './interface.d';
import { ISignalLike, ISignalHandler } from '../signal/interface.d';

@cidPrefix('r')
export class Receiver extends Base {
    public receive<T>(signals: ISignalLike<T> | Array<ISignalLike<T>>, handler: ISignalHandler<T> ): void {
        signals = toArray(signals);
    }

    public receiveOnce<T>(signals: ISignalLike<T> | Array<ISignalLike<T>>, handler: ISignalHandler<T> ): void {
        signals = toArray(signals);
    }

    public stopReceiving<T>(options?: TStopReceivingOptions<T>): void {
        if (options) {
            if (options.signals) {
                const signals = toArray(options.signals);
            }
        }
    }
}
