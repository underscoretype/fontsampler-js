var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var Dropkick = require("../node_modules/dropkickjs/dist/dropkick").default
var events = require("./constants/events")
var dom = require("./helpers/dom")

function Skin(FS) {

    FS.root.addEventListener(events.init, init)

    function init() {
        console.debug("Skin.init()", FS)

        if (FS.initialized === true) {
            console.error(FS.root)
            throw new Error("FontsamplerSkin: Cannot apply skin to a Fontsampler that is already initialized.")
        }

        dom.nodeAddClass(FS.root, "fsjs-skin")

        var rangeInputs = FS.root.querySelectorAll("input[type=range][data-fsjs-ui='slider']")
        if (rangeInputs.length) {
            rangeSlider.create(rangeInputs, {
                polyfill: true,
                // utilise the more granular events offered by the skin
                // default html range inputs only trigger on change
                onSlide: updateSlider,
                onSlideEnd: updateSlider
            })
        }

        var selectInputs = FS.root.querySelectorAll("select[data-fsjs-ui='dropdown']")
        var dropdowns = []
        if (selectInputs.length) {
            for (var i = 0; i < selectInputs.length; i++) {
                var dropdown = new Dropkick(selectInputs[i], {
                    mobile: true
                })
                dropdowns.push(dropdown)
                
                // listen for and trigger updates on native change event on select
                selectInputs[i].dataset.i = i
                selectInputs[i].addEventListener("change", function () {
                    dropdowns[this.dataset.i].refresh()
                })
            }
        }

        // Provide a hook for when the UI has finished setting up
        FS.root.dispatchEvent(new CustomEvent(events.skinInit, {
            detail: {
                fontsampler: FS
            }
        }))
    }

    function updateSlider(position /*, value*/ ) {
        var key = this.element.dataset.fsjs,
            opt = {};

        // Catch special case for variable font axis sliders
        if (typeof(key) === "undefined") {
            key = this.element.dataset.axis
            opt[key] = position
            FS.setValue("variation", opt)
        } else {
            FS.setValue(key, position)
        }
    }

}

module.exports = Skin