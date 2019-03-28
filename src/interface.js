var UIElements = require("./uielements")

function Interface(_root, fonts, options) {

    var ui = {
            tester: "textfield",
            fontsize: "slider",
            lineheight: "slider",
            letterspacing: "slider",
            fontfamily: "dropdown",
            // "alignment": "buttons",
            // "direction": "toggle",
            // "language": "dropdown",
            // "opentype": "checkboxes"
        },
        root = null,
        uielements = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.log("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        uielements = UIElements(root, fonts, options)

        // Before modifying the root node, detect if it is containing only
        // text, and if so, store it to the options for later use
        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // If no valid UI order is passed in fall back to the ui elements
        // Their order might be random, but it ensures each required element
        // is at least present
        if (!options.order || !Array.isArray(options.order)) {
            options.order = Object.keys(ui)
        }

        // Process the possible nested arrays in order one by one
        // · Existing DOM nodes will be validated and initiated
        // · UI elements defined via options but missing from the DOM will be created
        // · Items neither in the DOM not in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var element = parseUIOrderElement(options.order[i])
            if (element) {
                root.appendChild(element)
            }
        }
    }

    /**
     * Recursively go through an element in the options.order
     * @param string item
     * @param node parent
     */
    function parseUIOrderElement(item) {
        console.debug("Fontsampler.Interface.parseUIOrderElement", item)
        var child, wrapper

        if (typeof(item) === "string") {
            child = parseUIElement(item)
            if (child === true) {
                // exists
            } else if (child) {
                return child
            } else {
                // parsing failed
            }
        } else if (Array.isArray(item)) {
            wrapper = document.createElement("div")
            wrapper.className = options.wrapperClass

            for (var i = 0; i < item.length; i++) {
                child = parseUIOrderElement(item[i])
                if (child) {
                    wrapper.appendChild(child)
                }
            }

            return wrapper
        } else {
            console.debug("skipping not defined UI element", item)

            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || boolean (true = in DOM, false = invalid item)
     */
    function parseUIElement(item) {
        console.debug("Fontsampler.Interface.parseUIElement", item, options)
        console.debug("RENDER?", item, options.ui[item].render)
        // check if in DOM
        // validate and hook up
        var node = getUIItem(item)
        if (node) {
            validateNode(node, options.ui[item])
            initNode(node, options.ui[item])
            uinodes[item] = node

            return true
        } else if (options.ui[item].render && item in ui) {
            node = createNode(item, options.ui[item])
            uinodes[item] = node

            return node
        }

        return false
    }

    /**
     * Create a new UI element 
     * @param string item 
     * @param object opt 
     * @return node
     */
    function createNode(item, opt) {
        console.debug("Fontsampler.Interface.createNode", item, opt)
        var node = uielements[ui[item]](item, opt),
            wrapper

        initNode(node, opt)

        wrapper = document.createElement("div")
        wrapper.className = opt.wrapperClass

        if (opt.label) {
            wrapper.append(uielements.label(opt.label, opt.unit, opt.init, item))
        }
        wrapper.append(node)

        return wrapper

    }

    /**
     * Validate a UI element (as found in the DOM)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function validateNode(node, opt) {
        // console.debug("Fontsampler.Interface.validateNode", node, opt)

        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(node, opt) {
        // console.debug("Fontsampler.Interface.initNode", node, opt)
        // TODO set values if passed in an different on node

        node.addEventListener("change", onChange)

        return true
    }

    /**
     * Convenience helper to return a DOM element fetching one of the Fontsampler
     * UI elements
     * 
     * @param string item 
     * @return node
     */
    function getUIItem(item) {
        console.debug("Fontsampler.Interface.getUIItem", item)
        return root.querySelector("[data-property='" + item + "']")
    }

    /**
     * Catch-all UI element event listener firing a scoped CustomEvent based
     * on the element’s property
     * @param {*} e 
     */
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

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(property) {
        console.log("getValue", property)
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} property 
     */
    function getCSSValue(property) {
        var element = root.querySelector("[data-property='" + property + "']")

        return element.value + element.dataset.unit
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInput(attr, val) {
        console.log("Fontsampler.interface.setInput", attr, val)
        uinodes.tester.style[attr] = val
    }

    function setStatusClass(classString, status) {
        var classes = root.className.split(" "),
            classIndex = classes.indexOf(classString)

        if (status && classIndex === -1) {
            classes.push(classString)
        } else if (!status && classIndex !== -1) {
            classes.splice(classIndex, 1)
        }

        root.className = classes.join(" ")
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        setInput: setInput,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface