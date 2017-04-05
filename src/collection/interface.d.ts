import { Collection } from './Collection';
import { Model } from '../model/Model';
import { TModelChangeParam } from '../model/interface.d';

export type TChangeParam<T, M extends Model<any>> = {
    readonly collection: Collection<M>;
    readonly changes: Map<M, TModelChangeParam<T, M>>;
}

export type TAddRemoveParam<M extends Model<any>> = {
    readonly collection: Collection<M>;
    readonly models: Array<M>;
}
