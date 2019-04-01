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
            // opentype: "checkboxes"
        },
        root = null,
        uifactory = null,
        uinodes = {},
        originalText = ""

    function init() {
        console.log("Fontsampler.Interface.init()", _root, fonts, options)

        root = _root
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
            var element = parseUIOrderElement(options.order[i])
            if (element) {
                root.appendChild(element)
            }
        }
        for (var key in options.ui) {
            if (!key in uinodes) {
                console.log("STILL MISSING", key)
                var element = parseUIOrderElement(options.ui[key])
                if (element) {
                    root.appendChild(element)
                }
            }
        }


        // prevent line breaks on single line instances
        if (!options.multiline) {
            var typeEvents = ["keypress", "keyup", "change", "paste"]
            for (var e in typeEvents) {
                uinodes.tester.addEventListener(typeEvents[e], function (event) {
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
                })
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
        console.debug("Fontsampler.Interface.parseUIElement", item, options, "RENDER?", options.ui[item].render)

        // console.warn(item, item in ui)
        if (item in ui === false) {
            throw new Error(errors.invalidUIItem + item)
        }

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

        // The fontfamily is just being defined without the options, which
        // are the fonts passed in. let’s make this transformation behind
        // the scenes so we can use the re-usable "dropdown" ui
        if (item === "fontfamily") {
            opt.choices = fonts.map(function (value, index) {
                return value.name
            })
        }

        var node = uifactory[ui[item]](item, opt),
            wrapper

        initNode(node, opt)

        wrapper = document.createElement("div")
        wrapper.className = opt.wrapperClass

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
        node.addEventListener("click", onClick)


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
        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "changed"),
            label = root.querySelector("label[for='" + property + "'] .fontsampler-label-value")

        if (label) {
            label.innerText = getValue(property)
        }

        root.dispatchEvent(customEvent)
    }

    function onClick(e) {
        var property = e.currentTarget.dataset.property,
            customEvent = new CustomEvent("fontsampler.on" + property + "clicked"),
            buttons = e.currentTarget.childNodes,
            currentClass = "fontsampler-buttongroup-selected"

        console.log("onClick", property, property in ui, ui[property])
        if (property in ui && ui[property] === "buttongroup") {    
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].className = Helpers.pruneClass(currentClass, buttons[b].className)
            }
            e.target.className = Helpers.addClass(currentClass, e.target.className)

            root.dispatchEvent(customEvent)
        } else if (property in ui && ui[property] === "textfield") {
            console.log("text onClick")
        }
    }

    /**
     * Get a UI element value
     * @param {*} property 
     */
    function getValue(property) {
        console.log("getValue", property)
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

    function getButtongroupValue(property) {
        var element = getUIItem(property),
            selected = element.querySelector(".fontsampler-buttongroup-selected")

        console.log("selected", element, selected)

        if (selected) {
            return selected.dataset.choice
        } else {
            return null
        }
    }

    /**
     * Set the tester’s text
     * @param {*} attr 
     * @param {*} val 
     */
    function setInputCss(attr, val) {
        console.log("Fontsampler.interface.setInput", attr, val)
        uinodes.tester.style[attr] = val
    }

    function setInputAttr(attr, val) {
        uinodes.tester.setAttribute(attr, val)
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
        setInputCss: setInputCss,
        setInputAttr: setInputAttr,
        setStatusClass: setStatusClass
    }
}
module.exports = Interface