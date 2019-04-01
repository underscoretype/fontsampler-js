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
    "invalidUIItem": "Fontsampler: The supplied UI item is not supported: ",
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
    // console.log("Fontsampler.Fontloader.fromFiles", files, callback)
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
            ["fontsize", "lineheight", "letterspacing"], ["fontfamily", "alignment", "direction", "language"], "tester"
        ],
        wrapperClass: "fontsampler-ui-wrapper",
        loadingClass: "loading",
        preloadingClass: "preloading",
        multiline: true,
        lazyload: false,
        generate: false,
        ui: {
            tester: {
                editable: true,
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-tester"
            },
            fontfamily: {
                label: "Font",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-fontfamily"
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
                min: -0.1,
                max: 0.1,
                step: 0.01,
                label: "Letterspacing",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-letterspacing"
            },
            alignment: {
                choices: ["left|Left", "center|Centered", "right|Right"],
                init: "left",
                label: "Alignment",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-alignment"
            },
            direction: {
                choices: ["ltr|Left to right", "rtl|Right to left"],
                init: "ltr",
                label: "Direction",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-direction"
            },
            language: {
                choices: ["enGB|Engish", "deDe|Deutsch", "nlNL|Dutch"],
                init: "enGb",
                label: "Language",
                wrapperClass: "fontsampler-ui-element fontsampler-ui-element-language"
            }
        }
    }

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

    // Extract fonts; Look first on root element, then on select, then in
    // passed in fonts Array
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

    // Setup the interface listeners and delegate events back to the interface
    function addEventListeners() {
        // sliders
        root.addEventListener("fontsampler.onfontsizechanged", function() {
            var val = interface.getCSSValue("fontsize")
            interface.setInputCss("fontSize", val)
        })
        root.addEventListener("fontsampler.onlineheightchanged", function() {
            var val = interface.getCSSValue("lineheight")
            interface.setInputCss("lineHeight", val)
        })
        root.addEventListener("fontsampler.onletterspacingchanged", function() {
            var val = interface.getCSSValue("letterspacing")
            interface.setInputCss("letterSpacing", val)
        })

        // dropdowns
        root.addEventListener("fontsampler.onfontfamilychanged", function() {
            var val = interface.getValue("fontfamily")
            loadFont(val)
        })
        root.addEventListener("fontsampler.onlanguagechanged", function () {
            var val = interface.getValue("language")
            console.log("lang", val)
            interface.setInputAttr("lang", val)
        })

        // buttongroups
        root.addEventListener("fontsampler.onalignmentclicked", function () {
            var val = interface.getButtongroupValue("alignment")
            interface.setInputCss("textAlign", val)
        })
        root.addEventListener("fontsampler.ondirectionclicked", function () {
            var val = interface.getButtongroupValue("direction")
            console.log("direction", val)
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

        interface.setStatusClass(options.loadingClass, true)
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
            interface.setInputCss("fontFamily", f.family)
            interface.setStatusClass(options.loadingClass, false)

            preloader.resume()
        })
    }

    function init() {
        console.debug("Fontsampler.init()")
        interface.init()
        addEventListeners()
        loadFont(0)

        if (options.lazyload) {
            interface.setStatusClass(options.preloadingClass, true)
            preloader.load(fonts, function () {
                interface.setStatusClass(options.preloadingClass, false)
            })
        }
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
},{"../node_modules/extend":1,"./errors":3,"./fontloader":4,"./interface":7,"./preloader":8}],6:[function(require,module,exports){
function pruneClass(className, classNames) {
    console.log("pruneClass", className, "from", classNames)
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

function addClass(className, classNames) {
    console.log("addClass", className, classNames)
    if (!classNames) {
        classNames = ""
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
    }
}

module.exports = {
    pruneClass: pruneClass,
    addClass: addClass
}
},{}],7:[function(require,module,exports){
var UIElements = require("./uielements")
var Helpers = require("./helpers")
var errors = require("./errors")
var selection = require("./selection")

function Interface(_root, fonts, options) {

    var ui = {
            tester: "textfield",
            fontsize: "slider",
            lineheight: "slider",
            letterspacing: "slider",
            fontfamily: "dropdown",
            alignment: "buttongroup",
            direction: "buttongroup",
            language: "dropdown",
            // opentype: "checkboxes"
        },
        root = null,
        uifactory = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.log("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        uifactory = UIElements(root, options)

        // Before modifying the root node, detect if it is containing only
        // text, and if so, store it to the options for later use
        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // If no valid UI order is passed in fall back to the ui elements
        // Their order might be random, but it ensures each required element
        // is at least present
        if (!options.order || !Array.isArray(options.order)) {
            options.order = Object.keys(ui)
        }

        // Process the possible nested arrays in order one by one
        // · Existing DOM nodes will be validated and initiated
        // · UI elements defined via options but missing from the DOM will be created
        // · UI elements defined in ui option but not in order option will be 
        //   appended in the end
        // · Items neither in the DOM nor in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var element = parseUIOrderElement(options.order[i])
            if (element) {
                root.appendChild(element)
            }
        }
        for (var key in options.ui) {
            if (key in uinodes === false) {
                var element = parseUIOrderElement(options.ui[key])
                if (element) {
                    root.appendChild(element)
                }
            }
        }


        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                uinodes.tester.addEventListener(typeEvents[e], onKey)
            }
        }


        // prevent pasting styled content
        uinodes.tester.addEventListener('paste', function(e) {
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
        console.debug("Fontsampler.Interface.parseUIElement", item, options, "RENDER?", options.ui[item].render)

        // console.warn(item, item in ui)
        if (item in ui === false) {
            throw new Error(errors.invalidUIItem + item)
        }

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

        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui
        if (item === "fontfamily") {
            opt.choices = fonts.map(function (value) {
                return value.name
            })
        }

        var node = uifactory[ui[item]](item, opt),
            wrapper

        initNode(node, opt)

        wrapper = document.createElement("div")
        wrapper.className = opt.wrapperClass

        if (opt.label) {
            wrapper.append(uifactory.label(opt.label, opt.unit, opt.init, item))
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
        node.addEventListener("click", onClick)


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
        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        if (label) {
            label.innerText = getValue(property)
        }

        root.dispatchEvent(customEvent)
    }

    function onClick(e) {
        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "clicked"),
            buttons = e.currentTarget.childNodes,
            currentClass = "fontsampler-buttongroup-selected"

        console.log("onClick", property, property in ui, ui[property])
        if (property in ui && ui[property] === "buttongroup") {    
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].className = Helpers.pruneClass(currentClass, buttons[b].className)
            }
            e.target.className = Helpers.addClass(currentClass, e.target.className)

            root.dispatchEvent(customEvent)
        } else if (property in ui && ui[property] === "textfield") {
            console.log("text onClick")
        }
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
            var text = uinodes.tester.textContent,
                hasLinebreaks = text.indexOf("\n")

            if (-1 !== hasLinebreaks) {
                uinodes.tester.innerHTML(text.replace('/\n/gi', ''));
                selection.setCaret(uinodes.tester, uinodes.tester.textContent.length, 0);
            }
        }
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(property) {
        console.log("getValue", property)
        var element = getUIItem(property)

        return element.value
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} property 
     */
    function getCSSValue(property) {
        var element = getUIItem(property)

        return element.value + element.dataset.unit
    }

    function getButtongroupValue(property) {
        var element = getUIItem(property),
            selected = element.querySelector(".fontsampler-buttongroup-selected")

        console.log("selected", element, selected)

        if (selected) {
            return selected.dataset.choice
        } else {
            return null
        }
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        console.log("Fontsampler.interface.setInput", attr, val)
        uinodes.tester.style[attr] = val
    }

    function setInputAttr(attr, val) {
        uinodes.tester.setAttribute(attr, val)
    }

    // TODO use helper.pruneClass
    function setStatusClass(classString, status) {
        var classes = root.className.split(" "),
            classIndex = classes.indexOf(classString)

        if (status && classIndex === -1) {
            classes.push(classString)
        } else if (!status && classIndex !== -1) {
            classes.splice(classIndex, 1)
        }

        root.className = classes.join(" ")
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        getButtongroupValue: getButtongroupValue,
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface
},{"./errors":3,"./helpers":6,"./selection":9,"./uielements":10}],8:[function(require,module,exports){
var Fontloader = require("./fontloader")

function Preloader() {

    var queue = [],
        autoload = true,
        finishedCallback = null

    function load(fonts, callback) {
        console.debug("Fontsampler.Preloader.load", fonts)

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
                // console.debug("Fontsampler.Preloader.loadNext, preloading file finished, remaining queue length", 
                    // queue.length)

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
},{"./fontloader":4}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
        dropdown.dataset.property = key

        for (var o in options.choices) {
            var option = document.createElement("option"),
                choice = splitChoice(options.choices[o])

            option.value = choice.val
            option.appendChild(document.createTextNode(choice.text))
            dropdown.appendChild(option)
        }

        return dropdown
    }

    function textfield(key, opt) {
        var tester = document.createElement("div"),
            attr = {
                "autocomplete": "off",
                "autocorrect": "off",
                "autocapitalize": "off",
                "spellcheck": "false",
                "contenteditable": opt.editable
            }

        for (var a in attr) {
            tester.setAttribute(a, attr[a])
        }
        tester.dataset.property = key

        // If the original root element was a single DOM element with some text, copy that
        // text into the tester
        if (options.initialText) {
            tester.append(document.createTextNode(options.initialText))
        } else if (!options.initialText && options.originalText) {
            tester.append(document.createTextNode(options.originalText))
        }

        return tester
    }

    function buttongroup(key, opt) {
        console.log(key, opt)
        var group = document.createElement("div")

        for (var o in opt.choices) {
            var c = opt.choices[o],
                button = document.createElement("button"),
                choice = splitChoice(c)

            button.dataset.choice = choice.val
            button.appendChild(document.createTextNode(choice.text))
            if (opt.init === choice.val) {
                button.className = "fontsampler-buttongroup-selected"
            }
            group.appendChild(button)
        }

        group.dataset.property = key

        return group
    }

    /**
     * Split an input choice into value and text or return only the value as 
     * both if no separator is used to provide a readable label
     * e.g. "ltr|Left" to right becomes { val: "ltr", text: "Left to right"}
     * but: "left" becomes { val: "left", text: "left"}
     * @param string choice 
     * @return obj {val, text}
     */
    function splitChoice(choice) {
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

    return {
        dropdown: dropdown,
        slider: slider,
        label: label,
        textfield: textfield,
        buttongroup: buttongroup
    }
}

module.exports = UIElements
},{}]},{},[5])(5)
});