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