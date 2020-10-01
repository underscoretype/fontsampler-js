/**
 * Non-app specific JS helpers
 */

/**
 * Number clamp to min—max with fallback for when any input value is not a number
 * @param {*} value 
 * @param {*} min 
 * @param {*} max 
 * @param {*} fallback 
 */
function clamp(value, min, max, fallback) {
    value = parseFloat(value)
    min = parseFloat(min)
    max = parseFloat(max)

    if (isNaN(value) || isNaN(min) || isNaN(max)) {
        if (typeof(fallback) !== "undefined") {
            value = fallback
        } else {
            return value
        }
    }

    return Math.min(max, Math.max(value, min))
}

/**
 * flatten an array recursively from https://stackoverflow.com/a/42916843/999162
 * @method flattenDeep
 * @param array {Array}
 * @return {Array} flatten array
 */
function flattenDeep(array) {
    try {
        return array.reduce(function(acc, current) {
            return Array.isArray(current) ? acc.concat(flattenDeep(current)) : acc.concat([current]);
        }, []);
    } catch (e) {
        console.error(e)
        return []
    }
}

function arrayUnique(a) {
    if (!Array.isArray(a)) {
        return false
    }
    return a.filter(function(value, index, self) {
        return self.indexOf(value) === index
    }, a)
}

module.exports = {
    flattenDeep: flattenDeep,
    arrayUnique: arrayUnique,
    clamp: clamp
}