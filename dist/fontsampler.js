(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fontsampler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],3:[function(require,module,exports){

module.exports = {
    "noFonts": "Fontsampler: No fonts were passed in.",
    "initFontFormatting": "Fontsampler: Passed in fonts are not in expected format. Expected [ { name: 'Font Name', files: [ 'fontfile.woff', 'fontfile.woff2' ] }, … ]",
    "fileNotfound": "Fontsampler: The passed in file could not be found: ",
    "missingRoot": "Fontsampler: Passed in root element invalid: ",
    "tooManyFiles": "Fontsampler: Supplied more than one woff or woff2 for a font: ",
}


},{}],4:[function(require,module,exports){
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
},{"../node_modules/fontfaceobserver/fontfaceobserver.standalone":2,"./errors":3}],5:[function(require,module,exports){
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
        order: [["fontsize", "lineheight", "letterspacing", "fontfamily"], "tester"],
        wrapperClass: "fontsampler-ui-wrapper",
        loadingClass: "loading",
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

        interface.setLoadingStatus(true)
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
            interface.setLoadingStatus(false)
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
},{"../node_modules/extend":1,"./errors":3,"./fontloader":4,"./interface":6}],6:[function(require,module,exports){
var UIElements = require("./uielements")

function Interface(_root, fonts, options) {

    var ui = {
            tester: "textfield",
            fontsize: "slider",
            lineheight: "slider",
            letterspacing: "slider",
            fontfamily: "dropdown",
            // "alignment": "buttons",
            // "direction": "toggle",
            // "language": "dropdown",
            // "opentype": "checkboxes"
        },
        root = null,
        uielements = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.log("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        uielements = UIElements(root, fonts, options)

        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // UI DOM logic

        // UI ordering: each array is a wrapped div, each element corresponds to and item

        // Init with root element

        // Excepted:
        // - Init on empty root

        // Expected:
        // - Init on root with DOM controls
        // - Validate & hook up controls
        // - Init DOM with option values, if passed in

        // Expected:
        // - Init on root with DOM controls and options
        // - Validate & hook up controls
        // - Init DOM with option values, if passed in
        // - Generate _missing_ DOM and values as per options

        // Expected:
        // - Init on empty root with options
        // - Generate DOM and values as per options

        // All:
        // - Add Tester

        // If no valid UI order is passed in fall back to the ui elements
        // Their order might be random, but it ensures each required element
        // is at least present
        if (!options.order || !Array.isArray(options.order)) {
            options.order = Object.keys(ui)
        }

        // Process the possible nested arrays in order one by one
        // · Existing DOM nodes will be validated and initiated
        // · UI elements defined via options but missing from the DOM will be created
        // · Items neither in the DOM not in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var element = parseUIOrderElement(options.order[i])
            if (element) {
                console.log("APPEND", element)
                root.appendChild(element)
            }
        }
    }

    /**
     * Recursively go through an element in the options.order
     * @param string item
     * @param node parent
     */
    function parseUIOrderElement(item) {
        console.debug("Fontsampler.Interface.parseUIOrderElement", item)
        var child, wrapper

        if (typeof(item) === "string") {
            child = parseUIElement(item)
            if (child === true) {
                // exists
            } else if (child) {
                console.warn("new child, append", child)
                return child
            } else {
                // parsing failed
            }
        } else if (Array.isArray(item)) {
            wrapper = document.createElement("div")
            wrapper.className = options.wrapperClass

            for (var i = 0; i < item.length; i++) {
                child = parseUIOrderElement(item[i])
                if (child) {
                    wrapper.appendChild(child)
                }
            }

            return wrapper
        } else {
            console.debug("skipping not defined UI element", item)

            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || boolean (true = in DOM, false = invalid item)
     */
    function parseUIElement(item) {
        console.debug("Fontsampler.Interface.parseUIElement", item, options)
        console.debug("RENDER?", item, options.ui[item].render)
        // check if in DOM
        // validate and hook up
        var node = getUIItem(item)
        if (node) {
            validateNode(node, options.ui[item])
            initNode(node, options.ui[item])
            uinodes[item] = node

            return true
        } else if (options.ui[item].render && item in ui) {
            node = createNode(item, options.ui[item])
            uinodes[item] = node

            return node
        }

        return false
    }

    /**
     * Create a new UI element 
     * @param string item 
     * @param object opt 
     * @return node
     */
    function createNode(item, opt) {
        console.debug("Fontsampler.Interface.createNode", item, opt)
        var node = uielements[ui[item]](item, opt),
            wrapper

        initNode(node, opt)

        wrapper = document.createElement("div")
        wrapper.className = opt.wrapperClass

        if (opt.label) {
            wrapper.append(uielements.label(opt.label, opt.unit, opt.init, item))
        }
        wrapper.append(node)

        return wrapper

    }

    /**
     * Validate a UI element (as found in the DOM)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function validateNode(node, opt) {
        // console.debug("Fontsampler.Interface.validateNode", node, opt)

        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(node, opt) {
        // console.debug("Fontsampler.Interface.initNode", node, opt)
        // TODO set values if passed in an different on node

        node.addEventListener("change", onChange)

        return true
    }

    /**
     * Convenience helper to return a DOM element fetching one of the Fontsampler
     * UI elements
     * 
     * @param string item 
     * @return node
     */
    function getUIItem(item) {
        console.debug("Fontsampler.Interface.getUIItem", item)
        return root.querySelector("[data-property='" + item + "']")
    }

    /**
     * Catch-all UI element event listener firing a scoped CustomEvent based
     * on the element’s property
     * @param {*} e 
     */
    function onChange(e) {
        console.log("change", e)
        console.log(e.currentTarget.dataset.property)

        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        if (label) {
            label.innerText = getValue(property)
        }

        root.dispatchEvent(customEvent)
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(property) {
        console.log("getValue", property)
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} property 
     */
    function getCSSValue(property) {
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value + element.dataset.unit
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInput(attr, val) {
        console.log("Fontsampler.interface.setInput", attr, val)
        uinodes.tester.style[attr] = val
    }

    function setLoadingStatus(status) {
        var classes = root.className.split(" "),
            classIndex = classes.indexOf(options.loadingClass)

        if (status && classIndex === -1) {
            classes.push(options.loadingClass)
        } else if (!status && classIndex !== -1) {
            classes.splice(classIndex, 1)
        }

        root.className = classes.join(" ")
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        setInput: setInput,
        setLoadingStatus: setLoadingStatus
    }
}
module.exports = Interface
},{"./uielements":7}],7:[function(require,module,exports){
/**
 * Wrapper to provide global root, options and fonts to all methods (UI Elements)
 * 
 * @param {*} root 
 * @param {*} options 
 * @param {*} fonts 
 */
function UIElements(root, fonts, options) {

    function label(labelText, labelUnit, labelValue, relatedInput) {
        var label = document.createElement("label"),
            text = document.createElement("span"),
            val, unit
    
        label.setAttribute("for", relatedInput)
    
        text.className = "fontsampler-label-text"
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)
    
        if (labelUnit && labelValue) {
    
            val = document.createElement("span")
            val.className = "fontsampler-label-value"
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)
    
            unit = document.createElement("span")
            unit.className = "fontsampler-label-unit"
            unit.appendChild(document.createTextNode(labelUnit))
            label.appendChild(unit)
        }
    
        return label
    }
    
    function slider(key, opt) {
        var input = document.createElement("input")
    
        input.setAttribute("type", "range")
        input.setAttribute("min", opt.min)
        input.setAttribute("max", opt.max)
        input.setAttribute("step", opt.step)
        input.dataset.property = key
        input.setAttribute("autocomplete", "off")
        input.value = opt.init
        if (opt.unit) {
            input.dataset.unit = opt.unit
        }
    
        return input
    }
    
    function dropdown(key, options) {
        console.debug("Fontsampler.UIElements.dropdown", key, options)

        var dropdown = document.createElement("select")
    
        dropdown.setAttribute("value", name)
        dropdown.dataset.property = key
    
        for (var index in fonts) {
            var option = document.createElement("option")
    
            option.value = fonts[index].name
            option.appendChild(document.createTextNode(fonts[index].name))
            dropdown.appendChild(option)
        }
    
        return dropdown
    }
    
    function textfield(key, opt) {
        tester = document.createElement("div")
            var attr = {
                "autocomplete": "off",
                "autocorrect": "off",
                "autocapitalize": "off",
                "spellcheck": "false",
            }
            for (var a in attr) {
                tester.setAttribute(a, attr[a])
            }
            tester.setAttribute("contenteditable", opt.editable)
    
            tester.dataset.property = key
    
            // If the original root element was a single DOM element with some text, copy that
            // text into the tester
            if (options.initialText) {
                tester.append(document.createTextNode(options.initialText))
            } else if (!options.initialText && options.originalText) {
                tester.append(document.createTextNode(options.originalText))
            }
    
            // If the original root element had only a single text node, replace it with the tester
            // otherwise append the tester element
            // if (root.childNodes.length !== 1) {
            //     root.append(tester)
            // } else if (root.childNodes.length === 1) {
            //     root.replaceChild(tester, root.childNodes[0])
            // }

        return tester
    }

    return {
        dropdown: dropdown,
        slider: slider,
        label: label,
        textfield: textfield
    }
}

module.exports = UIElements
},{}]},{},[5])(5)
});