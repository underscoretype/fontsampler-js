(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fontsampler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],2:[function(require,module,exports){
var FontFaceObserver = require("../node_modules/fontfaceobserver/fontfaceobserver.standalone")

// supportsWoff2 manually copied from npm woff2-feature-test
var supportsWoff2 = (function() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
})();
  
function bestWoff(woff, woff2) {
    return woff2 && supportsWoff2 ? woff2 : woff
}

function loadFont(file, callback) {
    console.log("LOAD FONT", file, file.lastIndexOf("/"))
    if (!file) {
        return
    }
    try {
        var family = file.substring(file.lastIndexOf("/") + 1)
        family = family.substring(0, family.lastIndexOf("."))
        family = family.replace(/\W/gm, "")

        console.log("family", family)

        var font = new FontFaceObserver(family)
        font.load().then(function (f) {
            console.log("f", f)
            if (typeof(callback) === "function") {
                callback(f)
            }
        })

        if (FontFace) {
            var ff = new FontFace(family, "url(" + file + ")")
            ff.load()
            document.fonts.add(ff)
        } else {
            var newStyle = document.createElement("style");
            newStyle.appendChild(document.createTextNode("@font-face { font-family: '" + family + "'; src: url('" + file + "'); }"));
            document.head.appendChild(newStyle);
        }
    } catch (e) {
        console.log(e)
    }
}

function fromFiles(files, callback) {
    // TODO bestWoff expects a choice from 2 files, woff and woff2, but this isn't enforced in any way
    font = bestWoff(files[0], files[1])
    console.log("load font from data", font)
    loadFont(font, function (f) {
        if (typeof callback === "function") {
            callback(f)
        }
    })
}

// function fromData($element, callback) {
//     font = bestWoff($element.data("woff"), $element.data("woff2"))
//     console.log("load font from data", font)
//     loadFont(font, function (f) {
//         if (typeof callback === "function") {
//             callback(f, $element)
//         }
//     })
// }

module.exports = {
    "loadFont": loadFont,
    // "fromData": fromData,
    "fromFiles": fromFiles
}
},{"../node_modules/fontfaceobserver/fontfaceobserver.standalone":1}],3:[function(require,module,exports){
// var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var fontloader = require("./fontloader")
var Interface = require("./interface")

function Fontsampler($, $elem, options) {

    var defaults = {
        fontsize: {
            selector: ".fontsampler-fontsize",
            min: "12",
            max: "96",
            init: "18",
            unit: "px",
            label: "Size"
        },
        lineheight: {
            selector: ".fontsampler-lineheight",
            min: "60",
            max: "120",
            init: "100",
            unit: "%",
            label: "Leading"
        },
        letterspacing: {
            selector: ".fontsampler-letterspacing",
            min: "-1",
            max: "1",
            unit: "em",
            init: "0",
            label: false
        },
        fontfamily: {
            selector: ".fontsampler-fontfamily",
            label: false
        },
        fonts: {
            "Alegreya Italic": ["./alegreya-italic-webfont.woff", "./alegreya-italic-webfont.woff2"],
            "Abril Fat Face": ["./abrilfatface-regular-webfont.woff"]
        }
    }

    var interface = Interface(),
        root = document.querySelector("#demo"),
        input = root.querySelector(".fontsampler-input")

    interface.init(root, defaults)

    root.addEventListener("fontsampler.onfontsizechanged", function () {
        var val = interface.getCSSValue("fontsize")
        console.log("setFontsize", val, input)
        input.style.fontSize = val
    })

    root.addEventListener("fontsampler.onfontfamilychanged", function () {
        var val = interface.getValue("fontfamily")
        console.log("fontFamily", val, "files:", defaults.fonts[val])
        fontloader.fromFiles(defaults.fonts[val], function (f) {
            input.style.fontFamily = f.family
        })
    })

    //TMP load first font
    root.querySelector("[data-property='fontfamily']").dispatchEvent(new Event("change"))
    

    function init() {
        
    }

    // interface
    return {
        init: init
    }
}

module.exports = Fontsampler
},{"./fontloader":2,"./interface":4}],4:[function(require,module,exports){
function Interface() {

    var types = {
        "fontsize": "slider",
        "lineheight": "slider",
        "letterspacing": "slider",
        "fontfamily": "dropdown"
    },
    root = null

    function init(_root, options) {
        console.log("init interface on", root, "with options", options)

        root = _root

        for (key in options) {
            setupElement(options[key], options)
        }
    }

    function setupElement(opt, allOpt) {
        var element = root.querySelector(opt.selector)

        if (element) {
            // TODO determine if to set init values, data-property etc.
            console.log("SKIP EXISTING DOM ELEMENT", key)
        } else {
            if (types[key] === "slider") {
                if (opt["label"]) {
                    root.append(generateLabel(opt["label"], opt["unit"], opt["init"], key))
                }
                element = generateSlider(key, opt)
                root.append(element)
            } else if (types[key] === "dropdown") {
                element = generateDropdown(key, opt, allOpt.fonts)
                root.append(element)
            }
        }

        if (element) {
            element.addEventListener("change", onChange)
        }

        return false
    }

    function generateLabel(labelText, labelUnit, labelValue, relatedInput) {
        var label = document.createElement("label")
        label.setAttribute("for", relatedInput)
        label.appendChild(document.createTextNode(labelText))

        var display = document.createElement("span")
            display.className = "value"
            display.appendChild(document.createTextNode(labelValue + " " + labelUnit))
            label.appendChild(display)

        return label
    }

    function generateSlider(key, opt) {
        var input = document.createElement("input")

        input.setAttribute("type", "range")
        input.setAttribute("min", opt.min)
        input.setAttribute("max", opt.max)
        input.setAttribute("step", 1)
        // input.setAttribute("class", opt.selector)
        input.dataset.property = key
        input.setAttribute("autocomplete", "off")
        if (opt.unit) { 
            input.dataset.unit = opt.unit
        }

        return input
    }

    function generateDropdown(key, opt, fonts) {
        var dropdown = document.createElement("select")

        dropdown.setAttribute("value", name)
        // dropdown.setAttribute("class", opt.selector)
        dropdown.dataset.property = key

        console.log("DROPDOWN", fonts)

        for (name in fonts) {
            var option = document.createElement("option")

            option.appendChild(document.createTextNode(name))
            dropdown.appendChild(option)
        }

        return dropdown
    }

    function onChange(e) {
        console.log("change", e)
        console.log(e.currentTarget.dataset.property)

        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .value")

        if (label) {
            label.innerText = getCSSValue(property)
        }

        root.dispatchEvent(customEvent)
    }

    function getValue(property) {
        console.log("getValue", property)
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value
    }

    function getCSSValue(property) {
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value + element.dataset.unit
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue
    }
}

module.exports = Interface
},{}]},{},[2,3])(3)
});