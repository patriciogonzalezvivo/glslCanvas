[GlslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) is JavaScript Library that let you load a Fragment and Vertex GLSL Shaders in to a HTML canvas easily. I have use this on my [Book of Shaders](http://www.thebookofshaders.com).

## How to use it?

First let's be sure you are loading the last version of ```GlslCanvas.min.js``` on your page by adding this line to your HTML:
```html
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/build/GlslCanvas.min.js"></script>
```

Also in your HTML you should have a canvas: 

```html
<canvas id="glslCanvas" data-fragment-url="shader.frag" width="500" height="500"></canvas>
```

of you can created on you JS script:

```javascript
var dom = document.getElementById("glslCanvas");
var sandbox = new GlslCanvas(dom);
sandbox.render();
```

As you can see you can load the Fragment Shader by writing an url on the attribute ```data-fragment-url```. But also there are other ways to load things:

* ```data-fragment``` : load a fragment shader by providing the content of the shader as a string
* ```data-fragment-url``` : load a fragment shader by providing a valid url
* ```data-vertex``` : load a fragment shader by providing the content of the shader as a string
* ```data-vertex-url``` : load a fragment shader by providing a valid url
* ```data-textures```: add a list of textures url's separated by commas (ex: ```data-textures="texture.jpg,normal_map.png,something.jpg"```). Acording to the order on the list they will be assigned different ```uniform sampler2D``` names following this style: ```u_tex0```, ```u_tex1```, ```u_tex2```, etc.

If you prefere to load the shaders on your JS code you can do:

```javascript
// Load only the Fragment Shader
var string_frag_code = "main(){\ngl_FragColor = vec4(1.0);\n}\n";
sandbox.load(string_frag_code);

// Load a Fragment and Vertex Shader
var string_vert_code = "attribute vec4 a_position; main(){\ggl_Position = a_position;\n}\n";
sandbox.load(string_frag_code,string_vert_code);


```

### Uniforms

Some uniforms are automatically loaded for you. That's the case of:

* ```u_time```: is a ```float``` width elapsed time in seconds.
* ```u_resolution```: is a ```vec2``` with the dimensions of the viewport.
* ```u_mouse```: is a ```vec2``` with the position of the mouse, defined on ```.setMouse({x:[value],y:[value])```.
* ```u_tex[number]```: is a ```sampler2D``` of the loaded textues using the ```data-textures``` attribute

Also you can send your custom uniforms using the ```.setUniform([name],[...value])``` command. GlslCanvas will parse the value to determind which type is. If the value is a ```String``` will parse it as the url of a texture.

```javascript

// Assign .5 of brigtness to "uniform float u_brigtness"
sandbox.setUniform("u_brigtness",.5); 

// Assign (.2,.3) to brigtness to "uniform vec2 u_position"
sandbox.setUniform("u_position",.2,.3);

// Assign a red color to the "uniform vec3 u_color"
sandbox.setUniform("u_color",1,0,0); 

// Load a new textures and assign it to "uniform sampler2D u_texture"
sandbox.setUniform("u_texture","data/texture.jpg");
```

### The easy way to load all the present canvas

Take a look to [```index.html```](index.html) file, you will find a handy code to automatically load all the present canvas using just the attributes on them. A more generic version of it could look like this:

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

In case you want to contribute to this code you need to:

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

Thanks you

