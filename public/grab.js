//########CLICK TRACKER#################
//   Add the following script tag to your main HTML File( works only on Angular applications using ui-router)
// 		<script>
//     	window.__quix_site_id = 00000; //Replace with ID provided by Quix.com
//   		var wa = document.createElement('script');
//   		wa.type = 'text/javascript';
//   		wa.async = true;
//   		wa.src = 'INSERT_OUR_SCRIPT_URL_HERE.js';
//   		var s = document.getElementsByTagName('script')[0];
//   		s.parentNode.insertBefore(wa, s);
//     </script>
//######################################

(function(document, window) {

	var clicks = (function() {

		var onClick = function(event) {
			var clickObject = {};
			clickObject.currentState = document.getElementsByTagName('ui-view')[0].baseURI;
			clickObject.__quix_site_id = window.__quix_site_id;
			clickObject.targetElementId = assignElementId(event);
			clickObject.ctrlKey = event.ctrlKey;
			clickObject.altKey = event.altKey;
			clickObject.target = event.target;
			clickObject.timeStamp = event.timeStamp;
			clickObject.x = event.x;
			clickObject.y = event.y;
			clickObject.path = event.path;

			console.dir(event);
			console.dir(clickObject);
			var url = 'http://localhost:3000/api/';
			axios.post(url + 'site', event)
				.then(function(response) {
					console.log(response);
				});
		}

		return {
			onClick: onClick
		}

	})();

	document.addEventListener('click', clicks.onClick);

	/* axios v0.13.1 | (c) 2016 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function n(e){var t=new i(e),r=s(i.prototype.request,t);return o.extend(r,i.prototype,t),o.extend(r,t),r}var o=r(2),s=r(3),i=r(4),u=e.exports=n();u.Axios=i,u.create=function(e){return n(e)},u.all=function(e){return Promise.all(e)},u.spread=r(21)},function(e,t,r){"use strict";function n(e){return"[object Array]"===E.call(e)}function o(e){return"[object ArrayBuffer]"===E.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===E.call(e)}function d(e){return"[object File]"===E.call(e)}function l(e){return"[object Blob]"===E.call(e)}function h(e){return"[object Function]"===E.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function w(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||n(e)||(e=[e]),n(e))for(var r=0,o=e.length;o>r;r++)t.call(null,e[r],r,e);else for(var s in e)e.hasOwnProperty(s)&&t.call(null,e[s],s,e)}function x(){function e(e,r){"object"==typeof t[r]&&"object"==typeof e?t[r]=x(t[r],e):t[r]=e}for(var t={},r=0,n=arguments.length;n>r;r++)w(arguments[r],e);return t}function b(e,t,r){return w(t,function(t,n){r&&"function"==typeof t?e[n]=S(t,r):e[n]=t}),e}var S=r(3),E=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:o,isFormData:s,isArrayBufferView:i,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:v,forEach:w,merge:x,extend:b,trim:g}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";function n(e){this.defaults=s.merge(o,e),this.interceptors={request:new i,response:new i}}var o=r(5),s=r(2),i=r(7),u=r(8),a=r(19),c=r(20);n.prototype.request=function(e){"string"==typeof e&&(e=s.merge({url:arguments[0]},arguments[1])),e=s.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url));var t=[u,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},s.forEach(["delete","get","head"],function(e){n.prototype[e]=function(t,r){return this.request(s.merge(r||{},{method:e,url:t}))}}),s.forEach(["post","put","patch"],function(e){n.prototype[e]=function(t,r,n){return this.request(s.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=n},function(e,t,r){"use strict";function n(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=r(2),s=r(6),i=/^\)\]\}',?\n/,u={"Content-Type":"application/x-www-form-urlencoded"};e.exports={transformRequest:[function(e,t){return s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(n(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(n(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(i,"");try{e=JSON.parse(e)}catch(t){}}return e}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:o.merge(u),post:o.merge(u),put:o.merge(u)},timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&300>e}}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},function(e,t,r){"use strict";function n(){this.handlers=[]}var o=r(2);n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},function(e,t,r){"use strict";var n=r(2),o=r(9);e.exports=function(e){e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t;return"function"==typeof e.adapter?t=e.adapter:"undefined"!=typeof XMLHttpRequest?t=r(10):"undefined"!=typeof process&&(t=r(10)),Promise.resolve(e).then(t).then(function(t){return t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse)),Promise.reject(t)})}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},function(e,t,r){"use strict";var n=r(2),o=r(11),s=r(14),i=r(15),u=r(16),a=r(12),c="undefined"!=typeof window&&window.btoa||r(17);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;n.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",g=e.auth.password||"";d.Authorization="Basic "+c(y+":"+g)}if(l.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&0!==l.status){var r="getAllResponseHeaders"in l?i(l.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?l.response:l.responseText,s={data:n,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:r,config:e,request:l};o(t,f,s),l=null}},l.onerror=function(){f(a("Network Error",e)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),l=null},n.isStandardBrowserEnv()){var v=r(18),w=e.withCredentials||u(e.url)?v.read(e.xsrfCookieName):void 0;w&&(d[e.xsrfHeaderName]=w)}if("setRequestHeader"in l&&n.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(x){if("json"!==l.responseType)throw x}"function"==typeof e.progress&&("post"===e.method||"put"===e.method?l.upload.addEventListener("progress",e.progress):"get"===e.method&&l.addEventListener("progress",e.progress)),void 0===p&&(p=null),l.send(p)})}},function(e,t,r){"use strict";var n=r(12);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r)):e(r)}},function(e,t,r){"use strict";var n=r(13);e.exports=function(e,t,r,o){var s=new Error(e);return n(s,t,r,o)}},function(e,t){"use strict";e.exports=function(e,t,r,n){return e.config=t,r&&(e.code=r),e.response=n,e}},function(e,t,r){"use strict";function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=r(2);e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(n(t)+"="+n(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e){var t,r,o,s={};return e?(n.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t&&(s[t]=s[t]?s[t]+", "+r:r)}),s):s}},function(e,t,r){"use strict";var n=r(2);e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return r&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(r){var o=n.isString(r)?e(r):r;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function r(){this.message="String contains an invalid character"}function n(e){for(var t,n,s=String(e),i="",u=0,a=o;s.charAt(0|u)||(a="=",u%1);i+=a.charAt(63&t>>8-u%1*8)){if(n=s.charCodeAt(u+=.75),n>255)throw new r;t=t<<8|n}return i}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=n},function(e,t,r){"use strict";var n=r(2);e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,o,s,i){var u=[];u.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&u.push("expires="+new Date(r).toGMTString()),n.isString(o)&&u.push("path="+o),n.isString(s)&&u.push("domain="+s),i===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});
//# sourceMappingURL=axios.min.map

})(document, window);


//Assigns unique ID to a clicked element based on element path and current state
var assignElementId = function(event){
	var elementPath = '';
	for(var element in event.path){
		elementPath += event.path[element].localName;
	}
	return (elementPath + event.currentState).hashCode();
}

//Hash function creates key out of string
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
