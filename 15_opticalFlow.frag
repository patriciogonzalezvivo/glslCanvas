// Author: CMH
// Title: Learning Shaders-Optical Flow (not work!)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;

vec4 opticalFlow(sampler2D src_c_img, sampler2D src_p_img, vec2 uv)
{
float scale=9.0;
float offset=0.01; 
float threshold=0.03;
float lambda=0.01;

	//vec2 	uv = gl_FragCoord.xy/iResolution.xy;
	vec2 	pos = uv;
	vec2	off_x = vec2(offset, 0.0);
	vec2	off_y = vec2(0.0, offset);
	
	//get the difference
	float 	scr_dif, gradx, grady;
	scr_dif =	texture2D(src_p_img, pos).x - texture2D(src_c_img, pos).x;
	
	//calculate the gradient
	gradx =	texture2D(src_p_img, pos + off_x).x - texture2D(src_p_img, pos - off_x).x;
	gradx +=	texture2D(src_c_img, pos + off_x).x - texture2D(src_c_img, pos - off_x).x;
	
	grady =	texture2D(src_p_img, pos + off_y).x - texture2D(src_p_img, pos - off_y).x;
	grady +=	texture2D(src_c_img, pos + off_y).x - texture2D(src_c_img, pos - off_y).x;
	
	float gradmag = sqrt((gradx*gradx)+(grady*grady)+lambda);
	
	float vxd = scr_dif*(gradx/gradmag);
	float vyd = scr_dif*(grady/gradmag);
		
	float xout = 0.0;
	if (abs(vxd) > threshold) xout = (vxd - threshold) * -scale; 
	float yout = 0.0;
	if (abs(vyd) > threshold) yout = (vyd - threshold) * -scale; 
	
	return vec4(xout, yout, 0.0, 1.0);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;				//screen coordinate
    vec3 color = texture2D(u_tex1, st).rgb;
    //vec3 luma= vec3(0.21*color.r + 0.72*color.g + 0.07*color.b);  //perceptually relevant
    vec3 luma= vec3(color.r);
    
    #if defined( BUFFER_0 )
    	gl_FragColor = vec4(luma, 1.0);
    #elif defined( BUFFER_1 )
    	gl_FragColor = texture2D(u_buffer0, st);
    #else
        gl_FragColor = opticalFlow(u_tex1, u_buffer1, st);//texture2D(u_buffer0, st);
    #endif
}


