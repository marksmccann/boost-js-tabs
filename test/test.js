var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

describe('Boost JS Tabs', function () {

    jsdom()

    before(function ( done ) {
        $ = require('jquery')
        boost = require('boost-js')
        tabs = require('../src/tabs.js')
        $.fn.tabs = boost( tabs.plugin, tabs.defaults );
        done();
    });

    describe('creation', function () {

        it('should have added plugin to jQuery\'s prototype', function () {
            assert.isDefined( $.fn.tabs );
        });

    });

});
