// Author: CMH
// Title: Learning Shaders

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_buffer0;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;				//screen coordinate
    vec3 color = texture2D(u_tex1, st).rgb;
    vec3 luma= vec3(0.21*color.r + 0.72*color.g + 0.07*color.b);  //perceptually relevant
    vec3 exposure = texture2D(u_buffer0, st).rgb;

    float blur= 0.999-(u_mouse.x/u_resolution.x)*0.199;
    gl_FragColor = vec4(mix(luma, exposure, blur),1.0);
}


/*
	#if defined( BUFFER_0 )
	gl_FragColor = vec4(mix(luma, exposure, 0.995),1.0);
	#else 
    gl_FragColor = texture2D(u_buffer0, st);
	#endif
*/