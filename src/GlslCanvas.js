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

import { fetchHTTP, isCanvasVisible } from "./tools"
import { setupWebGL, createShader, createProgram, loadTexture } from "./gl"

/**
 * 	GLSL CANVAS
 */
export default class GlslCanvas {
	constructor(canvas) {

		this.canvas = canvas;
		this.isValid = false;

		let gl = setupWebGL(canvas);
		if (!gl) {
			return;
		}
		this.gl = gl;
		this.timeLoad = Date.now();

		// Load shader
		let fragContent = "";
		if (canvas.hasAttribute("data-fragment")) {
			fragContent = canvas.getAttribute('data-fragment');
		} else if (canvas.hasAttribute("data-fragment-url")) {
			let source = canvas.getAttribute('data-fragment-url');
			fragContent = fetchHTTP(source);
		} else {
			console.log("No data");
			return;
		}

		this.load(fragContent);

		if (!this.program){
			return;
		}

		// Construct VBO
		this.vbo = [];
		if (this.program) {
			// Define UVS buffer
			let uvs;
			let texCoordLocation = gl.getAttribLocation(this.program, "a_texcoord");
			uvs = gl.createBuffer();
			gl.bindBuffer( gl.ARRAY_BUFFER, uvs);
			gl.bufferData( gl.ARRAY_BUFFER, new Float32Array([0.0,  0.0,
															1.0,  0.0,
															0.0,  1.0,
															0.0,  1.0,
															1.0,  0.0,
															1.0,  1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray( texCoordLocation );
			gl.vertexAttribPointer( texCoordLocation, 2, gl.FLOAT, false, 0, 0);
			this.vbo.push(uvs);
			
			// Define Vertex buffer
			let vertices;
			let positionLocation = gl.getAttribLocation(this.program, "a_position");
			vertices = gl.createBuffer();
			this.gl.bindBuffer( gl.ARRAY_BUFFER, vertices);
			this.gl.bufferData( gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0,
															1.0, -1.0,
															-1.0,  1.0,
															-1.0,  1.0,
															1.0, -1.0,
															1.0,  1.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray( positionLocation );
			gl.vertexAttribPointer( positionLocation , 2, gl.FLOAT, false, 0, 0);
			this.vbo.push(vertices);
		}
		
		// load TEXTURES
		this.textures = {};
		let bLoadTextures = canvas.hasAttribute('data-textures');
		if (bLoadTextures) {
			let imgList = canvas.getAttribute('data-textures').split(',');
			for (let nImg in imgList) {
				this.loadTexture("u_tex"+nImg,imgList[nImg]);
			}
		}

		this.setMouse({x: 0, y: 0});
		this.render(true);
	};

	destroy() {
		this.animated = false;
		this.isValid = false;

		for (let tex in this.textures) {
			this.gl.deleteTexture(tex);
		}
		this.textures = {};

        this.gl.useProgram(null);
        this.gl.deleteProgram(this.program);
        this.program = null;
        this.gl.deleteBuffer(this.vbo );
        this.vbo = null;
        
    }

	load(fragString, vertString) {

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
		let nTimes = (fragString.match(/u_time/g) || []).length;
		let nMouse = (fragString.match(/u_mouse/g) || []).length;
		this.animated = nTimes > 1 || nMouse > 1;

		let vertexShader = createShader(this.gl, vertString, this.gl.VERTEX_SHADER);
		let fragmentShader = createShader(this.gl, fragString, this.gl.FRAGMENT_SHADER);

		// If Fragment shader fails load a empty one to sign the error
		if (!fragmentShader) {
			fragmentShader = createShader(this.gl, "void main(){\n\tgl_FragColor = vec4(1.0);\n}", this.gl.FRAGMENT_SHADER);
			this.isValid = false;
		} else {
			this.isValid = true;
		}

		// Create and use program
		let program = createProgram(this.gl, [vertexShader, fragmentShader]);
		this.gl.useProgram(program);

		// Delete shaders
		// this.gl.detachShader(program, vertexShader);
		// this.gl.detachShader(program, fragmentShader);
		this.gl.deleteShader(vertexShader);
		this.gl.deleteShader(fragmentShader);

		this.program = program;

		if (this.vbo){
			this.render(true);
		}
	};

	loadTexture(name,url) {
		let tex = this.gl.createTexture();

		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 0, 255])); // red

		tex.image = new Image();
		tex.image.onload = function(glsl_canvas, _tex){
			return function() {
				loadTexture(glsl_canvas.gl, _tex); 
				glsl_canvas.render(true);
			};
		}(this,tex);
		tex.name = name;
		tex.url = url;
		tex.image.src = url;

		this.textures[name] = tex;
	};

	setMouse(mouse) {
		// set the mouse uniform
		let rect = this.canvas.getBoundingClientRect();
		if (mouse && mouse.x && mouse.y &&
			mouse.x >= rect.left && 
			mouse.x <= rect.right && 
			mouse.y >= rect.top &&
			mouse.y <= rect.bottom) {

			this.setUniform("u_mouse", [ mouse.x-rect.left, this.canvas.height-(mouse.y-rect.top) ]); 
		}
	};

	setUniform(name,value) {
		let location = this.gl.getUniformLocation(this.program, name);
		if (typeof value === "number") {
			// console.log("1f " + name + " " + value);
			this.gl.uniform1f(location, value);
		} else if (typeof value === "string") {
			if (this.textures[name]===undefined) {
				this.loadTexture(name,value);
			} else {
				this.gl.uniform1i(	this.gl.getUniformLocation(this.program, name), 
									this.texureIndex);

				this.gl.activeTexture(this.gl.TEXTURE0+this.texureIndex);
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[name]);

				this.setUniform(name+"Resolution", [this.textures[name].image.width, 
													this.textures[name].image.height]);

				this.texureIndex++;
			}
		} else if (Array.isArray(value)) {
			switch (value.length) {
				case 1:
					// console.log("1f " + name + " " + value[0]);
					this.gl.uniform1f(location, value[0]);
			    	break;
			    case 2:
			    	// console.log("2f " + name + " " + value[0] + ", " + value[1]);
					this.gl.uniform2f(location, value[0], value[1]);
			    	break;
			    case 3:
			    	// console.log("3f " + name + " " + value[0] + ", " + value[1] + ", " + value[2]);
					this.gl.uniform3f(location, value[0], value[1], value[2]);
			    	break;
			    case 4:
			    	// console.log("4f " + name + " " + value[0] + ", " + value[1] + ", " + value[2] + ", " + value[3]);
					this.gl.uniform4f(location, value[0], value[1], value[2], value[3]);
			    	break;
				default:
			        return;
			};
		} else if (typeof value === "object"){
			for (let prop in value){
				this.setUniform(name+"."+prop,value.prop);
			}
		}
	};

	render(forceRender) {

		if ((forceRender !== undefined && forceRender) || 
			(this.animated && isCanvasVisible(this.canvas))) {

			// set the time uniform
			let timeFrame = Date.now();
			let time = (timeFrame-this.timeLoad) / 1000.0;
			this.setUniform("u_time",time);

			// set the resolution uniform
			this.setUniform("u_resolution", [this.canvas.width, this.canvas.height] );

			this.texureIndex = 0;
			for (let tex in this.textures) {
				this.setUniform(tex, this.textures[tex].url);
			}

			// Draw the rectangle.
			this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
			// console.log("Render " + time);
		}
	};

	version() {
		return "0.0.1";
	};
};

window.GlslCanvas = GlslCanvas;