/**
 * A wrapper around the Fontsampler interface
 * 
 * 
 * Generally, the DOM is structured in such a way:
 * 
 * Each nested Array in ´order´ is enclosed in a
 * 
 * .fsjs-wrapper
 * 
 * In each (optional, e.g. without Array straight output) wrapper one more more:
 * 
 *  [data-fsjs-block=_property_].fsjs-block .fsjs-block-_property_ .fsjs-block-type-_type_
 * 
 * Nested in each block a variety of sub elements:
 *      Optional label with:
 *      [data-fsjs-for=_property_].fsjs-label
 *          [data-label-text=_property_].fsjs-label-text
 *          [data-label-value=_property_].fsjs-label-value (optional)
 *          [data-label-unit=_property_].fsjs-label-unit (optional)
 * 
 *      The actual ui control (input, select, buttongroup)
 *      [data-fsjs=_property_].fsjs-element-_property_
 * 
 * The terminology used in this class uses `block` for a wrapper of an UI element
 * and `element` for the actual UI element that has a value, e.g. the HTML input
 * or select etc.
 */
var selection = require("./helpers/selection")

var UIElements = require("./uielements")

// var errors = require("./constants/errors")
var events = require("./constants/events")
var defaults = require("./constants/defaults")

var dom = require("./helpers/dom")
var utils = require("./helpers/utils")
var supports = require("./helpers/supports")

function UI(fs, fonts, options) {

    var ui = {
        tester: "textfield",
        fontsize: "slider",
        lineheight: "slider",
        letterspacing: "slider",
        fontfamily: "dropdown",
        alignment: "buttongroup",
        direction: "buttongroup",
        language: "dropdown",
        opentype: "checkboxes"
    },
        keyToCss = {
            "fontsize": "fontSize",
            "lineheight": "lineHeight",
            "letterspacing": "letterSpacing",
            "alignment": "text-align"
        },
        blocks = {},
        uifactory = null, // instance of uielements
        input = null, // the tester text field
        originalText = "", // used to store textContent that was in the root node on init
        root = fs.root

    function init() {
        console.debug("Fontsampler.Interface.init()", root, fonts, options)

        dom.nodeAddClass(root, options.classes.rootClass)
        uifactory = UIElements(root, options)

        // The `fontfamily` UI option is just being defined without the options, which
        // are the fonts passed in. Let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui by defining
        // the needed `choices` attribute
        if (options.config.fontfamily && typeof (options.config.fontfamily) === "boolean") {
            options.config.fontfamily = {}
        }
        options.config.fontfamily.choices = fonts.map(function (value) {
            return value.name
        })

        // Before modifying the root node, detect if it is containing only
        // text, and if so, store it to the options for later use
        // NOTE: This currently only extracts single nodes or text, not an
        // entire node tree possible nested in the root node
        if (root.childNodes.length === 1 && root.childNodes[0].nodeType === Node.TEXT_NODE) {
            originalText = root.childNodes[0].textContent
            root.removeChild(root.childNodes[0])
        }
        options.originalText = originalText

        // Clear the slate
        while (root.childNodes.length) {
            root.removeChild(root.childNodes[0])
        }

        // Process the possible nested order arrays in order one by one
        // · Existing DOM nodes will be validated and initiated (TBD drop or check implementation)
        // · UI elements defined via options but missing from the DOM will be created
        // · UI elements defined in ui option but not in order option will be 
        //   appended to the end
        // · Items neither in the DOM nor in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var elementA = parseOrder(options.order[i])
            if (dom.isNode(elementA) && elementA.childNodes.length > 0 && !elementA.isConnected) {
                root.appendChild(elementA)
            }
        }

        // Save the tester for convenience
        input = getElement("tester", blocks.tester)

        if (options.originalText) {
            this.setInputText(options.originalText.trim())
        }
        if ("initialText" in options && options.initialText !== "") {
            this.setInputText(options.initialText.trim())
        }

        // after all nodes are instantiated, update the tester to reflect
        // the current state
        for (var keyC in blocks) {
            if (blocks.hasOwnProperty(keyC)) {
                initBlock(keyC)
            }
        }

        // Set values for configs that are set but do not have a rendered block
        let block_keys = Object.keys(blocks),
            options_without_ui = Object.keys(options.config).filter(k => block_keys.indexOf(k) === -1);

        options_without_ui.forEach(key => {
            // Set the initial value
            setValue(key, options.config[key].init)
        })

        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                if (typeEvents.hasOwnProperty(e)) {
                    blocks.tester.addEventListener(typeEvents[e], onKey)
                }
            }
        }

        // prevent pasting styled content
        blocks.tester.addEventListener('paste', function (e) {
            e.preventDefault();
            var text = '';
            if (e.clipboardData || e.originalEvent.clipboardData) {
                text = (e.originalEvent || e).clipboardData.getData('text/plain');
            } else if (window.clipboardData) {
                text = window.clipboardData.getData('Text');
            }

            if (!options.multiline) {
                text = text.replace(/(?:\r\n|\r|\n|<br>)/g, ' ')
            }

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                document.execCommand('paste', false, text);
            }
        });

        blocks.tester.addEventListener('focusin', function (e) {
            sendEvent(events.focused)
            dom.nodeAddClass(root, options.classes.focusedClass)
        })

        blocks.tester.addEventListener('focusout', function (e) {
            sendEvent(events.blurred)
            dom.nodeRemoveClass(root, options.classes.focusedClass)
        })
    }

    /**
     * Recursively go through an element in the options.order
     * @param string key
     * @param node parent
     */
    function parseOrder(key) {
        var child, wrapper

        if (typeof (key) === "string") {
            var block = createBlock(key)
            blocks[key] = block

            return block
        } else if (Array.isArray(key)) {
            wrapper = document.createElement("div")
            wrapper.className = options.classes.wrapperClass

            for (var i = 0; i < key.length; i++) {
                child = parseOrder(key[i])
                if (child) {
                    wrapper.appendChild(child)
                }
            }

            if (wrapper.children.length < 1) {
                return false
            }

            return wrapper
        } else if (key instanceof HTMLElement) {
            wrapper = document.createElement("div")
            if (key.classList) {
                wrapper.classList = key.classList
                key.className = ""
            }
            wrapper.className += " " + options.classes.blockClass

            if (key.hasAttribute("id")) {
                wrapper.setAttribute("id", key.getAttribute("id"))
                key.removeAttribute("id")
            }
            wrapper.appendChild(key)

            return wrapper
        } else {
            // Skipping not defined UI element
            console.warn("Skipping unspecified order item, not a known Fontsampler JS element nor a valid DOM node: " + key)

            return false
        }
    }

    /**
     * Create a block wrapper and the UI element it contains
     * 
     * @param {string} key 
     */
    function createBlock(key) {
        var block = document.createElement("div"),
            element = false,
            label = false,
            opt = null;

        if (key in options.config === false) {
            console.error("No options defined for block", key)
            return false
        }

        opt = options.config[key]

        if (opt.label) {
            label = uifactory.label(opt.label, opt.unit, opt.init, key)
            block.appendChild(label)
            addLabelClasses(label, key)
        }

        element = createElement(key)

        addElementClasses(element, key)
        addBlockClasses(block, key)

        block.appendChild(element)

        if (label) {
            // Make the label value a some of usable input
            let labelValue = label.querySelector(".fsjs-label-value")
            if (opt.label && labelValue) {
                // Select all on focus
                labelValue.addEventListener("focus", function (e) {
                    window.getSelection().selectAllChildren(e.currentTarget);
                })

                // Limit typing input to apply only when within min max
                labelValue.addEventListener("keyup", function (e) {
                    let val = parseFloat(e.currentTarget.innerText);
                    if (val > opt.min && val < opt.max) {
                        setValue(key, val)
                    }

                })

                // On blur clamp value to winthin min max
                labelValue.addEventListener("blur", function (e) {
                    let val = parseFloat(e.currentTarget.innerText)
                    setValue(key, Math.max(opt.min, Math.min(opt.max, val)))
                })
            }
        }

        return block
    }

    /**
     * Create the actual UI element for a key
     * 
     * @param {string} key 
     */
    function createElement(key) {
        var element

        if (isAxisKey(key)) {
            element = uifactory.slider(key, options.config[key])
        } else {
            element = uifactory[ui[key]](key, options.config[key])
        }
        addElementClasses(element, key)

        return element
    }

    /**
     * Make sure a UI wrapper block has the classes and attributes
     * expected
     * 
     * @param {node} block 
     * @param {string} key 
     */
    function addBlockClasses(block, key) {
        var type = ui[key]
        if (isAxisKey(key)) {
            type = "slider"
        }
        var classes = [
            options.classes.blockClass,
            options.classes.blockClass + "-" + key,
            options.classes.blockClass + "-type-" + type
        ]
        if (isAxisKey(key)) {
            classes.push(options.classes.blockClassAxis)
        }

        if (key in options.config && "classes" in options.config[key]) {
            classes.push(options.config[key].classes)
        }

        dom.nodeAddClasses(block, classes)
        block.dataset.fsjsBlock = key
    }

    /**
     * Make sure a UI element has the classes and attributes expected
     * 
     * @param {node} element 
     * @param {string} key 
     */
    function addElementClasses(element, key) {
        try {
            var type = ""
            if (isAxisKey(key)) {
                type = "slider"
            } else {
                type = ui[key]
            }
            element = uifactory[type](key, options.config[key], element)

            dom.nodeAddClass(element, options.classes.elementClass)

            element.dataset.fsjs = key
            element.dataset.fsjsUi = type
        } catch (e) {
            console.warn("Failed in addElementClasses()", element, key, e)
        }
    }

    /**
     * If a UI element has a label, make sure it conforms to the DOM structure
     * and attributes expected of it
     * 
     * @param {node} label 
     * @param {string} key 
     */
    function addLabelClasses(label, key) {
        var text = label.querySelector("." + options.classes.labelTextClass),
            value = label.querySelector("." + options.classes.labelValueClass),
            unit = label.querySelector("." + options.classes.labelUnitClass),
            element = getElement(key)

        if (dom.isNode(text) && text.textContent === "") {
            text.textContent = options.config[key].label
        }

        if (dom.isNode(value) && ["slider"].indexOf(ui[key]) === -1) {
            value.textContent = ""
        }

        if (dom.isNode(value) && value && value.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            value.textContent = element.value
        }

        if (dom.isNode(unit) && unit && unit.textContent === "") {
            // If set in already set in DOM the above validate will have set it
            unit.textContent = element.dataset.unit
        }

        dom.nodeAddClass(label, options.classes.labelClass)
        label.dataset.fsjsFor = key
    }

    /**
     * Init a UI element with values (update DOM to options)
     * 
     * @param {node} node 
     * @param {object} opt 
     * @return boolean
     */
    function initBlock(key) {
        // TODO set values if passed in and different on node
        var block = getBlock(key),
            element = getElement(key, block),
            type = ui[key],
            opt = options.config[key]

        if (!block) {
            return
        }

        if (type === "slider" || isAxisKey(key)) {
            setValue(key, opt.init)
            element.addEventListener("change", onSlide)
        } else if (type === "dropdown") {
            element.addEventListener("change", onChange)
            setValue(key, opt.init)
        } else if (type === "buttongroup") {
            var buttons = element.querySelectorAll("[data-choice]")

            if (buttons.length > 0) {
                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].addEventListener("click", onClick)
                    if (buttons[b].dataset.choice === options.config[key].init) {
                        dom.nodeAddClass(buttons[b], options.classes.buttonSelectedClass)
                    } else {
                        dom.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
                    }
                }
            }
            setValue(key, options.config[key].init)
        } else if (type === "checkboxes") {
            // currently only opentype feature checkboxes
            var checkboxes = element.querySelectorAll("[data-feature]")
            if (checkboxes.length > 0) {
                var features = {}
                for (var c = 0; c < checkboxes.length; c++) {
                    var checkbox = checkboxes[c]
                    checkbox.addEventListener("change", onCheck)
                    if ("features" in checkbox.dataset) {
                        features[checkbox.dataset.features] = checkbox.checked ? "1" : "0"
                    }
                }
                setInputOpentype(features)
            }
        }

        return true
    }

    /**
     * Checks if a variable font axis value is on any of the defined
     * axes
     * 
     * @param {string} axis 
     * @param {mixed} value 
     */
    // function isValidAxisAndValue(axis, value) {
    //     // if (!Array.isArray(options.config.variation.axes)) {
    //     //     return false
    //     // }
    //     if (isAxisKey(axis)) {
    //         return false
    //     }

    //     var axes = getAxisKeys()

    //     for (var a = 0; a < axes.length; a++) {
    //         var axisoptions = axes[a]

    //         if (axisoptions.tag !== axis) {
    //             continue
    //         }
    //         if (parseFloat(value) < parseFloat(axisoptions.min) || parseFloat(value) > parseFloat(axisoptions.max)) {
    //             return false
    //         } else {
    //             return true
    //         }
    //     }

    //     return false
    // }

    function isAxisKey(key) {
        return Object.keys(options.config).indexOf(key) !== -1 && String(key).length === 4
    }

    function getAxisKeys() {
        // Get all config keys which are not present in defaults and look like
        // axis keys (4 letter)
        var defaultKeys = Object.keys(defaults.config),
            allKeys = Object.keys(options.config),
            axisKeys = []

        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i]
            if (defaultKeys.indexOf(key) === -1 && isAxisKey(key)) {
                axisKeys.push(key)
            }
        }

        return axisKeys
    }

    function getDefaultVariations() {
        let variations = {}

        axes = getAxisKeys()
        if (axes.length === 0) {
            return {}
        }
        for (let a in axes) {
            const axis = axes[a]
            if (axis in options.config) {
                const opt = options.config[axis];

                if ("init" in opt) {
                    variations[axis] = opt.init
                } else if ("min" in opt) {
                    variations[axis] = opt.min
                } else if ("max" in opt) {
                    variations[axis] = opt.max
                } else {
                    variations[axis] = 0
                }
            }
        }
        return variations
    }

    function getElement(key, node) {
        if (typeof (node) === "undefined" || key in ui === false) {
            node = root
        }
        var element = root.querySelector("[data-fsjs='" + key + "']")

        return dom.isNode(element) ? element : false
    }

    function getBlock(key, node) {
        if (typeof (node) === "undefined" || key in ui === false) {
            node = root
        }
        var block = root.querySelector("[data-fsjs-block='" + key + "']")

        return dom.isNode(block) ? block : false
    }

    /**
     * Internal event listeners reacting to different UI element’s events
     * and passing them on to trigger the appropriate changes
     */
    function onChange(e) {
        setValue(e.target.dataset.fsjs, e.target.value)
    }

    function onSlide(e) {
        try {
            setValue(e.target.dataset.fsjs)
        } catch (e) {
            console.warn("Could not set slider value:", e)
        }
    }

    function onCheck() {
        // Currently this is only used for opentype checkboxes
        sendEvent(events.opentypeChanged)
    }

    /**
     * Currently only reacting to buttongroup nested buttons’ clicks
     * @param {*} e 
     */
    function onClick(e) {
        var parent = e.currentTarget.parentNode,
            property = parent.dataset.fsjs,
            buttons = parent.querySelectorAll("[data-choice]")

        if (property in ui && ui[property] === "buttongroup") {
            for (var b = 0; b < buttons.length; b++) {
                dom.nodeRemoveClass(buttons[b], options.classes.buttonSelectedClass)
            }
            dom.nodeAddClass(e.currentTarget, options.classes.buttonSelectedClass)
            setValue(property, e.currentTarget.dataset.choice)
        }
    }

    function sendEvent(type, opt) {
        if (typeof (opt) === "undefined") {
            var opt = {}
        }
        opt.fontsampler = fs
        root.dispatchEvent(new CustomEvent(type, { detail: opt }))
    }

    function sendNativeEvent(type, node) {
        console.debug("sendNativeEvent", type, node)
        if (!type || !node) {
            console.error("Fontsampler.ui.sendNativeEvent: type or node not defined", type, node)
            return
        }
        // TODO maybe have fallback for deprecated Event.init way of sending
        // native browser events?
        node.dispatchEvent(new Event(type))
    }

    function onKey(event) {
        if (event.type === "keypress") {
            // for keypress events immediately block pressing enter for line break
            if (event.keyCode === 13) {
                event.preventDefault()
                return false;
            }
        } else {
            // allow other events, filter any html with $.text() and replace linebreaks
            // TODO fix paste event from setting the caret to the front of the non-input non-textarea
            var text = blocks.tester.textContent,
                hasLinebreaks = text.indexOf("\n")

            if (-1 !== hasLinebreaks) {
                blocks.tester.innerHTML(text.replace('/\n/gi', ''));
                selection.setCaret(blocks.tester, blocks.tester.textContent.length, 0);
            }
        }
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(key) {
        var element = getElement(key)

        if (element) {
            return element.value
        } else {
            return false
        }
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} key 
     */
    function getCssValue(key) {
        var element = getElement(key)

        return element ? element.value + element.dataset.unit : ""
    }

    function getOpentype() {
        if (!blocks.opentype) {
            return false
        }

        var features = blocks.opentype.querySelectorAll("[data-feature]")

        if (features) {
            var re = {}

            for (var f = 0; f < features.length; f++) {
                var input = features[f]
                re[input.dataset.feature] = input.checked
            }

            return re
        }
    }

    /**
     * Return the current variation settings as object
     * 
     * If Axis is passed, only that axis’ numerical value is returned
     * @param {*} axis 
     */
    function getVariation(axis) {

        var axes = getAxisKeys(),
            input,
            va = {};

        if (axes) {
            for (var v = 0; v < axes.length; v++) {
                input = getElement(axes[v])
                if (!input) {
                    console.warn("No axis element found for:", axes[v])
                } else {
                    va[input.dataset.fsjs] = input.value
                }
            }
        }

        if (typeof (axis) === "string" && axis in va) {
            return va[axis]
        }

        return va
    }

    function getButtongroupValue(key) {
        var element = getElement(key),
            selected

        if (element) {
            selected = element.querySelector("." + options.classes.buttonSelectedClass)
        }

        if (selected) {
            return selected.dataset.choice
        } else {
            return ""
        }
    }

    function getCssAttrForKey(key) {
        if (key in keyToCss) {
            return keyToCss[key]
        }

        return false
    }

    function getKeyForCssAttr(attr) {
        for (var key in keyToCss) {
            if (keyToCss.hasOwnProperty(key)) {
                if (keyToCss[key] === attr) {
                    return key
                }
            }
        }

        return false
    }

    function _updateSlider(key, value) {
        var element = getElement(key)
        if (parseFloat(element.value) !== parseFloat(value)) {
            element.value = value
            sendNativeEvent("change", element)
        }
    }

    function setValue(key, value) {
        console.debug("Fontsampler.ui.setValue()", key, value)
        var element = getElement(key),
            has_ui = Object.keys(blocks).indexOf(key) !== -1;

        switch (key) {
            case "fontsize":
            case "lineheight":
            case "letterspacing":
                if (typeof (value) === "undefined") {
                    // no value means get and use the element value
                    value = getValue(key)
                } else {
                    // if a value was passed in check if it is within bounds,
                    // valid and if the slider needs an update (via native event)
                    value = utils.clamp(value, options.config[key].min,
                        options.config[key].max, options.config[key].init)

                }

                if (parseFloat(element.value) !== parseFloat(value) &&
                    has_ui) {
                    // Trigger native input element change only if this is an
                    // config value that has a UI rendered
                    sendNativeEvent("change", element)
                }

                if (has_ui) {
                    // Trigger UI change only if this is an
                    // config value that has a UI rendered
                    _updateSlider(key, value)
                    setLabelValue(key, value)
                }

                setInputCss(keyToCss[key], value + options.config[key].unit)
                break;

            case "opentype":
                setInputOpentype(value)
                break;

            case "language":
                setInputAttr("lang", value)
                break;

            case "fontfamily":
                // Trigger an event that will start the loading process in the
                // Fontsampler instance
                sendEvent(events.fontChanged, { font: value })
                break;

            case "alignment":
                setInputCss(keyToCss[key], value)
                break;

            case "direction":
                setInputAttr("dir", value)
                break;

            case "tester":
                break;

            default:
                if (isAxisKey(key)) {
                    var updateVariation = {}

                    // onSlide triggers an update of just the axis without
                    // value to propagate Skin interaction, so on "first" call
                    // this should use the init value, if existing, otherwise
                    // simply "set" the current value of the axis slider
                    if (typeof (value) === "undefined") {
                        value = element.value
                    }

                    if (typeof (value) !== "object") {
                        updateVariation[key] = value
                    }

                    for (var axis in updateVariation) {
                        if (updateVariation.hasOwnProperty(axis)) {
                            val = setVariation(key, updateVariation[axis],
                                has_ui)
                        }
                    }
                }
                break;
        }
        var obj = {}
        obj[key] = value
        sendEvent(events.valueChanged, obj)
    }

    /**
     * Update a single variation axis and UI
     */
    function setVariation(axis, val, has_ui) {
        console.debug("Fontsampler.ui.setVariation()", axis, val)
        var v = getVariation(),
            opt = null,
            has_ui = typeof (has_ui) === "undefined" ? true : !!has_ui;

        if (isAxisKey(axis)) {
            // TODO refactor to: getAxisOptions() and also use
            // it on axis setup / options parsing
            opt = getAxisOptions(axis)
            v[axis] = utils.clamp(val, opt.min, opt.max)

            if (has_ui) {
                _updateSlider(axis, v[axis])
                setLabelValue(axis, v[axis])
            }
            setInputVariation(v)

            return v[axis]
        }
    }

    function getAxisOptions(axis) {
        opt = options.config[axis]
        if (!opt || typeof (opt) === "undefined") {
            opt = {
                min: 100,
                max: 900
            }
        }

        if (typeof (opt.min) === "undefined") {
            opt.min = 100
        }
        if (typeof (opt.max) === "undefined") {
            opt.max = 900
        }
        return opt
    }

    // /**
    //  * Bulk update several variations from object
    //  * 
    //  * @param object vals with variation:value pairs 
    //  */
    // function setVariations(vals) {
    //     if (typeof(vals) !== "object") {
    //         return false
    //     }

    //     for (var axis in vals) {
    //         if (vals.hasOwnProperty(axis)) {
    //             setVariation(axis, vals[axis])
    //         }
    //     }
    // }

    function fontIsInstance(variation, fontname) {
        if (typeof (variation) !== "object") {
            return false
        }

        for (var v in variation) {
            // for now just ignore values that are not a number, don't throw an error
            if (!isNaN(parseInt(variation[v]))) {
                variation[v] = variation[v].toString()
            }
        }

        for (var i = 0; i < fonts.length; i++) {
            var f = fonts[i]

            if ("instance" in f === false) {
                continue
            }

            try {
                var parts = f.instance.split(","),
                    vars = {}
                for (var k = 0; k < parts.length; k++) {
                    var p = parts[k].trim().split(" ")
                    vars[p[0]] = p[1].toString()
                }

                // check if all variation keys and values match
                if (Object.keys(variation).length !== Object.keys(vars).length) {
                    continue
                }

                // elegant compare equal for objects, if equal return font
                if (JSON.stringify(vars) === JSON.stringify(variation) &&
                    fontname === f.name) {
                    return f
                }
            } catch (e) {
                continue
            }
        }

        return false
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        input.style[attr] = val
    }

    function setInputAttr(attr, val) {
        input.setAttribute(attr, val)
    }

    function setInputOpentype(features) {
        var parsed = [],
            val
        for (var key in features) {
            if (features.hasOwnProperty(key) && key && typeof (key) !== "undefined") {
                parsed.push('"' + key + '" ' + (features[key] ? "1" : "0"))
            }
        }
        val = parsed.join(",")

        input.style["font-feature-settings"] = val
    }

    function variationCssToObject(css) {
        // console.log("variationCssToObject", css)
        if (!css) {
            return {}
        }
        let parts = [],
            obj = {};

        if (css.indexOf(",") === -1) {
            parts = [css]
        } else {
            parts = css.split(",")
        }

        parts.forEach((p) => {
            // remove all quotes
            p = p.replace(/'|"/gm, "")

            // get first 4 letters
            let axis = p.match(/([A-z]{4})/)[0]

            // get numeric value
            let value = p.replace(/[^\-0-9.,]*/, "")

            obj[axis] = value
        })

        return obj
    }

    function variationObjectToCss(obj) {
        let values = []
        Object.keys(obj).forEach((axis) => {
            values.push("'" + axis + "' " + obj[axis])
        })
        return values.join(", ")
    }

    function getInputVariations(node) {
        let cs = getComputedStyle(node),
            current = variationCssToObject(cs.getPropertyValue("font-variation-settings"));

        return current;
    }

    function setInputVariation(variations) {
        var parsed = []

        // Whatever the passed in variations, make sure to also default values
        // for any axes not passed in.
        const defaults = getDefaultVariations()
        const current = getInputVariations(input)
        const merged = Object.assign(defaults, current, variations)

        // Now loop all variations, defaults and passed in ones, and compile
        // a CSS string
        for (var key in merged) {
            if (merged.hasOwnProperty(key) && key && typeof (key) !== "undefined") {
                parsed.push('"' + key + '" ' + (merged[key]))
            }
        }
        val = parsed.join(",")

        input.style["font-variation-settings"] = val

        // Update fontfamily select if it exists
        // When a variable font is updated check if the selected values
        // match a defined instance, and if set it active in the font family
        if (dom.isNode(blocks.fontfamily)) {
            var fontname = getElement("fontfamily", blocks.fontfamily).value
            var instanceFont = fontIsInstance(variations, fontname)
            if (instanceFont === false) {
                dom.nodeAddClass(blocks.fontfamily, options.classes.disabledClass)
            } else {
                dom.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)
                var element = getElement("fontfamily"),
                    option

                if (element.value !== instanceFont.name) {
                    option = element.querySelector("option[value='" + instanceFont.name + "']")
                    if (dom.isNode(option)) {
                        option.selected = true
                    }
                    element.value = instanceFont.name
                }
            }
        }
    }

    function setActiveFont(name) {
        if (dom.isNode(blocks.fontfamily)) {
            var element = getElement("fontfamily", blocks.fontfamily),
                option

            dom.nodeRemoveClass(blocks.fontfamily, options.classes.disabledClass)

            if (dom.isNode(element)) {
                // Only update if it is not the selected fontfamily value
                if (element.value !== name) {
                    option = element.querySelectorAll("option[value='" + name + "']")
                    if (dom.isNode(option)) {
                        option.selected = true
                    }
                    element.value = name
                    sendNativeEvent("change", element)
                }
            }
        }
    }

    function setActiveAxes(axes) {
        if (dom.isNode(blocks.variation)) {
            var sliders = blocks.variation.querySelectorAll("[data-axis]")

            if (sliders) {
                for (var s = 0; s < sliders.length; s++) {
                    if (!Array.isArray(axes) || axes.length < 1 ||
                        axes.indexOf(sliders[s].dataset.axis) === -1 ||
                        supports.woff2 === false ||
                        supports.variableFonts === false
                    ) {
                        dom.nodeAddClass(sliders[s].parentNode, options.classes.disabledClass)
                    } else {
                        dom.nodeRemoveClass(sliders[s].parentNode, options.classes.disabledClass)
                    }
                }
            }
        }
    }

    function setActiveLanguage(lang) {
        if (dom.isNode(blocks.language) && typeof (lang) === "string") {
            var languageChoices = options.config.language.choices.map(function (value) {
                return value.split("|")[0]
            })

            if (languageChoices.length !== -1) {
                var option = blocks.language.querySelector("option[value='" + lang + "']")

                if (dom.isNode(option)) {
                    // Trigger the change on the native input
                    blocks.language.value = lang
                    option.selected = true
                    sendNativeEvent("change", blocks.language)

                    sendEvent(events.languageChanged)
                }
            }
        }
    }

    function setActiveOpentype(features) {
        var checkboxes = false

        if (dom.isNode(blocks.opentype)) {
            checkboxes = blocks.opentype.querySelectorAll("[data-feature]")
        }
        if (checkboxes) {
            for (var c = 0; c < checkboxes.length; c++) {
                if (Array.isArray(features)) {
                    if (features.indexOf(checkboxes[c].dataset.feature) === -1) {
                        dom.nodeAddClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    } else {
                        dom.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                    }
                } else {
                    dom.nodeRemoveClass(checkboxes[c].parentNode, "fsjs-checkbox-inactive")
                }
            }
        }
    }

    function setInputText(text) {
        if (text && input) {
            input.innerHTML = text
        }
    }

    function setLabelValue(key, value) {
        var labelValue = root.querySelector("[data-fsjs-for='" + key + "'] ." + options.classes.labelValueClass)

        if (labelValue) {
            labelValue.textContent = value
        }
    }

    function setStatusClass(classString, status) {
        if (status === true) {
            dom.nodeAddClass(root, classString)
        } else if (status === false) {
            dom.nodeRemoveClass(root, classString)
        }
    }

    function setFontClass(classString) {
        if (input.dataset.fontClass) {
            dom.nodeRemoveClass(input, input.dataset.fontClass)
        }
        if (classString) {
            input.dataset.fontClass = classString
            dom.nodeAddClass(input, classString)
        }
    }

    return {
        init: init,
        getValue: getValue,
        setValue: setValue,

        getCssValue: getCssValue,
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getVariation: getVariation,
        getCssAttrForKey: getCssAttrForKey,
        getKeyForCssAttr: getKeyForCssAttr,
        setInputCss: setInputCss,
        // setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        // setInputVariation: setInputVariation,
        setInputText: setInputText,
        setFontClass: setFontClass,

        setStatusClass: setStatusClass,

        setActiveFont: setActiveFont,
        setActiveAxes: setActiveAxes,
        setActiveLanguage: setActiveLanguage,
        setActiveOpentype: setActiveOpentype,
        setLabelValue: setLabelValue,

        isAxisKey: isAxisKey,

        sendEvent: sendEvent,
        sendNativeEvent: sendNativeEvent
    }
}
module.exports = UI