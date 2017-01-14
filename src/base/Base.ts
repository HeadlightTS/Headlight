import { cidPrefix } from './decorators';

@cidPrefix('b')
export abstract class Base {
    public readonly cid: string;
}

export function toArray<T>(arg: T | Array<T>): Array<T> {
    if (Array.isArray(arg)) {
        return arg;
    } else {
        return [arg];
    }
}

