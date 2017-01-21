import { Signal } from '../signal/Signal';
import { Model } from './Model';

export let signalsGetters = {
    __context: null
};

let changeSignals = {
    __context: null
};

Object.defineProperty(signalsGetters, 'changeAny', {
    get(): Signal<any> {
        if (!this.__context.__signalStorage.changeAny) {
            this.__context.__signalStorage.changeAny = new Signal();
        }
        
        return this.__context.__signalStorage.changeAny;
    }
});

Object.defineProperty(signalsGetters, 'change', {
    get(): Model<any>['signals']['change'] {
        changeSignals.__context = this;

        return changeSignals;
    }
});
