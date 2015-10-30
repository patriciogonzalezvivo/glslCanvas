[GlslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) is JavaScript Library that helps you easily load GLSL Fragment and Vertex Shaders into an HTML canvas. I have used this in my [Book of Shaders](http://www.thebookofshaders.com).

## How to use it?

First, make sure you are loading the latest version of ```GlslCanvas.min.js``` on your page by adding this line to your HTML:
```html
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/build/GlslCanvas.min.js"></script>
```

You should have a canvas element in your HTML: 

```html
<canvas id="glslCanvas" data-fragment-url="shader.frag" width="500" height="500"></canvas>
```

Then initialize a new GlslCanvas on that element in Javascript:

```javascript
var dom = document.getElementById("glslCanvas");
var sandbox = new GlslCanvas(dom);
sandbox.render();
```

As you can see, you can load the fragment shader by setting the attribute ```data-fragment-url``` to a url. But there are also a few other ways to load shaders and textures:

* ```data-fragment``` : load a fragment shader by providing the content of the shader as a string
* ```data-fragment-url``` : load a fragment shader by providing a valid url
* ```data-vertex``` : load a fragment shader by providing the content of the shader as a string
* ```data-vertex-url``` : load a fragment shader by providing a valid url
* ```data-textures```: add a list of texture urls separated by commas (ex: ```data-textures="texture.jpg,normal_map.png,something.jpg"```). Textures will be assigned in order to ```uniform sampler2D``` variables with names following this style: ```u_tex0```, ```u_tex1```, ```u_tex2```, etc.

If you prefer to load shaders through Javascript instead of the DOM, you can do:

```javascript
// Load only the Fragment Shader
var string_frag_code = "main(){\ngl_FragColor = vec4(1.0);\n}\n";
sandbox.load(string_frag_code);

// Load a Fragment and Vertex Shader
var string_vert_code = "attribute vec4 a_position; main(){\ggl_Position = a_position;\n}\n";
sandbox.load(string_frag_code,string_vert_code);
```

### Uniforms

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

### Quick start

In the [```index.html```](index.html) file, you will find handy example code to automatically load shaders into the present canvas using element attributes. A more generic version of the code in index.html could look like this:

```javascript

    // 
    window.onload = function () { 
        load_all_GlslCanvas();
        render_all_GlslCanvas(); 
    };

    // Keep track of the mouse
    var mouse = {x: 0, y: 0};
    document.addEventListener('mousemove', function(e){ 
        mouse.x = e.clientX || e.pageX; 
        mouse.y = e.clientY || e.pageY 
    }, false);

    // Provides requestAnimationFrame in a cross browser way.
    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback, element) {
                    return window.setTimeout(callback, 1000/60);
             };
    })();
    
    var billboards = []; 
    function load_all_GlslCanvas() {
        var list = document.getElementsByTagName("canvas");

        // Load shaders on canvas
        for(var i = 0; i < list.length; i++){
            var sandbox = new GlslCanvas(list[i]);
            if (sandbox.isValid) {
                billboards.push(sandbox);
            }
        }
    }

    function render_all_GlslCanvas(){
        for(var i = 0; i < billboards.length; i++){
            billboards[i].setMouse(mouse);
            billboards[i].render();
        }
        window.requestAnimFrame(render_all_GlslCanvas);
    }
```

As you can see, this code also updates the position of the mouse.

## Demo

[Demo page: patriciogonzalezvivo.github.io/glslCanvas/](http://patriciogonzalezvivo.github.io/glslCanvas/)

## Collaborate 

If you'd like to contribute to this code, you need to:

* Install [```node``` and ```npm```](https://nodejs.org/download/) 
* Install gulp globally
```bash
npm install
npm install -g gulp
```
* Fork and clone [this repository](https://github.com/patriciogonzalezvivo/glslCanvas)
```bash
git clone https://github.com/patriciogonzalezvivo/glslCanvas.git
```
* "Gulp" while you edit it
```bash
cd glslCanvas
gulp
```
* Push to your local fork and make your pull request

Thank you

