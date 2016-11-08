var boost = require('boost-js');
var tabs = require('../src/tabs.js');
$.fn.tabs = boost( tabs.plugin, tabs.defaults );
boost.auto();
