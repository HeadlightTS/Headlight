import { Receiver } from '../receiver/Receiver';
import { Signal } from '../signal/Signal';
import { ISignalLike } from '../signal/interface.d';
import { TModelChangeParam } from './interface.d';

//@cidPrefix('m')
export class Model<S> extends Receiver {
    public idAttribute: keyof S | 'id' = 'id';

    public readonly schema: {
        readonly [T in keyof S]: T;
    } = <any>{};

    public readonly signals: {
        readonly change: {
            readonly [T in keyof S]: ISignalLike<TModelChangeParam<S[T], S>>;
        },
        readonly changeAny: ISignalLike<TModelChangeParam<Partial<S>, S>>;
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
        let changeSignalsGettersHash = {};

        for (let key of Object.keys(this.schema)) {
            Object.defineProperty(changeSignalsGettersHash, key, {
                get(): Signal<any> {
                    let signal = new Signal();

                    Object.defineProperty(changeSignalsGettersHash, key, {
                        value: signal
                    });

                    return signal;
                }
            });
        }

        let signalsHash = {
            change: changeSignalsGettersHash
        };

        Object.defineProperties(signalsHash, {
            changeAny: {
                get(): Signal<any> {
                    let signal = new Signal();

                    Object.defineProperty(signalsHash, 'changeAny', {
                        value: signal
                    });

                    return signal;
                }   
            }
        });

        Object.defineProperty(this, 'signals', {
            value: signalsHash
        });
    }

    
}
