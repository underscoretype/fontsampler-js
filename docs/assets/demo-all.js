/*
 * A Fontsampler example using all UI elements
 */
window.addEventListener("load", function () {

    var fonts = [
        {
            "name": "Work Sans Thin",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 250 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans ExtraLight",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 275 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans Light",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 300 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans Regular",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 400 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans Medium",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 500 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans SemiBold",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 600 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans Bold",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 700 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans ExtraBold",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 800 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Work Sans Black",
            "files": ["./fonts/work-sans/WorkSans-Roman-VF.woff2"],
            "instance": { wght: 900 },
            "language": "en-GB",
            "features": ["rlig", "calt"]
        },
        {
            "name": "Inter Text Thin",
            "files": ["./fonts/inter/InterVariable.woff2"],
            "instance": { wght: 100, opsz: 14}
        },
        {
            "name": "Inter Display Black",
            "files": ["./fonts/inter/InterVariable.woff2"],
            "instance": { wght: 900, opsz: 32}
        },
        {
            "name": "Alegreya Regular", 
            "files": ["./fonts/alegreya/alegreya-v12-latin-regular.woff"],
            "features": ["liga", "dlig"],
            "language": "en-gb"
        }, 
        { 
            "name": "Alegreya Italic", 
            "files": ["./fonts/alegreya/alegreya-v12-latin-italic.woff"],
            "features": ["liga", "dlig"],
            "language": "en-gb"
        }
    ]

    var options = {

        multiline: true,

        lazyload: true,

        order: [
            ["fontsize", "lineheight", "letterspacing", "wght"],
            ["fontfamily", "language", ],
            ["alignment", "direction", "opentype"],
            "tester"
        ],

        // Definitions for each UI element
        // Any nested element can also be only partially defined, which will make it inherit
        // the rest of its configuration from the defaults
        config: {

            // The actual input element for testing the webfonts
            tester: {
                // Set’s the contenteditable attribute
                editable: true,

                // The tester has it’s label disabled by default
                label: false
            },

            // The font-size slider
            fontsize: {
                // Any CSS unit is valid (e.g. px, em, %, etc.)
                unit: "px",

                init: 48,
                min: 12,
                max: 96,
                step: 1,

                // The text label to render for the element, set any label to false
                // to disable rendering that label altogether
                label: "Size"
            },

            // The line-height slider
            lineheight: {
                unit: "%",
                init: 100,
                min: 60,
                max: 120,
                step: 5,
                label: "Leading"
            },

            // The letter-spacing slider
            letterspacing: {
                unit: "em",
                init: 0,
                min: -0.1,
                max: 0.1,
                step: 0.001,
                label: "Letterspacing"
            },

            // The drop-down for picking fonts
            fontfamily: {
                label: "Font",

                // Supply the exact name of the Font (fontname, not file!) to be selected
                // and loaded first, by default the first font passed in
                init: ""
            },

            // The set of buttons controlling alignment
            alignment: {
                // Choices can an Array of strings used both as value and display label
                // or the strings are separated by | to use as value|Display label
                choices: ["left|Left", "center|Centered", "right|Right"],

                // Has to be one of the above choices
                init: "center",

                label: "Alignment"
            },

            // The script direction, options like alignment
            direction: {
                choices: ["ltr|Left to right", "rtl|Right to left"],
                init: "ltr",
                label: "Direction"
            },

            // The language dropdown setting the html lang attribute, thus triggering
            // opentype locl features
            language: {
                choices: ["enGB|English", "deDe|Deutsch", "nlNL|Dutch", "arAR|Arabic"],
                init: "enGb",
                label: "Language"
            },

            // A set of checkboxes; NOTE: No validation whatsoever if the font
            // supports these opentype features
            opentype: {
                choices: ["liga|Ligatures", "frac|Fractions"],
                init: ["liga"],
                label: "Opentype features"
            },

            // Variable fonts note: Add any axis tag for which to configure a
            // slider as element, e.g.
            wght: {
                init: 600,
                min: 250,
                max: 900,
                step: 10,
                label: "Weight",
            }
        },
    }
    
    var fs = new Fontsampler(document.getElementById("demo-all"), fonts, options)
    fs.addEventListener("fontsampler.events.valuechanged", function (e) {
        console.debug("valuechanged event triggered", e.detail)
    })
    FontsamplerSkin(fs)
    fs.init()
})
