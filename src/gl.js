import { isPowerOf2 } from "./tools"

var lastError = "";

export function loadTexture(_gl, _texture) {
	_gl.bindTexture(_gl.TEXTURE_2D, _texture);
	_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true);
	_gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, _texture.image);
	if (isPowerOf2(_texture.image.width) && isPowerOf2(_texture.image.height) ) {
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
var makeFailHTML = function(msg) {
 	return '' +
		'<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
		'<td align="center">' +
		'<div style="display: table-cell; vertical-align: middle;">' +
		'<div style="">' + msg + '</div>' +
		'</div>' +
		'</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
	'This page requires a browser that supports WebGL.<br/>' +
	'<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
	"It doesn't appear your computer can support WebGL.<br/>" +
	'<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

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
export function setupWebGL (_canvas, _opt_attribs) {

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
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
export function create3DContext(_canvas, _opt_attribs) {
	var names = ["webgl", "experimental-webgl"];
	var context = null;
	for (var ii = 0; ii < names.length; ++ii) {
		try {
	  		context = _canvas.getContext(names[ii], _opt_attribs);
		} catch(e) {}
			if (context) {
	  			break;
		}
	}
	return context;
}

/*
 *	Create a Vertex of a specific type (gl.VERTEX_SHADER/)
 */
export function createShader(_gl, _source, _type) {
	var shader = _gl.createShader( _type );
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
export function createProgram(gl, shaders, opt_attribs, opt_locations) {
	var program = gl.createProgram();
	for (var ii = 0; ii < shaders.length; ++ii) {
		gl.attachShader(program, shaders[ii]);
	}
	if (opt_attribs) {
		for (var ii = 0; ii < opt_attribs.length; ++ii) {
	  		gl.bindAttribLocation(
		  	program,
		  	opt_locations ? opt_locations[ii] : ii,
		  	opt_attribs[ii]);
		}
	}
	gl.linkProgram(program);

	// Check the link status
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!linked) {
		// something went wrong with the link
		lastError = gl.getProgramInfoLog (program);
		console.log("Error in program linking:" + lastError);

		gl.deleteProgram(program);
		return null;
	}
	return program;
};