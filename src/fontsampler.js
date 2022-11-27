/**
 * Fontsampler.js
 * 
 * A configurable standalone webfont type tester for displaying and manipulating sample text.
 * 
 * @author Johannes Neumeier <hello@underscoretype.com>
 * @copyright 2019-2021 Johannes Neumeier
 * @license GNU GPLv3
 */
var extend = require("../node_modules/extend")

var Fontloader = require("./fontloader")
var Interface = require("./ui")
var Preloader = require("./preloader")

var errors = require("./constants/errors")
var events = require("./constants/events")
var _defaults = require("./constants/defaults")

var helpers = require("./helpers/helpers")
var utils = require("./helpers/utils")
var dom = require("./helpers/dom")
var supports = require("./helpers/supports")

/**
 * The main constructor for setting up a new Fontsampler instance
 * @param Node root 
 * @param Object | null fonts 
 * @param Object | null opt 
 */
function Fontsampler(_root, _fonts, _options) {
    console.debug("Fontsampler()", _root, _fonts, _options)

    var ui, options, fonts,
        preloader = new Preloader(),
        passedInOptions = false,
        // deep clone the _defaults
        defaults = (JSON.parse(JSON.stringify(_defaults))),
        that = this

    // Make sure new instances are create with new Fontsampler
    // this will === window if Fontsampler() is used without
    // the new keyword
    if (this === window) {
        throw new Error(errors.newInit)
    }

    // At the very least confirm a valid root element to render to
    if (!_root) {
        throw new Error(errors.missingRoot + _root)
    }
    
    if (!Array.isArray(_fonts) || _fonts.length < 1) {
        throw new Error(errors.missingFonts)
    }
    this.root = _root
    this.initialized = false
    this.currentFont = false
    this.loadedFonts = []

    // Parse fonts and options from the passed in objects or possibly
    // from the root node data attributes
    options = parseOptions.call(this, _options)
    fonts = parseFonts.call(this, _fonts)
    ui = Interface(this, fonts, options)


    function parseFonts(fonts) {

        // Store each font's axes and parse instance definitions into obj form
        for (var i = 0; i < fonts.length; i++) {
            var font = fonts[i];

            if (Object.keys(font).indexOf("instance") !== -1) {
                font.instance = helpers.parseVariation(font.instance)
                font.axes = Object.keys(font.instance)
            } else {
                font.axes = []
            }
        }

        return fonts
    }

    /**
     * 
     * @param {*} opt 
     * By default:
     * - dont generate any DOM
     * - if an element is set either in ui.xxx or order is set, generate those
     * - if anything is present in the dom, validate and use those
     * ALWAYS append tester if it is not present
     */
    function parseOptions(opt) {
        var extractedOptions = false,
            nodesInDom = this.root.querySelectorAll("[data-fsjs]"),
            blocksInDom = [],
            blocksInOrder = [],
            blocksInUI = [],
            blocks = []

        // Extend or use the default options in order of:
        // defaults < options < data-options
        if ("options" in this.root.dataset) {
            try {
                extractedOptions = JSON.parse(this.root.dataset.options)
            } catch (e) {
                console.error(e)
            }
        }

        // Determine if we got any passed in options at all
        if (typeof(opt) === "object" && typeof(extractedOptions) === "object") {
            passedInOptions = extend(true, opt, extractedOptions)
        } else if (typeof(opt) === "object") {
            passedInOptions = opt
        } else if (typeof(extractedOptions) === "object") {
            passedInOptions = extractedOptions
        }

        if (typeof(passedInOptions) === "object") {
            // If any of the passed in options.config.xxx are simply "true" instead of
            // an boolean let’s copy the default values for this ui element
            // if ("ui" in passedInOptions === true) {
            //     for (var u in passedInOptions.config) {
            //         if (passedInOptions.config.hasOwnProperty(u)) {
            //             if (typeof(passedInOptions.config[u]) !== "object") {
            //                 passedInOptions.config[u] = defaults.ui[u]
            //             }
            //         }
            //     }
            // }
            // Extend the defaults
            options = extend(true, defaults, passedInOptions)
        } else {
            options = defaults
        }

        // Go through all DOM UI nodes, passed in ui ´order´ options and ´ui´ options
        // to determine what blocks are in the Fontsampler, and make sure all defined
        // blocks get rendered. "Defined" can be a combination of:
        // · block in the DOM
        // · block in options.order
        // · block in options.config
        if (nodesInDom.length > 0) {
            for (var b = 0; b < nodesInDom.length; b++) {
                blocksInDom[b] = nodesInDom[b].dataset.fsjs
            }
        }
        blocksInOrder = typeof(opt) === "object" && "order" in opt ? utils.flattenDeep(opt.order) : []
        blocksInUI = typeof(opt) === "object" && "ui" in opt ? Object.keys(opt.ui) : []
        blocks = blocksInDom.concat(blocksInOrder, blocksInUI)
        blocks = utils.arrayUnique(blocks)

        // Always make sure we are rendering at least a tester, no matter the configuration
        if (blocks.indexOf("tester") === -1) {
            blocks.push("tester")
        }

        // A passed in UI order superseeds, not extends!, the default
        if (typeof opt === "object" && "order" in opt && Array.isArray(opt.order) && opt.order.length) {
            options.order = opt.order
        } else if (
            typeof extractedOptions === "object" && "order" in extractedOptions &&
            Array.isArray(extractedOptions.order) && extractedOptions.order.length) {
            options.order = extractedOptions.order
        }

        // Then: check DOM and UI for any other present blocks and append them
        // in case they are missing
        var blocksInOrderNow = utils.flattenDeep(options.order)
        for (var i = 0; i < blocks.length; i++) {
            if (blocksInOrderNow.indexOf(blocks[i]) === -1) {
                options.order.push(blocks[i])
            }
        }

        return options
    }

    // Setup the interface listeners and delegate events back to the interface
    function setupUIEvents() {

        // checkbox
        this.root.addEventListener(events.opentypeChanged, function() {
            var val = ui.getOpentype()
            ui.setInputOpentype(val)
        })

        // dropdowns
        var that = this
        this.root.addEventListener(events.fontChanged, function(e) {
            if (e.detail.font) {
                if (typeof(this.currentFont) === "undefined") {
                    that.showFont(e.detail.font)
                }
            }
        })
    }

    /**
     * Encapuslation for what should happen on a font switch, either
     * after the font has loaded or after the already current font
     * has received this update (e.g. dropdown select of a variable
     * font instance)
     */
    function initFont(fontface) {
        that.currentFont.fontface = fontface

        ui.setStatusClass(options.classes.loadingClass, false)

        // Update the css font family
        var family = fontface.family
        if ("fallback" in that.currentFont) {
            family += "," + that.currentFont.fallback
        }
        ui.setInputCss("fontFamily", family)

        // Update active axes and set variation of this instance
        ui.setActiveAxes(that.currentFont.axes)
        if ("instance" in that.currentFont === true) {
            for (var tag in that.currentFont.instance) {
                ui.setValue(tag, that.currentFont.instance[tag])
            }
        }

        // Update available OT features for this font
        ui.setActiveOpentype(that.currentFont.features)

        // Update the currently select language if the font defines one
        if (typeof(that.currentFont.language) === "string") {
            ui.setActiveLanguage(that.currentFont.language)
        }

        ui.setActiveFont(that.currentFont.name)

        preloader.resume()

        // Set the is-instance or is-static class on the root
        dom.nodeRemoveClass(that.root, "is-instance")
        dom.nodeRemoveClass(that.root, "is-static")
        dom.nodeAddClass(that.root, !!that.currentFont.instance ? "is-instance": "is-static")
        _root.dispatchEvent(new CustomEvent(events.fontRendered, {
            detail: {
                fontsampler: that
            }
        }))

    }

    /**
     * PUBLIC API
     */

    this.init = function() {
        console.debug("Fontsampler.init()", this, this.root)

        var that = this,
            initialFont = 0;

        if ("fontfamily" in options.config &&
            "init" in options.config.fontfamily === true &&
            typeof(options.config.fontfamily.init) === "string" &&
            options.config.fontfamily.init !== "") {

            initialFont = options.config.fontfamily.init
        } else {
            // If the initial font was not set explicity and we have variable
            // axes, then their init values should be set once the font has
            // loaded
            var axesInits = {}
            for (var key in options.config) {
                if (ui.isAxisKey(key) && "init" in options.config[key]) {
                    axesInits[key] = options.config[key].init
                }
            }
            if (axesInits !== {}) {
                function setAxesInits() {
                    for (var axis in axesInits) {
                        ui.setValue(axis, axesInits[axis])
                    }
                    that.root.removeEventListener(events.fontRendered, setAxesInits)
                }
                that.root.addEventListener(events.fontRendered, setAxesInits)
            }
        }

        ui.init()
        setupUIEvents.call(this)
        this.showFont.call(this, initialFont)

        if (options.lazyload) {
            ui.setStatusClass(options.classes.preloadingClass, true)
            preloader.load(fonts, function() {
                ui.setStatusClass(options.classes.preloadingClass, false)
                _root.dispatchEvent(new CustomEvent(events.fontsPreloaded))
            })
        }

        dom.nodeAddClass(this.root, options.classes.initClass)
        dom.nodeAddClass(this.root, supports.woff2 ? "fsjs-woff2" : "fsjs-woff")
        dom.nodeAddClass(this.root, supports.variableFonts ? "fsjs-variable-fonts" : "fsjs-no-variable-fonts")

        this.root.dispatchEvent(new CustomEvent(events.init))
        this.initialized = true

        // For convenience also have the init method return the instance
        // This way you can create the object and init it, e.g.
        // var fs = new Fontsampler().init()
        return this
    }

    /**
     * The public interface for showing (and possibly loading) a font
     */
    this.showFont = function(indexOrKey) {
        console.debug("Fontsampler.showFont", indexOrKey)
        var font;

        preloader.pause()
        ui.setStatusClass(options.classes.loadingClass, true)
        ui.setStatusClass(options.classes.timeoutClass, false)

        if (typeof(indexOrKey) === "string") {
            font = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop()
            // If no font or instance of that name is found in fonts default to first
            if (!font) {
                console.warn("Fontsampler.showFont(" + indexOrKey + ") - font not found, using first font.", fonts)
                font = fonts[0]
            }
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            font = fonts[indexOrKey]
        }

        if (this.currentFont && this.currentFont.files && JSON.stringify(this.currentFont.files) === JSON.stringify(font.files)) {
            // Same font file (Variation might be different)
            // Skip straight to "fontLoaded" procedure, but retain the fontface
            // of the currentFont
            font.fontface = this.currentFont.fontface
            this.currentFont = font
            initFont(this.currentFont.fontface)

        } else {
            // Load a new font file
            this.currentFont = font

            // The actual font load
            Fontloader.fromFiles(font.files, function(fontface) {
                var fjson = JSON.stringify(fontface)

                if (that.loadedFonts.indexOf(fjson) === -1) {
                    that.loadedFonts.push(fjson)
                    _root.dispatchEvent(new CustomEvent(events.fontLoaded, { detail: fontface }))
                }

                initFont(fontface)
            }, function( /* fontface */ ) {
                ui.setStatusClass(options.classes.loadingClass, false)
                ui.setStatusClass(options.classes.timeoutClass, true)
                that.currentFont = false
            }, options.timeout)
        }
    }

    this.setText = function(text) {
        ui.setInputText(text)
    }

    this.getValue = function(key) {
        return ui.getValue(key)
    }

    this.setValue = function(key, value) {
        return ui.setValue(key, value)
    }

    this.setLabel = function(key, value) {
        return ui.setLabelValue(key, value)
    }

    this.addEventListener = function(event, listener) {
        this.root.addEventListener(event, listener)
    }

    return this
}

module.exports = Fontsampler