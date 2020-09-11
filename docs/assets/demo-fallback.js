/*
 * A Fontsampler with JS defined font object with fallback font
 */
window.addEventListener("load", function() {
    // Demo full
    var alegreyaFonts = [{
        name: "Alegreya Regular",
        files: ["./fonts/alegreya/alegreya-v12-latin-regular.woff", "./fonts/alegreya/alegreya-v12-latin-regular.woff2"],
        fallback: "Arial"
    }]
    var fs = new Fontsampler(document.getElementById("demo-fallback"), alegreyaFonts)
    FontsamplerSkin(fs)
    fs.init()
})