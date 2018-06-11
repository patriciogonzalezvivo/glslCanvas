'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

var isFunction_1 = isFunction;

var toString = Object.prototype.toString;

function isFunction (fn) {
  var string = toString.call(fn);
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
}

var trim_1 = createCommonjsModule(function (module, exports) {
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
});

var forEach_1 = forEach;

var toString$1 = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function forEach(list, iterator, context) {
    if (!isFunction_1(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this;
    }
    
    if (toString$1.call(list) === '[object Array]')
        forEachArray$1(list, iterator, context);
    else if (typeof list === 'string')
        forEachString(list, iterator, context);
    else
        forEachObject(list, iterator, context);
}

function forEachArray$1(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array);
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string);
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object);
        }
    }
}

var isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };

var parseHeaders = function (headers) {
  if (!headers)
    return {}

  var result = {};

  forEach_1(
      trim_1(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim_1(row.slice(0, index)).toLowerCase()
          , value = trim_1(row.slice(index + 1));

        if (typeof(result[key]) === 'undefined') {
          result[key] = value;
        } else if (isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [ result[key], value ];
        }
      }
  );

  return result
};

var immutable = extend;

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty$1.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

"use strict";





var xhr = createXHR;
createXHR.XMLHttpRequest = window_1.XMLHttpRequest || noop;
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window_1.XDomainRequest;

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback);
        options.method = method.toUpperCase();
        return _createXHR(options)
    };
});

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i]);
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri;

    if (isFunction_1(options)) {
        callback = options;
        if (typeof uri === "string") {
            params = {uri:uri};
        }
    } else {
        params = immutable(options, {uri: uri});
    }

    params.callback = callback;
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback);
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false;
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true;
            options.callback(err, response, body);
        }
    };

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0);
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined;

        if (xhr.response) {
            body = xhr.response;
        } else {
            body = xhr.responseText || getXml(xhr);
        }

        if (isJson) {
            try {
                body = JSON.parse(body);
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer);
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") );
        }
        evt.statusCode = 0;
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status;
        clearTimeout(timeoutTimer);
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200;
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status);
        }
        var response = failureResponse;
        var err = null;

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            };
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders());
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error");
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null;

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest();
        }else{
            xhr = new createXHR.XMLHttpRequest();
        }
    }

    var key;
    var aborted;
    var uri = xhr.url = options.uri || options.url;
    var method = xhr.method = options.method || "GET";
    var body = options.body || options.data;
    var headers = xhr.headers = options.headers || {};
    var sync = !!options.sync;
    var isJson = false;
    var timeoutTimer;
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    };

    if ("json" in options && options.json !== false) {
        isJson = true;
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json"); //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json"); //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json);
        }
    }

    xhr.onreadystatechange = readystatechange;
    xhr.onload = loadFunc;
    xhr.onerror = errorFunc;
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    };
    xhr.onabort = function(){
        aborted = true;
    };
    xhr.ontimeout = errorFunc;
    xhr.open(method, uri, !sync, options.username, options.password);
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials;
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true;//IE9 may still call readystatechange
            xhr.abort("timeout");
            var e = new Error("XMLHttpRequest timeout");
            e.code = "ETIMEDOUT";
            errorFunc(e);
        }, options.timeout );
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType;
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr);
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null);

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror";
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

function isCanvasVisible(canvas) {
    return canvas.getBoundingClientRect().top + canvas.height > 0 && canvas.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight);
}

function isPowerOf2(value) {
    return (value & value - 1) === 0;
}

function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
}







function isDiff(a, b) {
    if (a && b) {
        return a.toString() !== b.toString();
    }
    return false;
}

function subscribeMixin$1(target) {
    var listeners = new Set();

    return Object.assign(target, {

        on(type, f) {
            let listener = {};
            listener[type] = f;
            listeners.add(listener);
        },

        off(type, f) {
            if (f) {
                let listener = {};
                listener[type] = f;
                listeners.delete(listener);
            } else {
                for (let item of listeners) {
                    for (let key of Object.keys(item)) {
                        if (key === type) {
                            listeners.delete(item);
                            return;
                        }
                    }
                }
            }
        },

        listSubscriptions() {
            for (let item of listeners) {
                console.log(item);
            }
        },

        subscribe(listener) {
            listeners.add(listener);
        },

        unsubscribe(listener) {
            listeners.delete(listener);
        },

        unsubscribeAll() {
            listeners.clear();
        },

        trigger(event, ...data) {
            for (var listener of listeners) {
                if (typeof listener[event] === 'function') {
                    listener[event](...data);
                }
            }
        }
    });
}

// Texture management
// GL texture wrapper object for keeping track of a global set of textures, keyed by a unique user-defined name
class Texture {
    constructor(gl, name, options = {}) {
        subscribeMixin$1(this);

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
    destroy() {
        if (!this.valid) {
            return;
        }
        this.gl.deleteTexture(this.texture);
        this.texture = null;
        delete this.data;
        this.data = null;
        this.valid = false;
    }

    bind(unit) {
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

    load(options = {}) {
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
    setUrl(url, options = {}) {
        if (!this.valid) {
            return;
        }

        this.url = url; // save URL reference (will be overwritten when element is loaded below)
        this.source = this.url;
        this.sourceType = 'url';

        this.loading = new Promise((resolve, reject) => {
            let ext = url.split('.').pop().toLowerCase();
            let isVideo = ext === 'ogv' || ext === 'webm' || ext === 'mp4';

            let element = undefined;
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

            element.onload = () => {
                try {
                    this.setElement(element, options);
                } catch (e) {
                    console.log(`Texture '${this.name}': failed to load url: '${this.source}'`, e, options);
                }
                resolve(this);
            };
            element.onerror = e => {
                // Warn and resolve on error
                console.log(`Texture '${this.name}': failed to load url: '${this.source}'`, e, options);
                resolve(this);
            };

            // Safari has a bug loading data-URL elements with CORS enabled, so it must be disabled in that case
            // https://bugs.webkit.org/show_bug.cgi?id=123978
            if (!(isSafari() && this.source.slice(0, 5) === 'data:')) {
                element.crossOrigin = 'anonymous';
            }

            element.src = this.source;
            if (isVideo) {
                this.setElement(element, options);
            }
        });
        return this.loading;
    }

    // Sets texture to a raw image buffer
    setData(width, height, data, options = {}) {
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
    setElement(element, options) {
        let el = element;

        // a string element is interpeted as a CSS selector
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (element instanceof HTMLCanvasElement || element instanceof HTMLImageElement || element instanceof HTMLVideoElement) {
            this.source = element;
            this.sourceType = 'element';

            if (element instanceof HTMLVideoElement) {
                element.addEventListener('canplaythrough', () => {
                    this.intervalID = setInterval(() => {
                        this.update(options);
                    }, 15);
                }, true);
                element.addEventListener('ended', () => {
                    element.currentTime = 0;
                    element.play();
                }, true);
            } else {
                this.update(options);
            }
            this.setFiltering(options);
        } else {
            let msg = `the 'element' parameter (\`element: ${JSON.stringify(el)}\`) must be a CSS `;
            msg += `selector string, or a <canvas>, <image> or <video> object`;
            console.log(`Texture '${this.name}': ${msg}`, options);
        }

        this.loading = Promise.resolve(this);
        return this.loading;
    }

    // Uploads current image or buffer to the GPU (can be used to update animated textures on the fly)
    update(options = {}) {
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
    setFiltering(options = {}) {
        if (!this.valid) {
            return;
        }

        this.powerOf2 = isPowerOf2(this.width) && isPowerOf2(this.height);
        let defualtFilter = this.powerOf2 ? 'mipmap' : 'linear';
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
}

// Report max texture size for a GL context
Texture.getMaxTextureSize = function (gl) {
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
};

// Global set of textures, by name
Texture.activeUnit = -1;

let lastError = '';

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
function makeFailHTML(msg) {
    return `
<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>
<td align="center">
<div style="display: table-cell; vertical-align: middle;">
<div style="">` + msg + `</div>
</div>
</td></tr></table>
`;
}

/**
 * Message for getting a webgl browser
 * @type {string}
 */
let GET_A_WEBGL_BROWSER = `
	This page requires a browser that supports WebGL.<br/>
	<a href="http://get.webgl.org">Click here to upgrade your browser.</a>
`;

/**
 * Message for need better hardware
 * @type {string}
 */
let OTHER_PROBLEM = `
	It does not appear your computer can support WebGL.<br/>
	<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>
`;

/**
 * Code to return in `onError` callback when the browser doesn't support webgl
 * @type {number}
 */
const ERROR_BROWSER_SUPPORT = 1;

/**
 * Code to return in `onError` callback there's any other problem related to webgl
 * @type {number}
 */
const ERROR_OTHER = 2;

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL,
 * unless `onError` option is defined to a callback,
 * which allows for custom error handling..
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttributes} optAttribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
function setupWebGL(canvas, optAttribs, onError) {
    function showLink(str) {
        let container = canvas.parentNode;
        if (container) {
            container.innerHTML = makeFailHTML(str);
        }
    }

    function handleError(errorCode, msg) {
        if (typeof onError === 'function') {
            onError(errorCode);
        } else {
            showLink(msg);
        }
    }

    if (!window.WebGLRenderingContext) {
        handleError(ERROR_BROWSER_SUPPORT, GET_A_WEBGL_BROWSER);
        return null;
    }

    let context = create3DContext(canvas, optAttribs);
    if (!context) {
        handleError(ERROR_OTHER, OTHER_PROBLEM);
    } else {
        context.getExtension('OES_standard_derivatives');
    }
    return context;
}

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
function create3DContext(canvas, optAttribs) {
    let names = ['webgl', 'experimental-webgl'];
    let context = null;
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
function createShader(main, source, type, offset) {
    let gl = main.gl;

    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
        // Something went wrong during compilation; get the error
        lastError = gl.getShaderInfoLog(shader);
        console.error('*** Error compiling shader ' + shader + ':' + lastError);
        main.trigger('error', {
            shader: shader,
            source: source,
            type: type,
            error: lastError,
            offset: offset || 0
        });
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
    let gl = main.gl;

    let program = gl.createProgram();
    for (let ii = 0; ii < shaders.length; ++ii) {
        gl.attachShader(program, shaders[ii]);
    }
    if (optAttribs) {
        for (let ii = 0; ii < optAttribs.length; ++ii) {
            gl.bindAttribLocation(program, optLocations ? optLocations[ii] : ii, optAttribs[ii]);
        }
    }
    gl.linkProgram(program);

    // Check the link status
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
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
function parseUniforms(uniforms, prefix = null) {
    let parsed = [];

    for (let name in uniforms) {
        let uniform = uniforms[name];
        let u;

        if (prefix) {
            name = prefix + '.' + name;
        }

        // Single float
        if (typeof uniform === 'number') {
            parsed.push({
                type: 'float',
                method: '1f',
                name,
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
                            name,
                            value: uniform
                        });
                    }
                    // float vectors (vec2, vec3, vec4)
                    else if (uniform.length >= 2 && uniform.length <= 4) {
                            parsed.push({
                                type: 'vec' + uniform.length,
                                method: uniform.length + 'fv',
                                name,
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
                        else if (typeof uniform[0] === 'object') {
                                for (u = 0; u < uniform.length; u++) {
                                    // Set each struct in the array
                                    parsed.push(...parseUniforms(uniform[u], name + '[' + u + ']'));
                                }
                            }
            }
            // Boolean
            else if (typeof uniform === 'boolean') {
                    parsed.push({
                        type: 'bool',
                        method: '1i',
                        name,
                        value: uniform
                    });
                }
                // Texture
                else if (typeof uniform === 'string') {
                        parsed.push({
                            type: 'sampler2D',
                            method: '1i',
                            name,
                            value: uniform
                        });
                    }
                    // Structure
                    else if (typeof uniform === 'object') {
                            // Set each field in the struct
                            parsed.push(...parseUniforms(uniform, name));
                        }
        // TODO: support other non-float types? (int, etc.)
    }
    return parsed;
}

/*
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

class GlslCanvas {
    constructor(canvas, contextOptions, options) {
        subscribeMixin$1(this);

        contextOptions = contextOptions || {};
        options = options || {};

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        this.canvas = canvas;
        this.gl = undefined;
        this.program = undefined;
        this.textures = {};
        this.buffers = {};
        this.uniforms = {};
        this.vbo = {};
        this.isValid = false;

        this.BUFFER_COUNT = 0;
        this.TEXTURE_COUNT = 0;

        this.vertexString = contextOptions.vertexString || `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
}
`;
        this.fragmentString = contextOptions.fragmentString || `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texcoord;

void main(){
    gl_FragColor = vec4(0.0);
}
`;

        // GL Context
        let gl = setupWebGL(canvas, contextOptions, options.onError);
        if (!gl) {
            return;
        }
        this.gl = gl;
        this.timeLoad = this.timePrev = performance.now();
        this.timeDelta = 0.0;
        this.forceRender = true;
        this.paused = false;

        // Allow alpha
        canvas.style.backgroundColor = contextOptions.backgroundColor || 'rgba(1,1,1,0)';

        // Load shader
        if (canvas.hasAttribute('data-fragment')) {
            this.fragmentString = canvas.getAttribute('data-fragment');
        } else if (canvas.hasAttribute('data-fragment-url')) {
            let source = canvas.getAttribute('data-fragment-url');
            xhr.get(source, (error, response, body) => {
                this.load(body, this.vertexString);
            });
        }

        // Load shader
        if (canvas.hasAttribute('data-vertex')) {
            this.vertexString = canvas.getAttribute('data-vertex');
        } else if (canvas.hasAttribute('data-vertex-url')) {
            let source = canvas.getAttribute('data-vertex-url');
            xhr.get(source, (error, response, body) => {
                this.load(this.fragmentString, body);
            });
        }

        this.load();

        if (!this.program) {
            return;
        }

        // Define Vertex buffer
        let texCoordsLoc = gl.getAttribLocation(this.program, 'a_texcoord');
        this.vbo.texCoords = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.texCoords);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(texCoordsLoc);
        this.gl.vertexAttribPointer(texCoordsLoc, 2, gl.FLOAT, false, 0, 0);

        let verticesLoc = gl.getAttribLocation(this.program, 'a_position');
        this.vbo.vertices = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.vertices);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(verticesLoc);
        this.gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);

        // load TEXTURES
        if (canvas.hasAttribute('data-textures')) {
            let imgList = canvas.getAttribute('data-textures').split(',');
            for (let nImg in imgList) {
                this.setUniform('u_tex' + nImg, imgList[nImg]);
            }
        }

        // ========================== EVENTS
        let mouse = {
            x: 0,
            y: 0
        };
        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
        }, false);

        let sandbox = this;
        function RenderLoop() {
            if (sandbox.nMouse > 1) {
                sandbox.setMouse(mouse);
            }
            sandbox.forceRender = sandbox.resize();
            sandbox.render();
            window.requestAnimationFrame(RenderLoop);
        }

        // Start
        this.setMouse({ x: 0, y: 0 });
        RenderLoop();
        return this;
    }

    destroy() {
        this.animated = false;
        this.isValid = false;
        for (let tex in this.textures) {
            if (tex.destroy) {
                tex.destroy();
            }
        }
        this.textures = {};
        for (let att in this.attribs) {
            this.gl.deleteBuffer(this.attribs[att]);
        }
        this.gl.useProgram(null);
        this.gl.deleteProgram(this.program);
        for (let key in this.buffers) {
            const buffer = this.buffers[key];
            this.gl.deleteProgram(buffer.program);
        }
        this.program = null;
        this.gl = null;
    }

    load(fragString, vertString) {

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

        let nTextures = this.fragmentString.search(/sampler2D/g);
        if (nTextures) {
            let lines = this.fragmentString.split('\n');
            for (let i = 0; i < lines.length; i++) {
                let match = lines[i].match(/uniform\s*sampler2D\s*([\w]*);\s*\/\/\s*([\w|\:\/\/|\.|\-|\_]*)/i);
                if (match) {
                    let ext = match[2].split('.').pop().toLowerCase();
                    if (match[1] && match[2] && (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'ogv' || ext === 'webm' || ext === 'mp4')) {
                        this.setUniform(match[1], match[2]);
                    }
                }
                let main = lines[i].match(/\s*void\s*main\s*/g);
                if (main) {
                    break;
                }
            }
        }

        let vertexShader = createShader(this, this.vertexString, this.gl.VERTEX_SHADER);
        let fragmentShader = createShader(this, this.fragmentString, this.gl.FRAGMENT_SHADER);

        // If Fragment shader fails load a empty one to sign the error
        if (!fragmentShader) {
            fragmentShader = createShader(this, 'void main(){\n\tgl_FragColor = vec4(1.0);\n}', this.gl.FRAGMENT_SHADER);
            this.isValid = false;
        } else {
            this.isValid = true;
        }

        // Create and use program
        let program = createProgram(this, [vertexShader, fragmentShader]); //, [0,1],['a_texcoord','a_position']);
        this.gl.useProgram(program);

        // Delete shaders
        // this.gl.detachShader(program, vertexShader);
        // this.gl.detachShader(program, fragmentShader);
        this.gl.deleteShader(vertexShader);
        this.gl.deleteShader(fragmentShader);

        this.program = program;
        this.change = true;

        this.BUFFER_COUNT = 0;
        const buffers = this.getBuffers(this.fragmentString);
        if (Object.keys(buffers).length) {
            this.loadPrograms(buffers);
        }
        this.buffers = buffers;

        // Trigger event
        this.trigger('load', {});

        this.forceRender = true;
    }

    test(callback, fragString, vertString) {
        // Thanks to @thespite for the help here
        // https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query/
        let pre_test_vert = this.vertexString;
        let pre_test_frag = this.fragmentString;
        let pre_test_paused = this.paused;

        let ext = this.gl.getExtension('EXT_disjoint_timer_query');
        let query = ext.createQueryEXT();
        let wasValid = this.isValid;

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

        let sandbox = this;
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
            let available = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_AVAILABLE_EXT);
            let disjoint = sandbox.gl.getParameter(ext.GPU_DISJOINT_EXT);
            if (available && !disjoint) {
                let ret = {
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

    loadTexture(name, urlElementOrData, options) {
        if (!options) {
            options = {};
        }

        if (typeof urlElementOrData === 'string') {
            options.url = urlElementOrData;
        } else if (typeof urlElementOrData === 'object' && urlElementOrData.data && urlElementOrData.width && urlElementOrData.height) {
            options.data = urlElementOrData.data;
            options.width = urlElementOrData.width;
            options.height = urlElementOrData.height;
        } else if (typeof urlElementOrData === 'object') {
            options.element = urlElementOrData;
        }

        if (this.textures[name]) {
            if (this.textures[name]) {
                this.textures[name].load(options);
                this.textures[name].on('loaded', args => {
                    this.forceRender = true;
                });
            }
        } else {
            this.textures[name] = new Texture(this.gl, name, options);
            this.textures[name].on('loaded', args => {
                this.forceRender = true;
            });
        }
    }

    refreshUniforms() {
        this.uniforms = {};
    }

    setUniform(name, ...value) {
        let u = {};
        u[name] = value;
        this.setUniforms(u);
    }

    setUniforms(uniforms) {
        let parsed = parseUniforms(uniforms);
        // Set each uniform
        for (let u in parsed) {
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

    setMouse(mouse) {
        // set the mouse uniform
        let rect = this.canvas.getBoundingClientRect();
        if (mouse && mouse.x && mouse.x >= rect.left && mouse.x <= rect.right && mouse.y && mouse.y >= rect.top && mouse.y <= rect.bottom) {
            for (let key in this.buffers) {
                const buffer = this.buffers[key];
                this.gl.useProgram(buffer.program);
                this.gl.uniform2f(this.gl.getUniformLocation(buffer.program, 'u_mouse'), mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
            }
            this.gl.useProgram(this.program);
            this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'u_mouse'), mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
        }
    }

    // ex: program.uniform('3f', 'position', x, y, z);
    uniform(method, type, name, ...value) {
        // 'value' is a method-appropriate arguments list
        this.uniforms[name] = this.uniforms[name] || {};
        let uniform = this.uniforms[name];
        let change = isDiff(uniform.value, value);
        if (change || this.change || uniform.location === undefined || uniform.value === undefined) {
            uniform.name = name;
            uniform.value = value;
            uniform.type = type;
            uniform.method = 'uniform' + method;
            uniform.location = this.gl.getUniformLocation(this.program, name);

            this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.value));
        }
    }

    uniformTexture(name, texture, options) {
        if (this.textures[name] === undefined) {
            this.loadTexture(name, texture, options);
        } else {
            return true;
        }
    }

    resize() {
        if (this.width !== this.canvas.clientWidth || this.height !== this.canvas.clientHeight) {
            let realToCSSPixels = window.devicePixelRatio || 1;

            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            let displayWidth = Math.floor(this.gl.canvas.clientWidth * realToCSSPixels);
            let displayHeight = Math.floor(this.gl.canvas.clientHeight * realToCSSPixels);

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
            this.resizeSwappableBuffers();
            return true;
        } else {
            return false;
        }
    }

    render() {
        this.visible = isCanvasVisible(this.canvas);
        if (this.forceRender || this.animated && this.visible && !this.paused) {
            this.renderPrograms();
            // Trigger event
            this.trigger('render', {});
            this.change = false;
            this.forceRender = false;
        }
    }

    pause() {
        this.paused = true;
    }

    play() {
        this.paused = false;
    }

    version() {
        return '0.0.27';
    }

    // render main and buffers programs
    renderPrograms() {
        const gl = this.gl,
              W = gl.canvas.width,
              H = gl.canvas.height;
        this.updateVariables();
        gl.viewport(0, 0, W, H);
        for (let key in this.buffers) {
            const buffer = this.buffers[key];
            this.updateUniforms(buffer.program, key);
            buffer.bundle.render(W, H, buffer.program, buffer.name);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        this.updateUniforms(this.program, 'main');
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // update glslCanvas variables
    updateVariables() {
        const glsl = this;
        var date = new Date();
        var now = performance.now();
        const variables = this.variables || {};
        variables.prev = variables.prev || now;
        variables.delta = (now - variables.prev) / 1000.0;
        variables.prev = now;
        variables.load = glsl.timeLoad;
        variables.time = (now - glsl.timeLoad) / 1000.0;
        variables.year = date.getFullYear();
        variables.month = date.getMonth();
        variables.date = date.getDate();
        variables.daytime = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001;
        this.variables = variables;
    }

    // update uniforms per program
    updateUniforms(program, key) {
        const gl = this.gl,
              variables = this.variables;
        gl.useProgram(program);
        if (this.nDelta > 1) {
            // set the delta time uniform
            gl.uniform1f(gl.getUniformLocation(program, 'u_delta'), variables.delta);
        }
        if (this.nTime > 1) {
            // set the elapsed time uniform
            gl.uniform1f(gl.getUniformLocation(program, 'u_time'), variables.time);
        }
        if (this.nDate) {
            // Set date uniform: year/month/day/time_in_sec
            gl.uniform4f(gl.getUniformLocation(program, 'u_date'), variables.year, variables.month, variables.date, variables.daytime);
        }
        // set the resolution uniform
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), this.canvas.width, this.canvas.height);
        // this.uniform('2f', 'vec2', 'u_resolution', this.canvas.width, this.canvas.height);
        for (let key in this.buffers) {
            const buffer = this.buffers[key];
            gl.uniform1i(gl.getUniformLocation(program, buffer.name), buffer.bundle.input.index);
        }
        this.TEXTURE_COUNT = this.BUFFER_COUNT;
        for (let name in this.textures) {
            if (this.uniformTexture(name, null, {
                filtering: 'mipmap',
                repeat: true
            })) {
                const texture = this.textures[name];
                gl.activeTexture(gl.TEXTURE0 + this.TEXTURE_COUNT);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(gl.getUniformLocation(program, name), this.TEXTURE_COUNT);
                gl.uniform2f(gl.getUniformLocation(program, name + 'Resolution'), texture.width, texture.height);
                this.TEXTURE_COUNT++;
            }
        }
    }

    // parse input strings
    getBuffers(fragString) {
        let buffers = {};
        if (fragString) {
            fragString.replace(new RegExp('(defined\\s*\\(\\s*BUFFER_)(\\d+)\\s*\\)', 'g'), function (match, name, i) {
                buffers['u_buffer_' + i] = {
                    fragment: '#define BUFFER_' + i + '\n' + fragString
                };
            });
        }
        return buffers;
    }

    // load buffers programs
    loadPrograms(buffers) {
        const glsl = this;
        const gl = this.gl;
        let i = 0;
        const vertex = createShader(glsl, glsl.vertexString, gl.VERTEX_SHADER);
        for (let key in buffers) {
            const buffer = buffers[key];
            let fragment = createShader(glsl, buffer.fragment, gl.FRAGMENT_SHADER, 1);
            if (!fragment) {
                fragment = createShader(glsl, 'void main(){\n\tgl_FragColor = vec4(1.0);\n}', gl.FRAGMENT_SHADER);
                glsl.isValid = false;
            } else {
                glsl.isValid = true;
            }
            const program = createProgram(glsl, [vertex, fragment]);
            buffer.name = 'u_buffer_' + i;
            buffer.program = program;
            buffer.bundle = glsl.createSwappableBuffer(glsl.canvas.width, glsl.canvas.height, program);
            gl.deleteShader(fragment);
            i++;
        }
        gl.deleteShader(vertex);
    }

    // create an input / output swappable buffer
    createSwappableBuffer(W, H, program) {
        var input = this.createBuffer(W, H, program);
        var output = this.createBuffer(W, H, program);
        const gl = this.gl;
        return {
            input: input,
            output: output,
            swap: function () {
                var temp = input;
                input = output;
                output = temp;
                this.input = input;
                this.output = output;
            },
            render: function (W, H, program, name) {
                gl.useProgram(program);
                gl.viewport(0, 0, W, H);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.input.buffer);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.output.texture, 0);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                this.swap();
            },
            resize: function (W, H, program, name) {
                gl.useProgram(program);
                gl.viewport(0, 0, W, H);
                this.input.resize(W, H);
                this.output.resize(W, H);
            }
        };
    }

    // create a buffers
    createBuffer(W, H, program) {
        const gl = this.gl;
        let index = this.BUFFER_COUNT;
        this.BUFFER_COUNT += 2;
        gl.getExtension('OES_texture_float');
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var buffer = gl.createFramebuffer();
        return {
            index: index,
            texture: texture,
            buffer: buffer,
            W: W,
            H: H,
            resize: function (W, H) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
                var minW = Math.min(W, this.W);
                var minH = Math.min(H, this.H);
                var pixels = new Float32Array(minW * minH * 4);
                gl.readPixels(0, 0, minW, minH, gl.RGBA, gl.FLOAT, pixels);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                var newIndex = index + 1;
                var newTexture = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0 + newIndex);
                gl.bindTexture(gl.TEXTURE_2D, newTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.FLOAT, null);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, minW, minH, gl.RGBA, gl.FLOAT, pixels);
                var newBuffer = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.deleteTexture(texture);
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, newTexture);
                index = this.index = index;
                texture = this.texture = newTexture;
                buffer = this.buffer = newBuffer;
                this.W = W;
                this.H = H;
            }
        };
    }

    // resize buffers on canvas resize
    // consider applying a throttle of 50 ms on canvas resize
    // to avoid requestAnimationFrame and Gl violations
    resizeSwappableBuffers() {
        const gl = this.gl;
        const W = gl.canvas.width,
              H = gl.canvas.height;
        gl.viewport(0, 0, W, H);
        for (let key in this.buffers) {
            const buffer = this.buffers[key];
            buffer.bundle.resize(W, H, buffer.program, buffer.name);
        }
        gl.useProgram(this.program);
    }

}

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

module.exports = GlslCanvas;
