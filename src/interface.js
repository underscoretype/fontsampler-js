var UIElements = require("./uielements")
var helpers = require("./helpers")
var errors = require("./errors")
var selection = require("./selection")

function Interface(_root, fonts, options) {

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
            "letterspacing": "letterSpacing"
        },
        root = null,
        uifactory = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.debug("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
        root.className = helpers.addClass(options.rootClass, root.className)
        uifactory = UIElements(root, options)

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
        // · UI elements defined in ui option but not in order option will be 
        //   appended in the end
        // · Items neither in the DOM nor in options are skipped
        for (var i = 0; i < options.order.length; i++) {
            var elementA = parseUIOrderElement(options.order[i])
            if (elementA) {
                root.appendChild(elementA)
            }
        }
        for (var keyB in options.ui) {
            if (options.ui.hasOwnProperty(keyB)) {
                if (keyB in uinodes === false) {
                    var elementB = parseUIOrderElement(options.ui[keyB])
                    if (elementB) {
                        root.appendChild(elementB)
                    }
                }
            }
        }

        // after all nodes are instantiated, update the tester to reflect
        // the current state
        for (var keyC in uinodes) {
            if (uinodes.hasOwnProperty(keyC)) {
                initNode(keyC, uinodes[keyC], options.ui[keyC])
            }
        }

        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                if (typeEvents.hasOwnProperty(e)) {
                    uinodes.tester.addEventListener(typeEvents[e], onKey)
                }
            }
        }

        // prevent pasting styled content
        uinodes.tester.addEventListener('paste', function(e) {
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
    }

    /**
     * Recursively go through an element in the options.order
     * @param string item
     * @param node parent
     */
    function parseUIOrderElement(item) {
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
            // Skipping not defined UI element

            return false
        }
    }

    /**
     * Parse an UI element from DOM or options
     * @param string item 
     * @return node || boolean (true = in DOM, false = invalid item)
     */
    function parseUIElement(item) {
        if (item in ui === false) {
            throw new Error(errors.invalidUIItem + item)
        }

        // check if in DOM
        // validate and hook up
        var node = getUIItem(item)
        if (node) {
            validateNode(item, node, options.ui[item])
            uinodes[item] = node

            return true
        } else if (options.ui[item].render && item in ui === true && item in uinodes === false) {
            node = createNode(item, options.ui[item])
            validateNode(item, node, options.ui[item])
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
        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui
        if (item === "fontfamily") {
            opt.choices = fonts.map(function(value) {
                return value.name
            })
        }

        var node = uifactory[ui[item]](item, opt),
            wrapper = document.createElement("div")

        if (opt.label) {
            wrapper.append(uifactory.label(opt.label, opt.unit, opt.init, item))
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
    function validateNode(key, node, opt) {
        // passing uifactory the node will validate the node against the
        // required options (for those uielements that are implemented to
        // take a third parameter)
        var uielement = uifactory[ui[key]](key, opt, node.querySelector("[data-property]")),
            classes = [
                options.elementClass + "",
                options.elementClass + "-block-" + key,
                options.elementClass + "-type-" + ui[key]
            ]

        for (var c = 0; c < classes.length; c++) {
            node.className = helpers.addClass(classes[c], node.className)
        }

        if (opt.label) {
            var labels = root.querySelectorAll("[for='" + key + "']")
            if (labels.length > 0) {
                for (var l = 0; l < labels.length; l++) {
                    var label = labels[l],
                        text = label.querySelector("." + options.labelTextClass),
                        value = label.querySelector("." + options.labelValueClass),
                        unit = label.querySelector("." + options.labelUnitClass)

                    if (text && text.textContent === "") {
                        text.textContent = opt.label
                    }

                    if (value && value.textContent === "") {
                        // If set in already set in DOM the above validate will have set it
                        value.textContent = uielement.value
                    }

                    if (unit && unit.textContent === "") {
                        // If set in already set in DOM the above validate will have set it
                        unit.textContent = uielement.dataset.unit
                    }

                }
            }
        }

        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(key, node, opt) {
        // TODO set values if passed in and different on node

        if (ui[key] === "slider") {
            node.addEventListener("change", onChange)
            node.val = opt.init
            setInputCss(keyToCss[key], opt.init + opt.unit)
        } else if (ui[key] === "dropdown") {
            node.addEventListener("change", onChange)
            // TODO
        } else if (ui[key] === "buttongroup") {
            var buttons = node.querySelectorAll("[data-choice]")

            if (buttons.length > 0) {
                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].addEventListener("click", onClick)
                }
            }

            // TODO 
        } else if (ui[key] === "checkboxes") {
            node.addEventListener("change", onChange)

            // TODO
        }

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
        return root.querySelector("[data-property='" + item + "']")
    }

    /**
     * Catch-all UI element event listener firing a scoped CustomEvent based
     * on the element’s property
     * @param {*} e 
     */
    function onChange(e) {
        var property = e.target.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed")

        root.dispatchEvent(customEvent)
    }

    /**
     * Currently only reacting to buttongroup nested buttons’ clicks
     * @param {*} e 
     */
    function onClick(e) {
        var parent = e.currentTarget.parentNode,
            property = parent.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "clicked"),
            buttons = parent.querySelectorAll("[data-choice]"),
            currentClass = "fontsampler-buttongroup-selected"

        if (property in ui && ui[property] === "buttongroup") {
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].className = helpers.pruneClass(currentClass, buttons[b].className)
            }
            e.currentTarget.className = helpers.addClass(currentClass, e.currentTarget.className)

            root.dispatchEvent(customEvent)
        }
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
            var text = uinodes.tester.textContent,
                hasLinebreaks = text.indexOf("\n")

            if (-1 !== hasLinebreaks) {
                uinodes.tester.innerHTML(text.replace('/\n/gi', ''));
                selection.setCaret(uinodes.tester, uinodes.tester.textContent.length, 0);
            }
        }
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(property) {
        var element = getUIItem(property)

        if (element) {
            return element.value
        } else {
            return false
        }
    }

    /**
     * Get a UI element value with CSS unit
     * @param {*} property 
     */
    function getCSSValue(property) {
        var element = getUIItem(property)

        return element.value + element.dataset.unit
    }

    function getOpentype() {
        if (!uinodes.opentype) {
            return false
        }

        var features = uinodes.opentype.querySelectorAll("[data-feature]")

        if (features) {
            var re = {}

            for (var f = 0; f < features.length; f++) {
                var input = features[f]
                re[input.dataset.feature] = input.checked
            }

            return re
        }
    }

    function getButtongroupValue(property) {
        var element = getUIItem(property),
            selected = element.querySelector(".fontsampler-buttongroup-selected")

        if (selected) {
            return selected.dataset.choice
        } else {
            return null
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

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        uinodes.tester.style[attr] = val
        var key = getKeyForCssAttr(attr)

        if (key && key in ui) {
            if (ui[key] === "slider") {
                if (val !== getCSSValue(key)) {
                    var value = getValue(attr)
                    if (value) {
                        uinodes[key].value = value
                    }
                }
            }
        }
    }

    function setInputAttr(attr, val) {
        uinodes.tester.setAttribute(attr, val)
    }

    function setInputOpentype(features) {
        var parsed = []
        for (var key in features) {
            if (features.hasOwnProperty(key)) {
                parsed.push('"' + key + '" ' + (features[key] ? "1" : "0"))
            }
        }
        var val = parsed.join(",")

        uinodes.tester.style["font-feature-settings"] = val
    }

    function setInputText(text) {
        if (text && uinodes.tester) {
            uinodes.tester.textContent = text
        }
    }

    // TODO use helper.pruneClass
    function setStatusClass(classString, status) {
        if (status === true) {
            root.className = helpers.addClass(classString, root.className)
        } else if (status === false) {
            root.className = helpers.pruneClass(classString, root.className)
        }
    }

    return {
        init: init,
        getValue: getValue,
        getCSSValue: getCSSValue,
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getCssAttrForKey: getCssAttrForKey,
        getKeyForCssAttr: getKeyForCssAttr,
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        setInputText: setInputText,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface