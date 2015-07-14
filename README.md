## Use

In your HTML

```html
<script type="text/javascript" src="build/GlslCanvas.min.js" ></script>
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
sandox.load(string_code);

```

## Collaborate 

After installing [```node``` and ```npm```](https://nodejs.org/download/) install gulp globally, clone this repo and collaborate.

```bash
npm install
npm install -g gulp
git clone https://github.com/patriciogonzalezvivo/glslCanvas.git
cd glslCanvas
gulp
```
