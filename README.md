# Fontsampler.js (v0.0.2)

A configurable standalone webfont type tester for displaying and manipulating sample text in the browser.

Fontsampler library ~13kb minified & gzipped
Fontsampler skin js & css ~15kb minified & gzipped

Support for:
* woff / woff2 / woff2 variable fonts
* available and configurable UI for:
    * tester input
    * font picker
    * font size
    * line height
    * letter spacing
    * alignment
    * direction (ltr/rtl)
    * language (html lang attr, triggering OT locl features)
    * variable axes (configurable, not detected)
    * opentype (configurable, not detected)
* API for manipulating the instances
* optional skin to enhance bare browser input UI
* configurable UI, options, font settings
* initialization on empty DOM node
* initialization on existing DOM structure (to use custom layout and UI)

## Installation

Via npm:

    $ npm install fontsampler-js

## Use

See [underscoretype.github.io/fontsampler-js/](https://underscoretype.github.io/fontsampler-js/) for 
detailed examples.

A minimal example:

    <script src="../dist/fontsampler.js"></script>
    <script src="../dist/fontsampler-skin.js"></script>
    <link rel="stylesheet" href="../dist/fontsampler-skin.css">
    …
    <div id="demo"></div>
    …
    <script>
    var fonts = [
        "name": "My Font",
        "files": ["path/to/file.woff", "path/to/file.woff2"]
    ]
    var options = {
        order: [["fontsize", "lineheight", "letterspacing"], "tester"]
    }
    var demo = new Fontsampler(document.getElementById("demo"), fonts, options)
    FontsamplerSkin(demo)
    demo.init()
    </script>


## Status

Currently work in progress and pre-release. **API not stable and likely to change.**


### Development

PRs, issue reports and feature requests welcome.

Development requirements:

    $ npm install

If you use VSCode src compiling tasks should automatically be started, else see the package.json scripts.

For testing:

    $ npm install -g protractor jasmine
    $ webdriver-manager start
    $ npm run test


### TODO / Roadmap
* Implement public event interface (change, click, init, loading, loaded) _mostly done_
* Implement API on main object (set/get, set/get option, destroy, reset) _mostly done_
* Implement per-font options (e.g. one font ltr other rtl etc) _partially done_
* Add Unit and End-to-End tests _started_


## License

Licensed under [MIT License](LICENSE.txt)


### Licenses for fonts included in the demo
* [Alegreya](https://github.com/huertatipografica/Alegreya/) by [Huerta Tipografica](https://www.huertatipografica.com/) ([License](https://github.com/huertatipografica/Alegreya/blob/master/LICENSE.md))
* [IBM Plex Sans](https://github.com/IBM/plex) by [Bold Monday](https://www.boldmonday.com/) and Mike Abbink / [IBM](https://www.ibm.com/plex/) ([License](https://github.com/IBM/plex/blob/master/LICENSE.txt))
* [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) by [Wei Huang](https://github.com/weiweihuanghuang) ([License](https://github.com/weiweihuanghuang/Work-Sans/blob/master/OFL.txt))
* [Amstelvar](https://github.com/TypeNetwork/Amstelvar) by [TypeNetwork](https://github.com/TypeNetwork)/David Berlow ([License](https://github.com/TypeNetwork/Amstelvar/blob/master/COPYRIGHT.md))