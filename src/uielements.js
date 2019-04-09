
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

        label.dataset.fsjsFor = relatedInput
        helpers.nodeAddClass(label, options.classes.labelClass)

        text.className = options.classes.labelTextClass
        text.appendChild(document.createTextNode(labelText))
        label.appendChild(text)

        if (labelValue !== "") {
            val = document.createElement("span")
            val.className = options.classes.labelValueClass
            val.appendChild(document.createTextNode(labelValue))
            label.appendChild(val)
        }

        if (typeof(labelUnit) === "string") {
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

        if (key) {
            input.dataset.fsjs = key
        }
        input.dataset.fsjsSlider = true

        return input
    }

    function slidergroup(key, opt, node) {
        // console.warn("slidergroup", key, opt)

        var slidergroup = helpers.isNode(node) ? node : document.createElement("div")

        for (var s = 0; s < opt.axes.length; s++) {

            if (opt.axes[s].label) {
                var label = slidergroup.querySelector("[data-fsjs-for='" + opt.axes[s].code + "']")
                if (!helpers.isNode(label)) {
                    label = this.label(opt.axes[s].label, false, opt.axes[s].init, opt.axes[s].code)
                    slidergroup.appendChild(label)
                }
            }

            var slider = slidergroup.querySelector("[data-axis='" + opt.axes[s].code + "']")
            if (!helpers.isNode(slider)) {
                slider = this.slider(false, opt.axes[s])
                slidergroup.appendChild(slider)
            }
            slider.dataset.axis = opt.axes[s].code
        }

        // slidergroup.data.fsjs = key

        return slidergroup
    }

    function dropdown(key, opt, node) {
        var dropdown = helpers.isNode(node) ? node : document.createElement("select")

        if ("choices" in opt === false || opt.choices.length < 1) {
            return false
        }

        for (var c = 0; c < opt.choices.length; c++) {
            var choice = parseChoice(opt.choices[c]),
                option = dropdown.querySelector("option[value='" + choice.val + "']")
                
            if (!helpers.isNode(option)) {
                option = document.createElement("option")
                option.appendChild(document.createTextNode(choice.text))
                dropdown.appendChild(option)
            }

            option.value = choice.val
            if ("init" in opt && opt.init === choice.text) {
                option.selected = true
            }
        }

        dropdown.dataset.fsjs = key
        
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
            helpers.nodeAddClass(options.classes.buttonClass)
            if (opt.init === choice.val) {
                button.className = options.classes.buttonSelectedClass
            }
            group.appendChild(button)
        }

        return group
    }

    function checkboxes(key, opt) {
        var group = document.createElement("div")

        group.dataset.fsjs = key

        for (var o in opt.choices) {
            if (opt.choices.hasOwnProperty(o)) {
                var choice = parseChoice(opt.choices[o]),
                    label = document.createElement("label"),
                    checkbox = document.createElement("input"),
                    text = document.createElement("span")

                checkbox.setAttribute("type", "checkbox")
                checkbox.dataset.feature = choice.val

                if (opt.init.indexOf(Object.values(choice)[0]) !== -1) {
                    checkbox.checked = true
                }

                text.appendChild(document.createTextNode(choice.text))

                label.appendChild(checkbox)
                label.appendChild(text)

                group.append(label)
            }
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
        slidergroup: slidergroup,
        label: label,
        textfield: textfield,
        buttongroup: buttongroup,
        checkboxes: checkboxes
    }
}

module.exports = UIElements