import { Base } from '../base/Base';
import { cidPrefix } from '../base/decorators';
import { ISignalLike, ISignalHandler } from './interface.d';

@cidPrefix('s')
export class Signal<T> extends Base implements ISignalLike<T> {
    public dispatch(data: T): void {

    }

    public on(handler: ISignalHandler<T>): void {

    }

    public once(handler: ISignalHandler<T>): void {

    }

    public off(handler?: ISignalHandler<T>): void {
        
    }
}

