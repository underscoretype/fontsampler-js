
// Get the HTMLElement (use getElementById, querySelector, etc.)
// It is important to pass in a single node, not an Array/Selection
let customButton = document.getElementById("custom-button"),
    customImage = document.getElementById("custom-image");

let node = document.getElementById("demo-custom-elements"),
    fonts = [{
        "name": "Alegreya Regular",
        "files": ["./fonts/alegreya/alegreya-v12-latin-regular.woff2", "./fonts/alegreya/alegreya-v12-latin-regular.woff"]
    }],
    options = {
        order: [
            // Note that you are passing a reference to the actual HTMLElement, not its id!
            [customImage, "fontsize", "lineheight"],
            ["fontfamily", "alignment", customButton],
            ["tester"],
        ]
    };

let fs = new Fontsampler(node, fonts, options)
FontsamplerSkin(fs)
fs.init()

