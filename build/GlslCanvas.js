(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GlslCanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":3}],2:[function(_dereq_,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],4:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":1,"trim":5}],5:[function(_dereq_,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],6:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var isFunction = _dereq_("is-function")
var parseHeaders = _dereq_("parse-headers")
var xtend = _dereq_("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}

},{"global/window":2,"is-function":3,"parse-headers":4,"xtend":7}],7:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     The MIT License (MIT)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Copyright (c) 2015 Patricio Gonzalez Vivo ( http://www.patriciogonzalezvivo.com )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Permission is hereby granted, free of charge, to any person obtaining a copy of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     this software and associated documentation files (the 'Software'), to deal in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     the Software without restriction, including without limitation the rights to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     the Software, and to permit persons to whom the Software is furnished to do so,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     subject to the following conditions:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     The above copyright notice and this permission notice shall be included in all
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _xhr = _dereq_('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _gl = _dereq_('./gl/gl');

var _Texture = _dereq_('./gl/Texture');

var _Texture2 = _interopRequireDefault(_Texture);

var _common = _dereq_('./tools/common');

var _mixin = _dereq_('./tools/mixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlslCanvas = function () {
    function GlslCanvas(canvas, options) {
        var _this = this;

        _classCallCheck(this, GlslCanvas);

        (0, _mixin.subscribeMixin)(this);

        options = options || {};

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        this.canvas = canvas;
        this.gl = undefined;
        this.program = undefined;
        this.textures = {};
        this.uniforms = {};
        this.vbo = {};
        this.isValid = false;

        this.vertexString = options.vertexString || '\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n    v_texcoord = a_texcoord;\n}\n';
        this.fragmentString = options.fragmentString || '\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texcoord;\n\nvoid main(){\n    gl_FragColor = vec4(0.0);\n}\n';

        // GL Context
        var gl = (0, _gl.setupWebGL)(canvas, options);
        if (!gl) {
            return;
        }
        this.gl = gl;
        this.timeLoad = this.timePrev = performance.now();
        this.timeDelta = 0.;
        this.forceRender = true;
        this.paused = false;

        // Allow alpha
        canvas.style.backgroundColor = options.backgroundColor || 'rgba(1,1,1,0)';

        // Load shader
        if (canvas.hasAttribute('data-fragment')) {
            this.fragmentString = canvas.getAttribute('data-fragment');
        } else if (canvas.hasAttribute('data-fragment-url')) {
            var source = canvas.getAttribute('data-fragment-url');
            _xhr2.default.get(source, function (error, response, body) {
                _this.load(body, _this.vertexString);
            });
        }

        // Load shader
        if (canvas.hasAttribute('data-vertex')) {
            this.vertexString = canvas.getAttribute('data-vertex');
        } else if (canvas.hasAttribute('data-vertex-url')) {
            var _source = canvas.getAttribute('data-vertex-url');
            _xhr2.default.get(_source, function (error, response, body) {
                _this.load(_this.fragmentString, body);
            });
        }

        this.load();

        if (!this.program) {
            return;
        }

        // Define Vertex buffer
        var texCoordsLoc = gl.getAttribLocation(this.program, 'a_texcoord');
        this.vbo.texCoords = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.texCoords);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(texCoordsLoc);
        this.gl.vertexAttribPointer(texCoordsLoc, 2, gl.FLOAT, false, 0, 0);

        var verticesLoc = gl.getAttribLocation(this.program, 'a_position');
        this.vbo.vertices = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.vertices);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(verticesLoc);
        this.gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);

        // load TEXTURES
        if (canvas.hasAttribute('data-textures')) {
            var imgList = canvas.getAttribute('data-textures').split(',');
            for (var nImg in imgList) {
                this.setUniform('u_tex' + nImg, imgList[nImg]);
            }
        }

        // ========================== EVENTS
        var mouse = {
            x: 0,
            y: 0
        };
        document.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
        }, false);

        var sandbox = this;
        function RenderLoop() {
            if (!sandbox.gl) {
                return;
            }
            if (sandbox.nMouse > 1) {
                sandbox.setMouse(mouse);
            }
            sandbox.render();
            sandbox.forceRender = sandbox.resize();
            window.requestAnimationFrame(RenderLoop);
        }

        // Start
        this.setMouse({ x: 0, y: 0 });
        RenderLoop();
        return this;
    }

    _createClass(GlslCanvas, [{
        key: 'destroy',
        value: function destroy() {
            this.animated = false;
            this.isValid = false;
            for (var tex in this.textures) {
                if (tex.destroy) {
                    tex.destroy();
                }
            }
            this.textures = {};
            for (var att in this.attribs) {
                this.gl.deleteBuffer(this.attribs[att]);
            }
            this.gl.useProgram(null);
            this.gl.deleteProgram(this.program);
            this.program = null;
            this.gl = null;
        }
    }, {
        key: 'load',
        value: function load(fragString, vertString) {
            // Load vertex shader if there is one
            if (vertString) {
                this.vertexString = vertString;
            }

            // Load fragment shader if there is one
            if (fragString) {
                this.fragmentString = fragString;
            }

            this.animated = false;
            this.nDelta = (this.fragmentString.match(/u_delta/g) || []).length;
            this.nTime = (this.fragmentString.match(/u_time/g) || []).length;
            this.nDate = (this.fragmentString.match(/u_date/g) || []).length;
            this.nMouse = (this.fragmentString.match(/u_mouse/g) || []).length;
            this.animated = this.nDate > 1 || this.nTime > 1 || this.nMouse > 1;

            var nTextures = this.fragmentString.search(/sampler2D/g);
            if (nTextures) {
                var lines = this.fragmentString.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var match = lines[i].match(/uniform\s*sampler2D\s*([\w]*);\s*\/\/\s*([\w|\:\/\/|\.|\-|\_]*)/i);
                    if (match) {
                        var ext = match[2].split('.').pop().toLowerCase();
                        if (match[1] && match[2] && (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'ogv' || ext === 'webm' || ext === 'mp4')) {
                            this.setUniform(match[1], match[2]);
                        }
                    }
                    var main = lines[i].match(/\s*void\s*main\s*/g);
                    if (main) {
                        break;
                    }
                }
            }

            var vertexShader = (0, _gl.createShader)(this, this.vertexString, this.gl.VERTEX_SHADER);
            var fragmentShader = (0, _gl.createShader)(this, this.fragmentString, this.gl.FRAGMENT_SHADER);

            // If Fragment shader fails load a empty one to sign the error
            if (!fragmentShader) {
                fragmentShader = (0, _gl.createShader)(this, 'void main(){\n\tgl_FragColor = vec4(1.0);\n}', this.gl.FRAGMENT_SHADER);
                this.isValid = false;
            } else {
                this.isValid = true;
            }

            // Create and use program
            var program = (0, _gl.createProgram)(this, [vertexShader, fragmentShader]); //, [0,1],['a_texcoord','a_position']);
            this.gl.useProgram(program);

            // Delete shaders
            // this.gl.detachShader(program, vertexShader);
            // this.gl.detachShader(program, fragmentShader);
            this.gl.deleteShader(vertexShader);
            this.gl.deleteShader(fragmentShader);

            this.program = program;
            this.change = true;

            // Trigger event
            this.trigger('load', {});

            this.forceRender = true;
        }
    }, {
        key: 'test',
        value: function test(callback, fragString, vertString) {
            // Thanks to @thespite for the help here
            // https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query/
            var pre_test_vert = this.vertexString;
            var pre_test_frag = this.fragmentString;
            var pre_test_paused = this.paused;

            var ext = this.gl.getExtension('EXT_disjoint_timer_query');
            var query = ext.createQueryEXT();
            var wasValid = this.isValid;

            if (fragString || vertString) {
                this.load(fragString, vertString);
                wasValid = this.isValid;
                this.forceRender = true;
                this.render();
            }

            this.paused = true;
            ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);
            this.forceRender = true;
            this.render();
            ext.endQueryEXT(ext.TIME_ELAPSED_EXT);

            var sandbox = this;
            function finishTest() {
                // Revert changes... go back to normal
                sandbox.paused = pre_test_paused;
                if (fragString || vertString) {
                    sandbox.load(pre_test_frag, pre_test_vert);
                }
            }
            function waitForTest() {
                sandbox.forceRender = true;
                sandbox.render();
                var available = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_AVAILABLE_EXT);
                var disjoint = sandbox.gl.getParameter(ext.GPU_DISJOINT_EXT);
                if (available && !disjoint) {
                    var ret = {
                        wasValid: wasValid,
                        frag: fragString || sandbox.fragmentString,
                        vert: vertString || sandbox.vertexString,
                        timeElapsedMs: ext.getQueryObjectEXT(query, ext.QUERY_RESULT_EXT) / 1000000.0
                    };
                    finishTest();
                    callback(ret);
                } else {
                    window.requestAnimationFrame(waitForTest);
                }
            }
            waitForTest();
        }
    }, {
        key: 'loadTexture',
        value: function loadTexture(name, urlElementOrData, options) {
            var _this2 = this;

            if (!options) {
                options = {};
            }

            if (typeof urlElementOrData === 'string') {
                options.url = urlElementOrData;
            } else if ((typeof urlElementOrData === 'undefined' ? 'undefined' : _typeof(urlElementOrData)) === 'object' && urlElementOrData.data && urlElementOrData.width && urlElementOrData.height) {
                options.data = urlElementOrData.data;
                options.width = urlElementOrData.width;
                options.height = urlElementOrData.height;
            } else if ((typeof urlElementOrData === 'undefined' ? 'undefined' : _typeof(urlElementOrData)) === 'object') {
                options.element = urlElementOrData;
            }

            if (this.textures[name]) {
                if (this.textures[name]) {
                    this.textures[name].load(options);
                    this.textures[name].on('loaded', function (args) {
                        _this2.forceRender = true;
                    });
                }
            } else {
                this.textures[name] = new _Texture2.default(this.gl, name, options);
                this.textures[name].on('loaded', function (args) {
                    _this2.forceRender = true;
                });
            }
        }
    }, {
        key: 'refreshUniforms',
        value: function refreshUniforms() {
            this.uniforms = {};
        }
    }, {
        key: 'setUniform',
        value: function setUniform(name) {
            var u = {};

            for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                value[_key - 1] = arguments[_key];
            }

            u[name] = value;
            this.setUniforms(u);
        }
    }, {
        key: 'setUniforms',
        value: function setUniforms(uniforms) {
            var parsed = (0, _gl.parseUniforms)(uniforms);
            // Set each uniform
            for (var u in parsed) {
                if (parsed[u].type === 'sampler2D') {
                    // For textures, we need to track texture units, so we have a special setter
                    // this.uniformTexture(parsed[u].name, parsed[u].value[0]);
                    this.loadTexture(parsed[u].name, parsed[u].value[0]);
                } else {
                    this.uniform(parsed[u].method, parsed[u].type, parsed[u].name, parsed[u].value);
                    this.forceRender = true;
                }
            }
        }
    }, {
        key: 'setMouse',
        value: function setMouse(mouse) {
            // set the mouse uniform
            var rect = this.canvas.getBoundingClientRect();
            if (mouse && mouse.x && mouse.x >= rect.left && mouse.x <= rect.right && mouse.y && mouse.y >= rect.top && mouse.y <= rect.bottom) {
                this.uniform('2f', 'vec2', 'u_mouse', mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
            }
        }

        // ex: program.uniform('3f', 'position', x, y, z);

    }, {
        key: 'uniform',
        value: function uniform(method, type, name) {
            // 'value' is a method-appropriate arguments list
            this.uniforms[name] = this.uniforms[name] || {};
            var uniform = this.uniforms[name];

            for (var _len2 = arguments.length, value = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                value[_key2 - 3] = arguments[_key2];
            }

            var change = (0, _common.isDiff)(uniform.value, value);
            if (change || this.change || uniform.location === undefined || uniform.value === undefined) {
                uniform.name = name;
                uniform.value = value;
                uniform.type = type;
                uniform.method = 'uniform' + method;
                uniform.location = this.gl.getUniformLocation(this.program, name);

                this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.value));
            }
        }
    }, {
        key: 'uniformTexture',
        value: function uniformTexture(name, texture, options) {
            if (this.textures[name] === undefined) {
                this.loadTexture(name, texture, options);
            } else {
                this.uniform('1i', 'sampler2D', name, this.texureIndex);
                this.textures[name].bind(this.texureIndex);
                this.uniform('2f', 'vec2', name + 'Resolution', this.textures[name].width, this.textures[name].height);
                this.texureIndex++;
            }
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (this.width !== this.canvas.clientWidth || this.height !== this.canvas.clientHeight) {
                var realToCSSPixels = window.devicePixelRatio || 1;

                // Lookup the size the browser is displaying the canvas in CSS pixels
                // and compute a size needed to make our drawingbuffer match it in
                // device pixels.
                var displayWidth = Math.floor(this.gl.canvas.clientWidth * realToCSSPixels);
                var displayHeight = Math.floor(this.gl.canvas.clientHeight * realToCSSPixels);

                // Check if the canvas is not the same size.
                if (this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight) {
                    // Make the canvas the same size
                    this.gl.canvas.width = displayWidth;
                    this.gl.canvas.height = displayHeight;
                    // Set the viewport to match
                    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
                    // this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                }
                this.width = this.canvas.clientWidth;
                this.height = this.canvas.clientHeight;
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.visible = (0, _common.isCanvasVisible)(this.canvas);
            if (this.forceRender || this.animated && this.visible && !this.paused) {

                var date = new Date();
                var now = performance.now();
                this.timeDelta = (now - this.timePrev) / 1000.0;
                this.timePrev = now;
                if (this.nDelta > 1) {
                    // set the delta time uniform
                    this.uniform('1f', 'float', 'u_delta', this.timeDelta);
                }

                if (this.nTime > 1) {
                    // set the elapsed time uniform
                    this.uniform('1f', 'float', 'u_time', (now - this.timeLoad) / 1000.0);
                }

                if (this.nDate) {
                    // Set date uniform: year/month/day/time_in_sec
                    this.uniform('4f', 'float', 'u_date', date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001);
                }

                // set the resolution uniform
                this.uniform('2f', 'vec2', 'u_resolution', this.canvas.width, this.canvas.height);

                this.texureIndex = 0;
                for (var tex in this.textures) {
                    this.uniformTexture(tex);
                }

                // Draw the rectangle.
                this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

                // Trigger event
                this.trigger('render', {});

                this.change = false;
                this.forceRender = false;
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.paused = true;
        }
    }, {
        key: 'play',
        value: function play() {
            this.paused = false;
        }
    }, {
        key: 'version',
        value: function version() {
            return '0.0.25';
        }
    }]);

    return GlslCanvas;
}();

exports.default = GlslCanvas;


window.GlslCanvas = GlslCanvas;

function loadAllGlslCanvas() {
    var list = document.getElementsByClassName('glslCanvas');
    if (list.length > 0) {
        window.glslCanvases = [];
        for (var i = 0; i < list.length; i++) {
            var sandbox = new GlslCanvas(list[i]);
            if (sandbox.isValid) {
                window.glslCanvases.push(sandbox);
            }
        }
    }
}

window.addEventListener('load', function () {
    loadAllGlslCanvas();
});

},{"./gl/Texture":9,"./gl/gl":10,"./tools/common":11,"./tools/mixin":12,"xhr":6}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Texture management


var _common = _dereq_('../tools/common');

var _mixin = _dereq_('../tools/mixin');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// GL texture wrapper object for keeping track of a global set of textures, keyed by a unique user-defined name
var Texture = function () {
    function Texture(gl, name) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Texture);

        (0, _mixin.subscribeMixin)(this);

        this.gl = gl;
        this.texture = gl.createTexture();
        if (this.texture) {
            this.valid = true;
        }
        this.bind();

        this.name = name;
        this.source = null;
        this.sourceType = null;
        this.loading = null; // a Promise object to track the loading state of this texture

        // Default to a 1-pixel black texture so we can safely render while we wait for an image to load
        // See: http://stackoverflow.com/questions/19722247/webgl-wait-for-texture-to-load
        this.setData(1, 1, new Uint8Array([0, 0, 0, 255]), { filtering: 'linear' });
        this.setFiltering(options.filtering);

        this.load(options);
    }

    // Destroy a single texture instance


    _createClass(Texture, [{
        key: 'destroy',
        value: function destroy() {
            if (!this.valid) {
                return;
            }
            this.gl.deleteTexture(this.texture);
            this.texture = null;
            delete this.data;
            this.data = null;
            this.valid = false;
        }
    }, {
        key: 'bind',
        value: function bind(unit) {
            if (!this.valid) {
                return;
            }
            if (typeof unit === 'number') {
                if (Texture.activeUnit !== unit) {
                    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
                    Texture.activeUnit = unit;
                }
            }
            if (Texture.activeTexture !== this.texture) {
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
                Texture.activeTexture = this.texture;
            }
        }
    }, {
        key: 'load',
        value: function load() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.loading = null;

            if (typeof options.url === 'string') {
                if (this.url === undefined || options.url !== this.url) {
                    this.setUrl(options.url, options);
                }
            } else if (options.element) {
                this.setElement(options.element, options);
            } else if (options.data && options.width && options.height) {
                this.setData(options.width, options.height, options.data, options);
            }
        }

        // Sets texture from an url

    }, {
        key: 'setUrl',
        value: function setUrl(url) {
            var _this = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!this.valid) {
                return;
            }

            this.url = url; // save URL reference (will be overwritten when element is loaded below)
            this.source = this.url;
            this.sourceType = 'url';

            this.loading = new Promise(function (resolve, reject) {
                var ext = url.split('.').pop().toLowerCase();
                var isVideo = ext === 'ogv' || ext === 'webm' || ext === 'mp4';

                var element = undefined;
                if (isVideo) {
                    element = document.createElement('video');
                    element.autoplay = true;
                    options.filtering = 'nearest';
                    // element.preload = 'auto';
                    // element.style.display = 'none';
                    // document.body.appendChild(element);
                } else {
                    element = new Image();
                }

                element.onload = function () {
                    try {
                        _this.setElement(element, options);
                    } catch (e) {
                        console.log('Texture \'' + _this.name + '\': failed to load url: \'' + _this.source + '\'', e, options);
                    }
                    resolve(_this);
                };
                element.onerror = function (e) {
                    // Warn and resolve on error
                    console.log('Texture \'' + _this.name + '\': failed to load url: \'' + _this.source + '\'', e, options);
                    resolve(_this);
                };

                // Safari has a bug loading data-URL elements with CORS enabled, so it must be disabled in that case
                // https://bugs.webkit.org/show_bug.cgi?id=123978
                if (!((0, _common.isSafari)() && _this.source.slice(0, 5) === 'data:')) {
                    element.crossOrigin = 'anonymous';
                }

                element.src = _this.source;
                if (isVideo) {
                    _this.setElement(element, options);
                }
            });
            return this.loading;
        }

        // Sets texture to a raw image buffer

    }, {
        key: 'setData',
        value: function setData(width, height, data) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            this.width = width;
            this.height = height;

            this.source = data;
            this.sourceType = 'data';

            this.update(options);
            this.setFiltering(options);

            this.loading = Promise.resolve(this);
            return this.loading;
        }

        // Sets the texture to track a element (canvas/image)

    }, {
        key: 'setElement',
        value: function setElement(element, options) {
            var _this2 = this;

            var el = element;

            // a string element is interpeted as a CSS selector
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }

            if (element instanceof HTMLCanvasElement || element instanceof HTMLImageElement || element instanceof HTMLVideoElement) {
                this.source = element;
                this.sourceType = 'element';

                if (element instanceof HTMLVideoElement) {
                    element.addEventListener('canplaythrough', function () {
                        _this2.intervalID = setInterval(function () {
                            _this2.update(options);
                        }, 15);
                    }, true);
                    element.addEventListener('ended', function () {
                        element.currentTime = 0;
                        element.play();
                    }, true);
                } else {
                    this.update(options);
                }
                this.setFiltering(options);
            } else {
                var msg = 'the \'element\' parameter (`element: ' + JSON.stringify(el) + '`) must be a CSS ';
                msg += 'selector string, or a <canvas>, <image> or <video> object';
                console.log('Texture \'' + this.name + '\': ' + msg, options);
            }

            this.loading = Promise.resolve(this);
            return this.loading;
        }

        // Uploads current image or buffer to the GPU (can be used to update animated textures on the fly)

    }, {
        key: 'update',
        value: function update() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!this.valid) {
                return;
            }

            this.bind();
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, options.UNPACK_FLIP_Y_WEBGL === false ? false : true);
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.UNPACK_PREMULTIPLY_ALPHA_WEBGL || false);

            // Image or Canvas element
            if (this.sourceType === 'element' && (this.source instanceof HTMLCanvasElement || this.source instanceof HTMLVideoElement || this.source instanceof HTMLImageElement && this.source.complete)) {
                if (this.source instanceof HTMLVideoElement) {
                    this.width = this.source.videoWidth;
                    this.height = this.source.videoHeight;
                } else {
                    this.width = this.source.width;
                    this.height = this.source.height;
                }
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
            }
            // Raw image buffer
            else if (this.sourceType === 'data') {
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
                }
            this.trigger('loaded', this);
        }

        // Determines appropriate filtering mode

    }, {
        key: 'setFiltering',
        value: function setFiltering() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!this.valid) {
                return;
            }

            this.powerOf2 = (0, _common.isPowerOf2)(this.width) && (0, _common.isPowerOf2)(this.height);
            var defualtFilter = this.powerOf2 ? 'mipmap' : 'linear';
            this.filtering = options.filtering || defualtFilter;

            var gl = this.gl;
            this.bind();

            // For power-of-2 textures, the following presets are available:
            // mipmap: linear blend from nearest mip
            // linear: linear blend from original image (no mips)
            // nearest: nearest pixel from original image (no mips, 'blocky' look)
            if (this.powerOf2) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.TEXTURE_WRAP_S || options.repeat && gl.REPEAT || gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.TEXTURE_WRAP_T || options.repeat && gl.REPEAT || gl.CLAMP_TO_EDGE);

                if (this.filtering === 'mipmap') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); // TODO: use trilinear filtering by defualt instead?
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else if (this.filtering === 'linear') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                } else if (this.filtering === 'nearest') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                }
            } else {
                // WebGL has strict requirements on non-power-of-2 textures:
                // No mipmaps and must clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                if (this.filtering === 'mipmap') {
                    this.filtering = 'linear';
                }

                if (this.filtering === 'nearest') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                } else {
                    // default to linear for non-power-of-2 textures
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                }
            }
        }
    }]);

    return Texture;
}();

// Report max texture size for a GL context


exports.default = Texture;
Texture.getMaxTextureSize = function (gl) {
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
};

// Global set of textures, by name
Texture.activeUnit = -1;

},{"../tools/common":11,"../tools/mixin":12}],10:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setupWebGL = setupWebGL;
exports.create3DContext = create3DContext;
exports.createShader = createShader;
exports.createProgram = createProgram;
exports.parseUniforms = parseUniforms;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lastError = '';

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
function makeFailHTML(msg) {
    return '\n<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>\n<td align="center">\n<div style="display: table-cell; vertical-align: middle;">\n<div style="">' + msg + '</div>\n</div>\n</td></tr></table>\n';
}

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '\n\tThis page requires a browser that supports WebGL.<br/>\n\t<a href="http://get.webgl.org">Click here to upgrade your browser.</a>\n';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '\n\tIt does not appear your computer can support WebGL.<br/>\n\t<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>\n';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} optAttribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
function setupWebGL(canvas, optAttribs) {
    function showLink(str) {
        var container = canvas.parentNode;
        if (container) {
            container.innerHTML = makeFailHTML(str);
        }
    }

    if (!window.WebGLRenderingContext) {
        showLink(GET_A_WEBGL_BROWSER);
        return null;
    }

    var context = create3DContext(canvas, optAttribs);
    if (!context) {
        showLink(OTHER_PROBLEM);
    }
    context.getExtension('OES_standard_derivatives');
    return context;
}

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
function create3DContext(canvas, optAttribs) {
    var names = ['webgl', 'experimental-webgl'];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], optAttribs);
        } catch (e) {
            if (context) {
                break;
            }
        }
    }
    return context;
}

/*
 *	Create a Vertex of a specific type (gl.VERTEX_SHADER/)
 */
function createShader(main, source, type) {
    var gl = main.gl;

    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
        // Something went wrong during compilation; get the error
        lastError = gl.getShaderInfoLog(shader);
        console.error('*** Error compiling shader ' + shader + ':' + lastError);
        main.trigger('error', { shader: shader, source: source, type: type, error: lastError });
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * Loads a shader.
 * @param {!WebGLContext} gl The WebGLContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
 */
function createProgram(main, shaders, optAttribs, optLocations) {
    var gl = main.gl;

    var program = gl.createProgram();
    for (var ii = 0; ii < shaders.length; ++ii) {
        gl.attachShader(program, shaders[ii]);
    }
    if (optAttribs) {
        for (var _ii = 0; _ii < optAttribs.length; ++_ii) {
            gl.bindAttribLocation(program, optLocations ? optLocations[_ii] : _ii, optAttribs[_ii]);
        }
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        lastError = gl.getProgramInfoLog(program);
        console.log('Error in program linking:' + lastError);
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

// By Brett Camber on
// https://github.com/tangrams/tangram/blob/master/src/gl/glsl.js
function parseUniforms(uniforms) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var parsed = [];

    for (var name in uniforms) {
        var uniform = uniforms[name];
        var u = void 0;

        if (prefix) {
            name = prefix + '.' + name;
        }

        // Single float
        if (typeof uniform === 'number') {
            parsed.push({
                type: 'float',
                method: '1f',
                name: name,
                value: uniform
            });
        }
        // Array: vector, array of floats, array of textures, or array of structs
        else if (Array.isArray(uniform)) {
                // Numeric values
                if (typeof uniform[0] === 'number') {
                    // float vectors (vec2, vec3, vec4)
                    if (uniform.length === 1) {
                        parsed.push({
                            type: 'float',
                            method: '1f',
                            name: name,
                            value: uniform
                        });
                    }
                    // float vectors (vec2, vec3, vec4)
                    else if (uniform.length >= 2 && uniform.length <= 4) {
                            parsed.push({
                                type: 'vec' + uniform.length,
                                method: uniform.length + 'fv',
                                name: name,
                                value: uniform
                            });
                        }
                        // float array
                        else if (uniform.length > 4) {
                                parsed.push({
                                    type: 'float[]',
                                    method: '1fv',
                                    name: name + '[0]',
                                    value: uniform
                                });
                            }
                    // TODO: assume matrix for (typeof == Float32Array && length == 16)?
                }
                // Array of textures
                else if (typeof uniform[0] === 'string') {
                        parsed.push({
                            type: 'sampler2D',
                            method: '1i',
                            name: name,
                            value: uniform
                        });
                    }
                    // Array of arrays - but only arrays of vectors are allowed in this case
                    else if (Array.isArray(uniform[0]) && typeof uniform[0][0] === 'number') {
                            // float vectors (vec2, vec3, vec4)
                            if (uniform[0].length >= 2 && uniform[0].length <= 4) {
                                // Set each vector in the array
                                for (u = 0; u < uniform.length; u++) {
                                    parsed.push({
                                        type: 'vec' + uniform[0].length,
                                        method: uniform[u].length + 'fv',
                                        name: name + '[' + u + ']',
                                        value: uniform[u]
                                    });
                                }
                            }
                            // else error?
                        }
                        // Array of structures
                        else if (_typeof(uniform[0]) === 'object') {
                                for (u = 0; u < uniform.length; u++) {
                                    // Set each struct in the array
                                    parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform[u], name + '[' + u + ']')));
                                }
                            }
            }
            // Boolean
            else if (typeof uniform === 'boolean') {
                    parsed.push({
                        type: 'bool',
                        method: '1i',
                        name: name,
                        value: uniform
                    });
                }
                // Texture
                else if (typeof uniform === 'string') {
                        parsed.push({
                            type: 'sampler2D',
                            method: '1i',
                            name: name,
                            value: uniform
                        });
                    }
                    // Structure
                    else if ((typeof uniform === 'undefined' ? 'undefined' : _typeof(uniform)) === 'object') {
                            // Set each field in the struct
                            parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform, name)));
                        }
        // TODO: support other non-float types? (int, etc.)
    }
    return parsed;
}

},{}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isCanvasVisible = isCanvasVisible;
exports.isPowerOf2 = isPowerOf2;
exports.isSafari = isSafari;
exports.nextHighestPowerOfTwo = nextHighestPowerOfTwo;
exports.FormatNumberLength = FormatNumberLength;
exports.getMousePos = getMousePos;
exports.isDiff = isDiff;
exports.subscribeMixin = subscribeMixin;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isCanvasVisible(canvas) {
    return canvas.getBoundingClientRect().top + canvas.height > 0 && canvas.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight);
}

function isPowerOf2(value) {
    return (value & value - 1) === 0;
}

function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
};

function nextHighestPowerOfTwo(x) {
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x = x | x >> i;
    }
    return x + 1;
}

function FormatNumberLength(num, length) {
    var r = num.toString();
    while (r.length < length) {
        r = '0' + r;
    }
    return r;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isDiff(a, b) {
    if (a && b) {
        return a.toString() !== b.toString();
    }
    return false;
}

function subscribeMixin(target) {
    var listeners = new Set();

    return Object.assign(target, {
        subscribe: function subscribe(listener) {
            listeners.add(listener);
        },
        on: function on(type, f) {
            var listener = {};
            listener[type] = f;
            listeners.add(listener);
        },
        unsubscribe: function unsubscribe(listener) {
            listeners.delete(listener);
        },
        unsubscribeAll: function unsubscribeAll() {
            listeners.clear();
        },
        trigger: function trigger(event) {
            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listener = _step.value;

                    if (typeof listener[event] === 'function') {
                        listener[event].apply(listener, _toConsumableArray(data));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    });
}

},{}],12:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subscribeMixin = subscribeMixin;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function subscribeMixin(target) {
    var listeners = new Set();

    return Object.assign(target, {
        on: function on(type, f) {
            var listener = {};
            listener[type] = f;
            listeners.add(listener);
        },
        off: function off(type, f) {
            if (f) {
                var listener = {};
                listener[type] = f;
                listeners.delete(listener);
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = Object.keys(item)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var key = _step2.value;

                                if (key === type) {
                                    listeners.delete(item);
                                    return;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        listSubscriptions: function listSubscriptions() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = listeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    console.log(item);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        },
        subscribe: function subscribe(listener) {
            listeners.add(listener);
        },
        unsubscribe: function unsubscribe(listener) {
            listeners.delete(listener);
        },
        unsubscribeAll: function unsubscribeAll() {
            listeners.clear();
        },
        trigger: function trigger(event) {
            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = listeners[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var listener = _step4.value;

                    if (typeof listener[event] === 'function') {
                        listener[event].apply(listener, _toConsumableArray(data));
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    });
}

},{}]},{},[8])(8)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9pcy1mdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvdHJpbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwic3JjL0dsc2xDYW52YXMuanMiLCJzcmMvZ2wvVGV4dHVyZS5qcyIsInNyYy9nbC9nbC5qcyIsInNyYy90b29scy9jb21tb24uanMiLCJzcmMvdG9vbHMvbWl4aW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q3ZDLGlDQUFTLEtBQVQscUNBQW1CLElBQW5CO0FBQ0g7QUFDSjtBQUxtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXZCO0FBbER3QixLQUF0QixDQUFQO0FBb0RIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnaXMtZnVuY3Rpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2hcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBjb250ZXh0ID0gdGhpc1xuICAgIH1cbiAgICBcbiAgICBpZiAodG9TdHJpbmcuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJylcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJylcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlXG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG59XG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIGFycmF5W2ldLCBpLCBhcnJheSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9iamVjdFtrXSwgaywgb2JqZWN0KVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb25cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChmbikge1xuICB2YXIgc3RyaW5nID0gdG9TdHJpbmcuY2FsbChmbilcbiAgcmV0dXJuIHN0cmluZyA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJyB8fFxuICAgICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgc3RyaW5nICE9PSAnW29iamVjdCBSZWdFeHBdJykgfHxcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgLy8gSUU4IGFuZCBiZWxvd1xuICAgICAoZm4gPT09IHdpbmRvdy5zZXRUaW1lb3V0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmFsZXJ0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmNvbmZpcm0gfHxcbiAgICAgIGZuID09PSB3aW5kb3cucHJvbXB0KSlcbn07XG4iLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJ3RyaW0nKVxuICAsIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpXG4gICwgaXNBcnJheSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICBpZiAoIWhlYWRlcnMpXG4gICAgcmV0dXJuIHt9XG5cbiAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgZm9yRWFjaChcbiAgICAgIHRyaW0oaGVhZGVycykuc3BsaXQoJ1xcbicpXG4gICAgLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHZhciBpbmRleCA9IHJvdy5pbmRleE9mKCc6JylcbiAgICAgICAgICAsIGtleSA9IHRyaW0ocm93LnNsaWNlKDAsIGluZGV4KSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICwgdmFsdWUgPSB0cmltKHJvdy5zbGljZShpbmRleCArIDEpKVxuXG4gICAgICAgIGlmICh0eXBlb2YocmVzdWx0W2tleV0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHJlc3VsdFtrZXldKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBbIHJlc3VsdFtrZXldLCB2YWx1ZSBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgKVxuXG4gIHJldHVybiByZXN1bHRcbn0iLCJcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHRyaW07XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG5cbmV4cG9ydHMubGVmdCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJyk7XG59O1xuXG5leHBvcnRzLnJpZ2h0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB3aW5kb3cgPSByZXF1aXJlKFwiZ2xvYmFsL3dpbmRvd1wiKVxudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiaXMtZnVuY3Rpb25cIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxudmFyIHh0ZW5kID0gcmVxdWlyZShcInh0ZW5kXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlWEhSXG5jcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgfHwgbm9vcFxuY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0ID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpKSA/IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5mb3JFYWNoQXJyYXkoW1wiZ2V0XCIsIFwicHV0XCIsIFwicG9zdFwiLCBcInBhdGNoXCIsIFwiaGVhZFwiLCBcImRlbGV0ZVwiXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY3JlYXRlWEhSW21ldGhvZCA9PT0gXCJkZWxldGVcIiA/IFwiZGVsXCIgOiBtZXRob2RdID0gZnVuY3Rpb24odXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG4gICAgfVxufSlcblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvcikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iail7XG4gICAgZm9yKHZhciBpIGluIG9iail7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBwYXJhbXMgPSB1cmlcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zID0ge3VyaTp1cml9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSB4dGVuZChvcHRpb25zLCB7dXJpOiB1cml9KVxuICAgIH1cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHBhcmFtc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIodXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVhIUihvcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBhcmd1bWVudCBtaXNzaW5nXCIpXG4gICAgfVxuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2JPbmNlKGVyciwgcmVzcG9uc2UsIGJvZHkpe1xuICAgICAgICBpZighY2FsbGVkKXtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWVcbiAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXJyLCByZXNwb25zZSwgYm9keSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChsb2FkRnVuYywgMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCB8fCBnZXRYbWwoeGhyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JGdW5jKGV2dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZighKGV2dCBpbnN0YW5jZW9mIEVycm9yKSl7XG4gICAgICAgICAgICBldnQgPSBuZXcgRXJyb3IoXCJcIiArIChldnQgfHwgXCJVbmtub3duIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpIClcbiAgICAgICAgfVxuICAgICAgICBldnQuc3RhdHVzQ29kZSA9IDBcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgIH1cblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlcbiAgICB2YXIgYWJvcnRlZFxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGFcbiAgICB2YXIgaGVhZGVycyA9IHhoci5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9XG4gICAgdmFyIHN5bmMgPSAhIW9wdGlvbnMuc3luY1xuICAgIHZhciBpc0pzb24gPSBmYWxzZVxuICAgIHZhciB0aW1lb3V0VGltZXJcbiAgICB2YXIgZmFpbHVyZVJlc3BvbnNlID0ge1xuICAgICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICBzdGF0dXNDb2RlOiAwLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgdXJsOiB1cmksXG4gICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgIH1cblxuICAgIGlmIChcImpzb25cIiBpbiBvcHRpb25zICYmIG9wdGlvbnMuanNvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgaXNKc29uID0gdHJ1ZVxuICAgICAgICBoZWFkZXJzW1wiYWNjZXB0XCJdIHx8IGhlYWRlcnNbXCJBY2NlcHRcIl0gfHwgKGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gXCJHRVRcIiAmJiBtZXRob2QgIT09IFwiSEVBRFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdIHx8IGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gfHwgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmpzb24gPT09IHRydWUgPyBib2R5IDogb3B0aW9ucy5qc29uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlYWR5c3RhdGVjaGFuZ2VcbiAgICB4aHIub25sb2FkID0gbG9hZEZ1bmNcbiAgICB4aHIub25lcnJvciA9IGVycm9yRnVuY1xuICAgIC8vIElFOSBtdXN0IGhhdmUgb25wcm9ncmVzcyBiZSBzZXQgdG8gYSB1bmlxdWUgZnVuY3Rpb24uXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIElFIG11c3QgZGllXG4gICAgfVxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgfVxuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckZ1bmNcbiAgICB4aHIub3BlbihtZXRob2QsIHVyaSwgIXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQpXG4gICAgLy9oYXMgdG8gYmUgYWZ0ZXIgb3BlblxuICAgIGlmKCFzeW5jKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gICAgfVxuICAgIC8vIENhbm5vdCBzZXQgdGltZW91dCB3aXRoIHN5bmMgcmVxdWVzdFxuICAgIC8vIG5vdCBzZXR0aW5nIHRpbWVvdXQgb24gdGhlIHhociBvYmplY3QsIGJlY2F1c2Ugb2Ygb2xkIHdlYmtpdHMgZXRjLiBub3QgaGFuZGxpbmcgdGhhdCBjb3JyZWN0bHlcbiAgICAvLyBib3RoIG5wbSdzIHJlcXVlc3QgYW5kIGpxdWVyeSAxLnggdXNlIHRoaXMga2luZCBvZiB0aW1lb3V0LCBzbyB0aGlzIGlzIGJlaW5nIGNvbnNpc3RlbnRcbiAgICBpZiAoIXN5bmMgJiYgb3B0aW9ucy50aW1lb3V0ID4gMCApIHtcbiAgICAgICAgdGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICAgICAgYWJvcnRlZCA9IHRydWUvL0lFOSBtYXkgc3RpbGwgY2FsbCByZWFkeXN0YXRlY2hhbmdlXG4gICAgICAgICAgICB4aHIuYWJvcnQoXCJ0aW1lb3V0XCIpXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihcIlhNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcIilcbiAgICAgICAgICAgIGUuY29kZSA9IFwiRVRJTUVET1VUXCJcbiAgICAgICAgICAgIGVycm9yRnVuYyhlKVxuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQgKVxuICAgIH1cblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICBmb3Ioa2V5IGluIGhlYWRlcnMpe1xuICAgICAgICAgICAgaWYoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWFkZXJzICYmICFpc0VtcHR5KG9wdGlvbnMuaGVhZGVycykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuXG4gICAgaWYgKFwiYmVmb3JlU2VuZFwiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2VuZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpXG4gICAgfVxuXG4gICAgLy8gTWljcm9zb2Z0IEVkZ2UgYnJvd3NlciBzZW5kcyBcInVuZGVmaW5lZFwiIHdoZW4gc2VuZCBpcyBjYWxsZWQgd2l0aCB1bmRlZmluZWQgdmFsdWUuXG4gICAgLy8gWE1MSHR0cFJlcXVlc3Qgc3BlYyBzYXlzIHRvIHBhc3MgbnVsbCBhcyBib2R5IHRvIGluZGljYXRlIG5vIGJvZHlcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25hdWd0dXIveGhyL2lzc3Vlcy8xMDAuXG4gICAgeGhyLnNlbmQoYm9keSB8fCBudWxsKVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIC8vIHhoci5yZXNwb25zZVhNTCB3aWxsIHRocm93IEV4Y2VwdGlvbiBcIkludmFsaWRTdGF0ZUVycm9yXCIgb3IgXCJET01FeGNlcHRpb25cIlxuICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvcmVzcG9uc2VYTUwuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJlZm94QnVnVGFrZW5FZmZlY3QgPSB4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gXCJwYXJzZXJlcnJvclwiXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiICYmICFmaXJlZm94QnVnVGFrZW5FZmZlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBQYXRyaWNpbyBHb256YWxleiBWaXZvICggaHR0cDovL3d3dy5wYXRyaWNpb2dvbnphbGV6dml2by5jb20gKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG8gZGVhbCBpblxudGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xudXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2ZcbnRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbnN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG5DT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbklOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG5DT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHhociBmcm9tICd4aHInO1xuXG5pbXBvcnQgeyBzZXR1cFdlYkdMLCBjcmVhdGVTaGFkZXIsIGNyZWF0ZVByb2dyYW0sIHBhcnNlVW5pZm9ybXMsIGxvYWRUZXh0dXJlIH0gZnJvbSAnLi9nbC9nbCc7XG5pbXBvcnQgVGV4dHVyZSBmcm9tICcuL2dsL1RleHR1cmUnO1xuXG5pbXBvcnQgeyBpc0NhbnZhc1Zpc2libGUsIGlzRGlmZiB9IGZyb20gJy4vdG9vbHMvY29tbW9uJztcbmltcG9ydCB7IHN1YnNjcmliZU1peGluIH0gZnJvbSAnLi90b29scy9taXhpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsc2xDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgb3B0aW9ucykge1xuICAgICAgICBzdWJzY3JpYmVNaXhpbih0aGlzKTtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuZ2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuICAgICAgICB0aGlzLnVuaWZvcm1zID0ge307XG4gICAgICAgIHRoaXMudmJvID0ge307XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudmVydGV4U3RyaW5nID0gb3B0aW9ucy52ZXJ0ZXhTdHJpbmcgfHwgYFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxuXG5hdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xuYXR0cmlidXRlIHZlYzIgYV90ZXhjb29yZDtcblxudmFyeWluZyB2ZWMyIHZfdGV4Y29vcmQ7XG5cbnZvaWQgbWFpbigpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoYV9wb3NpdGlvbiwgMC4wLCAxLjApO1xuICAgIHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xufVxuYDtcbiAgICAgICAgdGhpcy5mcmFnbWVudFN0cmluZyA9IG9wdGlvbnMuZnJhZ21lbnRTdHJpbmcgfHwgYFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxuXG52YXJ5aW5nIHZlYzIgdl90ZXhjb29yZDtcblxudm9pZCBtYWluKCl7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjApO1xufVxuYDtcblxuICAgICAgICAvLyBHTCBDb250ZXh0XG4gICAgICAgIGxldCBnbCA9IHNldHVwV2ViR0woY2FudmFzLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFnbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy50aW1lTG9hZCA9IHRoaXMudGltZVByZXYgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy50aW1lRGVsdGEgPSAwLjtcbiAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQWxsb3cgYWxwaGFcbiAgICAgICAgY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yIHx8ICdyZ2JhKDEsMSwxLDApJztcblxuICAgICAgICAvLyBMb2FkIHNoYWRlclxuICAgICAgICBpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudCcpKSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50U3RyaW5nID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtdXJsJykpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBjYW52YXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LXVybCcpO1xuICAgICAgICAgICAgeGhyLmdldChzb3VyY2UsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoYm9keSwgdGhpcy52ZXJ0ZXhTdHJpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2FkIHNoYWRlclxuICAgICAgICBpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS12ZXJ0ZXgnKSkge1xuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhTdHJpbmcgPSBjYW52YXMuZ2V0QXR0cmlidXRlKCdkYXRhLXZlcnRleCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmVydGV4LXVybCcpKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS12ZXJ0ZXgtdXJsJyk7XG4gICAgICAgICAgICB4aHIuZ2V0KHNvdXJjZSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCh0aGlzLmZyYWdtZW50U3RyaW5nLCBib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmluZSBWZXJ0ZXggYnVmZmVyXG4gICAgICAgIGxldCB0ZXhDb29yZHNMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sICdhX3RleGNvb3JkJyk7XG4gICAgICAgIHRoaXMudmJvLnRleENvb3JkcyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZiby50ZXhDb29yZHMpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhDb29yZHNMb2MpO1xuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4Q29vcmRzTG9jLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgICAgIGxldCB2ZXJ0aWNlc0xvYyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ2FfcG9zaXRpb24nKTtcbiAgICAgICAgdGhpcy52Ym8udmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52Ym8udmVydGljZXMpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFstMS4wLCAtMS4wLCAxLjAsIC0xLjAsIC0xLjAsIDEuMCwgLTEuMCwgMS4wLCAxLjAsIC0xLjAsIDEuMCwgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZXJ0aWNlc0xvYyk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0aWNlc0xvYywgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgICAgICAvLyBsb2FkIFRFWFRVUkVTXG4gICAgICAgIGlmIChjYW52YXMuaGFzQXR0cmlidXRlKCdkYXRhLXRleHR1cmVzJykpIHtcbiAgICAgICAgICAgIGxldCBpbWdMaXN0ID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBuSW1nIGluIGltZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVuaWZvcm0oJ3VfdGV4JyArIG5JbWcsIGltZ0xpc3RbbkltZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT0gRVZFTlRTXG4gICAgICAgIGxldCBtb3VzZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYIHx8IGUucGFnZVg7XG4gICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIHx8IGUucGFnZVk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBsZXQgc2FuZGJveCA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIFJlbmRlckxvb3AoKSB7XG4gICAgICAgICAgICBpZiAoIXNhbmRib3guZ2wpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzYW5kYm94Lm5Nb3VzZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzYW5kYm94LnNldE1vdXNlKG1vdXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNhbmRib3gucmVuZGVyKCk7XG4gICAgICAgICAgICBzYW5kYm94LmZvcmNlUmVuZGVyID0gc2FuZGJveC5yZXNpemUoKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoUmVuZGVyTG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydFxuICAgICAgICB0aGlzLnNldE1vdXNlKHsgeDogMCwgeTogMCB9KTtcbiAgICAgICAgUmVuZGVyTG9vcCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmFuaW1hdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCB0ZXggaW4gdGhpcy50ZXh0dXJlcykge1xuICAgICAgICAgICAgaWYgKHRleC5kZXN0cm95KXtcbiAgICAgICAgICAgICAgICB0ZXguZGVzdHJveSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBhdHQgaW4gdGhpcy5hdHRyaWJzKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZUJ1ZmZlcih0aGlzLmF0dHJpYnNbYXR0XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKG51bGwpO1xuICAgICAgICB0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgdGhpcy5nbCA9IG51bGw7XG4gICAgfVxuXG4gICAgbG9hZCAoZnJhZ1N0cmluZywgdmVydFN0cmluZykge1xuICAgICAgICAvLyBMb2FkIHZlcnRleCBzaGFkZXIgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGlmICh2ZXJ0U3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRleFN0cmluZyA9IHZlcnRTdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2FkIGZyYWdtZW50IHNoYWRlciBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgaWYgKGZyYWdTdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRTdHJpbmcgPSBmcmFnU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5EZWx0YSA9ICh0aGlzLmZyYWdtZW50U3RyaW5nLm1hdGNoKC91X2RlbHRhL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMublRpbWUgPSAodGhpcy5mcmFnbWVudFN0cmluZy5tYXRjaCgvdV90aW1lL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubkRhdGUgPSAodGhpcy5mcmFnbWVudFN0cmluZy5tYXRjaCgvdV9kYXRlL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubk1vdXNlID0gKHRoaXMuZnJhZ21lbnRTdHJpbmcubWF0Y2goL3VfbW91c2UvZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgdGhpcy5hbmltYXRlZCA9IHRoaXMubkRhdGUgPiAxIHx8IHRoaXMublRpbWUgPiAxIHx8IHRoaXMubk1vdXNlID4gMTtcblxuICAgICAgICBsZXQgblRleHR1cmVzID0gdGhpcy5mcmFnbWVudFN0cmluZy5zZWFyY2goL3NhbXBsZXIyRC9nKTtcbiAgICAgICAgaWYgKG5UZXh0dXJlcykge1xuICAgICAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5mcmFnbWVudFN0cmluZy5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gbGluZXNbaV0ubWF0Y2goL3VuaWZvcm1cXHMqc2FtcGxlcjJEXFxzKihbXFx3XSopO1xccypcXC9cXC9cXHMqKFtcXHd8XFw6XFwvXFwvfFxcLnxcXC18XFxfXSopL2kpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ID0gbWF0Y2hbMl0uc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gJiYgIG1hdGNoWzJdICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgKGV4dCA9PT0gJ2pwZycgfHwgZXh0ID09PSAnanBlZycgfHwgZXh0ID09PSAncG5nJyB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICBleHQgPT09ICdvZ3YnIHx8IGV4dCA9PT0gJ3dlYm0nIHx8IGV4dCA9PT0gJ21wNCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFVuaWZvcm0obWF0Y2hbMV0sIG1hdGNoWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWFpbiA9IGxpbmVzW2ldLm1hdGNoKC9cXHMqdm9pZFxccyptYWluXFxzKi9nKTtcbiAgICAgICAgICAgICAgICBpZiAobWFpbikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKHRoaXMsIHRoaXMudmVydGV4U3RyaW5nLCB0aGlzLmdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgICBsZXQgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcywgdGhpcy5mcmFnbWVudFN0cmluZywgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgICAgIC8vIElmIEZyYWdtZW50IHNoYWRlciBmYWlscyBsb2FkIGEgZW1wdHkgb25lIHRvIHNpZ24gdGhlIGVycm9yXG4gICAgICAgIGlmICghZnJhZ21lbnRTaGFkZXIpIHtcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKHRoaXMsICd2b2lkIG1haW4oKXtcXG5cXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCk7XFxufScsIHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgdXNlIHByb2dyYW1cbiAgICAgICAgbGV0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKHRoaXMsIFt2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyXSk7Ly8sIFswLDFdLFsnYV90ZXhjb29yZCcsJ2FfcG9zaXRpb24nXSk7XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgICAgICAvLyBEZWxldGUgc2hhZGVyc1xuICAgICAgICAvLyB0aGlzLmdsLmRldGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICAvLyB0aGlzLmdsLmRldGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcblxuICAgICAgICB0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB0aGlzLmNoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2xvYWQnLCB7fSk7XG5cbiAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgfVxuXG4gICAgdGVzdCAoY2FsbGJhY2ssIGZyYWdTdHJpbmcsIHZlcnRTdHJpbmcpIHtcbiAgICAgICAgLy8gVGhhbmtzIHRvIEB0aGVzcGl0ZSBmb3IgdGhlIGhlbHAgaGVyZVxuICAgICAgICAvLyBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9leHRlbnNpb25zL0VYVF9kaXNqb2ludF90aW1lcl9xdWVyeS9cbiAgICAgICAgbGV0IHByZV90ZXN0X3ZlcnQgPSB0aGlzLnZlcnRleFN0cmluZztcbiAgICAgICAgbGV0IHByZV90ZXN0X2ZyYWcgPSB0aGlzLmZyYWdtZW50U3RyaW5nO1xuICAgICAgICBsZXQgcHJlX3Rlc3RfcGF1c2VkID0gdGhpcy5wYXVzZWQ7XG5cbiAgICAgICAgbGV0IGV4dCA9IHRoaXMuZ2wuZ2V0RXh0ZW5zaW9uKCdFWFRfZGlzam9pbnRfdGltZXJfcXVlcnknKTtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZXh0LmNyZWF0ZVF1ZXJ5RVhUKCk7XG4gICAgICAgIGxldCB3YXNWYWxpZCA9IHRoaXMuaXNWYWxpZDtcblxuICAgICAgICBpZiAoZnJhZ1N0cmluZyB8fCB2ZXJ0U3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQoZnJhZ1N0cmluZywgdmVydFN0cmluZyk7XG4gICAgICAgICAgICB3YXNWYWxpZCA9IHRoaXMuaXNWYWxpZDtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgZXh0LmJlZ2luUXVlcnlFWFQoZXh0LlRJTUVfRUxBUFNFRF9FWFQsIHF1ZXJ5KTtcbiAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIGV4dC5lbmRRdWVyeUVYVChleHQuVElNRV9FTEFQU0VEX0VYVCk7XG5cbiAgICAgICAgbGV0IHNhbmRib3ggPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBmaW5pc2hUZXN0KCkge1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IGNoYW5nZXMuLi4gZ28gYmFjayB0byBub3JtYWxcbiAgICAgICAgICAgIHNhbmRib3gucGF1c2VkID0gcHJlX3Rlc3RfcGF1c2VkO1xuICAgICAgICAgICAgaWYgKGZyYWdTdHJpbmcgfHwgdmVydFN0cmluZykge1xuICAgICAgICAgICAgICAgIHNhbmRib3gubG9hZChwcmVfdGVzdF9mcmFnLCBwcmVfdGVzdF92ZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3YWl0Rm9yVGVzdCgpIHtcbiAgICAgICAgICAgIHNhbmRib3guZm9yY2VSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2FuZGJveC5yZW5kZXIoKTtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBleHQuZ2V0UXVlcnlPYmplY3RFWFQocXVlcnksIGV4dC5RVUVSWV9SRVNVTFRfQVZBSUxBQkxFX0VYVCk7XG4gICAgICAgICAgICBsZXQgZGlzam9pbnQgPSBzYW5kYm94LmdsLmdldFBhcmFtZXRlcihleHQuR1BVX0RJU0pPSU5UX0VYVCk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlICYmICFkaXNqb2ludCkge1xuICAgICAgICAgICAgICAgIGxldCByZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdhc1ZhbGlkOiB3YXNWYWxpZCxcbiAgICAgICAgICAgICAgICAgICAgZnJhZzogZnJhZ1N0cmluZyB8fCBzYW5kYm94LmZyYWdtZW50U3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0OiB2ZXJ0U3RyaW5nIHx8IHNhbmRib3gudmVydGV4U3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICB0aW1lRWxhcHNlZE1zOiBleHQuZ2V0UXVlcnlPYmplY3RFWFQocXVlcnksIGV4dC5RVUVSWV9SRVNVTFRfRVhUKS8xMDAwMDAwLjBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZpbmlzaFRlc3QoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdhaXRGb3JUZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3YWl0Rm9yVGVzdCgpO1xuICAgIH1cblxuICAgIGxvYWRUZXh0dXJlIChuYW1lLCB1cmxFbGVtZW50T3JEYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB1cmxFbGVtZW50T3JEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgb3B0aW9ucy51cmwgPSB1cmxFbGVtZW50T3JEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1cmxFbGVtZW50T3JEYXRhID09PSAnb2JqZWN0JyAmJiB1cmxFbGVtZW50T3JEYXRhLmRhdGEgJiYgdXJsRWxlbWVudE9yRGF0YS53aWR0aCAmJiB1cmxFbGVtZW50T3JEYXRhLmhlaWdodCkge1xuICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gdXJsRWxlbWVudE9yRGF0YS5kYXRhO1xuICAgICAgICAgICAgb3B0aW9ucy53aWR0aCA9IHVybEVsZW1lbnRPckRhdGEud2lkdGg7XG4gICAgICAgICAgICBvcHRpb25zLmhlaWdodCA9IHVybEVsZW1lbnRPckRhdGEuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1cmxFbGVtZW50T3JEYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgb3B0aW9ucy5lbGVtZW50ID0gdXJsRWxlbWVudE9yRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVzW25hbWVdKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZXNbbmFtZV0ubG9hZChvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVzW25hbWVdLm9uKCdsb2FkZWQnLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZXNbbmFtZV0gPSBuZXcgVGV4dHVyZSh0aGlzLmdsLCBuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZXNbbmFtZV0ub24oJ2xvYWRlZCcsIChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZWZyZXNoVW5pZm9ybXMoKSB7XG4gICAgICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcbiAgICB9XG5cbiAgICBzZXRVbmlmb3JtKG5hbWUsIC4uLnZhbHVlKSB7XG4gICAgICAgIGxldCB1ID0ge307XG4gICAgICAgIHVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRVbmlmb3Jtcyh1KTtcbiAgICB9XG5cbiAgICBzZXRVbmlmb3Jtcyh1bmlmb3Jtcykge1xuICAgICAgICBsZXQgcGFyc2VkID0gcGFyc2VVbmlmb3Jtcyh1bmlmb3Jtcyk7XG4gICAgICAgIC8vIFNldCBlYWNoIHVuaWZvcm1cbiAgICAgICAgZm9yIChsZXQgdSBpbiBwYXJzZWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJzZWRbdV0udHlwZSA9PT0gJ3NhbXBsZXIyRCcpIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgdGV4dHVyZXMsIHdlIG5lZWQgdG8gdHJhY2sgdGV4dHVyZSB1bml0cywgc28gd2UgaGF2ZSBhIHNwZWNpYWwgc2V0dGVyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy51bmlmb3JtVGV4dHVyZShwYXJzZWRbdV0ubmFtZSwgcGFyc2VkW3VdLnZhbHVlWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlKHBhcnNlZFt1XS5uYW1lLCBwYXJzZWRbdV0udmFsdWVbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtKHBhcnNlZFt1XS5tZXRob2QsIHBhcnNlZFt1XS50eXBlLCBwYXJzZWRbdV0ubmFtZSwgcGFyc2VkW3VdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE1vdXNlKG1vdXNlKSB7XG4gICAgICAgIC8vIHNldCB0aGUgbW91c2UgdW5pZm9ybVxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAobW91c2UgJiZcbiAgICAgICAgICAgIG1vdXNlLnggJiYgbW91c2UueCA+PSByZWN0LmxlZnQgJiYgbW91c2UueCA8PSByZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICBtb3VzZS55ICYmIG1vdXNlLnkgPj0gcmVjdC50b3AgJiYgbW91c2UueSA8PSByZWN0LmJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy51bmlmb3JtKCcyZicsICd2ZWMyJywgJ3VfbW91c2UnLCBtb3VzZS54IC0gcmVjdC5sZWZ0LCB0aGlzLmNhbnZhcy5oZWlnaHQgLSAobW91c2UueSAtIHJlY3QudG9wKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0Ly8gZXg6IHByb2dyYW0udW5pZm9ybSgnM2YnLCAncG9zaXRpb24nLCB4LCB5LCB6KTtcbiAgICB1bmlmb3JtIChtZXRob2QsIHR5cGUsIG5hbWUsIC4uLnZhbHVlKSB7IC8vICd2YWx1ZScgaXMgYSBtZXRob2QtYXBwcm9wcmlhdGUgYXJndW1lbnRzIGxpc3RcbiAgICAgICAgdGhpcy51bmlmb3Jtc1tuYW1lXSA9IHRoaXMudW5pZm9ybXNbbmFtZV0gfHwge307XG4gICAgICAgIGxldCB1bmlmb3JtID0gdGhpcy51bmlmb3Jtc1tuYW1lXTtcbiAgICAgICAgbGV0IGNoYW5nZSA9IGlzRGlmZih1bmlmb3JtLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIGlmIChjaGFuZ2UgfHwgdGhpcy5jaGFuZ2UgfHwgdW5pZm9ybS5sb2NhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHVuaWZvcm0udmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdW5pZm9ybS5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHVuaWZvcm0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHVuaWZvcm0udHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB1bmlmb3JtLm1ldGhvZCA9ICd1bmlmb3JtJyArIG1ldGhvZDtcbiAgICAgICAgICAgIHVuaWZvcm0ubG9jYXRpb24gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIG5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLmdsW3VuaWZvcm0ubWV0aG9kXS5hcHBseSh0aGlzLmdsLCBbdW5pZm9ybS5sb2NhdGlvbl0uY29uY2F0KHVuaWZvcm0udmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuaWZvcm1UZXh0dXJlKG5hbWUsIHRleHR1cmUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZShuYW1lLCB0ZXh0dXJlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybSgnMWknLCAnc2FtcGxlcjJEJywgbmFtZSwgdGhpcy50ZXh1cmVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmVzW25hbWVdLmJpbmQodGhpcy50ZXh1cmVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzJmJywgJ3ZlYzInLCBuYW1lICsgJ1Jlc29sdXRpb24nLCB0aGlzLnRleHR1cmVzW25hbWVdLndpZHRoLCB0aGlzLnRleHR1cmVzW25hbWVdLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLnRleHVyZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLndpZHRoICE9PSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCB8fFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgIT09IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IHJlYWxUb0NTU1BpeGVscyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgICAgIC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xuICAgICAgICAgICAgLy8gYW5kIGNvbXB1dGUgYSBzaXplIG5lZWRlZCB0byBtYWtlIG91ciBkcmF3aW5nYnVmZmVyIG1hdGNoIGl0IGluXG4gICAgICAgICAgICAvLyBkZXZpY2UgcGl4ZWxzLlxuICAgICAgICAgICAgbGV0IGRpc3BsYXlXaWR0aCA9IE1hdGguZmxvb3IodGhpcy5nbC5jYW52YXMuY2xpZW50V2lkdGggKiByZWFsVG9DU1NQaXhlbHMpO1xuICAgICAgICAgICAgbGV0IGRpc3BsYXlIZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuZ2wuY2FudmFzLmNsaWVudEhlaWdodCAqIHJlYWxUb0NTU1BpeGVscyk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBjYW52YXMgaXMgbm90IHRoZSBzYW1lIHNpemUuXG4gICAgICAgICAgICBpZiAodGhpcy5nbC5jYW52YXMud2lkdGggIT09IGRpc3BsYXlXaWR0aCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZ2wuY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodCkge1xuICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNhbnZhcyB0aGUgc2FtZSBzaXplXG4gICAgICAgICAgICAgICAgdGhpcy5nbC5jYW52YXMud2lkdGggPSBkaXNwbGF5V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGlzQ2FudmFzVmlzaWJsZSh0aGlzLmNhbnZhcyk7XG4gICAgICAgIGlmICh0aGlzLmZvcmNlUmVuZGVyIHx8XG4gICAgICAgICAgICAodGhpcy5hbmltYXRlZCAmJiB0aGlzLnZpc2libGUgJiYgISB0aGlzLnBhdXNlZCkpIHtcblxuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy50aW1lRGVsdGEgPSAgKG5vdyAtIHRoaXMudGltZVByZXYpIC8gMTAwMC4wO1xuICAgICAgICAgICAgdGhpcy50aW1lUHJldiA9IG5vdztcbiAgICAgICAgICAgIGlmICh0aGlzLm5EZWx0YSA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGRlbHRhIHRpbWUgdW5pZm9ybVxuICAgICAgICAgICAgICAgIHRoaXMudW5pZm9ybSgnMWYnLCAnZmxvYXQnLCAndV9kZWx0YScsIHRoaXMudGltZURlbHRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMublRpbWUgPiAxICkge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgZWxhcHNlZCB0aW1lIHVuaWZvcm1cbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzFmJywgJ2Zsb2F0JywgJ3VfdGltZScsIChub3cgLSB0aGlzLnRpbWVMb2FkKSAvIDEwMDAuMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm5EYXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gU2V0IGRhdGUgdW5pZm9ybTogeWVhci9tb250aC9kYXkvdGltZV9pbl9zZWNcbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzRmJywgJ2Zsb2F0JywgJ3VfZGF0ZScsIGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRIb3VycygpKjM2MDAgKyBkYXRlLmdldE1pbnV0ZXMoKSo2MCArIGRhdGUuZ2V0U2Vjb25kcygpICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAqIDAuMDAxICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgcmVzb2x1dGlvbiB1bmlmb3JtXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzJmJywgJ3ZlYzInLCAndV9yZXNvbHV0aW9uJywgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMudGV4dXJlSW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgdGV4IGluIHRoaXMudGV4dHVyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm1UZXh0dXJlKHRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERyYXcgdGhlIHJlY3RhbmdsZS5cbiAgICAgICAgICAgIHRoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgNik7XG5cbiAgICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncmVuZGVyJywge30pO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UgKCkge1xuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcGxheSAoKSB7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuICcwLjAuMjUnO1xuICAgIH1cbn1cblxud2luZG93Lkdsc2xDYW52YXMgPSBHbHNsQ2FudmFzO1xuXG5mdW5jdGlvbiBsb2FkQWxsR2xzbENhbnZhcygpIHtcbiAgICB2YXIgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dsc2xDYW52YXMnKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdpbmRvdy5nbHNsQ2FudmFzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2FuZGJveCA9IG5ldyBHbHNsQ2FudmFzKGxpc3RbaV0pO1xuICAgICAgICAgICAgaWYgKHNhbmRib3guaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nbHNsQ2FudmFzZXMucHVzaChzYW5kYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbG9hZEFsbEdsc2xDYW52YXMoKTtcbn0pO1xuIiwiLy8gVGV4dHVyZSBtYW5hZ2VtZW50XG5pbXBvcnQgeyBpc1Bvd2VyT2YyLCBpc1NhZmFyaSB9IGZyb20gJy4uL3Rvb2xzL2NvbW1vbic7XG5pbXBvcnQgeyBzdWJzY3JpYmVNaXhpbiB9IGZyb20gJy4uL3Rvb2xzL21peGluJztcblxuLy8gR0wgdGV4dHVyZSB3cmFwcGVyIG9iamVjdCBmb3Iga2VlcGluZyB0cmFjayBvZiBhIGdsb2JhbCBzZXQgb2YgdGV4dHVyZXMsIGtleWVkIGJ5IGEgdW5pcXVlIHVzZXItZGVmaW5lZCBuYW1lXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihnbCwgbmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1YnNjcmliZU1peGluKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBpZiAodGhpcy50ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJpbmQoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc291cmNlVHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IG51bGw7IC8vIGEgUHJvbWlzZSBvYmplY3QgdG8gdHJhY2sgdGhlIGxvYWRpbmcgc3RhdGUgb2YgdGhpcyB0ZXh0dXJlXG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBhIDEtcGl4ZWwgYmxhY2sgdGV4dHVyZSBzbyB3ZSBjYW4gc2FmZWx5IHJlbmRlciB3aGlsZSB3ZSB3YWl0IGZvciBhbiBpbWFnZSB0byBsb2FkXG4gICAgICAgIC8vIFNlZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTcyMjI0Ny93ZWJnbC13YWl0LWZvci10ZXh0dXJlLXRvLWxvYWRcbiAgICAgICAgdGhpcy5zZXREYXRhKDEsIDEsIG5ldyBVaW50OEFycmF5KFswLCAwLCAwLCAyNTVdKSwgeyBmaWx0ZXJpbmc6ICdsaW5lYXInIH0pO1xuICAgICAgICB0aGlzLnNldEZpbHRlcmluZyhvcHRpb25zLmZpbHRlcmluZyk7XG5cbiAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgYSBzaW5nbGUgdGV4dHVyZSBpbnN0YW5jZVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLnRleHR1cmUpO1xuICAgICAgICB0aGlzLnRleHR1cmUgPSBudWxsO1xuICAgICAgICBkZWxldGUgdGhpcy5kYXRhO1xuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYmluZCh1bml0KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdW5pdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChUZXh0dXJlLmFjdGl2ZVVuaXQgIT09IHVuaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCArIHVuaXQpO1xuICAgICAgICAgICAgICAgIFRleHR1cmUuYWN0aXZlVW5pdCA9IHVuaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFRleHR1cmUuYWN0aXZlVGV4dHVyZSAhPT0gdGhpcy50ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbiAgICAgICAgICAgIFRleHR1cmUuYWN0aXZlVGV4dHVyZSA9IHRoaXMudGV4dHVyZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWQob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMudXJsICE9PSB0aGlzLnVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VXJsKG9wdGlvbnMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudChvcHRpb25zLmVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLndpZHRoICYmIG9wdGlvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEob3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHQsIG9wdGlvbnMuZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXRzIHRleHR1cmUgZnJvbSBhbiB1cmxcbiAgICBzZXRVcmwodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVybCA9IHVybDsgLy8gc2F2ZSBVUkwgcmVmZXJlbmNlICh3aWxsIGJlIG92ZXJ3cml0dGVuIHdoZW4gZWxlbWVudCBpcyBsb2FkZWQgYmVsb3cpXG4gICAgICAgIHRoaXMuc291cmNlID0gdGhpcy51cmw7XG4gICAgICAgIHRoaXMuc291cmNlVHlwZSA9ICd1cmwnO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBleHQgPSB1cmwuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgbGV0IGlzVmlkZW8gPSAoZXh0ID09PSAnb2d2JyB8fCBleHQgPT09ICd3ZWJtJyB8fCBleHQgPT09ICdtcDQnKTtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChpc1ZpZGVvKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXJpbmcgPSAnbmVhcmVzdCc7XG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudC5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudChlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRleHR1cmUgJyR7dGhpcy5uYW1lfSc6IGZhaWxlZCB0byBsb2FkIHVybDogJyR7dGhpcy5zb3VyY2V9J2AsIGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVsZW1lbnQub25lcnJvciA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdhcm4gYW5kIHJlc29sdmUgb24gZXJyb3JcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGV4dHVyZSAnJHt0aGlzLm5hbWV9JzogZmFpbGVkIHRvIGxvYWQgdXJsOiAnJHt0aGlzLnNvdXJjZX0nYCwgZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFNhZmFyaSBoYXMgYSBidWcgbG9hZGluZyBkYXRhLVVSTCBlbGVtZW50cyB3aXRoIENPUlMgZW5hYmxlZCwgc28gaXQgbXVzdCBiZSBkaXNhYmxlZCBpbiB0aGF0IGNhc2VcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjM5NzhcbiAgICAgICAgICAgIGlmICghKGlzU2FmYXJpKCkgJiYgdGhpcy5zb3VyY2Uuc2xpY2UoMCwgNSkgPT09ICdkYXRhOicpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LnNyYyA9IHRoaXMuc291cmNlO1xuICAgICAgICAgICAgaWYgKGlzVmlkZW8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGV4dHVyZSB0byBhIHJhdyBpbWFnZSBidWZmZXJcbiAgICBzZXREYXRhKHdpZHRoLCBoZWlnaHQsIGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuc291cmNlID0gZGF0YTtcbiAgICAgICAgdGhpcy5zb3VyY2VUeXBlID0gJ2RhdGEnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldEZpbHRlcmluZyhvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgdGV4dHVyZSB0byB0cmFjayBhIGVsZW1lbnQgKGNhbnZhcy9pbWFnZSlcbiAgICBzZXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudDtcblxuICAgICAgICAvLyBhIHN0cmluZyBlbGVtZW50IGlzIGludGVycGV0ZWQgYXMgYSBDU1Mgc2VsZWN0b3JcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50IHx8XG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCB8fFxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuc291cmNlVHlwZSA9ICdlbGVtZW50JztcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxNSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShvcHRpb25zKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVyaW5nKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGB0aGUgJ2VsZW1lbnQnIHBhcmFtZXRlciAoXFxgZWxlbWVudDogJHtKU09OLnN0cmluZ2lmeShlbCl9XFxgKSBtdXN0IGJlIGEgQ1NTIGA7XG4gICAgICAgICAgICBtc2cgKz0gYHNlbGVjdG9yIHN0cmluZywgb3IgYSA8Y2FudmFzPiwgPGltYWdlPiBvciA8dmlkZW8+IG9iamVjdGA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGV4dHVyZSAnJHt0aGlzLm5hbWV9JzogJHttc2d9YCwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XG4gICAgfVxuXG4gICAgLy8gVXBsb2FkcyBjdXJyZW50IGltYWdlIG9yIGJ1ZmZlciB0byB0aGUgR1BVIChjYW4gYmUgdXNlZCB0byB1cGRhdGUgYW5pbWF0ZWQgdGV4dHVyZXMgb24gdGhlIGZseSlcbiAgICB1cGRhdGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICAgIHRoaXMuZ2wucGl4ZWxTdG9yZWkodGhpcy5nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAob3B0aW9ucy5VTlBBQ0tfRkxJUF9ZX1dFQkdMID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSkpO1xuICAgICAgICB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCBvcHRpb25zLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCB8fCBmYWxzZSk7XG5cbiAgICAgICAgLy8gSW1hZ2Ugb3IgQ2FudmFzIGVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuc291cmNlVHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgICAgICAgICAoKHRoaXMuc291cmNlIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHx8IFxuICAgICAgICAgICAgICh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHx8XG4gICAgICAgICAgICAgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCAmJiB0aGlzLnNvdXJjZS5jb21wbGV0ZSkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuc291cmNlLnZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNvdXJjZS52aWRlb0hlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuc291cmNlLndpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zb3VyY2UuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJhdyBpbWFnZSBidWZmZXJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zb3VyY2VUeXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCB0aGlzLnNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2FkZWQnLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmVzIGFwcHJvcHJpYXRlIGZpbHRlcmluZyBtb2RlXG4gICAgc2V0RmlsdGVyaW5nIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvd2VyT2YyID0gaXNQb3dlck9mMih0aGlzLndpZHRoKSAmJiBpc1Bvd2VyT2YyKHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgbGV0IGRlZnVhbHRGaWx0ZXIgPSAodGhpcy5wb3dlck9mMiA/ICdtaXBtYXAnIDogJ2xpbmVhcicpO1xuICAgICAgICB0aGlzLmZpbHRlcmluZyA9IG9wdGlvbnMuZmlsdGVyaW5nIHx8IGRlZnVhbHRGaWx0ZXI7XG5cbiAgICAgICAgdmFyIGdsID0gdGhpcy5nbDtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG5cbiAgICAgICAgLy8gRm9yIHBvd2VyLW9mLTIgdGV4dHVyZXMsIHRoZSBmb2xsb3dpbmcgcHJlc2V0cyBhcmUgYXZhaWxhYmxlOlxuICAgICAgICAvLyBtaXBtYXA6IGxpbmVhciBibGVuZCBmcm9tIG5lYXJlc3QgbWlwXG4gICAgICAgIC8vIGxpbmVhcjogbGluZWFyIGJsZW5kIGZyb20gb3JpZ2luYWwgaW1hZ2UgKG5vIG1pcHMpXG4gICAgICAgIC8vIG5lYXJlc3Q6IG5lYXJlc3QgcGl4ZWwgZnJvbSBvcmlnaW5hbCBpbWFnZSAobm8gbWlwcywgJ2Jsb2NreScgbG9vaylcbiAgICAgICAgaWYgKHRoaXMucG93ZXJPZjIpIHtcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIG9wdGlvbnMuVEVYVFVSRV9XUkFQX1MgfHwgKG9wdGlvbnMucmVwZWF0ICYmIGdsLlJFUEVBVCkgfHwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBvcHRpb25zLlRFWFRVUkVfV1JBUF9UIHx8IChvcHRpb25zLnJlcGVhdCAmJiBnbC5SRVBFQVQpIHx8IGdsLkNMQU1QX1RPX0VER0UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJpbmcgPT09ICdtaXBtYXAnKSB7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUl9NSVBNQVBfTElORUFSKTsgLy8gVE9ETzogdXNlIHRyaWxpbmVhciBmaWx0ZXJpbmcgYnkgZGVmdWFsdCBpbnN0ZWFkP1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5maWx0ZXJpbmcgPT09ICdsaW5lYXInKSB7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZpbHRlcmluZyA9PT0gJ25lYXJlc3QnKSB7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlYkdMIGhhcyBzdHJpY3QgcmVxdWlyZW1lbnRzIG9uIG5vbi1wb3dlci1vZi0yIHRleHR1cmVzOlxuICAgICAgICAgICAgLy8gTm8gbWlwbWFwcyBhbmQgbXVzdCBjbGFtcCB0byBlZGdlXG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJpbmcgPT09ICdtaXBtYXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJpbmcgPSAnbGluZWFyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyaW5nID09PSAnbmVhcmVzdCcpIHtcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIGRlZmF1bHQgdG8gbGluZWFyIGZvciBub24tcG93ZXItb2YtMiB0ZXh0dXJlc1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBSZXBvcnQgbWF4IHRleHR1cmUgc2l6ZSBmb3IgYSBHTCBjb250ZXh0XG5UZXh0dXJlLmdldE1heFRleHR1cmVTaXplID0gZnVuY3Rpb24gKGdsKSB7XG4gICAgcmV0dXJuIGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVEVYVFVSRV9TSVpFKTtcbn07XG5cbi8vIEdsb2JhbCBzZXQgb2YgdGV4dHVyZXMsIGJ5IG5hbWVcblRleHR1cmUuYWN0aXZlVW5pdCA9IC0xO1xuIiwibGV0IGxhc3RFcnJvciA9ICcnO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIEhUTE0gZm9yIGEgZmFpbHVyZSBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FudmFzQ29udGFpbmVySWQgaWQgb2YgY29udGFpbmVyIG9mIHRoXG4gKiAgICAgICAgY2FudmFzLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgaHRtbC5cbiAqL1xuZnVuY3Rpb24gbWFrZUZhaWxIVE1MKG1zZykge1xuICAgIHJldHVybiBgXG48dGFibGUgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjOENFOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPjx0cj5cbjx0ZCBhbGlnbj1cImNlbnRlclwiPlxuPGRpdiBzdHlsZT1cImRpc3BsYXk6IHRhYmxlLWNlbGw7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+XG48ZGl2IHN0eWxlPVwiXCI+YCArIG1zZyArIGA8L2Rpdj5cbjwvZGl2PlxuPC90ZD48L3RyPjwvdGFibGU+XG5gO1xufVxuXG4vKipcbiAqIE1lc2FzZ2UgZm9yIGdldHRpbmcgYSB3ZWJnbCBicm93c2VyXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5sZXQgR0VUX0FfV0VCR0xfQlJPV1NFUiA9IGBcblx0VGhpcyBwYWdlIHJlcXVpcmVzIGEgYnJvd3NlciB0aGF0IHN1cHBvcnRzIFdlYkdMLjxici8+XG5cdDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZ1wiPkNsaWNrIGhlcmUgdG8gdXBncmFkZSB5b3VyIGJyb3dzZXIuPC9hPlxuYDtcblxuLyoqXG4gKiBNZXNhc2dlIGZvciBuZWVkIGJldHRlciBoYXJkd2FyZVxuICogQHR5cGUge3N0cmluZ31cbiAqL1xubGV0IE9USEVSX1BST0JMRU0gPSBgXG5cdEl0IGRvZXMgbm90IGFwcGVhciB5b3VyIGNvbXB1dGVyIGNhbiBzdXBwb3J0IFdlYkdMLjxici8+XG5cdDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy90cm91Ymxlc2hvb3RpbmcvXCI+Q2xpY2sgaGVyZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L2E+XG5gO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB3ZWJnbCBjb250ZXh0LiBJZiBjcmVhdGlvbiBmYWlscyBpdCB3aWxsXG4gKiBjaGFuZ2UgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb250YWluZXIgb2YgdGhlIDxjYW52YXM+XG4gKiB0YWcgdG8gYW4gZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBjb3JyZWN0IGxpbmtzIGZvciBXZWJHTC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gY2FudmFzLiBUaGUgY2FudmFzIGVsZW1lbnQgdG8gY3JlYXRlIGFcbiAqICAgICBjb250ZXh0IGZyb20uXG4gKiBAcGFyYW0ge1dlYkdMQ29udGV4dENyZWF0aW9uQXR0aXJidXRlc30gb3B0QXR0cmlicyBBbnlcbiAqICAgICBjcmVhdGlvbiBhdHRyaWJ1dGVzIHlvdSB3YW50IHRvIHBhc3MgaW4uXG4gKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IFRoZSBjcmVhdGVkIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFdlYkdMIChjYW52YXMsIG9wdEF0dHJpYnMpIHtcbiAgICBmdW5jdGlvbiBzaG93TGluayhzdHIpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGNhbnZhcy5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbWFrZUZhaWxIVE1MKHN0cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgc2hvd0xpbmsoR0VUX0FfV0VCR0xfQlJPV1NFUik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjb250ZXh0ID0gY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0QXR0cmlicyk7XG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIHNob3dMaW5rKE9USEVSX1BST0JMRU0pO1xuICAgIH1cbiAgICBjb250ZXh0LmdldEV4dGVuc2lvbignT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJyk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHdlYmdsIGNvbnRleHQuXG4gKiBAcGFyYW0geyFDYW52YXN9IGNhbnZhcyBUaGUgY2FudmFzIHRhZyB0byBnZXQgY29udGV4dFxuICogICAgIGZyb20uIElmIG9uZSBpcyBub3QgcGFzc2VkIGluIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXG4gKiBAcmV0dXJuIHshV2ViR0xDb250ZXh0fSBUaGUgY3JlYXRlZCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0QXR0cmlicykge1xuICAgIGxldCBuYW1lcyA9IFsnd2ViZ2wnLCAnZXhwZXJpbWVudGFsLXdlYmdsJ107XG4gICAgbGV0IGNvbnRleHQgPSBudWxsO1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBuYW1lcy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChuYW1lc1tpaV0sIG9wdEF0dHJpYnMpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qXG4gKlx0Q3JlYXRlIGEgVmVydGV4IG9mIGEgc3BlY2lmaWMgdHlwZSAoZ2wuVkVSVEVYX1NIQURFUi8pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIobWFpbiwgc291cmNlLCB0eXBlKSB7XG4gICAgbGV0IGdsID0gbWFpbi5nbDtcblxuICAgIGxldCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgICBsZXQgY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG5cbiAgICBpZiAoIWNvbXBpbGVkKSB7XG4gICAgICAgIC8vIFNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBjb21waWxhdGlvbjsgZ2V0IHRoZSBlcnJvclxuICAgICAgICBsYXN0RXJyb3IgPSBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyoqKiBFcnJvciBjb21waWxpbmcgc2hhZGVyICcgKyBzaGFkZXIgKyAnOicgKyBsYXN0RXJyb3IpO1xuICAgICAgICBtYWluLnRyaWdnZXIoJ2Vycm9yJywgeyBzaGFkZXI6IHNoYWRlciwgc291cmNlOiBzb3VyY2UsIHR5cGU6IHR5cGUsIGVycm9yOiBsYXN0RXJyb3IgfSk7XG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhZGVyO1xufVxuXG4vKipcbiAqIExvYWRzIGEgc2hhZGVyLlxuICogQHBhcmFtIHshV2ViR0xDb250ZXh0fSBnbCBUaGUgV2ViR0xDb250ZXh0IHRvIHVzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaGFkZXJTb3VyY2UgVGhlIHNoYWRlciBzb3VyY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc2hhZGVyVHlwZSBUaGUgdHlwZSBvZiBzaGFkZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyk6IHZvaWQpIG9wdF9lcnJvckNhbGxiYWNrIGNhbGxiYWNrIGZvciBlcnJvcnMuXG4gKiBAcmV0dXJuIHshV2ViR0xTaGFkZXJ9IFRoZSBjcmVhdGVkIHNoYWRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0obWFpbiwgc2hhZGVycywgb3B0QXR0cmlicywgb3B0TG9jYXRpb25zKSB7XG4gICAgbGV0IGdsID0gbWFpbi5nbDtcblxuICAgIGxldCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBzaGFkZXJzLmxlbmd0aDsgKytpaSkge1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgc2hhZGVyc1tpaV0pO1xuICAgIH1cbiAgICBpZiAob3B0QXR0cmlicykge1xuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgb3B0QXR0cmlicy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbihcbiAgICAgICAgICAgIHByb2dyYW0sXG4gICAgICAgICAgICBvcHRMb2NhdGlvbnMgPyBvcHRMb2NhdGlvbnNbaWldIDogaWksXG4gICAgICAgICAgICBvcHRBdHRyaWJzW2lpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAvLyBDaGVjayB0aGUgbGluayBzdGF0dXNcbiAgICBsZXQgbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gICAgaWYgKCFsaW5rZWQpIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgbGlua1xuICAgICAgICBsYXN0RXJyb3IgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIHByb2dyYW0gbGlua2luZzonICsgbGFzdEVycm9yKTtcbiAgICAgICAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBwcm9ncmFtO1xufVxuXG4vLyBCeSBCcmV0dCBDYW1iZXIgb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YW5ncmFtcy90YW5ncmFtL2Jsb2IvbWFzdGVyL3NyYy9nbC9nbHNsLmpzXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVbmlmb3Jtcyh1bmlmb3JtcywgcHJlZml4ID0gbnVsbCkge1xuICAgIGxldCBwYXJzZWQgPSBbXTtcblxuICAgIGZvciAobGV0IG5hbWUgaW4gdW5pZm9ybXMpIHtcbiAgICAgICAgbGV0IHVuaWZvcm0gPSB1bmlmb3Jtc1tuYW1lXTtcbiAgICAgICAgbGV0IHU7XG5cbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgbmFtZSA9IHByZWZpeCArICcuJyArIG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaW5nbGUgZmxvYXRcbiAgICAgICAgaWYgKHR5cGVvZiB1bmlmb3JtID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnMWYnLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFycmF5OiB2ZWN0b3IsIGFycmF5IG9mIGZsb2F0cywgYXJyYXkgb2YgdGV4dHVyZXMsIG9yIGFycmF5IG9mIHN0cnVjdHNcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh1bmlmb3JtKSkge1xuICAgICAgICAgICAgLy8gTnVtZXJpYyB2YWx1ZXNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdW5pZm9ybVswXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAvLyBmbG9hdCB2ZWN0b3JzICh2ZWMyLCB2ZWMzLCB2ZWM0KVxuICAgICAgICAgICAgICAgIGlmICh1bmlmb3JtLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmxvYXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnMWYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmbG9hdCB2ZWN0b3JzICh2ZWMyLCB2ZWMzLCB2ZWM0KVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVuaWZvcm0ubGVuZ3RoID49IDIgJiYgdW5pZm9ybS5sZW5ndGggPD0gNCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmVjJyArIHVuaWZvcm0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiB1bmlmb3JtLmxlbmd0aCArICdmdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZsb2F0IGFycmF5XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodW5pZm9ybS5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdmbG9hdFtdJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJzFmdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lICsgJ1swXScsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYXNzdW1lIG1hdHJpeCBmb3IgKHR5cGVvZiA9PSBGbG9hdDMyQXJyYXkgJiYgbGVuZ3RoID09IDE2KT9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIHRleHR1cmVzXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzYW1wbGVyMkQnLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICcxaScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcnJheSBvZiBhcnJheXMgLSBidXQgb25seSBhcnJheXMgb2YgdmVjdG9ycyBhcmUgYWxsb3dlZCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodW5pZm9ybVswXSkgJiYgdHlwZW9mIHVuaWZvcm1bMF1bMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgdmVjdG9ycyAodmVjMiwgdmVjMywgdmVjNClcbiAgICAgICAgICAgICAgICBpZiAodW5pZm9ybVswXS5sZW5ndGggPj0gMiAmJiB1bmlmb3JtWzBdLmxlbmd0aCA8PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgZm9yICh1ID0gMDsgdSA8IHVuaWZvcm0ubGVuZ3RoOyB1KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmVjJyArIHVuaWZvcm1bMF0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdW5pZm9ybVt1XS5sZW5ndGggKyAnZnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyAnWycgKyB1ICsgJ10nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtW3VdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIGVycm9yP1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXJyYXkgb2Ygc3RydWN0dXJlc1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm1bMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh1ID0gMDsgdSA8IHVuaWZvcm0ubGVuZ3RoOyB1KyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGVhY2ggc3RydWN0IGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCguLi5wYXJzZVVuaWZvcm1zKHVuaWZvcm1bdV0sIG5hbWUgKyAnWycgKyB1ICsgJ10nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEJvb2xlYW5cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm0gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICcxaScsXG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGV4dHVyZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2FtcGxlcjJEJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICcxaScsXG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3RydWN0dXJlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gU2V0IGVhY2ggZmllbGQgaW4gdGhlIHN0cnVjdFxuICAgICAgICAgICAgcGFyc2VkLnB1c2goLi4ucGFyc2VVbmlmb3Jtcyh1bmlmb3JtLCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBvdGhlciBub24tZmxvYXQgdHlwZXM/IChpbnQsIGV0Yy4pXG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNDYW52YXNWaXNpYmxlKGNhbnZhcykge1xuICAgIHJldHVyblx0KChjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgY2FudmFzLmhlaWdodCkgPiAwKSAmJlxuICAgICAgICAoY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQb3dlck9mMih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhZmFyaSAoKSB7XG4gICAgcmV0dXJuIC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEhpZ2hlc3RQb3dlck9mVHdvKHgpIHtcbiAgICAtLXg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgICB4ID0geCB8IHggPj4gaTtcbiAgICB9XG4gICAgcmV0dXJuIHggKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRm9ybWF0TnVtYmVyTGVuZ3RoKG51bSwgbGVuZ3RoKSB7XG4gICAgbGV0IHIgPSBudW0udG9TdHJpbmcoKTtcbiAgICB3aGlsZSAoci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgciA9ICcwJyArIHI7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgeTogZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpZmYoYSwgYikge1xuICAgIGlmIChhICYmIGIpIHtcbiAgICAgICAgcmV0dXJuIGEudG9TdHJpbmcoKSAhPT0gYi50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmVNaXhpbiAodGFyZ2V0KSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IG5ldyBTZXQoKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwge1xuXG4gICAgICAgIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb24odHlwZSwgZikge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0ge307XG4gICAgICAgICAgICBsaXN0ZW5lclt0eXBlXSA9IGY7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5zdWJzY3JpYmVBbGwoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyKGV2ZW50LCAuLi5kYXRhKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyW2V2ZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcltldmVudF0oLi4uZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlTWl4aW4gKHRhcmdldCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHtcblxuICAgICAgICBvbih0eXBlLCBmKSB7XG4gICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSB7fTtcbiAgICAgICAgICAgIGxpc3RlbmVyW3R5cGVdID0gZjtcbiAgICAgICAgICAgIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9mZih0eXBlLCBmKSB7XG4gICAgICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHt9O1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyW3R5cGVdID0gZjtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxpc3RTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bnN1YnNjcmliZUFsbCgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5jbGVhcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXIoZXZlbnQsIC4uLmRhdGEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJbZXZlbnRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyW2V2ZW50XSguLi5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdfQ==
