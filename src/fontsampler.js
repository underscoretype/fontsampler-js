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
var errors = require("./errors")

function Fontsampler(root, fonts, opt) {

    console.debug("Fontsampler()", root, fonts, opt)

    // Check for a root element to render to
    if (!root) {
        throw new Error(errors.missingRoot + root)
    }

    // A minimal default setup requiring only passed in font(s) and not generating any
    // interface elements except a tester input
    var defaults = {
        initialText: "",
        wrapUIElements: true,
        order: [["fontsize", "lineheight", "letterspacing", "fontfamily"], "tester"],
        tester: {
            editable: true
        },
        fontsize: {
            unit: "px",
            init: 18,
            min: 12,
            max: 96,
            step: 1,
            label: "Size"
        },
        lineheight: {
            unit: "%",
            init: 100,
            min: 60,
            max: 120,
            step: 5,
            label: "Leading"
        },
        letterspacing: {
            unit: "em",
            init: 0,
            min: -1,
            max: 1,
            step: 0.05,
            label: "Letterspacing"
        },
        fontfamily: {
            label: "Font"
        }
    }

    // defaults.fontsize.generate = false if not passed in
    // etc.

    // Extend or use the default options
    if (typeof opt === "object") {
        options = extend(true, defaults, opt)
    } else {
        options = defaults
    }

    var extractedFonts = extractFontsFromDOM()
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

    var interface = Interface(root, fonts, options)

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

        root.addEventListener("fontsampler.ontesterchanged", function() {
            // var val = interface.getValue("fontfamily")
            // loadFont(val)
            console.log("typing")
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

        if (!select) {
            return false
        }

        options = select.querySelectorAll("option")

        for (i = 0; i < options.length; i++) {
            var opt = options[i],
                font = {}

            font.name = opt.getAttribute("value")
            font.files = []
            if (opt.dataset.woff) {
                font.files.push(opt.dataset.woff)
            }
            if (opt.dataset.woff2) {
                font.files.push(opt.dataset.woff2)
            }

            if (font.name && font.files.length > 0) {
                fonts.push(font)
            }
        }

        return fonts
    }

    function loadFont(indexOrKey) {
        console.debug("Fontsampler.loadFont", indexOrKey)
        files = []
        if (typeof(indexOrKey) === "string") {
            files = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop().files
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            files = fonts[indexOrKey].files
        }

        Fontloader.fromFiles(files, function(f) {
            interface.setInput("fontFamily", f.family)
        })
    }

    function init() {
        console.debug("Fontsampler.init()")
        interface.init()
        addEventListeners()
        loadFont(0)
    }

    // interface
    return {
        init: init
    }
}

// console.log(Fontsampler, Fontsampler(null, null, null))

module.exports = Fontsampler