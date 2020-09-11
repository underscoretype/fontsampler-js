/*
 * The first Fontsampler example with some basic configuration
 */
window.addEventListener("load", function () {
    // Demo full
    var alegreyaFonts = [
            { name: "Alegreya Regular", files: ["./fonts/alegreya/alegreya-v12-latin-regular.woff", "./fonts/alegreya/alegreya-v12-latin-regular.woff2"] },
            { name: "Alegreya Italic", files: ["./fonts/alegreya/alegreya-v12-latin-italic.woff", "./fonts/alegreya/alegreya-v12-latin-italic.woff2"] },
            { name: "Alegreya Bold", files: ["./fonts/alegreya/alegreya-v12-latin-700.woff", "./fonts/alegreya/alegreya-v12-latin-700.woff2"] },
            { name: "Alegreya Bold Italic", files: ["./fonts/alegreya/alegreya-v12-latin-700italic.woff", "./fonts/alegreya/alegreya-v12-latin-700italic.woff2"] },
        ],
        optionsFull = {
            order: [
                ["fontsize", "lineheight", "letterspacing"],
                ["fontfamily", "alignment"],
                ["tester"]
            ]
        }
    var fs = new Fontsampler(document.getElementById("demo-intro"), alegreyaFonts, optionsFull)
    FontsamplerSkin(fs)
    fs.init()
})
