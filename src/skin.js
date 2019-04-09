var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var Dropkick = require("../node_modules/dropkickjs/dist/dropkick").default
var events = require("./events")
var helpers = require("./helpers")

function Skin(FS) {

    FS.registerEventhandler(events.init, init)

    function init() {
        console.debug("Skin.init()", FS, FS.initialized)

        if (FS.initialized === true) {
            console.error(FS.root)
            throw new Error("FontsamplerSkin: Cannot apply skin to a Fontsampler that is already initialized.")
        }

        helpers.nodeAddClass(FS.root, "fsjs-skin")

        var rangeInputs = FS.root.querySelectorAll("input[type=range][data-fsjs-slider]")
        if (rangeInputs.length) {
            rangeSlider.create(rangeInputs, {
                polyfill: true,
                // utilise the more granular events offered by the skin
                // default html range inputs only trigger on change
                onSlide: updateSlider,
                onSlideEnd: updateSlider
            })
        }

        var selectInputs = FS.root.querySelectorAll("select[data-fsjs]")
        if (selectInputs.length) {
            for (var i in selectInputs) {
                if (selectInputs.hasOwnProperty(i)) {
                    new Dropkick(selectInputs[i], {
                        mobile: true
                    })
                }

            }
        }
    }

    function updateSlider(position /*, value*/ ) {
        var key = this.element.dataset.fsjs,
            eventKey = key,
            label

        // Catch special case for variable font axis sliders
        if (typeof(key) === "undefined") {
            key = this.element.dataset.axis
            eventKey = "variation"
        }

        label = FS.root.querySelector("[data-fsjs-for='" + key + "'] .fsjs-label-value")

        FS.root.dispatchEvent(new CustomEvent("fontsampler.on" + eventKey + "changed"))

        if (label) {
            label.textContent = position
        }
    }

}

module.exports = Skin