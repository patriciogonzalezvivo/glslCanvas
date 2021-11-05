// Author:CMH
// Title:20211023_glsl Breathing Terrain_v1(Raymarch).qtz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float iGlobalTime=u_time;                 //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;            //更改 shadertoy->glsl editor 
vec2 iMouse=u_mouse.xy;                   //更改 shadertoy->glsl editor
//vec2 fragCoord = gl_FragCoord.xy;         //更改



//=== noise functions ===
float hash11(float p) {
    return fract(sin(p * 727.1)*43758.5453123); //亂數範圍 [0,1]
}
float hash12(vec2 p) {
    float h = dot(p,vec2(127.1,311.7)); 
    return fract(sin(h)*43758.5453123);     //亂數範圍 [0,1]
}
vec3 hash31(float p) {
    vec3 h = vec3(1275.231,4461.7,7182.423) * p;    
    return fract(sin(h)*43758.543123);      //亂數範圍 [0,1]
}

// 3d noise
float noise_3(in vec3 p) {                  //亂數範圍 [0,1]
    vec3 i = floor(p);
    vec3 f = fract(p);  
    vec3 u = f*f*(3.0-2.0*f);
    
    vec2 ii = i.xy + i.z * vec2(5.0);
    float a = hash12( ii + vec2(0.0,0.0) );
    float b = hash12( ii + vec2(1.0,0.0) );    
    float c = hash12( ii + vec2(0.0,1.0) );
    float d = hash12( ii + vec2(1.0,1.0) ); 
    float v1 = mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
    
    ii += vec2(5.0);
    a = hash12( ii + vec2(0.0,0.0) );
    b = hash12( ii + vec2(1.0,0.0) );    
    c = hash12( ii + vec2(0.0,1.0) );
    d = hash12( ii + vec2(1.0,1.0) );
    float v2 = mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
        
    return max(mix(v1,v2,u.z),0.0);
}

//=== glow functions ===
float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}
//=== 2d noise functions ===
vec2 hash2( vec2 x )            //亂數範圍 [-1,1]
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}
float gnoise( in vec2 p )       //亂數範圍 [-1,1]
{
    vec2 i = floor( p );
    vec2 f = fract( p );
    
    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash2( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                            dot( hash2( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                         mix( dot( hash2( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                            dot( hash2( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}
float fbm(in vec2 uv)       //亂數範圍 [-1,1] 
{
    float f;                //fbm - fractal noise (4 octaves)
    //mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    float m=2.0;
    f  = gnoise( uv ); uv = m*uv;         
    f += 0.5*gnoise( uv ); uv = m*uv;
    f += 0.25*gnoise( uv ); uv = m*uv;
    f += 0.125*gnoise( uv ); uv = m*uv;
    return f;
}

float fbm_2(in vec2 uv)     //亂數範圍 [-1,1]
{
    float f;                //fbm - fractal noise (4 octaves)
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    f   = 0.5000*gnoise( uv ); uv = m*uv;         
    f += 0.2500*gnoise( uv ); uv = m*uv;
    f += 0.1250*gnoise( uv ); uv = m*uv;
    f += 0.0625*gnoise( uv ); uv = m*uv;
    return f;
}

//=== distance functions ===
float mapCircle(vec3 p)
{
vec3 q= p+vec3(0.,-0.35,1.0); //調整範圍，小心！
return (length(q) - 0.3);
}

float mapTerrain(vec3 p)
{
float h=max(fbm(4.0*p.xz), 0.0)*0.4-0.3; //處理中???? 地平面以-0.3為基準，
return (p.y-h);
}

//=== boolean operations ===
float boolUnion(float a,float b) { return min(a,b); }
float boolIntersect(float a,float b) { return max(a,b); }
float boolSub(float a,float b) { return max(a,-b); }

// smooth operations. thanks to iq
float boolSmoothIntersect(float a, float b, float k ) {
    float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
    return mix(a,b,h) + k*h*(1.0-h);
}
float boolSmoothSub(float a, float b, float k ) {
    return boolSmoothIntersect(a,-b,k);
}

// === ===
float trace(vec3 o, vec3 r)
{
float t=0.0;
for (int i=0; i<32; ++i)
{
    vec3 p= o+r*t;
    float d4=mapCircle(p);
    float d5= mapTerrain(p);//工作中
    float d= boolUnion(d4, d5);
    //float d= d5;
    t += d*0.3;
    }
return t;
}       // i<j，j影響銳利度

// ================
void main()
{
vec2 uv = gl_FragCoord.xy/iResolution.xy;
uv = uv*2.0-1.0;
uv.x*= iResolution.x/iResolution.y;
//uv.y*=-1.0; //顛倒校正

vec3 r=normalize(vec3(uv, -1.0));//越遠離-1，ray越靠攏，可視範圍越窄，圓越大，想像鏡頭廣度
//vec3 o= vec3(0.0, 0.0, iGlobalTime*0.05);//越遠離r，鏡頭遠離Zoom out，圓越小，想像鏡頭距離
vec3 o= vec3(0.0, 0.0, 0.0);
float t = trace(o, r);

//動態呼吸
float breathing=sin(2.0*3.14*iGlobalTime/5.0)*0.5+0.2;
//float t1=glow(t, 0.4-0.1*breathing, 1.5);
float t1=glow(t, 1.2-0.1*breathing, 0.3);

//亂數作用雲霧
float fog= fbm_2(0.6*uv+vec2(-0.2*iGlobalTime, -0.02*iGlobalTime))*0.5+0.3;

gl_FragColor = vec4(vec3(t-fog), 1.0);
//gl_FragColor = vec4(vec3(t1), 1.0); //*vec3(1.0, 0.5, 0.25)
//gl_FragColor = vec4(vec3(fog), 1.0); //*vec3(1.0, 0.5, 0.25)
//gl_FragColor = vec4(vec3(t1+fog), 1.0); //導致輪廓浮動
//gl_FragColor = vec4(vec3(mix(t1,fog,1.0-t1)), 1.0); //修正輪廓浮動

}

