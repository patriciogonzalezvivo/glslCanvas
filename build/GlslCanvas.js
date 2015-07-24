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
		this.isValid = false;
		this.vbo = [];

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
			fragContent = canvas.getAttribute('data-fragment');
		} else if (canvas.hasAttribute("data-fragment-url")) {
			var source = canvas.getAttribute('data-fragment-url');
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
		this.textures = {};
		var bLoadTextures = canvas.hasAttribute('data-textures');
		if (bLoadTextures) {
			var imgList = canvas.getAttribute('data-textures').split(',');
			for (var nImg in imgList) {
				this.loadTexture("u_tex" + nImg, imgList[nImg]);
			}
		}

		this.setMouse({ x: 0, y: 0 });
		this.render(true);
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

			this.gl.useProgram(null);
			this.gl.deleteProgram(this.program);
			this.program = null;
			this.gl.deleteBuffer(this.vbo);
			this.vbo = null;
			this.gl = null;
		}
	}, {
		key: "load",
		value: function load(fragString, vertString) {

			// Load default vertex shader if no one is pass
			if (!vertString) {
				vertString = "\n\
precision mediump float;\n\
uniform vec2 u_resolution;\n\
uniform float u_time;\n\
attribute vec2 a_position;\n\
attribute vec2 a_texcoord;\n\
varying vec2 v_texcoord;\n\
void main() {\n\
 	gl_Position = vec4(a_position, 0.0, 1.0);\n\
 	v_texcoord = a_texcoord;\n\
 }";
			}

			// Load default fragment shader if no one is pass
			if (!fragString) {
				fragString += "\n\
uniform vec2 u_resolution;\n\
uniform float u_time;\n\
varying vec2 v_texcoord;\n\
void main(){\n\
	vec2 st = gl_FragCoord.xy/u_resolution;\n\
	gl_FragColor = vec4(st.x,st.y,abs(sin(u_time)),1.0);\n\
}";
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
			// this.gl.detachShader(program, vertexShader);
			// this.gl.detachShader(program, fragmentShader);
			this.gl.deleteShader(vertexShader);
			this.gl.deleteShader(fragmentShader);

			this.program = program;
			this.change = true;

			if (this.vbo) {
				this.render(true);
			}
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
				if (parsed[u].type === 'sampler2D') {
					// For textures, we need to track texture units, so we have a special setter
					this.setTextureUniform(parsed[u].name, parsed[u].value[0]);
				} else {
					this.uniform(parsed[u].method, parsed[u].type, parsed[u].name, parsed[u].value);
				}
			}
		}

		// ex: program.uniform('3f', 'position', x, y, z);
	}, {
		key: "uniform",
		value: function uniform(method, type, name) {
			// 'value' is a method-appropriate arguments list
			this.uniforms[name] = this.uniforms[name] || {};
			var uniform = this.uniforms[name];

			for (var _len2 = arguments.length, value = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
				value[_key2 - 3] = arguments[_key2];
			}

			if (uniform.value === undefined || (0, _tools.isDiff)(uniform.value, value)) {
				uniform.name = name;
				uniform.value = value;
				uniform.type = type;
				uniform.method = 'uniform' + method;
				// console.log(uniform.method,uniform.name,uniform.value);
				if (this.change || uniform.location === undefined) {
					uniform.location = this.gl.getUniformLocation(this.program, name);
				}
				this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.value));
			}
		}
	}, {
		key: "setTextureUniform",
		value: function setTextureUniform(name, url) {
			if (this.textures[name] === undefined) {
				this.loadTexture(name, url);
			} else {
				// this.gl.uniform1i( this.gl.getUniformLocation(this.program, name), this.texureIndex);
				this.uniform("1i", "sampler2D", name, this.texureIndex);
				this.gl.activeTexture(this.gl.TEXTURE0 + this.texureIndex);
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[name]);
				this.uniform("2f", "vec2f", name + "Resolution", this.textures[name].image.width, this.textures[name].image.height);
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

				this.uniform("2f", "vec2f", "u_mouse", mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
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
				this.uniform("2f", "vec2f", "u_resolution", this.canvas.width, this.canvas.height);

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
var OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

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

  for (var name in uniforms) {
    var uniform = uniforms[name];
    var u;

    if (prefix) {
      name = prefix + '.' + name;
    }

    // Single float
    if (typeof uniform === 'number') {
      parsed.push({
        type: 'float',
        method: '1f',
        name: name, value: uniform
      });
    }
    // Array: vector, array of floats, array of textures, or array of structs
    else if (Array.isArray(uniform)) {
        // Numeric values
        if (typeof uniform[0] === 'number') {
          // float vectors (vec2, vec3, vec4)
          if (uniform.length >= 2 && uniform.length <= 4) {
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
            // for (u=0; u < uniform.length; u++) {
            //     parsed.push({
            //         type: 'sampler2D',
            //         method: '1i',
            //         name: name + '[' + u + ']',
            //         value: uniform[u]
            //     });
            // }
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
          else if (typeof uniform === 'object') {
              // Set each field in the struct
              parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform, name)));
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
	request.open(methood ? methood : 'GET', url, false);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC9nbHNsQ2FudmFzL3NyYy9HbHNsQ2FudmFzLmpzIiwiL1VzZXJzL3BhdHJpY2lvL0Rlc2t0b3AvZ2xzbENhbnZhcy9zcmMvZ2wuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC9nbHNsQ2FudmFzL3NyYy90b29scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN1Qm1ELFNBQVM7O2tCQUN3QixNQUFNOzs7Ozs7SUFLckUsVUFBVTtBQUNuQixVQURTLFVBQVUsQ0FDbEIsTUFBTSxFQUFFO3dCQURBLFVBQVU7O0FBRzdCLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLE1BQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLE1BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7QUFHZCxNQUFJLEVBQUUsR0FBRyxRQWhCRixVQUFVLEVBZ0JHLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLE1BQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixVQUFPO0dBQ1A7QUFDRCxNQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7QUFHM0IsTUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUN6QyxjQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxl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RUFDMUIsQ0FBQztDQUNGOztBQUVNLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDNUIsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1gsU0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQ3JDO0FBQ0UsUUFBTyxLQUFLLENBQUM7Q0FDaEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgUGF0cmljaW8gR29uemFsZXogVml2byAoIGh0dHA6Ly93d3cucGF0cmljaW9nb256YWxlenZpdm8uY29tIClcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxudGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxudGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xudXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2ZcbnRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbnN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG5GT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1JcbkNPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbkNPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBmZXRjaEhUVFAsIGlzQ2FudmFzVmlzaWJsZSwgaXNEaWZmIH0gZnJvbSBcIi4vdG9vbHNcIlxuaW1wb3J0IHsgc2V0dXBXZWJHTCwgY3JlYXRlU2hhZGVyLCBjcmVhdGVQcm9ncmFtLCBwYXJzZVVuaWZvcm1zLCBsb2FkVGV4dHVyZSB9IGZyb20gXCIuL2dsXCJcblxuLyoqXG4gKiBcdEdMU0wgQ0FOVkFTXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsc2xDYW52YXMge1xuXHRjb25zdHJ1Y3RvcihjYW52YXMpIHtcblxuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xuXHRcdHRoaXMuZ2wgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5wcm9ncmFtID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMudW5pZm9ybXMgPSB7fTtcblx0XHR0aGlzLmlzVmFsaWQgPSBmYWxzZTtcblx0XHR0aGlzLnZibyA9IFtdO1xuXG5cdFx0Ly8gR0wgQ29udGV4dFxuXHRcdGxldCBnbCA9IHNldHVwV2ViR0woY2FudmFzKTtcblx0XHRpZiAoIWdsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZ2wgPSBnbDtcblx0XHR0aGlzLnRpbWVMb2FkID0gRGF0ZS5ub3coKTtcblxuXHRcdC8vIExvYWQgc2hhZGVyXG5cdFx0bGV0IGZyYWdDb250ZW50ID0gXCJcIjtcblx0XHRpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZShcImRhdGEtZnJhZ21lbnRcIikpIHtcblx0XHRcdGZyYWdDb250ZW50ID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudCcpO1xuXHRcdH0gZWxzZSBpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZShcImRhdGEtZnJhZ21lbnQtdXJsXCIpKSB7XG5cdFx0XHRsZXQgc291cmNlID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC11cmwnKTtcblx0XHRcdGZyYWdDb250ZW50ID0gZmV0Y2hIVFRQKHNvdXJjZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiTm8gZGF0YVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmxvYWQoZnJhZ0NvbnRlbnQpO1xuXG5cdFx0aWYgKCF0aGlzLnByb2dyYW0pe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENvbnN0cnVjdCBWQk9cblx0XHRpZiAodGhpcy5wcm9ncmFtKSB7XG5cdFx0XHQvLyBEZWZpbmUgVVZTIGJ1ZmZlclxuXHRcdFx0bGV0IHV2cztcblx0XHRcdGxldCB0ZXhDb29yZExvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImFfdGV4Y29vcmRcIik7XG5cdFx0XHR1dnMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdGdsLmJpbmRCdWZmZXIoIGdsLkFSUkFZX0JVRkZFUiwgdXZzKTtcblx0XHRcdGdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMC4wLCAgMC4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMC4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MC4wLCAgMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MC4wLCAgMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMC4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRleENvb3JkTG9jYXRpb24gKTtcblx0XHRcdGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRleENvb3JkTG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cdFx0XHR0aGlzLnZiby5wdXNoKHV2cyk7XG5cdFx0XHRcblx0XHRcdC8vIERlZmluZSBWZXJ0ZXggYnVmZmVyXG5cdFx0XHRsZXQgdmVydGljZXM7XG5cdFx0XHRsZXQgcG9zaXRpb25Mb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuXHRcdFx0dmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdHRoaXMuZ2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0aWNlcyk7XG5cdFx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbLTEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDEuMCwgLTEuMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC0xLjAsICAxLjAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQtMS4wLCAgMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAtMS4wLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MS4wLCAgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBwb3NpdGlvbkxvY2F0aW9uICk7XG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBwb3NpdGlvbkxvY2F0aW9uICwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblx0XHRcdHRoaXMudmJvLnB1c2godmVydGljZXMpO1xuXHRcdH1cblx0XHRcblx0XHQvLyBsb2FkIFRFWFRVUkVTXG5cdFx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXHRcdGxldCBiTG9hZFRleHR1cmVzID0gY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpO1xuXHRcdGlmIChiTG9hZFRleHR1cmVzKSB7XG5cdFx0XHRsZXQgaW1nTGlzdCA9IGNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dHVyZXMnKS5zcGxpdCgnLCcpO1xuXHRcdFx0Zm9yIChsZXQgbkltZyBpbiBpbWdMaXN0KSB7XG5cdFx0XHRcdHRoaXMubG9hZFRleHR1cmUoXCJ1X3RleFwiK25JbWcsaW1nTGlzdFtuSW1nXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRNb3VzZSh7eDogMCwgeTogMH0pO1xuXHRcdHRoaXMucmVuZGVyKHRydWUpO1xuXHR9O1xuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuXHRcdHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuXHRcdGZvciAobGV0IHRleCBpbiB0aGlzLnRleHR1cmVzKSB7XG5cdFx0XHR0aGlzLmdsLmRlbGV0ZVRleHR1cmUodGV4KTtcblx0XHR9XG5cdFx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShudWxsKTtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2wuZGVsZXRlQnVmZmVyKHRoaXMudmJvICk7XG4gICAgICAgIHRoaXMudmJvID0gbnVsbDtcbiAgICAgICAgdGhpcy5nbCA9IG51bGw7XG4gICAgfVxuXG5cdGxvYWQoZnJhZ1N0cmluZywgdmVydFN0cmluZykge1xuXG5cdFx0Ly8gTG9hZCBkZWZhdWx0IHZlcnRleCBzaGFkZXIgaWYgbm8gb25lIGlzIHBhc3Ncblx0XHRpZiAoIXZlcnRTdHJpbmcpIHtcblx0XHRcdHZlcnRTdHJpbmcgPSBcIlxcblxcXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXFxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XFxuXFxcbmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XFxuXFxcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Y29vcmQ7XFxuXFxcbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xcblxcXG52b2lkIG1haW4oKSB7XFxuXFxcbiBcdGdsX1Bvc2l0aW9uID0gdmVjNChhX3Bvc2l0aW9uLCAwLjAsIDEuMCk7XFxuXFxcbiBcdHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xcblxcXG4gfVwiO1xuXHRcdH1cblxuXHRcdC8vIExvYWQgZGVmYXVsdCBmcmFnbWVudCBzaGFkZXIgaWYgbm8gb25lIGlzIHBhc3Ncblx0XHRpZiAoIWZyYWdTdHJpbmcpIHtcblx0XHRcdGZyYWdTdHJpbmcgKz0gXCJcXG5cXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXFxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XFxuXFxcbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xcblxcXG52b2lkIG1haW4oKXtcXG5cXFxuXHR2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbjtcXG5cXFxuXHRnbF9GcmFnQ29sb3IgPSB2ZWM0KHN0Lngsc3QueSxhYnMoc2luKHVfdGltZSkpLDEuMCk7XFxuXFxcbn1cIjtcblx0XHR9XG5cblx0XHR0aGlzLnZlcnRleFN0cmluZyA9IHZlcnRTdHJpbmc7XG5cdFx0dGhpcy5mcmFnbWVudFN0cmluZyA9IGZyYWdTdHJpbmc7XG5cblx0XHR0aGlzLmFuaW1hdGVkID0gZmFsc2U7XG5cdFx0bGV0IG5UaW1lcyA9IChmcmFnU3RyaW5nLm1hdGNoKC91X3RpbWUvZykgfHwgW10pLmxlbmd0aDtcblx0XHRsZXQgbk1vdXNlID0gKGZyYWdTdHJpbmcubWF0Y2goL3VfbW91c2UvZykgfHwgW10pLmxlbmd0aDtcblx0XHR0aGlzLmFuaW1hdGVkID0gblRpbWVzID4gMSB8fCBuTW91c2UgPiAxO1xuXG5cdFx0bGV0IHZlcnRleFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCB2ZXJ0U3RyaW5nLCB0aGlzLmdsLlZFUlRFWF9TSEFERVIpO1xuXHRcdGxldCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLmdsLCBmcmFnU3RyaW5nLCB0aGlzLmdsLkZSQUdNRU5UX1NIQURFUik7XG5cblx0XHQvLyBJZiBGcmFnbWVudCBzaGFkZXIgZmFpbHMgbG9hZCBhIGVtcHR5IG9uZSB0byBzaWduIHRoZSBlcnJvclxuXHRcdGlmICghZnJhZ21lbnRTaGFkZXIpIHtcblx0XHRcdGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKHRoaXMuZ2wsIFwidm9pZCBtYWluKCl7XFxuXFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCgxLjApO1xcbn1cIiwgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuXHRcdFx0dGhpcy5pc1ZhbGlkID0gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuaXNWYWxpZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIGFuZCB1c2UgcHJvZ3JhbVxuXHRcdGxldCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbSh0aGlzLmdsLCBbdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcl0pO1xuXHRcdHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuXHRcdC8vIERlbGV0ZSBzaGFkZXJzXG5cdFx0Ly8gdGhpcy5nbC5kZXRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcblx0XHQvLyB0aGlzLmdsLmRldGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG5cdFx0dGhpcy5nbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblx0XHR0aGlzLmdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG5cblx0XHR0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuXHRcdHRoaXMuY2hhbmdlID0gdHJ1ZTtcblxuXHRcdGlmICh0aGlzLnZibyl7XG5cdFx0XHR0aGlzLnJlbmRlcih0cnVlKTtcblx0XHR9XG5cdH07XG5cblx0c2V0VW5pZm9ybShuYW1lLCAuLi52YWx1ZSkge1xuXHRcdGxldCB1ID0ge307XG5cdFx0dVtuYW1lXSA9IHZhbHVlOyBcblx0XHR0aGlzLnNldFVuaWZvcm1zKHUpO1xuXHR9XG5cblx0c2V0VW5pZm9ybXModW5pZm9ybXMpIHtcblx0XHRsZXQgcGFyc2VkID0gcGFyc2VVbmlmb3Jtcyh1bmlmb3Jtcyk7XG5cdFx0Ly8gU2V0IGVhY2ggdW5pZm9ybVxuICAgICAgICBmb3IgKGxldCB1IGluIHBhcnNlZCkge1xuICAgICAgICAgICAgaWYgKHBhcnNlZFt1XS50eXBlID09PSAnc2FtcGxlcjJEJykge1xuICAgICAgICAgICAgICAgIC8vIEZvciB0ZXh0dXJlcywgd2UgbmVlZCB0byB0cmFjayB0ZXh0dXJlIHVuaXRzLCBzbyB3ZSBoYXZlIGEgc3BlY2lhbCBzZXR0ZXJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRleHR1cmVVbmlmb3JtKHBhcnNlZFt1XS5uYW1lLCBwYXJzZWRbdV0udmFsdWVbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm0ocGFyc2VkW3VdLm1ldGhvZCwgcGFyc2VkW3VdLnR5cGUsIHBhcnNlZFt1XS5uYW1lLCBwYXJzZWRbdV0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cblxuXHQvLyBleDogcHJvZ3JhbS51bmlmb3JtKCczZicsICdwb3NpdGlvbicsIHgsIHksIHopO1xuICAgIHVuaWZvcm0obWV0aG9kLCB0eXBlLCBuYW1lLCAuLi52YWx1ZSkgeyAvLyAndmFsdWUnIGlzIGEgbWV0aG9kLWFwcHJvcHJpYXRlIGFyZ3VtZW50cyBsaXN0XG4gICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSB0aGlzLnVuaWZvcm1zW25hbWVdIHx8IHt9O1xuICAgICAgICBsZXQgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNbbmFtZV07XG5cbiAgICAgICAgaWYgKHVuaWZvcm0udmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpc0RpZmYodW5pZm9ybS52YWx1ZSx2YWx1ZSkpIHtcbiAgICAgICAgXHR1bmlmb3JtLm5hbWUgPSBuYW1lO1xuICAgICAgICBcdHVuaWZvcm0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgXHR1bmlmb3JtLnR5cGUgPSB0eXBlO1xuICAgICAgICBcdHVuaWZvcm0ubWV0aG9kID0gJ3VuaWZvcm0nICsgbWV0aG9kO1xuICAgICAgICBcdC8vIGNvbnNvbGUubG9nKHVuaWZvcm0ubWV0aG9kLHVuaWZvcm0ubmFtZSx1bmlmb3JtLnZhbHVlKTtcbiAgICAgICAgXHRpZiAodGhpcy5jaGFuZ2UgfHwgdW5pZm9ybS5sb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBcdHVuaWZvcm0ubG9jYXRpb24gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIG5hbWUpO1xuICAgICAgICBcdH1cbiAgICAgICAgXHR0aGlzLmdsW3VuaWZvcm0ubWV0aG9kXS5hcHBseSh0aGlzLmdsLCBbdW5pZm9ybS5sb2NhdGlvbl0uY29uY2F0KHVuaWZvcm0udmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXHRzZXRUZXh0dXJlVW5pZm9ybShuYW1lLCB1cmwpIHtcblx0XHRpZiAodGhpcy50ZXh0dXJlc1tuYW1lXT09PXVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5sb2FkVGV4dHVyZShuYW1lLHVybCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHRoaXMuZ2wudW5pZm9ybTFpKCB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIG5hbWUpLCB0aGlzLnRleHVyZUluZGV4KTtcblx0XHRcdHRoaXMudW5pZm9ybShcIjFpXCIsIFwic2FtcGxlcjJEXCIsIG5hbWUsIHRoaXMudGV4dXJlSW5kZXgpO1xuXHRcdFx0dGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTArdGhpcy50ZXh1cmVJbmRleCk7XG5cdFx0XHR0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1tuYW1lXSk7XG5cdFx0XHR0aGlzLnVuaWZvcm0oXCIyZlwiLCBcInZlYzJmXCIsIG5hbWUrXCJSZXNvbHV0aW9uXCIsIHRoaXMudGV4dHVyZXNbbmFtZV0uaW1hZ2Uud2lkdGgsIHRoaXMudGV4dHVyZXNbbmFtZV0uaW1hZ2UuaGVpZ2h0KTtcblx0XHRcdHRoaXMudGV4dXJlSW5kZXgrKztcblx0XHR9XG5cdH1cblxuXHRsb2FkVGV4dHVyZShuYW1lLHVybCkge1xuXHRcdGxldCB0ZXggPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKTtcblxuXHRcdHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0ZXgpO1xuXHRcdHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgMSwgMSwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIG5ldyBVaW50OEFycmF5KFsyNTUsIDI1NSwgMCwgMjU1XSkpOyAvLyByZWRcblxuXHRcdHRleC5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdHRleC5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbihnbHNsX2NhbnZhcywgX3RleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvYWRUZXh0dXJlKGdsc2xfY2FudmFzLmdsLCBfdGV4KTsgXG5cdFx0XHRcdGdsc2xfY2FudmFzLnJlbmRlcih0cnVlKTtcblx0XHRcdH07XG5cdFx0fSh0aGlzLHRleCk7XG5cdFx0dGV4Lm5hbWUgPSBuYW1lO1xuXHRcdHRleC51cmwgPSB1cmw7XG5cdFx0dGV4LmltYWdlLnNyYyA9IHVybDtcblxuXHRcdHRoaXMudGV4dHVyZXNbbmFtZV0gPSB0ZXg7XG5cdH07XG5cblx0c2V0TW91c2UobW91c2UpIHtcblx0XHQvLyBzZXQgdGhlIG1vdXNlIHVuaWZvcm1cblx0XHRsZXQgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGlmIChtb3VzZSAmJiBtb3VzZS54ICYmIG1vdXNlLnkgJiZcblx0XHRcdG1vdXNlLnggPj0gcmVjdC5sZWZ0ICYmIFxuXHRcdFx0bW91c2UueCA8PSByZWN0LnJpZ2h0ICYmIFxuXHRcdFx0bW91c2UueSA+PSByZWN0LnRvcCAmJlxuXHRcdFx0bW91c2UueSA8PSByZWN0LmJvdHRvbSkge1xuXG5cdFx0XHR0aGlzLnVuaWZvcm0oXCIyZlwiLCBcInZlYzJmXCIsIFwidV9tb3VzZVwiLCBtb3VzZS54LXJlY3QubGVmdCwgdGhpcy5jYW52YXMuaGVpZ2h0LShtb3VzZS55LXJlY3QudG9wKSApOyBcblx0XHR9XG5cdH07XG5cblx0cmVuZGVyKGZvcmNlUmVuZGVyKSB7XG5cblx0XHRpZiAoKGZvcmNlUmVuZGVyICE9PSB1bmRlZmluZWQgJiYgZm9yY2VSZW5kZXIpIHx8IFxuXHRcdFx0KHRoaXMuYW5pbWF0ZWQgJiYgaXNDYW52YXNWaXNpYmxlKHRoaXMuY2FudmFzKSkpIHtcblxuXHRcdFx0Ly8gc2V0IHRoZSB0aW1lIHVuaWZvcm1cblx0XHRcdGxldCB0aW1lRnJhbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0bGV0IHRpbWUgPSAodGltZUZyYW1lLXRoaXMudGltZUxvYWQpIC8gMTAwMC4wO1xuXHRcdFx0dGhpcy51bmlmb3JtKFwiMWZcIixcImZsb2F0XCIsXCJ1X3RpbWVcIix0aW1lKTtcblxuXHRcdFx0Ly8gc2V0IHRoZSByZXNvbHV0aW9uIHVuaWZvcm1cblx0XHRcdHRoaXMudW5pZm9ybShcIjJmXCIsXCJ2ZWMyZlwiLFwidV9yZXNvbHV0aW9uXCIsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblxuXHRcdFx0dGhpcy50ZXh1cmVJbmRleCA9IDA7XG5cdFx0XHRmb3IgKGxldCB0ZXggaW4gdGhpcy50ZXh0dXJlcykge1xuXHRcdFx0XHR0aGlzLnNldFVuaWZvcm0odGV4LCB0aGlzLnRleHR1cmVzW3RleF0udXJsKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRHJhdyB0aGUgcmVjdGFuZ2xlLlxuXHRcdFx0dGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVTLCAwLCA2KTtcblxuXHRcdFx0dGhpcy5jaGFuZ2UgPSBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0dmVyc2lvbigpIHtcblx0XHRyZXR1cm4gXCIwLjAuMVwiO1xuXHR9O1xufTtcblxud2luZG93Lkdsc2xDYW52YXMgPSBHbHNsQ2FudmFzOyIsImltcG9ydCB7IGlzUG93ZXJPZjIgfSBmcm9tIFwiLi90b29sc1wiXG5cbnZhciBsYXN0RXJyb3IgPSBcIlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmUoX2dsLCBfdGV4dHVyZSkge1xuXHRfZ2wuYmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIF90ZXh0dXJlKTtcblx0X2dsLnBpeGVsU3RvcmVpKF9nbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcblx0X2dsLnRleEltYWdlMkQoX2dsLlRFWFRVUkVfMkQsIDAsIF9nbC5SR0JBLCBfZ2wuUkdCQSwgX2dsLlVOU0lHTkVEX0JZVEUsIF90ZXh0dXJlLmltYWdlKTtcblx0aWYgKGlzUG93ZXJPZjIoX3RleHR1cmUuaW1hZ2Uud2lkdGgpICYmIGlzUG93ZXJPZjIoX3RleHR1cmUuaW1hZ2UuaGVpZ2h0KSApIHtcblx0XHRfZ2wuZ2VuZXJhdGVNaXBtYXAoX2dsLlRFWFRVUkVfMkQpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBfZ2wuTElORUFSKTtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgX2dsLkxJTkVBUl9NSVBNQVBfTElORUFSKTtcblx0fSBlbHNlIHtcblx0XHRfZ2wudGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfV1JBUF9TLCBfZ2wuQ0xBTVBfVE9fRURHRSk7XG5cdFx0X2dsLnRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfVCwgX2dsLkNMQU1QX1RPX0VER0UpO1xuXHRcdF9nbC50ZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBfZ2wuTElORUFSKTtcblx0fVxuXHRfZ2wuYmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIG51bGwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIEhUTE0gZm9yIGEgZmFpbHVyZSBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FudmFzQ29udGFpbmVySWQgaWQgb2YgY29udGFpbmVyIG9mIHRoXG4gKiAgICAgICAgY2FudmFzLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgaHRtbC5cbiAqL1xudmFyIG1ha2VGYWlsSFRNTCA9IGZ1bmN0aW9uKG1zZykge1xuIFx0cmV0dXJuICcnICtcblx0XHQnPHRhYmxlIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzhDRTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj48dHI+JyArXG5cdFx0Jzx0ZCBhbGlnbj1cImNlbnRlclwiPicgK1xuXHRcdCc8ZGl2IHN0eWxlPVwiZGlzcGxheTogdGFibGUtY2VsbDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcIj4nICtcblx0XHQnPGRpdiBzdHlsZT1cIlwiPicgKyBtc2cgKyAnPC9kaXY+JyArXG5cdFx0JzwvZGl2PicgK1xuXHRcdCc8L3RkPjwvdHI+PC90YWJsZT4nO1xufTtcblxuLyoqXG4gKiBNZXNhc2dlIGZvciBnZXR0aW5nIGEgd2ViZ2wgYnJvd3NlclxuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIEdFVF9BX1dFQkdMX0JST1dTRVIgPSAnJyArXG5cdCdUaGlzIHBhZ2UgcmVxdWlyZXMgYSBicm93c2VyIHRoYXQgc3VwcG9ydHMgV2ViR0wuPGJyLz4nICtcblx0JzxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZ1wiPkNsaWNrIGhlcmUgdG8gdXBncmFkZSB5b3VyIGJyb3dzZXIuPC9hPic7XG5cbi8qKlxuICogTWVzYXNnZSBmb3IgbmVlZCBiZXR0ZXIgaGFyZHdhcmVcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciBPVEhFUl9QUk9CTEVNID0gJycgK1xuXHRcIkl0IGRvZXNuJ3QgYXBwZWFyIHlvdXIgY29tcHV0ZXIgY2FuIHN1cHBvcnQgV2ViR0wuPGJyLz5cIiArXG5cdCc8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvdHJvdWJsZXNob290aW5nL1wiPkNsaWNrIGhlcmUgZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9hPic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHdlYmdsIGNvbnRleHQuIElmIGNyZWF0aW9uIGZhaWxzIGl0IHdpbGxcbiAqIGNoYW5nZSB0aGUgY29udGVudHMgb2YgdGhlIGNvbnRhaW5lciBvZiB0aGUgPGNhbnZhcz5cbiAqIHRhZyB0byBhbiBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGNvcnJlY3QgbGlua3MgZm9yIFdlYkdMLlxuICogQHBhcmFtIHtFbGVtZW50fSBjYW52YXMuIFRoZSBjYW52YXMgZWxlbWVudCB0byBjcmVhdGUgYVxuICogICAgIGNvbnRleHQgZnJvbS5cbiAqIEBwYXJhbSB7V2ViR0xDb250ZXh0Q3JlYXRpb25BdHRpcmJ1dGVzfSBvcHRfYXR0cmlicyBBbnlcbiAqICAgICBjcmVhdGlvbiBhdHRyaWJ1dGVzIHlvdSB3YW50IHRvIHBhc3MgaW4uXG4gKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IFRoZSBjcmVhdGVkIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFdlYkdMIChfY2FudmFzLCBfb3B0X2F0dHJpYnMpIHtcblxuXHRmdW5jdGlvbiBzaG93TGluayhzdHIpIHtcblx0XHR2YXIgY29udGFpbmVyID0gX2NhbnZhcy5wYXJlbnROb2RlO1xuXHRcdGlmIChjb250YWluZXIpIHtcblx0XHQgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBtYWtlRmFpbEhUTUwoc3RyKTtcblx0XHR9XG5cdH07XG5cblx0aWYgKCF3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0c2hvd0xpbmsoR0VUX0FfV0VCR0xfQlJPV1NFUik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgY29udGV4dCA9IGNyZWF0ZTNEQ29udGV4dChfY2FudmFzLCBfb3B0X2F0dHJpYnMpO1xuXHRpZiAoIWNvbnRleHQpIHtcblx0XHRzaG93TGluayhPVEhFUl9QUk9CTEVNKTtcblx0fVxuXHRjb250ZXh0LmdldEV4dGVuc2lvbignT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJyk7XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgd2ViZ2wgY29udGV4dC5cbiAqIEBwYXJhbSB7IUNhbnZhc30gY2FudmFzIFRoZSBjYW52YXMgdGFnIHRvIGdldCBjb250ZXh0XG4gKiAgICAgZnJvbS4gSWYgb25lIGlzIG5vdCBwYXNzZWQgaW4gb25lIHdpbGwgYmUgY3JlYXRlZC5cbiAqIEByZXR1cm4geyFXZWJHTENvbnRleHR9IFRoZSBjcmVhdGVkIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUzRENvbnRleHQoX2NhbnZhcywgX29wdF9hdHRyaWJzKSB7XG5cdHZhciBuYW1lcyA9IFtcIndlYmdsXCIsIFwiZXhwZXJpbWVudGFsLXdlYmdsXCJdO1xuXHR2YXIgY29udGV4dCA9IG51bGw7XG5cdGZvciAodmFyIGlpID0gMDsgaWkgPCBuYW1lcy5sZW5ndGg7ICsraWkpIHtcblx0XHR0cnkge1xuXHQgIFx0XHRjb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2lpXSwgX29wdF9hdHRyaWJzKTtcblx0XHR9IGNhdGNoKGUpIHt9XG5cdFx0XHRpZiAoY29udGV4dCkge1xuXHQgIFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29udGV4dDtcbn1cblxuLypcbiAqXHRDcmVhdGUgYSBWZXJ0ZXggb2YgYSBzcGVjaWZpYyB0eXBlIChnbC5WRVJURVhfU0hBREVSLylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihfZ2wsIF9zb3VyY2UsIF90eXBlKSB7XG5cdHZhciBzaGFkZXIgPSBfZ2wuY3JlYXRlU2hhZGVyKCBfdHlwZSApO1xuXHRfZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgX3NvdXJjZSk7XG5cdF9nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cblx0dmFyIGNvbXBpbGVkID0gX2dsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIF9nbC5DT01QSUxFX1NUQVRVUyk7XG5cdFxuXHRpZiAoIWNvbXBpbGVkKSB7XG5cdFx0Ly8gU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIGNvbXBpbGF0aW9uOyBnZXQgdGhlIGVycm9yXG5cdFx0bGFzdEVycm9yID0gX2dsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcblx0XHRjb25zb2xlLmVycm9yKFwiKioqIEVycm9yIGNvbXBpbGluZyBzaGFkZXIgJ1wiICsgc2hhZGVyICsgXCInOlwiICsgbGFzdEVycm9yKTtcblx0XHRfZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gc2hhZGVyO1xufVxuXG4vKipcbiAqIExvYWRzIGEgc2hhZGVyLlxuICogQHBhcmFtIHshV2ViR0xDb250ZXh0fSBnbCBUaGUgV2ViR0xDb250ZXh0IHRvIHVzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaGFkZXJTb3VyY2UgVGhlIHNoYWRlciBzb3VyY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc2hhZGVyVHlwZSBUaGUgdHlwZSBvZiBzaGFkZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyk6IHZvaWQpIG9wdF9lcnJvckNhbGxiYWNrIGNhbGxiYWNrIGZvciBlcnJvcnMuXG4gKiBAcmV0dXJuIHshV2ViR0xTaGFkZXJ9IFRoZSBjcmVhdGVkIHNoYWRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHNoYWRlcnMsIG9wdF9hdHRyaWJzLCBvcHRfbG9jYXRpb25zKSB7XG5cdHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXHRmb3IgKHZhciBpaSA9IDA7IGlpIDwgc2hhZGVycy5sZW5ndGg7ICsraWkpIHtcblx0XHRnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgc2hhZGVyc1tpaV0pO1xuXHR9XG5cdGlmIChvcHRfYXR0cmlicykge1xuXHRcdGZvciAodmFyIGlpID0gMDsgaWkgPCBvcHRfYXR0cmlicy5sZW5ndGg7ICsraWkpIHtcblx0ICBcdFx0Z2wuYmluZEF0dHJpYkxvY2F0aW9uKFxuXHRcdCAgXHRwcm9ncmFtLFxuXHRcdCAgXHRvcHRfbG9jYXRpb25zID8gb3B0X2xvY2F0aW9uc1tpaV0gOiBpaSxcblx0XHQgIFx0b3B0X2F0dHJpYnNbaWldKTtcblx0XHR9XG5cdH1cblx0Z2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cblx0Ly8gQ2hlY2sgdGhlIGxpbmsgc3RhdHVzXG5cdGxldCBsaW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcblx0aWYgKCFsaW5rZWQpIHtcblx0XHQvLyBzb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoZSBsaW5rXG5cdFx0bGFzdEVycm9yID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHByb2dyYW0pO1xuXHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gcHJvZ3JhbSBsaW5raW5nOlwiICsgbGFzdEVycm9yKTtcblxuXHRcdGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cmV0dXJuIHByb2dyYW07XG59O1xuXG5cbi8vIEJ5IEJyZXR0IENhbWJlciBvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RhbmdyYW1zL3RhbmdyYW0vYmxvYi9tYXN0ZXIvc3JjL2dsL2dsc2wuanNcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVuaWZvcm1zKHVuaWZvcm1zLCBwcmVmaXggPSBudWxsKSB7XG4gICAgdmFyIHBhcnNlZCA9IFtdO1xuXG4gICAgZm9yICh2YXIgbmFtZSBpbiB1bmlmb3Jtcykge1xuICAgICAgICB2YXIgdW5pZm9ybSA9IHVuaWZvcm1zW25hbWVdO1xuICAgICAgICB2YXIgdTtcblxuICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICBuYW1lID0gcHJlZml4ICsgJy4nICsgbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbmdsZSBmbG9hdFxuICAgICAgICBpZiAodHlwZW9mIHVuaWZvcm0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Zsb2F0JyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICcxZicsXG4gICAgICAgICAgICAgICAgbmFtZSwgdmFsdWU6XG4gICAgICAgICAgICAgICAgdW5pZm9ybVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXJyYXk6IHZlY3RvciwgYXJyYXkgb2YgZmxvYXRzLCBhcnJheSBvZiB0ZXh0dXJlcywgb3IgYXJyYXkgb2Ygc3RydWN0c1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHVuaWZvcm0pKSB7XG4gICAgICAgICAgICAvLyBOdW1lcmljIHZhbHVlc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB1bmlmb3JtWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIC8vIGZsb2F0IHZlY3RvcnMgKHZlYzIsIHZlYzMsIHZlYzQpXG4gICAgICAgICAgICAgICAgaWYgKHVuaWZvcm0ubGVuZ3RoID49IDIgJiYgdW5pZm9ybS5sZW5ndGggPD0gNCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndmVjJyArIHVuaWZvcm0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiB1bmlmb3JtLmxlbmd0aCArICdmdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZsb2F0IGFycmF5XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodW5pZm9ybS5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdmbG9hdFtdJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJzFmdicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lICsgJ1swXScsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYXNzdW1lIG1hdHJpeCBmb3IgKHR5cGVvZiA9PSBGbG9hdDMyQXJyYXkgJiYgbGVuZ3RoID09IDE2KT9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIHRleHR1cmVzXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzYW1wbGVyMkQnLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICcxaScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gZm9yICh1PTA7IHUgPCB1bmlmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdzYW1wbGVyMkQnLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmFtZTogbmFtZSArICdbJyArIHUgKyAnXScsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YWx1ZTogdW5pZm9ybVt1XVxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcnJheSBvZiBhcnJheXMgLSBidXQgb25seSBhcnJheXMgb2YgdmVjdG9ycyBhcmUgYWxsb3dlZCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodW5pZm9ybVswXSkgJiYgdHlwZW9mIHVuaWZvcm1bMF1bMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgdmVjdG9ycyAodmVjMiwgdmVjMywgdmVjNClcbiAgICAgICAgICAgICAgICBpZiAodW5pZm9ybVswXS5sZW5ndGggPj0gMiAmJiB1bmlmb3JtWzBdLmxlbmd0aCA8PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgZm9yICh1PTA7IHUgPCB1bmlmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3ZlYycgKyB1bmlmb3JtWzBdLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHVuaWZvcm1bdV0ubGVuZ3RoICsgJ2Z2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lICsgJ1snICsgdSArICddJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVt1XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSBlcnJvcj9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIHN0cnVjdHVyZXNcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvciAodT0wOyB1IDwgdW5pZm9ybS5sZW5ndGg7IHUrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZWFjaCBzdHJ1Y3QgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wdXNoKC4uLnBhcnNlVW5pZm9ybXModW5pZm9ybVt1XSwgbmFtZSArICdbJyArIHUgKyAnXScpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQm9vbGVhblxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2wnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJzFpJyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUZXh0dXJlXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzYW1wbGVyMkQnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJzFpJyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdHJ1Y3R1cmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyBTZXQgZWFjaCBmaWVsZCBpbiB0aGUgc3RydWN0XG4gICAgICAgICAgICBwYXJzZWQucHVzaCguLi5wYXJzZVVuaWZvcm1zKHVuaWZvcm0sIG5hbWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHN1cHBvcnQgb3RoZXIgbm9uLWZsb2F0IHR5cGVzPyAoaW50LCBldGMuKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWQ7XG59OyIsImV4cG9ydCBmdW5jdGlvbiBpc0NhbnZhc1Zpc2libGUoX2NhbnZhcyl7XG5cdHJldHVyblx0KChfY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIF9jYW52YXMuaGVpZ2h0KSA+IDApICYmIFxuXHRcdFx0KF9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQb3dlck9mMih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEhpZ2hlc3RQb3dlck9mVHdvKHgpIHtcbiAgICAtLXg7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgICB4ID0geCB8IHggPj4gaTtcbiAgICB9XG4gICAgcmV0dXJuIHggKyAxO1xufTtcblxuLypcbiAqXHRGZXRjaCBmb3IgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZldGNoSFRUUCh1cmwsIG1ldGhvb2Qpe1xuXHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCByZXNwb25zZTtcblxuXHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcblx0XHRcdHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG5cdFx0fVxuXHR9XG5cdHJlcXVlc3Qub3BlbihtZXRob29kID8gbWV0aG9vZCA6ICdHRVQnLCB1cmwsIGZhbHNlKTtcblx0cmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC9wbGFpblwiKTtcblx0cmVxdWVzdC5zZW5kKCk7XG5cdHJldHVybiByZXNwb25zZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm1hdE51bWJlckxlbmd0aChfbnVtLCBfbGVuZ3RoKSB7XG4gICAgdmFyIHIgPSBcIlwiICsgX251bTtcbiAgICB3aGlsZSAoci5sZW5ndGggPCBfbGVuZ3RoKSB7XG4gICAgICAgIHIgPSBcIjBcIiArIHI7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW91c2VQb3MoX2NhbnZhcywgX2V2dCkge1xuXHR2YXIgcmVjdCA9IF9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdHJldHVybiB7XG5cdFx0eDogX2V2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuXHRcdHk6IF9ldnQuY2xpZW50WSAtIHJlY3QudG9wXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpZmYoYSwgYikge1xuXHRpZiAoYSAmJiBiKSB7XG5cdFx0cmV0dXJuIGEudG9TdHJpbmcoKSAhPT0gYi50b1N0cmluZygpO1xuXHR9XG4gICAgcmV0dXJuIGZhbHNlO1xufSJdfQ==
