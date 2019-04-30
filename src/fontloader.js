var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")
var errors = require("./constants/errors")
var supports = require("./helpers/supports")

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

function loadFont(file, callback, error, timeout) {
    if (!file) {
        return false
    }
    if (typeof(timeout) === "undefined") {
        timeout = 3000
    }
    var family = file.substring(file.lastIndexOf("/") + 1)
    family = family.substring(0, family.lastIndexOf("."))
    family = family.replace(/\W/gm, "")

    if ("FontFace" in window) {
        var ff = new FontFace(family, "url(" + file + ")", {})
        ff.load().then(function() {
            document.fonts.add(ff)
            if (typeof(callback) === "function") {
                callback(ff)
            }
        }, function(e) {
            console.error(family, file, e)
            console.error(new Error(errors.fileNotfound))
            if (typeof(error) === "function") {
                error(e)
            }
        })
    } else {
        // Fallback to loading via @font-face and manually inserted style tag
        // Utlize the FontFaceObserver to detect when the font is available
        var font = new FontFaceObserver(family)
        font.load(null, timeout).then(function(f) {
            font.load().then(function(f) {
                if (typeof(callback) === "function") {
                    callback(f)
                }
            }, function (e) {
                console.error(family, file, e)
                console.error(new Error(errors.fileNotfound))
                if (typeof(error) === "function") {
                    error(e)
                } 
            })
        })
        
        var newStyle = document.createElement("style");
        newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
        document.head.appendChild(newStyle);
    }
}

function fromFiles(files, callback, error, timeout) {
    font = bestWoff(files)
    loadFont(font, callback, error, timeout)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles,
    "bestWoff": bestWoff
}