import { Receiver } from '../receiver/Receiver';
import { Signal } from '../signal/Signal';
import { ISignalLike } from '../signal/interface.d';
import { TModelChangeParam } from './interface.d';
import { signalsGetters } from './signalsGetters';

export class Model<S> extends Receiver {
    public idAttribute: keyof S | 'id' = 'id';

    public get signals(): {
        readonly change: {
            [T in keyof S]: Signal<TModelChangeParam<S[T], Model<S>>>;
        },
        readonly changeAny: Signal<TModelChangeParam<Partial<S>, Model<S>>>;
    } {
        (<any>signalsGetters).__context = this;

        return <any>signalsGetters;
    };

    public readonly schema: {
        readonly [T in keyof S]: S[T];
    } = <Model<S>['schema']>{};

    private __signalStorage: {
        [key: string]: Signal<any>
    } = {};
    
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
            (<any>this.signals.change)[key] = new Signal();
        }
    }    
}
