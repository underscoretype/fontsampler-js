describe("Fontsampler helpers", function() {

    var helpers = require("../src/helpers")

    var baseUrl = "http://127.0.0.1:8080/docs/"

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
    })

    /**
     * helpers unit tests
     */ 
    it("should return false for falsy node", function() {
        expect(helpers.isNode(null)).toEqual(false)
        expect(helpers.isNode([])).toEqual(false)
        expect(helpers.isNode("undefined")).toEqual(false)
        expect(helpers.isNode(false)).toEqual(false)
    })

    // it("should return the node for a HTMLNode", function () {
    //     var node = browser.executeScript('return document.createElement("div")')
    //     expect(node).toBeDefined()
    //      Seems to not be possible to pass this promise to the function to test?
    //     expect(helpers.isNode(node)).toBeTruthy()
    // })

    it("should return a val and text property", function() {
        var parts = "key|Key",
            res = helpers.parseParts(parts)
        expect(res.val).toEqual("key")
        expect(res.text).toEqual("Key")
    })

    it("should return a val and text property that are equal", function() {
        browser.get(baseUrl + "test")
        var parts = "keyonly",
            res = helpers.parseParts(parts)
        expect(res.val).toEqual("keyonly")
        expect(res.text).toEqual("keyonly")
    })

    it("should have init class", function () {
        browser.get(baseUrl + "test")
        var el = element(by.css(".fsjs-initialized"))
        expect(el.isPresent()).toBeTruthy()
    })

});