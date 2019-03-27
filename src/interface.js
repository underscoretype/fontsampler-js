function Interface() {

    var types = {
        "fontsize": "slider",
        "lineheight": "slider",
        "letterspacing": "slider",
        "fontfamily": "dropdown"
    },
    root = null

    function init(_root, options) {
        console.log("init interface on", root, "with options", options)

        root = _root

        for (key in options) {
            setupElement(options[key], options)
        }
    }

    function setupElement(opt, allOpt) {
        var element = root.querySelector(opt.selector)

        if (element) {
            // TODO determine if to set init values, data-property etc.
            console.log("SKIP EXISTING DOM ELEMENT", key)
        } else {
            if (types[key] === "slider") {
                if (opt["label"]) {
                    root.append(generateLabel(opt["label"], opt["unit"], opt["init"], key))
                }
                element = generateSlider(key, opt)
                root.append(element)
            } else if (types[key] === "dropdown") {
                element = generateDropdown(key, opt, allOpt.fonts)
                root.append(element)
            }
        }

        if (element) {
            element.addEventListener("change", onChange)
        }

        return false
    }

    function generateLabel(labelText, labelUnit, labelValue, relatedInput) {
        var label = document.createElement("label")
        label.setAttribute("for", relatedInput)
        label.appendChild(document.createTextNode(labelText))

        var display = document.createElement("span")
            display.className = "value"
            display.appendChild(document.createTextNode(labelValue + " " + labelUnit))
            label.appendChild(display)

        return label
    }

    function generateSlider(key, opt) {
        var input = document.createElement("input")

        input.setAttribute("type", "range")
        input.setAttribute("min", opt.min)
        input.setAttribute("max", opt.max)
        input.setAttribute("step", 1)
        // input.setAttribute("class", opt.selector)
        input.dataset.property = key
        input.setAttribute("autocomplete", "off")
        if (opt.unit) { 
            input.dataset.unit = opt.unit
        }

        return input
    }

    function generateDropdown(key, opt, fonts) {
        var dropdown = document.createElement("select")

        dropdown.setAttribute("value", name)
        // dropdown.setAttribute("class", opt.selector)
        dropdown.dataset.property = key

        console.log("DROPDOWN", fonts)

        for (name in fonts) {
            var option = document.createElement("option")

            option.appendChild(document.createTextNode(name))
            dropdown.appendChild(option)
        }

        return dropdown
    }

    function onChange(e) {
        console.log("change", e)
        console.log(e.currentTarget.dataset.property)

        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .value")

        if (label) {
            label.innerText = getCSSValue(property)
        }

        root.dispatchEvent(customEvent)
    }

    function getValue(property) {
        console.log("getValue", property)
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value
    }

    function getCSSValue(property) {
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value + element.dataset.unit
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue
    }
}

module.exports = Interface