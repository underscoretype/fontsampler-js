/**
 * Wrapper to provide global root, options and fonts to all methods (UI Elements)
 * 
 * @param {*} root 
 * @param {*} options 
 * @param {*} fonts 
 */
function UIElements(root, options) {

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

    function dropdown(key, opt) {
        var dropdown = document.createElement("select")
        dropdown.dataset.property = key

        for (var o in opt.choices) {
            var option = document.createElement("option"),
                choice = parseChoice(opt.choices[o])

            option.value = choice.val
            option.appendChild(document.createTextNode(choice.text))
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
        var group = document.createElement("div")

        for (var o in opt.choices) {
            var button = document.createElement("button"),
                choice = parseChoice(opt.choices[o])

            button.dataset.choice = choice.val
            button.appendChild(document.createTextNode(choice.text))
            if (opt.init === choice.val) {
                button.className = "fontsampler-buttongroup-selected"
            }
            group.appendChild(button)
        }

        group.dataset.property = key

        return group
    }

    function checkboxes(key, opt) {
        var group = document.createElement("div")
            
        group.dataset.property = key

        for (var o in opt.choices) {
            var choice = parseChoice(opt.choices[o]),
                label = document.createElement("label"),
                checkbox = document.createElement("input"),
                text = document.createElement("span")


            checkbox.setAttribute("type", "checkbox")
            checkbox.dataset.feature = choice.val

            text.appendChild(document.createTextNode(choice.text))

            label.appendChild(checkbox)
            label.appendChild(text)

            group.append(label)
        }

        return group
    }

    /**
     * Split an input choice into value and text or return only the value as 
     * both if no separator is used to provide a readable label
     * e.g. "ltr|Left" to right becomes { val: "ltr", text: "Left to right"}
     * but: "left" becomes { val: "left", text: "left"}
     * @param string choice 
     * @return obj {val, text}
     */
    function parseChoice(choice) {
        var parts, val, text

        if (choice.indexOf("|") !== -1) {
            parts = choice.split("|")
            val = parts[0]
            text = parts[1]
        } else {
            val = choice
            text = choice
        }

        return {
            val: val,
            text: text
        }
    }

    return {
        dropdown: dropdown,
        slider: slider,
        label: label,
        textfield: textfield,
        buttongroup: buttongroup,
        checkboxes: checkboxes
    }
}

module.exports = UIElements