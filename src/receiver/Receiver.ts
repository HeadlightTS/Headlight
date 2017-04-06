import { TStopReceivingOptions } from './interface.d';
import { ISignalLike, TSignalHandler } from '../signal/interface.d';
import { Signal } from '../signal/Signal';
 

export class Receiver {
    private __signals: Set<Signal<any>> = new Set<Signal<any>>();


    public receive<T>(signal: Signal<T>, handler: TSignalHandler<T>): void {
        signal.on(handler, this);

        this.__signals.add(signal);
    }

    public receiveOnce<T>(signal: Signal<T>, handler: TSignalHandler<T>): void {
        signal.once(handler, this);

        this.__signals.add(signal);
    }

    public stopReceiving<T>(options: TStopReceivingOptions<T> = {}): void {
        const { signal, handler } = options;

        if (signal) {
            signal.off({
                receiver: this,
                handler: handler
            });

            if (!signal.hasReceiver(this)) {
                this.__signals.delete(signal);
            }
        } else {
            this.__signals.forEach((s) => {
                s.off({
                    receiver: this,
                    handler: handler
                });

                if (!s.hasReceiver(this)) {
                    this.__signals.delete(s);
                }
            });
        }   
    }
}
