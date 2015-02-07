(function(){
    "use strict";
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Selector Depth Errors",

        "Using 4 or less selectors should not result in a warning": function() {
            var result = CSSLint.verify("foo + #bar .baz > a.foo { display: block; }", { "selector-depth": 1 });
            Assert.areEqual(0, result.messages.length);
        },

        "Using 5 or more selectors should result in a warning": function() {
            var result = CSSLint.verify(".foo bar #baz [foo] .bar { display: none; }", { "selector-depth": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("You have 5 selectors, try keeping the number under 5.", result.messages[0].message);
        }

    }));

})();
