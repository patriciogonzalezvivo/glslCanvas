## Use

In your HTML

```html
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/build/GlslCanvas.min.js"></script>
<canvas id="glslCanvas" data-fragment-url="shader.frag" width="500" height="500"></canvas>
```

In your JS

```javascript

...

var dom = document.getElementById("glslCanvas");
var sandbox = new GlslCanvas(dom);
sandbox.render();

...

// If you want to update the code by passing a string do

var string_code = "main(){\ngl_FragColor = vec4(1.0);\n}\n";
sandbox.load(string_code);

...

// Also you can load new textures
sandbox.setTexture("u_texture","data/texture.jpg");

```

If you want to load all the canvas on a page do:

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

## Demo

Check the [demo page: patriciogonzalezvivo.github.io/glslCanvas/](http://patriciogonzalezvivo.github.io/glslCanvas/)

## Collaborate 

After installing [```node``` and ```npm```](https://nodejs.org/download/) install gulp globally, clone [this repo](https://github.com/patriciogonzalezvivo/glslCanvas) and collaborate.

```bash
npm install
npm install -g gulp
git clone https://github.com/patriciogonzalezvivo/glslCanvas.git
cd glslCanvas
gulp
```
