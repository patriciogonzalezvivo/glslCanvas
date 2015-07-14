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

var _gl = require("./gl");

var GlslCanvas = (function () {
	function GlslCanvas(canvas) {
		_classCallCheck(this, GlslCanvas);

		this.canvas = canvas;
		this.isValid = false;

		var gl = (0, _gl.setupWebGL)(canvas);
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
				this.textures[nImg].image.onload = (function (glsl_canvas, _tex) {
					//_canvas,_gl,_program,_textures,_tex,render) {
					return function () {
						(0, _gl.loadTexture)(glsl_canvas.gl, _tex);
						glsl_canvas.render({ forceRender: true });
					};
				})(this, this.textures[nImg]); //this.canvas,this.gl,this.program, this.textures, this.textures[nImg]);
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

			var vertexShader = (0, _gl.createShader)(this.gl, vertString, this.gl.VERTEX_SHADER);
			var fragmentShader = (0, _gl.createShader)(this.gl, fragString, this.gl.FRAGMENT_SHADER);

			// If Fragment shader fails load a empty one to sign the error
			if (!fragmentShader) {
				fragmentShader = (0, _gl.createShader)(this.gl, "void main(){\n\tgl_FragColor = vec4(1.0);\n}", this.gl.FRAGMENT_SHADER);
				this.isValid = false;
			} else {
				this.isValid = true;
			}

			// Create and use program
			var program = (0, _gl.createProgram)(this.gl, [vertexShader, fragmentShader]);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadTexture = loadTexture;
exports.setupWebGL = setupWebGL;
exports.create3DContext = create3DContext;
exports.createShader = createShader;
exports.createProgram = createProgram;

var _tools = require("./tools");

var lastError = "";

function loadTexture(_gl, _texture) {
	_gl.bindTexture(_gl.TEXTURE_2D, _texture);
	_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true);
	_gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, _texture.image);
	if ((0, _tools.isPowerOf2)(_texture.image.width) && (0, _tools.isPowerOf2)(_texture.image.height)) {
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
	return "" + "<table style=\"background-color: #8CE; width: 100%; height: 100%;\"><tr>" + "<td align=\"center\">" + "<div style=\"display: table-cell; vertical-align: middle;\">" + "<div style=\"\">" + msg + "</div>" + "</div>" + "</td></tr></table>";
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = "" + "This page requires a browser that supports WebGL.<br/>" + "<a href=\"http://get.webgl.org\">Click here to upgrade your browser.</a>";

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = "" + "It doesn't appear your computer can support WebGL.<br/>" + "<a href=\"http://get.webgl.org/troubleshooting/\">Click here for more information.</a>";

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
	context.getExtension("OES_standard_derivatives");
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
	var names = ["webgl", "experimental-webgl"];
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
		console.error("*** Error compiling shader '" + shader + "':" + lastError);
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
		console.log("Error in program linking:" + lastError);

		gl.deleteProgram(program);
		return null;
	}
	return program;
}

;

},{"./tools":3}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmljaW8vZ2xzbENhbnZhcy9zcmMvR2xzbENhbnZhcy5qcyIsIi9Vc2Vycy9wYXRyaWNpby9nbHNsQ2FudmFzL3NyYy9nbC5qcyIsIi9Vc2Vycy9wYXRyaWNpby9nbHNsQ2FudmFzL3NyYy90b29scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN1QjJDLFNBQVM7O2tCQUNpQixNQUFNOztJQUV0RCxVQUFVO0FBQ25CLFVBRFMsVUFBVSxDQUNsQixNQUFNLEVBQUU7d0JBREEsVUFBVTs7QUFHN0IsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsTUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0FBRXJCLE1BQUksRUFBRSxHQUFHLFFBUkYsVUFBVSxFQVFHLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPO0dBQ1A7QUFDRCxNQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7QUFHM0IsTUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUN6QyxjQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztHQUNuRCxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO0FBQ3BELE9BQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RCxjQUFXLEdBQUcsV0F0QlIsU0FBUyxFQXNCUyxNQUFNLENBQUMsQ0FBQztH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Q0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO0FBQ3ZELFdBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0dBQ2hDO0VBQ0QsQ0FBQTtBQUNELFFBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxRQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixRQUFPLFFBQVEsQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDOUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxFQUFFO0FBQ3ZCLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQ2Y7QUFDRCxRQUFPLENBQUMsQ0FBQztDQUNaOztBQUVNLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDMUMsS0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDM0MsUUFBTztBQUNOLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO0FBQzNCLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHO0VBQzFCLENBQUM7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBQYXRyaWNpbyBHb256YWxleiBWaXZvICggaHR0cDovL3d3dy5wYXRyaWNpb2dvbnphbGV6dml2by5jb20gKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG51c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxudGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1NcbkZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG5JTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IGZldGNoSFRUUCwgaXNDYW52YXNWaXNpYmxlIH0gZnJvbSBcIi4vdG9vbHNcIlxuaW1wb3J0IHsgc2V0dXBXZWJHTCwgY3JlYXRlU2hhZGVyLCBjcmVhdGVQcm9ncmFtLCBsb2FkVGV4dHVyZSB9IGZyb20gXCIuL2dsXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xzbENhbnZhcyB7XG5cdGNvbnN0cnVjdG9yKGNhbnZhcykge1xuXG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0dGhpcy5pc1ZhbGlkID0gZmFsc2U7XG5cblx0XHRsZXQgZ2wgPSBzZXR1cFdlYkdMKGNhbnZhcyk7XG5cdFx0aWYgKCFnbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmdsID0gZ2w7XG5cdFx0dGhpcy50aW1lTG9hZCA9IERhdGUubm93KCk7XG5cblx0XHQvLyBMb2FkIHNoYWRlclxuXHRcdGxldCBmcmFnQ29udGVudCA9IFwiXCI7XG5cdFx0aWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50XCIpKSB7XG5cdFx0XHRmcmFnQ29udGVudCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQnKTtcblx0XHR9IGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50LXVybFwiKSkge1xuXHRcdFx0bGV0IHNvdXJjZSA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtdXJsJyk7XG5cdFx0XHRmcmFnQ29udGVudCA9IGZldGNoSFRUUChzb3VyY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk5vIGRhdGFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkKGZyYWdDb250ZW50KTtcblxuXHRcdGlmICghdGhpcy5wcm9ncmFtKXtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIENvbnN0cnVjdCBWQk9cblx0XHR0aGlzLnZibyA9IFtdO1xuXHRcdGlmICh0aGlzLnByb2dyYW0pIHtcblx0XHRcdC8vIERlZmluZSBVVlMgYnVmZmVyXG5cdFx0XHRsZXQgdXZzO1xuXHRcdFx0bGV0IHRleENvb3JkTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwiYV90ZXhjb29yZFwiKTtcblx0XHRcdHV2cyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXHRcdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB1dnMpO1xuXHRcdFx0Z2wuYnVmZmVyRGF0YSggZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFswLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQwLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQwLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAwLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQxLjAsICAxLjBdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRleENvb3JkTG9jYXRpb24gKTtcblx0XHRcdGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRleENvb3JkTG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cdFx0XHR0aGlzLnZiby5wdXNoKHV2cyk7XG5cdFx0XHRcblx0XHRcdC8vIERlZmluZSBWZXJ0ZXggYnVmZmVyXG5cdFx0XHRsZXQgdmVydGljZXM7XG5cdFx0XHRsZXQgcG9zaXRpb25Mb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuXHRcdFx0dmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdHRoaXMuZ2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0aWNlcyk7XG5cdFx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbLTEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC0xLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQtMS4wLCAgMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAtMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBwb3NpdGlvbkxvY2F0aW9uICk7XG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBwb3NpdGlvbkxvY2F0aW9uICwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblx0XHRcdHRoaXMudmJvLnB1c2godmVydGljZXMpO1xuXHRcdH1cblx0XHRcblx0XHQvLyBsb2FkIFRFWFRVUkVTXG5cdFx0dGhpcy50ZXh0dXJlcyA9IFtdO1xuXHRcdGxldCBiTG9hZFRleHR1cmVzID0gY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpO1xuXHRcdGlmIChiTG9hZFRleHR1cmVzKSB7XG5cdFx0XHRsZXQgaW1nTGlzdCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dHVyZXMnKS5zcGxpdCgnLCcpO1xuXHRcdFx0Zm9yIChsZXQgbkltZyBpbiBpbWdMaXN0KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTG9hZGluZyB0ZXh0dXJlOiBcIiArIGltZ0xpc3RbbkltZ10pO1xuXG5cdFx0XHRcdHRoaXMudGV4dHVyZXMucHVzaChnbC5jcmVhdGVUZXh0dXJlKCkpO1xuXG5cdFx0XHRcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbbkltZ10pO1xuXHRcdFx0XHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIDEsIDEsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG5ldyBVaW50OEFycmF5KFsyNTUsIDI1NSwgMCwgMjU1XSkpOyAvLyByZWRcblxuXHRcdFx0XHR0aGlzLnRleHR1cmVzW25JbWddLmltYWdlID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdHRoaXMudGV4dHVyZXNbbkltZ10uaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oZ2xzbF9jYW52YXMsIF90ZXgpey8vX2NhbnZhcyxfZ2wsX3Byb2dyYW0sX3RleHR1cmVzLF90ZXgscmVuZGVyKSB7IFxuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGxvYWRUZXh0dXJlKGdsc2xfY2FudmFzLmdsLCBfdGV4KTsgXG5cdFx0XHRcdFx0XHRnbHNsX2NhbnZhcy5yZW5kZXIoe2ZvcmNlUmVuZGVyOnRydWV9KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KHRoaXMsdGhpcy50ZXh0dXJlc1tuSW1nXSk7Ly90aGlzLmNhbnZhcyx0aGlzLmdsLHRoaXMucHJvZ3JhbSwgdGhpcy50ZXh0dXJlcywgdGhpcy50ZXh0dXJlc1tuSW1nXSk7XG5cdCAgXHRcdFx0dGhpcy50ZXh0dXJlc1tuSW1nXS5pbWFnZS5zcmMgPSBpbWdMaXN0W25JbWddO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucmVuZGVyKCB7IG1vdXNlOiB7eDogMCwgeTogMH0sIGZvcmNlUmVuZGVyOiB0cnVlIH0pO1xuXHR9XG5cblx0bG9hZCggZnJhZ1N0cmluZywgdmVydFN0cmluZyApIHtcblxuXHRcdC8vIExvYWQgZGVmYXVsdCB2ZXJ0ZXggc2hhZGVyIGlmIG5vIG9uZSBpcyBwYXNzXG5cdFx0aWYgKCF2ZXJ0U3RyaW5nKSB7XG5cdFx0XHR2ZXJ0U3RyaW5nID0gXCJcXG5cXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuXFxcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xcblxcXG5hdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xcblxcXG5hdHRyaWJ1dGUgdmVjMiBhX3RleGNvb3JkO1xcblxcXG52YXJ5aW5nIHZlYzIgdl90ZXhjb29yZDtcXG5cXFxudm9pZCBtYWluKCkge1xcblxcXG4gXHRnbF9Qb3NpdGlvbiA9IHZlYzQoYV9wb3NpdGlvbiwgMC4wLCAxLjApO1xcblxcXG4gXHR2X3RleGNvb3JkID0gYV90ZXhjb29yZDtcXG5cXFxuIH1cIjtcblx0XHR9XG5cblx0XHQvLyBMb2FkIGRlZmF1bHQgZnJhZ21lbnQgc2hhZGVyIGlmIG5vIG9uZSBpcyBwYXNzXG5cdFx0aWYgKCFmcmFnU3RyaW5nKSB7XG5cdFx0XHRmcmFnU3RyaW5nICs9IFwiXFxuXFxcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuXFxcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xcblxcXG52YXJ5aW5nIHZlYzIgdl90ZXhjb29yZDtcXG5cXFxudm9pZCBtYWluKCl7XFxuXFxcblx0dmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb247XFxuXFxcblx0Z2xfRnJhZ0NvbG9yID0gdmVjNChzdC54LHN0LnksYWJzKHNpbih1X3RpbWUpKSwxLjApO1xcblxcXG59XCI7XG5cdFx0fVxuXG5cdFx0dGhpcy52ZXJ0ZXhTdHJpbmcgPSB2ZXJ0U3RyaW5nO1xuXHRcdHRoaXMuZnJhZ21lbnRTdHJpbmcgPSBmcmFnU3RyaW5nO1xuXG5cdFx0dGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuXHRcdGxldCBuVGltZXMgPSAoZnJhZ1N0cmluZy5tYXRjaCgvdV90aW1lL2cpIHx8IFtdKS5sZW5ndGg7XG5cdFx0bGV0IG5Nb3VzZSA9IChmcmFnU3RyaW5nLm1hdGNoKC91X21vdXNlL2cpIHx8IFtdKS5sZW5ndGg7XG5cdFx0dGhpcy5hbmltYXRlZCA9IG5UaW1lcyA+IDEgfHwgbk1vdXNlID4gMTtcblxuXHRcdGxldCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcy5nbCwgdmVydFN0cmluZywgdGhpcy5nbC5WRVJURVhfU0hBREVSKTtcblx0XHRsZXQgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcy5nbCwgZnJhZ1N0cmluZywgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuXG5cdFx0Ly8gSWYgRnJhZ21lbnQgc2hhZGVyIGZhaWxzIGxvYWQgYSBlbXB0eSBvbmUgdG8gc2lnbiB0aGUgZXJyb3Jcblx0XHRpZiAoIWZyYWdtZW50U2hhZGVyKSB7XG5cdFx0XHRmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCBcInZvaWQgbWFpbigpe1xcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wKTtcXG59XCIsIHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSKTtcblx0XHRcdHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmlzVmFsaWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBhbmQgdXNlIHByb2dyYW1cblx0XHRsZXQgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odGhpcy5nbCwgW3ZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXJdKTtcblx0XHR0aGlzLmdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cblx0XHQvLyBEZWxldGUgc2hhZGVyc1xuXHRcdHRoaXMuZ2wuZGV0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG5cdFx0dGhpcy5nbC5kZXRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuXHRcdHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7XG5cdFx0dGhpcy5nbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuXG5cdFx0dGhpcy5wcm9ncmFtID0gcHJvZ3JhbTtcblx0fVxuXG5cdHJlbmRlcih7IGZvcmNlUmVuZGVyLCBtb3VzZSB9KSB7XG5cblx0XHRpZiAoZm9yY2VSZW5kZXIgfHwgKHRoaXMuYW5pbWF0ZWQgJiYgaXNDYW52YXNWaXNpYmxlKHRoaXMuY2FudmFzKSkpIHtcblxuXHRcdFx0Ly8gc2V0IHRoZSB0aW1lIHVuaWZvcm1cblx0XHRcdGxldCB0aW1lRnJhbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0bGV0IHRpbWUgPSAodGltZUZyYW1lLXRoaXMudGltZUxvYWQpIC8gMTAwMC4wO1xuXHRcdFx0bGV0IHRpbWVMb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJ1X3RpbWVcIik7XG5cdFx0XHR0aGlzLmdsLnVuaWZvcm0xZih0aW1lTG9jYXRpb24sIHRpbWUpO1xuXG5cdFx0XHQvLyBzZXQgdGhlIG1vdXNlIHVuaWZvcm1cblx0XHRcdGxldCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAobW91c2UgJiZcblx0XHRcdFx0bW91c2UueCA+PSByZWN0LmxlZnQgJiYgXG5cdFx0XHRcdG1vdXNlLnggPD0gcmVjdC5yaWdodCAmJiBcblx0XHRcdFx0bW91c2UueSA+PSByZWN0LnRvcCAmJlxuXHRcdFx0XHRtb3VzZS55IDw9IHJlY3QuYm90dG9tKSB7XG5cblx0XHRcdFx0bGV0IG1vdXNlTG9jYXRpb24gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIFwidV9tb3VzZVwiKTtcblx0XHRcdFx0dGhpcy5nbC51bmlmb3JtMmYobW91c2VMb2NhdGlvbixtb3VzZS54LXJlY3QubGVmdCx0aGlzLmNhbnZhcy5oZWlnaHQtKG1vdXNlLnktcmVjdC50b3ApKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc2V0IHRoZSByZXNvbHV0aW9uIHVuaWZvcm1cblx0XHRcdGxldCByZXNvbHV0aW9uTG9jYXRpb24gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIFwidV9yZXNvbHV0aW9uXCIpO1xuXHRcdFx0dGhpcy5nbC51bmlmb3JtMmYocmVzb2x1dGlvbkxvY2F0aW9uLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRleHR1cmVzLmxlbmd0aDsgKytpKXtcblxuXHRcdFx0XHR0aGlzLmdsLnVuaWZvcm0xaSggdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMucHJvZ3JhbSwgXCJ1X3RleFwiK2kpLCBpKTtcblx0XHRcdFx0dGhpcy5nbC51bmlmb3JtMmYoIHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnByb2dyYW0sIFwidV90ZXhcIitpK1wiUmVzb2x1dGlvblwiKSwgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCB0aGlzLnRleHR1cmVzW2ldLmltYWdlLndpZHRoLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgdGhpcy50ZXh0dXJlc1tpXS5pbWFnZS5oZWlnaHQpO1xuXG5cdFx0XHRcdHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwK2kpO1xuXHRcdFx0XHR0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1tpXSk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHQvLyBEcmF3IHRoZSByZWN0YW5nbGUuXG5cdFx0XHR0aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIDYpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJSZW5kZXIgXCIgKyB0aW1lKTtcblx0XHR9XG5cdH1cblxuXHR2ZXJzaW9uKCkge1xuXHRcdHJldHVybiBcIjAuMC4xXCI7XG5cdH1cbn07XG5cbndpbmRvdy5HbHNsQ2FudmFzID0gR2xzbENhbnZhczsiLCJpbXBvcnQgeyBpc1Bvd2VyT2YyIH0gZnJvbSBcIi4vdG9vbHNcIlxuXG52YXIgbGFzdEVycm9yID0gXCJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKF9nbCwgX3RleHR1cmUpIHtcblx0X2dsLmJpbmRUZXh0dXJlKF9nbC5URVhUVVJFXzJELCBfdGV4dHVyZSk7XG5cdF9nbC5waXhlbFN0b3JlaShfZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XG5cdF9nbC50ZXhJbWFnZTJEKF9nbC5URVhUVVJFXzJELCAwLCBfZ2wuUkdCQSwgX2dsLlJHQkEsIF9nbC5VTlNJR05FRF9CWVRFLCBfdGV4dHVyZS5pbWFnZSk7XG5cdGlmIChpc1Bvd2VyT2YyKF90ZXh0dXJlLmltYWdlLndpZHRoKSAmJiBpc1Bvd2VyT2YyKF90ZXh0dXJlLmltYWdlLmhlaWdodCkgKSB7XG5cdFx0X2dsLmdlbmVyYXRlTWlwbWFwKF9nbC5URVhUVVJFXzJEKTtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgX2dsLkxJTkVBUik7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01JTl9GSUxURVIsIF9nbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7XG5cdH0gZWxzZSB7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfUywgX2dsLkNMQU1QX1RPX0VER0UpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9XUkFQX1QsIF9nbC5DTEFNUF9UT19FREdFKTtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgX2dsLkxJTkVBUik7XG5cdH1cblx0X2dsLmJpbmRUZXh0dXJlKF9nbC5URVhUVVJFXzJELCBudWxsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBIVExNIGZvciBhIGZhaWx1cmUgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IGNhbnZhc0NvbnRhaW5lcklkIGlkIG9mIGNvbnRhaW5lciBvZiB0aFxuICogICAgICAgIGNhbnZhcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGh0bWwuXG4gKi9cbnZhciBtYWtlRmFpbEhUTUwgPSBmdW5jdGlvbihtc2cpIHtcbiBcdHJldHVybiAnJyArXG5cdFx0Jzx0YWJsZSBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM4Q0U7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+PHRyPicgK1xuXHRcdCc8dGQgYWxpZ249XCJjZW50ZXJcIj4nICtcblx0XHQnPGRpdiBzdHlsZT1cImRpc3BsYXk6IHRhYmxlLWNlbGw7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCI+JyArXG5cdFx0JzxkaXYgc3R5bGU9XCJcIj4nICsgbXNnICsgJzwvZGl2PicgK1xuXHRcdCc8L2Rpdj4nICtcblx0XHQnPC90ZD48L3RyPjwvdGFibGU+Jztcbn07XG5cbi8qKlxuICogTWVzYXNnZSBmb3IgZ2V0dGluZyBhIHdlYmdsIGJyb3dzZXJcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciBHRVRfQV9XRUJHTF9CUk9XU0VSID0gJycgK1xuXHQnVGhpcyBwYWdlIHJlcXVpcmVzIGEgYnJvd3NlciB0aGF0IHN1cHBvcnRzIFdlYkdMLjxici8+JyArXG5cdCc8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmdcIj5DbGljayBoZXJlIHRvIHVwZ3JhZGUgeW91ciBicm93c2VyLjwvYT4nO1xuXG4vKipcbiAqIE1lc2FzZ2UgZm9yIG5lZWQgYmV0dGVyIGhhcmR3YXJlXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG52YXIgT1RIRVJfUFJPQkxFTSA9ICcnICtcblx0XCJJdCBkb2Vzbid0IGFwcGVhciB5b3VyIGNvbXB1dGVyIGNhbiBzdXBwb3J0IFdlYkdMLjxici8+XCIgK1xuXHQnPGEgaHJlZj1cImh0dHA6Ly9nZXQud2ViZ2wub3JnL3Ryb3VibGVzaG9vdGluZy9cIj5DbGljayBoZXJlIGZvciBtb3JlIGluZm9ybWF0aW9uLjwvYT4nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB3ZWJnbCBjb250ZXh0LiBJZiBjcmVhdGlvbiBmYWlscyBpdCB3aWxsXG4gKiBjaGFuZ2UgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb250YWluZXIgb2YgdGhlIDxjYW52YXM+XG4gKiB0YWcgdG8gYW4gZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBjb3JyZWN0IGxpbmtzIGZvciBXZWJHTC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gY2FudmFzLiBUaGUgY2FudmFzIGVsZW1lbnQgdG8gY3JlYXRlIGFcbiAqICAgICBjb250ZXh0IGZyb20uXG4gKiBAcGFyYW0ge1dlYkdMQ29udGV4dENyZWF0aW9uQXR0aXJidXRlc30gb3B0X2F0dHJpYnMgQW55XG4gKiAgICAgY3JlYXRpb24gYXR0cmlidXRlcyB5b3Ugd2FudCB0byBwYXNzIGluLlxuICogQHJldHVybiB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBUaGUgY3JlYXRlZCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJHTCAoX2NhbnZhcywgX29wdF9hdHRyaWJzKSB7XG5cblx0ZnVuY3Rpb24gc2hvd0xpbmsoc3RyKSB7XG5cdFx0dmFyIGNvbnRhaW5lciA9IF9jYW52YXMucGFyZW50Tm9kZTtcblx0XHRpZiAoY29udGFpbmVyKSB7XG5cdFx0ICBjb250YWluZXIuaW5uZXJIVE1MID0gbWFrZUZhaWxIVE1MKHN0cik7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICghd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHNob3dMaW5rKEdFVF9BX1dFQkdMX0JST1dTRVIpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0dmFyIGNvbnRleHQgPSBjcmVhdGUzRENvbnRleHQoX2NhbnZhcywgX29wdF9hdHRyaWJzKTtcblx0aWYgKCFjb250ZXh0KSB7XG5cdFx0c2hvd0xpbmsoT1RIRVJfUFJPQkxFTSk7XG5cdH1cblx0Y29udGV4dC5nZXRFeHRlbnNpb24oJ09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcycpO1xuXHRyZXR1cm4gY29udGV4dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIHdlYmdsIGNvbnRleHQuXG4gKiBAcGFyYW0geyFDYW52YXN9IGNhbnZhcyBUaGUgY2FudmFzIHRhZyB0byBnZXQgY29udGV4dFxuICogICAgIGZyb20uIElmIG9uZSBpcyBub3QgcGFzc2VkIGluIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXG4gKiBAcmV0dXJuIHshV2ViR0xDb250ZXh0fSBUaGUgY3JlYXRlZCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlM0RDb250ZXh0KF9jYW52YXMsIF9vcHRfYXR0cmlicykge1xuXHR2YXIgbmFtZXMgPSBbXCJ3ZWJnbFwiLCBcImV4cGVyaW1lbnRhbC13ZWJnbFwiXTtcblx0dmFyIGNvbnRleHQgPSBudWxsO1xuXHRmb3IgKHZhciBpaSA9IDA7IGlpIDwgbmFtZXMubGVuZ3RoOyArK2lpKSB7XG5cdFx0dHJ5IHtcblx0ICBcdFx0Y29udGV4dCA9IF9jYW52YXMuZ2V0Q29udGV4dChuYW1lc1tpaV0sIF9vcHRfYXR0cmlicyk7XG5cdFx0fSBjYXRjaChlKSB7fVxuXHRcdFx0aWYgKGNvbnRleHQpIHtcblx0ICBcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qXG4gKlx0Q3JlYXRlIGEgVmVydGV4IG9mIGEgc3BlY2lmaWMgdHlwZSAoZ2wuVkVSVEVYX1NIQURFUi8pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoX2dsLCBfc291cmNlLCBfdHlwZSkge1xuXHR2YXIgc2hhZGVyID0gX2dsLmNyZWF0ZVNoYWRlciggX3R5cGUgKTtcblx0X2dsLnNoYWRlclNvdXJjZShzaGFkZXIsIF9zb3VyY2UpO1xuXHRfZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG5cdHZhciBjb21waWxlZCA9IF9nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBfZ2wuQ09NUElMRV9TVEFUVVMpO1xuXHRcblx0aWYgKCFjb21waWxlZCkge1xuXHRcdC8vIFNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBjb21waWxhdGlvbjsgZ2V0IHRoZSBlcnJvclxuXHRcdGxhc3RFcnJvciA9IF9nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcik7XG5cdFx0Y29uc29sZS5lcnJvcihcIioqKiBFcnJvciBjb21waWxpbmcgc2hhZGVyICdcIiArIHNoYWRlciArIFwiJzpcIiArIGxhc3RFcnJvcik7XG5cdFx0X2dsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHNoYWRlcjtcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHNoYWRlci5cbiAqIEBwYXJhbSB7IVdlYkdMQ29udGV4dH0gZ2wgVGhlIFdlYkdMQ29udGV4dCB0byB1c2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hhZGVyU291cmNlIFRoZSBzaGFkZXIgc291cmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNoYWRlclR5cGUgVGhlIHR5cGUgb2Ygc2hhZGVyLlxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcpOiB2b2lkKSBvcHRfZXJyb3JDYWxsYmFjayBjYWxsYmFjayBmb3IgZXJyb3JzLlxuICogQHJldHVybiB7IVdlYkdMU2hhZGVyfSBUaGUgY3JlYXRlZCBzaGFkZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCBzaGFkZXJzLCBvcHRfYXR0cmlicywgb3B0X2xvY2F0aW9ucykge1xuXHR2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcblx0Zm9yICh2YXIgaWkgPSAwOyBpaSA8IHNoYWRlcnMubGVuZ3RoOyArK2lpKSB7XG5cdFx0Z2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHNoYWRlcnNbaWldKTtcblx0fVxuXHRpZiAob3B0X2F0dHJpYnMpIHtcblx0XHRmb3IgKHZhciBpaSA9IDA7IGlpIDwgb3B0X2F0dHJpYnMubGVuZ3RoOyArK2lpKSB7XG5cdCAgXHRcdGdsLmJpbmRBdHRyaWJMb2NhdGlvbihcblx0XHQgIFx0cHJvZ3JhbSxcblx0XHQgIFx0b3B0X2xvY2F0aW9ucyA/IG9wdF9sb2NhdGlvbnNbaWldIDogaWksXG5cdFx0ICBcdG9wdF9hdHRyaWJzW2lpXSk7XG5cdFx0fVxuXHR9XG5cdGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG5cdC8vIENoZWNrIHRoZSBsaW5rIHN0YXR1c1xuXHR2YXIgbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG5cdGlmICghbGlua2VkKSB7XG5cdFx0Ly8gc29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgbGlua1xuXHRcdGxhc3RFcnJvciA9IGdsLmdldFByb2dyYW1JbmZvTG9nIChwcm9ncmFtKTtcblx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGluIHByb2dyYW0gbGlua2luZzpcIiArIGxhc3RFcnJvcik7XG5cblx0XHRnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHJldHVybiBwcm9ncmFtO1xufTsiLCJleHBvcnQgZnVuY3Rpb24gaXNDYW52YXNWaXNpYmxlKF9jYW52YXMpe1xuXHRyZXR1cm5cdCgoX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBfY2FudmFzLmhlaWdodCkgPiAwKSAmJiBcblx0XHRcdChfY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmICh2YWx1ZSAtIDEpKSA9PSAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRIaWdoZXN0UG93ZXJPZlR3byh4KSB7XG4gICAgLS14O1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMzI7IGkgPDw9IDEpIHtcbiAgICAgICAgeCA9IHggfCB4ID4+IGk7XG4gICAgfVxuICAgIHJldHVybiB4ICsgMTtcbn07XG5cbi8qXG4gKlx0RmV0Y2ggZm9yIGZpbGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEhUVFAodXJsLCBtZXRob29kKXtcblx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgcmVzcG9uc2U7XG5cblx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRyZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXHRcdH1cblx0fVxuXHRyZXF1ZXN0Lm9wZW4obWV0aG9vZCA/IG1ldGhvb2QgOiAnR0VUJywgdXJsLCBmYWxzZSk7XG5cdHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShcInRleHQvcGxhaW5cIik7XG5cdHJlcXVlc3Quc2VuZCgpO1xuXHRyZXR1cm4gcmVzcG9uc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXROdW1iZXJMZW5ndGgoX251bSwgX2xlbmd0aCkge1xuICAgIHZhciByID0gXCJcIiArIF9udW07XG4gICAgd2hpbGUgKHIubGVuZ3RoIDwgX2xlbmd0aCkge1xuICAgICAgICByID0gXCIwXCIgKyByO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vdXNlUG9zKF9jYW52YXMsIF9ldnQpIHtcblx0dmFyIHJlY3QgPSBfY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRyZXR1cm4ge1xuXHRcdHg6IF9ldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcblx0XHR5OiBfZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxuXHR9O1xufSJdfQ==
