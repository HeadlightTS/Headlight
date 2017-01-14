import { ICidMap } from './interface.d';

export type ClassDecorator = <T extends Function>(target: T) => T | void;

const cidMap: ICidMap = {};

function generateCid(prefix: string): string {
    const lastCid = cidMap[prefix] || 0;

    cidMap[prefix] = lastCid + 1;

    return prefix + cidMap[prefix];
}


export function cidPrefix(prefix: string): ClassDecorator {
    return function (target: Function): Function  {
        const originalConstructor = target,
            newConstructor = function (...args: Array<any>): any {                
                this.cid = this.cid || generateCid(prefix);

                return originalConstructor.apply(this, args);
            };

        let staticKeys = Object.keys(originalConstructor);

        staticKeys.forEach((key, index) => {
            newConstructor[key] = originalConstructor[key];
        });

        newConstructor.prototype = originalConstructor.prototype;

        return newConstructor;
    };
}
