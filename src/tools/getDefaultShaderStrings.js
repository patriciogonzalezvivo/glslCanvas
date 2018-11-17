const vertexString100 = `
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

const fragmentString100 = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texcoord;

void main(){
    gl_FragColor = vec4(0.0);
}
`;

const vertexString300 = `#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec2 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
}
`;

const fragmentString300 = `#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec2 v_texcoord;
out vec4 frag_color;

void main(){
    frag_color = vec4(0.0);
}
`;

export default function getDefaultShaderStrings(glslVersion) {
    return glslVersion === 300 ? {
        fragmentString: fragmentString300,
        vertexString: vertexString300,
    } : {
        fragmentString: fragmentString100,
        vertexString: vertexString100,
    };
}
