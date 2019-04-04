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
var events = require("./events")
var helpers = require("./helpers")

function Fontsampler(root, fonts, opt) {

    console.debug("Fontsampler()", root, fonts, opt, this)

    if (this === window) {
        throw new Error(errors.newInit)
    }

    var extractedFonts,
        interface,
        preloader = new Preloader(),
        defaults
        
    this.initialized = false
    
    // Check for a root element to render to
    if (!root) {
        throw new Error(errors.missingRoot + root)
    }

    // A minimal default setup requiring only passed in font(s) and not generating any
    // interface elements except a tester input
    defaults = {
        initialText: "",
        multiline: true,
        lazyload: false,
        generate: false,
        rootClass: "fontsampler",
        loadingClass: "loading",
        preloadingClass: "preloading",
        wrapperClass: "fontsampler-ui-wrapper",
        labelTextClass: "fontsampler-label-text",
        labelValueClass: "fontsampler-label-value",
        labelUnitClass: "fontsampler-label-unit",
        elementClass: "fontsampler-ui",
        order: [
            ["fontsize", "lineheight", "letterspacing"],
            ["fontfamily", "language"],
            ["alignment", "direction", "opentype"], 
            "tester"
        ],
        ui: {
            tester: {
                editable: true
            },
            fontfamily: {
                label: "Font"
            },
            fontsize: {
                unit: "px",
                init: 36,
                min: 8,
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
                min: -0.1,
                max: 0.1,
                step: 0.01,
                label: "Letterspacing"
            },
            alignment: {
                choices: ["left|Left", "center|Centered", "right|Right"],
                init: "left",
                label: "Alignment"
            },
            direction: {
                choices: ["ltr|Left to right", "rtl|Right to left"],
                init: "ltr",
                label: "Direction"
            },
            language: {
                choices: ["enGB|English", "deDe|Deutsch", "nlNL|Dutch"],
                init: "enGb",
                label: "Language"
            },
            opentype: {
                choices: ["liga|Ligatures", "frac|Fractions"],
                init: ["liga"],
                label: "Opentype features"
            }
        }
    }

    this.root = root

    // defaults.ui.fontsize.render = false if not passed in
    // etc.
    for (var key in defaults.ui) {
        if (opt && "generate" in opt) {
            defaults.ui[key].render = opt.generate
        } else {
            defaults.ui[key].render = !!(opt && opt.ui && key in opt.ui)
        }
    }
    // Always render a tester by default!
    defaults.ui.tester.render = true

    // Extend or use the default options
    if (typeof opt === "object") {
        options = extend(true, defaults, opt)
    } else {
        options = defaults
    }

    // A passed in UI order superseeds, not extends!, the default
    if (typeof opt === "object" && "order" in opt && Array.isArray(opt.order) && opt.order.length) {
        options.order = opt.order
    }

    // Extract fonts; Look first on root element, then on select, then in
    // passed in fonts Array
    extractedFonts = extractFontsFromDOM()
    if ((!fonts || fonts.length < 1) && extractedFonts) {
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

    // Setup the interface listeners and delegate events back to the interface
    function setupUIEvents() {
        // sliders
        this.root.addEventListener("fontsampler.onfontsizechanged", function() {
            var val = interface.getCSSValue("fontsize")
            interface.setInputCss(interface.getCssAttrForKey("fontsize"), val)
        })
        this.root.addEventListener("fontsampler.onlineheightchanged", function() {
            var val = interface.getCSSValue("lineheight")
            interface.setInputCss(interface.getCssAttrForKey("lineheight"), val)
        })
        this.root.addEventListener("fontsampler.onletterspacingchanged", function() {
            var val = interface.getCSSValue("letterspacing")
            interface.setInputCss(interface.getCssAttrForKey("letterspacing"), val)
        })

        // checkbox
        this.root.addEventListener("fontsampler.onopentypechanged", function() {
            var val = interface.getOpentype()
            interface.setInputOpentype(val)
        })

        // dropdowns
        this.root.addEventListener("fontsampler.onfontfamilychanged", function() {
            var val = interface.getValue("fontfamily")
            loadFont(val)
        })
        this.root.addEventListener("fontsampler.onlanguagechanged", function() {
            var val = interface.getValue("language")
            interface.setInputAttr("lang", val)
        })

        // buttongroups
        this.root.addEventListener("fontsampler.onalignmentclicked", function() {
            var val = interface.getButtongroupValue("alignment")
            interface.setInputCss("textAlign", val)
        })
        this.root.addEventListener("fontsampler.ondirectionclicked", function() {
            var val = interface.getButtongroupValue("direction")
            interface.setInputAttr("dir", val)
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

    function extractFontsFromDOM() {
        var select = root.querySelector("[data-property='fontfamily']"),
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
            console.log("return single font", singleFont)
            return [singleFont]
        }

        return false
    }

    function loadFont(indexOrKey) {
        console.debug("Fontsampler.loadFont", indexOrKey)

        preloader.pause()

        interface.setStatusClass(options.loadingClass, true)
        files = []
        if (typeof(indexOrKey) === "string") {
            files = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop().files
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            files = fonts[indexOrKey].files
        }

        Fontloader.fromFiles(files, function(f) {
            interface.setInputCss("fontFamily", f.family)
            interface.setStatusClass(options.loadingClass, false)

            preloader.resume()
        })
    }

    /**
     * PUBLIC API
     */

    this.init = function() {
        console.debug("Fontsampler.init()", this, this.root)
        interface.init()
        setupUIEvents.call(this)
        loadFont(0)

        if (options.lazyload) {
            interface.setStatusClass(options.preloadingClass, true)
            preloader.load(fonts, function() {
                interface.setStatusClass(options.preloadingClass, false)
            })
        }

        this.initalized = true
        root.className = helpers.addClass("fontsampler-initialized", root.className)


        root.dispatchEvent(new CustomEvent(events.init))

        // For convenience also have the init method return the instance
        // This way you can create the object and init it, e.g.
        // var fs = new Fontsampler().init()
        return this
    }

    this.lazyload = function() {
        if (this.initialized && fonts) {
            preloader.load(fonts)
        }
    }

    this.registerEventhandler = function(event, callback) {
        // Validate that only fontsampler.events.… are passed in
        if (Object.values(events).indexOf(event) === -1) {
            throw new Error(errors.invalidEvent)
        }

        // Only act if there is a valid callback
        if (typeof(callback) === "function") {
            root.addEventListener(event, callback)
        }
    }

    this.setText = function (text) {
        interface.setInputText(text)
    }

    return this
}

module.exports = Fontsampler