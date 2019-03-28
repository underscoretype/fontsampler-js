var Fontloader = require("./fontloader")

function Preloader() {

    var queue = [],
        autoload = true

    function load(fonts) {
        console.debug("Fontsampler.Preloader.load", fonts)

        // clone the fonts array
        queue = fonts.slice(0)

        loadNext()
    }

    function pause() {
        autoload = false
    }

    function resume() {
        autoload = true
        if (queue.length > 0) {
            loadNext()
        }
    }

    function loadNext() {
        if (queue.length > 0) {
            Fontloader.fromFiles(queue[0].files, function () {
                queue.shift()
                console.log("preload finished", queue.length)
                
                if (queue.length > 0) {
                    loadNext()
                }
            })
        }
    }

    return {
        load: load,
        pause: pause,
        resume: resume
    }
}


module.exports = Preloader