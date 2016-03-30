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

describe("Any registered generator", function () {

    it ("will reject blatantly irrelevant calls", function () {
        expect(yourmom.parse("She sells sea shells by the sea shore").valid).toBe(false);
        expect(yourmom.parse("okay").valid).toBe(false);
        expect(yourmom.parse("42").valid).toBe(false);
        expect(yourmom.parse("Istanbul was Constantinople").valid).toBe(false);
        expect(yourmom.parse("").valid).toBe(false);
    });
});

describe("Generators that match calls like 'Who is a/the thing?'", function () {

    it("will give a valid 'Your mom' response to 'Who is the guy in that movie?'", function () {
        var result = yourmom.parse("Who is the guy in that movie?", "Joe");
        expect(result.valid).toBe(true);
        expect(result.response).toBe("Your mom is the guy in that movie.");
    });
});