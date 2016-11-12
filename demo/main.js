var boost = require('boost-js');
var tabs = require('../dist/tabs.min.js');
$.fn.tabs = boost( tabs.plugin, tabs.defaults );
boost.auto();
