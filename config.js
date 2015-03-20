'use strict';

// Utilize Extend utility
var extend = require('extend'),
    fs     = require('fs');

var projectInfo = require('./package.json');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = ~fs.readdirSync('./config').map(function(file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = extend(
    require('./config/all'),
    require('./config/' + process.env.NODE_ENV) || {},
    {
        version: projectInfo.version,
        env: process.env.NODE_ENV
    }
);
