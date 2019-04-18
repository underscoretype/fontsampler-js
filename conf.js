// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec/*Spec.js'],
    capabilities: {
        'directConnect': true,
        'browserName': 'chrome',
        chromeOptions: {
            args: ["--headless", "--disable-gpu", "--window-size=1600x1000"]
        }
    },
}