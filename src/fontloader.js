var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")
var errors = require("./constants/errors")
var supports = require("./helpers/supports")
var helpers = require("./helpers/helpers")


/**
 * Helper to generate a unique string for a fontface with given parameters.
 * 
 * @param {*} family 
 * @param {*} weight 
 * @param {*} fontstyle 
 * @param {*} variations 
 * @returns {str} like ACMEFOnt-100-normal-normal-wght-100
 */
function ffSignature(family, weight, fontstyle, variations) {
    let vars = "normal"
    if (variations && variations !== "normal") {
        vars = ""
        variations = helpers.parseVariation(variations)
        Object.keys(variations).sort().forEach((axis) => {
            vars += axis + "-" + variations[axis]
        })
    }
    let id = [family.replace(/[^A-z0-9-]/gi, ""), weight, fontstyle, vars].join("-")
    return id
}

/**
 * To avoid initiating simultanouse file load requests for the same font file
 * orchestrate font loading through this global load queuer
 */
function GlobalLoader() {

    var queue = [], // array of loading fonts
        done = {}, // object with fontface objects
        callbacks = {}; // object with family name index and lists of success/error

    function onFontDone(font, file, success, error, timeout) {

        // If Is font loaded? -> to cb responses, return true
        // El Is font loading? -> add responses to queue, return true
        // El Add font to loading, add responses to queue, return false (init loading)

        let id = ffSignature(font.family, font.weight, font.style, font.instance || "normal")

        if (id in done === true) {
            console.debug("GlobalLoader.onFontDone: ID already in done", id)
            // Font is loaded already, just trigger the callback according to the result of the
            // load.
            if (done[id].isLoaded === true) {
                success(done[id])
            } else {
                error(done[id])
            }
            
        } else if (queue.indexOf(id) !== -1) {
            console.debug("GlobalLoader.onFontDone: ID queued", id)
            // Font in load queue but not loaded, let the original loading happen and add this
            // call to the callbacks for once it loads.
            callbacks[id].success.push(success)
            callbacks[id].error.push(error)

        } else {
            console.debug("GlobalLoader.onFontDone: ID neither done yet nor queued, add to callbacks", id)
            // Default case for a new font, add callbacks, then proceed to load it.
            queue.push(id)
            callbacks[id] = {
                success: [success],
                error: [error]
            }

            load(font, file, timeout)
        }
    }

    /**
     * When a font is loaded remove it from the queue, call all listeners’
     * callbacks and save it’s FontFace in `done` for later-coming requests
     * 
     * @param {obj} fontface (actual fontface object or just a mock object with same attributes)
     * @param {str} _id - can optionally be provided to overwrite the ffSignature generated from
     *      the passed in fontface (e.g. ignore/force 'wght')
     */
    function onSuccess(fontface, _id) {
        console.debug("GlobalLoader.onSuccess", fontface)
        let id = _id;

        if (typeof(_id) === "undefined") {
            id = ffSignature(fontface.family, fontface.weight, fontface.style, fontface.variationSettings)
        }

        queue.splice(queue.indexOf(id), 1)

        // Order matters here; the callbacks might rely on this family
        // as being marked loaded (e.g. lazyloading)
        fontface.isLoaded = true
        done[id] = fontface

        if (id in callbacks && "success" in callbacks[id]) {
            for (var i = 0; i < callbacks[id].success.length; i++) {
                console.debug("GlobalLoader, success callback", callbacks[id].success[i], fontface)
                callbacks[id].success[i](fontface)
            }
            callbacks[id] = {}
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
     * @param {obj} font 
     * @param {str} file 
     * @param {int} timeout 
     */
    async function load(font, file, timeout) {
        console.debug("GlobalLoader.load", font, file)

        let ff;

        if (typeof(timeout) === "undefined") {
            timeout = 3000
        }

        // Get any fonts defined so far, e.g. via CSS, so we can check if a
        // CSS-defined font has the same parameters as a fontsampler font, and
        // if so reuse that Fontface instead of creating a duplicate (and
        // loading the same file twice!)
        let variationSettings = "normal";
        if ("instance" in font) {
            variationSettings = helpers.variationString(font.instance, ["wght"])
        }

        // User supplied a cls and family to use for this font. Let's check
        // if this class is defined and renders with the given family name.
        if ("cls" in font) {

            const fontFaceSet = await document.fonts.ready,
                fontFaces = [... fontFaceSet];

            // By process of elimination go through all declared (but possibly unloaded)
            // font face declarations. Check each one if all parameters are a match for the
            // font we're looking to load.
            const match = fontFaces.filter((f) => {
                // Parsing the font families can be a bit iffy, e.g.
                // font-family: "ACME Sans"
                // will return '"ACME Sans"' (with the extra quotes)
                // To get around this check for matches ignoring any quotes
                // and if matched, explicitly overwrite the CSS definitions
                // font-family value to the FS font declaration
                let fplain = f.family.replace(/["']/gi, ""),
                    familyplain = font.family.replace(/["']/gi, "");
                

                if (fplain !== familyplain) {
                    return false
                }

                if ("style" in f && font.style.toLowerCase() !== f.style.toLowerCase()) {
                    return false
                }

                if ("weight" in f) {
                    let w = parseFloat(f.weight)
                    // Weight could be 
                    // font-weight: xxx
                    // font-weight: normal|bold
                    // (we're ignoring lighter and bolder, those don't make sense in this context)
                    // font-weight: xxx xxx

                    // Deal with keyword weights;
                    if (f.weight.toLowerCase() === "normal") {
                        f.weight = 400
                        w = 400.0
                    }
                    if (f.weight.toLowerCase() === "bold") {
                        f.weight = 700
                        w = 700.0
                    }
                    
                    // Check if weight was specified as two integers
                    const wghtVals = [... f.weight.matchAll(/(\d+)\s+(\d+)/gi)]
                    
                    if (wghtVals.length !== 0 && wghtVals[0].length === 3) {
                        const min = parseFloat(wghtVals[1]),
                            max = parseFloat(wghtVals[2]);
                        
                        if (min > w || max < w) {
                            return false
                        } else {
                        }
                    } else if (w !== parseFloat(font.weight)) {
                        // Last resort, was is a single integer, and does it match?
                        return false
                    }
                }

                return true
            })

            
            // The provided 'cls' and 'family' match with a CSS font face declaration. To avoid 
            // double loading the file (with JS Fontface API) we perform some tests to determine if the font
            // has in fact loaded (with a timeout of 3000ms).
            // If nothing was matched, or if the cls based declaration did not in fact result in
            // a loaded font, fall through and use JS Fontface API.
            if (match.length > 0) {
                
                if (match.length > 1) {
                    console.warn("Matching fontsampler font cls to fontface returned more than one match, using first:", match)
                }
                
                ff = match[0]

                console.debug("Matched a CSS font face declaration for font", font, ff)

                const plain = helpers.pseudoElement("", true, { "fontWeight": font.weight, "fontFamily": "monospace"}),
                    withCls = helpers.pseudoElement(font.cls, true, { "fontWeight": font.weight }),
                    abortAfter = Date.now() + timeout;
                    
                let clsLoaded = false;

                // fontfaceobserver uses this string... it may be more suitable than others, or not
                plain.innerText = "BESbswy"
                withCls.innerText = "BESbswy"

                await new Promise((resolve, reject) => {
                    function check() {
                        if (Date.now() > abortAfter) {
                            console.warn("Exceeded timeout, mark font ", font, "as loaded")
                            // No need to catch the reject, not-setting clsLoaded is the flag we need
                            reject()
                            return
                        }

                        if (Math.round(plain.getBoundingClientRect().width * 100) !== Math.round(withCls.getBoundingClientRect().width * 100)) {
                            clsLoaded = true
                            resolve()
                            return
                        }

                        setTimeout(check, 10)
                    }
                    check()
                })

                plain.parentElement.removeChild(plain)
                withCls.parentElement.removeChild(withCls)
                
                if (clsLoaded) {
                    if ("instance" in font) {
                        variationSettings = helpers.variationString(font.instance)
                    }

                    // Pass explicit signature including the original variationSettings
                    const id = ffSignature(ff.family, font.weight, ff.style, variationSettings)
                    
                    // The fontface was a match, and it is loaded (via CSS) now, so call success
                    onSuccess(ff, id)
                    
                    return
                }

                console.warn("Font with 'cls' " + font.cls + " didn't load, loading as new Fontface.")
                font.cls = false
            } else {
                console.warn("Font with 'cls' " + font.cls + " didn't match any CSS font-face, loading as new Fontface.")
                font.cls = false
            }
        }
        
        // else: not returned above, not using a 'cls' to possible match, so use 
        // FontFace API to load the font and trigger success/error.
        
        ff = new FontFace(font.family, "url(" + file + ")", {
            variationSettings: helpers.variationString(font.instance) || "normal", 
            style: font.style,
            weight: font.weight,
        })
        font.fontface = ff

        document.fonts.add(ff)

        ff.load().then(function() {
            onSuccess(ff)
        }, function(e) {
            onError(ff.family, file, e)
        })
    }

    return {
        onFontDone: onFontDone
    }
}

function loadFont(font, callback, error, timeout) {

    const file = helpers.bestWoff(font.files)

    // Create or get global Loader queuer, append request
    if ("FontsamplerFontloader" in window === false) {
        window.FontsamplerFontloader = GlobalLoader()
    }
    window.FontsamplerFontloader.onFontDone(font, file, callback, error, timeout)
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
function fromFiles(font, callback, error, timeout) {    
    loadFont(font, callback, error, timeout)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles,
}