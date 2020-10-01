
var supports = require("./supports")
var errors = require("../constants/errors")

/**
 * App specific helpers
 */


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

function getExtension(path) {
    return path.substring(path.lastIndexOf(".") + 1)
}


function bestWoff(files) {
    if (typeof(files) !== "object" || !Array.isArray(files)) {
        return false
    }

    var woffs = files.filter(function(value) {
            return getExtension(value) === "woff"
        }),
        woff2s = files.filter(function(value) {
            return getExtension(value) === "woff2"
        })

    if (woffs.length > 1 || woff2s.length > 1) {
        throw new Error(errors.tooManyFiles + files)
    }

    if (woff2s.length > 0 && supports.woff2) {
        return woff2s.shift()
    }

    if (woffs.length > 0) {
        return woffs.shift()
    }

    return false
}

module.exports = {
    getExtension: getExtension,   
    parseParts: parseParts,
    validateFontsFormatting: validateFontsFormatting,
    extractFontsFromDOM: extractFontsFromDOM,
    bestWoff: bestWoff,
}