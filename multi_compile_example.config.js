var config = {
    // TODO: Add common Configuration
    module: {},
};

var fooConfig = Object.assign({}, config, {
    name: "a",
    entry: "./a/app",
    output: {
        path: "./a",
        filename: "bundle.js"
    },
});
var barConfig = Object.assign({}, config, {
    name: "b",
    entry: "./b/app",
    output: {
        path: "./b",
        filename: "bundle.js"
    },
});

// Return Array of Configurations
module.exports = [
    fooConfig, barConfig,
];