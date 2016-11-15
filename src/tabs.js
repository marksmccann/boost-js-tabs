/**
 * Boost JS Tabs
 * A style-free tabs plugin for jQuery and Boost JS
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @version 0.0.1
 * @requires jQuery, boost-js
 */

(function(){

    var Tabs = function() {
        var inst = this;
        // pairs; each tab and panel pair organized by panel id
        inst.pairsByPanel = {};
        inst.roles.tab.each(function(){
            // get the id from the tab's 'href'
            var id = $(this).attr('href').replace(/^#/,'');
            // get the corresponding panel with the id
            var $panel = inst.roles.panel.filter('#'+id);
            // combine the matching id and panel into one jQuery objec
            inst.pairsByPanel[ id ] = $panel.add(this);
        });
        // add attributes to key elements to make application for accessible
        // add role="tablist" to source element
        inst.source.attr('role','tablist');
        // add role="presentation" to the tab parent element if they are list items
        inst.roles.tab.parent('li').attr('role','presentation');
        // add role="tab" and aria-controls="[targetID]" to each tab
        inst.roles.tab.attr('role','tab').each(function(){
            $(this).attr('aria-controls',$(this).attr('href').replace(/^#/,''));
        });
        // add role="tabpanel" to every panel
        inst.roles.panel.attr('role','tabpanel');
        // add aria-labelledby="[tabID]" to each panel
        // if tab does not have an id, create a new one and add it to tab
        for( var k in inst.pairsByPanel ) {
            var tab = inst.pairsByPanel[k][0], panel = inst.pairsByPanel[k][1];
            var id = tab.id.length === 0 ? panel.id+'-tab' : tab.id;
            $(panel).attr('role','tabpanel').attr('aria-labelledby',id);
            $(tab).attr('id', id);
        }
        // locate the currently active tab and store it's target id,
        // if an active tab has not been identified, assign the first one
        var $activeTab = inst.roles.tab.filter( '.'+this.settings.activeClass );
        inst.activePanel = $activeTab.length === 1
            ? $activeTab.attr('href').replace(/^#/,'')
            : Object.keys(inst.pairsByPanel)[0];
        // add all tabs aria-expanded attribute to false
        inst.roles.tab.attr( 'aria-expanded', 'false' );
        // change to the first tab to expanded true
        inst.pairsByPanel[ inst.activePanel ].first().attr( 'aria-expanded', 'true' );
        // add the active class to the new tab and panel
        inst.pairsByPanel[ inst.activePanel ].addClass( inst.settings.activeClass );
        // change tab panel when tab is clicked
        inst.roles.tab.on( 'click', function(e){
            e.preventDefault();
            inst.changeToPanel( $(this).attr('href').replace(/^#/,'') );
        });
        // run onInit callback
        if( $.isFunction(inst.settings.onInit) ) inst.settings.onInit.call(inst);
    }

    Tabs.prototype = {
        /**
         * changes the active state of a tab and its corresponding panel
         * with the id of the panel wanted to be changed to
         * @param {string} id the id of the panel
         * @param {function} callback
         * @return {object} instance
         */
        changeToPanel: function( id, callback ) {
            // local instance
            var inst = this;
            // remove the active class from previous set
            inst.pairsByPanel[ inst.activePanel ].removeClass( inst.settings.activeClass )
            // add the active class to the new tab and panel
            inst.pairsByPanel[ id ].addClass( inst.settings.activeClass );
            // update accessibility attributes
            inst.pairsByPanel[ inst.activePanel ].first().attr( 'aria-expanded', 'false' );
            inst.pairsByPanel[ id ].first().attr( 'aria-expanded', 'true' );
            // change focus to clicked $tab
            inst.pairsByPanel[ id ].first()[0].focus();
            // reset the active panel id
            inst.activePanel = id;
            // run callbacks
            if( $.isFunction(callback) ) callback.call(inst);
            if( $.isFunction(inst.settings.onChange) ) inst.settings.onChange.call(inst);
            // return instance
            return inst;
        }
    }

    var plugin = {
        plugin: Tabs,
        defaults: {
            activeClass: 'is-active',
            onChange: null,
            onInit: null
        }
    }

    // if node, return via module.exports
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = plugin;
    // otherwise, save object to jquery globally
    } else if( typeof window !== 'undefined' && typeof window.$ !== 'undefined' && typeof window.$.fn.boost !== 'undefined' ) {
        window.$.fn.boost.tabs = plugin;
    }

})();