Boost JS Tabs
==================================================
A no-nonsense, style-free tabs plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). While other plugins style and arrange your tabs and panels for you, this plugin only handles the functionality, leaving the layout and styling up to you.


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
Don't forget to 1) update the `data-bind`, `id` and `href` attributes and 2) include the `.is-active` class on the tab and panel you want active when the plugin first loads.
```html
<ul id="tabs" role="tablist">
    <li class="is-active" role="presentation">
        <a href="#panel-1" data-bind="#tabs" data-role="role" role="tab" aria-controls="panel-1">Tab 1</a>
    </li>
    <li role="presentation">
        <a href="#panel-2" data-bind="#tabs" data-role="role" role="tab" aria-controls="panel-2">Tab 2</a>
    </li>
</ul>
<div id="panel-1" data-bind="#tabs" data-role="panel" class="is-active">Panel 1</div>
<div id="panel-2" data-bind="#tabs" data-role="panel">Panel 2</div>
```
*Note: The `role` and `aria-controls` attributes make the tabs accessible.*

### Call Plugin
```javascript
$('#tabs').tabs();
```

Options
--------------------------------------



API
--------------------------------------

### .change( 'string', callback() )
```javascript
instance.changeTo(1);
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
