import { TChangeParam, TAddRemoveParam } from './interface.d';
import { TModelChangeParam } from '../model/interface.d';
import { Signal } from '../signal/Signal';
import { Receiver } from '../receiver/Receiver';
import { Model } from '../model/Model';
import { BASE_TYPES } from '../base';


 export abstract class Collection<M extends Model<any>> extends Receiver {

//     public abstract Model: typeof Model;

//     public readonly signals: {
//         readonly change: {
//             [T in keyof M['schema']]: Signal<TChangeParam<M['schema'][T], M>>;
//         };
//         readonly changeAny: Signal<TChangeParam<Partial<M['schema']>, M>>;
//         readonly add: Signal<TAddRemoveParam<M>>;
//         readonly remove: Signal<TAddRemoveParam<M>>;
//     };

//     public get size(): number {
//         return this.__storage.size;
//     }

//     private __storage: Set<M> = new Set<M>();
//     private __createdChangeSignals: Set<Signal<TChangeParam<any, M>>> = new Set<Signal<TChangeParam<any, M>>>();

//     constructor(data: Array<M | M['schema']> = []) {
//         super();
        
//         this.__init();

//         for (let item of data) {
//             this.add(item);
//         }
//     }

//     public add(model: M | M['schema']): this {
//         if (!(model instanceof Model)) {
//             model = new this.Model(model);
//         }

//         if (!this.__storage.has(model)) {
//             this.__storage.add(model);

//             this.__listenToModelChangeSignals(model);

//             this.signals.add.dispatch({
//                 collection: this,
//                 models: [model]
//             });
//         }

//         return this;
//     }

//     public clear(): void {
//         const models = this.values();

//         this.__storage.clear();

//         for (let m of models) {

//         }

//         if (models.length) {
//             for (let model of models) {
//                 this.__stopListenToModelChangeSignals(model);
//             }

//             this.signals.remove.dispatch({
//                 collection: this,
//                 models: models
//             });
//         }
//     }

//     public delete(model: M): boolean {
//         const flag = this.__storage.delete(model);

//         if (flag) {
//             this.__stopListenToModelChangeSignals(model);

//             this.signals.remove.dispatch({
//                 collection: this,
//                 models: [model]
//             });
//         }

//         return flag;
//     }

//     public entries(): Iterator<Array<M>> {
//         if (typeof this.__storage.entries === BASE_TYPES.FUNCTION) {
//             return this.__storage.entries();
//         }

//         // const res: Array<M> = [];

//         // this.__storage.forEach((model) => {
//         //     res.push(model);
//         // });

//         // return res.entries();
//     }

//     public forEach(fn: (model: M) => void, context?: any): void {
//         this.__storage.forEach(fn, context);
//     }

//     public has(model: M): boolean {
//         return this.__storage.has(model);
//     }

//     public keys(): Iterator<M> {
//         if (typeof this.__storage.keys === BASE_TYPES.FUNCTION) {
//             return this.__storage.keys();
//         }

//         // return this.entries().map((arr) => {
//         //     return arr[0];
//         // });
//     }

//     public values(): Iterator<M> {
//         if (typeof this.__storage.values === BASE_TYPES.FUNCTION) {
//             return this.__storage.values();
//         }

//         // return this.entries().map((arr) => {
//         //     return arr[1];
//         // });
//     }

//     // public toJSON<T>(): Array<M['schema'] | T> {
//     //     return this.__storage.values().map((model) => {
//     //         return model.toJSON();
//     //     });
//     // }

//     private __init(): void {
//         const signals = <any>{};

//         for (let key of Object.keys(this.Model.prototype.schema)) {
//             Object.defineProperty(signals.change, key, {
//                 get: () => {
//                     const signal: Signal<TChangeParam<any, M>> = new Signal();

                    
                    
//                     for (let model of this.values()) {
//                         this.receive(model.signals.change[key], (data: TModelChangeParam<any, M>) => {
//                             signal.dispatch({
//                                 collection: this,
//                                 changes: (new Map<any, any>()).set(data)
//                             });
//                         });
//                     }

//                     Object.defineProperty(signals.change, key, {
//                         value: signal
//                     });

//                     this.__createdChangeSignals.add(signal);

//                     return signal;
//                 }
//             });
//         }

//         Object.defineProperty(this.signals, 'changeAny', {
//             get: () => {
//                 const signal: Signal<TChangeParam<any, M>> = new Signal();

//                 for (let model of this.values()) {
//                     this.receive(model.signals.changeAny, (data: TModelChangeParam<any, M>) => {
//                         signal.dispatch({
//                             collection: this,
//                             changes: (new Map<any, any>()).set(data.model, data)
//                         });
//                     });
//                 }

//                 Object.defineProperty(signals, 'changeAny', {
//                     value: signal
//                 });
                
//                 this.__createdChangeSignals.add(signal);

//                 return signal;
//             }
//         });

//         signals.add = new Signal();
//         signals.remove = new Signal();

//         (<any>this).signals = signals;
//     }

//     private __listenToModelChangeSignals(model: M): void {
//         for (let key of Object.keys(this.Model.prototype.schema)) {
//             if (!this.__createdChangeSignals.has(this.signals.change[key])) {
//                 this.receive(model.signals.change[key], (data: TModelChangeParam<any, M>) => {
//                     this.signals.change[key].dispatch({
//                         collection: this,
//                         changes: (new Map<any, any>()).set(data.model, data)
//                     });
//                 });
//             }
//         }

//         if (!this.__createdChangeSignals.has(this.signals.changeAny) ) {
//             this.receive(model.signals.changeAny, (data: TModelChangeParam<any, M>) => {
//                 this.signals.changeAny.dispatch({
//                     collection: this,
//                     changes: (new Map<any, any>()).set(data.model, data)
//                 });
//             });
//         }
//     }

//     private __stopListenToModelChangeSignals(model: M): void {
//         for (let key of Object.keys(this.Model.prototype.schema)) {
//             if (this.__createdChangeSignals.has(this.signals.change[key])) {
//                 this.stopReceiving({
//                     signal: model.signals.change[key]
//                 });
//             }
//         }

//         if (this.__createdChangeSignals.has(this.signals.changeAny)) {
//             this.stopReceiving({
//                 signal: model.signals.changeAny
//             });
//         }
//     }
}
