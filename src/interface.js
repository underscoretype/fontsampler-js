function Interface(_root, fonts, options) {

    var types = {
            "fontsize": "slider",
            "lineheight": "slider",
            "letterspacing": "slider",
            "fontfamily": "dropdown"
        },
        root = null,
        tester = null

    function init() {
        console.log("init interface on", root, "with options", options)

        root = _root

        for (var key in types) {
            var element = false

            if (options.generateDOM) {
                element = setupElement(key, options[key])
            } else {
                element = root.querySelector("[data-property='" + key + "']")
            }

            if (element) {
                element.addEventListener("change", onChange)
            }
        }

        tester = root.querySelector("[data-property='tester']")
        console.log("TESTER", tester)
        if (!tester) {
            tester = document.createElement("div")
            var attr = {
                "autocomplete": "off",
                "autocorrect": "off",
                "autocapitalize": "off",
                "spellcheck": "false",
            }
            for (var a in attr) {
                tester.setAttribute(a, attr[a])
            }
            tester.setAttribute("contenteditable", options.tester.editable)

            tester.dataset.property = "tester"

            // If the original root element was a single DOM element with some text, copy that
            // text into the tester
            if (options.initialText) {
                tester.append(document.createTextNode(options.initialText))
            } else if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE && !options.initialText) {
                tester.append(document.createTextNode(root.childNodes[0].textContent))
            }

            // If the original root element had only a single text node, replace it with the tester
            // otherwise append the tester element
            if (root.childNodes.length !== 1) {
                root.append(tester)
            } else if (root.childNodes.length === 1) {
                root.replaceChild(tester, root.childNodes[0])
            }
        }
    }

    function setupElement(key, opt) {
        console.log("setupElement", opt)
        var element = root.querySelector("[data-property='" + key + "']")

        if (element) {
            // TODO validate & set init values, step, etc.
            console.log("SKIP EXISTING DOM ELEMENT", key)
        } else {
            var appendTo = root
            if (options.wrapUIElements) {
                appendTo = document.createElement("div")
                appendTo.className = "fontsampler-ui-element-" + key
                root.append(appendTo)
            }

            if (opt.label) {
                appendTo.append(generateLabel(opt.label, opt.unit, opt.init, key))
            }
            if (types[key] === "slider") {
                element = generateSlider(key, opt)
                appendTo.append(element)
            } else if (types[key] === "dropdown") {
                element = generateDropdown(key, opt)
                appendTo.append(element)
            }
        }

        return element
    }

    function generateLabel(labelText, labelUnit, labelValue, relatedInput) {
        var label = document.createElement("label"),
            text = document.createElement("span"),
            val, unit

        label.setAttribute("for", relatedInput)

        text.className = "fontsampler-label-text"
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (labelUnit && labelValue) {

            val = document.createElement("span")
            val.className = "fontsampler-label-value"
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)

            unit = document.createElement("span")
            unit.className = "fontsampler-label-unit"
            unit.appendChild(document.createTextNode(labelUnit))
            label.appendChild(unit)
        }

        return label
    }

    function generateSlider(key, opt) {
        var input = document.createElement("input")

        input.setAttribute("type", "range")
        input.setAttribute("min", opt.min)
        input.setAttribute("max", opt.max)
        input.setAttribute("step", opt.step)
        input.dataset.property = key
        input.setAttribute("autocomplete", "off")
        input.value = opt.init
        if (opt.unit) {
            input.dataset.unit = opt.unit
        }

        return input
    }

    function generateDropdown(key) {
        var dropdown = document.createElement("select")

        dropdown.setAttribute("value", name)
        dropdown.dataset.property = key

        for (var index in fonts) {
            var option = document.createElement("option")

            option.value = fonts[index].name
            option.appendChild(document.createTextNode(fonts[index].name))
            dropdown.appendChild(option)
        }

        return dropdown
    }

    function onChange(e) {
        console.log("change", e)
        console.log(e.currentTarget.dataset.property)

        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        if (label) {
            label.innerText = getValue(property)
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

    function setInput(attr, val) {
        console.log("Fontsampler.interface.setInput", attr, val, tester)
        tester.style[attr] = val
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        setInput: setInput
    }
}

module.exports = Interface