/**
 * A simple Fontsampler instantiation with no configuration and fonts defined
 * as data attributes
 */

window.addEventListener("load", function () {
    let node = document.getElementById("demo-dom"),
        fonts = [{
            "name": "Alegreya Regular",
            "files": ["./fonts/alegreya/alegreya-v12-latin-regular.woff2", "./fonts/alegreya/alegreya-v12-latin-regular.woff"]
        }];

    new Fontsampler(node, fonts).init()
})
