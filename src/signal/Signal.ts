import { BASE_TYPES } from '../base';
import { ISignalLike, TSignalHandler, TEventGroup } from './interface.d';
import { Receiver } from '../receiver/Receiver';


export class Signal<T> {
    // public get data(): T {
    //     return this.__data;
    // }

    private _eventStorage: Map<Receiver, Array<TEventGroup<T>>> = new Map<Receiver, Array<TEventGroup<T>>>();
    //private __data: T;


    constructor(/*data: T*/) {
        //this.__data = data;
    }

    public dispatch(data: T): void {
        //this.__data = data;

        this._eventStorage.forEach((groups, receiver) => {
            groups.forEach((eventGroup, index) => {
                eventGroup.handler.call(receiver, data);

                if (eventGroup.once) {
                    this.off({
                        handler: eventGroup.handler,
                        receiver: receiver
                    });
                }
            });
        });
    }

    public on(handler: TSignalHandler<T>, receiver: Receiver): void {
        const group = this._getEventGroups(receiver);

        group.push({
            handler: handler,
            once: false
        });
    }

    public once(handler: TSignalHandler<T>, receiver: Receiver): void {
        const group = this._getEventGroups(receiver);

        group.push({
            handler: handler,
            once: true
        });
    }

    public off(options: {
        handler?: TSignalHandler<T>,
        receiver?: Receiver
    } = {}): void {
        const { receiver, handler } = options;

        if (!handler && !receiver) {
            this._resetEventStorage();    
        }

        if (receiver) {
            if (!handler) {
                this._eventStorage.delete(receiver);
                
                return;
            }

            const groups = this._eventStorage.get(receiver);

            if (!Array.isArray(groups)) {
                return;
            }

            if (Signal._removeEventGroupByHandler(groups, handler)) {
                receiver.stopReceiving({
                    signal: this
                });
            }
        } else {
            this._eventStorage.forEach((groups, r) => {
                if (Signal._removeEventGroupByHandler(groups, handler)) {
                    r.stopReceiving({
                        signal: this
                    });
                }
            });
        }
    }

    public hasReceiver(receiver: Receiver): boolean {
        return this._eventStorage.has(receiver);
    }

    private _resetEventStorage(): void {
        this._eventStorage.forEach((eventGroups, receiver) => {
            receiver.stopReceiving({
                signal: this
            });
        });

        this._eventStorage.clear();
    }


    private _getEventGroups(receiver: Receiver): Array<TEventGroup<T>> {
        if (!this._eventStorage.has(receiver)) {
            this._eventStorage.set(receiver, []);
        }

        return this._eventStorage.get(receiver);
    }

    private static _removeEventGroupByHandler<T>(groups: Array<TEventGroup<T>>, handler: TSignalHandler<T>): boolean {
        for (let i = groups.length; i--; ) {
            if (groups[i].handler === handler) {
                groups.splice(i, 1);
            }
        }

        return !groups.length;
    }
}

