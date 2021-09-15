//Author: FabriceNeyret2 
//Title: random quadtree 

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

float iTime=u_time;                 //shadertoy
vec2 iResolution=u_resolution;      //shadertoy
vec2 iMouse=u_mouse;                //shadertoy
//uniform sampler2D iChannel0;      //shadertoy
//uniform sampler2D iChannel1;      //shadertoy


//#define P_SUBDIV .2+.15*sin(iTime)
#define P_SUBDIV 0.1

float rnd(vec3 v) { return fract(4e4*sin(dot(v,vec3(13.46,41.74,-73.36))+17.34)); }

vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}


void main()
{
    vec2 uv = gl_FragCoord.xy*1.0;          //input
    vec2 u, R=iResolution.xy, m=iMouse.xy;
    /*
    if (m.x+m.y<1e-2*R.x) m = R*(.5+.5*sin(.1*iTime+vec2(0,1.6)));
    uv.x -= 8.*(m.x-R.x/2.);
    uv /= (1.-m.y/R.y)*4.;
    */
    vec4 color, luma;
    float adjust;
    
    float z = R.y/4.0;   
    int j=8;        //j初始8 紅紫
    for (int i=0; i<8; i++) {
        u = floor(uv/z)+.5;     //關鍵
        color=texture2D(u_tex1, (z*u)/R.xy);
        luma=vec4(0.21*color.r + 0.72*color.g + 0.07*color.b);
        adjust=pow(1.0-luma.g, 2.0);
        //if (rnd(vec3(z*u, iMouse.x)) < (P_SUBDIV+float(i)*0.13)) break;
        if (adjust < (P_SUBDIV+float(i)*0.11)) break;   //rnd(vec3(z*u, z))
        z /= 2.;
        j=i; //第幾次回圈結束
    }
    
    //i=0, 初始z＝600, 沒有進入if提早break, j=8 z=600 u=0.5
    //i=0, z=300紅, u=0.5        uv=300/2-abd(uv-300*0.5)
    //i=1, z=150橘, u=0.5, 1.5   uv=150/2-abd(uv-150*0.5)
    //i=2, z=75黃, u=0.5, 1.5, 2.5, 3.5
    //i=3, z=37.5綠, u= 0.5~7.5
    //i=4, z=16青綠, u= 0.5~15.5
    //i=5, z=8青, u= 0.5~31.5
    //i=6, z=4藍, u= 0.5~63.5
    //i=7, z=2黑, u= 0.5~127.5
    
    vec4 colornew=texture2D(u_tex1, (z*u)/R.xy);
    uv = z/2.-abs(uv-z*u); //z=2, 1-abs(uv-2u) 推測uv=0
    
    vec4 colorhue= vec4(hsv2rgb(vec3(float(j)/8.0, 0.7, 1.0)), 1.0);
    vec4 colorjitter=0.9+.4*cos( 6.28*rnd(vec3(z*u+1.,j))+ vec4(0,2.1,-2.1,0) );
    vec4 colorborder= min(uv.x,uv.y)<0.6 ? vec4(.0) : color;
    //color.g=pow(color.g, float(j));
    vec4 newframeColor = min(uv.x,uv.y)<0.6 ?  vec4(.0, .0, .0, 1.) : colornew;
    //gl_FragColor = colorborder;

    vec4 exposure=texture2D(u_buffer0, (gl_FragCoord.xy)/R.xy);
    gl_FragColor = mix(newframeColor, exposure, 0.99);
    

    /*
    gl_FragColor = min(uv.x,uv.y)<1. ? vec4(0) :
                // vec4(1); // vec4(z/R.y);
                .6+.4*cos(6.28*rnd(vec3(z*u+1.,z))+vec4(0,2.1,-2.1,0));
    */

    
    
}
