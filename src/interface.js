var UIElements = require("./uielements")
var Helpers = require("./helpers")
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
        root.className = Helpers.addClass(options.rootClass, root.className)
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
            validateNode(node, options.ui[item])
            // initNode(item, node, options.ui[item])
            uinodes[item] = node
            
            return true
        } else if (options.ui[item].render && item in ui === true && item in uinodes === false) {
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
        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui
        if (item === "fontfamily") {
            opt.choices = fonts.map(function (value) {
                return value.name
            })
        }

        var node = uifactory[ui[item]](item, opt),
            wrapper

        // initNode(item, node, opt)

        wrapper = document.createElement("div")
        wrapper.className = opt.wrapperClass + " " + "fontsampler-ui-type-" + ui[item]

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
    function validateNode(/*node, opt*/) {
        // TODO
        return true
    }

    /**
     * Init a UI element with values (update DOM to options)
     * @param node node 
     * @param object opt 
     * @return boolean
     */
    function initNode(key, node, opt) {
        // TODO set values if passed in an different on node

        node.addEventListener("change", onChange)
        node.addEventListener("click", onClick)

        if (ui[key] === "slider") {
            node.val = opt.init
            setInputCss(keyToCss[key], opt.init + opt.unit)
        } else if (ui[key] === "dropdown") {
            // TODO
        } else if (ui[key] === "buttongroup") {
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
        //     label = root.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        // if (label) {
        //     label.innerText = getValue(property)
        // }

        root.dispatchEvent(customEvent)
    }

    function onClick(e) {
        var property = e.target.parentNode.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "clicked"),
            buttons = e.target.parentNode.childNodes,
            currentClass = "fontsampler-buttongroup-selected"

        if (property in ui && ui[property] === "buttongroup") {    
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].className = Helpers.pruneClass(currentClass, buttons[b].className)
            }
            e.target.className = Helpers.addClass(currentClass, e.target.className)

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

        return element.value
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

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        uinodes.tester.style[attr] = val
    }

    function setInputAttr(attr, val) {
        uinodes.tester.setAttribute(attr, val)
    }

    function setInputOpentype(features) {
        var parsed = []
        for (var key in features) {
            if (features.hasOwnProperty(key)) {
                parsed.push('"' + key  + '" ' + (features[key] ? "1" : "0"))
            }
        }
        var val = parsed.join(",")

        uinodes.tester.style["font-feature-settings"] = val
    }

    // TODO use helper.pruneClass
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
        getButtongroupValue: getButtongroupValue,
        getOpentype: getOpentype,
        getCssAttrForKey: getCssAttrForKey,
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setInputOpentype: setInputOpentype,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface