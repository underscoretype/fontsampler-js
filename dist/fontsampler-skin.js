(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FontsamplerSkin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.dropkickjs=t():e.dropkickjs=t()}(this,function(){return function(e){function t(s){if(i[s])return i[s].exports;var a=i[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,s){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),o=i(1),d=s(o),r=i(2),c=s(r),h=i(3),u=s(h),f=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),p=window.parent!==window.self,b=void 0,m=function(){function e(t,i){a(this,e),this.sel=t;var s=void 0,n=void 0,l=window.Dropkick;for("string"==typeof this.sel&&"#"===this.sel[0]&&(this.sel=document.getElementById(t.substr(1))),s=0;s<l.uid;s++)if((n=l.cache[s])instanceof e&&n.data.select===this.sel)return d.default.extend(n.data.settings,i),n;if(!this.sel)throw"You must pass a select to DropKick";if(this.sel.length<1)throw"You must have options inside your <select>: "+t;if("SELECT"===this.sel.nodeName)return this.init(this.sel,i)}return l(e,[{key:"init",value:function(t,i){var s,a=window.Dropkick,n=e.build(t,"dk"+a.uid);if(this.data={},this.data.select=t,this.data.elem=n.elem,this.data.settings=d.default.extend({},c.default,i),this.disabled=t.disabled,this.form=t.form,this.length=t.length,this.multiple=t.multiple,this.options=n.options.slice(0),this.selectedIndex=t.selectedIndex,this.selectedOptions=n.selected.slice(0),this.value=t.value,this.data.cacheID=a.uid,a.cache[this.data.cacheID]=this,this.data.settings.initialize.call(this),a.uid+=1,this._changeListener||(t.addEventListener("change",this),this._changeListener=!0),!f||this.data.settings.mobile){if(t.parentNode.insertBefore(this.data.elem,t),t.setAttribute("data-dkCacheId",this.data.cacheID),this.data.elem.addEventListener("click",this),this.data.elem.addEventListener("keydown",this),this.data.elem.addEventListener("keypress",this),this.form&&this.form.addEventListener("reset",this),!this.multiple)for(s=0;s<this.options.length;s++)this.options[s].addEventListener("mouseover",this);b||(document.addEventListener("click",e.onDocClick),p&&parent.document.addEventListener("click",e.onDocClick),b=!0)}return this}},{key:"add",value:function(e,t){var i,s,a;"string"==typeof e&&(i=e,e=document.createElement("option"),e.text=i),"OPTION"===e.nodeName&&(s=d.default.create("li",{class:"dk-option","data-value":e.value,text:e.text,innerHTML:e.innerHTML,role:"option","aria-selected":"false",id:"dk"+this.data.cacheID+"-"+(e.id||e.value.replace(" ","-"))}),d.default.addClass(s,e.className),this.length+=1,e.disabled&&(d.default.addClass(s,"dk-option-disabled"),s.setAttribute("aria-disabled","true")),e.hidden&&(d.default.addClass(s,"dk-option-hidden"),s.setAttribute("aria-hidden","true")),this.data.select.add(e,t),"number"==typeof t&&(t=this.item(t)),a=this.options.indexOf(t),a>-1?(t.parentNode.insertBefore(s,t),this.options.splice(a,0,s)):(this.data.elem.lastChild.appendChild(s),this.options.push(s)),s.addEventListener("mouseover",this),e.selected&&this.select(a))}},{key:"item",value:function(e){return e=e<0?this.options.length+e:e,this.options[e]||null}},{key:"remove",value:function(e){var t=this.item(e);t.parentNode.removeChild(t),this.options.splice(e,1),this.data.select.remove(e),this.select(this.data.select.selectedIndex),this.length-=1}},{key:"close",value:function(){var e,t=this.data.elem;if(!this.isOpen||this.multiple)return!1;for(e=0;e<this.options.length;e++)d.default.removeClass(this.options[e],"dk-option-highlight");t.lastChild.setAttribute("aria-expanded","false"),d.default.removeClass(t.lastChild,"dk-select-options-highlight"),d.default.removeClass(t,"dk-select-open-(up|down)"),this.isOpen=!1,this.data.settings.close.call(this)}},{key:"open",value:function(){var e=void 0,t=void 0,i=void 0,s=void 0,a=void 0,n=void 0,l=this.data.elem,o=l.lastChild,r=void 0!==window.pageXOffset,c="CSS1Compat"===(document.compatMode||""),h=r?window.pageYOffset:c?document.documentElement.scrollTop:document.body.scrollTop;if(a=d.default.offset(l).top-h,n=window.innerHeight-(a+l.offsetHeight),this.isOpen||this.multiple)return!1;o.style.display="block",e=o.offsetHeight,o.style.display="",t=a>e,i=n>e,s=t&&!i?"-up":"-down",this.isOpen=!0,d.default.addClass(l,"dk-select-open"+s),o.setAttribute("aria-expanded","true"),this._scrollTo(this.options.length-1),this._scrollTo(this.selectedIndex),this.data.settings.open.call(this)}},{key:"disable",value:function(e,t){var i="dk-option-disabled";0!==arguments.length&&"boolean"!=typeof e||(t=void 0===e,e=this.data.elem,i="dk-select-disabled",this.disabled=t),void 0===t&&(t=!0),"number"==typeof e&&(e=this.item(e)),t?(e.setAttribute("aria-disabled",!0),d.default.addClass(e,i)):(e.setAttribute("aria-disabled",!1),d.default.removeClass(e,i))}},{key:"hide",value:function(e,t){void 0===t&&(t=!0),e=this.item(e),t?(e.setAttribute("aria-hidden",!0),d.default.addClass(e,"dk-option-hidden")):(e.setAttribute("aria-hidden",!1),d.default.removeClass(e,"dk-option-hidden"))}},{key:"select",value:function(e,t){var i,s,a,n,l=this.data.select;if("number"==typeof e&&(e=this.item(e)),"string"==typeof e)for(i=0;i<this.length;i++)this.options[i].getAttribute("data-value")===e&&(e=this.options[i]);return!(!e||"string"==typeof e||!t&&d.default.hasClass(e,"dk-option-disabled"))&&(d.default.hasClass(e,"dk-option")?(s=this.options.indexOf(e),a=l.options[s],this.multiple?(d.default.toggleClass(e,"dk-option-selected"),a.selected=!a.selected,d.default.hasClass(e,"dk-option-selected")?(e.setAttribute("aria-selected","true"),this.selectedOptions.push(e)):(e.setAttribute("aria-selected","false"),s=this.selectedOptions.indexOf(e),this.selectedOptions.splice(s,1))):(n=this.data.elem.firstChild,this.selectedOptions.length&&(d.default.removeClass(this.selectedOptions[0],"dk-option-selected"),this.selectedOptions[0].setAttribute("aria-selected","false")),d.default.addClass(e,"dk-option-selected"),e.setAttribute("aria-selected","true"),n.setAttribute("aria-activedescendant",e.id),n.className="dk-selected "+a.className,n.innerHTML=a.innerHTML,this.selectedOptions[0]=e,a.selected=!0),this.selectedIndex=l.selectedIndex,this.value=l.value,t||this.data.select.dispatchEvent(new u.default("change",{bubbles:this.data.settings.bubble})),e):void 0)}},{key:"selectOne",value:function(e,t){return this.reset(!0),this._scrollTo(e),this.select(e,t)}},{key:"search",value:function(e,t){var i,s,a,n,l,o,d,r,c=this.data.select.options,h=[];if(!e)return this.options;for(t=t?t.toLowerCase():"strict",t="fuzzy"===t?2:"partial"===t?1:0,r=new RegExp((t?"":"^")+e,"i"),i=0;i<c.length;i++)if(a=c[i].text.toLowerCase(),2==t){for(s=e.toLowerCase().split(""),n=l=o=d=0;l<a.length;)a[l]===s[n]?(o+=1+o,n++):o=0,d+=o,l++;n===s.length&&h.push({e:this.options[i],s:d,i:i})}else r.test(a)&&h.push(this.options[i]);return 2===t&&(h=h.sort(function(e,t){return t.s-e.s||e.i-t.i}).reduce(function(e,t){return e[e.length]=t.e,e},[])),h}},{key:"focus",value:function(){this.disabled||(this.multiple?this.data.elem:this.data.elem.children[0]).focus()}},{key:"reset",value:function(e){var t,i=this.data.select;for(this.selectedOptions.length=0,t=0;t<i.options.length;t++)i.options[t].selected=!1,d.default.removeClass(this.options[t],"dk-option-selected"),this.options[t].setAttribute("aria-selected","false"),!e&&i.options[t].defaultSelected&&this.select(t,!0);this.selectedOptions.length||this.multiple||this.select(0,!0)}},{key:"refresh",value:function(){Object.keys(this).length>0&&(!f||this.data.settings.mobile)&&this.dispose().init(this.data.select,this.data.settings)}},{key:"dispose",value:function(){var e=window.Dropkick;return Object.keys(this).length>0&&(!f||this.data.settings.mobile)&&(delete e.cache[this.data.cacheID],this.data.elem.parentNode.removeChild(this.data.elem),this.data.select.removeAttribute("data-dkCacheId")),this}},{key:"handleEvent",value:function(e){if(!this.disabled)switch(e.type){case"click":this._delegate(e);break;case"keydown":this._keyHandler(e);break;case"keypress":this._searchOptions(e);break;case"mouseover":this._highlight(e);break;case"reset":this.reset();break;case"change":this.data.settings.change.call(this)}}},{key:"_delegate",value:function(e){var t,i,s,a,n=e.target;if(d.default.hasClass(n,"dk-option-disabled"))return!1;if(this.multiple){if(d.default.hasClass(n,"dk-option"))if(t=window.getSelection(),"Range"===t.type&&t.collapseToStart(),e.shiftKey)if(s=this.options.indexOf(this.selectedOptions[0]),a=this.options.indexOf(this.selectedOptions[this.selectedOptions.length-1]),i=this.options.indexOf(n),i>s&&i<a&&(i=s),i>a&&a>s&&(a=s),this.reset(!0),a>i)for(;i<a+1;)this.select(i++);else for(;i>a-1;)this.select(i--);else e.ctrlKey||e.metaKey?this.select(n):(this.reset(!0),this.select(n))}else this[this.isOpen?"close":"open"](),d.default.hasClass(n,"dk-option")&&this.select(n)}},{key:"_highlight",value:function(e){var t,i=e.target;if(!this.multiple){for(t=0;t<this.options.length;t++)d.default.removeClass(this.options[t],"dk-option-highlight");d.default.addClass(this.data.elem.lastChild,"dk-select-options-highlight"),d.default.addClass(i,"dk-option-highlight")}}},{key:"_keyHandler",value:function(e){var t,i,s=this.selectedOptions,a=this.options,n=1,l={tab:9,enter:13,esc:27,space:32,up:38,down:40};switch(e.keyCode){case l.up:n=-1;case l.down:if(e.preventDefault(),t=s[s.length-1],d.default.hasClass(this.data.elem.lastChild,"dk-select-options-highlight"))for(d.default.removeClass(this.data.elem.lastChild,"dk-select-options-highlight"),i=0;i<a.length;i++)d.default.hasClass(a[i],"dk-option-highlight")&&(d.default.removeClass(a[i],"dk-option-highlight"),t=a[i]);n=a.indexOf(t)+n,n>a.length-1?n=a.length-1:n<0&&(n=0),this.data.select.options[n].disabled||(this.reset(!0),this.select(n),this._scrollTo(n));break;case l.space:if(!this.isOpen){e.preventDefault(),this.open();break}case l.tab:case l.enter:for(n=0;n<a.length;n++)d.default.hasClass(a[n],"dk-option-highlight")&&this.select(n);case l.esc:this.isOpen&&(e.preventDefault(),this.close())}}},{key:"_searchOptions",value:function(e){var t,i=this,s=String.fromCharCode(e.keyCode||e.which);void 0===this.data.searchString&&(this.data.searchString=""),function(){i.data.searchTimeout&&clearTimeout(i.data.searchTimeout),i.data.searchTimeout=setTimeout(function(){i.data.searchString=""},1e3)}(),this.data.searchString+=s,t=this.search(this.data.searchString,this.data.settings.search),t.length&&(d.default.hasClass(t[0],"dk-option-disabled")||this.selectOne(t[0]))}},{key:"_scrollTo",value:function(e){var t,i,s,a=this.data.elem.lastChild;if(-1===e||"number"!=typeof e&&!e||!this.isOpen&&!this.multiple)return!1;"number"==typeof e&&(e=this.item(e)),t=d.default.position(e,a).top,i=t-a.scrollTop,s=i+e.offsetHeight,s>a.offsetHeight?(t+=e.offsetHeight,a.scrollTop=t-a.offsetHeight):i<0&&(a.scrollTop=t)}}]),e}();window.Dropkick=m,window.Dropkick.cache={},window.Dropkick.uid=0,m.build=function(e,t){var i,s,a,n=[],l={elem:null,options:[],selected:[]},o=function e(i){var s,a,n,o,r=[];switch(i.nodeName){case"OPTION":s=d.default.create("li",{class:"dk-option ","data-value":i.value,text:i.text,innerHTML:i.innerHTML,role:"option","aria-selected":"false",id:t+"-"+(i.id||i.value.replace(" ","-"))}),d.default.addClass(s,i.className),i.disabled&&(d.default.addClass(s,"dk-option-disabled"),s.setAttribute("aria-disabled","true")),i.hidden&&(d.default.addClass(s,"dk-option-hidden"),s.setAttribute("aria-hidden","true")),i.selected&&(d.default.addClass(s,"dk-option-selected"),s.setAttribute("aria-selected","true"),l.selected.push(s)),l.options.push(this.appendChild(s));break;case"OPTGROUP":for(a=d.default.create("li",{class:"dk-optgroup"}),i.label&&a.appendChild(d.default.create("div",{class:"dk-optgroup-label",innerHTML:i.label})),n=d.default.create("ul",{class:"dk-optgroup-options"}),o=i.children.length;o--;r.unshift(i.children[o]));i.disabled&&(a.classList.add("dk-optgroup-disabled"),r.forEach(function(e){e.disabled=i.disabled})),r.forEach(e,n),this.appendChild(a).appendChild(n)}};for(l.elem=d.default.create("div",{class:"dk-select"+(e.multiple?"-multi":"")}),s=d.default.create("ul",{class:"dk-select-options",id:t+"-listbox",role:"listbox"}),e.disabled&&(d.default.addClass(l.elem,"dk-select-disabled"),l.elem.setAttribute("aria-disabled",!0)),l.elem.id=t+(e.id?"-"+e.id:""),d.default.addClass(l.elem,e.className),e.multiple?(l.elem.setAttribute("tabindex",e.getAttribute("tabindex")||"0"),s.setAttribute("aria-multiselectable","true")):(i=e.options[e.selectedIndex],l.elem.appendChild(d.default.create("div",{class:"dk-selected "+(i?i.className:""),tabindex:e.tabindex||0,innerHTML:i?i.text:"&nbsp;",id:t+"-combobox","aria-live":"assertive","aria-owns":s.id,role:"combobox"})),s.setAttribute("aria-expanded","false")),a=e.children.length;a--;n.unshift(e.children[a]));return n.forEach(o,l.elem.appendChild(s)),l},m.onDocClick=function(e){var t,i,s=window.Dropkick;if(1!==e.target.nodeType)return!1;null!==(t=e.target.getAttribute("data-dkcacheid"))&&s.cache[t].focus();for(i in s.cache)d.default.closest(e.target,s.cache[i].data.elem)||i===t||s.cache[i].disabled||s.cache[i].close()},void 0!==window.jQuery&&(window.jQuery.fn.dropkick=function(){var e=Array.prototype.slice.call(arguments);return jQuery(this).each(function(){e[0]&&"object"!==n(e[0])?"string"==typeof e[0]&&m.prototype[e[0]].apply(new m(this),e.slice(1)):new m(this,e[0]||{})})}),t.default=m},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=-1!==navigator.appVersion.indexOf("MSIE"),a={hasClass:function(e,t){var i=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return e&&i.test(e.className)},addClass:function(e,t){e&&!this.hasClass(e,t)&&(e.className+=" "+t)},removeClass:function(e,t){var i=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e&&(e.className=e.className.replace(i," "))},toggleClass:function(e,t){[(this.hasClass(e,t)?"remove":"add")+"Class"](e,t)},extend:function(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t)for(var i in t)e[i]=t[i]}),e},offset:function(e){var t=e.getBoundingClientRect()||{top:0,left:0},i=document.documentElement,a=s?i.scrollTop:window.pageYOffset,n=s?i.scrollLeft:window.pageXOffset;return{top:t.top+a-i.clientTop,left:t.left+n-i.clientLeft}},position:function(e,t){for(var i={top:0,left:0};e&&e!==t;)i.top+=e.offsetTop,i.left+=e.offsetLeft,e=e.parentNode;return i},closest:function(e,t){for(;e;){if(e===t)return e;e=e.parentNode}return!1},create:function(e,t){var i=void 0,s=document.createElement(e);t||(t={});for(i in t)t.hasOwnProperty(i)&&("innerHTML"===i?s.innerHTML=t[i]:s.setAttribute(i,t[i]));return s},deferred:function(e){return function(){var t=this,i=arguments;window.setTimeout(function(){e.apply(t,i)},1)}}};t.default=a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={initialize:function(){},mobile:!0,change:function(){},open:function(){},close:function(){},search:"strict",bubble:!0};t.default=s},function(e,t,i){(function(t){var i=t.CustomEvent;e.exports=function(){try{var e=new i("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(e){}return!1}()?i:"undefined"!=typeof document&&"function"==typeof document.createEvent?function(e,t){var i=document.createEvent("CustomEvent");return t?i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):i.initCustomEvent(e,!1,!1,void 0),i}:function(e,t){var i=document.createEventObject();return i.type=e,t?(i.bubbles=Boolean(t.bubbles),i.cancelable=Boolean(t.cancelable),i.detail=t.detail):(i.bubbles=!1,i.cancelable=!1,i.detail=void 0),i}}).call(t,i(4))},function(e,t){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(i=window)}e.exports=i}])});
},{}],2:[function(_dereq_,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rangeSlider", [], factory);
	else if(typeof exports === 'object')
		exports["rangeSlider"] = factory();
	else
		root["rangeSlider"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/range-slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/range-slider.css":
/*!******************************!*\
  !*** ./src/range-slider.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/range-slider.js":
/*!*****************************!*\
  !*** ./src/range-slider.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(/*! ./utils/dom */ "./src/utils/dom.js");

var dom = _interopRequireWildcard(_dom);

var _functions = __webpack_require__(/*! ./utils/functions */ "./src/utils/functions.js");

var func = _interopRequireWildcard(_functions);

__webpack_require__(/*! ./range-slider.css */ "./src/range-slider.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newLineAndTabRegexp = new RegExp('/[\\n\\t]/', 'g');
var MAX_SET_BY_DEFAULT = 100;
var HANDLE_RESIZE_DELAY = 300;
var HANDLE_RESIZE_DEBOUNCE = 50;

var pluginName = 'rangeSlider';
var inputrange = dom.supportsRange();
var defaults = {
  polyfill: true,
  rangeClass: 'rangeSlider',
  disabledClass: 'rangeSlider--disabled',
  fillClass: 'rangeSlider__fill',
  bufferClass: 'rangeSlider__buffer',
  handleClass: 'rangeSlider__handle',
  startEvent: ['mousedown', 'touchstart', 'pointerdown'],
  moveEvent: ['mousemove', 'touchmove', 'pointermove'],
  endEvent: ['mouseup', 'touchend', 'pointerup'],
  min: null,
  max: null,
  step: null,
  value: null,
  buffer: null,
  stick: null,
  borderRadius: 10,
  vertical: false
};

/**
 * Plugin
 * @param {HTMLElement} element
 * @param {this} options
 */

var RangeSlider = function () {
  function RangeSlider(element, options) {
    _classCallCheck(this, RangeSlider);

    var minSetByDefault = void 0;
    var maxSetByDefault = void 0;
    var stepSetByDefault = void 0;
    var stickAttribute = void 0;
    var stickValues = void 0;

    this.element = element;
    this.options = func.simpleExtend(defaults, options);
    this.polyfill = this.options.polyfill;
    this.vertical = this.options.vertical;
    this.onInit = this.options.onInit;
    this.onSlide = this.options.onSlide;
    this.onSlideStart = this.options.onSlideStart;
    this.onSlideEnd = this.options.onSlideEnd;
    this.onSlideEventsCount = -1;
    this.isInteractsNow = false;
    this.needTriggerEvents = false;

    // Plugin should only be used as a polyfill
    if (!this.polyfill) {
      // Input range support?
      if (inputrange) {
        return;
      }
    }

    this.options.buffer = this.options.buffer || parseFloat(this.element.getAttribute('data-buffer'));

    this.identifier = 'js-' + pluginName + '-' + func.uuid();

    this.min = func.getFirsNumberLike(this.options.min, parseFloat(this.element.getAttribute('min')), minSetByDefault = 0);

    this.max = func.getFirsNumberLike(this.options.max, parseFloat(this.element.getAttribute('max')), maxSetByDefault = MAX_SET_BY_DEFAULT);

    this.value = func.getFirsNumberLike(this.options.value, this.element.value, parseFloat(this.element.value || this.min + (this.max - this.min) / 2));

    this.step = func.getFirsNumberLike(this.options.step, parseFloat(this.element.getAttribute('step')) || (stepSetByDefault = 1));

    this.percent = null;

    if (func.isArray(this.options.stick) && this.options.stick.length >= 1) {
      this.stick = this.options.stick;
    } else if (stickAttribute = this.element.getAttribute('stick')) {
      stickValues = stickAttribute.split(' ');
      if (stickValues.length >= 1) {
        this.stick = stickValues.map(parseFloat);
      }
    }
    if (this.stick && this.stick.length === 1) {
      this.stick.push(this.step * 1.5);
    }
    this._updatePercentFromValue();

    this.toFixed = this._toFixed(this.step);

    var directionClass = void 0;

    this.container = document.createElement('div');
    dom.addClass(this.container, this.options.fillClass);

    directionClass = this.vertical ? this.options.fillClass + '__vertical' : this.options.fillClass + '__horizontal';
    dom.addClass(this.container, directionClass);

    this.handle = document.createElement('div');
    dom.addClass(this.handle, this.options.handleClass);

    directionClass = this.vertical ? this.options.handleClass + '__vertical' : this.options.handleClass + '__horizontal';
    dom.addClass(this.handle, directionClass);

    this.range = document.createElement('div');
    dom.addClass(this.range, this.options.rangeClass);
    this.range.id = this.identifier;

    if (this.options.bufferClass) {
      this.buffer = document.createElement('div');
      dom.addClass(this.buffer, this.options.bufferClass);
      this.range.appendChild(this.buffer);

      directionClass = this.vertical ? this.options.bufferClass + '__vertical' : this.options.bufferClass + '__horizontal';
      dom.addClass(this.buffer, directionClass);
    }

    this.range.appendChild(this.container);
    this.range.appendChild(this.handle);

    directionClass = this.vertical ? this.options.rangeClass + '__vertical' : this.options.rangeClass + '__horizontal';
    dom.addClass(this.range, directionClass);

    if (func.isNumberLike(this.options.value)) {
      this._setValue(this.options.value, true);
      this.element.value = this.options.value;
    }

    if (func.isNumberLike(this.options.buffer)) {
      this.element.setAttribute('data-buffer', this.options.buffer);
    }

    if (func.isNumberLike(this.options.min) || minSetByDefault) {
      this.element.setAttribute('min', '' + this.min);
    }

    if (func.isNumberLike(this.options.max) || maxSetByDefault) {
      this.element.setAttribute('max', '' + this.max);
    }

    if (func.isNumberLike(this.options.step) || stepSetByDefault) {
      this.element.setAttribute('step', '' + this.step);
    }

    dom.insertAfter(this.element, this.range);

    // hide the input visually
    dom.setCss(this.element, {
      'position': 'absolute',
      'width': '1px',
      'height': '1px',
      'overflow': 'hidden',
      'opacity': '0'
    });

    // Store context
    this._handleDown = this._handleDown.bind(this);
    this._handleMove = this._handleMove.bind(this);
    this._handleEnd = this._handleEnd.bind(this);
    this._startEventListener = this._startEventListener.bind(this);
    this._changeEventListener = this._changeEventListener.bind(this);
    this._handleResize = this._handleResize.bind(this);

    this._init();

    // Attach Events
    window.addEventListener('resize', this._handleResize, false);

    dom.addEventListeners(document, this.options.startEvent, this._startEventListener);

    // Listen to programmatic value changes
    this.element.addEventListener('change', this._changeEventListener, false);
  }

  /* public methods */

  /**
   * @param {Object} obj like {min : Number, max : Number, value : Number, step : Number, buffer : [String|Number]}
   * @param {Boolean} triggerEvents
   * @returns {RangeSlider}
   */


  _createClass(RangeSlider, [{
    key: 'update',
    value: function update(obj, triggerEvents) {
      if (triggerEvents) {
        this.needTriggerEvents = true;
      }
      if (func.isObject(obj)) {
        if (func.isNumberLike(obj.min)) {
          this.element.setAttribute('min', '' + obj.min);
          this.min = obj.min;
        }

        if (func.isNumberLike(obj.max)) {
          this.element.setAttribute('max', '' + obj.max);
          this.max = obj.max;
        }

        if (func.isNumberLike(obj.step)) {
          this.element.setAttribute('step', '' + obj.step);
          this.step = obj.step;
          this.toFixed = this._toFixed(obj.step);
        }

        if (func.isNumberLike(obj.buffer)) {
          this._setBufferPosition(obj.buffer);
        }

        if (func.isNumberLike(obj.value)) {
          this._setValue(obj.value);
        }
      }
      this._update();
      this.onSlideEventsCount = 0;
      this.needTriggerEvents = false;
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      dom.removeAllListenersFromEl(this, document);
      window.removeEventListener('resize', this._handleResize, false);
      this.element.removeEventListener('change', this._changeEventListener, false);

      this.element.style.cssText = '';
      delete this.element[pluginName];

      // Remove the generated markup
      if (this.range) {
        this.range.parentNode.removeChild(this.range);
      }
    }

    /**
     * A lightweight plugin wrapper around the constructor,preventing against multiple instantiations
     * @param {Element} el
     * @param {Object} options
     */

  }, {
    key: '_toFixed',


    /* private methods */

    value: function _toFixed(step) {
      return (step + '').replace('.', '').length - 1;
    }
  }, {
    key: '_init',
    value: function _init() {
      if (this.onInit && typeof this.onInit === 'function') {
        this.onInit();
      }
      this._update();
    }
  }, {
    key: '_updatePercentFromValue',
    value: function _updatePercentFromValue() {
      this.percent = (this.value - this.min) / (this.max - this.min);
    }

    /**
     * This method check if this.identifier exists in ev.target's ancestors
     * @param ev
     * @param data
     */

  }, {
    key: '_startEventListener',
    value: function _startEventListener(ev, data) {
      var _this = this;

      var el = ev.target;
      var isEventOnSlider = false;

      if (ev.which !== 1 && !('touches' in ev)) {
        return;
      }

      dom.forEachAncestors(el, function (el) {
        return isEventOnSlider = el.id === _this.identifier && !dom.hasClass(el, _this.options.disabledClass);
      }, true);

      if (isEventOnSlider) {
        this._handleDown(ev, data);
      }
    }
  }, {
    key: '_changeEventListener',
    value: function _changeEventListener(ev, data) {
      if (data && data.origin === this.identifier) {
        return;
      }

      var value = ev.target.value;
      var pos = this._getPositionFromValue(value);

      this._setPosition(pos);
    }
  }, {
    key: '_update',
    value: function _update() {
      var sizeProperty = this.vertical ? 'offsetHeight' : 'offsetWidth';

      this.handleSize = dom.getDimension(this.handle, sizeProperty);
      this.rangeSize = dom.getDimension(this.range, sizeProperty);
      this.maxHandleX = this.rangeSize - this.handleSize;
      this.grabX = this.handleSize / 2;
      this.position = this._getPositionFromValue(this.value);

      // Consider disabled state
      if (this.element.disabled) {
        dom.addClass(this.range, this.options.disabledClass);
      } else {
        dom.removeClass(this.range, this.options.disabledClass);
      }

      this._setPosition(this.position);
      if (this.options.bufferClass && this.options.buffer) {
        this._setBufferPosition(this.options.buffer);
      }
      this._updatePercentFromValue();
      dom.triggerEvent(this.element, 'change', { origin: this.identifier });
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      var _this2 = this;

      return func.debounce(function () {
        // Simulate resizeEnd event.
        func.delay(function () {
          _this2._update();
        }, HANDLE_RESIZE_DELAY);
      }, HANDLE_RESIZE_DEBOUNCE)();
    }
  }, {
    key: '_handleDown',
    value: function _handleDown(e) {
      this.isInteractsNow = true;
      e.preventDefault();
      dom.addEventListeners(document, this.options.moveEvent, this._handleMove);
      dom.addEventListeners(document, this.options.endEvent, this._handleEnd);

      // If we click on the handle don't set the new position
      if ((' ' + e.target.className + ' ').replace(newLineAndTabRegexp, ' ').indexOf(this.options.handleClass) > -1) {
        return;
      }

      var boundingClientRect = this.range.getBoundingClientRect();

      var posX = this._getRelativePosition(e);
      var rangeX = this.vertical ? boundingClientRect.bottom : boundingClientRect.left;
      var handleX = this._getPositionFromNode(this.handle) - rangeX;
      var position = posX - this.grabX;

      this._setPosition(position);

      if (posX >= handleX && posX < handleX + this.options.borderRadius * 2) {
        this.grabX = posX - handleX;
      }
      this._updatePercentFromValue();
    }
  }, {
    key: '_handleMove',
    value: function _handleMove(e) {
      var posX = this._getRelativePosition(e);

      this.isInteractsNow = true;
      e.preventDefault();
      this._setPosition(posX - this.grabX);
    }
  }, {
    key: '_handleEnd',
    value: function _handleEnd(e) {
      e.preventDefault();
      dom.removeEventListeners(document, this.options.moveEvent, this._handleMove);
      dom.removeEventListeners(document, this.options.endEvent, this._handleEnd);

      // Ok we're done fire the change event
      dom.triggerEvent(this.element, 'change', { origin: this.identifier });

      if (this.isInteractsNow || this.needTriggerEvents) {
        if (this.onSlideEnd && typeof this.onSlideEnd === 'function') {
          this.onSlideEnd(this.value, this.percent, this.position);
        }
      }
      this.onSlideEventsCount = 0;
      this.isInteractsNow = false;
    }
  }, {
    key: '_setPosition',
    value: function _setPosition(pos) {
      var position = void 0;
      var stickRadius = void 0;
      var restFromValue = void 0;
      var stickTo = void 0;

      // Snapping steps
      var value = this._getValueFromPosition(func.between(pos, 0, this.maxHandleX));

      // Stick to stick[0] in radius stick[1]
      if (this.stick) {
        stickTo = this.stick[0];
        stickRadius = this.stick[1] || 0.1;
        restFromValue = value % stickTo;
        if (restFromValue < stickRadius) {
          value = value - restFromValue;
        } else if (Math.abs(stickTo - restFromValue) < stickRadius) {
          value = value - restFromValue + stickTo;
        }
      }
      position = this._getPositionFromValue(value);

      // Update ui
      if (this.vertical) {
        this.container.style.height = position + this.grabX + 'px';
        this.handle.style['webkitTransform'] = 'translateY(-' + position + 'px)';
        this.handle.style['msTransform'] = 'translateY(-' + position + 'px)';
        this.handle.style.transform = 'translateY(-' + position + 'px)';
      } else {
        this.container.style.width = position + this.grabX + 'px';
        this.handle.style['webkitTransform'] = 'translateX(' + position + 'px)';
        this.handle.style['msTransform'] = 'translateX(' + position + 'px)';
        this.handle.style.transform = 'translateX(' + position + 'px)';
      }

      this._setValue(value);

      // Update globals
      this.position = position;
      this.value = value;
      this._updatePercentFromValue();

      if (this.isInteractsNow || this.needTriggerEvents) {
        if (this.onSlideStart && typeof this.onSlideStart === 'function' && this.onSlideEventsCount === 0) {
          this.onSlideStart(this.value, this.percent, this.position);
        }

        if (this.onSlide && typeof this.onSlide === 'function') {
          this.onSlide(this.value, this.percent, this.position);
        }
      }

      this.onSlideEventsCount++;
    }
  }, {
    key: '_setBufferPosition',
    value: function _setBufferPosition(pos) {
      var isPercent = true;

      if (isFinite(pos)) {
        pos = parseFloat(pos);
      } else if (func.isString(pos)) {
        if (pos.indexOf('px') > 0) {
          isPercent = false;
        }
        pos = parseFloat(pos);
      } else {
        console.warn('New position must be XXpx or XX%');
        return;
      }

      if (isNaN(pos)) {
        console.warn('New position is NaN');
        return;
      }
      if (!this.options.bufferClass) {
        console.warn('You disabled buffer, it\'s className is empty');
        return;
      }
      var bufferSize = isPercent ? pos : pos / this.rangeSize * 100;

      if (bufferSize < 0) {
        bufferSize = 0;
      }
      if (bufferSize > 100) {
        bufferSize = 100;
      }
      this.options.buffer = bufferSize;

      var paddingSize = this.options.borderRadius / this.rangeSize * 100;
      var bufferSizeWithPadding = bufferSize - paddingSize;

      if (bufferSizeWithPadding < 0) {
        bufferSizeWithPadding = 0;
      }

      if (this.vertical) {
        this.buffer.style.height = bufferSizeWithPadding + '%';
        this.buffer.style.bottom = paddingSize * 0.5 + '%';
      } else {
        this.buffer.style.width = bufferSizeWithPadding + '%';
        this.buffer.style.left = paddingSize * 0.5 + '%';
      }

      this.element.setAttribute('data-buffer', bufferSize);
    }

    /**
     *
     * @param {Element} node
     * @returns {*} Returns element position relative to the parent
     * @private
     */

  }, {
    key: '_getPositionFromNode',
    value: function _getPositionFromNode(node) {
      var i = this.vertical ? this.maxHandleX : 0;

      while (node !== null) {
        i += this.vertical ? node.offsetTop : node.offsetLeft;
        node = node.offsetParent;
      }
      return i;
    }

    /**
     *
     * @param {(MouseEvent|TouchEvent)}e
     * @returns {number}
     */

  }, {
    key: '_getRelativePosition',
    value: function _getRelativePosition(e) {
      var boundingClientRect = this.range.getBoundingClientRect();

      // Get the offset relative to the viewport
      var rangeSize = this.vertical ? boundingClientRect.bottom : boundingClientRect.left;
      var pageOffset = 0;

      var pagePositionProperty = this.vertical ? 'pageY' : 'pageX';

      if (typeof e[pagePositionProperty] !== 'undefined') {
        pageOffset = e.touches && e.touches.length ? e.touches[0][pagePositionProperty] : e[pagePositionProperty];
      } else if (typeof e.originalEvent !== 'undefined') {
        if (typeof e.originalEvent[pagePositionProperty] !== 'undefined') {
          pageOffset = e.originalEvent[pagePositionProperty];
        } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0][pagePositionProperty] !== 'undefined') {
          pageOffset = e.originalEvent.touches[0][pagePositionProperty];
        }
      } else if (e.touches && e.touches[0] && typeof e.touches[0][pagePositionProperty] !== 'undefined') {
        pageOffset = e.touches[0][pagePositionProperty];
      } else if (e.currentPoint && (typeof e.currentPoint.x !== 'undefined' || typeof e.currentPoint.y !== 'undefined')) {
        pageOffset = this.vertical ? e.currentPoint.y : e.currentPoint.x;
      }

      if (this.vertical) {
        pageOffset -= window.pageYOffset;
      }

      return this.vertical ? rangeSize - pageOffset : pageOffset - rangeSize;
    }
  }, {
    key: '_getPositionFromValue',
    value: function _getPositionFromValue(value) {
      var percentage = (value - this.min) / (this.max - this.min);
      var pos = percentage * this.maxHandleX;

      return isNaN(pos) ? 0 : pos;
    }
  }, {
    key: '_getValueFromPosition',
    value: function _getValueFromPosition(pos) {
      var percentage = pos / (this.maxHandleX || 1);
      var value = this.step * Math.round(percentage * (this.max - this.min) / this.step) + this.min;

      return Number(value.toFixed(this.toFixed));
    }
  }, {
    key: '_setValue',
    value: function _setValue(value, force) {
      if (value === this.value && !force) {
        return;
      }

      // Set the new value and fire the `input` event
      this.element.value = value;
      this.value = value;
      dom.triggerEvent(this.element, 'input', { origin: this.identifier });
    }
  }], [{
    key: 'create',
    value: function create(el, options) {
      var createInstance = function createInstance(el) {
        var data = el[pluginName];

        // Create a new instance.
        if (!data) {
          data = new RangeSlider(el, options);
          el[pluginName] = data;
        }
      };

      if (el.length) {
        Array.prototype.slice.call(el).forEach(function (el) {
          createInstance(el);
        });
      } else {
        createInstance(el);
      }
    }
  }]);

  return RangeSlider;
}();

exports.default = RangeSlider;
module.exports = exports['default'];

/***/ }),

/***/ "./src/utils/dom.js":
/*!**************************!*\
  !*** ./src/utils/dom.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsRange = exports.removeAllListenersFromEl = exports.removeEventListeners = exports.addEventListeners = exports.insertAfter = exports.triggerEvent = exports.forEachAncestors = exports.removeClass = exports.addClass = exports.hasClass = exports.setCss = exports.getDimension = exports.getHiddenParentNodes = exports.isHidden = exports.detectIE = undefined;

var _functions = __webpack_require__(/*! ./functions */ "./src/utils/functions.js");

var func = _interopRequireWildcard(_functions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var EVENT_LISTENER_LIST = 'eventListenerList';

var detectIE = exports.detectIE = function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');

  if (trident > 0) {
    var rv = ua.indexOf('rv:');

    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');

  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  return false;
};

var ieVersion = detectIE();
var eventCaptureParams = window.PointerEvent && !ieVersion ? { passive: false } : false;

/**
 * Check if a `element` is visible in the DOM
 *
 * @param  {Element}  element
 * @return {Boolean}
 */
var isHidden = exports.isHidden = function isHidden(element) {
  return element.offsetWidth === 0 || element.offsetHeight === 0 || element.open === false;
};

/**
 * Get hidden parentNodes of an `element`
 *
 * @param {Element} element
 * @return {Element[]}
 */
var getHiddenParentNodes = exports.getHiddenParentNodes = function getHiddenParentNodes(element) {
  var parents = [];
  var node = element.parentNode;

  while (isHidden(node)) {
    parents.push(node);
    node = node.parentNode;
  }
  return parents;
};

/**
 * Returns dimensions for an element even if it is not visible in the DOM.
 *
 * @param  {Element} element
 * @param  {string}  key     (e.g. offsetWidth …)
 * @return {Number}
 */
var getDimension = exports.getDimension = function getDimension(element, key) {
  var hiddenParentNodes = getHiddenParentNodes(element);
  var hiddenParentNodesLength = hiddenParentNodes.length;
  var hiddenParentNodesStyle = [];
  var dimension = element[key];

  // Used for native `<details>` elements
  var toggleOpenProperty = function toggleOpenProperty(element) {
    if (typeof element.open !== 'undefined') {
      element.open = !element.open;
    }
  };

  if (hiddenParentNodesLength) {
    for (var i = 0; i < hiddenParentNodesLength; i++) {
      // Cache the styles to restore then later.
      hiddenParentNodesStyle.push({
        display: hiddenParentNodes[i].style.display,
        height: hiddenParentNodes[i].style.height,
        overflow: hiddenParentNodes[i].style.overflow,
        visibility: hiddenParentNodes[i].style.visibility
      });

      hiddenParentNodes[i].style.display = 'block';
      hiddenParentNodes[i].style.height = '0';
      hiddenParentNodes[i].style.overflow = 'hidden';
      hiddenParentNodes[i].style.visibility = 'hidden';
      toggleOpenProperty(hiddenParentNodes[i]);
    }

    dimension = element[key];

    for (var j = 0; j < hiddenParentNodesLength; j++) {
      toggleOpenProperty(hiddenParentNodes[j]);
      hiddenParentNodes[j].style.display = hiddenParentNodesStyle[j].display;
      hiddenParentNodes[j].style.height = hiddenParentNodesStyle[j].height;
      hiddenParentNodes[j].style.overflow = hiddenParentNodesStyle[j].overflow;
      hiddenParentNodes[j].style.visibility = hiddenParentNodesStyle[j].visibility;
    }
  }
  return dimension;
};

/**
 *
 * @param {HTMLElement} el
 * @param {Object} cssObj
 * @returns {*}
 */
var setCss = exports.setCss = function setCss(el, cssObj) {
  for (var key in cssObj) {
    el.style[key] = cssObj[key];
  }
  return el.style;
};

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
var hasClass = exports.hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
var addClass = exports.addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
var removeClass = exports.removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';

  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

/**
 *
 * @param {HTMLElement} el
 * @param {Function} callback
 * @param {boolean} andForElement - apply callback for el
 * @returns {HTMLElement}
 */
var forEachAncestors = exports.forEachAncestors = function forEachAncestors(el, callback, andForElement) {
  if (andForElement) {
    callback(el);
  }

  while (el.parentNode && !callback(el)) {
    el = el.parentNode;
  }

  return el;
};

/**
 *
 * @param {HTMLElement} el
 * @param {string} name event name
 * @param {Object} data
 */
var triggerEvent = exports.triggerEvent = function triggerEvent(el, name, data) {
  if (!func.isString(name)) {
    throw new TypeError('event name must be String');
  }
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('element must be HTMLElement');
  }
  name = name.trim();
  var event = document.createEvent('CustomEvent');

  event.initCustomEvent(name, false, false, data);
  el.dispatchEvent(event);
};

/**
 * @param {Object} referenceNode after this
 * @param {Object} newNode insert this
 */
var insertAfter = exports.insertAfter = function insertAfter(referenceNode, newNode) {
  return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/**
 * Add event listeners and push them to el[EVENT_LISTENER_LIST]
 * @param {HTMLElement|Node|Document} el DOM element
 * @param {Array} events
 * @param {Function} listener
 */
var addEventListeners = exports.addEventListeners = function addEventListeners(el, events, listener) {
  events.forEach(function (eventName) {
    if (!el[EVENT_LISTENER_LIST]) {
      el[EVENT_LISTENER_LIST] = {};
    }
    if (!el[EVENT_LISTENER_LIST][eventName]) {
      el[EVENT_LISTENER_LIST][eventName] = [];
    }

    el.addEventListener(eventName, listener, eventCaptureParams);
    if (el[EVENT_LISTENER_LIST][eventName].indexOf(listener) < 0) {
      el[EVENT_LISTENER_LIST][eventName].push(listener);
    }
  });
};

/**
 * Remove event listeners and remove them from el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 * @param {Array} events
 * @param {Function} listener
 */
var removeEventListeners = exports.removeEventListeners = function removeEventListeners(el, events, listener) {
  events.forEach(function (eventName) {
    var index = void 0;

    el.removeEventListener(eventName, listener, false);

    if (el[EVENT_LISTENER_LIST] && el[EVENT_LISTENER_LIST][eventName] && (index = el[EVENT_LISTENER_LIST][eventName].indexOf(listener)) > -1) {
      el[EVENT_LISTENER_LIST][eventName].splice(index, 1);
    }
  });
};

/**
 * Remove ALL event listeners which exists in el[EVENT_LISTENER_LIST]
 * @param instance
 * @param {HTMLElement} el DOM element
 */
var removeAllListenersFromEl = exports.removeAllListenersFromEl = function removeAllListenersFromEl(instance, el) {
  if (!el[EVENT_LISTENER_LIST]) {
    return;
  }

  /* jshint ignore:start */

  /**
   *
   * @callback listener
   * @this {Object} event name
   */
  function rm(listener) {
    if (listener === instance._startEventListener) {
      this.el.removeEventListener(this.eventName, listener, false);
    }
  }

  for (var eventName in el[EVENT_LISTENER_LIST]) {
    el[EVENT_LISTENER_LIST][eventName].forEach(rm, { eventName: eventName, el: el });
  }

  el[EVENT_LISTENER_LIST] = {};
  /* jshint ignore:end */
};

/**
 * Range feature detection
 * @return {Boolean}
 */
var supportsRange = exports.supportsRange = function supportsRange() {
  var input = document.createElement('input');

  input.setAttribute('type', 'range');
  return input.type !== 'text';
};

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create a random uuid
 */
var uuid = exports.uuid = function uuid() {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

/**
 * Delays a function for the given number of milliseconds, and then calls
 * it with the arguments supplied.
 *
 * @param  {Function} fn   function
 * @param  {Number}   wait delay
 * @param  {Number}   args arguments
 * @return {Function}
 */
var delay = exports.delay = function delay(fn, wait) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return setTimeout(function () {
    return fn.apply(null, args);
  }, wait);
};

/**
 * Returns a debounced function that will make sure the given
 * function is not triggered too much.
 *
 * @param  {Function} fn Function to debounce.
 * @param  {Number}   debounceDuration OPTIONAL. The amount of time in milliseconds for which we will debounce the
 *         function. (defaults to 100ms)
 * @return {Function}
 */
var debounce = exports.debounce = function debounce(fn) {
  var debounceDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (!fn.debouncing) {
      fn.lastReturnVal = fn.apply(window, args);
      fn.debouncing = true;
    }
    clearTimeout(fn.debounceTimeout);
    fn.debounceTimeout = setTimeout(function () {
      fn.debouncing = false;
    }, debounceDuration);
    return fn.lastReturnVal;
  };
};

var isString = exports.isString = function isString(obj) {
  return obj === '' + obj;
};

var isArray = exports.isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var isNumberLike = exports.isNumberLike = function isNumberLike(obj) {
  return obj !== null && obj !== undefined && (isString(obj) && isFinite(parseFloat(obj)) || isFinite(obj));
};

var getFirsNumberLike = exports.getFirsNumberLike = function getFirsNumberLike() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (!args.length) {
    return null;
  }

  for (var i = 0, len = args.length; i < len; i++) {
    if (isNumberLike(args[i])) {
      return args[i];
    }
  }

  return null;
};

var isObject = exports.isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var simpleExtend = exports.simpleExtend = function simpleExtend(defaultOpt, options) {
  var opt = {};

  for (var key in defaultOpt) {
    opt[key] = defaultOpt[key];
  }
  for (var _key4 in options) {
    opt[_key4] = options[_key4];
  }

  return opt;
};

var between = exports.between = function between(pos, min, max) {
  if (pos < min) {
    return min;
  }
  if (pos > max) {
    return max;
  }
  return pos;
};

/***/ })

/******/ });
});

},{}],3:[function(_dereq_,module,exports){
var events = {
    "init": "fontsampler.events.init"
}

module.exports = events
},{}],4:[function(_dereq_,module,exports){
function pruneClass(className, classNames) {
    if (!classNames) {
        return ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex !== -1) {
        classes.splice(classIndex, 1)
    }

    if (classes.length > 0) {
        return classes.join(" ")
    } else {
        return ""
    }
}

function addClass(className, classNames) {
    if (!classNames) {
        classNames = ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex === -1) {
        if (classNames) {
            return classNames + " " + className
        } else {
            return className
        }
    } else {
        return classNames
    }
}

function nodeAddClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = addClass(className, node.className)

    return true
}

function nodeAddClasses(node, classes) {
    if (!isNode(node) || !Array.isArray(classes) || classes.length < 1) {
        return false
    }

    for (var c = 0; c < classes.length; c++) {
        node.className = addClass(classes[c], node.className)
    }

    return true
}

function nodeRemoveClass(node, className) {
    if (!isNode(node) || typeof(className) !== "string") {
        return false
    }

    node.className = pruneClass(className, node.className)

    return true
}

/**
 * Really just an approximation of a check
 * 
 * @param {*} node 
 */
function isNode(node) {
    return typeof(node) === "object" && node !== null && "nodeType" in node
}

module.exports = {
    nodeAddClass: nodeAddClass,
    nodeAddClasses: nodeAddClasses,
    nodeRemoveClass: nodeRemoveClass,
    isNode: isNode
}
},{}],5:[function(_dereq_,module,exports){
var rangeSlider = _dereq_("../node_modules/rangeslider-pure/dist/range-slider")
var Dropkick = _dereq_("../node_modules/dropkickjs/dist/dropkick").default
var events = _dereq_("./events")
var helpers = _dereq_("./helpers")

function Skin(FS) {

    FS.registerEventhandler(events.init, init)

    function init() {
        console.debug("Skin.init()", FS, FS.initialized)

        if (FS.initialized === true) {
            console.error(FS.root)
            throw new Error("FontsamplerSkin: Cannot apply skin to a Fontsampler that is already initialized.")
        }

        helpers.nodeAddClass(FS.root, "fsjs-skin")

        var rangeInputs = FS.root.querySelectorAll("input[type=range][data-fsjs]")
        if (rangeInputs.length) {
            rangeSlider.create(rangeInputs, {
                polyfill: true,
                onSlide: updateSlider,
                onSlideEnd: updateSlider
            })
        }

        var selectInputs = FS.root.querySelectorAll("select[data-fsjs]")
        if (selectInputs.length) {
            for (var i in selectInputs) {
                if (selectInputs.hasOwnProperty(i)) {
                    new Dropkick(selectInputs[i], {
                        mobile: true
                    })
                }

            }
        }
    }

    function updateSlider(position /*, value*/ ) {
        var key = this.element.dataset.fsjs,
            label = FS.root.querySelector("[data-fsjs-for='" + key + "'] .fsjs-label-value")

        FS.root.dispatchEvent(new CustomEvent("fontsampler.on" + key + "changed"))

        if (label) {
            label.textContent = position
        }
    }

}

module.exports = Skin
},{"../node_modules/dropkickjs/dist/dropkick":1,"../node_modules/rangeslider-pure/dist/range-slider":2,"./events":3,"./helpers":4}]},{},[5])(5)
});