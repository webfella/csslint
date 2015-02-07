/*
 * Rule: Warns against using too many selectors.
 *
 */

CSSLint.addRule({

    //rule information
    id: "selector-depth",
    name: "Warns against using too many selectors",
    desc: "Will warn the selectors used are greater than 5 levels deep",
    browsers: "All",

    //initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            limit = 5;

        parser.addListener("startrule", function(event) {
            var depth = 0,
                selectors = event.selectors,
                selectorCount = selectors.length,
                selector,
                partsCount,
                part,
                i, j;

            for (i = 0; i < selectorCount; i++) {
                selector = selectors[i];
                partsCount = selector.parts.length;

                for (j = 0; j < partsCount; j++) {
                    part = selector.parts[j];

                    if (part.type === parser.SELECTOR_PART_TYPE){
                        depth++;
                    }
                }

                if (depth >= limit) {
                    reporter.report("You have " + depth + " selectors, try keeping the number under " + limit + ".", part.line, part.col, rule);
                }
            }
        });
    }
});
