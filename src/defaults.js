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
            label: false
        },
        fontfamily: {
            label: "Font",
            init: ""
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
            choices: ["en-GB|English", "de-De|Deutsch", "nl-NL|Dutch"],
            init: "en-Gb",
            label: "Language"
        },
        opentype: {
            choices: ["liga|Ligatures", "frac|Fractions"],
            init: ["liga"],
            label: "Opentype features"
        }
    }
}
