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
            rangeInputs.forEach(slider => {
                let mouseDown = false;

                function updateSlider (e) {
                    if (!mouseDown) {
                        return
                    }
        
                    const w = slider.getBoundingClientRect().width,
                        x = Math.max(0, Math.min(w, e.layerX)),
                        percent = x / w,
                        min = parseFloat(slider.min) || 1, // _some_ defaults
                        max = parseFloat(slider.max) || 1000, // _some_ defaults
                        step = parseFloat(slider.step) || 1, // _some_ defaults
                        step_decimals = utils.countDecimals(slider.step),
                        range = min < max ? max - min : min - max;
        
                    let key = slider.dataset.fsjs,
                        value;
        
                    value = Math.round((min + (percent * range)) / step) * step;
                    
                    if (step_decimals > 0) {
                        value = value.toPrecision(step_decimals)
                    }
        
                    if (typeof (key) === "undefined") {
                        // Set variable axis slider
                        let key = slider.dataset.axis;
                        opt[key] = value
                        FS.setValue("variation", opt)
                    } else {
                        // Set regular slider (leading, letter spacing, ...)
                        FS.setValue(key, value)
                    }
                }

                slider.addEventListener("mousedown", function (e) {
                    mouseDown = true
                    updateSlider(e)
                })

                slider.addEventListener("mouseup", function () {
                    mouseDown = false
                })

                slider.addEventListener("mousemove", updateSlider)
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
}

module.exports = Skin