'use strict';

var assert = require('assert');
var CleanCSS = require('../lib/cleancss');
var Record = require('record');
var path = require('path');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new CleanCSS).run(
    [new Record({
        path: 'foo.css',
        contents: '.foo\n{color:#ffffff}'
    })], // inputs
    {}, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), '.foo{color:#fff}')
}).catch(errorHandler);

(new CleanCSS).run(
    [new Record({
        path: 'foo.css',
        contents: '/*!copyright*/.foo\n{color:#ffffff}'
    })], // inputs
    {
        keepSpecialComments: 0
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), '.foo{color:#fff}')
}).catch(errorHandler);

(new CleanCSS).run(
    [new Record({
        path: 'foo.css',
        contents: '@import "bar.css";\n.foo{color:#ffffff}'
    })], // inputs
    {
        relativeTo: path.join(__dirname, 'fixtures')
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), '.bar{color:#000}.foo{color:#fff}')
}).catch(errorHandler);
