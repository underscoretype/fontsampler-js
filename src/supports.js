
/**
 * Just a centralized wrapper around the native CSS.supports, which
 * superseds variable font support, so it is a handy way to eliminate 
 * pre-variable font browsers
 */
function variableFonts() {
    if (!CSS || "supports" in CSS === false) {
        return false
    }
    
    return CSS.supports("(font-variation-settings: normal)")
}

/**
 * Simple woff2 support detection with a shim font, copied from:
 * npm woff2-feature-test
 */
function woff2() {
    if (!("FontFace" in window)) {
        return false;
    }

    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
    f.load()['catch'](function() {});

    return f.status === 'loading' || f.status === 'loaded';
}

/**
 * Return the executed method returns as attributes of this module
 */
module.exports = {
    variableFonts: (variableFonts)(),
    woff2: (woff2)()
}