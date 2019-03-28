var Fontloader = require("./fontloader")

function Preloader() {

    var queue = [],
        autoload = true,
        finishedCallback = null

    function load(fonts, callback) {
        console.debug("Fontsampler.Preloader.load", fonts)

        // clone the fonts array
        queue = fonts.slice(0)
        autoload = true

        if (typeof(callback) === "function") {
            finishedCallback = callback
        }

        loadNext()
    }

    function pause() {
        autoload = false
    }

    function resume() {
        autoload = true
        if (queue.length > 0) {
            loadNext()
        } else {
            if (finishedCallback) {
                finishedCallback()
            }
        }
    }

    function loadNext() {
        if (queue.length > 0 && autoload) {
            Fontloader.fromFiles(queue[0].files, function () {
                queue.shift()
                // console.debug("Fontsampler.Preloader.loadNext, preloading file finished, remaining queue length", 
                    // queue.length)

                if (queue.length === 0 && finishedCallback) {
                    finishedCallback()
                }
                
                if (queue.length > 0 && autoload) {
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