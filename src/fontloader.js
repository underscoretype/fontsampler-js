var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")

// supportsWoff2 manually copied from npm woff2-feature-test
var supportsWoff2 = (function() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
})();
  
function bestWoff(woff, woff2) {
    return woff2 && supportsWoff2 ? woff2 : woff
}

function loadFont(file, callback) {
    console.log("LOAD FONT", file, file.lastIndexOf("/"))
    if (!file) {
        return
    }
    try {
        var family = file.substring(file.lastIndexOf("/") + 1)
        family = family.substring(0, family.lastIndexOf("."))
        family = family.replace(/\W/gm, "")

        console.log("family", family)

        var font = new FontFaceObserver(family)
        font.load().then(function (f) {
            console.log("f", f)
            if (typeof(callback) === "function") {
                callback(f)
            }
        })

        if (FontFace) {
            var ff = new FontFace(family, "url(" + file + ")")
            ff.load()
            document.fonts.add(ff)
        } else {
            var newStyle = document.createElement("style");
            newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
            document.head.appendChild(newStyle);
        }
    } catch (e) {
        console.log(e)
    }
}

function fromFiles(files, callback) {
    // TODO bestWoff expects a choice from 2 files, woff and woff2, but this isn't enforced in any way
    font = bestWoff(files[0], files[1])
    console.log("load font from data", font)
    loadFont(font, function (f) {
        if (typeof callback === "function") {
            callback(f)
        }
    })
}

// function fromData($element, callback) {
//     font = bestWoff($element.data("woff"), $element.data("woff2"))
//     console.log("load font from data", font)
//     loadFont(font, function (f) {
//         if (typeof callback === "function") {
//             callback(f, $element)
//         }
//     })
// }

module.exports = {
    "loadFont": loadFont,
    // "fromData": fromData,
    "fromFiles": fromFiles
}