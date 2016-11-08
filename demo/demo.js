(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var boost = require('boost-js');
var tabs = require('../src/tabs.js');
$.fn.tabs = boost( tabs.plugin, tabs.defaults );
boost.auto();

},{"../src/tabs.js":3,"boost-js":2}],2:[function(require,module,exports){
var camelize=function(t){return t.replace(/[-_]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,function(t){return t.toUpperCase()}).replace(/ /g,"")},typify=function(t){return/^\d+$/.test(t)?parseInt(t):/^\d*\.\d+$/.test(t)?parseFloat(t):!!/^true$/.test(t)||!/^false$/.test(t)&&t},dataset=function(t){var e={},n=t.attributes;for(var r in n)if(/^data-/.test(n[r].name)){var i=n[r].name.replace(/^data-/,"");e[camelize(i)]=typify(n[r].value)}return e},Boilerplate=function(t,e,n){var r=this;return r.source=$(t),r.id=r.source.attr("id")||"",r.settings=$.extend({},n,dataset(r.source[0]),e),r.references=r.id.length>0?$('[href="#'+r.id+'"],[data-bind="#'+r.id+'"]'):$(),r.roles={},r.references.filter("[data-role]").each(function(){var t=$(this).data("role");r.roles.hasOwnProperty(t)||(r.roles[t]=$()),r.roles[t]=r.roles[t].add(this)}),this};Boilerplate.init=function(t,e){var n=[],r=this;return $(t).each(function(){var t=new r(this,e||{}),i=t.id.length>0?camelize(t.id):Object.keys(r.instances).length.toString();r.instances[i]=t,n.push(t)}),n.length>1?n:n[0]};var Boost=function(t,e){if("function"==typeof t){var n=function(n,r){return Boilerplate.call(this,n,r||{},e||{}),t.call(this,n,r),this};n.prototype=t.prototype,n.prototype.constructor=n,n.init=Boilerplate.init,n.instances={};var r=function(t){return n.init.call(n,this,t)};return r.init=function(t,e){return n.init.call(n,t,e)},r.instances=n.instances,r}throw"'Boost JS' requires a function as first paramater."};Boost.auto=function(){var t=[];$("[data-init]").each(function(){var e=$(this).data("init"),n=camelize(e);t.indexOf(n)===-1&&"undefined"!=typeof $.fn[n]&&$('[data-init="'+e+'"]')[n]()})},module.exports=Boost;
},{}],3:[function(require,module,exports){
/**
 * Boost JS Tabs
 * An HTML tabs plugin for jQuery via boost-js
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @requires jQuery, boost-js
 */

var Tabs = function() {
    var inst = this;
    // get all panels, cache the currently active one
    inst.activePanel = inst.roles.panel.filter( '.'+this.settings.active );
    // get all tabs, cache the currently active one
    inst.activeTab = inst.source.find( 'li.'+this.settings.active+' a' ).first();
    // add aria-expanded attribute for accessibility
    inst.roles.tab.attr( 'aria-expanded', 'false' );
    inst.activeTab.attr( 'aria-expanded', 'true' );
    // change tab panel when tab is clicked
    inst.roles.tab.on( 'click', function(e){
        e.preventDefault(); inst.change(this);
    });
    // use the trigger's href to activate the specified tab
    inst.roles.tab.on('click', function(e){
        e.preventDefault();
        var tab = $(this).attr('href');
        if(!tab) tab = $(this).attr('data-target');
        if(tab) inst.change( tab );
    });
    // return instance
    return inst;
}

Tabs.prototype = {
    /**
     * changes the active state of a tab and its corresponding panel
     * @param [object|string] element
     * @param [function] callback
     * @return [object] instance
     */
    change: function( tab, callback ) {
        // local instance
        var inst = this;
        // get the tab element to change to
        var $tab = typeof tab == "string" ? inst.roles.tab.filter(tab) : $(tab);
        // if there is a tab at all
        if( $tab.length > 0 ) {
            // and if not already active
            if( !$tab.hasClass(this.settings.active) ) {
                // get the target panel
                var panel = this.roles.panel.filter( $tab.attr('href') );
                // remove active state from active elements
                this.activeTab.parent().removeClass(this.settings.active);
                this.activePanel.removeClass(this.settings.active);
                // add active state to new elements
                $tab.parent().addClass(this.settings.active);
                panel.addClass(this.settings.active);
                // update accissible attributes
                this.activeTab.attr( 'aria-expanded', 'false' );
                $tab.attr( 'aria-expanded', 'true' );
                // reset the active element attributes
                this.activeTab = $tab;
                this.activePanel = panel;
                // change focus to clicked $tab
                $tab[0].focus();
                // callbacks
                if( $.isFunction(callback) ) callback.call(this);
                if( $.isFunction(this.settings.onChange) ) callback.call(this.settings.onChange);
            }
        }
        // return instance
        return this;
    }
}

module.exports = {
    plugin: Tabs,
    defaults: {
        active: 'is-active',
        onChange: ''
    }
}

},{}]},{},[1]);
