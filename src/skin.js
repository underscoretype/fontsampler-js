var rangeSlider = require("../node_modules/rangeslider-pure/dist/range-slider")
var Choices = require("../node_modules/choices.js/public/assets/scripts/choices")
var events = require("./events")
var helpers = require("./helpers")

function Skin(FS) {
    
    FS.registerEventhandler(events.init, init)

    function init() {
        console.log("Skin.init()", FS, FS.initialized)

        if (FS.initialized === true) {
            console.error(FS.root)
            throw new Error("FontsamplerSkin: Cannot apply skin to a Fontsampler that is already initialized.")
        }

        FS.root.className = helpers.addClass("fontsampler-skin", FS.root.className)

        var rangeInputs = FS.root.querySelectorAll("input[type=range][data-property]")
        if (rangeInputs.length) {
            rangeSlider.create(rangeInputs, {
                polyfill: true,
                onSlide: updateSlider,
                onSlideEnd: updateSlider
            })
        }

        var selectInputs = FS.root.querySelectorAll("select[data-property]")
        if (selectInputs.length) {
            for (var i in selectInputs) {
                if (selectInputs.hasOwnProperty(i)) {
                    var element = selectInputs[i]
                    new Choices(element, {
                        searchEnabled: false,
                        searchChoices: false,
                        maxItemCount: 1,
                        itemSelectText: "",
                    })
                }

            }
        }
    }

    function updateSlider(position /*, value*/) {
        var property = this.element.dataset.property,
            label = this.element.parentNode.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        FS.root.dispatchEvent(new CustomEvent("fontsampler.on" + property + "changed"))

        if (label) {
            label.textContent = position
        }
    }

}

module.exports = Skin 