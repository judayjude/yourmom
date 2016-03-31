/*

 Provide a function that takes a potential "call" i.e. a phrase that
 begs a "your mom..." response, and an optional caller name (name of
 the person making the call).  If the call is suitable for a "your
 mom" response, return a payload containing a "your mom" statement
 congruent to the call.  If not, return a payload indicating no
 response is appropriate.

 Example return values:

 given "Does anyone know who is the best?" --
 {
    call: "who is the best?",
    valid: true,
    response: "Your mom is the best."
 }

 given "I'm sure nothing is amiss here." --
 {
    call: "I'm sure nothing is amiss here.",
    valid: false
 }

 */
var responseGenerators = [
    {
        matching: /who( is (?:the|a) .*)\?/i,
        parse: function (callMessage, callerName, yourMomPrefix) {
            var match = this.matching.exec(callMessage);
            return yourMomPrefix + match[1] + ".";
        }
    }
];

function parseCall(callMessage, callerName, hasAMumNotAMom) {
    var yourMomPrefix = hasAMumNotAMom ? "Your mum" : "Your mom";
    var result = {
        valid: false,
        call: callMessage
    };
    applyMatchingGenerator(callMessage, function (generator) {
        result.call = generator.matching.exec(callMessage)[0];
        result.response = generator.parse(callMessage, callerName, yourMomPrefix);
        result.valid = true;
    });
    return result;
}

function applyMatchingGenerator(callMessage, responseCallback) {
    responseGenerators.some(function (generator) {
        if (generator.matching.test(callMessage)) {
            responseCallback(generator);
            return true;
        }
    });
}

function eachPattern(processFunc) {
    responseGenerators.forEach(function (generator) {
        var patternCopy = new RegExp(generator.matching);
        processFunc(patternCopy);
    });
}

module.exports = {
    eachPattern: eachPattern,
    parse: parseCall
};