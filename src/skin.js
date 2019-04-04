var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var Choices = require("../node_modules/choices.js/public/assets/scripts/choices")
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

        var rangeInputs = FS.root.querySelectorAll("input[type=range][data-fsjs]")
        if (rangeInputs.length) {
            rangeSlider.create(rangeInputs, {
                polyfill: true,
                onSlide: updateSlider,
                onSlideEnd: updateSlider
            })
        }

        var selectInputs = FS.root.querySelectorAll("select[data-fsjs]")
        if (selectInputs.length) {
            for (var i in selectInputs) {
                if (selectInputs.hasOwnProperty(i)) {
                    var element = selectInputs[i]
                    new Choices(element, {
                        searchEnabled: false,
                        searchChoices: false,
                        maxItemCount: 1,
                        itemSelectText: "",
                        shouldSort: false,
                        shouldSortItems: false
                    })
                }

            }
        }
    }

    function updateSlider(position /*, value*/) {
        var key = this.element.dataset.fsjs,
            label = FS.root.querySelector("[data-fsjs-for='" + key + "'] .fsjs-label-value")

        FS.root.dispatchEvent(new CustomEvent("fontsampler.on" + key + "changed"))

        if (label) {
            label.textContent = position
        }
    }

}

module.exports = Skin 