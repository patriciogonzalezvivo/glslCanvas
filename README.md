[GlslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) is JavaScript Library that helps you easily load GLSL Fragment and Vertex Shaders into an HTML canvas. I have used this in my [Book of Shaders](http://thebookofshaders.com) and [glslEditor](http://editor.thebookofshaders.com).

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4BQMKQJDQ9XH6)

## How to use it?

There are different ways to do this. But first, make sure you are loading the latest version of ```GlslCanvas.js``` on your page by adding this line to your HTML:
```html
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js"></script>
```

or if you are using npm package manager on your console do:

```bash
npm install glslCanvas
```

### The easy way

1. Create a canvas element in your HTML.
2. Add the class name ```glslCanvas``` to the canvas.
3. Assign it a shader...
	* through a url using the attribute ```data-fragment-url```
	* or directly writing your code inside the ```data-fragment``` attribute

```html
<canvas class="glslCanvas" data-fragment-url="shader.frag" width="500" height="500"></canvas>
```

That's all! glslCanvas will automatically load a WebGL context in that ```<canvas>``` element, compile the shader and animate it for you.

As you can see, in this example we are loading the fragment shader by setting the attribute ```data-fragment-url``` to a url. But there are also a few other ways to load data to our ```glslCanvas```:

* ```data-fragment``` : load a fragment shader by providing the content of the shader as a string
* ```data-fragment-url``` : load a fragment shader by providing a valid url
* ```data-vertex``` : load a vertex shader by providing the content of the shader as a string
* ```data-vertex-url``` : load a vertex shader by providing a valid url
* ```data-textures```: add a list of texture urls separated by commas (ex: ```data-textures="texture.jpg,normal_map.png,something.jpg"```). Textures will be assigned in order to ```uniform sampler2D``` variables with names following this style: ```u_tex0```, ```u_tex1```, ```u_tex2```, etc.

All the catched ```.glslCanvas``` element whill be stored in the ```windows.glslCanvases``` array.

### The JS way
 
Create a ```<canvas>``` element and construct a ```glsCanvas()``` sandbox from it.

```javascript
var canvas = document.createElement("canvas");
var sandbox = new GlslCanvas(canvas);
```

In the case you need to reload the 

### Reloading shaders from JS

You can change the content of the shader as many times you want. Here are some examples:

```javascript
// Load only the Fragment Shader
var string_frag_code = "main(){\ngl_FragColor = vec4(1.0);\n}\n";
sandbox.load(string_frag_code);

// Load a Fragment and Vertex Shader
var string_vert_code = "attribute vec4 a_position; main(){\ggl_Position = a_position;\n}\n";
sandbox.load(string_frag_code, string_vert_code);
```

### Default Uniforms

Some uniforms are automatically loaded for you:

* ```u_time```: a ```float``` representing elapsed time in seconds.
* ```u_resolution```: a ```vec2``` representing the dimensions of the viewport.
* ```u_mouse```: a ```vec2``` representing the position of the mouse, defined in Javascript with ```.setMouse({x:[value],y:[value])```.
* ```u_tex[number]```: a ```sampler2D``` containing textures loaded with the ```data-textures``` attribute.

You can also send your custom uniforms to a shader with ```.setUniform([name],[...value])```. GlslCanvas will parse the value you provide to determine its type. If the value is a ```String```, GlslCanvas will parse it as the url of a texture.

```javascript

// Assign .5 to "uniform float u_brightness"
sandbox.setUniform("u_brightness",.5); 

// Assign (.2,.3) to "uniform vec2 u_position"
sandbox.setUniform("u_position",.2,.3);

// Assign a red color to "uniform vec3 u_color"
sandbox.setUniform("u_color",1,0,0); 

// Load a new texture and assign it to "uniform sampler2D u_texture"
sandbox.setUniform("u_texture","data/texture.jpg");
```

### Quick start demo

In the [```index.html```](https://github.com/patriciogonzalezvivo/glslCanvas/blob/gh-pages/index.html) file, you will find handy example code to start.

[Demo page: patriciogonzalezvivo.github.io/glslCanvas/](http://patriciogonzalezvivo.github.io/glslCanvas/)

## Collaborate 

If you'd like to contribute to this code, you need to:

* Fork and clone [this repository](https://github.com/patriciogonzalezvivo/glslCanvas)
```bash
git clone https://github.com/patriciogonzalezvivo/glslCanvas.git
cd glslCanvas
```
* Install [node, npm](https://nodejs.org/download/) and [yarn](http://yarnpkg.com)
* Install dependencies
```bash
yarn
```
* Run rollup in dev mode while you edit
```bash
yarn run dev
```
* Build for production
```bash
yarn run build
```
* Push to your local fork and make your pull request

Thank you
