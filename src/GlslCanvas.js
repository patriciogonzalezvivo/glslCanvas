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

import xhr from 'xhr';
import { createProgram, createShader, parseUniforms, setupWebGL } from './gl/gl';
import Texture from './gl/Texture';
import { isCanvasVisible, isDiff } from './tools/common';
import { subscribeMixin } from './tools/mixin';

export default class GlslCanvas {
    constructor(canvas, contextOptions, options) {
        subscribeMixin(this);

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
        this.realToCSSPixels = window.devicePixelRatio || 1;

        // Allow alpha
        canvas.style.backgroundColor = contextOptions.backgroundColor || 'rgba(1,1,1,0)';

        // Load shader
        if (canvas.hasAttribute('data-fragment')) {
            this.fragmentString = canvas.getAttribute('data-fragment');
        }
        else if (canvas.hasAttribute('data-fragment-url')) {
            let source = canvas.getAttribute('data-fragment-url');
            xhr.get(source, (error, response, body) => {
                this.load(body, this.vertexString);
            });
        }

        // Load shader
        if (canvas.hasAttribute('data-vertex')) {
            this.vertexString = canvas.getAttribute('data-vertex');
        }
        else if (canvas.hasAttribute('data-vertex-url')) {
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
        document.addEventListener('mousemove', (e) => {
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
            if (tex.destroy){
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

    load (fragString, vertString) {

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
                    if (match[1] && match[2] &&
                        (ext === 'jpg' || ext === 'jpeg' || ext === 'png' ||
                         ext === 'ogv' || ext === 'webm' || ext === 'mp4')) {
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
        }
        else {
            this.isValid = true;
        }

        // Create and use program
        let program = createProgram(this, [vertexShader, fragmentShader]);//, [0,1],['a_texcoord','a_position']);
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

    test (callback, fragString, vertString) {
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
                    timeElapsedMs: ext.getQueryObjectEXT(query, ext.QUERY_RESULT_EXT)/1000000.0
                };
                finishTest();
                callback(ret);
            } else {
                window.requestAnimationFrame(waitForTest);
            }
        }
        waitForTest();
    }

    loadTexture (name, urlElementOrData, options) {
        if (!options) {
            options = {};
        }

        if (typeof urlElementOrData === 'string') {
            options.url = urlElementOrData;
        }
        else if (typeof urlElementOrData === 'object' && urlElementOrData.data && urlElementOrData.width && urlElementOrData.height) {
            options.data = urlElementOrData.data;
            options.width = urlElementOrData.width;
            options.height = urlElementOrData.height;
        }
        else if (typeof urlElementOrData === 'object') {
            options.element = urlElementOrData;
        }

        if (this.textures[name]) {
            if (this.textures[name]) {
                this.textures[name].load(options);
                this.textures[name].on('loaded', (args) => {
                    this.forceRender = true;
                });
            }
        }
        else {
            this.textures[name] = new Texture(this.gl, name, options);
            this.textures[name].on('loaded', (args) => {
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
            }
            else {
                this.uniform(parsed[u].method, parsed[u].type, parsed[u].name, parsed[u].value);
            }
        }
        this.forceRender = true;
    }

    setMouse(mouse) {
        // set the mouse uniform
        let rect = this.canvas.getBoundingClientRect();
        if (mouse &&
            mouse.x && mouse.x >= rect.left && mouse.x <= rect.right &&
            mouse.y && mouse.y >= rect.top && mouse.y <= rect.bottom) {

            let mouse_x = (mouse.x - rect.left ) * this.realToCSSPixels;
            let mouse_y = (this.canvas.height - (mouse.y - rect.top) * this.realToCSSPixels);

            for (let key in this.buffers) {
                const buffer = this.buffers[key];
                this.gl.useProgram(buffer.program);
                this.gl.uniform2f(this.gl.getUniformLocation(buffer.program, 'u_mouse'), mouse_x, mouse_y);
            }
            this.gl.useProgram(this.program);
            this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'u_mouse'), mouse_x, mouse_y);
        }
    }

	// ex: program.uniform('3f', 'position', x, y, z);
    uniform (method, type, name, ...value) { // 'value' is a method-appropriate arguments list
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
        }
        else {
            return true;
        }
    }

    resize() {
        if (this.width !== this.canvas.clientWidth ||
            this.height !== this.canvas.clientHeight) {
            this.realToCSSPixels = window.devicePixelRatio || 1;

            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            let displayWidth = Math.floor(this.gl.canvas.clientWidth * this.realToCSSPixels);
            let displayHeight = Math.floor(this.gl.canvas.clientHeight * this.realToCSSPixels);

            // Check if the canvas is not the same size.
            if (this.gl.canvas.width !== displayWidth ||
                this.gl.canvas.height !== displayHeight) {
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

    render () {
        this.visible = isCanvasVisible(this.canvas);
        if (this.forceRender ||
            (this.animated && this.visible && ! this.paused)) {

            this.renderPrograms();

            // Trigger event
            this.trigger('render', {});
            this.change = false;
            this.forceRender = false;
        }
    }

    pause () {
        this.paused = true;
    }

    play () {
        this.paused = false;
    }

    // render main and buffers programs
    renderPrograms() {
        const gl = this.gl;
        const W = gl.canvas.width;
        const H = gl.canvas.height;
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
        const gl = this.gl, variables = this.variables;
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
                repeat: true,
            })) {
                const texture = this.textures[name];
                gl.activeTexture(gl.TEXTURE0 + this.TEXTURE_COUNT);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(gl.getUniformLocation(program, name), this.TEXTURE_COUNT);
                gl.uniform2f(gl.getUniformLocation(program, name + 'Resolution'), texture.width, texture.height);
                this.TEXTURE_COUNT ++;
            }
        }
    }

    // parse input strings
    getBuffers(fragString) {
        let buffers = {};
        if (fragString) {
            fragString.replace(/(?:^\s*)((?:#if|#elif)(?:\s*)(defined\s*\(\s*BUFFER_)(\d+)(?:\s*\))|(?:#ifdef)(?:\s*BUFFER_)(\d+)(?:\s*))/gm, function () {
                const i = arguments[3] || arguments[4];
                buffers['u_buffer' + i] = {
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
            buffer.name = 'u_buffer' + i;
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
            swap: function() {
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
            },
        };
    }

    // create a buffers
    createBuffer(W, H, program) {
        const glsl = this;
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
            resize: function(W, H) {
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
            },
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

    version() {
        return '0.1.4';
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
