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
            tester.setAttribute("contenteditable", opt.editable)
    
            tester.dataset.property = key
    
            // If the original root element was a single DOM element with some text, copy that
            // text into the tester
            if (options.initialText) {
                tester.append(document.createTextNode(options.initialText))
            } else if (!options.initialText && options.originalText) {
                tester.append(document.createTextNode(options.originalText))
            }
    
            // If the original root element had only a single text node, replace it with the tester
            // otherwise append the tester element
            // if (root.childNodes.length !== 1) {
            //     root.append(tester)
            // } else if (root.childNodes.length === 1) {
            //     root.replaceChild(tester, root.childNodes[0])
            // }

        return tester
    }

    return {
        dropdown: dropdown,
        slider: slider,
        label: label,
        textfield: textfield
    }
}

module.exports = UIElements