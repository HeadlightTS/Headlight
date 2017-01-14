import { cidPrefix } from '../base/decorators';
import { Receiver } from '../receiver/Receiver';
import { ISignalLike } from '../signal/interface.d';
import { TModelChangeParam } from './interface.d';

@cidPrefix('m')
export class Model<S> extends Receiver {
    public idAttribute: keyof S | 'id' = 'id';

    public readonly schema: {
        readonly [T in keyof S]: T;
    };

    public readonly on: {
        readonly change: {
            readonly [T in keyof S]: ISignalLike<TModelChangeParam<S[T], S>>;
        },
        readonly changeAny: ISignalLike<TModelChangeParam<Partial<S>, S>>;
    };

    public toJSON(): S {
        return <S>{};
    }
    
    public performTransaction(fn: (model: Model<S>) => void): void {
        
    }
    
    public performSilentTransaction(fn: (model: Model<S>) => void): void {

    }

    update(data: Partial<S>): void {
        
    }
}
