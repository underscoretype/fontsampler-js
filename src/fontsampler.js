/**
 * Fontsampler.js
 * 
 * A configurable standalone webfont type tester for displaying and manipulating sample text.
 * 
 * @author Johannes Neumeier <hello@underscoretype.com>
 * @copyright 2019 Johannes Neumeier
 * @license GNU GPLv3
 */

// var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var extend = require("../node_modules/extend")

var Fontloader = require("./fontloader")
var Interface = require("./interface")
var Preloader = require("./preloader")
var errors = require("./errors")

function Fontsampler(root, fonts, opt) {

    console.debug("Fontsampler()", root, fonts, opt)

    var extractedFonts,
        interface,
        isInit = false,
        preloader = new Preloader(),
        defaults

    // Check for a root element to render to
    if (!root) {
        throw new Error(errors.missingRoot + root)
    }

    // A minimal default setup requiring only passed in font(s) and not generating any
    // interface elements except a tester input
    defaults = {
        initialText: "",
        order: [
            ["fontsize", "lineheight", "letterspacing", "fontfamily"], "tester"
        ],
        wrapperClass: "fontsampler-ui-wrapper",
        loadingClass: "loading",
        lazyload: false,
        ui: {
            tester: {
                editable: true,
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-tester"
            },
            fontsize: {
                unit: "px",
                init: 18,
                min: 12,
                max: 96,
                step: 1,
                label: "Size",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-fontsize"
            },
            lineheight: {
                unit: "%",
                init: 100,
                min: 60,
                max: 120,
                step: 5,
                label: "Leading",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-lineheight"
            },
            letterspacing: {
                unit: "em",
                init: 0,
                min: -1,
                max: 1,
                step: 0.05,
                label: "Letterspacing",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-letterspacing"
            },
            fontfamily: {
                label: "Font",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-fontfamily"
            }
        }
    }

    // defaults.ui.fontsize.render = false if not passed in
    // etc.
    for (var key in defaults.ui) {
        defaults.ui[key].render = !!(opt && opt.ui && key in opt.ui)
    }
    // always render a tester by default!
    defaults.ui.tester.render = true

    // Extend or use the default options
    if (typeof opt === "object") {
        options = extend(true, defaults, opt)
    } else {
        options = defaults
    }

    extractedFonts = extractFontsFromDOM()
    if (!fonts && extractedFonts) {
        fonts = extractedFonts
    }
    if (!fonts) {
        throw new Error(errors.noFonts)
    }
    if (!validateFontsFormatting(fonts)) {
        console.error(fonts)
        throw new Error(errors.initFontFormatting)
    }

    interface = Interface(root, fonts, options)

    function addEventListeners() {
        root.addEventListener("fontsampler.onfontsizechanged", function() {
            var val = interface.getCSSValue("fontsize")
            interface.setInput("fontSize", val)
        })
        root.addEventListener("fontsampler.onlineheightchanged", function() {
            var val = interface.getCSSValue("lineheight")
            interface.setInput("lineHeight", val)
        })
        root.addEventListener("fontsampler.onletterspacingchanged", function() {
            var val = interface.getCSSValue("letterspacing")
            interface.setInput("letterSpacing", val)
        })

        root.addEventListener("fontsampler.onfontfamilychanged", function() {
            var val = interface.getValue("fontfamily")
            loadFont(val)
        })
    }

    /**
     * Check fonts are passed in with correct structure, e.g.
     * fonts: [ { "Font Name" : [ "fontfile.woff", "fontfile.woff2" ] } ]
     * 
     * TODO: Check that at most only one woff and one woff2 is passed in
     * 
     * @param {*} fonts 
     */
    function validateFontsFormatting(fonts) {
        if (typeof(fonts) !== "object" || !Array.isArray(fonts)) {
            return false
        }

        for (var index in fonts) {
            if (typeof(fonts[index]) !== "object") {
                console.error(fonts[index])
                return false
            }

            if (!fonts[index].name || !fonts[index].files || !Array.isArray(fonts[index].files) || fonts[index].files.length <= 0) {
                console.error(fonts[index])
                return false
            }
        }

        return true
    }

    function extractFontsFromDOM() {
        var select = root.querySelector("[data-property='fontfamily']"),
            options = [],
            fonts = []

        // First try to get and data-woff/2 on the root element
        // If such are found, return them
        var rootFonts = extractFontsFromNode(root, true)
        if (rootFonts) {
            fonts.push(rootFonts)
            return fonts
        }

        // Otherwise check if there is a dropdown with options that have
        // data-woff/2 elements
        if (!select) {
            return false
        }

        options = select.querySelectorAll("option")
        for (i = 0; i < options.length; i++) {
            var opt = options[i],
                font = extractFontsFromNode(opt, false)

            if (font) {
                fonts.push(font)
            }
        }

        if (fonts) {
            return fonts
        }

        return false
    }

    function extractFontsFromNode(node, ignoreName) {
        var font = {
            name: "default",
            files: []
        }

        if (node.dataset.fontname) {
            font.name = node.dataset.fontname
        }

        if (node.dataset.woff) {
            font.files.push(node.dataset.woff)
        }

        if (node.dataset.woff2) {
            font.files.push(node.dataset.woff2)
        }

        if ((font.name || (!font.name && ignoreName)) && font.files.length > 0) {
            return font
        }

        return false
    }

    function loadFont(indexOrKey) {
        console.debug("Fontsampler.loadFont", indexOrKey)

        preloader.pause()

        interface.setLoadingStatus(true)
        files = []
        if (typeof(indexOrKey) === "string") {
            console.log(fonts)
            files = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop().files
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            files = fonts[indexOrKey].files
        }

        Fontloader.fromFiles(files, function(f) {
            interface.setInput("fontFamily", f.family)
            interface.setLoadingStatus(false)

            preloader.resume()
        })
    }

    function init() {
        console.debug("Fontsampler.init()")
        interface.init()
        preloader.load(fonts)
        addEventListeners()
        loadFont(0)
    }

    function lazyload() {
        if (isInit && fonts) {
            preloader.load(fonts)
        }
    }

    // interface
    return {
        init: init,
        lazyload: lazyload
    }
}

module.exports = Fontsampler