// Author: CMH
// Title: Learning Shaders-FrameBuffer

#ifdef GL_ES
precision mediump float;
#endif

#if defined( BUFFER_0 )
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_buffer0;

vec4 timelapseAverage(sampler2D src_c_img, sampler2D src_p_img, vec2 uv, float weight)
{
	vec4 A=texture2D(src_c_img, uv);
	vec4 B=texture2D(src_p_img, uv);
	return mix(A, B, weight);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;				//screen coordinate
    //vec3 color = texture2D(u_tex1, st).rgb;
    //vec3 luma= vec3(0.21*color.r + 0.72*color.g + 0.07*color.b);  //perceptually relevant
    //vec3 fbo = texture2D(u_buffer0, st).rgb;
    
    float blur= 0.999-(u_mouse.x/u_resolution.x)*0.199;
    gl_FragColor = timelapseAverage(u_tex1, u_buffer0, st, blur);
}


