// Author: CMH
// Title: 20200415_glsl Fluid_v1B(校正滑鼠問題).qtz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float iTime=u_time;			                //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;		      //更改 shadertoy->glsl editor 
vec4 iMouse=vec4(u_mouse.xy, 0.0, 0.0); //更改 shadertoy->glsl editor
//vec2 fragCoord = gl_FragCoord.xy;     //更改
uniform sampler2D iChannel0;		//更改
uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;




//原始出處https://www.shadertoy.com/view/4tGfDW
//Chimera's Breath
//by nimitz 2018 (twitter: @stormoid)

/*
  The main interest here is the addition of vorticity confinement with the curl stored in
  the alpha channel of the simulation texture (which was not used in the paper)
  this in turns allows for believable simulation of much lower viscosity fluids.
  Without vorticity confinement, the fluids that can be simulated are much more akin to
  thick oil.
  
  Base Simulation based on the 2011 paper: "Simple and fast fluids"
  (Martin Guay, Fabrice Colin, Richard Egli)
  (https://hal.inria.fr/inria-00596050/document)

  The actual simulation only requires one pass, Buffer A, B and C are just copies 
  of each other to increase the simulation speed (3 simulation passes per frame)
  and Buffer D is drawing colors on the simulated fluid 
  (could be using particles instead in a real scenario)
*/

#define dt 0.15
#define USE_VORTICITY_CONFINEMENT
#define MOUSE_ONLY

//Recommended values between 0.03 and 0.2
//higher values simulate lower viscosity fluids (think billowing smoke)
#define VORTICITY_AMOUNT 0.11

float mag2(vec2 p){return dot(p,p);}
vec2 point1(float t) {
    t *= 0.62;
    return vec2(0.12,0.5 + sin(t)*0.2);
}
vec2 point2(float t) {
    t *= 0.62;
    return vec2(0.88,0.5 + cos(t + 1.5708)*0.2);
}

vec4 solveFluid(sampler2D smp, vec2 uv, vec2 w, float time, vec3 mouse, vec3 lastMouse)
{
  const float K = 0.2;
  const float v = 0.55;
    
    vec4 data = texture2D(smp, uv, 0.0);
    vec4 tr = texture2D(smp, uv + vec2(w.x , 0), 0.0);
    vec4 tl = texture2D(smp, uv - vec2(w.x , 0), 0.0);
    vec4 tu = texture2D(smp, uv + vec2(0 , w.y), 0.0);
    vec4 td = texture2D(smp, uv - vec2(0 , w.y), 0.0);
    
    vec3 dx = (tr.xyz - tl.xyz)*0.5;
    vec3 dy = (tu.xyz - td.xyz)*0.5;
    vec2 densDif = vec2(dx.z ,dy.z);
    
    data.z -= dt*dot(vec3(densDif, dx.x + dy.y) ,data.xyz); //density
    vec2 laplacian = tu.xy + td.xy + tr.xy + tl.xy - 4.0*data.xy;
    vec2 viscForce = vec2(v)*laplacian;
    data.xyw = texture2D(smp, uv - dt*data.xy*w, 0.).xyw; //advection
    
    vec2 newForce = vec2(0);
    #ifndef MOUSE_ONLY
    #if 1
    newForce.xy += 0.75*vec2(.0003, 0.00015)/(mag2(uv-point1(time))+0.0001);
    newForce.xy -= 0.75*vec2(.0003, 0.00015)/(mag2(uv-point2(time))+0.0001);
    #else
    newForce.xy += 0.9*vec2(.0003, 0.00015)/(mag2(uv-point1(time))+0.0002);
    newForce.xy -= 0.9*vec2(.0003, 0.00015)/(mag2(uv-point2(time))+0.0002);
    #endif
    #endif
    
    //if (mouse.z >= 1. && lastMouse.z >= 1.)
    //{
        vec2 vv = clamp(vec2(mouse.xy - lastMouse.xy)*10., -6., 6.);
        newForce.xy += 0.005/(mag2(uv - mouse.xy)+0.005)*vv; //效果好
        //newForce.xy += 0.005/(length(uv - mouse.xy)+0.005)*vv; //效果差
    //}
    
    data.xy += dt*(viscForce.xy - K/dt*densDif + newForce); //update velocity
    data.xy = max(vec2(0), abs(data.xy)-1e-4)*sign(data.xy); //linear velocity decay
    
    #ifdef USE_VORTICITY_CONFINEMENT
    data.w = (tr.y - tl.y - tu.x + td.x);
    vec2 vort = vec2(abs(tu.w) - abs(td.w), abs(tl.w) - abs(tr.w));
    vort *= VORTICITY_AMOUNT/length(vort + 1e-9)*data.w;
    data.xy += vort;
    #endif
    
    data.y *= smoothstep(.5,.48,abs(uv.y-0.5)); //Boundaries
    
    data = clamp(data, vec4(vec2(-10), 0.5 , -10.), vec4(vec2(10), 3.0 , 10.));
    
    return data;
}

//Chimera's Breath
//by nimitz 2018 (twitter: @stormoid)

//see "Common" tab for fluid simulation code

float length2(vec2 p){return dot(p,p);}
mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}

void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    vec2 w = 1.0/iResolution.xy;
    
    vec3 uvMouse= vec3(iMouse.xy*1.0/iResolution.xy , iMouse.z);
    uvMouse.x= (uvMouse.x+1.0)/2.0; //測試
    uvMouse.y= (uvMouse.y+1.0)/2.0; //測試
    
    //vec4 lastMouse = texelFetch(iChannel0, ivec2(0,0), 0);
    //vec4 lastMouse = texture2D(iChannel0, vec2(0.0,0.0), 0.0);//是否讀不到舊滑鼠data？
    vec4 lastMouse = texture2D(u_buffer0, vec2(0.0,0.0), 0.0);//是否讀不到舊滑鼠data？
    
    vec4 data = solveFluid(iChannel0, uv, w, iTime, uvMouse, lastMouse.xyz);
    
    if (iTime < 1.)
    {
        data = vec4(0,0,0,0);
    }
    gl_FragColor = data;
    
    if (gl_FragCoord.y < 1.)
        data = vec4(uvMouse, 1.0);

    #if defined( BUFFER_0 )
    gl_FragColor = data;
    #else
    gl_FragColor = data;
    #endif
}

