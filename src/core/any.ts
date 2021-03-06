// -===================================- //
// -= Copyright (c) 2018 Yuuki Wesp   =- //
// -= Licensed under the MIT License. =- //
// -===================================- //

import validateArray from "../utils/validateArray";
import isUsePureJS from "../utils/isUsePureJS";
import call from "../utils/call";


export type anyDelegate<T> = (element: T) => boolean

/**
 * Determines whether any element of a sequence exists or satisfies a condition.
 * @author Yuuki Wesp
 * @version 1.7.10
 * @example
 *      [0, 1, 2].Any() -> true
 *      [0, 1, 2].Any(x => x > 5) -> false
 *      [].Any() -> false
 * @argument array      - Array of elemets.
 * @argument predicate  - a condition. (default auto)
 * @throws ReferenceError - array is undefined.
 * @public @static @method Any
 */
export default <T>(array: T[], predicate: anyDelegate<T> = (() => true)) => {
    'use opt';
    validateArray(array);
    if (isUsePureJS()) {
        let l = array.length;
        while (l-- > 0) {
            '%opt-call';
            let res = call(Reflect.apply, predicate, array, [array[l], l, array]);
            if (res === true)
                return true;
        }
        return false;
    }
    return array.some(predicate);
}