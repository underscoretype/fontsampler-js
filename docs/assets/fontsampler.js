(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fontsampler = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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
    timeout: 3000, // the default loading timeout after which to fail
    classes: {
        rootClass: "fontsamplerjs",
        
        initClass: "fsjs-initialized",
        loadingClass: "fsjs-loading",
        timeoutClass: "fsjs-timeout",
        preloadingClass: "fsjs-preloading",

        wrapperClass: "fsjs-wrapper",
        blockClass: "fsjs-block",
        blockClassAxis: "fsjs-block-axis",
        elementClass: "fsjs-element",

        labelClass: "fsjs-label",
        labelTextClass: "fsjs-label-text",
        labelValueClass: "fsjs-label-value",
        labelUnitClass: "fsjs-label-unit",

        buttonClass: "fsjs-button",
        buttonSelectedClass: "fsjs-button-selected",

        disabledClass: "fsjs-disabled",
        focusedClass: "fsjs-focused",
    },
    order: [
        // ["fontsize", "lineheight", "letterspacing"],
        // ["fontfamily", "language"],
        // ["alignment", "direction", "opentype"],
        "tester"
    ],
    config: {
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
    }
}

},{}],4:[function(_dereq_,module,exports){

module.exports = {
    "noFonts": "Fontsampler: No fonts were passed in.",
    "initFontFormatting": "Fontsampler: Passed in fonts are not in expected format. Expected [ { name: 'Font Name', files: [ 'fontfile.woff', 'fontfile.woff2' ] }, … ]",
    "fileNotfound": "Fontsampler: The passed in file could not be loaded.",

    "missingRoot": "Fontsampler: Passed in root element invalid: ",
    "missingFonts": "Fontsampler: No fonts passed in",
    
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
    "skinInit": "fontsampler.events.skininit",
    "languageChanged": "fontsampler.events.languagechanged",
    "fontChanged": "fontsampler.events.fontchanged",
    "fontLoaded": "fontsampler.events.fontloaded",
    "fontRendered": "fontsampler.events.fontrendered",
    "fontsPreloaded": "fontsampler.events.fontspreloaded",
    "valueChanged": "fontsampler.events.valuechanged",
    "opentypeChanged": "fontsampler.events.opentypechanged",
    "focused": "fontsampler.events.focused",
    "blurred": "fontsampler.events.blurred",
}

},{}],6:[function(_dereq_,module,exports){
var FontFaceObserver = _dereq_("../node_modules/fontfaceobserver/fontfaceobserver.standalone")
var errors = _dereq_("./constants/errors")
var supports = _dereq_("./helpers/supports")
var helpers = _dereq_("./helpers/helpers")


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
        console.debug("GlobalLoader.onSuccess", fontface, fontface.variationSettings, _id)
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

        if ("instance" in font) {
            variationSettings = helpers.variationString(font.instance)
        }

        ff.load().then(function() {
            // Explicitly pass id, since fontface.variationSettings isn't widely supported yet
            const id = ffSignature(ff.family, font.weight, ff.style, variationSettings)
            onSuccess(ff, id)
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
},{"../node_modules/fontfaceobserver/fontfaceobserver.standalone":2,"./constants/errors":4,"./helpers/helpers":9,"./helpers/supports":11}],7:[function(_dereq_,module,exports){
/**
 * Fontsampler.js
 * 
 * A configurable standalone webfont type tester for displaying and manipulating sample text.
 * 
 * @author Johannes Neumeier <hello@underscoretype.com>
 * @copyright 2019-2024 Johannes Neumeier
 * @license GNU GPLv3
 */
var extend = _dereq_("../node_modules/extend")

var Fontloader = _dereq_("./fontloader")
var Interface = _dereq_("./ui")
var Preloader = _dereq_("./preloader")

var errors = _dereq_("./constants/errors")
var events = _dereq_("./constants/events")
var _defaults = _dereq_("./constants/defaults")

var helpers = _dereq_("./helpers/helpers")
var utils = _dereq_("./helpers/utils")
var dom = _dereq_("./helpers/dom")
var supports = _dereq_("./helpers/supports")

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


    function parseFonts(font_definitions) {
        
        // Store each font, axes and parse instance definitions into obj form
        for (var i = 0; i < font_definitions.length; i++) {
            var font = font_definitions[i];

            if ("instance" in font) {
                font.instance = helpers.parseVariation(font.instance)
                font.axes = Object.keys(font.instance)
            } else {
                font.axes = []
            }

            if (!("style" in font)) {
                font.style = "normal"
            }

            if (!("weight" in font)) {
                font.weight = 400
                
                // Set font weight implicitly from instance
                if ("instance" in font && "wght" in font.instance) {
                    font.weight = font.instance["wght"]
                }
            }

            if (!("family" in font) && font.files) {                
                for (let i = 0; i < font.files.length; i++) {
                    let f = font.files[i];
                    let family = f.substring(f.lastIndexOf("/") + 1);
                    family = family.substring(0, family.lastIndexOf("."))

                    if (family) {
                        font.family = family.replace(/\W/gm, "")
                        break
                    }
                }
            }
        }

        return font_definitions
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
    // function initFont(fontface) {
    function initFont(font) {
        var family = ""
        let fontface = font.fontface;

        ui.setStatusClass(options.classes.loadingClass, false)

        // Try show a font by using a predefined 'cls'
        if ("cls" in that.currentFont && that.currentFont.cls) {
            console.debug("Fontsampler.initFont with class", that.currentFont.cls)
            ui.setInputCss("fontStyle", font.style || "normal")
            ui.setInputCss("fontWeight", font.weight || "normal")
            ui.setInputCss("fontFamily", "")
            ui.setFontClass(that.currentFont.cls)
            family = that.currentFont["font-family"]
            
        } else {
            console.debug("Fontsampler.initFont without class", that.currentFont, fontface)
            that.currentFont.fontface = fontface
            ui.setInputCss("fontFamily", fontface.family)
            ui.setInputCss("fontStyle", fontface.style || "normal")
            ui.setInputCss("fontWeight", fontface.weight || "normal")
            ui.setFontClass("")
            family = fontface.family
        }

        // Update the css font family
        if ("fallback" in that.currentFont) {
            family += "," + that.currentFont.fallback
        }

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
            if (Object.keys(axesInits).length === 0) {
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
            initFont(this.currentFont)

        } else {
            // Load a new font file
            this.currentFont = font

            // The actual font load
            Fontloader.fromFiles(font, function(fontface) {

                font.fontface = fontface

                // Generate a unique string for this fontface, cache as loaded
                var fjson = {};
                for (let k in fontface) {
                    fjson[k] = fontface[k]
                }
                fjson = JSON.stringify(fjson)
                
                if (that.loadedFonts.indexOf(fjson) === -1) {
                    that.loadedFonts.push(fjson)
                    _root.dispatchEvent(new CustomEvent(events.fontLoaded, { detail: fontface }))
                }

                initFont(font)
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
},{"../node_modules/extend":1,"./constants/defaults":3,"./constants/errors":4,"./constants/events":5,"./fontloader":6,"./helpers/dom":8,"./helpers/helpers":9,"./helpers/supports":11,"./helpers/utils":12,"./preloader":13,"./ui":14}],8:[function(_dereq_,module,exports){
/**
 * DOM related helpers
 */

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

module.exports = {
    nodeAddClass: nodeAddClass,
    nodeAddClasses: nodeAddClasses,
    nodeRemoveClass: nodeRemoveClass,
    isNode: isNode
}
},{}],9:[function(_dereq_,module,exports){

var supports = _dereq_("./supports")
var errors = _dereq_("../constants/errors")

/**
 * App specific helpers
 */


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

    if (woff2s.length > 0 && supports.woff2) {
        return woff2s.shift()
    }

    if (woffs.length > 0) {
        return woffs.shift()
    }

    return false
}


function parseVariation(stringOrObj) {
    var variations = {},
        parts;

    if (stringOrObj === "normal") {
        return {}
    }
        
    if (typeof(stringOrObj) === "string" && stringOrObj.trim() !== "") {
        // split all declarations by commas, then parse each axis to value pair
        stringOrObj = stringOrObj.replace(/'|"/gm, "")
        
        parts = stringOrObj.split(",")
        for (var i = 0; i < parts.length; i++) {
            try {
                var part = parts[i],
                    axis = part.match(/^\s?[A-z]{4}\s?/gm),
                    val = part.match(/\s?[0-9\.]+\s?/gm)
                if (axis.length > 0 && val.length > 0) {
                    variations[axis[0].trim()] = val[0].trim()
                }
            } catch (e) {
                error.log(e)
            }
        }
    } else {
        // TODO validate/parse
        variations = stringOrObj
    }
    return variations
}

/**
 * For a given CSS class retrieve the used font-family.
 * 
 * @param {*} cls 
 */
function getFamilyFromCSSClass(cls) {
    span = pseudoElement(cls)
    
    const family = getComputedStyle(span).fontFamily;
    document.querySelector("body").removeChild(span)

    return family
}


function pseudoElement(cls, hasWidth, additionalStyles) {
    const body = document.querySelector("body"),
        span = document.createElement("span");

    span.className = cls
    span.style.position = "absolute"
    span.style.left = "-1000px"
    span.style.top = "-1000px"
    span.style.height = "0"
    
    if (!!hasWidth) {
        span.style.width = "auto"
        span.style.overflow = "auto"
    } else {
        span.style.width = "0"
        span.style.overflow = "hidden"
    }

    if (typeof(additionalStyles) === "object") {
        for (let attr in additionalStyles) {
            span.style[attr] = additionalStyles[attr]
        }
    }

    body.appendChild(span)

    return span
}

function variationString(obj, ignore) {
    let variationSettings = "normal",
        axes = [];

    for (let axis in obj) {
        if (ignore && ignore.length > 0) {
            if (ignore.indexOf(axis) !== -1) {
                continue
            }
        }
        axes.push('"' + axis + '" ' + obj[axis])
    }
    variationSettings = axes.join(",")

    return variationSettings
}

module.exports = {
    getExtension: getExtension,   
    parseParts: parseParts,
    validateFontsFormatting: validateFontsFormatting,
    extractFontsFromDOM: extractFontsFromDOM,
    bestWoff: bestWoff,
    parseVariation: parseVariation,
    pseudoElement: pseudoElement,
    getFamilyFromCSSClass: getFamilyFromCSSClass,
    variationString: variationString,
}
},{"../constants/errors":4,"./supports":11}],10:[function(_dereq_,module,exports){
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
 * Just a centralized wrapper around the native CSS.supports, which
 * superseds variable font support, so it is a handy way to eliminate 
 * pre-variable font browsers
 */
function variableFonts() {
    if ("CSS" in window === false || "supports" in CSS === false) {
        return false
    }
    
    return CSS.supports("(font-variation-settings: normal)")
}

/**
 * Simple woff2 support detection with a shim font, copied from:
 * npm woff2-feature-test
 */
function woff2() {
    if ("FontFace" in window === false) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
}

/**
 * Return the executed method returns as attributes of this module
 */
module.exports = {
    variableFonts: (variableFonts)(),
    woff2: (woff2)()
}
},{}],12:[function(_dereq_,module,exports){
/**
 * Non-app specific JS helpers
 */

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
        if (typeof (fallback) !== "undefined") {
            value = fallback
        } else {
            return value
        }
    }

    return Math.min(max, Math.max(value, min))
}

/**
 * flatten an array recursively from https://stackoverflow.com/a/42916843/999162
 * @method flattenDeep
 * @param array {Array}
 * @return {Array} flatten array
 */
function flattenDeep(array) {
    try {
        return array.reduce(function (acc, current) {
            return Array.isArray(current) ? acc.concat(flattenDeep(current)) : acc.concat([current]);
        }, []);
    } catch (e) {
        console.error(e)
        return []
    }
}

function arrayUnique(a) {
    if (!Array.isArray(a)) {
        return false
    }
    return a.filter(function (value, index, self) {
        return self.indexOf(value) === index
    }, a)
}


/**
 * Via https://stackoverflow.com/a/17369384/999162
 * 
 * @param {*} value 
 * @returns 
 */
function countDecimals(value) {
    try {
        if ((value % 1) != 0) {
            return value.toString().split(".")[1].length;
        }
    } catch (e) {
        return 0
    }
    return 0;
};

module.exports = {
    flattenDeep: flattenDeep,
    arrayUnique: arrayUnique,
    clamp: clamp,
    countDecimals: countDecimals
}
},{}],13:[function(_dereq_,module,exports){
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
            Fontloader.fromFiles(queue[0], function () {
                queue.shift()

                if (queue.length === 0 && finishedCallback) {
                    finishedCallback()
                }
                
                if (queue.length > 0 && autoload) {
                    loadNext()
                }
            }, function () {
            }, 5000)
        }
    }

    return {
        load: load,
        pause: pause,
        resume: resume
    }
}


module.exports = Preloader
},{"./fontloader":6}],14:[function(_dereq_,module,exports){
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
 * The terminology used in this class uses `block` for a wrapper of an UI element
 * and `element` for the actual UI element that has a value, e.g. the HTML input
 * or select etc.
 */
var selection = _dereq_("./helpers/selection")

var UIElements = _dereq_("./uielements")

// var errors = require("./constants/errors")
var events = _dereq_("./constants/events")
var defaults = _dereq_("./constants/defaults")

var dom = _dereq_("./helpers/dom")
var utils = _dereq_("./helpers/utils")
var supports = _dereq_("./helpers/supports")

function UI(fs, fonts, options) {

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
            "letterspacing": "letterSpacing",
            "alignment": "text-align"
        },
        blocks = {},
        uifactory = null, // instance of uielements
        input = null, // the tester text field
        originalText = "", // used to store textContent that was in the root node on init
        root = fs.root

    function init() {
        console.debug("Fontsampler.Interface.init()", root, fonts, options)

        dom.nodeAddClass(root, options.classes.rootClass)
        uifactory = UIElements(root, options)

        // The `fontfamily` UI option is just being defined without the options, which
        // are the fonts passed in. Let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui by defining
        // the needed `choices` attribute
        if (options.config.fontfamily && typeof (options.config.fontfamily) === "boolean") {
            options.config.fontfamily = {}
        }
        options.config.fontfamily.choices = fonts.map(function (value) {
            return value.name
        })

        // Before modifying the root node, detect if it is containing only
        // text, and if so, store it to the options for later use
        // NOTE: This currently only extracts single nodes or text, not an
        // entire node tree possible nested in the root node
        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // Clear the slate
        while (root.childNodes.length) {
            root.removeChild(root.childNodes[0])
        }

        // Process the possible nested order arrays in order one by one
        // · Existing DOM nodes will be validated and initiated (TBD drop or check implementation)
        // · UI elements defined via options but missing from the DOM will be created
        // · UI elements defined in ui option but not in order option will be 
        //   appended to the end
        // · Items neither in the DOM nor in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var elementA = parseOrder(options.order[i])
            if (dom.isNode(elementA) && elementA.childNodes.length > 0 && !elementA.isConnected) {
                root.appendChild(elementA)
            }
        }

        // Save the tester for convenience
        input = getElement("tester", blocks.tester)

        if (options.originalText) {
            this.setInputText(options.originalText.trim())
        }
        if ("initialText" in options && options.initialText !== "") {
            this.setInputText(options.initialText.trim())
        }

        // after all nodes are instantiated, update the tester to reflect
        // the current state
        for (var keyC in blocks) {
            if (blocks.hasOwnProperty(keyC)) {
                initBlock(keyC)
            }
        }

        // Set values for configs that are set but do not have a rendered block
        let block_keys = Object.keys(blocks),
            options_without_ui = Object.keys(options.config).filter(k => block_keys.indexOf(k) === -1);

        options_without_ui.forEach(key => {
            // Set the initial value
            setValue(key, options.config[key].init)
        })

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
        blocks.tester.addEventListener('paste', function (e) {
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

        blocks.tester.addEventListener('focusin', function (e) {
            sendEvent(events.focused)
            dom.nodeAddClass(root, options.classes.focusedClass)
        })

        blocks.tester.addEventListener('focusout', function (e) {
            sendEvent(events.blurred)
            dom.nodeRemoveClass(root, options.classes.focusedClass)
        })
    }

    /**
     * Recursively go through an element in the options.order
     * @param string key
     * @param node parent
     */
    function parseOrder(key) {
        var child, wrapper

        if (typeof (key) === "string") {
            var block = createBlock(key)
            blocks[key] = block

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
        } else if (key instanceof HTMLElement) {
            wrapper = document.createElement("div")
            if (key.classList) {
                wrapper.classList = key.classList
                key.className = ""
            }
            wrapper.className += " " + options.classes.blockClass

            if (key.hasAttribute("id")) {
                wrapper.setAttribute("id", key.getAttribute("id"))
                key.removeAttribute("id")
            }
            wrapper.appendChild(key)

            return wrapper
        } else {
            // Skipping not defined UI element
            console.warn("Skipping unspecified order item, not a known Fontsampler JS element nor a valid DOM node: " + key)

            return false
        }
    }

    /**
     * Create a block wrapper and the UI element it contains
     * 
     * @param {string} key 
     */
    function createBlock(key) {
        var block = document.createElement("div"),
            element = false,
            label = false,
            opt = null;

        if (key in options.config === false) {
            console.error("No options defined for block", key)
            return false
        }

        opt = options.config[key]

        if (opt.label) {
            label = uifactory.label(opt.label, opt.unit, opt.init, key)
            block.appendChild(label)
            addLabelClasses(label, key)
        }

        element = createElement(key)

        addElementClasses(element, key)
        addBlockClasses(block, key)

        block.appendChild(element)

        if (label) {
            // Make the label value a some of usable input
            let labelValue = label.querySelector(".fsjs-label-value")
            if (opt.label && labelValue) {
                // Select all on focus
                labelValue.addEventListener("focus", function (e) {
                    window.getSelection().selectAllChildren(e.currentTarget);
                })

                // Limit typing input to apply only when within min max
                labelValue.addEventListener("keyup", function (e) {
                    let val = parseFloat(e.currentTarget.innerText);
                    if (val > opt.min && val < opt.max) {
                        setValue(key, val)
                    }

                })

                // On blur clamp value to winthin min max
                labelValue.addEventListener("blur", function (e) {
                    let val = parseFloat(e.currentTarget.innerText)
                    setValue(key, Math.max(opt.min, Math.min(opt.max, val)))
                })
            }
        }

        return block
    }

    /**
     * Create the actual UI element for a key
     * 
     * @param {string} key 
     */
    function createElement(key) {
        var element

        if (isAxisKey(key)) {
            element = uifactory.slider(key, options.config[key])
        } else {
            element = uifactory[ui[key]](key, options.config[key])
        }
        addElementClasses(element, key)

        return element
    }

    /**
     * Make sure a UI wrapper block has the classes and attributes
     * expected
     * 
     * @param {node} block 
     * @param {string} key 
     */
    function addBlockClasses(block, key) {
        var type = ui[key]
        if (isAxisKey(key)) {
            type = "slider"
        }
        var classes = [
            options.classes.blockClass,
            options.classes.blockClass + "-" + key,
            options.classes.blockClass + "-type-" + type
        ]
        if (isAxisKey(key)) {
            classes.push(options.classes.blockClassAxis)
        }

        if (key in options.config && "classes" in options.config[key]) {
            classes.push(options.config[key].classes)
        }

        dom.nodeAddClasses(block, classes)
        block.dataset.fsjsBlock = key
    }

    /**
     * Make sure a UI element has the classes and attributes expected
     * 
     * @param {node} element 
     * @param {string} key 
     */
    function addElementClasses(element, key) {
        try {
            var type = ""
            if (isAxisKey(key)) {
                type = "slider"
            } else {
                type = ui[key]
            }
            element = uifactory[type](key, options.config[key], element)

            dom.nodeAddClass(element, options.classes.elementClass)

            element.dataset.fsjs = key
            element.dataset.fsjsUi = type
        } catch (e) {
            console.warn("Failed in addElementClasses()", element, key, e)
        }
    }

    /**
     * If a UI element has a label, make sure it conforms to the DOM structure
     * and attributes expected of it
     * 
     * @param {node} label 
     * @param {string} key 
     */
    function addLabelClasses(label, key) {
        var text = label.querySelector("." + options.classes.labelTextClass),
            value = label.querySelector("." + options.classes.labelValueClass),
            unit = label.querySelector("." + options.classes.labelUnitClass),
            element = getElement(key)

        if (dom.isNode(text) && text.textContent === "") {
            text.textContent = options.config[key].label
        }

        if (dom.isNode(value) && ["slider"].indexOf(ui[key]) === -1) {
            value.textContent = ""
        }

        if (dom.isNode(value) && value && value.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            value.textContent = element.value
        }

        if (dom.isNode(unit) && unit && unit.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            unit.textContent = element.dataset.unit
        }

        dom.nodeAddClass(label, options.classes.labelClass)
        label.dataset.fsjsFor = key
    }

    /**
     * Init a UI element with values (update DOM to options)
     * 
     * @param {node} node 
     * @param {object} opt 
     * @return boolean
     */
    function initBlock(key) {
        // TODO set values if passed in and different on node
        var block = getBlock(key),
            element = getElement(key, block),
            type = ui[key],
            opt = options.config[key]

        if (!block) {
            return
        }

        if (type === "slider" || isAxisKey(key)) {
            setValue(key, opt.init)
            element.addEventListener("change", onSlide)
        } else if (type === "dropdown") {
            element.addEventListener("change", onChange)
            setValue(key, opt.init)
        } else if (type === "buttongroup") {
            var buttons = element.querySelectorAll("[data-choice]")
            if (buttons.length > 0) {
                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].addEventListener("click", onClick)
                    if (buttons[b].dataset.choice === options.config[key].init) {
                        dom.nodeAddClass(buttons[b], options.classes.buttonSelectedClass)
                    } else {
                        dom.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
                    }
                }
            }
            setValue(key, options.config[key].init)
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
        }

        return true
    }

    function isAxisKey(key) {
        return Object.keys(options.config).indexOf(key) !== -1 && String(key).length === 4
    }

    function getAxisKeys() {
        // Get all config keys which are not present in defaults and look like
        // axis keys (4 letter)
        var defaultKeys = Object.keys(defaults.config),
            allKeys = Object.keys(options.config),
            axisKeys = []

        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i]
            if (defaultKeys.indexOf(key) === -1 && isAxisKey(key)) {
                axisKeys.push(key)
            }
        }

        return axisKeys
    }

    function getDefaultVariations() {
        let variations = {}

        axes = getAxisKeys()
        if (axes.length === 0) {
            return {}
        }
        for (let a in axes) {
            const axis = axes[a]
            if (axis in options.config) {
                const opt = options.config[axis];

                if ("init" in opt) {
                    variations[axis] = opt.init
                } else if ("min" in opt) {
                    variations[axis] = opt.min
                } else if ("max" in opt) {
                    variations[axis] = opt.max
                } else {
                    variations[axis] = 0
                }
            }
        }
        return variations
    }

    function getElement(key, node) {
        if (typeof (node) === "undefined" || key in ui === false) {
            node = root
        }
        var element = root.querySelector("[data-fsjs='" + key + "']")

        return dom.isNode(element) ? element : false
    }

    function getBlock(key, node) {
        if (typeof (node) === "undefined" || key in ui === false) {
            node = root
        }
        var block = root.querySelector("[data-fsjs-block='" + key + "']")

        return dom.isNode(block) ? block : false
    }

    /**
     * Internal event listeners reacting to different UI element’s events
     * and passing them on to trigger the appropriate changes
     */
    function onChange(e) {
        setValue(e.target.dataset.fsjs, e.target.value)
    }

    function onSlide(e) {
        try {
            setValue(e.target.dataset.fsjs)
        } catch (e) {
            console.warn("Could not set slider value:", e)
        }
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
                dom.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
            }
            dom.nodeAddClass(e.currentTarget, options.classes.buttonSelectedClass)
            setValue(property, e.currentTarget.dataset.choice)
        }
    }

    function sendEvent(type, opt) {
        if (typeof (opt) === "undefined") {
            var opt = {}
        }
        opt.fontsampler = fs
        root.dispatchEvent(new CustomEvent(type, { detail: opt }))
    }

    function sendNativeEvent(type, node) {
        console.debug("sendNativeEvent", type, node)
        if (!type || !node) {
            console.error("Fontsampler.ui.sendNativeEvent: type or node not defined", type, node)
            return
        }
        // TODO maybe have fallback for deprecated Event.init way of sending
        // native browser events?
        node.dispatchEvent(new Event(type))
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

        var axes = getAxisKeys(),
            input,
            va = {};

        if (axes) {
            for (var v = 0; v < axes.length; v++) {
                input = getElement(axes[v])
                if (!input) {
                    console.warn("No axis element found for:", axes[v])
                } else {
                    va[input.dataset.fsjs] = input.value
                }
            }
        }

        if (typeof (axis) === "string" && axis in va) {
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

    function _updateSlider(key, value) {
        if (isNaN(value)) {
            return
        }
        var element = getElement(key)
        if (parseFloat(element.value) !== parseFloat(value)) {
            element.value = value
            sendNativeEvent("change", element)
        }
    }

    function setValue(key, value) {
        console.debug("Fontsampler.ui.setValue()", key, value)
        var element = getElement(key),
            has_ui = Object.keys(blocks).indexOf(key) !== -1;

        switch (key) {
            case "fontsize":
            case "lineheight":
            case "letterspacing":
                if (typeof (value) === "undefined") {
                    // no value means get and use the element value
                    value = getValue(key)
                } else {
                    // if a value was passed in check if it is within bounds,
                    // valid and if the slider needs an update (via native event)
                    value = utils.clamp(value, options.config[key].min,
                        options.config[key].max, options.config[key].init)

                }

                if (parseFloat(element.value) !== parseFloat(value) &&
                    has_ui) {
                    // Trigger native input element change only if this is an
                    // config value that has a UI rendered
                    sendNativeEvent("change", element)
                }

                if (has_ui) {
                    // Trigger UI change only if this is an
                    // config value that has a UI rendered
                    _updateSlider(key, value)
                    setLabelValue(key, value)
                }

                setInputCss(keyToCss[key], value + options.config[key].unit)
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
                sendEvent(events.fontChanged, { font: value })
                break;

            case "alignment":
                setInputCss(keyToCss[key], value)
                break;

            case "direction":
                setInputAttr("dir", value)
                break;

            case "tester":
                break;

            default:
                if (isAxisKey(key)) {
                    var updateVariation = {}

                    // onSlide triggers an update of just the axis without
                    // value to propagate Skin interaction, so on "first" call
                    // this should use the init value, if existing, otherwise
                    // simply "set" the current value of the axis slider
                    if (typeof (value) === "undefined") {
                        value = element.value
                    }

                    if (typeof (value) !== "object") {
                        updateVariation[key] = value
                    }

                    for (var axis in updateVariation) {
                        if (updateVariation.hasOwnProperty(axis)) {
                            val = setVariation(key, updateVariation[axis],
                                has_ui)
                        }
                    }
                }
                break;
        }
        var obj = {}
        obj[key] = value
        sendEvent(events.valueChanged, obj)
    }

    /**
     * Update a single variation axis and UI
     */
    function setVariation(axis, val, has_ui) {
        console.debug("Fontsampler.ui.setVariation()", axis, val)
        var v = getVariation(),
            opt = null,
            has_ui = typeof (has_ui) === "undefined" ? true : !!has_ui;

        if (isAxisKey(axis)) {
            // TODO refactor to: getAxisOptions() and also use
            // it on axis setup / options parsing
            opt = getAxisOptions(axis)
            v[axis] = utils.clamp(val, opt.min, opt.max)

            if (has_ui) {
                _updateSlider(axis, v[axis])
                setLabelValue(axis, v[axis])
            }
            setInputVariation(v)

            return v[axis]
        }
    }

    function getAxisOptions(axis) {
        opt = options.config[axis]
        if (!opt || typeof (opt) === "undefined") {
            opt = {
                min: 100,
                max: 900
            }
        }

        if (typeof (opt.min) === "undefined") {
            opt.min = 100
        }
        if (typeof (opt.max) === "undefined") {
            opt.max = 900
        }
        return opt
    }

    // /**
    //  * Bulk update several variations from object
    //  * 
    //  * @param object vals with variation:value pairs 
    //  */
    // function setVariations(vals) {
    //     if (typeof(vals) !== "object") {
    //         return false
    //     }

    //     for (var axis in vals) {
    //         if (vals.hasOwnProperty(axis)) {
    //             setVariation(axis, vals[axis])
    //         }
    //     }
    // }

    function fontIsInstance(variation, fontname) {
        if (typeof (variation) !== "object") {
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
                if (JSON.stringify(vars) === JSON.stringify(variation) &&
                    fontname === f.name) {
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
            if (features.hasOwnProperty(key) && key && typeof (key) !== "undefined") {
                parsed.push('"' + key + '" ' + (features[key] ? "1" : "0"))
            }
        }
        val = parsed.join(",")

        input.style["font-feature-settings"] = val
    }

    function variationCssToObject(css) {
        // console.log("variationCssToObject", css)
        if (!css) {
            return {}
        }
        let parts = [],
            obj = {};

        if (css.indexOf(",") === -1) {
            parts = [css]
        } else {
            parts = css.split(",")
        }

        parts.forEach((p) => {
            // remove all quotes
            p = p.replace(/'|"/gm, "")

            // get first 4 letters
            let axis = p.match(/([A-z]{4})/)[0]

            // get numeric value
            let value = p.replace(/[^\-0-9.,]*/, "")

            obj[axis] = value
        })

        return obj
    }

    function variationObjectToCss(obj) {
        let values = []
        Object.keys(obj).forEach((axis) => {
            values.push("'" + axis + "' " + obj[axis])
        })
        return values.join(", ")
    }

    function getInputVariations(node) {
        let cs = getComputedStyle(node),
            current = variationCssToObject(cs.getPropertyValue("font-variation-settings"));

        delete current["norm"]

        return current;
    }

    function setInputVariation(variations) {
        var parsed = []

        // Whatever the passed in variations, make sure to also default values
        // for any axes not passed in.
        const defaults = getDefaultVariations()
        console.log("defaults", defaults)
        const current = getInputVariations(input)
        console.log("current", current)
        const merged = Object.assign(defaults, current, variations)

        // Now loop all variations, defaults and passed in ones, and compile
        // a CSS string
        for (var key in merged) {
            if (merged.hasOwnProperty(key) && key && typeof (key) !== "undefined") {
                parsed.push('"' + key + '" ' + (merged[key]))
            }
        }
        val = parsed.join(",")

        console.log("VAL", val, input, variations)

        input.style["font-variation-settings"] = val

        // Update fontfamily select if it exists
        // When a variable font is updated check if the selected values
        // match a defined instance, and if set it active in the font family
        if (dom.isNode(blocks.fontfamily)) {
            var fontname = getElement("fontfamily", blocks.fontfamily).value
            var instanceFont = fontIsInstance(variations, fontname)
            if (instanceFont === false) {
                dom.nodeAddClass(blocks.fontfamily, options.classes.disabledClass)
            } else {
                dom.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)
                var element = getElement("fontfamily"),
                    option

                if (element.value !== instanceFont.name) {
                    option = element.querySelector("option[value='" + instanceFont.name + "']")
                    if (dom.isNode(option)) {
                        option.selected = true
                    }
                    element.value = instanceFont.name
                }
            }
        }
    }

    function setActiveFont(name) {
        if (dom.isNode(blocks.fontfamily)) {
            var element = getElement("fontfamily", blocks.fontfamily),
                option

            dom.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)

            if (dom.isNode(element)) {
                // Only update if it is not the selected fontfamily value
                if (element.value !== name) {
                    option = element.querySelectorAll("option[value='" + name + "']")
                    if (dom.isNode(option)) {
                        option.selected = true
                    }
                    element.value = name
                    sendNativeEvent("change", element)
                }
            }
        }
    }

    function setActiveAxes(axes) {
        if (dom.isNode(blocks.variation)) {
            var sliders = blocks.variation.querySelectorAll("[data-axis]")

            if (sliders) {
                for (var s = 0; s < sliders.length; s++) {
                    if (!Array.isArray(axes) || axes.length < 1 ||
                        axes.indexOf(sliders[s].dataset.axis) === -1 ||
                        supports.woff2 === false ||
                        supports.variableFonts === false
                    ) {
                        dom.nodeAddClass(sliders[s].parentNode, options.classes.disabledClass)
                    } else {
                        dom.nodeRemoveClass(sliders[s].parentNode, options.classes.disabledClass)
                    }
                }
            }
        }
    }

    function setActiveLanguage(lang) {
        if (dom.isNode(blocks.language) && typeof (lang) === "string") {
            var languageChoices = options.config.language.choices.map(function (value) {
                return value.split("|")[0]
            })

            if (languageChoices.length !== -1) {
                var option = blocks.language.querySelector("option[value='" + lang + "']")

                if (dom.isNode(option)) {
                    // Trigger the change on the native input
                    blocks.language.value = lang
                    option.selected = true
                    sendNativeEvent("change", blocks.language)

                    sendEvent(events.languageChanged)
                }
            }
        }
    }

    function setActiveOpentype(features) {
        var checkboxes = false

        if (dom.isNode(blocks.opentype)) {
            checkboxes = blocks.opentype.querySelectorAll("[data-feature]")
        }
        if (checkboxes) {
            for (var c = 0; c < checkboxes.length; c++) {
                if (Array.isArray(features)) {
                    if (features.indexOf(checkboxes[c].dataset.feature) === -1) {
                        dom.nodeAddClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    } else {
                        dom.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    }
                } else {
                    dom.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                }
            }
        }
    }

    function setInputText(text) {
        if (text && input) {
            input.innerHTML = text
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
            dom.nodeAddClass(root, classString)
        } else if (status === false) {
            dom.nodeRemoveClass(root, classString)
        }
    }

    function setFontClass(classString) {
        if (input.dataset.fontClass) {
            dom.nodeRemoveClass(input, input.dataset.fontClass)
        }
        if (classString) {
            input.dataset.fontClass = classString
            dom.nodeAddClass(input, classString)
        }
    }

    return {
        init: init,
        getValue: getValue,
        setValue: setValue,

        getCssValue: getCssValue,
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getVariation: getVariation,
        getCssAttrForKey: getCssAttrForKey,
        getKeyForCssAttr: getKeyForCssAttr,
        setInputCss: setInputCss,
        // setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        // setInputVariation: setInputVariation,
        setInputText: setInputText,
        setFontClass: setFontClass,

        setStatusClass: setStatusClass,

        setActiveFont: setActiveFont,
        setActiveAxes: setActiveAxes,
        setActiveLanguage: setActiveLanguage,
        setActiveOpentype: setActiveOpentype,
        setLabelValue: setLabelValue,

        isAxisKey: isAxisKey,

        sendEvent: sendEvent,
        sendNativeEvent: sendNativeEvent
    }
}
module.exports = UI
},{"./constants/defaults":3,"./constants/events":5,"./helpers/dom":8,"./helpers/selection":10,"./helpers/supports":11,"./helpers/utils":12,"./uielements":15}],15:[function(_dereq_,module,exports){
var helpers = _dereq_("./helpers/helpers")
var dom = _dereq_("./helpers/dom")

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

        if (labelText === false) {
            return false
        }

        label.dataset.fsjsFor = relatedInput
        dom.nodeAddClass(label, options.classes.labelClass)

        text.className = options.classes.labelTextClass
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (labelValue !== "") {
            val = document.createElement("span")
            val.className = options.classes.labelValueClass
            val.contentEditable = true
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)

            // Register event propagation for the editable value
            // val.addEventListener("keyup", function () {
            //     console.log("label val keyup", val.innerText)
            //     label.dispatchEvent(new Event("keyup"))
            // })
            // val.addEventListener("blur", function () {
            //     console.log("label val blur", val.innerText)
            //     label.dispatchEvent(new Event("blur"))
            // })
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
        var input = dom.isNode(node) ? node : document.createElement("input")

        var attributes = {
            type: "range",
            min: opt.min,
            max: opt.max,
            value: opt.init,
            step: opt.step
        }

        input.setAttribute("autocomplete", "off")
        setMissingAttributes(input, attributes)

        if (typeof(input.value) === "undefined") {
            input.value = opt.init
            input.setAttribute("value", opt.init)
        }

        if ("unit" in input.dataset === false) {
            input.dataset.unit = opt.unit
        }
        if ("init" in input.dataset === false) {
            input.dataset.init = opt.init
        }

        // only main element get the data-fsjs; key missing means this is 
        // a nested slider
        if (key) {
            input.dataset.fsjs = key
        }

        return input
    }

    function dropdown(key, opt, node) {
        var dropdown = dom.isNode(node) ? node : document.createElement("select")
        if ("choices" in opt === false || opt.choices.length < 1) {
            return false
        }

        for (var c = 0; c < opt.choices.length; c++) {
            var choice = helpers.parseParts(opt.choices[c]),
                option = dropdown.querySelector("option[value='" + choice.val + "']")

            if (!dom.isNode(option)) {
                option = document.createElement("option")
                option.appendChild(document.createTextNode(choice.text))
                dropdown.appendChild(option)
            }

            option.value = choice.val

            if ("init" in opt && opt.init === choice.text) {
                option.selected = true
                dropdown.value = option.value
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
            dom.nodeAddClass(options.classes.buttonClass)
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
        label: label,
        textfield: textfield,
        buttongroup: buttongroup,
        checkboxes: checkboxes
    }
}

module.exports = UIElements
},{"./helpers/dom":8,"./helpers/helpers":9}]},{},[7])(7)
});
