/**
 * Boost JS Tabs
 * A no-nonsense, style-free tabs plugin for jQuery and Boost JS
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @requires jQuery, boost-js
 */

/**
<ul id="tabs" data-init="tabs" class="tablist" role="tablist">
    <li role="presentation" class="tab is-active">
        <a href="#panel1" id="tab1" data-bind="#tabs" data-role="tab" role="tab" aria-controls="panel1">Tab 1</a>
    </li>
    <li role="presentation" class="tab">
        <a href="#panel2" id="tab2" data-bind="#tabs" data-role="tab" role="tab" aria-controls="panel2">Tab 2</a>
    </li>
    <li role="presentation" class="tab">
        <a href="#panel3" id="tab3" data-bind="#tabs" data-role="tab" role="tab" aria-controls="panel3">Tab 3</a>
    </li>
</ul>
<div id="panel1" data-bind="#tabs" data-role="panel" role="tabpanel" aria-labelledby="tab1" class="tabpanel is-active">Panel 1</div>
<div id="panel2" data-bind="#tabs" data-role="panel" role="tabpanel" aria-labelledby="tab2" class="tabpanel">Panel 2</div>
<div id="panel3" data-bind="#tabs" data-role="panel" role="tabpanel" aria-labelledby="tab3" class="tabpanel">Panel 3</div>
*/

var Tabs = function() {
    var inst = this;
    // pairs; each tab and panel pair organized by id
    inst.pairs = {};
    inst.roles.tab.each(function(){
        // get the id from the tab's 'href'
        var id = this.href.replace(/^#/,'');
        // get the corresponding panel with the id
        var $panel = inst.roles.panel.filter('#'+id);
        // combine the matching id and panel into one jQuery objec
        inst.pairs[ id ] = $panel.add(this);
    });
    // locate the currently active tab and panel and store it's id,
    // if an active tab has not been identified, active the first one.
    inst.active = '';
    var $activeTab = inst.roles.tab.filter( '.'+this.settings.active );
    if( $activeTab.length > 0 ) {
        inst.active = $activeTab.attr('href').replace(/^#/,'');
    } else {
        inst.active = Object.keys(inst.pairs)[0];
    }
    // add aria-expanded attribute for accessibility
    inst.roles.tab.attr( 'aria-expanded', 'false' );
    inst.pair[ inst.active ].attr( 'aria-expanded', 'true' );




    /*// get all panels, cache the currently active one
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
    });*/

    // run callbacks
    if( $.isFunction(callback) ) callback.call(this);
    if( $.isFunction(this.settings.onInit) ) this.settings.onInit.call(this);
    // return instance
    return inst;
}

Tabs.prototype = {
    /**
     * changes the active state of a tab and its corresponding panel
     * @param {string} id the id of the panel
     * @param {function} callback
     * @return {object} instance
     */
    change: function( id, callback ) {
        // local instance
        var inst = this;
        // remove the active class from previous set
        inst.pairs[ inst.active ].removeClass( inst.settings.active )
        // add the active class to the new tab and panel
        inst.pairs[ id ].addClass( inst.settings.active );
        // reset the active panel id
        inst.active = id;
        // update accessiblity attributes
        inst.pairs[ inst.active ].last().attr( 'aria-expanded', 'false' );
        inst.pairs[ id ].last().attr( 'aria-expanded', 'true' );
        // change focus to clicked $tab
        inst.pairs[ id ].focus();
        // run callbacks
        if( $.isFunction(callback) ) callback.call(inst);
        if( $.isFunction(inst.settings.onChange) ) inst.settings.onChange.call(inst);
        // return instance
        return inst;
    }
}

module.exports = {
    plugin: Tabs,
    defaults: {
        active: 'is-active',
        onChange: '',
        onInit: ''
    }
}


/*
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
}*/
