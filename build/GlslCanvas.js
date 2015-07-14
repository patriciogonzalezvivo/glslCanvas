(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
The MIT License (MIT)

Copyright (c) 2015 Patricio Gonzalez Vivo ( http://www.patriciogonzalezvivo.com )

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _tools = require("./tools");

var _gl2 = require("./gl");

var GlslCanvas = (function () {
	function GlslCanvas(canvas) {
		_classCallCheck(this, GlslCanvas);

		this.canvas = canvas;
		this.isValid = false;

		var gl = (0, _gl2.setupWebGL)(canvas);
		if (!gl) {
			return;
		}
		this.gl = gl;
		this.timeLoad = Date.now();

		// Load shader
		var fragContent = "";
		if (canvas.hasAttribute("data-fragment")) {
			fragContent = canvas.getAttribute("data-fragment");
		} else if (canvas.hasAttribute("data-fragment-url")) {
			var source = canvas.getAttribute("data-fragment-url");
			fragContent = (0, _tools.fetchHTTP)(source);
		} else {
			console.log("No data");
			return;
		}

		this.load(fragContent);

		if (!this.program) {
			return;
		}

		// Construct VBO
		this.vbo = [];
		if (this.program) {
			// Define UVS buffer
			var uvs = undefined;
			var texCoordLocation = gl.getAttribLocation(this.program, "a_texcoord");
			uvs = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, uvs);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(texCoordLocation);
			gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
			this.vbo.push(uvs);

			// Define Vertex buffer
			var vertices = undefined;
			var positionLocation = gl.getAttribLocation(this.program, "a_position");
			vertices = gl.createBuffer();
			this.gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
			this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(positionLocation);
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
			this.vbo.push(vertices);
		}

		// load TEXTURES
		this.textures = [];
		var bLoadTextures = canvas.hasAttribute("data-textures");
		if (bLoadTextures) {
			var imgList = canvas.getAttribute("data-textures").split(",");
			for (var nImg in imgList) {
				console.log("Loading texture: " + imgList[nImg]);

				this.textures.push(gl.createTexture());

				gl.bindTexture(gl.TEXTURE_2D, this.textures[nImg]);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 0, 255])); // red

				this.textures[nImg].image = new Image();
				this.textures[nImg].image.onload = (function (_canvas, _gl, _program, _textures, _tex, render) {
					return function () {
						(0, _gl2.loadTexture)(_gl, _tex);
						render(_canvas, _gl, _program, _textures);
					};
				})(this.canvas, this.gl, this.program, this.textures, this.textures[nImg], this.render);
				this.textures[nImg].image.src = imgList[nImg];
			}
		}

		this.render({ mouse: { x: 0, y: 0 }, forceRender: true });
	}

	_createClass(GlslCanvas, [{
		key: "load",
		value: function load(fragString, vertString) {

			// Load default vertex shader if no one is pass
			if (!vertString) {
				vertString = "\nprecision mediump float;\nuniform vec2 u_resolution;\nuniform float u_time;\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\nvarying vec2 v_texcoord;\nvoid main() {\n \tgl_Position = vec4(a_position, 0.0, 1.0);\n \tv_texcoord = a_texcoord;\n }";
			}

			// Load default fragment shader if no one is pass
			if (!fragString) {
				fragString += "\nuniform vec2 u_resolution;\nuniform float u_time;\nvarying vec2 v_texcoord;\nvoid main(){\n\tvec2 st = gl_FragCoord.xy/u_resolution;\n\tgl_FragColor = vec4(st.x,st.y,abs(sin(u_time)),1.0);\n}";
			}

			this.vertexString = vertString;
			this.fragmentString = fragString;

			this.animated = false;
			var nTimes = (fragString.match(/u_time/g) || []).length;
			var nMouse = (fragString.match(/u_mouse/g) || []).length;
			this.animated = nTimes > 1 || nMouse > 1;

			var vertexShader = (0, _gl2.createShader)(this.gl, vertString, this.gl.VERTEX_SHADER);
			var fragmentShader = (0, _gl2.createShader)(this.gl, fragString, this.gl.FRAGMENT_SHADER);

			// If Fragment shader fails load a empty one to sign the error
			if (!fragmentShader) {
				fragmentShader = (0, _gl2.createShader)(this.gl, "void main(){\n\tgl_FragColor = vec4(1.0);\n}", this.gl.FRAGMENT_SHADER);
				this.isValid = false;
			} else {
				this.isValid = true;
			}

			// Create and use program
			var program = (0, _gl2.createProgram)(this.gl, [vertexShader, fragmentShader]);
			this.gl.useProgram(program);

			// Delete shaders
			this.gl.detachShader(program, vertexShader);
			this.gl.detachShader(program, fragmentShader);
			this.gl.deleteShader(vertexShader);
			this.gl.deleteShader(fragmentShader);

			this.program = program;
		}
	}, {
		key: "render",
		value: function render(_ref) {
			var forceRender = _ref.forceRender;
			var mouse = _ref.mouse;

			if (forceRender || this.animated && (0, _tools.isCanvasVisible)(this.canvas)) {

				// set the time uniform
				var timeFrame = Date.now();
				var time = (timeFrame - this.timeLoad) / 1000.0;
				var timeLocation = this.gl.getUniformLocation(this.program, "u_time");
				this.gl.uniform1f(timeLocation, time);

				// set the mouse uniform
				var rect = this.canvas.getBoundingClientRect();
				if (mouse && mouse.x >= rect.left && mouse.x <= rect.right && mouse.y >= rect.top && mouse.y <= rect.bottom) {

					var mouseLocation = this.gl.getUniformLocation(this.program, "u_mouse");
					this.gl.uniform2f(mouseLocation, mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
				}

				// set the resolution uniform
				var resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
				this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

				for (var i = 0; i < this.textures.length; ++i) {

					this.gl.uniform1i(this.gl.getUniformLocation(this.program, "u_tex" + i), i);
					this.gl.uniform2f(this.gl.getUniformLocation(this.program, "u_tex" + i + "Resolution"), this.textures[i].image.width, this.textures[i].image.height);

					this.gl.activeTexture(this.gl.TEXTURE0 + i);
					this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[i]);
				}

				// Draw the rectangle.
				this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
				// console.log("Render " + time);
			}
		}
	}, {
		key: "version",
		value: function version() {
			return "0.0.1";
		}
	}]);

	return GlslCanvas;
})();

exports["default"] = GlslCanvas;
;

window.GlslCanvas = GlslCanvas;
module.exports = exports["default"];

},{"./gl":2,"./tools":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.loadTexture = loadTexture;
exports.setupWebGL = setupWebGL;
exports.create3DContext = create3DContext;
exports.createShader = createShader;
exports.createProgram = createProgram;
var lastError = '';

function loadTexture(_gl, _texture) {
	_gl.bindTexture(_gl.TEXTURE_2D, _texture);
	_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true);
	_gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, _texture.image);
	if (isPowerOf2(_texture.image.width) && isPowerOf2(_texture.image.height)) {
		_gl.generateMipmap(_gl.TEXTURE_2D);
		_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
		_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR);
	} else {
		_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
		_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
		_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
	}
	_gl.bindTexture(_gl.TEXTURE_2D, null);
}

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function makeFailHTML(msg) {
	return '' + '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' + '<td align="center">' + '<div style="display: table-cell; vertical-align: middle;">' + '<div style="">' + msg + '</div>' + '</div>' + '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' + 'It doesn\'t appear your computer can support WebGL.<br/>' + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */

function setupWebGL(_canvas, _opt_attribs) {

	function showLink(str) {
		var container = _canvas.parentNode;
		if (container) {
			container.innerHTML = makeFailHTML(str);
		}
	};

	if (!window.WebGLRenderingContext) {
		showLink(GET_A_WEBGL_BROWSER);
		return null;
	}

	var context = create3DContext(_canvas, _opt_attribs);
	if (!context) {
		showLink(OTHER_PROBLEM);
	}
	context.getExtension('OES_standard_derivatives');
	return context;
}

;

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */

function create3DContext(_canvas, _opt_attribs) {
	var names = ['webgl', 'experimental-webgl'];
	var context = null;
	for (var ii = 0; ii < names.length; ++ii) {
		try {
			context = _canvas.getContext(names[ii], _opt_attribs);
		} catch (e) {}
		if (context) {
			break;
		}
	}
	return context;
}

/*
 *	Create a Vertex of a specific type (gl.VERTEX_SHADER/)
 */

function createShader(_gl, _source, _type) {
	var shader = _gl.createShader(_type);
	_gl.shaderSource(shader, _source);
	_gl.compileShader(shader);

	var compiled = _gl.getShaderParameter(shader, _gl.COMPILE_STATUS);

	if (!compiled) {
		// Something went wrong during compilation; get the error
		lastError = _gl.getShaderInfoLog(shader);
		console.error('*** Error compiling shader \'' + shader + '\':' + lastError);
		_gl.deleteShader(shader);
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

function createProgram(gl, shaders, opt_attribs, opt_locations) {
	var program = gl.createProgram();
	for (var ii = 0; ii < shaders.length; ++ii) {
		gl.attachShader(program, shaders[ii]);
	}
	if (opt_attribs) {
		for (var ii = 0; ii < opt_attribs.length; ++ii) {
			gl.bindAttribLocation(program, opt_locations ? opt_locations[ii] : ii, opt_attribs[ii]);
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

;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isCanvasVisible = isCanvasVisible;
exports.isPowerOf2 = isPowerOf2;
exports.nextHighestPowerOfTwo = nextHighestPowerOfTwo;
exports.fetchHTTP = fetchHTTP;
exports.FormatNumberLength = FormatNumberLength;
exports.getMousePos = getMousePos;

function isCanvasVisible(_canvas) {
	return _canvas.getBoundingClientRect().top + _canvas.height > 0 && _canvas.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight);
}

;

function isPowerOf2(value) {
	return (value & value - 1) == 0;
}

;

function nextHighestPowerOfTwo(x) {
	--x;
	for (var i = 1; i < 32; i <<= 1) {
		x = x | x >> i;
	}
	return x + 1;
}

;

/*
 *	Fetch for files
 */

function fetchHTTP(url, methood) {
	var request = new XMLHttpRequest(),
	    response;

	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			response = request.responseText;
		}
	};
	request.open(methood ? methood : "GET", url, false);
	request.overrideMimeType("text/plain");
	request.send();
	return response;
}

function FormatNumberLength(_num, _length) {
	var r = "" + _num;
	while (r.length < _length) {
		r = "0" + r;
	}
	return r;
}

function getMousePos(_canvas, _evt) {
	var rect = _canvas.getBoundingClientRect();
	return {
		x: _evt.clientX - rect.left,
		y: _evt.clientY - rect.top
	};
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmljaW8vZ2xzbENhbnZhcy9zcmMvR2xzbENhbnZhcy5qcyIsIi9Vc2Vycy9wYXRyaWNpby9nbHNsQ2FudmFzL3NyYy9nbC5qcyIsIi9Vc2Vycy9wYXRyaWNpby9nbHNsQ2FudmFzL3NyYy90b29scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN1QjJDLFNBQVM7O21CQUNpQixNQUFNOztJQUV0RCxVQUFVO0FBQ25CLFVBRFMsVUFBVSxDQUNsQixNQUFNLEVBQUU7d0JBREEsVUFBVTs7QUFHN0IsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsTUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0FBRXJCLE1BQUksRUFBRSxHQUFHLFNBUkYsVUFBVSxFQVFHLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPO0dBQ1A7QUFDRCxNQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7QUFHM0IsTUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUN6QyxjQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztHQUNuRCxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO0FBQ3BELE9BQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RCxjQUFXLEdBQUcsV0F0QlIsU0FBUyxFQXNCUyxNQUFNLENBQUMsQ0FBQztH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QUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFO0tBQUUsUUFBUSxDQUFDOztBQUU3QyxRQUFPLENBQUMsa0JBQWtCLEdBQUcsWUFBWTtBQUN4QyxNQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO0FBQ3ZELFdBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0dBQ2hDO0VBQ0QsQ0FBQTtBQUNELFFBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxRQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixRQUFPLFFBQVEsQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDOUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxFQUFFO0FBQ3ZCLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQ2Y7QUFDRCxRQUFPLENBQUMsQ0FBQztDQUNaOztBQUVNLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDMUMsS0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDM0MsUUFBTztBQUNOLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO0FBQzNCLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHO0VBQzFCLENBQUM7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBQYXRyaWNpbyBHb256YWxleiBWaXZvICggaHR0cDovL3d3dy5wYXRyaWNpb2dvbnphbGV6dml2by5jb20gKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG51c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxudGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1NcbkZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG5JTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IGZldGNoSFRUUCwgaXNDYW52YXNWaXNpYmxlIH0gZnJvbSBcIi4vdG9vbHNcIlxuaW1wb3J0IHsgc2V0dXBXZWJHTCwgY3JlYXRlU2hhZGVyLCBjcmVhdGVQcm9ncmFtLCBsb2FkVGV4dHVyZSB9IGZyb20gXCIuL2dsXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xzbENhbnZhcyB7XG5cdGNvbnN0cnVjdG9yKGNhbnZhcykge1xuXG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0dGhpcy5pc1ZhbGlkID0gZmFsc2U7XG5cblx0XHRsZXQgZ2wgPSBzZXR1cFdlYkdMKGNhbnZhcyk7XG5cdFx0aWYgKCFnbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmdsID0gZ2w7XG5cdFx0dGhpcy50aW1lTG9hZCA9IERhdGUubm93KCk7XG5cblx0XHQvLyBMb2FkIHNoYWRlclxuXHRcdGxldCBmcmFnQ29udGVudCA9IFwiXCI7XG5cdFx0aWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50XCIpKSB7XG5cdFx0XHRmcmFnQ29udGVudCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQnKTtcblx0XHR9IGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50LXVybFwiKSkge1xuXHRcdFx0bGV0IHNvdXJjZSA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtdXJsJyk7XG5cdFx0XHRmcmFnQ29udGVudCA9IGZldGNoSFRUUChzb3VyY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk5vIGRhdGFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkKGZyYWdDb250ZW50KTtcblxuXHRcdGlmICghdGhpcy5wcm9ncmFtKXtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIENvbnN0cnVjdCBWQk9cblx0XHR0aGlzLnZibyA9IFtdO1xuXHRcdGlmICh0aGlzLnByb2dyYW0pIHtcblx0XHRcdC8vIERlZmluZSBVVlMgYnVmZmVyXG5cdFx0XHRsZXQgdXZzO1xuXHRcdFx0bGV0IHRleENvb3JkTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwiYV90ZXhjb29yZFwiKTtcblx0XHRcdHV2cyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXHRcdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB1dnMpO1xuXHRcdFx0Z2wuYnVmZmVyRGF0YSggZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFswLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQwLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQwLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAxLjBdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRleENvb3JkTG9jYXRpb24gKTtcblx0XHRcdGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRleENvb3JkTG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cdFx0XHR0aGlzLnZiby5wdXNoKHV2cyk7XG5cdFx0XHRcblx0XHRcdC8vIERlZmluZSBWZXJ0ZXggYnVmZmVyXG5cdFx0XHRsZXQgdmVydGljZXM7XG5cdFx0XHRsZXQgcG9zaXRpb25Mb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuXHRcdFx0dmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdHRoaXMuZ2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0aWNlcyk7XG5cdFx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbLTEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC0xLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQtMS4wLCAgMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAtMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBwb3NpdGlvbkxvY2F0aW9uICk7XG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBwb3NpdGlvbkxvY2F0aW9uICwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblx0XHRcdHRoaXMudmJvLnB1c2godmVydGljZXMpO1xuXHRcdH1cblx0XHRcblx0XHQvLyBsb2FkIFRFWFRVUkVTXG5cdFx0dGhpcy50ZXh0dXJlcyA9IFtdO1xuXHRcdGxldCBiTG9hZFRleHR1cmVzID0gY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpO1xuXHRcdGlmIChiTG9hZFRleHR1cmVzKSB7XG5cdFx0XHRsZXQgaW1nTGlzdCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dHVyZXMnKS5zcGxpdCgnLCcpO1xuXHRcdFx0Zm9yIChsZXQgbkltZyBpbiBpbWdMaXN0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTG9hZGluZyB0ZXh0dXJlOiBcIiArIGltZ0xpc3RbbkltZ10pO1xuXG5cdFx0XHRcdHRoaXMudGV4dHVyZXMucHVzaChnbC5jcmVhdGVUZXh0dXJlKCkpO1xuXG5cdFx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbbkltZ10pO1xuXHRcdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIDEsIDEsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG5ldyBVaW50OEFycmF5KFsyNTUsIDI1NSwgMCwgMjU1XSkpOyAvLyByZWRcblxuXHRcdFx0XHR0aGlzLnRleHR1cmVzW25JbWddLmltYWdlID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdHRoaXMudGV4dHVyZXNbbkltZ10uaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oX2NhbnZhcyxfZ2wsX3Byb2dyYW0sX3RleHR1cmVzLF90ZXgscmVuZGVyKSB7IFxuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGxvYWRUZXh0dXJlKF9nbCwgX3RleCk7IFxuXHRcdFx0XHRcdFx0cmVuZGVyKF9jYW52YXMsIF9nbCwgX3Byb2dyYW0sIF90ZXh0dXJlcylcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KHRoaXMuY2FudmFzLHRoaXMuZ2wsdGhpcy5wcm9ncmFtLCB0aGlzLnRleHR1cmVzLCB0aGlzLnRleHR1cmVzW25JbWddLHRoaXMucmVuZGVyKTtcblx0ICBcdFx0XHR0aGlzLnRleHR1cmVzW25JbWddLmltYWdlLnNyYyA9IGltZ0xpc3RbbkltZ107XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5yZW5kZXIoIHsgbW91c2U6IHt4OiAwLCB5OiAwfSwgZm9yY2VSZW5kZXI6IHRydWUgfSk7XG5cdH1cblxuXHRsb2FkKCBmcmFnU3RyaW5nLCB2ZXJ0U3RyaW5nICkge1xuXG5cdFx0Ly8gTG9hZCBkZWZhdWx0IHZlcnRleCBzaGFkZXIgaWYgbm8gb25lIGlzIHBhc3Ncblx0XHRpZiAoIXZlcnRTdHJpbmcpIHtcblx0XHRcdHZlcnRTdHJpbmcgPSBcIlxcblxcXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXFxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XFxuXFxcbmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XFxuXFxcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Y29vcmQ7XFxuXFxcbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xcblxcXG52b2lkIG1haW4oKSB7XFxuXFxcbiBcdGdsX1Bvc2l0aW9uID0gdmVjNChhX3Bvc2l0aW9uLCAwLjAsIDEuMCk7XFxuXFxcbiBcdHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xcblxcXG4gfVwiO1xuXHRcdH1cblxuXHRcdC8vIExvYWQgZGVmYXVsdCBmcmFnbWVudCBzaGFkZXIgaWYgbm8gb25lIGlzIHBhc3Ncblx0XHRpZiAoIWZyYWdTdHJpbmcpIHtcblx0XHRcdGZyYWdTdHJpbmcgKz0gXCJcXG5cXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXFxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XFxuXFxcbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xcblxcXG52b2lkIG1haW4oKXtcXG5cXFxuXHR2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbjtcXG5cXFxuXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KHN0Lngsc3QueSxhYnMoc2luKHVfdGltZSkpLDEuMCk7XFxuXFxcbn1cIjtcblx0XHR9XG5cblx0XHR0aGlzLnZlcnRleFN0cmluZyA9IHZlcnRTdHJpbmc7XG5cdFx0dGhpcy5mcmFnbWVudFN0cmluZyA9IGZyYWdTdHJpbmc7XG5cblx0XHR0aGlzLmFuaW1hdGVkID0gZmFsc2U7XG5cdFx0bGV0IG5UaW1lcyA9IChmcmFnU3RyaW5nLm1hdGNoKC91X3RpbWUvZykgfHwgW10pLmxlbmd0aDtcblx0XHRsZXQgbk1vdXNlID0gKGZyYWdTdHJpbmcubWF0Y2goL3VfbW91c2UvZykgfHwgW10pLmxlbmd0aDtcblx0XHR0aGlzLmFuaW1hdGVkID0gblRpbWVzID4gMSB8fCBuTW91c2UgPiAxO1xuXG5cdFx0bGV0IHZlcnRleFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCB2ZXJ0U3RyaW5nLCB0aGlzLmdsLlZFUlRFWF9TSEFERVIpO1xuXHRcdGxldCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCBmcmFnU3RyaW5nLCB0aGlzLmdsLkZSQUdNRU5UX1NIQURFUik7XG5cblx0XHQvLyBJZiBGcmFnbWVudCBzaGFkZXIgZmFpbHMgbG9hZCBhIGVtcHR5IG9uZSB0byBzaWduIHRoZSBlcnJvclxuXHRcdGlmICghZnJhZ21lbnRTaGFkZXIpIHtcblx0XHRcdGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKHRoaXMuZ2wsIFwidm9pZCBtYWluKCl7XFxuXFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCgxLjApO1xcbn1cIiwgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuXHRcdFx0dGhpcy5pc1ZhbGlkID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuaXNWYWxpZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIGFuZCB1c2UgcHJvZ3JhbVxuXHRcdGxldCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbSh0aGlzLmdsLCBbdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcl0pO1xuXHRcdHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuXHRcdC8vIERlbGV0ZSBzaGFkZXJzXG5cdFx0dGhpcy5nbC5kZXRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcblx0XHR0aGlzLmdsLmRldGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG5cdFx0dGhpcy5nbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblx0XHR0aGlzLmdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG5cblx0XHR0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuXHR9XG5cblx0cmVuZGVyKHsgZm9yY2VSZW5kZXIsIG1vdXNlIH0pIHtcblxuXHRcdGlmIChmb3JjZVJlbmRlciB8fCAodGhpcy5hbmltYXRlZCAmJiBpc0NhbnZhc1Zpc2libGUodGhpcy5jYW52YXMpKSkge1xuXG5cdFx0XHQvLyBzZXQgdGhlIHRpbWUgdW5pZm9ybVxuXHRcdFx0bGV0IHRpbWVGcmFtZSA9IERhdGUubm93KCk7XG5cdFx0XHRsZXQgdGltZSA9ICh0aW1lRnJhbWUtdGhpcy50aW1lTG9hZCkgLyAxMDAwLjA7XG5cdFx0XHRsZXQgdGltZUxvY2F0aW9uID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcInVfdGltZVwiKTtcblx0XHRcdHRoaXMuZ2wudW5pZm9ybTFmKHRpbWVMb2NhdGlvbiwgdGltZSk7XG5cblx0XHRcdC8vIHNldCB0aGUgbW91c2UgdW5pZm9ybVxuXHRcdFx0bGV0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChtb3VzZSAmJlxuXHRcdFx0XHRtb3VzZS54ID49IHJlY3QubGVmdCAmJiBcblx0XHRcdFx0bW91c2UueCA8PSByZWN0LnJpZ2h0ICYmIFxuXHRcdFx0XHRtb3VzZS55ID49IHJlY3QudG9wICYmXG5cdFx0XHRcdG1vdXNlLnkgPD0gcmVjdC5ib3R0b20pIHtcblxuXHRcdFx0XHRsZXQgbW91c2VMb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJ1X21vdXNlXCIpO1xuXHRcdFx0XHR0aGlzLmdsLnVuaWZvcm0yZihtb3VzZUxvY2F0aW9uLG1vdXNlLngtcmVjdC5sZWZ0LHRoaXMuY2FudmFzLmhlaWdodC0obW91c2UueS1yZWN0LnRvcCkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgdGhlIHJlc29sdXRpb24gdW5pZm9ybVxuXHRcdFx0bGV0IHJlc29sdXRpb25Mb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJ1X3Jlc29sdXRpb25cIik7XG5cdFx0XHR0aGlzLmdsLnVuaWZvcm0yZihyZXNvbHV0aW9uTG9jYXRpb24sIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGV4dHVyZXMubGVuZ3RoOyArK2kpe1xuXG5cdFx0XHRcdHRoaXMuZ2wudW5pZm9ybTFpKCB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5wcm9ncmFtLCBcInVfdGV4XCIraSksIGkpO1xuXHRcdFx0XHR0aGlzLmdsLnVuaWZvcm0yZiggdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMucHJvZ3JhbSwgXCJ1X3RleFwiK2krXCJSZXNvbHV0aW9uXCIpLCBcblx0XHRcdFx0XHRcdFx0XHRcdFx0IHRoaXMudGV4dHVyZXNbaV0uaW1hZ2Uud2lkdGgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCB0aGlzLnRleHR1cmVzW2ldLmltYWdlLmhlaWdodCk7XG5cblx0XHRcdFx0dGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTAraSk7XG5cdFx0XHRcdHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzW2ldKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdC8vIERyYXcgdGhlIHJlY3RhbmdsZS5cblx0XHRcdHRoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgNik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIlJlbmRlciBcIiArIHRpbWUpO1xuXHRcdH1cblx0fVxuXG5cdHZlcnNpb24oKSB7XG5cdFx0cmV0dXJuIFwiMC4wLjFcIjtcblx0fVxufTtcblxud2luZG93Lkdsc2xDYW52YXMgPSBHbHNsQ2FudmFzOyIsInZhciBsYXN0RXJyb3IgPSBcIlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmUoX2dsLCBfdGV4dHVyZSkge1xuXHRfZ2wuYmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIF90ZXh0dXJlKTtcblx0X2dsLnBpeGVsU3RvcmVpKF9nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcblx0X2dsLnRleEltYWdlMkQoX2dsLlRFWFRVUkVfMkQsIDAsIF9nbC5SR0JBLCBfZ2wuUkdCQSwgX2dsLlVOU0lHTkVEX0JZVEUsIF90ZXh0dXJlLmltYWdlKTtcblx0aWYgKGlzUG93ZXJPZjIoX3RleHR1cmUuaW1hZ2Uud2lkdGgpICYmIGlzUG93ZXJPZjIoX3RleHR1cmUuaW1hZ2UuaGVpZ2h0KSApIHtcblx0XHRfZ2wuZ2VuZXJhdGVNaXBtYXAoX2dsLlRFWFRVUkVfMkQpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBfZ2wuTElORUFSKTtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgX2dsLkxJTkVBUl9NSVBNQVBfTElORUFSKTtcblx0fSBlbHNlIHtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfV1JBUF9TLCBfZ2wuQ0xBTVBfVE9fRURHRSk7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfVCwgX2dsLkNMQU1QX1RPX0VER0UpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBfZ2wuTElORUFSKTtcblx0fVxuXHRfZ2wuYmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIG51bGwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIEhUTE0gZm9yIGEgZmFpbHVyZSBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FudmFzQ29udGFpbmVySWQgaWQgb2YgY29udGFpbmVyIG9mIHRoXG4gKiAgICAgICAgY2FudmFzLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgaHRtbC5cbiAqL1xudmFyIG1ha2VGYWlsSFRNTCA9IGZ1bmN0aW9uKG1zZykge1xuIFx0cmV0dXJuICcnICtcblx0XHQnPHRhYmxlIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzhDRTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj48dHI+JyArXG5cdFx0Jzx0ZCBhbGlnbj1cImNlbnRlclwiPicgK1xuXHRcdCc8ZGl2IHN0eWxlPVwiZGlzcGxheTogdGFibGUtY2VsbDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcIj4nICtcblx0XHQnPGRpdiBzdHlsZT1cIlwiPicgKyBtc2cgKyAnPC9kaXY+JyArXG5cdFx0JzwvZGl2PicgK1xuXHRcdCc8L3RkPjwvdHI+PC90YWJsZT4nO1xufTtcblxuLyoqXG4gKiBNZXNhc2dlIGZvciBnZXR0aW5nIGEgd2ViZ2wgYnJvd3NlclxuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIEdFVF9BX1dFQkdMX0JST1dTRVIgPSAnJyArXG5cdCdUaGlzIHBhZ2UgcmVxdWlyZXMgYSBicm93c2VyIHRoYXQgc3VwcG9ydHMgV2ViR0wuPGJyLz4nICtcblx0JzxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZ1wiPkNsaWNrIGhlcmUgdG8gdXBncmFkZSB5b3VyIGJyb3dzZXIuPC9hPic7XG5cbi8qKlxuICogTWVzYXNnZSBmb3IgbmVlZCBiZXR0ZXIgaGFyZHdhcmVcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciBPVEhFUl9QUk9CTEVNID0gJycgK1xuXHRcIkl0IGRvZXNuJ3QgYXBwZWFyIHlvdXIgY29tcHV0ZXIgY2FuIHN1cHBvcnQgV2ViR0wuPGJyLz5cIiArXG5cdCc8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvdHJvdWJsZXNob290aW5nL1wiPkNsaWNrIGhlcmUgZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9hPic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHdlYmdsIGNvbnRleHQuIElmIGNyZWF0aW9uIGZhaWxzIGl0IHdpbGxcbiAqIGNoYW5nZSB0aGUgY29udGVudHMgb2YgdGhlIGNvbnRhaW5lciBvZiB0aGUgPGNhbnZhcz5cbiAqIHRhZyB0byBhbiBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGNvcnJlY3QgbGlua3MgZm9yIFdlYkdMLlxuICogQHBhcmFtIHtFbGVtZW50fSBjYW52YXMuIFRoZSBjYW52YXMgZWxlbWVudCB0byBjcmVhdGUgYVxuICogICAgIGNvbnRleHQgZnJvbS5cbiAqIEBwYXJhbSB7V2ViR0xDb250ZXh0Q3JlYXRpb25BdHRpcmJ1dGVzfSBvcHRfYXR0cmlicyBBbnlcbiAqICAgICBjcmVhdGlvbiBhdHRyaWJ1dGVzIHlvdSB3YW50IHRvIHBhc3MgaW4uXG4gKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IFRoZSBjcmVhdGVkIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFdlYkdMIChfY2FudmFzLCBfb3B0X2F0dHJpYnMpIHtcblxuXHRmdW5jdGlvbiBzaG93TGluayhzdHIpIHtcblx0XHR2YXIgY29udGFpbmVyID0gX2NhbnZhcy5wYXJlbnROb2RlO1xuXHRcdGlmIChjb250YWluZXIpIHtcblx0XHQgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBtYWtlRmFpbEhUTUwoc3RyKTtcblx0XHR9XG5cdH07XG5cblx0aWYgKCF3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0c2hvd0xpbmsoR0VUX0FfV0VCR0xfQlJPV1NFUik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgY29udGV4dCA9IGNyZWF0ZTNEQ29udGV4dChfY2FudmFzLCBfb3B0X2F0dHJpYnMpO1xuXHRpZiAoIWNvbnRleHQpIHtcblx0XHRzaG93TGluayhPVEhFUl9QUk9CTEVNKTtcblx0fVxuXHRjb250ZXh0LmdldEV4dGVuc2lvbignT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJyk7XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgd2ViZ2wgY29udGV4dC5cbiAqIEBwYXJhbSB7IUNhbnZhc30gY2FudmFzIFRoZSBjYW52YXMgdGFnIHRvIGdldCBjb250ZXh0XG4gKiAgICAgZnJvbS4gSWYgb25lIGlzIG5vdCBwYXNzZWQgaW4gb25lIHdpbGwgYmUgY3JlYXRlZC5cbiAqIEByZXR1cm4geyFXZWJHTENvbnRleHR9IFRoZSBjcmVhdGVkIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUzRENvbnRleHQoX2NhbnZhcywgX29wdF9hdHRyaWJzKSB7XG5cdHZhciBuYW1lcyA9IFtcIndlYmdsXCIsIFwiZXhwZXJpbWVudGFsLXdlYmdsXCJdO1xuXHR2YXIgY29udGV4dCA9IG51bGw7XG5cdGZvciAodmFyIGlpID0gMDsgaWkgPCBuYW1lcy5sZW5ndGg7ICsraWkpIHtcblx0XHR0cnkge1xuXHQgIFx0XHRjb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2lpXSwgX29wdF9hdHRyaWJzKTtcblx0XHR9IGNhdGNoKGUpIHt9XG5cdFx0XHRpZiAoY29udGV4dCkge1xuXHQgIFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29udGV4dDtcbn1cblxuLypcbiAqXHRDcmVhdGUgYSBWZXJ0ZXggb2YgYSBzcGVjaWZpYyB0eXBlIChnbC5WRVJURVhfU0hBREVSLylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihfZ2wsIF9zb3VyY2UsIF90eXBlKSB7XG5cdHZhciBzaGFkZXIgPSBfZ2wuY3JlYXRlU2hhZGVyKCBfdHlwZSApO1xuXHRfZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgX3NvdXJjZSk7XG5cdF9nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cblx0dmFyIGNvbXBpbGVkID0gX2dsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIF9nbC5DT01QSUxFX1NUQVRVUyk7XG5cdFxuXHRpZiAoIWNvbXBpbGVkKSB7XG5cdFx0Ly8gU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIGNvbXBpbGF0aW9uOyBnZXQgdGhlIGVycm9yXG5cdFx0bGFzdEVycm9yID0gX2dsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcblx0XHRjb25zb2xlLmVycm9yKFwiKioqIEVycm9yIGNvbXBpbGluZyBzaGFkZXIgJ1wiICsgc2hhZGVyICsgXCInOlwiICsgbGFzdEVycm9yKTtcblx0XHRfZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gc2hhZGVyO1xufVxuXG4vKipcbiAqIExvYWRzIGEgc2hhZGVyLlxuICogQHBhcmFtIHshV2ViR0xDb250ZXh0fSBnbCBUaGUgV2ViR0xDb250ZXh0IHRvIHVzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaGFkZXJTb3VyY2UgVGhlIHNoYWRlciBzb3VyY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc2hhZGVyVHlwZSBUaGUgdHlwZSBvZiBzaGFkZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyk6IHZvaWQpIG9wdF9lcnJvckNhbGxiYWNrIGNhbGxiYWNrIGZvciBlcnJvcnMuXG4gKiBAcmV0dXJuIHshV2ViR0xTaGFkZXJ9IFRoZSBjcmVhdGVkIHNoYWRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHNoYWRlcnMsIG9wdF9hdHRyaWJzLCBvcHRfbG9jYXRpb25zKSB7XG5cdHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXHRmb3IgKHZhciBpaSA9IDA7IGlpIDwgc2hhZGVycy5sZW5ndGg7ICsraWkpIHtcblx0XHRnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgc2hhZGVyc1tpaV0pO1xuXHR9XG5cdGlmIChvcHRfYXR0cmlicykge1xuXHRcdGZvciAodmFyIGlpID0gMDsgaWkgPCBvcHRfYXR0cmlicy5sZW5ndGg7ICsraWkpIHtcblx0ICBcdFx0Z2wuYmluZEF0dHJpYkxvY2F0aW9uKFxuXHRcdCAgXHRwcm9ncmFtLFxuXHRcdCAgXHRvcHRfbG9jYXRpb25zID8gb3B0X2xvY2F0aW9uc1tpaV0gOiBpaSxcblx0XHQgIFx0b3B0X2F0dHJpYnNbaWldKTtcblx0XHR9XG5cdH1cblx0Z2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cblx0Ly8gQ2hlY2sgdGhlIGxpbmsgc3RhdHVzXG5cdHZhciBsaW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcblx0aWYgKCFsaW5rZWQpIHtcblx0XHQvLyBzb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBsaW5rXG5cdFx0bGFzdEVycm9yID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHByb2dyYW0pO1xuXHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gcHJvZ3JhbSBsaW5raW5nOlwiICsgbGFzdEVycm9yKTtcblxuXHRcdGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cmV0dXJuIHByb2dyYW07XG59OyIsImV4cG9ydCBmdW5jdGlvbiBpc0NhbnZhc1Zpc2libGUoX2NhbnZhcyl7XG5cdHJldHVyblx0KChfY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIF9jYW52YXMuaGVpZ2h0KSA+IDApICYmIFxuXHRcdFx0KF9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQb3dlck9mMih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEhpZ2hlc3RQb3dlck9mVHdvKHgpIHtcbiAgICAtLXg7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgICB4ID0geCB8IHggPj4gaTtcbiAgICB9XG4gICAgcmV0dXJuIHggKyAxO1xufTtcblxuLypcbiAqXHRGZXRjaCBmb3IgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZldGNoSFRUUCh1cmwsIG1ldGhvb2Qpe1xuXHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCByZXNwb25zZTtcblxuXHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcblx0XHRcdHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG5cdFx0fVxuXHR9XG5cdHJlcXVlc3Qub3BlbihtZXRob29kID8gbWV0aG9vZCA6ICdHRVQnLCB1cmwsIGZhbHNlKTtcblx0cmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpblwiKTtcblx0cmVxdWVzdC5zZW5kKCk7XG5cdHJldHVybiByZXNwb25zZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm1hdE51bWJlckxlbmd0aChfbnVtLCBfbGVuZ3RoKSB7XG4gICAgdmFyIHIgPSBcIlwiICsgX251bTtcbiAgICB3aGlsZSAoci5sZW5ndGggPCBfbGVuZ3RoKSB7XG4gICAgICAgIHIgPSBcIjBcIiArIHI7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW91c2VQb3MoX2NhbnZhcywgX2V2dCkge1xuXHR2YXIgcmVjdCA9IF9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdHJldHVybiB7XG5cdFx0eDogX2V2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuXHRcdHk6IF9ldnQuY2xpZW50WSAtIHJlY3QudG9wXG5cdH07XG59Il19
