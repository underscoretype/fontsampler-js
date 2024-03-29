# TODO

## Refactoring

### Requirements
- Should be able to configure entirely from DOM
- Should be able to configure entirely from JS
- Overwrites the DOM container's contents on init

### Current issues
- Programmatic changes not super reliable
- [+] Code structure for UI changes and UI generation too obfuscated
- [+]Variable font support treated as one UI element, when each axis should be an element
- Woff2/Woff structure antiquated
- [+] Fallback font for Woff2 Variable required
- Variable font init values buggy
- Make values configurable without showing the UI element (e.g. init fontsize)

#### Nice to have
- Typewriter
- Fit to width
- Possibility to pass in different inits and configs for different breakpoints
- Make documentation single page
- Unicode range definition and rendering per font
- Possibility to pass in "custom" elements into the fontsampler UI, this could be done by passing in either ID or DOM node to copy/place
- Make opentype element optionally either checkbox or button group

### Desired sample configurations

**DOM**

<div id="sample"
    data-fonts="variable.woff2"
    or
    data-fonts="variable.woff2,fallback.woff"
    or
    data-fonts="[{name:'Optional name',files:[variable.woff2,fallback.woff}]"
    or
    data-fonts="[{name:'Optional name',files:[variable.woff2,fallback.woff]},other.woff2,{files:[another.woff2,fallback.woff]}]"
    or
    data-fonts="variable.woff2,instances:['wght 250|Work Sans Thin'],features:['rlig']"
>Sample</div>
...
new Fontsampler(document.getElementById("sample)).init()

**JS**

options = {
    initialText: "",
    multiline: true,
    lazload: false,
    classes: {...},
    order: [
        "fontsize", 
        "...any predefined elements...", 
        "or fvar axis tag", 
        ..., 
        ["nested element", "another nested element"], 
        ...append any "ui" elements not listed explicitly...
        ],

    config: {
        "any element or axis tag": {
            ... specific options ...
        }

        e.g. axis:
        "wght": {
            init: 400,
            min: 250,
            max: 900,
            step: 10,
            label: "Weight"
        }

        or predefined element:
        opentype: {
            "choices": ["liga", "dlig", "rlig", "calt"]
        },
    }
}

fonts = [
    {
        "name": "Optional name",
        "files": [
            variable.woff2,
            fallback.woff
        ],
        "variation": {
            "wght": 250,
            "opsz": 12
        }
        "language": "ar-afb",
        "features": ["rlig", "calt"]
    }
]

new Fontsampler(document.getElementById("sample", options, fonts)).init()

**API**

FS(element, option(optional), fonts(optional if set in DOM))

FS.init() // Clear DOM, create Fontsampler

FS.destroy() // Clear DOM, leave whatever text/html was displayed

FS.showFont(1)
FS.showFont("path/to/variable.woff")
FS.showFont("Font name")

FS.setOptions(options)

FS.setFonts(options)

FS.setText(textOrHtml)

//FS.setLabel(textOrHtml)

FS.setValue(blockOrAxistag, value)

FS.getValue(blockOrAxistag)

FS.lazyLoad(Boolean) // start or stop lazyloading fonts in the background