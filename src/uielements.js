
var helpers = require("./helpers")
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

        label.dataset.for = relatedInput
        helpers.nodeAddClass(label, options.classes.labelClass)

        text.className = options.classes.labelTextClass
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (typeof(labelUnit) === "string" && labelValue !== "") {
            val = document.createElement("span")
            val.className = options.classes.labelValueClass
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)

            unit = document.createElement("span")
            unit.className = options.classes.labelUnitClass
            unit.appendChild(document.createTextNode(labelUnit))
            label.appendChild(unit)
        }

        return label
    }

    function slider(key, opt, node) {
        var input = helpers.isNode(node) ? node : document.createElement("input")

        var attributes = {
            type: "range",
            min: opt.min,
            max: opt.max,
            step: opt.step
        }

        input.setAttribute("autocomplete", "off")
        setMissingAttributes(input, attributes)

        if (typeof(input.val) === "undefined") {
            input.value = opt.init
        }

        if ("unit" in input.dataset === false) {
            input.dataset.unit = opt.unit
        }
        if ("init" in input.dataset === false) {
            input.dataset.init = opt.init
        }

        input.dataset.fsjs = key

        return input
    }

    function dropdown(key, opt) {
        var dropdown = document.createElement("select")
        dropdown.dataset.fsjs = key

        for (var o in opt.choices) {
            var option = document.createElement("option"),
                choice = parseChoice(opt.choices[o])

            option.value = choice.val
            option.appendChild(document.createTextNode(choice.text))
            dropdown.appendChild(option)
        }

        return dropdown
    }

    function textfield(key, opt, node) {
        var tester = typeof(node) === "undefined" || node === null ? document.createElement("div") : node,
            attr = {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                spellcheck: "false",
                contenteditable: opt.editable
            }

        setMissingAttributes(tester, attr)

        tester.dataset.fsjs = key

        // If the original root element was a single DOM element with some text, copy that
        // text into the tester
        // TODO move this to interface and on tester node init
        if (!tester.dataset.replaceText) {
            if (options.initialText) {
                tester.append(document.createTextNode(options.initialText))
            } else if (!options.initialText && options.originalText) {
                tester.append(document.createTextNode(options.originalText))
            }
            tester.dataset.replaceText = true
        }

        return tester
    }

    function buttongroup(key, opt) {
        var group = document.createElement("div")

        group.dataset.fsjs = key

        for (var o in opt.choices) {
            var button = document.createElement("button"),
                choice = parseChoice(opt.choices[o])

            button.dataset.choice = choice.val
            button.appendChild(document.createTextNode(choice.text))
            if (opt.init === choice.val) {
                button.className = options.classes.buttonSelected
            }
            group.appendChild(button)
        }

        return group
    }

    function checkboxes(key, opt) {
        var group = document.createElement("div")

        group.dataset.fsjs = key

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

    function setMissingAttributes(node, attributes) {
        if (typeof(node) === "undefined" || node === null || typeof(attributes) !== "object") {
            return
        }

        for (var a in attributes) {
            if (attributes.hasOwnProperty(a)) {
                if (!node.hasAttribute(a)) {
                    node.setAttribute(a, attributes[a])
                }
            }
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