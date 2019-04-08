/**
 * Fontsampler.js
 * 
 * A configurable standalone webfont type tester for displaying and manipulating sample text.
 * 
 * @author Johannes Neumeier <hello@underscoretype.com>
 * @copyright 2019 Johannes Neumeier
 * @license GNU GPLv3
 */
var extend = require("../node_modules/extend")

var Fontloader = require("./fontloader")
var Interface = require("./ui")
var Preloader = require("./preloader")
var helpers = require("./helpers")

var errors = require("./errors")
var events = require("./events")
var _defaults = require("./defaults")

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
        defaults = (JSON.parse(JSON.stringify(_defaults))) 

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
    this.root = _root
    this.initialized = false

    // Parse fonts and options from the passed in objects or possibly
    // from the root node data attributes
    options = parseOptions.call(this, _options)
    fonts = parseFonts.call(this, _fonts)

    // options.generate = true
    ui = Interface(this.root, fonts, options)

    function parseFonts(fonts) {
        var extractedFonts = extractFontsFromDOM.call(this)

        // Extract fonts; Look first on root element, then on select, then in
        // passed in fonts Array
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
            // If any of the passed in options.ui.xxx are simply "true" instead of
            // an boolean let’s copy the default values for this ui element
            if ("ui" in passedInOptions === true) {
                for (var u in passedInOptions.ui) {
                    if (passedInOptions.ui.hasOwnProperty(u)) {
                        if (typeof(passedInOptions.ui[u]) !== "object") {
                            passedInOptions.ui[u] = defaults.ui[u]
                        }
                    }
                }
            }
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
        // · block in options.ui
        if (nodesInDom.length > 0) {
            for (var b = 0; b < nodesInDom.length; b++) {
                blocksInDom[b] = nodesInDom[b].dataset.fsjs
            }
        }
        blocksInOrder = typeof(opt) === "object" && "order" in opt ? helpers.flattenDeep(opt.order) : []
        blocksInUI = typeof(opt) === "object" && "ui" in opt ? Object.keys(opt.ui) : []
        blocks = blocksInDom.concat(blocksInOrder, blocksInUI)
        blocks = helpers.arrayUnique(blocks)

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
        var blocksInOrderNow = helpers.flattenDeep(options.order)
        for (var i = 0; i < blocks.length; i++) {
            if (blocksInOrderNow.indexOf(blocks[i]) === -1) {
                options.order.push(blocks[i])
            }
        }

        return options
    }

    // Setup the interface listeners and delegate events back to the interface
    function setupUIEvents() {
        // sliders
        this.root.addEventListener("fontsampler.onfontsizechanged", function() {
            var val = ui.getCssValue("fontsize")
            ui.setInputCss(ui.getCssAttrForKey("fontsize"), val)
        })
        this.root.addEventListener("fontsampler.onlineheightchanged", function() {
            var val = ui.getCssValue("lineheight")
            ui.setInputCss(ui.getCssAttrForKey("lineheight"), val)
        })
        this.root.addEventListener("fontsampler.onletterspacingchanged", function() {
            var val = ui.getCssValue("letterspacing")
            ui.setInputCss(ui.getCssAttrForKey("letterspacing"), val)
        })

        // checkbox
        this.root.addEventListener("fontsampler.onopentypechanged", function() {
            var val = ui.getOpentype()
            ui.setInputOpentype(val)
        })

        // dropdowns
        this.root.addEventListener("fontsampler.onfontfamilychanged", function() {
            var val = ui.getValue("fontfamily")
            loadFont(val)
        })
        this.root.addEventListener("fontsampler.onlanguagechanged", function() {
            var val = ui.getValue("language")
            ui.setInputAttr("lang", val)
        })

        // buttongroups
        this.root.addEventListener("fontsampler.onalignmentchanged", function() {
            var val = ui.getButtongroupValue("alignment")
            ui.setInputCss("textAlign", val)
        })
        this.root.addEventListener("fontsampler.ondirectionchanged", function() {
            var val = ui.getButtongroupValue("direction")
            ui.setInputAttr("dir", val)
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
        var select = this.root.querySelector("[data-fsjs='fontfamily']"),
            options = [],
            fonts = []

        // First try to get data-fonts or data-woff/2 on the root element
        // If such are found, return them
        var rootFonts = extractFontsFromNode(this.root, true)
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
            console.log("looping options")
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

    function loadFont(indexOrKey) {
        console.debug("Fontsampler.loadFont", indexOrKey)

        preloader.pause()

        ui.setStatusClass(options.loadingClass, true)
        files = []
        if (typeof(indexOrKey) === "string") {
            files = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop().files
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            files = fonts[indexOrKey].files
        }

        Fontloader.fromFiles(files, function(f) {
            ui.setInputCss("fontFamily", f.family)
            ui.setStatusClass(options.loadingClass, false)

            preloader.resume()
        })
    }

    /**
     * PUBLIC API
     */

    this.init = function() {
        console.debug("Fontsampler.init()", this, this.root)
        ui.init()
        setupUIEvents.call(this)
        loadFont(0)

        if (options.lazyload) {
            ui.setStatusClass(options.preloadingClass, true)
            preloader.load(fonts, function() {
                ui.setStatusClass(options.preloadingClass, false)
            })
        }

        this.initalized = true
        helpers.nodeAddClass(this.root, options.classes.initClass)

        this.root.dispatchEvent(new CustomEvent(events.init))

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
            this.root.addEventListener(event, callback)
        }
    }

    this.setText = function(text) {
        ui.setInputText(text)
    }

    return this
}

module.exports = Fontsampler