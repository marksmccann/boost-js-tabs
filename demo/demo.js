!function t(e,r,a){function n(s,o){if(!r[s]){if(!e[s]){var c="function"==typeof require&&require;if(!o&&c)return c(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=r[s]={exports:{}};e[s][0].call(u.exports,function(t){var r=e[s][1][t];return n(r?r:t)},u,u.exports,t,e,r,a)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<a.length;s++)n(a[s]);return n}({1:[function(t,e,r){var a=t("boost-js"),n=t("../dist/tabs.min.js");$.fn.tabs=a(n.plugin,n.defaults),a.auto()},{"../dist/tabs.min.js":2,"boost-js":3}],2:[function(t,e,r){var a=function(){var t=this;t.pairs={},t.roles.tab.each(function(){var e=$(this).attr("href").replace(/^#/,""),r=t.roles.panel.filter("#"+e);t.pairs[e]=r.add(this)}),t.source.attr("role","tablist"),t.roles.tab.parent("li").attr("role","presentation"),t.roles.tab.attr("role","tab").each(function(){$(this).attr("aria-controls",$(this).attr("href").replace(/^#/,""))}),t.roles.panel.attr("role","tabpanel");for(var e in t.pairs){var r=t.pairs[e][0],a=t.pairs[e][1],n=r.id>0?r.id:a.id+"-tab";$(a).attr("role","tabpanel").attr("aria-labelledby",n),$(r).attr("id",n)}var i=t.roles.tab.filter("."+this.settings.active);t.active=1===i.length?i.attr("href").replace(/^#/,""):Object.keys(t.pairs)[0],t.roles.tab.attr("aria-expanded","false"),t.pairs[t.active].first().attr("aria-expanded","true"),t.pairs[t.active].addClass(t.settings.active),t.roles.tab.on("click",function(e){e.preventDefault(),t.changeToPanel($(this).attr("href").replace(/^#/,""))}),$.isFunction(t.settings.onInit)&&t.settings.onInit.call(t)};a.prototype={changeToPanel:function(t,e){var r=this;return r.pairs[r.active].removeClass(r.settings.active),r.pairs[t].addClass(r.settings.active),r.pairs[r.active].first().attr("aria-expanded","false"),r.pairs[t].first().attr("aria-expanded","true"),r.pairs[t].first()[0].focus(),r.active=t,$.isFunction(e)&&e.call(r),$.isFunction(r.settings.onChange)&&r.settings.onChange.call(r),r}},e.exports={plugin:a,defaults:{active:"is-active",onChange:"",onInit:""}}},{}],3:[function(t,e,r){var a=function(t){return t.replace(/[-_]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,function(t){return t.toUpperCase()}).replace(/ /g,"")},n=function(t){return/^\d+$/.test(t)?parseInt(t):/^\d*\.\d+$/.test(t)?parseFloat(t):!!/^true$/.test(t)||!/^false$/.test(t)&&t},i=function(t){var e={},r=t.attributes;for(var i in r)if(/^data-/.test(r[i].name)){var s=r[i].name.replace(/^data-/,"");e[a(s)]=n(r[i].value)}return e},s=function(t,e,r){var a=this;return a.source=$(t),a.id=a.source.attr("id")||"",a.settings=$.extend({},r,i(a.source[0]),e),a.references=a.id.length>0?$('[href="#'+a.id+'"],[data-bind="#'+a.id+'"]'):$(),a.roles={},a.references.filter("[data-role]").each(function(){var t=$(this).data("role");a.roles.hasOwnProperty(t)||(a.roles[t]=$()),a.roles[t]=a.roles[t].add(this)}),this};s.init=function(t,e){var r=[],n=this;return $(t).each(function(){var t=new n(this,e||{}),i=t.id.length>0?a(t.id):Object.keys(n.instances).length.toString();n.instances[i]=t,r.push(t)}),r.length>1?r:r[0]};var o=function(t,e){if("function"==typeof t){var r=function(r,a){return s.call(this,r,a||{},e||{}),t.call(this,r,a),this};r.prototype=t.prototype,r.prototype.constructor=r,r.init=s.init,r.instances={};var a=function(t){return r.init.call(r,this,t)};return a.init=function(t,e){return r.init.call(r,t,e)},a.instances=r.instances,a}throw"'Boost JS' requires a function as first paramater."};o.auto=function(){var t=[];$("[data-init]").each(function(){var e=$(this).data("init"),r=a(e);t.indexOf(r)===-1&&"undefined"!=typeof $.fn[r]&&$('[data-init="'+e+'"]')[r]()})},e.exports=o},{}]},{},[1]);