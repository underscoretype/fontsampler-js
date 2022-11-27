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
        wght: {
            init: 400,
            min: 250,
            max: 900,
            step: 10,
            label: "Weight",
        }
    }
}
