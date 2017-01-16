import { TStopReceivingOptions } from './interface.d';
import { ISignalLike, ISignalHandler } from '../signal/interface.d';
import { Signal } from '../signal/Signal';
 

export class Receiver {
    private __signals: Set<Signal<any>> = new Set();


    public receive<T>(handler: ISignalHandler<T>, signal: Signal<T>): void {
        signal.on(handler, this);

        this.__signals.add(signal);
    }

    public receiveOnce<T>(handler: ISignalHandler<T>, signal: Signal<T>): void {
        signal.once(handler, this);

        this.__signals.add(signal);
    }

    public stopReceiving<T>(options: TStopReceivingOptions<T> = {}): void {
        if (options.signal) {
            options.signal.off({
                receiver: this,
                handler: options.handler
            });

            if (!options.signal.hasReceiver(this)) {
                this.__signals.delete(options.signal);
            }
        } else {
            this.__signals.forEach((signal) => {
                signal.off({
                    receiver: this,
                    handler: options.handler
                });

                if (!signal.hasReceiver(this)) {
                    this.__signals.delete(signal);
                }
            });
        }
        
    }
}
