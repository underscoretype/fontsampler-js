(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fontsampler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],2:[function(_dereq_,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],3:[function(_dereq_,module,exports){
// A minimal default setup requiring only passed in font(s) and not generating any
// interface elements except a tester input
module.exports = {
    initialText: "",
    multiline: true,
    lazyload: false,
    generate: false,
    classes: {
        rootClass: "fontsamplerjs",
        initClass: "fsjs-initialized",
        loadingClass: "fsjs-loading",
        preloadingClass: "fsjs-preloading",
        wrapperClass: "fsjs-wrapper",
        blockClass: "fsjs-block",
        elementClass: "fsjs-element",
        labelClass: "fsjs-label",
        labelTextClass: "fsjs-label-text",
        labelValueClass: "fsjs-label-value",
        labelUnitClass: "fsjs-label-unit",
        buttonClass: "fsjs-button",
        buttonSelectedClass: "fsjs-button-selected",
        disabledClass: "fsjs-disabled",
    },
    order: [
        // ["fontsize", "lineheight", "letterspacing"],
        // ["fontfamily", "language"],
        // ["alignment", "direction", "opentype"],
        "tester"
    ],
    ui: {
        tester: {
            editable: true,
            label: false,
            render: true,
        },
        fontfamily: {
            label: "Font",
            init: "",
            render: true,
        },
        fontsize: {
            unit: "px",
            init: 36,
            min: 8,
            max: 96,
            step: 1,
            label: "Size",
            render: true,
        },
        lineheight: {
            unit: "%",
            init: 100,
            min: 60,
            max: 120,
            step: 5,
            label: "Leading",
            render: true,
        },
        letterspacing: {
            unit: "em",
            init: 0,
            min: -0.1,
            max: 0.1,
            step: 0.01,
            label: "Letterspacing",
            render: true,
        },
        alignment: {
            choices: ["left|Left", "center|Centered", "right|Right"],
            init: "left",
            label: "Alignment",
            render: true,
        },
        direction: {
            choices: ["ltr|Left to right", "rtl|Right to left"],
            init: "ltr",
            label: "Direction",
            render: true,
        },
        language: {
            choices: ["en-GB|English", "de-De|Deutsch", "nl-NL|Dutch"],
            init: "en-Gb",
            label: "Language",
            render: true,
        },
        opentype: {
            choices: ["liga|Ligatures", "frac|Fractions"],
            init: ["liga"],
            label: "Opentype features",
            render: true,
        },
        variation: {
            axes: [],
            render: true
        }
    }
}

},{}],4:[function(_dereq_,module,exports){

module.exports = {
    "noFonts": "Fontsampler: No fonts were passed in.",
    "initFontFormatting": "Fontsampler: Passed in fonts are not in expected format. Expected [ { name: 'Font Name', files: [ 'fontfile.woff', 'fontfile.woff2' ] }, … ]",
    "fileNotfound": "Fontsampler: The passed in file could not be loaded.",
    "missingRoot": "Fontsampler: Passed in root element invalid: ",
    "tooManyFiles": "Fontsampler: Supplied more than one woff or woff2 for a font: ",
    "invalidUIItem": "Fontsampler: The supplied UI item is not supported: ",
    "invalidEvent": "Fontsampler: Invalid event type. You can only register Fontsampler events on the Fontsampler instance.",
    "newInit": "Fontsampler: Instantiated Fontsampler without 'new' keyword. Create Fontsamplers using new Fontsampler(…)",
    "dataFontsJsonInvalid": "Fontsampler: The data-fonts JSON failed to parse.",
    "invalidDOMOptions": "Fontsampler: Could not parse data-options on Fontsampler root node. Make sure it is valid JSON and follows the default options structure.",
    "invalidVariation": "Fontsampler: Invalid variation instance values"
}

},{}],5:[function(_dereq_,module,exports){

module.exports = {
    "init": "fontsampler.events.init",
    "languageChanged": "fontsampler.events.languagechanged",
    "fontChanged": "fontsampler.events.fontchanged",
    "fontLoaded": "fontsampler.events.fontloaded",
    "fontRendered": "fontsampler.events.fontrendered",
    "fontsPreloaded": "fontsampler.events.fontspreloaded",
    "valueChanged": "fontsampler.events.valuechanged",
    "opentypeChanged": "fontsampler.events.opentypechanged",
}

},{}],6:[function(_dereq_,module,exports){
var FontFaceObserver = _dereq_("../node_modules/fontfaceobserver/fontfaceobserver.standalone")

var errors = _dereq_("./errors")

// supportsWoff2 manually copied from npm woff2-feature-test
var supportsWoff2 = function() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
}

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

    if (woff2s.length > 0 && supportsWoff2()) {
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
    }).catch(function (e) {
        console.error(font, file, e)
        console.error(new Error(errors.fileNotfound))
    })
    
    if ("FontFace" in window) {
        var ff = new FontFace(family, "url(" + file + ")", {})
        ff.load().then(function() {
            document.fonts.add(ff)
        }).catch(function(e) {
            console.error(font, file, e)
            console.error(new Error(errors.fileNotfound))
        })
    } else {
        var newStyle = document.createElement("style");
        newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
        document.head.appendChild(newStyle);
    }
}

function fromFiles(files, callback) {
    font = bestWoff(files)
    loadFont(font, callback)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles,
    "supportsWoff2": supportsWoff2,
    "bestWoff": bestWoff
}
},{"../node_modules/fontfaceobserver/fontfaceobserver.standalone":2,"./errors":4}],7:[function(_dereq_,module,exports){
/**
 * Fontsampler.js
 * 
 * A configurable standalone webfont type tester for displaying and manipulating sample text.
 * 
 * @author Johannes Neumeier <hello@underscoretype.com>
 * @copyright 2019 Johannes Neumeier
 * @license GNU GPLv3
 */
var extend = _dereq_("../node_modules/extend")

var Fontloader = _dereq_("./fontloader")
var Interface = _dereq_("./ui")
var Preloader = _dereq_("./preloader")
var helpers = _dereq_("./helpers")

var errors = _dereq_("./errors")
var events = _dereq_("./events")
var _defaults = _dereq_("./defaults")

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
    this.currentFont = false

    // Parse fonts and options from the passed in objects or possibly
    // from the root node data attributes
    options = parseOptions.call(this, _options)
    fonts = parseFonts.call(this, _fonts)
    fonts = parseFontInstances.call(this, fonts)

    ui = Interface(this.root, fonts, options)

    function parseFontInstances(fonts) {
        var parsed = []

        for (var f = 0; f < fonts.length; f++) {
            var font = fonts[f],
                bestWoff = Fontloader.bestWoff(font.files)

            if ("instances" in font === true && Array.isArray(font.instances)) {

                if (bestWoff === false || bestWoff.substr(-4) === "woff" || !Fontloader.supportsWoff2()) {
                    // no point in registering instances as fonts with no variable font support
                    font.axes = []
                    font.instances = []
                    parsed.push(font)

                    continue
                }

                for (var v = 0; v < font.instances.length; v++) {
                    var parts = helpers.parseParts(font.instances[v])
                    axes = parts.val.split(",").map(function(value /*, index*/ ) {
                        var parts = value.trim().split(" ")
                        return parts[0]
                    })
                    if ("axes" in font === true) {
                        axes = helpers.arrayUnique(axes.concat(font.axes))
                    }
                    parsed.push({
                        name: parts.text,
                        files: font.files,
                        instance: parts.val,
                        axes: axes,
                        language: font.language,
                        features: font.features
                    })
                }
            } else {
                font.axes = font.axes ? font.axes : []
                parsed.push(font)
            }
        }

        return parsed
    }

    function parseFontVariations(font) {
        var va = {}, parts 
        
        if ("instance" in font === false) {
            return va
        }

        parts = font.instance.split(",")
        for (var p = 0; p < parts.length; p++) {
            var split = parts[p].trim().split(" ")
            va[split[0]] = split[1]
            var input = _root.querySelector("[data-axis='" + split[0] + "']")
            if (input) {
                input.value = split[1]
                ui.sendNativeEvent("change", input)
            }
            ui.setLabelValue(split[0], split[1])
        }

        return va
    }

    function parseFonts(fonts) {
        var extractedFonts = helpers.extractFontsFromDOM(this.root)

        // Extract fonts; Look first on root element, then on select, then in
        // passed in fonts Array
        if ((!fonts || fonts.length < 1) && extractedFonts) {
            fonts = extractedFonts
        }
        if (!fonts) {
            throw new Error(errors.noFonts)
        }
        if (!helpers.validateFontsFormatting(fonts)) {
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
                for (var u in passedInOptions.ui) {
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

        // checkbox
        this.root.addEventListener(events.opentypeChanged, function() {
            var val = ui.getOpentype()
            ui.setInputOpentype(val)
        })

        // dropdowns
        var that = this
        this.root.addEventListener(events.fontChanged, function(e) {
            if (e.detail.font) {
                that.showFont(e.detail.font)
            }
        })
    }

    /**
     * PUBLIC API
     */

    this.init = function() {
        console.debug("Fontsampler.init()", this, this.root)

        var initialFont = 0
        if ("init" in options.ui.fontfamily === true &&
            typeof(options.ui.fontfamily.init) === "string" &&
            options.ui.fontfamily.init !== "") {
            initialFont = options.ui.fontfamily.init
        }
        ui.init()
        setupUIEvents.call(this)
        this.showFont.call(this, initialFont)

        if (options.lazyload) {
            ui.setStatusClass(options.preloadingClass, true)
            preloader.load(fonts, function() {
                ui.setStatusClass(options.preloadingClass, false)
                _root.dispatchEvent(new CustomEvent(events.fontsPreloaded))
            })
        }

        helpers.nodeAddClass(this.root, options.classes.initClass)
        helpers.nodeAddClass(this.root, Fontloader.supportsWoff2() ? "fsjs-woff2" : "fsjs-woff")

        this.root.dispatchEvent(new CustomEvent(events.init))
        this.initialized = true

        // For convenience also have the init method return the instance
        // This way you can create the object and init it, e.g.
        // var fs = new Fontsampler().init()
        return this
    }

    this.showFont = function(indexOrKey) {
        console.debug("Fontsampler.showFont", indexOrKey, this)
        var font, changed = true

        preloader.pause()
        ui.setStatusClass(options.classes.loadingClass, true)

        if (typeof(indexOrKey) === "string") {
            font = fonts.filter(function(value, index) {
                return fonts[index].name === indexOrKey
            }).pop()
            // If no font or instance of that name is found in fonts default to first
            if (!font) {
                font = fonts[0]
            }
        } else if (typeof(indexOrKey) === "number" && indexOrKey >= 0 && indexOrKey <= fonts.length) {
            font = fonts[indexOrKey]
        }

        changed = this.currentFont !== font
        this.currentFont = font

        // The actual font update
        Fontloader.fromFiles(font.files, function(f) {
            ui.setStatusClass(options.classes.loadingClass, false)

            // Update the css font family
            ui.setInputCss("fontFamily", f.family)

            // Update active axes and set variation of this instance
            ui.setActiveAxes(font.axes)
            if ("instance" in font === true) {
                var va = parseFontVariations(font)
                ui.setInputVariation(va)
            }

            // Update available OT features for this font
            ui.setActiveOpentype(font.features)

            // Update the currently select language if the font defines one
            if (typeof(font.language) === "string") {
                ui.setActiveLanguage(font.language)
            }

            ui.setActiveFont(font.name)
            
            preloader.resume()

            if (changed) {
                _root.dispatchEvent(new CustomEvent(events.fontLoaded))
            }
            _root.dispatchEvent(new CustomEvent(events.fontRendered))

        })
    }


    this.lazyload = function() {
        if (this.initialized && fonts) {
            preloader.load(fonts)
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

    return this
}

module.exports = Fontsampler
},{"../node_modules/extend":1,"./defaults":3,"./errors":4,"./events":5,"./fontloader":6,"./helpers":8,"./preloader":9,"./ui":11}],8:[function(_dereq_,module,exports){
function pruneClass(className, classNames) {
    if (!classNames) {
        return ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex !== -1) {
        classes.splice(classIndex, 1)
    }

    if (classes.length > 0) {
        return classes.join(" ")
    } else {
        return ""
    }
}

/**
 * 
 * @param str className 
 * @param str classNames - space separated
 */
function addClass(className, classNames) {
    if (!classNames) {
        classNames = ""
    }

    if (className === classNames) {
        return classNames
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex === -1) {
        if (classNames) {
            return classNames + " " + className
        } else {
            return className
        }
    } else {
        return classNames
    }
}

function nodeAddClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = addClass(className, node.className)

    return true
}

function nodeAddClasses(node, classes) {
    if (!isNode(node) || !Array.isArray(classes) || classes.length < 1) {
        return false
    }

    for (var c = 0; c < classes.length; c++) {
        node.className = addClass(classes[c], node.className)
    }

    return true
}

function nodeRemoveClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = pruneClass(className, node.className)

    return true
}

/**
 * Really just an approximation of a check
 * 
 * @param {*} node 
 */
function isNode(node) {
    return typeof(node) === "object" && node !== null && "nodeType" in node
}

/**
 * flatten an array recursively from https://stackoverflow.com/a/42916843/999162
 * @method flattenDeep
 * @param array {Array}
 * @return {Array} flatten array
 */
function flattenDeep(array) {
    return array.reduce(function (acc, current) {
        return Array.isArray(current) ? acc.concat(flattenDeep(current)) : acc.concat([current]);
    }, []);
}

function arrayUnique(a) {
    if (!Array.isArray(a)) {
        return false
    }
    return a.filter(function(value, index, self) {
        return self.indexOf(value) === index
    }, a)
}



/**
 * Check fonts are passed in with correct structure, e.g.
 * fonts: [ { "Font Name" : [ "fontfile.woff", "fontfile.woff2" ] } ]
 * 
 * TODO: Check that at most only one woff and one woff2 is passed in
 * TODO: Check in passed in axes axes are defined
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

function extractFontsFromDOM(root) {
    var select = root.querySelector("[data-fsjs='fontfamily']"),
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
        return [singleFont]
    }

    return false
}



/**
 * Split an input choice into value and text or return only the value as 
 * both if no separator is used to provide a readable label
 * e.g. "ltr|Left" to right becomes { val: "ltr", text: "Left to right"}
 * but: "left" becomes { val: "left", text: "left"}
 * @param string choice 
 * @return obj {val, text}
 */
function parseParts(choice) {
    var parts, val, text

    if (choice.indexOf("|") !== -1) {
        parts = choice.split("|")
        val = parts[0]
        text = parts[1]
    } else {
        val = choice
        text = choice
    }

    return {
        val: val,
        text: text
    }
}

/**
 * Number clamp to min—max with fallback for when any input value is not a number
 * @param {*} value 
 * @param {*} min 
 * @param {*} max 
 * @param {*} fallback 
 */
function clamp(value, min, max, fallback) {    
    value = parseFloat(value)
    min = parseFloat(min)
    max = parseFloat(max)
    
    if (isNaN(value) || isNaN(min) || isNaN(max)) {
        if (typeof(fallback) !== "undefined") {
            value = fallback
        } else {
            return value
        }
    } 
    
    if (value < min) {
        value = min
    } else if (value > max) {
        value = max
    }

    return value
}

module.exports = {
    nodeAddClass: nodeAddClass,
    nodeAddClasses: nodeAddClasses,
    nodeRemoveClass: nodeRemoveClass,
    isNode: isNode,

    flattenDeep: flattenDeep,
    arrayUnique: arrayUnique,
    parseParts: parseParts,
    clamp: clamp,

    validateFontsFormatting: validateFontsFormatting,
    extractFontsFromDOM: extractFontsFromDOM,
}
},{}],9:[function(_dereq_,module,exports){
var Fontloader = _dereq_("./fontloader")

function Preloader() {

    var queue = [],
        autoload = true,
        finishedCallback = null

    function load(fonts, callback) {

        // clone the fonts array
        queue = fonts.slice(0)
        autoload = true

        if (typeof(callback) === "function") {
            finishedCallback = callback
        }

        loadNext()
    }

    function pause() {
        autoload = false
    }

    function resume() {
        autoload = true
        if (queue.length > 0) {
            loadNext()
        } else {
            if (finishedCallback) {
                finishedCallback()
            }
        }
    }

    function loadNext() {
        if (queue.length > 0 && autoload) {
            Fontloader.fromFiles(queue[0].files, function () {
                queue.shift()

                if (queue.length === 0 && finishedCallback) {
                    finishedCallback()
                }
                
                if (queue.length > 0 && autoload) {
                    loadNext()
                }
            })
        }
    }

    return {
        load: load,
        pause: pause,
        resume: resume
    }
}


module.exports = Preloader
},{"./fontloader":6}],10:[function(_dereq_,module,exports){
/**
 * Helper module to deal with caret position
 */
function Selection () {

    // from https://stackoverflow.com/a/4812022/999162
    var setSelectionByCharacterOffsets = null;

    if (window.getSelection && document.createRange) {
        setSelectionByCharacterOffsets = function (containerEl, start, end) {
            var charIndex = 0,
                range = document.createRange();
            range.setStart(containerEl, 0);
            range.collapse(true);
            var nodeStack = [containerEl],
                node, foundStart = false,
                stop = false;

            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType == 3) {
                    var nextCharIndex = charIndex + node.length;
                    if (!foundStart && start >= charIndex && start <= nextCharIndex) {
                        range.setStart(node, start - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && end >= charIndex && end <= nextCharIndex) {
                        range.setEnd(node, end - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }

            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        };
    } else if (document.selection) {
        setSelectionByCharacterOffsets = function (containerEl, start, end) {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(containerEl);
            textRange.collapse(true);
            textRange.moveEnd("character", end);
            textRange.moveStart("character", start);
            textRange.select();
        };
    }


    // From https://stackoverflow.com/a/4812022/999162
    function getCaretCharacterOffsetWithin(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    return {
        setCaret: setSelectionByCharacterOffsets,
        getCaret: getCaretCharacterOffsetWithin
    };

}

module.exports = Selection
},{}],11:[function(_dereq_,module,exports){
/**
 * A wrapper around the Fontsampler interface
 * 
 * 
 * Generally, the DOM is structured in such a way:
 * 
 * Each nested Array in ´order´ is enclosed in a
 * 
 * .fsjs-wrapper
 * 
 * In each (optional, e.g. without Array straight output) wrapper one more more:
 * 
 *  [data-fsjs-block=_property_].fsjs-block .fsjs-block-_property_ .fsjs-block-type-_type_
 * 
 * Nested in each block a variety of sub elements:
 *      Optional label with:
 *      [data-fsjs-for=_property_].fsjs-label
 *          [data-label-text=_property_].fsjs-label-text
 *          [data-label-value=_property_].fsjs-label-value (optional)
 *          [data-label-unit=_property_].fsjs-label-unit (optional)
 * 
 *      The actual ui control (input, select, buttongroup)
 *      [data-fsjs=_property_].fsjs-element-_property_
 * 
 */
var selection = _dereq_("./selection")

var UIElements = _dereq_("./uielements")
var Fontloader = _dereq_("./fontloader")

var helpers = _dereq_("./helpers")
var errors = _dereq_("./errors")
var events = _dereq_("./events")

function UI(root, fonts, options) {

    var ui = {
            tester: "textfield",
            fontsize: "slider",
            lineheight: "slider",
            letterspacing: "slider",
            fontfamily: "dropdown",
            alignment: "buttongroup",
            direction: "buttongroup",
            language: "dropdown",
            opentype: "checkboxes",
            variation: "slidergroup"
        },
        keyToCss = {
            "fontsize": "fontSize",
            "lineheight": "lineHeight",
            "letterspacing": "letterSpacing",
            "alignment": "text-align"
        },
        blocks = {},
        uifactory = null,
        input = null,
        originalText = ""

    function init() {
        console.debug("Fontsampler.Interface.init()", root, fonts, options)

        helpers.nodeAddClass(root, options.classes.rootClass)
        uifactory = UIElements(root, options)

        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui by defining
        // the needed choices
        if (options.ui.fontfamily && typeof(options.ui.fontfamily) === "boolean") {
            options.ui.fontfamily = {}
        }
        options.ui.fontfamily.choices = fonts.map(function(value) {
            return value.name
        })

        // Before modifying the root node, detect if it is containing only
        // text, and if so, store it to the options for later use
        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // Process the possible nested arrays in order one by one
        // · Existing DOM nodes will be validated and initiated
        // · UI elements defined via options but missing from the DOM will be created
        // · UI elements defined in ui option but not in order option will be 
        //   appended in the end
        // · Items neither in the DOM nor in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var elementA = parseOrder(options.order[i])
            if (helpers.isNode(elementA) && elementA.childNodes.length > 0 && !elementA.isConnected) {
                root.appendChild(elementA)
            }
        }

        input = getElement("tester", blocks.tester)

        // after all nodes are instantiated, update the tester to reflect
        // the current state
        for (var keyC in blocks) {
            if (blocks.hasOwnProperty(keyC)) {
                initBlock(keyC)
            }
        }

        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                if (typeEvents.hasOwnProperty(e)) {
                    blocks.tester.addEventListener(typeEvents[e], onKey)
                }
            }
        }

        // prevent pasting styled content
        blocks.tester.addEventListener('paste', function(e) {
            e.preventDefault();
            var text = '';
            if (e.clipboardData || e.originalEvent.clipboardData) {
                text = (e.originalEvent || e).clipboardData.getData('text/plain');
            } else if (window.clipboardData) {
                text = window.clipboardData.getData('Text');
            }

            if (!options.multiline) {
                text = text.replace(/(?:\r\n|\r|\n|<br>)/g, ' ')
            }

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                document.execCommand('paste', false, text);
            }
        });
    }

    /**
     * Recursively go through an element in the options.order
     * @param string key
     * @param node parent
     */
    function parseOrder(key) {
        var child, wrapper

        if (typeof(key) === "string") {
            var block = parseBlock(key)

            return block
        } else if (Array.isArray(key)) {
            wrapper = document.createElement("div")
            wrapper.className = options.classes.wrapperClass

            for (var i = 0; i < key.length; i++) {
                child = parseOrder(key[i])
                if (child) {
                    wrapper.appendChild(child)
                }
            }

            if (wrapper.children.length < 1) {
                return false
            }

            return wrapper
        } else {
            // Skipping not defined UI element

            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || boolean (true = in DOM, false = invalid item)
     */
    function parseBlock(key) {
        if (key in ui === false) {
            throw new Error(errors.invalidUIItem + key)
        }

        var block = getBlock(key),
            element = false,
            label = false,
            opt = options.ui[key]

        if (block) {
            // if a block is found, try get its element and optional label
            element = getElement(key, block)
            label = getLabel(key, block)

            if (options.ui[key].label && !label) {
                // create a label if needed
                label = uifactory.label(opt.label, opt.unit, opt.init, key)
                block.appendChild(label)
                sanitizeLabel(label, key)
            } else if (label) {
                // or check the existing label
                sanitizeLabel(label, key)
            }
            if (!element) {
                // create and check the element
                element = createElement(key)
                block.appendChild(element)
                sanitizeElement(element, key)
            } else {
                // or check the existing element
                sanitizeElement(element, key)
            }

            // check the block itself
            sanitizeBlock(block, key)
            blocks[key] = block

            if (options.ui[key].render !== true) {
                blocks[key] = false
                if (block.parentNode) {
                    block.parentNode.removeChild(block)
                }
                return false
            }

            return false
        } else if (!block && (
                options.ui[key].render === true ||
                (key === "variation" && options.ui.variations.render === true)
            )) {
            // for missing blocks that should get rendered create them
            block = createBlock(key)
            blocks[key] = block

            return block
        }

        return false
    }

    function createBlock(key) {
        var block = document.createElement("div"),
            element = createElement(key),
            label = false
        opt = options.ui[key]

        if (opt.label) {
            label = uifactory.label(opt.label, opt.unit, opt.init, key)
            block.appendChild(label)
            sanitizeLabel(label, key)
        }

        block.appendChild(element)
        sanitizeElement(element, key)

        sanitizeBlock(block, key)

        return block
    }

    function createElement(key) {
        var element = uifactory[ui[key]](key, options.ui[key])
        sanitizeElement(element, key)

        return element
    }

    function sanitizeBlock(block, key) {
        var classes = [
            options.classes.blockClass,
            options.classes.blockClass + "-" + key,
            options.classes.blockClass + "-type-" + ui[key]
        ]

        helpers.nodeAddClasses(block, classes)
        block.dataset.fsjsBlock = key
    }

    function sanitizeElement(element, key) {
        element = uifactory[ui[key]](key, options.ui[key], element)

        helpers.nodeAddClass(element, options.classes.elementClass)
        element.dataset.fsjs = key
        element.dataset.fsjsUi = ui[key]
    }

    function sanitizeLabel(label, key) {
        var text = label.querySelector("." + options.classes.labelTextClass),
            value = label.querySelector("." + options.classes.labelValueClass),
            unit = label.querySelector("." + options.classes.labelUnitClass),
            element = getElement(key)

        if (helpers.isNode(text) && text.textContent === "") {
            text.textContent = options.ui[key].label
        }

        if (helpers.isNode(value) && ["slider"].indexOf(ui[key]) === -1) {
            value.textContent = ""
        }

        if (helpers.isNode(value) && value && value.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            value.textContent = element.value
        }

        if (helpers.isNode(unit) && unit && unit.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            unit.textContent = element.dataset.unit
        }

        helpers.nodeAddClass(label, options.classes.labelClass)
        label.dataset.fsjsFor = key
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initBlock(key) {
        // TODO set values if passed in and different on node
        var block = getBlock(key),
            element = getElement(key, block),
            type = ui[key],
            opt = options.ui[key]

        if (!block) {
            return
        }

        if (type === "slider") {
            element.addEventListener("change", onSlide)
            setValue(key, opt.init)
        } else if (type === "dropdown") {
            element.addEventListener("change", onChange)
            setValue(key, opt.init)
            // TODO init values to tester
        } else if (type === "buttongroup") {
            var buttons = element.querySelectorAll("[data-choice]")

            if (buttons.length > 0) {
                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].addEventListener("click", onClick)
                    if (buttons[b].dataset.choice === options.ui[key].init) {
                        helpers.nodeAddClass(buttons[b], options.classes.buttonSelectedClass)
                    } else {
                        helpers.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
                    }
                }
            }
            setValue(key, options.ui[key].init)
        } else if (type === "checkboxes") {
            // currently only opentype feature checkboxes
            var checkboxes = element.querySelectorAll("[data-feature]")
            if (checkboxes.length > 0) {
                var features = {}
                for (var c = 0; c < checkboxes.length; c++) {
                    var checkbox = checkboxes[c]
                    checkbox.addEventListener("change", onCheck)
                    if ("features" in checkbox.dataset) {
                        features[checkbox.dataset.features] = checkbox.checked ? "1" : "0"
                    }
                }
                setInputOpentype(features)
            }
        } else if (type === "slidergroup") {
            // currently only variable font slider group
            var nestedSliders = element.querySelectorAll("[data-fsjs-ui='slider']")
            if (nestedSliders && nestedSliders.length > 0) {
                for (var a = 0; a < nestedSliders.length; a++) {
                    var nestedSlider = nestedSliders[a]
                    nestedSlider.addEventListener("change", onSlideVariation)
                }
            }
        }

        return true
    }

    function isValidAxisAndValue(axis, value) {
        if (!Array.isArray(options.ui.variation.axes)) {
            return false
        }
        
        for (var a = 0; a < options.ui.variation.axes.length; a++) {
            var axisoptions = options.ui.variation.axes[a]

            if (axisoptions.tag !== axis) {
                continue
            }
            if (parseFloat(value) < parseFloat(axisoptions.min) || parseFloat(value) > parseFloat(axisoptions.max)) {
                return false
            } else {
                return true
            }
        }

        return false
    }

    function getElement(key, node) {
        if (typeof(node) === "undefined" || key in ui === false) {
            node = root
        }
        var element = root.querySelector("[data-fsjs='" + key + "']")

        return helpers.isNode(element) ? element : false
    }

    function getBlock(key, node) {
        if (typeof(node) === "undefined" || key in ui === false) {
            node = root
        }
        var block = root.querySelector("[data-fsjs-block='" + key + "']")

        return helpers.isNode(block) ? block : false
    }

    function getLabel(key, node) {
        if (typeof(node) === "undefined") {
            node = root
        }
        var block = root.querySelector("[data-fsjs-for='" + key + "']")

        return helpers.isNode(block) ? block : false
    }

    /**
     * Internal event listeners reacting to different UI element’s events
     * and passing them on to trigger the appropriate changes
     */
    function onChange(e) {
        setValue(e.target.dataset.fsjs, e.target.value)
    }

    function onSlideVariation(e) {
        setVariation(e.target.dataset.axis, e.target.value)
    }

    function onSlide(e) {
        setValue(e.target.dataset.fsjs)
    }

    function onCheck() {
        // Currently this is only used for opentype checkboxes
        sendEvent(events.opentypeChanged)
    }

    /**
     * Currently only reacting to buttongroup nested buttons’ clicks
     * @param {*} e 
     */
    function onClick(e) {
        var parent = e.currentTarget.parentNode,
            property = parent.dataset.fsjs,
            buttons = parent.querySelectorAll("[data-choice]")

        if (property in ui && ui[property] === "buttongroup") {
            for (var b = 0; b < buttons.length; b++) {
                helpers.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
            }
            helpers.nodeAddClass(e.currentTarget, options.classes.buttonSelectedClass)
            setValue(property, e.currentTarget.dataset.choice)
        }
    }

    function sendEvent(type, opt) {
        root.dispatchEvent(new CustomEvent(type, { detail: opt }))
    }

    function sendNativeEvent(type, node) {
        var evt = document.createEvent("HTMLEvents")

        evt.initEvent(type, false, true)
        node.dispatchEvent(evt)
    }

    function onKey(event) {
        if (event.type === "keypress") {
            // for keypress events immediately block pressing enter for line break
            if (event.keyCode === 13) {
                event.preventDefault()
                return false;
            }
        } else {
            // allow other events, filter any html with $.text() and replace linebreaks
            // TODO fix paste event from setting the caret to the front of the non-input non-textarea
            var text = blocks.tester.textContent,
                hasLinebreaks = text.indexOf("\n")

            if (-1 !== hasLinebreaks) {
                blocks.tester.innerHTML(text.replace('/\n/gi', ''));
                selection.setCaret(blocks.tester, blocks.tester.textContent.length, 0);
            }
        }
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(key) {
        var element = getElement(key)

        if (element) {
            return element.value
        } else {
            return false
        }
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} key 
     */
    function getCssValue(key) {
        var element = getElement(key)

        return element ? element.value + element.dataset.unit : ""
    }

    function getOpentype() {
        if (!blocks.opentype) {
            return false
        }

        var features = blocks.opentype.querySelectorAll("[data-feature]")

        if (features) {
            var re = {}

            for (var f = 0; f < features.length; f++) {
                var input = features[f]
                re[input.dataset.feature] = input.checked
            }

            return re
        }
    }

    /**
     * Return the current variation settings as object
     * 
     * If Axis is passed, only that axis’ numerical value is returned
     * @param {*} axis 
     */
    function getVariation(axis) {
        if (!blocks.variation) {
            return false
        }

        var variations = blocks.variation.querySelectorAll("[data-axis]"),
            input,
            va = {}

        if (variations) {
            for (var v = 0; v < variations.length; v++) {
                input = variations[v]
                va[input.dataset.axis] = input.value
            }
        }

        if (typeof(axis) === "string" && axis in va) {
            return va[axis]
        }

        return va
    }

    function getButtongroupValue(key) {
        var element = getElement(key),
            selected

        if (element) {
            selected = element.querySelector("." + options.classes.buttonSelectedClass)
        }

        if (selected) {
            return selected.dataset.choice
        } else {
            return ""
        }
    }

    function getCssAttrForKey(key) {
        if (key in keyToCss) {
            return keyToCss[key]
        }

        return false
    }

    function getKeyForCssAttr(attr) {
        for (var key in keyToCss) {
            if (keyToCss.hasOwnProperty(key)) {
                if (keyToCss[key] === attr) {
                    return key
                }
            }
        }

        return false
    }

    function setValue(key, value) {
        var element = getElement(key)

        switch (key) {
            case "fontsize":
            case "lineheight":
            case "letterspacing":
                if (typeof(value) === "undefined") {
                    // no value means get and use the element value
                    value = getValue(key)
                } else {
                    // if a value was passed in check if it is within bounds,
                    // valid and if the slider needs an update (via native event)
                    value = helpers.clamp(value, options.ui[key].min,
                        options.ui[key].max, options.ui[key].init)

                    if (element.value.toString() !== value.toString()) {
                        element.value = value
                        sendNativeEvent("change", element)
                    }
                }

                setLabelValue(key, value)
                setInputCss(keyToCss[key], value + options.ui[key].unit)
                break;

            case "variation":
                setVariations(value)
                break;

            case "opentype":
                setInputOpentype(value)
                break;

            case "language":
                setInputAttr("lang", value)
                break;

            case "fontfamily":
                // Trigger an event that will start the loading process in the
                // Fontsampler instance
                root.dispatchEvent(new CustomEvent(events.fontChanged, {
                    detail: {
                        font: value
                    }
                }))
                break;

            case "alignment":
                setInputCss(keyToCss[key], value)
                break;

            case "direction":
                setInputAttr("dir", value)
                break;

            case "tester":
                break;
        }
        var obj = {}
        obj[key] = value
        sendEvent(events.valueChanged, obj)
    }

    /**
     * Update a single variation axis and UI
     */
    function setVariation(axis, val) {
        var v = getVariation(),
            opt
        
        if (isValidAxisAndValue(axis, val)) {
            // TODO refactor to: getAxisDefaults() and also use
            // it on axis setup / options parsing
            opt = options.ui.variation.axes.filter(function(optVal) {
                return optVal.tag === axis
            })
            if (!opt || typeof(opt) === "undefined") {
                opt = {
                    min: 100,
                    max: 900
                }
            } else {
                opt = opt[0]
            }
            if (typeof(opt.min) === "undefined") {
                opt.min = 100
            }
            if (typeof(opt.max) === "undefined") {
                opt.max = 900
            }

            v[axis] = helpers.clamp(val, opt.min, opt.max)

            setLabelValue(axis, val)
            setInputVariation(v)
        }
    }

    /**
     * Bulk update several variations from object
     * 
     * @param object vals with variation:value pairs 
     */
    function setVariations(vals) {
        if (typeof(vals) !== "object") {
            return false
        }

        for (var axis in vals) {
            if (vals.hasOwnProperty(axis)) {
                setVariation(axis, vals[axis])
            }
        }
    }

    function fontIsInstance(variation) {
        if (typeof(variation) !== "object") {
            return false
        }

        for (var v in variation) {
            // for now just ignore values that are not a number, don't throw an error
            if (!isNaN(parseInt(variation[v]))) {
                variation[v] = variation[v].toString()
            }
        }

        for (var i = 0; i < fonts.length; i++) {
            var f = fonts[i]

            if ("instance" in f === false) {
                continue
            }

            try {
                var parts = f.instance.split(","),
                    vars = {}
                for (var k = 0; k < parts.length; k++) {
                    var p = parts[k].trim().split(" ")
                    vars[p[0]] = p[1].toString()
                }

                // check if all variation keys and values match
                if (Object.keys(variation).length !== Object.keys(vars).length) {
                    continue
                }

                // elegant compare equal for objects, if equal return font
                if (JSON.stringify(vars) === JSON.stringify(variation)) {
                    return f
                }
            } catch (e) {
                continue
            }
        }

        return false
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        input.style[attr] = val
    }

    function setInputAttr(attr, val) {
        input.setAttribute(attr, val)
    }

    function setInputOpentype(features) {
        var parsed = [],
            val
        for (var key in features) {
            if (features.hasOwnProperty(key) && key && typeof(key) !== "undefined") {
                parsed.push('"' + key + '" ' + (features[key] ? "1" : "0"))
            }
        }
        val = parsed.join(",")

        input.style["font-feature-settings"] = val
    }

    function setInputVariation(variations) {
        var parsed = []
        for (var key in variations) {
            if (variations.hasOwnProperty(key) && key && typeof(key) !== "undefined") {
                parsed.push('"' + key + '" ' + (variations[key]))
            }
        }
        val = parsed.join(",")

        input.style["font-variation-settings"] = val

        // Update fontfamily select if it exists
        // When a variable font is updated check if the selected values
        // match a defined instance, and if set it active in the font family
        if (helpers.isNode(blocks.fontfamily)) {
            var instanceFont = fontIsInstance(variations)
            if (instanceFont === false) {
                helpers.nodeAddClass(blocks.fontfamily, options.classes.disabledClass)
            } else {
                helpers.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)
                var element = getElement("fontfamily")
                if (element.value !== instanceFont.name) {
                    element.value = instanceFont.name
                    sendNativeEvent("change", element)
                }
            }
        }
    }

    function setActiveFont(name) {
        if (helpers.isNode(blocks.fontfamily)) {
            var element = getElement("fontfamily", blocks.fontfamily),
                option

            helpers.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)

            if (helpers.isNode(element)) {
                // Only update if it is not the selected fontfamily value
                if (element.value !== name) {
                    option = element.querySelectorAll("option[value='" + name + "']")
                    if (helpers.isNode(option)) {
                        option.selected = true
                    }
                    element.value = name
                    sendNativeEvent("change", element)
                }
            }
        }
    }

    function setActiveAxes(axes) {
        if (helpers.isNode(blocks.variation)) {
            var sliders = blocks.variation.querySelectorAll("[data-axis]")

            if (sliders) {
                for (var s = 0; s < sliders.length; s++) {
                    if (!Array.isArray(axes) || axes.length < 1 ||
                        axes.indexOf(sliders[s].dataset.axis) === -1 ||
                        Fontloader.supportsWoff2() === false
                    ) {
                        helpers.nodeAddClass(sliders[s].parentNode, options.classes.disabledClass)
                    } else {
                        helpers.nodeRemoveClass(sliders[s].parentNode, options.classes.disabledClass)
                    }
                }
            }
        }
    }

    function setActiveLanguage(lang) {
        if (helpers.isNode(blocks.language) && typeof(lang) === "string") {
            var languageChoices = options.ui.language.choices.map(function(value) {
                return value.split("|")[0]
            })

            if (languageChoices.length !== -1) {
                var option = blocks.language.querySelector("option[value='" + lang + "']")

                if (helpers.isNode(option)) {
                    // Trigger the change on the native input
                    blocks.language.value = lang
                    option.selected = true
                    sendNativeEvent("change", blocks.language)

                    root.dispatchEvent(new CustomEvent(events.languageChanged))
                }
            }
        }
    }

    function setActiveOpentype(features) {
        var checkboxes = false

        if (helpers.isNode(blocks.opentype)) {
            checkboxes = blocks.opentype.querySelectorAll("[data-feature]")
        }
        if (checkboxes) {
            for (var c = 0; c < checkboxes.length; c++) {
                if (Array.isArray(features)) {
                    if (features.indexOf(checkboxes[c].dataset.feature) === -1) {
                        helpers.nodeAddClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    } else {
                        helpers.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    }
                } else {
                    helpers.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                }
            }
        }
    }

    function setInputText(text) {
        if (text && input) {
            input.textContent = text
        }
    }

    function setLabelValue(key, value) {
        var labelValue = root.querySelector("[data-fsjs-for='" + key + "'] ." + options.classes.labelValueClass)

        if (labelValue) {
            labelValue.textContent = value
        }
    }

    function setStatusClass(classString, status) {
        if (status === true) {
            helpers.nodeAddClass(root, classString)
        } else if (status === false) {
            helpers.nodeRemoveClass(root, classString)
        }
    }

    return {
        init: init,
        getValue: getValue,
        setValue: setValue,

        setVariations: setVariations,

        getCssValue: getCssValue,
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getVariation: getVariation,
        getCssAttrForKey: getCssAttrForKey,
        getKeyForCssAttr: getKeyForCssAttr,
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        setInputVariation: setInputVariation,
        setInputText: setInputText,
        setStatusClass: setStatusClass,

        setActiveFont: setActiveFont,
        setActiveAxes: setActiveAxes,
        setActiveLanguage: setActiveLanguage,
        setActiveOpentype: setActiveOpentype,
        setLabelValue: setLabelValue,

        sendEvent: sendEvent,
        sendNativeEvent: sendNativeEvent
    }
}
module.exports = UI
},{"./errors":4,"./events":5,"./fontloader":6,"./helpers":8,"./selection":10,"./uielements":12}],12:[function(_dereq_,module,exports){

var helpers = _dereq_("./helpers")

/**
 * Wrapper to provide global root, options and fonts to all methods (UI Elements)
 * 
 * @param {*} root 
 * @param {*} options 
 * @param {*} fonts 
 */
function UIElements(root, options) {

    function label(labelText, labelUnit, labelValue, relatedInput) {
        var label = document.createElement("label"),
            text = document.createElement("span"),
            val, unit

        label.dataset.fsjsFor = relatedInput
        helpers.nodeAddClass(label, options.classes.labelClass)

        text.className = options.classes.labelTextClass
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (labelValue !== "") {
            val = document.createElement("span")
            val.className = options.classes.labelValueClass
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)
        }

        if (typeof(labelUnit) === "string") {
            unit = document.createElement("span")
            unit.className = options.classes.labelUnitClass
            unit.appendChild(document.createTextNode(labelUnit))
            label.appendChild(unit)
        }

        return label
    }

    function slider(key, opt, node) {
        var input = helpers.isNode(node) ? node : document.createElement("input")

        var attributes = {
            type: "range",
            min: opt.min,
            max: opt.max,
            step: opt.step
        }

        input.setAttribute("autocomplete", "off")
        setMissingAttributes(input, attributes)

        if (typeof(input.val) === "undefined") {
            input.value = opt.init
        }

        if ("unit" in input.dataset === false) {
            input.dataset.unit = opt.unit
        }
        if ("init" in input.dataset === false) {
            input.dataset.init = opt.init
        }

        if (key) {
            input.dataset.fsjs = key
        }

        return input
    }

    function slidergroup(key, opt, node) {
        var slidergroup = helpers.isNode(node) ? node : document.createElement("div")

        for (var s = 0; s < opt.axes.length; s++) {
            var wrapper = slidergroup.querySelector("[data-axis-block='" + opt.axes[s].tag + "']")

            if (!helpers.isNode(wrapper)) {
                wrapper = document.createElement("div")
                wrapper.dataset.axisBlock = opt.axes[s].tag
                slidergroup.appendChild(wrapper)
            }

            if (opt.axes[s].label) {
                var label = slidergroup.querySelector("[data-fsjs-for='" + opt.axes[s].tag + "']")
                if (!helpers.isNode(label)) {
                    label = this.label(opt.axes[s].label, false, opt.axes[s].init, opt.axes[s].tag)
                    wrapper.appendChild(label)
                }
            }

            var slider = slidergroup.querySelector("[data-axis='" + opt.axes[s].tag + "']")
            if (!helpers.isNode(slider)) {
                slider = this.slider(false, opt.axes[s])
                slider.dataset.fsjsUi = "slider"
                wrapper.appendChild(slider)
            }
            slider.dataset.axis = opt.axes[s].tag
        }

        return slidergroup
    }

    function dropdown(key, opt, node) {
        var dropdown = helpers.isNode(node) ? node : document.createElement("select")
        if ("choices" in opt === false || opt.choices.length < 1) {
            return false
        }

        for (var c = 0; c < opt.choices.length; c++) {
            var choice = helpers.parseParts(opt.choices[c]),
                option = dropdown.querySelector("option[value='" + choice.val + "']")
                
            if (!helpers.isNode(option)) {
                option = document.createElement("option")
                option.appendChild(document.createTextNode(choice.text))
                dropdown.appendChild(option)
            }

            option.value = choice.val
            if ("init" in opt && opt.init === choice.text) {
                option.selected = true
            }

            if ("instance" in opt) {
                option.dataset.instance = opt.instance
            }
        }

        dropdown.dataset.fsjs = key
        
        return dropdown
    }

    function textfield(key, opt, node) {
        var tester = typeof(node) === "undefined" || node === null ? document.createElement("div") : node,
            attr = {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                spellcheck: "false",
                contenteditable: opt.editable
            }

        setMissingAttributes(tester, attr)

        tester.dataset.fsjs = key

        // If the original root element was a single DOM element with some text, copy that
        // text into the tester
        // TODO move this to interface and on tester node init
        if (!tester.dataset.replaceText) {
            if (options.initialText) {
                tester.appendChild(document.createTextNode(options.initialText))
            } else if (!options.initialText && options.originalText) {
                tester.appendChild(document.createTextNode(options.originalText))
            }
            tester.dataset.replaceText = true
        }

        return tester
    }

    function buttongroup(key, opt) {
        var group = document.createElement("div")

        for (var o in opt.choices) {
            var button = document.createElement("button"),
                choice = helpers.parseParts(opt.choices[o])

            button.dataset.choice = choice.val
            button.appendChild(document.createTextNode(choice.text))
            helpers.nodeAddClass(options.classes.buttonClass)
            if (opt.init === choice.val) {
                button.className = options.classes.buttonSelectedClass
            }
            group.appendChild(button)
        }

        group.dataset.fsjs = key

        return group
    }

    function checkboxes(key, opt) {
        var group = document.createElement("div")

        group.dataset.fsjs = key

        for (var o in opt.choices) {
            if (opt.choices.hasOwnProperty(o)) {
                var choice = helpers.parseParts(opt.choices[o]),
                    label = document.createElement("label"),
                    checkbox = document.createElement("input"),
                    text = document.createElement("span")

                checkbox.setAttribute("type", "checkbox")
                checkbox.dataset.feature = choice.val

                if (opt.init.indexOf(Object.values(choice)[0]) !== -1) {
                    checkbox.checked = true
                }

                text.appendChild(document.createTextNode(choice.text))

                label.appendChild(checkbox)
                label.appendChild(text)

                group.append(label)
            }
        }

        return group
    }

    function setMissingAttributes(node, attributes) {
        if (typeof(node) === "undefined" || node === null || typeof(attributes) !== "object") {
            return
        }

        for (var a in attributes) {
            if (attributes.hasOwnProperty(a)) {
                if (!node.hasAttribute(a)) {
                    node.setAttribute(a, attributes[a])
                }
            }
        }
    }

    return {
        dropdown: dropdown,
        slider: slider,
        slidergroup: slidergroup,
        label: label,
        textfield: textfield,
        buttongroup: buttongroup,
        checkboxes: checkboxes
    }
}

module.exports = UIElements
},{"./helpers":8}]},{},[7])(7)
});