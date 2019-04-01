/**
 * Wrapper to provide global root, options and fonts to all methods (UI Elements)
 * 
 * @param {*} root 
 * @param {*} options 
 * @param {*} fonts 
 */
function UIElements(root, fonts, options) {

    function label(labelText, labelUnit, labelValue, relatedInput) {
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

    function slider(key, opt) {
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

    function dropdown(key, options) {
        console.debug("Fontsampler.UIElements.dropdown", key, options)

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

    function textfield(key, opt) {
        var tester = document.createElement("div"),
            attr = {
                "autocomplete": "off",
                "autocorrect": "off",
                "autocapitalize": "off",
                "spellcheck": "false",
                "contenteditable": opt.editable
            }

        for (var a in attr) {
            tester.setAttribute(a, attr[a])
        }
        tester.dataset.property = key

        // If the original root element was a single DOM element with some text, copy that
        // text into the tester
        if (options.initialText) {
            tester.append(document.createTextNode(options.initialText))
        } else if (!options.initialText && options.originalText) {
            tester.append(document.createTextNode(options.originalText))
        }

        return tester
    }

    function buttongroup(key, opt) {
        console.log(key, opt)
        var group = document.createElement("div")

        for (var o in opt.choices) {
            var c = opt.choices[o],
                button = document.createElement("button"),
                choice,
                text,
                parts
                
            if (c.indexOf("|") !== -1) {
                parts = c.split("|")
                choice = parts[0]
                text = parts[1]
            } else {
                choices = c
                text = c
            }

            button.dataset.choice = choice
            button.appendChild(document.createTextNode(text))
            if (opt.init === choice) {
                button.className = "fontsampler-buttongroup-selected"
            }
            group.appendChild(button)
        }

        group.dataset.property = key

        return group
    }

    return {
        dropdown: dropdown,
        slider: slider,
        label: label,
        textfield: textfield,
        buttongroup: buttongroup
    }
}

module.exports = UIElements