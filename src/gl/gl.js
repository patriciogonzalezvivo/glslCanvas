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
 * Mesasge for getting a webgl browser
 * @type {string}
 */
let GET_A_WEBGL_BROWSER = `
	This page requires a browser that supports WebGL.<br/>
	<a href="http://get.webgl.org">Click here to upgrade your browser.</a>
`;

/**
 * Mesasge for need better hardware
 * @type {string}
 */
let OTHER_PROBLEM = `
	It does not appear your computer can support WebGL.<br/>
	<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>
`;

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
export function setupWebGL (canvas, optAttribs) {
    function showLink(str) {
        let container = canvas.parentNode;
        if (container) {
            container.innerHTML = makeFailHTML(str);
        }
    }

    if (!window.WebGLRenderingContext) {
        showLink(GET_A_WEBGL_BROWSER);
        return null;
    }

    let context = create3DContext(canvas, optAttribs);
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
export function create3DContext(canvas, optAttribs) {
    let names = ['webgl', 'experimental-webgl'];
    let context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], optAttribs);
        } catch(e) {
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
export function createShader(main, source, type) {
    let gl = main.gl;

    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

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
export function createProgram(main, shaders, optAttribs, optLocations) {
    let gl = main.gl;

    let program = gl.createProgram();
    for (let ii = 0; ii < shaders.length; ++ii) {
        gl.attachShader(program, shaders[ii]);
    }
    if (optAttribs) {
        for (let ii = 0; ii < optAttribs.length; ++ii) {
            gl.bindAttribLocation(
            program,
            optLocations ? optLocations[ii] : ii,
            optAttribs[ii]);
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
export function parseUniforms(uniforms, prefix = null) {
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
