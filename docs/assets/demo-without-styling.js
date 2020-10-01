/*
 * A Fontsampler example using all UI elements
 */
window.addEventListener("load", function () {

    var fonts = [
        {
            "name": "Alegreya Regular", 
            "files": ["./fonts/alegreya/alegreya-v12-latin-regular.woff"],
            "features": ["liga", "dlig"],
            "language": "en-gb"
        }, 
        { 
            "name": "Alegreya Italic", 
            "files": ["./fonts/alegreya/alegreya-v12-latin-italic.woff"],
            "features": ["liga", "dlig"],
            "language": "en-gb"
        }
    ]

    var options = {
        
        // initialText: "",

        multiline: true,

        lazyload: true,

        order: [
            ["fontfamily", "alignment"],
            ["fontsize", "lineheight", "opentype"],
            "tester"
        ],

    }
    
    var fs = new Fontsampler(document.getElementById("example-without-styling"), fonts, options)
    fs.init()
})
