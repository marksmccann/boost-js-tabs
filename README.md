Boost JS Tabs
==================================================
A style-free tabs plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). While other plugins style and arrange your tabs and panels for you, this plugin only handles the functionality, leaving the layout and styling up to you.


Installation
--------------------------------------

```bash
npm install boost-js-tabs
```


Usage
--------------------------------------

### Create Plugin
```javascript
var boost = require('boost-js');
var tabs = require('boost-js-tabs');
$.fn.tabs = boost( tabs.plugin, tabs.defaults );
```

### Markup Structure
```html
<ul id="tabs">
    <li><a href="#panel1" data-bind="#tabs" data-role="tab">Tab 1</a></li>
    <li><a href="#panel2" data-bind="#tabs" data-role="tab">Tab 2</a></li>
    <li><a href="#panel3" data-bind="#tabs" data-role="tab">Tab 3</a></li>
</ul>
<div id="panel1" data-bind="#tabs" data-role="panel">Panel 1</div>
<div id="panel2" data-bind="#tabs" data-role="panel">Panel 2</div>
<div id="panel3" data-bind="#tabs" data-role="panel">Panel 3</div>
```
*Note: `data-bind` is used to link the element to the instance, `data-role` is used to define the element's role in that instance. See [Boost JS](https://github.com/marksmccann/boost-js) for more details.*

### Instantiate Plugin
```javascript
$('#tabs').tabs();
```

Options
--------------------------------------
Name | Default | Description
--- | --- | ---
activeClass | `"is-active"` | the class added to tab and panel when active
onInit | `null` | a callback function called when plugin is intialized
onChange | `null` | a callback function called when tabs switch
### Usage
```javascript
$('#tabs').tabs({
	onInit: function() {
    	console.log( this.id ); // #tabs
    }
});
```
\- or -
```html
<ul id="tabs" data-active-class="your-new-class">...</ul>
```

API
--------------------------------------

### .changeToPanel( 'panelID', callback )
Provide a string with the panel id to this method to activate the specified tab. `callback` is an optional function that will be called at the end of this method.
```javascript
var tabs = $('#tabs').tabs();
tabs.changeToPanel( 'panel2' );
```


Running Tests
--------------------------------------

```bash
$ npm install -d && npm test
```


License
--------------------------------------

Copyright © 2016, [Mark McCann](https://github.com/marksmccann).
Released under the [MIT license](LICENSE).
