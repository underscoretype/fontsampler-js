var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")

var errors = require("./errors")

// supportsWoff2 manually copied from npm woff2-feature-test
var supportsWoff2 = (function() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
})();

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

    if (woff2s.length > 0 && supportsWoff2) {
        return woff2s.shift()
    }

    if (woffs.length > 0) {
        return woffs.shift()
    }

    return false
}

function loadFont(file, callback) {
    if (!file) {
        return false
    }
    var family = file.substring(file.lastIndexOf("/") + 1)
    family = family.substring(0, family.lastIndexOf("."))
    family = family.replace(/\W/gm, "")

    var font = new FontFaceObserver(family)
    font.load().then(function(f) {
        if (typeof(callback) === "function") {
            callback(f)
        }
    })

    if (FontFace) {
        var ff = new FontFace(family, "url(" + file + ")")
        ff.load().then(function() {
            document.fonts.add(ff)
        }).catch(function() {
            throw new Error(errors.fileNotfound + file)
        })
    } else {
        var newStyle = document.createElement("style");
        newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
        document.head.appendChild(newStyle);
    }
}

function fromFiles(files, callback) {
    // TODO bestWoff expects a choice from 2 files, woff and woff2, but this isn't enforced in any way
    font = bestWoff(files)
    loadFont(font, callback)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles
}