describe("Fontsampler", function() {

    var helpers = require("../src/helpers")

    var baseUrl = "http://127.0.0.1:8080/docs/"

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
    })

    it("should have init class", function () {
        browser.get(baseUrl + "test")
        var el = element(by.css(".fsjs-initialized"))
        expect(el.isPresent()).toBeTruthy()
    })

    it("should match a data-fsjs=tester element", function() {
        browser.get(baseUrl + "test")
        var el = element(by.css("[data-fsjs='tester']"));
        expect(el.isPresent()).toBeTruthy();
    })

    it("should switch the font from API call", function () {
        browser.get(baseUrl + "api")
        element(by.buttonText("Work Sans Regular")).click().then(function () {
            expect(element(by.css("[data-fsjs='tester']")).getCssValue("fontFamily")).toEqual("WorkSansRomanVF")
        })
    })

});