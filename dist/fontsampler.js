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

module.exports = {
    "noFonts": "Fontsampler: No fonts were passed in.",
    "initFontFormatting": "Fontsampler: Passed in fonts are not in expected format. Expected [ { name: 'Font Name', files: [ 'fontfile.woff', 'fontfile.woff2' ] }, … ]",
    "fileNotfound": "Fontsampler: The passed in file could not be found: ",
    "missingRoot": "Fontsampler: Passed in root element invalid: ",
    "tooManyFiles": "Fontsampler: Supplied more than one woff or woff2 for a font: ",
    "invalidUIItem": "Fontsampler: The supplied UI item is not supported: ",
    "invalidEvent": "Fontsampler: Invalid event type. You can only register Fontsampler events on the Fontsampler instance.",
    "newInit": "Fontsampler: Instantiated Fontsampler without 'new' keyword. Create Fontsamplers using new Fontsampler(…)",
    "dataFontsJsonInvalid": "Fontsampler: The data-fonts JSON failed to parse."
}


},{}],4:[function(_dereq_,module,exports){
var events = {
    "init": "fontsampler.events.init"
}

module.exports = events
},{}],5:[function(_dereq_,module,exports){
var FontFaceObserver = _dereq_("../node_modules/fontfaceobserver/fontfaceobserver.standalone")

var errors = _dereq_("./errors")

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
    font = bestWoff(files)
    loadFont(font, callback)
}

module.exports = {
    "loadFont": loadFont,
    "fromFiles": fromFiles
}
},{"../node_modules/fontfaceobserver/fontfaceobserver.standalone":2,"./errors":3}],6:[function(_dereq_,module,exports){
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
var extend = _dereq_("../node_modules/extend")

var Fontloader = _dereq_("./fontloader")
var Interface = _dereq_("./interface")
var Preloader = _dereq_("./preloader")
var errors = _dereq_("./errors")
var events = _dereq_("./events")
var helpers = _dereq_("./helpers")

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

    return this
}

module.exports = Fontsampler
},{"../node_modules/extend":1,"./errors":3,"./events":4,"./fontloader":5,"./helpers":7,"./interface":8,"./preloader":9}],7:[function(_dereq_,module,exports){
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

function addClass(className, classNames) {
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
},{}],8:[function(_dereq_,module,exports){
var UIElements = _dereq_("./uielements")
var helpers = _dereq_("./helpers")
var errors = _dereq_("./errors")
var selection = _dereq_("./selection")

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
            opentype: "checkboxes"
        },
        keyToCss = {
            "fontsize": "fontSize",
            "lineheight": "lineHeight",
            "letterspacing": "letterSpacing"
        },
        root = null,
        uifactory = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.debug("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        root.className = helpers.addClass(options.rootClass, root.className)
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
            var elementA = parseUIOrderElement(options.order[i])
            if (elementA) {
                root.appendChild(elementA)
            }
        }
        for (var keyB in options.ui) {
            if (options.ui.hasOwnProperty(keyB)) {
                if (keyB in uinodes === false) {
                    var elementB = parseUIOrderElement(options.ui[keyB])
                    if (elementB) {
                        root.appendChild(elementB)
                    }
                }
            }
        }

        // after all nodes are instantiated, update the tester to reflect
        // the current state
        for (var keyC in uinodes) {
            if (uinodes.hasOwnProperty(keyC)) {
                initNode(keyC, uinodes[keyC], options.ui[keyC])
            }
        }

        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                if (typeEvents.hasOwnProperty(e)) {
                    uinodes.tester.addEventListener(typeEvents[e], onKey)
                }
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
            // Skipping not defined UI element

            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || boolean (true = in DOM, false = invalid item)
     */
    function parseUIElement(item) {
        if (item in ui === false) {
            throw new Error(errors.invalidUIItem + item)
        }

        // check if in DOM
        // validate and hook up
        var node = getUIItem(item)
        if (node) {
            validateNode(item, node, options.ui[item])
            uinodes[item] = node

            return true
        } else if (options.ui[item].render && item in ui === true && item in uinodes === false) {
            node = createNode(item, options.ui[item])
            validateNode(item, node, options.ui[item])
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
        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui
        if (item === "fontfamily") {
            opt.choices = fonts.map(function(value) {
                return value.name
            })
        }

        var node = uifactory[ui[item]](item, opt),
            wrapper = document.createElement("div")

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
    function validateNode(key, node, opt) {
        // passing uifactory the node will validate the node against the
        // required options (for those uielements that are implemented to
        // take a third parameter)
        var uielement = uifactory[ui[key]](key, opt, node.querySelector("[data-property]")),
            classes = [
                options.elementClass + "",
                options.elementClass + "-block-" + key,
                options.elementClass + "-type-" + ui[key]
            ]

        for (var c = 0; c < classes.length; c++) {
            node.className = helpers.addClass(classes[c], node.className)
        }

        if (opt.label) {
            var labels = root.querySelectorAll("[for='" + key + "']")
            if (labels.length > 0) {
                for (var l = 0; l < labels.length; l++) {
                    var label = labels[l],
                        text = label.querySelector("." + options.labelTextClass),
                        value = label.querySelector("." + options.labelValueClass),
                        unit = label.querySelector("." + options.labelUnitClass)

                    if (text && text.textContent === "") {
                        text.textContent = opt.label
                    }

                    if (value && value.textContent === "") {
                        // If set in already set in DOM the above validate will have set it
                        value.textContent = uielement.value
                    }

                    if (unit && unit.textContent === "") {
                        // If set in already set in DOM the above validate will have set it
                        unit.textContent = uielement.dataset.unit
                    }

                }
            }
        }

        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(key, node, opt) {
        // TODO set values if passed in and different on node

        if (ui[key] === "slider") {
            node.addEventListener("change", onChange)
            node.val = opt.init
            setInputCss(keyToCss[key], opt.init + opt.unit)
        } else if (ui[key] === "dropdown") {
            node.addEventListener("change", onChange)
            // TODO
        } else if (ui[key] === "buttongroup") {
            var buttons = node.querySelectorAll("[data-choice]")

            if (buttons.length > 0) {
                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].addEventListener("click", onClick)
                }
            }

            // TODO 
        } else if (ui[key] === "checkboxes") {
            node.addEventListener("change", onChange)

            // TODO
        }

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
        return root.querySelector("[data-property='" + item + "']")
    }

    /**
     * Catch-all UI element event listener firing a scoped CustomEvent based
     * on the element’s property
     * @param {*} e 
     */
    function onChange(e) {
        var property = e.target.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed")

        root.dispatchEvent(customEvent)
    }

    /**
     * Currently only reacting to buttongroup nested buttons’ clicks
     * @param {*} e 
     */
    function onClick(e) {
        var parent = e.currentTarget.parentNode,
            property = parent.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "clicked"),
            buttons = parent.querySelectorAll("[data-choice]"),
            currentClass = "fontsampler-buttongroup-selected"

        if (property in ui && ui[property] === "buttongroup") {
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].className = helpers.pruneClass(currentClass, buttons[b].className)
            }
            e.currentTarget.className = helpers.addClass(currentClass, e.currentTarget.className)

            root.dispatchEvent(customEvent)
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
        var element = getUIItem(property)

        if (element) {
            return element.value
        } else {
            return false
        }
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} property 
     */
    function getCSSValue(property) {
        var element = getUIItem(property)

        return element.value + element.dataset.unit
    }

    function getOpentype() {
        if (!uinodes.opentype) {
            return false
        }

        var features = uinodes.opentype.querySelectorAll("[data-feature]")

        if (features) {
            var re = {}

            for (var f = 0; f < features.length; f++) {
                var input = features[f]
                re[input.dataset.feature] = input.checked
            }

            return re
        }
    }

    function getButtongroupValue(property) {
        var element = getUIItem(property),
            selected = element.querySelector(".fontsampler-buttongroup-selected")

        if (selected) {
            return selected.dataset.choice
        } else {
            return null
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

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        uinodes.tester.style[attr] = val
        var key = getKeyForCssAttr(attr)

        if (key && key in ui) {
            if (ui[key] === "slider") {
                if (val !== getCSSValue(key)) {
                    var value = getValue(attr)
                    if (value) {
                        uinodes[key].value = value
                    }
                }
            }
        }
    }

    function setInputAttr(attr, val) {
        uinodes.tester.setAttribute(attr, val)
    }

    function setInputOpentype(features) {
        var parsed = []
        for (var key in features) {
            if (features.hasOwnProperty(key)) {
                parsed.push('"' + key + '" ' + (features[key] ? "1" : "0"))
            }
        }
        var val = parsed.join(",")

        uinodes.tester.style["font-feature-settings"] = val
    }

    // TODO use helper.pruneClass
    function setStatusClass(classString, status) {
        if (status === true) {
            root.className = helpers.addClass(classString, root.className)
        } else if (status === false) {
            root.className = helpers.pruneClass(classString, root.className)
        }
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getCssAttrForKey: getCssAttrForKey,
        getKeyForCssAttr: getKeyForCssAttr,
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface
},{"./errors":3,"./helpers":7,"./selection":10,"./uielements":11}],9:[function(_dereq_,module,exports){
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
},{"./fontloader":5}],10:[function(_dereq_,module,exports){
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

        text.className = options.labelTextClass
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (typeof(labelUnit) === "string" && labelValue !== "") {
            val = document.createElement("span")
            val.className = options.labelValueClass
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)

            unit = document.createElement("span")
            unit.className = options.labelUnitClass
            unit.appendChild(document.createTextNode(labelUnit))
            label.appendChild(unit)
        }

        return label
    }

    function slider(key, opt, node) {
        var input = typeof(node) === "undefined" || node === null ? document.createElement("input") : node

        var attributes = {
            type: "range",
            min: opt.min,
            max: opt.max,
            step: opt.step
        }

        input.setAttribute("autocomplete", "off")
        for (var a in attributes) {
            if (attributes.hasOwnProperty(a)) {
                if (!input.hasAttribute(a)) {
                    input.setAttribute(a, attributes[a])
                }
            }
        }

        if (typeof(input.val) === "undefined") {
            input.value = opt.init
        }

    
        if ("unit" in input.dataset === false) {
            input.dataset.unit = opt.unit
        }
        if ("init" in input.dataset === false) {
            input.dataset.init = opt.init
        }

        input.dataset.property = key

        return input
    }

    function dropdown(key, opt) {
        var dropdown = document.createElement("select")
        dropdown.dataset.property = key

        for (var o in opt.choices) {
            var option = document.createElement("option"),
                choice = parseChoice(opt.choices[o])

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
        var group = document.createElement("div")

        for (var o in opt.choices) {
            var button = document.createElement("button"),
                choice = parseChoice(opt.choices[o])

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

    function checkboxes(key, opt) {
        var group = document.createElement("div")
            
        group.dataset.property = key

        for (var o in opt.choices) {
            var choice = parseChoice(opt.choices[o]),
                label = document.createElement("label"),
                checkbox = document.createElement("input"),
                text = document.createElement("span")


            checkbox.setAttribute("type", "checkbox")
            checkbox.dataset.feature = choice.val

            text.appendChild(document.createTextNode(choice.text))

            label.appendChild(checkbox)
            label.appendChild(text)

            group.append(label)
        }

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
    function parseChoice(choice) {
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
        buttongroup: buttongroup,
        checkboxes: checkboxes
    }
}

module.exports = UIElements
},{}]},{},[6])(6)
});