function pruneClass(className, classNames) {
    if (!classNames) {
        return ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex !== -1) {
        classes.splice(classIndex, 1)
    }

    if (classes.length > 0) {
        return classes.join(" ")
    } else {
        return ""
    }
}

function addClass(className, classNames) {
    if (!classNames) {
        classNames = ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex === -1) {
        if (classNames) {
            return classNames + " " + className
        } else {
            return className
        }
    } else {
        return classNames
    }
}

function nodeAddClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = addClass(className, node.className)

    return true
}

function nodeAddClasses(node, classes) {
    if (!isNode(node) || !Array.isArray(classes) || classes.length < 1) {
        return false
    }

    for (var c = 0; c < classes.length; c++) {
        node.className = addClass(classes[c], node.className)
    }

    return true
}

function nodeRemoveClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = pruneClass(className, node.className)

    return true
}

/**
 * Really just an approximation of a check
 * 
 * @param {*} node 
 */
function isNode(node) {
    return typeof(node) === "object" && node !== null && "nodeType" in node
}

/**
 * flatten an array recursively from https://stackoverflow.com/a/42916843/999162
 * @method flattenDeep
 * @param array {Array}
 * @return {Array} flatten array
 */
function flattenDeep(array) {
    return array.reduce((acc, current) => {
        return Array.isArray(current) ? acc.concat(flattenDeep(current)) : acc.concat([current]);
    }, []);
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
    nodeAddClass: nodeAddClass,
    nodeAddClasses: nodeAddClasses,
    nodeRemoveClass: nodeRemoveClass,
    flattenDeep: flattenDeep,
    isNode: isNode,
    arrayUnique: arrayUnique
}