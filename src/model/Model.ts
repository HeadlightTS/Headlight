import { Receiver } from '../receiver/Receiver';
import { Signal } from '../signal/Signal';
import { ISignalLike } from '../signal/interface.d';
import { TModelChangeParam } from './interface.d';

export class Model<S> extends Receiver {
    public idAttribute: keyof S | 'id' = 'id';

    //public schema: S;
    public readonly schema: {
        readonly [T in keyof S]: S[T];
    } = <any>{};

    public readonly signals: {
        readonly change: {
            [T in keyof S]: Signal<TModelChangeParam<S[T], S>>;
        },
        readonly changeAny: Signal<TModelChangeParam<Partial<S>, S>>;
    } = {
        change: <any>{},
        changeAny: new Signal()
    };

    
    constructor(data: S) {
        super();
        
        this._init();
    }

    public toJSON(): S {
        return <S>{};
    }
    
    public performTransaction(fn: (model: Model<S>) => void): void {
        
    }
    
    public performSilentTransaction(fn: (model: Model<S>) => void): void {

    }

    public update(data: Partial<S>): void {
        
    }

    private _init(): void {
        for (let key of Object.keys(this.schema)) {
            (<any>this).change[key] = new Signal();
        }
    }

    
}
