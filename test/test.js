var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

var template = {
    default:
        '<ul id="tabs">'+
            '<li><a href="#panel1" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel2" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel3" data-bind="#tabs" data-role="tab" id="tab3"></a></li>'+
        '</ul>'+
        '<div id="panel1" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel2" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel3" data-bind="#tabs" data-role="panel"></div>',
    active:
        '<ul id="tabs">'+
            '<li><a href="#panel1" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel2" class="is-active" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel3" data-bind="#tabs" data-role="tab"></a></li>'+
        '</ul>'+
        '<div id="panel1" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel2" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel3" data-bind="#tabs" data-role="panel"></div>',
    activeClass:
        '<ul id="tabs" data-active-class="foo-bar">'+
            '<li><a href="#panel1" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel2" class="is-active" data-bind="#tabs" data-role="tab"></a></li>'+
            '<li><a href="#panel3" data-bind="#tabs" data-role="tab"></a></li>'+
        '</ul>'+
        '<div id="panel1" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel2" data-bind="#tabs" data-role="panel"></div>'+
        '<div id="panel3" data-bind="#tabs" data-role="panel"></div>'
}

describe('Boost JS Tabs', function () {

    jsdom()

    before(function ( done ) {
        $ = require('jquery')
        boost = require('boost-js')
        tabs = require('../dist/tabs.min.js')
        $.fn.tabs = boost( tabs.plugin, tabs.defaults );
        done();
    });

    describe('creation', function () {

        it('should have added plugin to jQuery\'s prototype', function () {
            assert.isDefined( $.fn.tabs );
        });

    });

    describe('instantiation', function () {

        before(function ( done ) {
            document.body.innerHTML = template.default;
            $('#tabs').tabs();
            done();
        });

        it('should add \'role="tablist"\' to source element', function () {
            var tabs = document.getElementById('tabs');
            assert.match( tabs.getAttribute('role'), /tablist/ );
        });

        it('should add \'role="presentation"\' to list items', function () {
            var tabs = document.querySelectorAll('li');
            var roles = '';
            for( var i=0; i<tabs.length; i++ ) {
                roles += tabs[i].getAttribute('role');
            }
            assert.match( roles, /(presentation){3}/ );
        });

        it('should add \'role="tab"\' to each tab', function () {
            var tabs = document.querySelectorAll('a');
            var roles = '';
            for( var i=0; i<tabs.length; i++ ) {
                roles += tabs[i].getAttribute('role');
            }
            assert.match( roles, /(tab){3}/ );
        });

        it('should add \'aria-controls="[panelID]"\' to each tab', function () {
            var tabs = document.querySelectorAll('a');
            var controls = '';
            for( var i=0; i<tabs.length; i++ ) {
                controls += tabs[i].getAttribute('aria-controls');
            }
            assert.match( controls, /panel1panel2panel3/ );
        });

        it('should add \'role="tabpanel"\' to each panel', function () {
            var panels = document.querySelectorAll('div');
            var roles = '';
            for( var i=0; i<panels.length; i++ ) {
                roles += panels[i].getAttribute('role');
            }
            assert.match( roles, /(tabpanel){3}/ );
        });

        it('should add \'aria-labelledby="[tabID]"\' to each panel', function () {
            var panels = document.querySelectorAll('div');
            var labelledby = '';
            for( var i=0; i<panels.length; i++ ) {
                labelledby += panels[i].getAttribute('aria-labelledby');
            }
            assert.match( labelledby, /panel1-tabpanel2-tabtab3/ );
        });

        it('should add \'aria-expanded="false"\' to every tab, with one set to \'true\'', function () {
            var tabs = document.querySelectorAll('a');
            var expanded = '';
            for( var i=0; i<tabs.length; i++ ) {
                expanded += tabs[i].getAttribute('aria-expanded');
            }
            assert.match( expanded, /truefalsefalse/ );
        });

        it('should activate first tab and corresponding panel', function () {
            var tab1 = document.querySelector('a');
            var panel1 = document.querySelector('div');
            assert.match( tab1.className+panel1.className, /(is-active){2}/ );
        });

        it('should activate tab w/ \'class="[settings.activeClass]"\'', function () {
            document.body.innerHTML = template.active;
            $('#tabs').tabs();
            var tab1 = document.querySelector('a');
            var panel1 = document.querySelector('div');
            assert.lengthOf( tab1.className+panel1.className, 0 );
            var tab2 = document.querySelectorAll('a')[1];
            var panel2 = document.querySelectorAll('div')[1];
            assert.match( tab2.className+panel2.className, /(is-active){2}/ );
        });

    });

    describe('settings', function () {

        it('should be able to update \'activeClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            $('#tabs').tabs({activeClass:'foo-bar'});
            var tab = document.querySelectorAll('a.foo-bar');
            assert.lengthOf( tab, 1 );
        });

        it('should be able to update \'activeClass\' setting from html', function () {
            document.body.innerHTML = template.activeClass;
            $('#tabs').tabs();
            var tab = document.querySelectorAll('a.foo-bar');
            assert.lengthOf( tab, 1 );
        });

        it('should be able to add function to onInit setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs({
                onInit: function() {
                    this.test = "foo";
                }
            });
            assert.match( inst.test, /foo/ );
        });

        it('should be able to add function to onChange setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs({
                onChange: function() {
                    this.test = this.activePanel;
                }
            });
            inst.changeToPanel('panel2');
            assert.match( inst.test, /panel2/ );
        });

    });

    describe('changeToPanel()', function () {

        it('should change activePanel from panel1 to panel2', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs();
            inst.changeToPanel('panel2');
            assert.match( inst.activePanel, /panel2/ );
        });

        it('should change activeClass on panel and tab elements', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs();
            inst.changeToPanel('panel2');
            var panel1 = "";
            panel1 += document.querySelector('a[href="#panel1"]').className;
            panel1 += document.querySelector('#panel1').className;
            var panel2 = "";
            panel2 += document.querySelector('a[href="#panel2"]').className;
            panel2 += document.querySelector('#panel2').className;
            assert.lengthOf( panel1, 0 );
            assert.match( panel2, /(is-active){2}/ );
        });

        it('should change aria-expanded attribute on panel and tab elements', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs();
            inst.changeToPanel('panel2');
            var panel1 = document.querySelector('a[href="#panel1"]').getAttribute('aria-expanded');
            var panel2 = document.querySelector('a[href="#panel2"]').getAttribute('aria-expanded');
            assert.match( panel1, /false/ );
            assert.match( panel2, /true/ );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tabs').tabs();
            inst.changeToPanel('panel2', function(){
                this.test = this.activePanel;
            });
            assert.match( inst.test, /panel2/ );
        });

    });

});
