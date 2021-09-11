// Author: CMH
// Title: 20180125_杉本博司模擬_v1.B (瞭解perlin+raymarch)A.qtz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float iGlobalTime=u_time;			    //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;		//更改 shadertoy->glsl editor 
vec3 iMouse=vec3(u_mouse.xy, 0.0);//更改 shadertoy->glsl editor
//uniform sampler2D iChannel0;		//更改
//vec2 fragCoord = gl_FragCoord.xy;	//更改



// ———————————————————————————————————————————————
// ———————————————————————————————————————————————
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//fractal self-similarity 
float fnoise(vec3 P)
{
float sum=cnoise(P-0.05*iGlobalTime)+0.8*cnoise(1.5*P)+0.4*cnoise(3.0*P)+0.2*cnoise(8.0*P-0.1*iGlobalTime);
return sum;
}

// ———————————————————————————————————————————————
// ———————————————————————————————————————————————


// "Seascape" by Alexander Alekseev aka TDM - 2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

const int NUM_STEPS = 8;
const float PI    = 3.1415;
const float EPSILON = 1e-3;
float EPSILON_NRM = 0.1 / iResolution.x;

// sea
const int ITER_GEOMETRY = 3;
const int ITER_FRAGMENT = 5;
const float SEA_HEIGHT = 0.6; //數值小浪小，風平浪靜
const float SEA_CHOPPY = 4.0; //數值小smooth
const float SEA_SPEED = 0.8;
const float SEA_FREQ = 0.16;  //數值小波少，風平浪靜
const vec3 SEA_BASE = vec3(0.0, 0.4, 0.7);  //vec3(0.1,0.19,0.22);
const vec3 SEA_WATER_COLOR = vec3(1.0);   //vec3(0.8,0.9,0.6)*1.0;
float SEA_TIME = iGlobalTime * SEA_SPEED;
mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);

// math
mat3 fromEuler(vec3 ang) {
    vec2 a1 = vec2(sin(ang.x),cos(ang.x));
    vec2 a2 = vec2(sin(ang.y),cos(ang.y));
    vec2 a3 = vec2(sin(ang.z),cos(ang.z));
    mat3 m;
    m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
  m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
  m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
  return m;
}
float hash( vec2 p ) {
  float h = dot(p,vec2(127.1,311.7)); 
    return fract(sin(h)*43758.5453123);
}
float noise( in vec2 p ) {
    vec2 i = floor( p );
    vec2 f = fract( p );  
  vec2 u = f*f*(3.0-2.0*f);
    return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

// lighting
float diffuse(vec3 n,vec3 l,float p) {
    return pow(dot(n,l) * 0.4 + 0.6,p);
}
float specular(vec3 n,vec3 l,vec3 e,float s) {    
    float nrm = (s + 8.0) / (3.1415 * 8.0);
    return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
}

// sky
vec3 getSkyColor(vec3 e) {
    e.y = max(e.y,0.0);
    vec3 ret;
    ret.x = pow(1.0-e.y,2.0);
    ret.y = 1.0-e.y;
    ret.z = 0.6+(1.0-e.y)*0.4;
    return ret;
}


// sky by Perlin
vec3 getSkyPerlin(vec3 e, int i) {
     //e.y = max(e.y,0.0);
     float den = 2.0; //雲之密集度，變動率提高兩倍，密度增加兩倍
      vec3 q3= den *e;   
  q3.y *=6.;    //雲之狹長形狀，y軸變動率是x軸的六倍
  //vec3 q3= vec3(surfacePosition, 0.0); //平面
     vec3 col = vec3(0.0);
  //-------測試fractal————————
  if     (i==0)
    col = vec3( fnoise( 0.4*q3 ));        //fractal perlin noise
  else if (i==1)
    col = vec3((fnoise( 0.4*q3-0.12*SEA_TIME)));  //classical perlin noise
  else if (i==2)
    col = vec3(fnoise( 0.4*q3+ fnoise(0.6*q3)  ));  //二層遞廻perlin noise
  else if (i==3)
    col = vec3(fnoise( 1.2*q3+ fnoise(0.6*q3+ fnoise(0.2*q3-0.*SEA_TIME))));//三層遞廻perlin noise, 燃燒流動感
  else if (i==4)
    col = vec3(fnoise( 0.4*q3+ fnoise(0.6*q3+ fnoise(0.8*q3-0.*SEA_TIME))));//三層遞廻perlin noise, 結冰反射感
  
  //-------測試gradient————————
  //col = vec3(cnoise( 0.4*q3+ cnoise(0.6*q3)   )); //二層遞廻perlin noise
  //col = vec3(cnoise( 0.4*q3+ cnoise(0.6*q3+ cnoise(0.8*q3+0.2*SEA_TIME))));//三層遞廻perlin noise
  //col = vec3(cnoise( 1.0*q3+ cnoise(4.0*q3+ cnoise(8.0*q3+0.6*SEA_TIME))));//Local move 時間影響最小的細節，水波紋感！
  //col = vec3(cnoise( 1.0*q3+ cnoise(4.0*q3+ cnoise(8.0*q3))+0.6*SEA_TIME));//Global move 時間影響較大範圍，陰影推動感!
  
  vec3 col1 = vec3(0.0, 0.4, 0.7);    //藍雲vec3(0.0, 0.4, 0.7), 紫雲vec3(0.5, 0.2, 0.5);
  vec3 col2 = vec3(1.0, 1.0, 1.0);      //白天vec3(1.0, 1.0, 1.0);
  //vec3 col2 = getSkyColor(e, iSky);
  vec3 colf = mix(col1, col2, col.x*0.5+0.5); //noise[-1,1] —> [0,1]
    return colf;
}



// sea
float sea_octave(vec2 uv, float choppy) {
    uv += noise(uv);        
    vec2 wv = 1.0-abs(sin(uv));
    vec2 swv = abs(cos(uv));    
    wv = mix(wv,swv,wv);
    return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
}

/*
float map(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;//數值越大波數越密集
    
    float d, h = 0.0;    
    for(int i = 0; i < ITER_GEOMETRY; i++) {        
      d = sea_octave((uv+SEA_TIME)*freq,choppy);
      d += sea_octave((uv-SEA_TIME)*freq,choppy);
        h += d * amp;        
      uv *= octave_m; freq *= 1.9; amp *= 0.22;
        choppy = mix(choppy,1.0,0.2);   //choopy由4.0下降，但恆大於1.0
    }
    return p.y - h;
}

float map_detailed(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    
    float d, h = 0.0;    
    for(int i = 0; i < ITER_FRAGMENT; i++) {        
      d = sea_octave((uv+SEA_TIME)*freq,choppy);
      d += sea_octave((uv-SEA_TIME)*freq,choppy);
        h += d * amp;        
      uv *= octave_m; freq *= 1.9; amp *= 0.22;
        choppy = mix(choppy,1.0,0.2);
    }
    return p.y - h;
}

*/

//Perlin衍生海模型 
float map(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;//數值越大波數越密集
    
    float d, h = 0.0;
    vec3 q3=p*0.1;
    q3.y *=1.1;    
  h=((fnoise( 0.4*q3-0.12*SEA_TIME)));
    return p.y - h;
}


vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {  
    float fresnel = 1.0 - max(dot(n,-eye),0.0);
    fresnel = pow(fresnel,3.0) * 0.65;
        
    vec3 reflected = getSkyColor(reflect(eye,n));    
    vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12; 
    
    vec3 color = mix(refracted,reflected,fresnel);
    
    float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
    color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
    
    color += vec3(specular(n,l,eye,60.0));
    
    return color;
}

// tracing
vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.y = map(p);             //n.y = map_detailed(p);    
    n.x = map(vec3(p.x+eps,p.y,p.z)) - n.y; //n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
    n.z = map(vec3(p.x,p.y,p.z+eps)) - n.y; //n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
    n.y = eps;
    return normalize(n);
}

float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {  
    float tm = 0.0;
    float tx = 1000.0;    
    float hx = map(ori + dir * tx);
    if(hx > 0.0) return tx;   
    float hm = map(ori + dir * tm);    
    float tmid = 0.0;
    for(int i = 0; i < NUM_STEPS; i++) {
        tmid = mix(tm,tx, hm/(hm-hx));                   
        p = ori + dir * tmid;                   
      float hmid = map(p);
    if(hmid < 0.0) {
          tx = tmid;
            hx = hmid;
        } else {
            tm = tmid;
            hm = hmid;
        }
    }
    return tmid;
}

// main
void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;//更改 shadertoy->glsl editor
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    uv.y *= -1.0;//更改 shadertoy->glsl editor    
    float time = iGlobalTime * 0.3; //time = iGlobalTime * 0.3 + iMouse.x*0.01
        
    // ray
    //vec3 ang = vec3(3.14, 0.15*sin(0.1*time), 0.0);     //不旋轉
    vec3 ang = vec3(3.14, 0.0, 0.0);  // [x, y, z] = [rotate ,tilt ,pan]
    //vec3 ang = vec3(sin(time*3.0)*0.1,sin(time)*0.2+0.3,time);
    
    vec3 ori = vec3(0.0,3.5,time*5.0);    //timescale正值(5.0)浪遠離，負值(-5.0)浪趨近，y=3.5代表camera高低
    vec3 dir = normalize(vec3(uv.xy,-2.0)); //camera位於正Z軸，ray dir朝向負Z軸
    dir.z += length(uv) * 0.3*sin(0.1*time);        //*廣角調整，影響海平面的曲度 
    dir = normalize(dir) * fromEuler(ang);  //座標軸旋轉，rotation ang[x, y, z]數值轉為
    
    // tracing
    vec3 p;
    heightMapTracing(ori,dir,p);      //注意 out vec3 p，改變p
    vec3 dist = p - ori;
    vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
    vec3 light = normalize(vec3(0.0,1.0,0.8));  //+0.8無反光面，-0.8有反光面，正值表示光線由前方射入鏡頭，故波浪無reflection
             
    // color
    vec3 color = mix(
        //getSkyPerlin以Raymarch運算，但尚無體積感
        getSkyPerlin(dir, 1),       //初始預設getSkyColor(dir)
        getSeaColor(p,n,light,dir,dist),
      pow(smoothstep(0.0,-0.05,dir.y),0.3));
        
    // post
  gl_FragColor = vec4(pow(color,vec3(0.75)), 1.0); //power值越小越明亮，值越大越深暗
}

