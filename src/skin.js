const Dropkick = require("../node_modules/dropkickjs/dist/dropkick").default
const events = require("./constants/events")
const dom = require("./helpers/dom")
const utils = require("./helpers/utils")

function Skin(FS) {

    FS.root.addEventListener(events.init, init)

    function init() {
        console.debug("Skin.init()", FS)

        if (FS.initialized === true) {
            console.error(FS.root)
            throw new Error("FontsamplerSkin: Cannot apply skin to a Fontsampler that is already initialized.")
        }

        dom.nodeAddClass(FS.root, "fsjs-skin")

        const rangeInputs = FS.root.querySelectorAll("input[type=range][data-fsjs-ui='slider']")
        if (rangeInputs.length) {
            // rangeSlider.create(rangeInputs, {
            //     polyfill: true,
            //     // utilise the more granular events offered by the skin
            //     // default html range inputs only trigger on change
            //     onSlide: updateSlider,
            //     onSlideEnd: updateSlider
            // })
            rangeInputs.forEach(slider => {
                let mouseDown = false;

                slider.addEventListener("mousedown", function () {
                    mouseDown = true
                })

                slider.addEventListener("mouseup", function () {
                    mouseDown = false
                })

                slider.addEventListener("mousemove", function (e) {
                    if (!mouseDown) {
                        return
                    }

                    const w = slider.getBoundingClientRect().width,
                        x = Math.max(0, Math.min(w, e.layerX)),
                        percent = x / w,
                        min = parseFloat(slider.min),
                        max = parseFloat(slider.max),
                        step = parseFloat(slider.step),
                        step_decimals = utils.countDecimals(slider.step),
                        range = min < max ? max - min : min - max;
                        
                        let key = slider.dataset.fsjs,
                            value;

                        value = Math.round((min + (percent * range)) / step) * step;

                        if (step_decimals > 0) {
                            value = value.toPrecision(step_decimals)
                        }
                        
                    // Catch special case for variable font axis sliders
                    if (typeof(key) === "undefined") {
                        let key = slider.dataset.axis;
                        opt[key] = value
                        FS.setValue("variation", opt)
                    } else {
                        FS.setValue(key, value)
                    }

                })
            })
        }

        const selectInputs = FS.root.querySelectorAll("select[data-fsjs-ui='dropdown']")
        let dropdowns = []
        if (selectInputs.length) {
            for (let i = 0; i < selectInputs.length; i++) {
                let dropdown = new Dropkick(selectInputs[i], {
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
        let key = this.element.dataset.fsjs,
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