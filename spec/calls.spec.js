/*
 Normal cases to support
 ==========================

 Who is the guy in that movie?            (Who is a/the thing)
 -- Your mom is the guy in that movie.

 Who is going to clean this up?           (Who is doing (suffix -ing) a thing)
 -- Your mom is going to clean this up.

 Who's not coming in today?
 -- Your mom's not coming in today.


 You're going to find this interesting.
 -- Your mom's going to find this interesting.

 You're the most senior person here.
 -- Your mom's the most senior person here.


 Weird cases to support
 ===========================

 (ends in address?  drop address)
 You're the most senior person here, Harold.
 -- Your mom's the most senior person here.

 Who are the best cleaners near by?

 (transpose "are you" questions)
 Who are you going to call tomorrow?
 Who are they ...
 -- Your mom is who they're going to call tomorrow.
 Who are we ...
 -- Your mom is who we're going to call tomorrow.


 (detect non-verbs following "is/are", transpose object & "is" verb)
 Who is Tom seeing tonight?
 -- Your mom is who Tom is seeing tonight


 False positives to screen
 ===========================

 For whom are we getting this present?

 */

var yourmom = require('../../yourmom');
var customMatchers = {
    toBeValidCall: function () {
        var callToParse = this.actual;
        var parseOutput = yourmom.parse(callToParse);
        var pass = parseOutput.valid === true;
        var opposingExpectation = pass ? "invalid" : "valid";
        this.message = function () {
            return "Expected call to be " + opposingExpectation + ", given input: '" + callToParse +
                "', but `valid` property of parse result object was: " + parseOutput.valid;
        };
        return pass;
    },
    toRespondWith: function (expectedResponse) {
        var callToParse = this.actual;
        var parseOutput = yourmom.parse(callToParse);
        return parseOutput.response == expectedResponse;
    }
};

describe("Any registered generator", function () {

    beforeEach(function () {
        this.addMatchers(customMatchers);
    });

    it ("will reject blatantly irrelevant calls", function () {
        expect("She sells sea shells by the sea shore").not.toBeValidCall();
        expect("okay").not.toBeValidCall();
        expect("42").not.toBeValidCall();
        expect("Istanbul was Constantinople?").not.toBeValidCall();
        expect("").not.toBeValidCall();
        expect().not.toBeValidCall();
    });
});

describe("Generators that match calls like 'Who is a/the thing?'", function () {

    beforeEach(function () {
        this.addMatchers(customMatchers);
    });

    it("will give a valid 'Your mom' response to 'Who is the guy in that movie?'", function () {
        expect("Who is the guy in that movie?").toBeValidCall();
        expect("Who is the guy in that movie?").toRespondWith("Your mom is the guy in that movie.");
    });

    it("will give a valid 'Your mom' response to 'Who is a qualified physician, here?'", function () {
        expect("Who is a qualified physician, here?").toBeValidCall();
        expect("Who is a qualified physician, here?").toRespondWith("Your mom is a qualified physician, here.");
    });
});