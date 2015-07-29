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

/**
 * 	GLSL CANVAS
 */

var GlslCanvas = (function () {
	function GlslCanvas(canvas) {
		_classCallCheck(this, GlslCanvas);

		this.canvas = canvas;
		this.gl = undefined;
		this.program = undefined;
		this.uniforms = {};
		this.vbo = {};
		this.isValid = false;

		// GL Context
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

		// // Define Vertex buffer
		var texCoordsLoc = gl.getAttribLocation(this.program, "a_texcoord");
		this.vbo.texCoords = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.texCoords);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(texCoordsLoc);
		this.gl.vertexAttribPointer(texCoordsLoc, 2, gl.FLOAT, false, 0, 0);

		var verticesLoc = gl.getAttribLocation(this.program, "a_position");
		this.vbo.vertices = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.vertices);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(verticesLoc);
		this.gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);

		// load TEXTURES
		this.textures = {};
		var bLoadTextures = canvas.hasAttribute("data-textures");
		if (bLoadTextures) {
			var imgList = canvas.getAttribute("data-textures").split(",");
			for (var nImg in imgList) {
				this.loadTexture("u_tex" + nImg, imgList[nImg]);
			}
		}

		this.setMouse({ x: 0, y: 0 });
		this.render(true);

		// Events
		this.canvas.addEventListener("resize", this.onResize);
	}

	_createClass(GlslCanvas, [{
		key: "destroy",
		value: function destroy() {
			this.animated = false;
			this.isValid = false;
			for (var tex in this.textures) {
				this.gl.deleteTexture(tex);
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
		key: "load",
		value: function load(fragString, vertString) {

			// Load default vertex shader if no one is pass
			if (!vertString) {
				vertString = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform float u_time;\n\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n \tgl_Position = vec4(a_position, 0.0, 1.0);\n \tv_texcoord = a_texcoord;\n}\n";
			}

			// Load default fragment shader if no one is pass
			if (!fragString) {
				fragString = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform float u_time;\n\nvarying vec2 v_texcoord;\n\nvoid main(){\n\tvec2 st = gl_FragCoord.xy/u_resolution;\n\tgl_FragColor = vec4(st.x,st.y,abs(sin(u_time)),1.0);\n}\n";
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
			var program = (0, _gl.createProgram)(this.gl, [vertexShader, fragmentShader]); //, [0,1],["a_texcoord","a_position"]);
			this.gl.useProgram(program);

			// Delete shaders
			// this.gl.detachShader(program, vertexShader);
			// this.gl.detachShader(program, fragmentShader);
			this.gl.deleteShader(vertexShader);
			this.gl.deleteShader(fragmentShader);

			this.program = program;
			this.change = true;

			this.render(true);
		}
	}, {
		key: "setUniform",
		value: function setUniform(name) {
			var u = {};

			for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				value[_key - 1] = arguments[_key];
			}

			u[name] = value;
			this.setUniforms(u);
		}
	}, {
		key: "setUniforms",
		value: function setUniforms(uniforms) {
			var parsed = (0, _gl.parseUniforms)(uniforms);
			// Set each uniform
			for (var u in parsed) {
				if (parsed[u].type === "sampler2D") {
					// For textures, we need to track texture units, so we have a special setter
					this.setTextureUniform(parsed[u].name, parsed[u].value[0]);
				} else {
					this.uniform(parsed[u].method, parsed[u].type, parsed[u].name, parsed[u].value);
				}
			}
		}
	}, {
		key: "uniform",

		// ex: program.uniform('3f', 'position', x, y, z);
		value: function uniform(method, type, name) {
			// 'value' is a method-appropriate arguments list
			this.uniforms[name] = this.uniforms[name] || {};
			var uniform = this.uniforms[name];

			for (var _len2 = arguments.length, value = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
				value[_key2 - 3] = arguments[_key2];
			}

			var change = (0, _tools.isDiff)(uniform.value, value);
			if (change || this.change || uniform.location === undefined || uniform.value === undefined) {

				uniform.name = name;
				uniform.value = value;
				uniform.type = type;
				uniform.method = "uniform" + method;
				uniform.location = this.gl.getUniformLocation(this.program, name);

				// if(Array.isArray(uniform.value[0])){
				// 	console.log(uniform," -> [",uniform.value[0],"]");
				// } else {
				// 	console.log(uniform," -> ",uniform.value);
				// }

				this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.value));
			}
		}
	}, {
		key: "setTextureUniform",
		value: function setTextureUniform(name, url) {
			if (this.textures[name] === undefined) {
				this.loadTexture(name, url);
			} else {
				this.uniform("1i", "sampler2D", name, this.texureIndex);
				this.gl.activeTexture(this.gl.TEXTURE0 + this.texureIndex);
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[name]);
				this.uniform("2f", "vec2", name + "Resolution", this.textures[name].image.width, this.textures[name].image.height);
				this.texureIndex++;
			}
		}
	}, {
		key: "loadTexture",
		value: function loadTexture(name, url) {
			var tex = this.gl.createTexture();

			this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 0, 255])); // red

			tex.image = new Image();
			tex.image.onload = (function (glsl_canvas, _tex) {
				return function () {
					(0, _gl.loadTexture)(glsl_canvas.gl, _tex);
					glsl_canvas.render(true);
				};
			})(this, tex);
			tex.name = name;
			tex.url = url;
			tex.image.src = url;

			this.textures[name] = tex;
		}
	}, {
		key: "setMouse",
		value: function setMouse(mouse) {
			// set the mouse uniform
			var rect = this.canvas.getBoundingClientRect();
			if (mouse && mouse.x && mouse.y && mouse.x >= rect.left && mouse.x <= rect.right && mouse.y >= rect.top && mouse.y <= rect.bottom) {

				this.uniform("2f", "vec2", "u_mouse", mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
			}
		}
	}, {
		key: "onResize",
		value: function onResize() {
			var realToCSSPixels = window.devicePixelRatio || 1;

			// Lookup the size the browser is displaying the canvas in CSS pixels
			// and compute a size needed to make our drawingbuffer match it in
			// device pixels.
			var displayWidth = Math.floor(this.gl.canvas.clientWidth * realToCSSPixels);
			var displayHeight = Math.floor(this.gl.canvas.clientHeight * realToCSSPixels);

			// Check if the canvas is not the same size.
			if (this.gl.canvas.width != displayWidth || this.gl.canvas.height != displayHeight) {

				// Make the canvas the same size
				this.gl.canvas.width = displayWidth;
				this.gl.canvas.height = displayHeight;

				// Set the viewport to match
				gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
			}
		}
	}, {
		key: "render",
		value: function render(forceRender) {

			if (forceRender !== undefined && forceRender || this.animated && (0, _tools.isCanvasVisible)(this.canvas)) {

				// set the time uniform
				var timeFrame = Date.now();
				var time = (timeFrame - this.timeLoad) / 1000.0;
				this.uniform("1f", "float", "u_time", time);

				// set the resolution uniform
				this.uniform("2f", "vec2", "u_resolution", this.canvas.width, this.canvas.height);

				this.texureIndex = 0;
				for (var tex in this.textures) {
					this.setUniform(tex, this.textures[tex].url);
				}

				// Draw the rectangle.
				this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

				this.change = false;
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
exports.parseUniforms = parseUniforms;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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

// By Brett Camber on
// https://github.com/tangrams/tangram/blob/master/src/gl/glsl.js

function parseUniforms(uniforms) {
  var prefix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var parsed = [];

  for (var _name in uniforms) {
    var uniform = uniforms[_name];
    var u = undefined;

    if (prefix) {
      _name = prefix + "." + _name;
    }

    // Single float
    if (typeof uniform === "number") {
      parsed.push({
        type: "float",
        method: "1f",
        name: _name, value: uniform
      });
    }
    // Array: vector, array of floats, array of textures, or array of structs
    else if (Array.isArray(uniform)) {
      // Numeric values
      if (typeof uniform[0] === "number") {
        // float vectors (vec2, vec3, vec4)
        if (uniform.length >= 2 && uniform.length <= 4) {
          parsed.push({
            type: "vec" + uniform.length,
            method: uniform.length + "fv",
            name: _name,
            value: uniform
          });
        }
        // float array
        else if (uniform.length > 4) {
          parsed.push({
            type: "float[]",
            method: "1fv",
            name: _name + "[0]",
            value: uniform
          });
        }
        // TODO: assume matrix for (typeof == Float32Array && length == 16)?
      }
      // Array of textures
      else if (typeof uniform[0] === "string") {
        parsed.push({
          type: "sampler2D",
          method: "1i",
          name: _name,
          value: uniform
        });
      }
      // Array of arrays - but only arrays of vectors are allowed in this case
      else if (Array.isArray(uniform[0]) && typeof uniform[0][0] === "number") {
        // float vectors (vec2, vec3, vec4)
        if (uniform[0].length >= 2 && uniform[0].length <= 4) {
          // Set each vector in the array
          for (u = 0; u < uniform.length; u++) {
            parsed.push({
              type: "vec" + uniform[0].length,
              method: uniform[u].length + "fv",
              name: _name + "[" + u + "]",
              value: uniform[u]
            });
          }
        }
        // else error?
      }
      // Array of structures
      else if (typeof uniform[0] === "object") {
        for (u = 0; u < uniform.length; u++) {
          // Set each struct in the array
          parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform[u], _name + "[" + u + "]")));
        }
      }
    }
    // Boolean
    else if (typeof uniform === "boolean") {
      parsed.push({
        type: "bool",
        method: "1i",
        name: _name,
        value: uniform
      });
    }
    // Texture
    else if (typeof uniform === "string") {
      parsed.push({
        type: "sampler2D",
        method: "1i",
        name: _name,
        value: uniform
      });
    }
    // Structure
    else if (typeof uniform === "object") {
      // Set each field in the struct
      parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform, _name)));
    }

    // TODO: support other non-float types? (int, etc.)
  }

  return parsed;
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
exports.isDiff = isDiff;

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

function isDiff(a, b) {
	if (a && b) {
		return a.toString() !== b.toString();
	}
	return false;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC9nbHNsQ2FudmFzL3NyYy9HbHNsQ2FudmFzLmpzIiwiL1VzZXJzL3BhdHJpY2lvL0Rlc2t0b3AvZ2xzbENhbnZhcy9zcmMvZ2wuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC9nbHNsQ2FudmFzL3NyYy90b29scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN1Qm1ELFNBQVM7O2tCQUN3QixNQUFNOzs7Ozs7SUFLckUsVUFBVTtBQUNuQixVQURTLFVBQVUsQ0FDbEIsTUFBTSxFQUFFO3dCQURBLFVBQVU7O0FBRzdCLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLE1BQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLE1BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2QsTUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7OztBQUdyQixNQUFJLEVBQUUsR0FBRyxRQWhCRixVQUFVLEVBZ0JHLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPO0dBQ1A7QUFDRCxNQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7QUFHM0IsTUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUN6QyxjQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxl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WSxDQUFDO0dBQ2hDO0VBQ0QsQ0FBQTtBQUNELFFBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxRQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixRQUFPLFFBQVEsQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDOUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxFQUFFO0FBQ3ZCLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQ2Y7QUFDRCxRQUFPLENBQUMsQ0FBQztDQUNaOztBQUVNLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDMUMsS0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDM0MsUUFBTztBQUNOLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO0FBQzNCLEdBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHO0VBQzFCLENBQUM7Q0FDRjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzVCLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNYLFNBQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztFQUNyQztBQUNFLFFBQU8sS0FBSyxDQUFDO0NBQ2hCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IFBhdHJpY2lvIEdvbnphbGV6IFZpdm8gKCBodHRwOi8vd3d3LnBhdHJpY2lvZ29uemFsZXp2aXZvLmNvbSApXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2ZcbnRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbnRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbnVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG50aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG5zdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG5DT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbklOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG5DT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgZmV0Y2hIVFRQLCBpc0NhbnZhc1Zpc2libGUsIGlzRGlmZiB9IGZyb20gXCIuL3Rvb2xzXCJcbmltcG9ydCB7IHNldHVwV2ViR0wsIGNyZWF0ZVNoYWRlciwgY3JlYXRlUHJvZ3JhbSwgcGFyc2VVbmlmb3JtcywgbG9hZFRleHR1cmUgfSBmcm9tIFwiLi9nbFwiXG5cbi8qKlxuICogXHRHTFNMIENBTlZBU1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbHNsQ2FudmFzIHtcblx0Y29uc3RydWN0b3IoY2FudmFzKSB7XG5cblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcblx0XHR0aGlzLmdsID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMucHJvZ3JhbSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnVuaWZvcm1zID0ge307XG5cdFx0dGhpcy52Ym8gPSB7fTtcblx0XHR0aGlzLmlzVmFsaWQgPSBmYWxzZTtcblxuXHRcdC8vIEdMIENvbnRleHRcblx0XHRsZXQgZ2wgPSBzZXR1cFdlYkdMKGNhbnZhcyk7XG5cdFx0aWYgKCFnbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmdsID0gZ2w7XG5cdFx0dGhpcy50aW1lTG9hZCA9IERhdGUubm93KCk7XG5cblx0XHQvLyBMb2FkIHNoYWRlclxuXHRcdGxldCBmcmFnQ29udGVudCA9IFwiXCI7XG5cdFx0aWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50XCIpKSB7XG5cdFx0XHRmcmFnQ29udGVudCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQnKTtcblx0XHR9IGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZyYWdtZW50LXVybFwiKSkge1xuXHRcdFx0bGV0IHNvdXJjZSA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtdXJsJyk7XG5cdFx0XHRmcmFnQ29udGVudCA9IGZldGNoSFRUUChzb3VyY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk5vIGRhdGFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkKGZyYWdDb250ZW50KTtcblx0XHRcblx0XHRpZiAoIXRoaXMucHJvZ3JhbSl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gLy8gRGVmaW5lIFZlcnRleCBidWZmZXJcblx0XHRsZXQgdGV4Q29vcmRzTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImFfdGV4Y29vcmRcIik7XG5cdFx0dGhpcy52Ym8udGV4Q29vcmRzID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdFx0dGhpcy5nbC5iaW5kQnVmZmVyKCBnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmJvLnRleENvb3Jkcyk7XG5cdFx0dGhpcy5nbC5idWZmZXJEYXRhKCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjBdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXHRcdHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4Q29vcmRzTG9jKTtcblx0XHR0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4Q29vcmRzTG9jLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG5cdFx0bGV0IHZlcnRpY2VzTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG5cdFx0dGhpcy52Ym8udmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHR0aGlzLmdsLmJpbmRCdWZmZXIoIGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52Ym8udmVydGljZXMpO1xuXHRcdHRoaXMuZ2wuYnVmZmVyRGF0YSggZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFstMS4wLCAtMS4wLCAxLjAsIC0xLjAsIC0xLjAsICAxLjAsLTEuMCwgIDEuMCwxLjAsIC0xLjAsMS4wLCAgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcblx0XHR0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRpY2VzTG9jKTtcblx0XHR0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodmVydGljZXNMb2MsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cblx0XHQvLyBsb2FkIFRFWFRVUkVTXG5cdFx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXHRcdGxldCBiTG9hZFRleHR1cmVzID0gY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpO1xuXHRcdGlmIChiTG9hZFRleHR1cmVzKSB7XG5cdFx0XHRsZXQgaW1nTGlzdCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dHVyZXMnKS5zcGxpdCgnLCcpO1xuXHRcdFx0Zm9yIChsZXQgbkltZyBpbiBpbWdMaXN0KSB7XG5cdFx0XHRcdHRoaXMubG9hZFRleHR1cmUoXCJ1X3RleFwiK25JbWcsaW1nTGlzdFtuSW1nXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRNb3VzZSh7eDogMCwgeTogMH0pO1xuXHRcdHRoaXMucmVuZGVyKHRydWUpO1xuXG5cblx0XHQvLyBFdmVudHNcblx0XHR0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUpO1xuXHR9O1xuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuXHRcdHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuXHRcdGZvciAobGV0IHRleCBpbiB0aGlzLnRleHR1cmVzKSB7XG5cdFx0XHR0aGlzLmdsLmRlbGV0ZVRleHR1cmUodGV4KTtcblx0XHR9XG5cdFx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXHRcdGZvciAoIGxldCBhdHQgaW4gdGhpcy5hdHRyaWJzKSB7XG4gICAgICAgIFx0dGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5hdHRyaWJzW2F0dF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShudWxsKTtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgIH1cblxuXHRsb2FkKGZyYWdTdHJpbmcsIHZlcnRTdHJpbmcpIHtcblxuXHRcdC8vIExvYWQgZGVmYXVsdCB2ZXJ0ZXggc2hhZGVyIGlmIG5vIG9uZSBpcyBwYXNzXG5cdFx0aWYgKCF2ZXJ0U3RyaW5nKSB7XG5cdFx0XHR2ZXJ0U3RyaW5nID0gYFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxuXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xudW5pZm9ybSBmbG9hdCB1X3RpbWU7XG5cbmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XG5hdHRyaWJ1dGUgdmVjMiBhX3RleGNvb3JkO1xuXG52YXJ5aW5nIHZlYzIgdl90ZXhjb29yZDtcblxudm9pZCBtYWluKCkge1xuIFx0Z2xfUG9zaXRpb24gPSB2ZWM0KGFfcG9zaXRpb24sIDAuMCwgMS4wKTtcbiBcdHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xufVxuYDtcblx0XHR9XG5cblx0XHQvLyBMb2FkIGRlZmF1bHQgZnJhZ21lbnQgc2hhZGVyIGlmIG5vIG9uZSBpcyBwYXNzXG5cdFx0aWYgKCFmcmFnU3RyaW5nKSB7XG5cdFx0XHRmcmFnU3RyaW5nID0gYFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxuXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xudW5pZm9ybSBmbG9hdCB1X3RpbWU7XG5cbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xuXG52b2lkIG1haW4oKXtcblx0dmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb247XG5cdGdsX0ZyYWdDb2xvciA9IHZlYzQoc3QueCxzdC55LGFicyhzaW4odV90aW1lKSksMS4wKTtcbn1cbmA7XG5cdFx0fVxuXG5cdFx0dGhpcy52ZXJ0ZXhTdHJpbmcgPSB2ZXJ0U3RyaW5nO1xuXHRcdHRoaXMuZnJhZ21lbnRTdHJpbmcgPSBmcmFnU3RyaW5nO1xuXG5cdFx0dGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuXHRcdGxldCBuVGltZXMgPSAoZnJhZ1N0cmluZy5tYXRjaCgvdV90aW1lL2cpIHx8IFtdKS5sZW5ndGg7XG5cdFx0bGV0IG5Nb3VzZSA9IChmcmFnU3RyaW5nLm1hdGNoKC91X21vdXNlL2cpIHx8IFtdKS5sZW5ndGg7XG5cdFx0dGhpcy5hbmltYXRlZCA9IG5UaW1lcyA+IDEgfHwgbk1vdXNlID4gMTtcblxuXHRcdGxldCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcy5nbCwgdmVydFN0cmluZywgdGhpcy5nbC5WRVJURVhfU0hBREVSKTtcblx0XHRsZXQgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcy5nbCwgZnJhZ1N0cmluZywgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuXG5cdFx0Ly8gSWYgRnJhZ21lbnQgc2hhZGVyIGZhaWxzIGxvYWQgYSBlbXB0eSBvbmUgdG8gc2lnbiB0aGUgZXJyb3Jcblx0XHRpZiAoIWZyYWdtZW50U2hhZGVyKSB7XG5cdFx0XHRmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCBcInZvaWQgbWFpbigpe1xcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wKTtcXG59XCIsIHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSKTtcblx0XHRcdHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmlzVmFsaWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBhbmQgdXNlIHByb2dyYW1cblx0XHRsZXQgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odGhpcy5nbCwgW3ZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXJdKTsvLywgWzAsMV0sW1wiYV90ZXhjb29yZFwiLFwiYV9wb3NpdGlvblwiXSk7XG5cdFx0dGhpcy5nbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG5cdFx0Ly8gRGVsZXRlIHNoYWRlcnNcblx0XHQvLyB0aGlzLmdsLmRldGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuXHRcdC8vIHRoaXMuZ2wuZGV0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblx0XHR0aGlzLmdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuXHRcdHRoaXMuZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcblxuXHRcdHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG5cdFx0dGhpcy5jaGFuZ2UgPSB0cnVlO1xuXG5cdFx0dGhpcy5yZW5kZXIodHJ1ZSk7XG5cdH07XG5cblx0c2V0VW5pZm9ybShuYW1lLCAuLi52YWx1ZSkge1xuXHRcdGxldCB1ID0ge307XG5cdFx0dVtuYW1lXSA9IHZhbHVlOyBcblx0XHR0aGlzLnNldFVuaWZvcm1zKHUpO1xuXHR9XG5cblx0c2V0VW5pZm9ybXModW5pZm9ybXMpIHtcblx0XHRsZXQgcGFyc2VkID0gcGFyc2VVbmlmb3Jtcyh1bmlmb3Jtcyk7XG5cdFx0Ly8gU2V0IGVhY2ggdW5pZm9ybVxuICAgICAgICBmb3IgKGxldCB1IGluIHBhcnNlZCkge1xuICAgICAgICAgICAgaWYgKHBhcnNlZFt1XS50eXBlID09PSAnc2FtcGxlcjJEJykge1xuICAgICAgICAgICAgICAgIC8vIEZvciB0ZXh0dXJlcywgd2UgbmVlZCB0byB0cmFjayB0ZXh0dXJlIHVuaXRzLCBzbyB3ZSBoYXZlIGEgc3BlY2lhbCBzZXR0ZXJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRleHR1cmVVbmlmb3JtKHBhcnNlZFt1XS5uYW1lLCBwYXJzZWRbdV0udmFsdWVbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm0ocGFyc2VkW3VdLm1ldGhvZCwgcGFyc2VkW3VdLnR5cGUsIHBhcnNlZFt1XS5uYW1lLCBwYXJzZWRbdV0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cblxuXHQvLyBleDogcHJvZ3JhbS51bmlmb3JtKCczZicsICdwb3NpdGlvbicsIHgsIHksIHopO1xuICAgIHVuaWZvcm0obWV0aG9kLCB0eXBlLCBuYW1lLCAuLi52YWx1ZSkgeyAvLyAndmFsdWUnIGlzIGEgbWV0aG9kLWFwcHJvcHJpYXRlIGFyZ3VtZW50cyBsaXN0XG4gICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSB0aGlzLnVuaWZvcm1zW25hbWVdIHx8IHt9O1xuICAgICAgICBsZXQgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNbbmFtZV07XG4gICAgICAgIGxldCBjaGFuZ2UgPSBpc0RpZmYodW5pZm9ybS52YWx1ZSx2YWx1ZSk7XG4gICAgICAgIGlmICggY2hhbmdlIHx8IHRoaXMuY2hhbmdlIHx8IFxuICAgICAgICBcdHVuaWZvcm0ubG9jYXRpb24gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBcdHVuaWZvcm0udmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBcdHVuaWZvcm0ubmFtZSA9IG5hbWU7XG4gICAgICAgIFx0dW5pZm9ybS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBcdHVuaWZvcm0udHlwZSA9IHR5cGU7XG4gICAgICAgIFx0dW5pZm9ybS5tZXRob2QgPSAndW5pZm9ybScgKyBtZXRob2Q7XG4gICAgICAgIFx0dW5pZm9ybS5sb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgbmFtZSk7XG4gICAgICAgIFxuICAgICAgICBcdC8vIGlmKEFycmF5LmlzQXJyYXkodW5pZm9ybS52YWx1ZVswXSkpe1xuICAgICAgICBcdC8vIFx0Y29uc29sZS5sb2codW5pZm9ybSxcIiAtPiBbXCIsdW5pZm9ybS52YWx1ZVswXSxcIl1cIik7XG4gICAgICAgIFx0Ly8gfSBlbHNlIHtcbiAgICAgICAgXHQvLyBcdGNvbnNvbGUubG9nKHVuaWZvcm0sXCIgLT4gXCIsdW5pZm9ybS52YWx1ZSk7XG4gICAgICAgIFx0Ly8gfVxuICAgICAgICBcdFxuICAgICAgICBcdHRoaXMuZ2xbdW5pZm9ybS5tZXRob2RdLmFwcGx5KHRoaXMuZ2wsIFt1bmlmb3JtLmxvY2F0aW9uXS5jb25jYXQodW5pZm9ybS52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cdHNldFRleHR1cmVVbmlmb3JtKG5hbWUsIHVybCkge1xuXHRcdGlmICh0aGlzLnRleHR1cmVzW25hbWVdPT09dW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmxvYWRUZXh0dXJlKG5hbWUsdXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy51bmlmb3JtKFwiMWlcIiwgXCJzYW1wbGVyMkRcIiwgbmFtZSwgdGhpcy50ZXh1cmVJbmRleCk7XG5cdFx0XHR0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCt0aGlzLnRleHVyZUluZGV4KTtcblx0XHRcdHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzW25hbWVdKTtcblx0XHRcdHRoaXMudW5pZm9ybShcIjJmXCIsIFwidmVjMlwiLCBuYW1lK1wiUmVzb2x1dGlvblwiLCB0aGlzLnRleHR1cmVzW25hbWVdLmltYWdlLndpZHRoLCB0aGlzLnRleHR1cmVzW25hbWVdLmltYWdlLmhlaWdodCk7XG5cdFx0XHR0aGlzLnRleHVyZUluZGV4Kys7XG5cdFx0fVxuXHR9XG5cblx0bG9hZFRleHR1cmUobmFtZSx1cmwpIHtcblx0XHRsZXQgdGV4ID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XG5cblx0XHR0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGV4KTtcblx0XHR0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIDEsIDEsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMjU1LCAyNTUsIDAsIDI1NV0pKTsgLy8gcmVkXG5cblx0XHR0ZXguaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHR0ZXguaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oZ2xzbF9jYW52YXMsIF90ZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2FkVGV4dHVyZShnbHNsX2NhbnZhcy5nbCwgX3RleCk7IFxuXHRcdFx0XHRnbHNsX2NhbnZhcy5yZW5kZXIodHJ1ZSk7XG5cdFx0XHR9O1xuXHRcdH0odGhpcyx0ZXgpO1xuXHRcdHRleC5uYW1lID0gbmFtZTtcblx0XHR0ZXgudXJsID0gdXJsO1xuXHRcdHRleC5pbWFnZS5zcmMgPSB1cmw7XG5cblx0XHR0aGlzLnRleHR1cmVzW25hbWVdID0gdGV4O1xuXHR9O1xuXG5cdHNldE1vdXNlKG1vdXNlKSB7XG5cdFx0Ly8gc2V0IHRoZSBtb3VzZSB1bmlmb3JtXG5cdFx0bGV0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRpZiAobW91c2UgJiYgbW91c2UueCAmJiBtb3VzZS55ICYmXG5cdFx0XHRtb3VzZS54ID49IHJlY3QubGVmdCAmJiBcblx0XHRcdG1vdXNlLnggPD0gcmVjdC5yaWdodCAmJiBcblx0XHRcdG1vdXNlLnkgPj0gcmVjdC50b3AgJiZcblx0XHRcdG1vdXNlLnkgPD0gcmVjdC5ib3R0b20pIHtcblxuXHRcdFx0dGhpcy51bmlmb3JtKFwiMmZcIiwgXCJ2ZWMyXCIsIFwidV9tb3VzZVwiLCBtb3VzZS54LXJlY3QubGVmdCwgdGhpcy5jYW52YXMuaGVpZ2h0LShtb3VzZS55LXJlY3QudG9wKSApO1xuXHRcdH1cblx0fTtcblxuXHRvblJlc2l6ZSgpIHtcblx0XHRsZXQgcmVhbFRvQ1NTUGl4ZWxzID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuXHRcdC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xuXHRcdC8vIGFuZCBjb21wdXRlIGEgc2l6ZSBuZWVkZWQgdG8gbWFrZSBvdXIgZHJhd2luZ2J1ZmZlciBtYXRjaCBpdCBpblxuXHRcdC8vIGRldmljZSBwaXhlbHMuXG5cdFx0bGV0IGRpc3BsYXlXaWR0aCAgPSBNYXRoLmZsb29yKHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoICAqIHJlYWxUb0NTU1BpeGVscyk7XG5cdFx0bGV0IGRpc3BsYXlIZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuZ2wuY2FudmFzLmNsaWVudEhlaWdodCAqIHJlYWxUb0NTU1BpeGVscyk7XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxuXHRcdGlmICh0aGlzLmdsLmNhbnZhcy53aWR0aCAgIT0gZGlzcGxheVdpZHRoIHx8XG5cdFx0XHR0aGlzLmdsLmNhbnZhcy5oZWlnaHQgIT0gZGlzcGxheUhlaWdodCkge1xuXG5cdFx0XHQvLyBNYWtlIHRoZSBjYW52YXMgdGhlIHNhbWUgc2l6ZVxuXHRcdFx0dGhpcy5nbC5jYW52YXMud2lkdGggID0gZGlzcGxheVdpZHRoO1xuXHRcdFx0dGhpcy5nbC5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcblxuXHRcdFx0Ly8gU2V0IHRoZSB2aWV3cG9ydCB0byBtYXRjaFxuXHRcdFx0Z2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5jYW52YXMud2lkdGgsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZvcmNlUmVuZGVyKSB7XG5cblx0XHRpZiAoKGZvcmNlUmVuZGVyICE9PSB1bmRlZmluZWQgJiYgZm9yY2VSZW5kZXIpIHx8IFxuXHRcdFx0KHRoaXMuYW5pbWF0ZWQgJiYgaXNDYW52YXNWaXNpYmxlKHRoaXMuY2FudmFzKSkpIHtcblxuXHRcdFx0Ly8gc2V0IHRoZSB0aW1lIHVuaWZvcm1cblx0XHRcdGxldCB0aW1lRnJhbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0bGV0IHRpbWUgPSAodGltZUZyYW1lLXRoaXMudGltZUxvYWQpIC8gMTAwMC4wO1xuXHRcdFx0dGhpcy51bmlmb3JtKFwiMWZcIixcImZsb2F0XCIsXCJ1X3RpbWVcIix0aW1lKTtcblxuXHRcdFx0Ly8gc2V0IHRoZSByZXNvbHV0aW9uIHVuaWZvcm1cblx0XHRcdHRoaXMudW5pZm9ybShcIjJmXCIsXCJ2ZWMyXCIsXCJ1X3Jlc29sdXRpb25cIiwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCApO1xuXG5cdFx0XHR0aGlzLnRleHVyZUluZGV4ID0gMDtcblx0XHRcdGZvciAobGV0IHRleCBpbiB0aGlzLnRleHR1cmVzKSB7XG5cdFx0XHRcdHRoaXMuc2V0VW5pZm9ybSh0ZXgsIHRoaXMudGV4dHVyZXNbdGV4XS51cmwpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEcmF3IHRoZSByZWN0YW5nbGUuXG5cdFx0XHR0aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIDYpO1xuXG5cdFx0XHR0aGlzLmNoYW5nZSA9IGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHR2ZXJzaW9uKCkge1xuXHRcdHJldHVybiBcIjAuMC4xXCI7XG5cdH07XG59O1xuXG53aW5kb3cuR2xzbENhbnZhcyA9IEdsc2xDYW52YXM7IiwiaW1wb3J0IHsgaXNQb3dlck9mMiB9IGZyb20gXCIuL3Rvb2xzXCJcblxudmFyIGxhc3RFcnJvciA9IFwiXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZShfZ2wsIF90ZXh0dXJlKSB7XG5cdF9nbC5iaW5kVGV4dHVyZShfZ2wuVEVYVFVSRV8yRCwgX3RleHR1cmUpO1xuXHRfZ2wucGl4ZWxTdG9yZWkoX2dsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xuXHRfZ2wudGV4SW1hZ2UyRChfZ2wuVEVYVFVSRV8yRCwgMCwgX2dsLlJHQkEsIF9nbC5SR0JBLCBfZ2wuVU5TSUdORURfQllURSwgX3RleHR1cmUuaW1hZ2UpO1xuXHRpZiAoaXNQb3dlck9mMihfdGV4dHVyZS5pbWFnZS53aWR0aCkgJiYgaXNQb3dlck9mMihfdGV4dHVyZS5pbWFnZS5oZWlnaHQpICkge1xuXHRcdF9nbC5nZW5lcmF0ZU1pcG1hcChfZ2wuVEVYVFVSRV8yRCk7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01BR19GSUxURVIsIF9nbC5MSU5FQVIpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBfZ2wuTElORUFSX01JUE1BUF9MSU5FQVIpO1xuXHR9IGVsc2Uge1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9XUkFQX1MsIF9nbC5DTEFNUF9UT19FREdFKTtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfV1JBUF9ULCBfZ2wuQ0xBTVBfVE9fRURHRSk7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01JTl9GSUxURVIsIF9nbC5MSU5FQVIpO1xuXHR9XG5cdF9nbC5iaW5kVGV4dHVyZShfZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgSFRMTSBmb3IgYSBmYWlsdXJlIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYW52YXNDb250YWluZXJJZCBpZCBvZiBjb250YWluZXIgb2YgdGhcbiAqICAgICAgICBjYW52YXMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBodG1sLlxuICovXG52YXIgbWFrZUZhaWxIVE1MID0gZnVuY3Rpb24obXNnKSB7XG4gXHRyZXR1cm4gJycgK1xuXHRcdCc8dGFibGUgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjOENFOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPjx0cj4nICtcblx0XHQnPHRkIGFsaWduPVwiY2VudGVyXCI+JyArXG5cdFx0JzxkaXYgc3R5bGU9XCJkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1wiPicgK1xuXHRcdCc8ZGl2IHN0eWxlPVwiXCI+JyArIG1zZyArICc8L2Rpdj4nICtcblx0XHQnPC9kaXY+JyArXG5cdFx0JzwvdGQ+PC90cj48L3RhYmxlPic7XG59O1xuXG4vKipcbiAqIE1lc2FzZ2UgZm9yIGdldHRpbmcgYSB3ZWJnbCBicm93c2VyXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG52YXIgR0VUX0FfV0VCR0xfQlJPV1NFUiA9ICcnICtcblx0J1RoaXMgcGFnZSByZXF1aXJlcyBhIGJyb3dzZXIgdGhhdCBzdXBwb3J0cyBXZWJHTC48YnIvPicgK1xuXHQnPGEgaHJlZj1cImh0dHA6Ly9nZXQud2ViZ2wub3JnXCI+Q2xpY2sgaGVyZSB0byB1cGdyYWRlIHlvdXIgYnJvd3Nlci48L2E+JztcblxuLyoqXG4gKiBNZXNhc2dlIGZvciBuZWVkIGJldHRlciBoYXJkd2FyZVxuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIE9USEVSX1BST0JMRU0gPSAnJyArXG5cdFwiSXQgZG9lc24ndCBhcHBlYXIgeW91ciBjb21wdXRlciBjYW4gc3VwcG9ydCBXZWJHTC48YnIvPlwiICtcblx0JzxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy90cm91Ymxlc2hvb3RpbmcvXCI+Q2xpY2sgaGVyZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L2E+JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgd2ViZ2wgY29udGV4dC4gSWYgY3JlYXRpb24gZmFpbHMgaXQgd2lsbFxuICogY2hhbmdlIHRoZSBjb250ZW50cyBvZiB0aGUgY29udGFpbmVyIG9mIHRoZSA8Y2FudmFzPlxuICogdGFnIHRvIGFuIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgY29ycmVjdCBsaW5rcyBmb3IgV2ViR0wuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNhbnZhcy4gVGhlIGNhbnZhcyBlbGVtZW50IHRvIGNyZWF0ZSBhXG4gKiAgICAgY29udGV4dCBmcm9tLlxuICogQHBhcmFtIHtXZWJHTENvbnRleHRDcmVhdGlvbkF0dGlyYnV0ZXN9IG9wdF9hdHRyaWJzIEFueVxuICogICAgIGNyZWF0aW9uIGF0dHJpYnV0ZXMgeW91IHdhbnQgdG8gcGFzcyBpbi5cbiAqIEByZXR1cm4ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gVGhlIGNyZWF0ZWQgY29udGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwV2ViR0wgKF9jYW52YXMsIF9vcHRfYXR0cmlicykge1xuXG5cdGZ1bmN0aW9uIHNob3dMaW5rKHN0cikge1xuXHRcdHZhciBjb250YWluZXIgPSBfY2FudmFzLnBhcmVudE5vZGU7XG5cdFx0aWYgKGNvbnRhaW5lcikge1xuXHRcdCAgY29udGFpbmVyLmlubmVySFRNTCA9IG1ha2VGYWlsSFRNTChzdHIpO1xuXHRcdH1cblx0fTtcblxuXHRpZiAoIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHRzaG93TGluayhHRVRfQV9XRUJHTF9CUk9XU0VSKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHZhciBjb250ZXh0ID0gY3JlYXRlM0RDb250ZXh0KF9jYW52YXMsIF9vcHRfYXR0cmlicyk7XG5cdGlmICghY29udGV4dCkge1xuXHRcdHNob3dMaW5rKE9USEVSX1BST0JMRU0pO1xuXHR9XG5cdGNvbnRleHQuZ2V0RXh0ZW5zaW9uKCdPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKTtcblx0cmV0dXJuIGNvbnRleHQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSB3ZWJnbCBjb250ZXh0LlxuICogQHBhcmFtIHshQ2FudmFzfSBjYW52YXMgVGhlIGNhbnZhcyB0YWcgdG8gZ2V0IGNvbnRleHRcbiAqICAgICBmcm9tLiBJZiBvbmUgaXMgbm90IHBhc3NlZCBpbiBvbmUgd2lsbCBiZSBjcmVhdGVkLlxuICogQHJldHVybiB7IVdlYkdMQ29udGV4dH0gVGhlIGNyZWF0ZWQgY29udGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTNEQ29udGV4dChfY2FudmFzLCBfb3B0X2F0dHJpYnMpIHtcblx0dmFyIG5hbWVzID0gW1wid2ViZ2xcIiwgXCJleHBlcmltZW50YWwtd2ViZ2xcIl07XG5cdHZhciBjb250ZXh0ID0gbnVsbDtcblx0Zm9yICh2YXIgaWkgPSAwOyBpaSA8IG5hbWVzLmxlbmd0aDsgKytpaSkge1xuXHRcdHRyeSB7XG5cdCAgXHRcdGNvbnRleHQgPSBfY2FudmFzLmdldENvbnRleHQobmFtZXNbaWldLCBfb3B0X2F0dHJpYnMpO1xuXHRcdH0gY2F0Y2goZSkge31cblx0XHRcdGlmIChjb250ZXh0KSB7XG5cdCAgXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb250ZXh0O1xufVxuXG4vKlxuICpcdENyZWF0ZSBhIFZlcnRleCBvZiBhIHNwZWNpZmljIHR5cGUgKGdsLlZFUlRFWF9TSEFERVIvKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhZGVyKF9nbCwgX3NvdXJjZSwgX3R5cGUpIHtcblx0dmFyIHNoYWRlciA9IF9nbC5jcmVhdGVTaGFkZXIoIF90eXBlICk7XG5cdF9nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBfc291cmNlKTtcblx0X2dsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuXHR2YXIgY29tcGlsZWQgPSBfZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgX2dsLkNPTVBJTEVfU1RBVFVTKTtcblx0XG5cdGlmICghY29tcGlsZWQpIHtcblx0XHQvLyBTb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgY29tcGlsYXRpb247IGdldCB0aGUgZXJyb3Jcblx0XHRsYXN0RXJyb3IgPSBfZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuXHRcdGNvbnNvbGUuZXJyb3IoXCIqKiogRXJyb3IgY29tcGlsaW5nIHNoYWRlciAnXCIgKyBzaGFkZXIgKyBcIic6XCIgKyBsYXN0RXJyb3IpO1xuXHRcdF9nbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBzaGFkZXI7XG59XG5cbi8qKlxuICogTG9hZHMgYSBzaGFkZXIuXG4gKiBAcGFyYW0geyFXZWJHTENvbnRleHR9IGdsIFRoZSBXZWJHTENvbnRleHQgdG8gdXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHNoYWRlclNvdXJjZSBUaGUgc2hhZGVyIHNvdXJjZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzaGFkZXJUeXBlIFRoZSB0eXBlIG9mIHNoYWRlci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nKTogdm9pZCkgb3B0X2Vycm9yQ2FsbGJhY2sgY2FsbGJhY2sgZm9yIGVycm9ycy5cbiAqIEByZXR1cm4geyFXZWJHTFNoYWRlcn0gVGhlIGNyZWF0ZWQgc2hhZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgc2hhZGVycywgb3B0X2F0dHJpYnMsIG9wdF9sb2NhdGlvbnMpIHtcblx0bGV0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cdGZvciAobGV0IGlpID0gMDsgaWkgPCBzaGFkZXJzLmxlbmd0aDsgKytpaSkge1xuXHRcdGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBzaGFkZXJzW2lpXSk7XG5cdH1cblx0aWYgKG9wdF9hdHRyaWJzKSB7XG5cdFx0Zm9yIChsZXQgaWkgPSAwOyBpaSA8IG9wdF9hdHRyaWJzLmxlbmd0aDsgKytpaSkge1xuXHQgIFx0XHRnbC5iaW5kQXR0cmliTG9jYXRpb24oXG5cdFx0ICBcdHByb2dyYW0sXG5cdFx0ICBcdG9wdF9sb2NhdGlvbnMgPyBvcHRfbG9jYXRpb25zW2lpXSA6IGlpLFxuXHRcdCAgXHRvcHRfYXR0cmlic1tpaV0pO1xuXHRcdH1cblx0fVxuXHRnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcblxuXHQvLyBDaGVjayB0aGUgbGluayBzdGF0dXNcblx0bGV0IGxpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuXHRpZiAoIWxpbmtlZCkge1xuXHRcdC8vIHNvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhlIGxpbmtcblx0XHRsYXN0RXJyb3IgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyAocHJvZ3JhbSk7XG5cdFx0Y29uc29sZS5sb2coXCJFcnJvciBpbiBwcm9ncmFtIGxpbmtpbmc6XCIgKyBsYXN0RXJyb3IpO1xuXG5cdFx0Z2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gcHJvZ3JhbTtcbn07XG5cblxuLy8gQnkgQnJldHQgQ2FtYmVyIG9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGFuZ3JhbXMvdGFuZ3JhbS9ibG9iL21hc3Rlci9zcmMvZ2wvZ2xzbC5qc1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pZm9ybXModW5pZm9ybXMsIHByZWZpeCA9IG51bGwpIHtcbiAgICBsZXQgcGFyc2VkID0gW107XG5cbiAgICBmb3IgKGxldCBuYW1lIGluIHVuaWZvcm1zKSB7XG4gICAgICAgIGxldCB1bmlmb3JtID0gdW5pZm9ybXNbbmFtZV07XG4gICAgICAgIGxldCB1O1xuXG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnLicgKyBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2luZ2xlIGZsb2F0XG4gICAgICAgIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmxvYXQnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJzFmJyxcbiAgICAgICAgICAgICAgICBuYW1lLCB2YWx1ZTpcbiAgICAgICAgICAgICAgICB1bmlmb3JtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcnJheTogdmVjdG9yLCBhcnJheSBvZiBmbG9hdHMsIGFycmF5IG9mIHRleHR1cmVzLCBvciBhcnJheSBvZiBzdHJ1Y3RzXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodW5pZm9ybSkpIHtcbiAgICAgICAgICAgIC8vIE51bWVyaWMgdmFsdWVzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVuaWZvcm1bMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgdmVjdG9ycyAodmVjMiwgdmVjMywgdmVjNClcbiAgICAgICAgICAgICAgICBpZiAodW5pZm9ybS5sZW5ndGggPj0gMiAmJiB1bmlmb3JtLmxlbmd0aCA8PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd2ZWMnICsgdW5pZm9ybS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHVuaWZvcm0ubGVuZ3RoICsgJ2Z2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgYXJyYXlcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh1bmlmb3JtLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Zsb2F0W10nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnMWZ2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyAnWzBdJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBhc3N1bWUgbWF0cml4IGZvciAodHlwZW9mID09IEZsb2F0MzJBcnJheSAmJiBsZW5ndGggPT0gMTYpP1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXJyYXkgb2YgdGV4dHVyZXNcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NhbXBsZXIyRCcsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJzFpJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGFycmF5cyAtIGJ1dCBvbmx5IGFycmF5cyBvZiB2ZWN0b3JzIGFyZSBhbGxvd2VkIGluIHRoaXMgY2FzZVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh1bmlmb3JtWzBdKSAmJiB0eXBlb2YgdW5pZm9ybVswXVswXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAvLyBmbG9hdCB2ZWN0b3JzICh2ZWMyLCB2ZWMzLCB2ZWM0KVxuICAgICAgICAgICAgICAgIGlmICh1bmlmb3JtWzBdLmxlbmd0aCA+PSAyICYmIHVuaWZvcm1bMF0ubGVuZ3RoIDw9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHU9MDsgdSA8IHVuaWZvcm0ubGVuZ3RoOyB1KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmVjJyArIHVuaWZvcm1bMF0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdW5pZm9ybVt1XS5sZW5ndGggKyAnZnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyAnWycgKyB1ICsgJ10nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtW3VdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIGVycm9yP1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXJyYXkgb2Ygc3RydWN0dXJlc1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm1bMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh1PTA7IHUgPCB1bmlmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBlYWNoIHN0cnVjdCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goLi4ucGFyc2VVbmlmb3Jtcyh1bmlmb3JtW3VdLCBuYW1lICsgJ1snICsgdSArICddJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBCb29sZWFuXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRleHR1cmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3NhbXBsZXIyRCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0cnVjdHVyZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIFNldCBlYWNoIGZpZWxkIGluIHRoZSBzdHJ1Y3RcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKC4uLnBhcnNlVW5pZm9ybXModW5pZm9ybSwgbmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogc3VwcG9ydCBvdGhlciBub24tZmxvYXQgdHlwZXM/IChpbnQsIGV0Yy4pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZDtcbn07IiwiZXhwb3J0IGZ1bmN0aW9uIGlzQ2FudmFzVmlzaWJsZShfY2FudmFzKXtcblx0cmV0dXJuXHQoKF9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgX2NhbnZhcy5oZWlnaHQpID4gMCkgJiYgXG5cdFx0XHQoX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Bvd2VyT2YyKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT0gMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0SGlnaGVzdFBvd2VyT2ZUd28oeCkge1xuICAgIC0teDtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDMyOyBpIDw8PSAxKSB7XG4gICAgICAgIHggPSB4IHwgeCA+PiBpO1xuICAgIH1cbiAgICByZXR1cm4geCArIDE7XG59O1xuXG4vKlxuICpcdEZldGNoIGZvciBmaWxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hIVFRQKHVybCwgbWV0aG9vZCl7XG5cdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHJlc3BvbnNlO1xuXG5cdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0cmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblx0XHR9XG5cdH1cblx0cmVxdWVzdC5vcGVuKG1ldGhvb2QgPyBtZXRob29kIDogJ0dFVCcsIHVybCwgZmFsc2UpO1xuXHRyZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3BsYWluXCIpO1xuXHRyZXF1ZXN0LnNlbmQoKTtcblx0cmV0dXJuIHJlc3BvbnNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRm9ybWF0TnVtYmVyTGVuZ3RoKF9udW0sIF9sZW5ndGgpIHtcbiAgICB2YXIgciA9IFwiXCIgKyBfbnVtO1xuICAgIHdoaWxlIChyLmxlbmd0aCA8IF9sZW5ndGgpIHtcbiAgICAgICAgciA9IFwiMFwiICsgcjtcbiAgICB9XG4gICAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb3VzZVBvcyhfY2FudmFzLCBfZXZ0KSB7XG5cdHZhciByZWN0ID0gX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0cmV0dXJuIHtcblx0XHR4OiBfZXZ0LmNsaWVudFggLSByZWN0LmxlZnQsXG5cdFx0eTogX2V2dC5jbGllbnRZIC0gcmVjdC50b3Bcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlmZihhLCBiKSB7XG5cdGlmIChhICYmIGIpIHtcblx0XHRyZXR1cm4gYS50b1N0cmluZygpICE9PSBiLnRvU3RyaW5nKCk7XG5cdH1cbiAgICByZXR1cm4gZmFsc2U7XG59Il19
