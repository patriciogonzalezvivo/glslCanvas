// Texture management
import { isPowerOf2 } from './tools';

// GL texture wrapper object for keeping track of a global set of textures, keyed by a unique user-defined name
export default class Texture {
    constructor(gl, name, options = {}) {
        this.gl = gl;
        this.texture = gl.createTexture();
        if (this.texture) {
            this.valid = true;
        }
        this.bind();

        this.name = name;
        this.source = null;
        this.source_type = null;
        this.loading = null;    // a Promise object to track the loading state of this texture
        this.filtering = options.filtering;
        this.sprites = options.sprites;
        this.texcoords = {};    // sprite UVs ([0, 1] range)
        this.sizes = {};        // sprite sizes (pixel size)

        // Default to a 1-pixel black texture so we can safely render while we wait for an image to load
        // See: http://stackoverflow.com/questions/19722247/webgl-wait-for-texture-to-load
        this.setData(1, 1, new Uint8Array([0, 0, 0, 255]), { filtering: 'nearest' });

        this.load(options);
    }

    // Destroy a single texture instance
    destroy() {
        if (!this.valid) {
            return;
        }
        this.gl.deleteTexture(this.texture);
        this.texture = null;
        delete this.data;
        this.data = null;
        this.valid = false;
    }

    bind(unit) {
        if (!this.valid) {
            return;
        }
        if (typeof unit === 'number') {
            if (Texture.activeUnit !== unit) {
                this.gl.activeTexture(this.gl.TEXTURE0 + unit);
                Texture.activeUnit = unit;
            }
        }
        if (Texture.activeTexture !== this.texture) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
            Texture.activeTexture = this.texture;
        }
    }

    load(options = {}) {
        this.loading = null;

        if (typeof options.url === 'string') {
            this.setUrl(options.url, options);
        } else if (options.element) {
            this.setElement(options.element, options);
        } else if (options.data && options.width && options.height) {
            this.setData(options.width, options.height, options.data, options);
        }
    }

    // Sets texture from an url
    setUrl(url, options = {}) {
        if (!this.valid) {
            return;
        }

        this.url = url; // save URL reference (will be overwritten when element is loaded below)
        this.source = this.url;
        this.source_type = 'url';

        this.loading = new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                try {
                    this.setElement(image, options);
                }
                catch (e) {
                    console.log(`Texture '${this.name}': failed to load url: '${this.source}'`, e, options);
                }

                resolve(this);
            };
            image.onerror = e => {
                // Warn and resolve on error
                console.log(`Texture '${this.name}': failed to load url: '${this.source}'`, e, options);
                resolve(this);
            };
            image.crossOrigin = 'anonymous';
            image.src = this.source;
        });
        return this.loading;
    }

    // Sets texture to a raw image buffer
    setData(width, height, data, options = {}) {
        this.width = width;
        this.height = height;

        this.source = data;
        this.source_type = 'data';

        this.update(options);
        this.setFiltering(options);

        this.loading = Promise.resolve(this);
        return this.loading;
    }

    // Sets the texture to track a element (canvas/image)
    setElement(element, options) {
        let el = element;

        // a string element is interpeted as a CSS selector
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (element instanceof HTMLCanvasElement ||
            element instanceof HTMLImageElement ||
            element instanceof HTMLVideoElement) {
            this.source = element;
            this.source_type = 'element';

            this.update(options);
            this.setFiltering(options);
        }
        else {
            let msg = `the 'element' parameter (\`element: ${JSON.stringify(el)}\`) must be a CSS `;
            msg += `selector string, or a <canvas>, <image> or <video> object`;
            console.log(`Texture '${this.name}': ${msg}`, options);
        }

        this.loading = Promise.resolve(this);
        return this.loading;
    }

    // Uploads current image or buffer to the GPU (can be used to update animated textures on the fly)
    update(options = {}) {
        if (!this.valid) {
            return;
        }

        this.bind();
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, (options.UNPACK_FLIP_Y_WEBGL === false ? false : true));
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.UNPACK_PREMULTIPLY_ALPHA_WEBGL || false);

        // Image or Canvas element
        if (this.source_type === 'element' &&
            (this.source instanceof HTMLCanvasElement || this.source instanceof HTMLVideoElement ||
             (this.source instanceof HTMLImageElement && this.source.complete))) {

            this.width = this.source.width;
            this.height = this.source.height;
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
        }
        // Raw image buffer
        else if (this.source_type === 'data') {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
        }
    }

    // Determines appropriate filtering mode
    setFiltering(options = {}) {
        if (!this.valid) {
            return;
        }

        options.filtering = options.filtering || 'linear';

        var gl = this.gl;
        this.bind();

        // For power-of-2 textures, the following presets are available:
        // mipmap: linear blend from nearest mip
        // linear: linear blend from original image (no mips)
        // nearest: nearest pixel from original image (no mips, 'blocky' look)
        if (isPowerOf2(this.width) && isPowerOf2(this.height)) {
            this.power_of_2 = true;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.TEXTURE_WRAP_S || (options.repeat && gl.REPEAT) || gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.TEXTURE_WRAP_T || (options.repeat && gl.REPEAT) || gl.CLAMP_TO_EDGE);

            if (options.filtering === 'mipmap') {
                this.filtering = 'mipmap';
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); // TODO: use trilinear filtering by defualt instead?
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else if (options.filtering === 'linear') {
                this.filtering = 'linear';
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
            else if (options.filtering === 'nearest') {
                this.filtering = 'nearest';
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
        }
        else {
            // WebGL has strict requirements on non-power-of-2 textures:
            // No mipmaps and must clamp to edge
            this.power_of_2 = false;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            if (options.filtering === 'nearest') {
                this.filtering = 'nearest';
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
            else { // default to linear for non-power-of-2 textures
                this.filtering = 'linear';
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
        }
    }
}

// Report max texture size for a GL context
Texture.getMaxTextureSize = function (gl) {
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
};

// Global set of textures, by name
Texture.activeUnit = -1;