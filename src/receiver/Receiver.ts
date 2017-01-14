import { Base, toArray } from '../base/Base';
import { cidPrefix } from '../base/decorators';
import { TStopReceivingOptions } from './interface.d';
import { ISignalLike, ISignalHandler } from '../signal/interface.d';
import { Signal } from '../signal/Signal';
 

@cidPrefix('r')
export class Receiver extends Base {
    private _signals: Set<Signal<any>> = new Set();


    public receive<T>(handler: ISignalHandler<T>, ...signals: Array<Signal<T>>): void {
        for (let signal of signals) {
            signal.on(handler, this);

            this._signals.add(signal);
        }
    }

    public receiveOnce<T>(handler: ISignalHandler<T>, ...signals: Array<Signal<T>>): void {
        for (let signal of signals) {
            signal.once(handler, this);

            this._signals.add(signal);
        }
    }

    public stopReceiving<T>(options: TStopReceivingOptions<T> = {}): void {
        if (options.signal) {
            options.signal.off({
                receiver: this,
                handler: options.handler
            });

            if (!options.signal.hasReceiver(this)) {
                this._signals.delete(options.signal);
            }
        } else {
            this._signals.forEach((signal) => {
                signal.off({
                    receiver: this,
                    handler: options.handler
                });

                if (!signal.hasReceiver(this)) {
                    this._signals.delete(signal);
                }
            });
        }
        
    }
}
