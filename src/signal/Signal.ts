import { Base } from '../base/Base';
import { BASE_TYPES } from '../base/baseTypes';
import { cidPrefix } from '../base/decorators';
import { ISignalLike, ISignalHandler, TEventGroup } from './interface.d';
import { Receiver } from '../receiver/Receiver';


@cidPrefix('s')
export class Signal<T> extends Base {
    private _eventStorage: Map<Receiver, Array<TEventGroup<T>>> = new Map();


    public dispatch(data: T): void {
        this._eventStorage.forEach((groups, receiver) => {
            groups.forEach((eventGroup, index) => {
                eventGroup.handler.call(receiver, data);

                if (eventGroup.once) {
                    groups.splice(index, 1);
                }
            });
        });
    }

    public on(handler: ISignalHandler<T>, receiver: Receiver): void {
        let group = this._getEventGroups(receiver);

        group.push({
            handler: handler,
            once: false
        });
    }

    public once(handler: ISignalHandler<T>, receiver: Receiver): void {
        let group = this._getEventGroups(receiver);

        group.push({
            handler: handler,
            once: true
        });
    }

    public off(options: {
        handler?: ISignalHandler<T>,
        receiver?: Receiver
    } = {}): void {
        if (!options.handler && !options.receiver) {
            this._resetEventStorage();    
        }

        if (options.receiver) {
            if (!options.handler) {
                this._eventStorage.delete(options.receiver);
                
                return;
            }

            let groups = this._eventStorage.get(options.receiver);

            if (!Array.isArray(groups)) {
                return;
            }

            Signal._removeEventGroupByHandler(groups, options.handler);
        } else {
            this._eventStorage.forEach((groups) => {
                Signal._removeEventGroupByHandler(groups, options.handler);
            });
        }
    }

    private _resetEventStorage(): void {
        this._eventStorage.forEach((eventGroups, receiver) => {
            //todo удалить данный сигнал из ресивера
        });

        this._eventStorage.clear();
    }


    private _getEventGroups(receiver: Receiver): Array<TEventGroup<T>> {
        if (!this._eventStorage.has(receiver)) {
            this._eventStorage.set(receiver, []);
        }

        return this._eventStorage.get(receiver);
    }

    private static _removeEventGroupByHandler<T>(groups: Array<TEventGroup<T>>, handler: ISignalHandler<T>): void {
        groups.forEach((eventGroup, index) => {
            if (eventGroup.handler === handler) {
                groups.splice(index, 1);
            }
        });
    }
}

