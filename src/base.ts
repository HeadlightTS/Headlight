export const BASE_TYPES = {
    UNDEFINED: 'undefined',
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    FUNCTION: 'function'
};

const STRING_LIKE_TYPES = ['string', 'number', 'boolean'];

export function isStringLike(target: any): boolean {
    return STRING_LIKE_TYPES.indexOf(typeof target) !== -1;
}
