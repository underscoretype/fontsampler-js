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
        uinodes = {}

    function init() {
        console.log("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        uielements = UIElements(root, fonts, options)

        // UI DOM logic

        // UI ordering: each array is a wrapped div, each element corresponds to and item

        // Init with root element

        // Excepted:
        // - Init on empty root

        // Expected:
        // - Init on root with DOM controls
        // - Validate & hook up controls
        // - Init DOM with option values, if passed in

        // Expected:
        // - Init on root with DOM controls and options
        // - Validate & hook up controls
        // - Init DOM with option values, if passed in
        // - Generate _missing_ DOM and values as per options

        // Expected:
        // - Init on empty root with options
        // - Generate DOM and values as per options

        // All:
        // - Add Tester

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
        console.log("len", options.order.length)
        for (var i = 0; i < options.order.length; i++) {
            console.debug("I", i)
            console.debug("Fontsampler.Interface.init", options.order[i])
            var element = parseUIOrderElement(options.order[i])
            if (element) {
                root.appendChild(element)
            }
            console.log("after", i)
        }

        console.log("INIT END")
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
            if (child) {
                return child
            }
        } else if (Array.isArray(item)) {
            wrapper = document.createElement("div")
            for (var i = 0; i < item.length; i++) {
                child = parseUIOrderElement(item[i])
                if (child) {
                    wrapper.appendChild(child)
                }
            }
            return wrapper
        } else {
            console.warn("skipping", item)
            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || false
     */
    function parseUIElement(item) {
        console.debug("Fontsampler.Interface.parseUIElement", item, parent)
        // check if in DOM
        // validate and hook up
        var node = getUIItem(item)
        if (node) {
            validateNode(node, options[item])
            initNode(node, options[item])
        } else if (item in options) {
            node = createNode(item, options[item])
        }

        if (node) {
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
        wrapper.className = "fontsampler-ui-element-" + item

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
        console.debug("Fontsampler.Interface.validateNode", node, opt)

        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(node, opt) {
        console.debug("Fontsampler.Interface.initNode", node, opt)
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

    // function foo() {
    //     for (var ui in types) {
    //         var element = false

    //         if (options.generate) {
    //             element = setupElement(key, options[key])
    //         } else {
    //             element = root.querySelector("[data-property='" + key + "']")
    //         }

    //         if (element) {
    //             element.addEventListener("change", onChange)
    //         }
    //     }

    //     tester = root.querySelector("[data-property='tester']")
    //     console.log("TESTER", tester)
    //     if (!tester) {

    //     }
    // }

    function setupElement(key, opt) {
        console.log("setupElement", opt)
        var element = root.querySelector("[data-property='" + key + "']")
        console.log("ELEMENT", element)

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
        uinodes.tester.style[attr] = val
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        setInput: setInput
    }
}
module.exports = Interface