var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")
var errors = require("./constants/errors")
var supports = require("./helpers/supports")
var helpers = require("./helpers/helpers")


/**
 * To avoid initiating simultanouse file load requests for the same font file
 * orchestrate font loading through this global load queuer
 */
function GlobalLoader() {

    var queue = [], // array of loading fonts
        done = {}, // object with fontface objects
        callbacks = {} // object with family name index and lists of success/error
        // callbacks to do when loaded

    function onFontDone(family, file, success, error, timeout) {

        // If Is font loaded? -> to cb responses, return true
        // El Is font loading? -> add responses to queue, return true
        // El Add font to loading, add responses to queue, return false (init loading)

        if (family in done === true) {
            // font is loaded
            if (done[family].isLoaded === true) {
                success(done[family])
            } else {
                error(done[family])
            }

        } else if (queue.indexOf(family) !== -1) {
            // font in load queue but not loaded
            callbacks[family].success.push(success)
            callbacks[family].error.push(error)

        } else {
            queue.push(family)
            callbacks[family] = {
                success: [success],
                error: [error]
            }

            load(family, file, timeout)
        }
    }

    /**
     * When a font is loaded remove it from the queue, call all listeners’
     * callbacks and save it’s FontFace in `done` for later-coming requests
     * 
     * @param {obj} fontface 
     */
    function onSuccess(fontface) {

        queue.splice(queue.indexOf(fontface.family), 1)

        // Order matters here; the callbacks might rely on this family
        // as being marked loaded (e.g. lazyloading)
        fontface.isLoaded = true
        done[fontface.family] = fontface

        if (fontface.family in callbacks && "success" in callbacks[fontface.family]) {
            for (var i = 0; i < callbacks[fontface.family].success.length; i++) {
                callbacks[fontface.family].success[i](fontface)
            }
            callbacks[fontface.family] = {}
        }
    }

    function onError(family, file, e) {
        console.error(family, file, e)
        console.error(new Error(errors.fileNotfound))
        if (typeof(error) === "function") {
            error(e)
        }
    }

    /**
     * The actual load logic with FontFace API or @font-face fallback
     * 
     * @param {str} family 
     * @param {str} file 
     * @param {int} timeout 
     */
    function load(family, file, timeout) {
        if (typeof(timeout) === "undefined") {
            timeout = 3000
        }

        if ("FontFace" in window) {
            var ff = new FontFace(family, "url(" + file + ")", {})
            ff.load().then(function() {
                document.fonts.add(ff)
                onSuccess(ff)
            }, function(e) {
                onError(family, file, e)
            })
        } else {
            // Fallback to loading via @font-face and manually inserted style tag
            // Utlize the FontFaceObserver to detect when the font is available
            var font = new FontFaceObserver(family)
            font.load(null, timeout).then(function(ff) {
                onSuccess(ff)
            }, function(e) {
                onError(family, file, e)
            })

            var newStyle = document.createElement("style");
            newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
            document.head.appendChild(newStyle);
        }
    }

    return {
        onFontDone: onFontDone
    }
}

function loadFont(file, callback, error, timeout) {
    if (!file) {
        return false
    }

    var family = file.substring(file.lastIndexOf("/") + 1)
    family = family.substring(0, family.lastIndexOf("."))
    family = family.replace(/\W/gm, "")

    // Create or get global Loader queuer, append request
    if ("FontsamplerFontloader" in window === false) {
        window.FontsamplerFontloader = GlobalLoader()
    }
    window.FontsamplerFontloader.onFontDone(family, file, callback, error, timeout)
}

/**
 * A convenience wrapper around loadFont picking the best font format
 * in @param files
 * 
 * @param {Array} files 
 * @param {function} callback 
 * @param {object} error 
 * @param {int} timeout 
 */
function fromFiles(files, callback, error, timeout) {
    font = helpers.bestWoff(files)
    loadFont(font, callback, error, timeout)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles,
}