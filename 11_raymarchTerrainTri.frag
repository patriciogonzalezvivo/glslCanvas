// Author:CMH
// Title:20211023_glsl Breathing Terrain_v4(格化).qtz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;                  //更改

float iGlobalTime=u_time;                 //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;            //更改 shadertoy->glsl editor 
vec2 iMouse=u_mouse.xy/u_resolution;                   //更改 shadertoy->glsl editor
vec3 CameraPos=vec3(0.0);
//vec2 fragCoord = gl_FragCoord.xy;         //更改




//=== noise functions ===
float hash11(float p) {             //亂數範圍 [0,1]
    return fract(sin(p * 727.1)*43758.5453123);
}
float hash12(vec2 p) {              //亂數範圍 [0,1]
    float h = dot(p,vec2(127.1,311.7)); 
    return fract(sin(h)*43758.5453123);
}
vec3 hash31(float p) {              //亂數範圍 [0,1]
    vec3 h = vec3(1275.231,4461.7,7182.423) * p;    
    return fract(sin(h)*43758.543123);
}

// 3d noise
float noise_3(in vec3 p) {          //亂數範圍 [0,1]
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
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    f   = 0.5000*gnoise( uv ); uv = m*uv;         
    f += 0.2500*gnoise( uv ); uv = m*uv;
    f += 0.1250*gnoise( uv ); uv = m*uv;
    f += 0.0625*gnoise( uv ); uv = m*uv;
    return f;
}

float fbm2(in vec2 uv)      //亂數範圍 [-1,1] 
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
//=== 20211021_Synthwave.qtz ===
vec2 trinoise(vec2 uv){                     //亂數範圍 [0,1]
    //float sq = sqrt(3./2.);
    //uv.x *= sq;
    uv.y -= .5*uv.x;                        //效果好，不太懂
    vec2 d = fract(uv);
    uv -= d;
    if(dot(d,vec2(1))<1.){
        float n1 = hash12(uv);              //修正改寫
        float n2 = hash12(uv+vec2(1,0));
        float n3 = hash12(uv+vec2(0,1));
        float nmid = mix(n2,n3,d.y);
        float ng = mix(n1,n3,d.y);
        float dx = d.x/(1.-d.y);
        return vec2(mix(ng,nmid,dx),min(min((1.-dx)*(1.-d.y),d.x),d.y));
    }else{
        float n2 = hash12(uv+vec2(1,0));
        float n3 = hash12(uv+vec2(0,1));
        float n4 = hash12(uv+1.);
        float nmid = mix(n2,n3,d.y);
        float nd = mix(n2,n4,d.y);
        float dx = (1.-d.x)/(d.y);
        return vec2(mix(nd,nmid,dx),min(min((1.-dx)*d.y,1.-d.x),1.-d.y));
    }
    return vec2(0);
}

//=== distance functions ===
float mapCircle(vec3 p)
{
vec3 q= p+vec3(0.,0.0, 1.0); //調整範圍，小心！
return (length(q) - 0.4);
}

float mapTerrain(vec3 p) //亂數範圍 [-1,1]
{
float h=max(fbm2(4.0*p.xz), 0.0)*0.4-0.3; //處理中???? 地平面以-0.3為基準，
return (p.y-h);
}

float mapTerrainTri(vec3 p) //亂數範圍 [0,1]
{
float h=max(trinoise(6.0*p.xz).x, 0.4)*0.3-0.4; //處理中???? 地平面以-0.3為基準，
return (p.y-h);
}


float sdSphere( vec3 p, float s )
{
    return length(p)-s;
}

float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

//=== gradient functions ===
float map(in vec3 p)
{
//return mapTerrain(p);
return mapTerrainTri(p);
//return mapCircle(p);
//return sdSphere(p, 0.5);
//return min(sdSphere(p-vec3(0.5, 0., 0.3), 0.35), sdSphere(p-vec3(-0.5, 0., 0.3), 0.35));
}

vec3 gradient( in vec3 p ) //尚未normalize
{
    const float d = 0.001;
    vec3 grad = vec3(map(p+vec3(d,0,0))-map(p-vec3(d,0,0)),
                     map(p+vec3(0,d,0))-map(p-vec3(0,d,0)),
                     map(p+vec3(0,0,d))-map(p-vec3(0,0,d)));
    return grad;
}

vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.y = map(p);                           //n.y = map_detailed(p);    
    n.x = map(vec3(p.x+eps,p.y,p.z)) - n.y; //n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
    n.z = map(vec3(p.x,p.y,p.z+eps)) - n.y; //n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
    n.y = eps;
    return normalize(n);
}

// === raytrace functions===
float trace(vec3 o, vec3 r)
{
float t=0.0;
for (int i=0; i<32; ++i)
{
    vec3 p= o+r*t;
    //float d=mapCircle(p);
    //float d=sdSphere(p, 0.3);
    float d=map(p);
    t += d*0.3;
    }
return t;
}       // i<j，j影響銳利度

float traceOut(vec3 o, vec3 r, out vec3 p)
{
float d=0.0, t=0.0;
for (int i=0; i<32; ++i)
{
    p= o+r*t;
    d=map(p);
    if(d<0.0||t>2.0) break;     //限制最遠處
    t += d*0.3;
    }
return t;
}

//=== sky ===
vec3 getSkyHDR(vec3 e) {
    vec3 f=e;
    float m = 2.0 * sqrt(f.x*f.x + f.y*f.y + f.z*f.z);
    vec2 st= vec2(-f.x/m + .5, -f.y/m + .5);
    vec3 ret=texture2D(u_tex0, st).xyz;  
    return ret;
}

//=== sky ===
vec3 getSkyFBM(vec3 e) {
    vec3 f=e;
    float m = 2.0 * sqrt(f.x*f.x + f.y*f.y + f.z*f.z);
    vec2 st= vec2(-f.x/m + .5, -f.y/m + .5);
    //vec3 ret=texture2D(iChannel0, st).xyz;
    float fog= fbm(0.6*st+vec2(-0.2*iGlobalTime, -0.02*iGlobalTime))*0.9+0.3;
    return vec3(fog);
}

//=== camera functions ===
mat3 fromEuler(vec3 ang) {
    vec2 a1 = vec2(sin(ang.x),cos(ang.x));
    vec2 a2 = vec2(sin(ang.y),cos(ang.y));
    vec2 a3 = vec2(sin(ang.z),cos(ang.z));
    vec3 m0 = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
    vec3 m1 = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
    vec3 m2 = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
    return mat3(m0, m1, m2);
}

// ================
void main()
{
vec2 uv = gl_FragCoord.xy/iResolution.xy;
uv = uv*2.0-1.0;
uv.x*= iResolution.x/iResolution.y;
//uv.y*=-1.0;//顛倒校正

// camera option2
    vec3 RayOri= CameraPos;//vec3(0.0, 0.0, 0.0)
    RayOri.z +=0.05*iGlobalTime;
    vec3 CameraRot=vec3(0.0, iMouse.y, iMouse.x+2.8);
    vec3 RayDir = normalize(vec3(uv, -1.))*fromEuler(CameraRot);
    //float t = trace(RayOri, RayDir);
    vec3 p,n;
    float t = traceOut(RayOri, RayDir, p);
    n=normalize(gradient(p));   
    //n=getNormal(p, 0.001);
    if(t>2.0) n=-RayDir;            //需過濾天空的法向量

//HDR環境貼圖
vec3 BG=getSkyHDR(RayDir);  

//著色
    float RefractiveIndex=1.31; //冰
    float Roughness=0.15;//[0-4]
    vec3 IceColor=vec3(0.4, 0.7, 0.9)*1.7;
    vec3 SunColor=vec3(1.0, 0.3, 0.05)*1.2;
    vec3 eye=RayDir;
    //控制粗糙表面
    //vec3 normalDelta = normalMap(p*Roughness,n)*Roughness/10.;
    vec3 n_bump=n;  //=n+normalDelta;
    
    float fresnel = 1.0 - max(dot(n,-eye),0.0); //正交為0,側邊緣為1
    fresnel = pow(fresnel,3.3) * 0.65; //修正正交為0,側邊緣為0.65，表示正交幾乎沒有反射，側邊反射權重佔0.65，折射佔0.35
    //pow(fresnel,3.0)改成pow(fresnel,0.4)，可增加玻璃反光效果，reflect比重強化
        
    vec3 reflected = getSkyFBM(reflect(eye,n_bump)); //進一步處理天空函式 getSkyColor();    
    vec3 refracted = getSkyFBM(refract(eye,n_bump,1.0/RefractiveIndex));//SEA_BASE + diffuse(n,l,80.0) * IceColor * 0.12; 
    //refracted = dot(refracted,refracted) * IceColor * 1.72;
    
    vec3 color =mix(refracted*IceColor,reflected*2.0,fresnel);
    
//動態呼吸
float breathing=sin(2.0*3.14*iGlobalTime/5.0)*0.5+0.2;
float t1=glow(t, 1.2-0.1*breathing, 0.3);
//color = mix(color, vec3(0.0), min(pow(t,4.0),1.0));


//亂數作用雲霧(二維)
float fog= fbm(0.6*uv+vec2(-0.2*iGlobalTime, -0.02*iGlobalTime))*0.5+0.3;
vec3 fogFBM=getSkyFBM(reflect(eye,n_bump));

gl_FragColor = vec4(vec3(fogFBM), 1.0); //測試t, t1, n, fog, BG, fresnel, fogFBM
//gl_FragColor = vec4(vec3(t-fog), 1.0);
//gl_FragColor = vec4(vec3(mix(t1,fog,1.0-t1)), 1.0);   //修正輪廓浮動
//gl_FragColor = vec4(vec3(mix(color, vec3(fog), min(pow(t,4.0),1.0))), 1.0);
gl_FragColor = vec4(vec3(color), 1.0);          //瞭解 sign distance function
}

