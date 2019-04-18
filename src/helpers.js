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

/**
 * 
 * @param str className 
 * @param str classNames - space separated
 */
function addClass(className, classNames) {
    if (!classNames) {
        classNames = ""
    }

    if (className === classNames) {
        return classNames
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
    return array.reduce(function (acc, current) {
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



/**
 * Check fonts are passed in with correct structure, e.g.
 * fonts: [ { "Font Name" : [ "fontfile.woff", "fontfile.woff2" ] } ]
 * 
 * TODO: Check that at most only one woff and one woff2 is passed in
 * TODO: Check in passed in axes axes are defined
 * 
 * @param {*} fonts
 */
function validateFontsFormatting(fonts) {
    if (typeof(fonts) !== "object" || !Array.isArray(fonts)) {
        return false
    }

    for (var i = 0; i < fonts.length; i++) {
        var font = fonts[i]
        if (typeof(font) !== "object") {
            return false
        }

        if (!font.name || !font.files || !Array.isArray(font.files) || font.files.length <= 0) {
            return false
        }
    }

    return true
}

function extractFontsFromDOM(root) {
    var select = root.querySelector("[data-fsjs='fontfamily']"),
        options = [],
        fonts = []

    // First try to get data-fonts or data-woff/2 on the root element
    // If such are found, return them
    var rootFonts = extractFontsFromNode(root, true)
    if (rootFonts) {
        return rootFonts
    }

    // Otherwise check if there is a dropdown with options that have
    // data-woff/2 elements
    if (!select) {
        return false
    }

    options = select.querySelectorAll("option")
    for (i = 0; i < options.length; i++) {
        var opt = options[i],
            extractedFonts = extractFontsFromNode(opt, false)

        if (fonts) {
            fonts = fonts.concat(extractedFonts)
        }
    }

    if (fonts) {
        return fonts
    }

    return false
}

function extractFontsFromNode(node, ignoreName) {
    var fonts = [],
        singleFont = {
            "name": "Default",
            "files": []
        }

    // prever a data-fonts json_encoded array
    if (node.dataset.fonts) {
        try {
            fonts = JSON.parse(node.dataset.fonts)
            return fonts
        } catch (error) {
            console.error(node.dataset.fonts)
            throw new Error(errors.dataFontsJsonInvalid)
        }
    }

    // else see if a single font can be extracted
    if (node.dataset.name) {
        singleFont.name = node.dataset.name
    }

    if (node.dataset.woff) {
        singleFont.files.push(node.dataset.woff)
    }

    if (node.dataset.woff2) {
        singleFont.files.push(node.dataset.woff2)
    }

    if ((singleFont.name || (!singleFont.name && ignoreName)) && singleFont.files.length > 0) {
        return [singleFont]
    }

    return false
}



/**
 * Split an input choice into value and text or return only the value as 
 * both if no separator is used to provide a readable label
 * e.g. "ltr|Left" to right becomes { val: "ltr", text: "Left to right"}
 * but: "left" becomes { val: "left", text: "left"}
 * @param string choice 
 * @return obj {val, text}
 */
function parseParts(choice) {
    var parts, val, text

    if (choice.indexOf("|") !== -1) {
        parts = choice.split("|")
        val = parts[0]
        text = parts[1]
    } else {
        val = choice
        text = choice
    }

    return {
        val: val,
        text: text
    }
}

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
    
    if (value < min) {
        value = min
    } else if (value > max) {
        value = max
    }

    return value
}

module.exports = {
    nodeAddClass: nodeAddClass,
    nodeAddClasses: nodeAddClasses,
    nodeRemoveClass: nodeRemoveClass,
    isNode: isNode,

    flattenDeep: flattenDeep,
    arrayUnique: arrayUnique,
    parseParts: parseParts,
    clamp: clamp,

    validateFontsFormatting: validateFontsFormatting,
    extractFontsFromDOM: extractFontsFromDOM,
}