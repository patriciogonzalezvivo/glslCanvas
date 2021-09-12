
// Author: Created by FabriceNeyret2 in 2017-04-03
// Title: maze worms / graffitis 3b @ shadertoy
// 20200624_glsl Particle_v2.qtz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float iTime=u_time;			              //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;		      //更改 shadertoy->glsl editor 
vec2 iMouse=u_mouse.xy;                   //更改 shadertoy->glsl editor
//vec2 fragCoord = gl_FragCoord.xy;       //更改
uniform sampler2D iChannel0;		      //更改
uniform sampler2D u_buffer0;
//uniform sampler2D u_buffer1;


#define CS(a)  vec2(cos(a),sin(a))
#define rnd(x) ( 2.* fract(456.68*sin(1e3*x+mod(iDate.w,100.))) -1.) // NB: mod(t,1.) for less packed pattern
#define T(U1) texture2D(u_buffer0, (U1)/R)  //FBO，持續更新粒子狀態

float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}

const float r = 1.5, N = 50.; // width , number of worms

void main()
{
    vec4 iDate= vec4(iTime);
    vec2 U = gl_FragCoord.xy;           //input 
    vec2 R = iResolution.xy;
    vec4 O;                         //output
    
    //不懂！利用R定值讀取FBO,讀到最右下圖檔pixel訊息，紅色色版為零,
    if (T(R).x==0.) { U = abs(U/R*2.-1.); O  = vec4(max(U.x,U.y)>1.-r/R.y); O.w=0.; gl_FragColor=O; return;} // track window resize

//--STEP1.初始粒子位置於第一列--------
    // 1st column store worms state.
    if (U.y==.5 && T(U).w==0.) {                           // initialize heads state: P, a, t
        O = vec4( R/2. + R/2.4* vec2(rnd(U.x),rnd(U.x+.1)) , 3.14 * rnd(U.x+.2), 1); //O.z儲存粒子差異化亂數, O.w表示active, 座標系統以window尺寸
        if (T(O.xy).x>0.) O.w = 0.;                        // invalid start position //若該起始點已有粒子，則不畫。    
        gl_FragColor=O; return;
    } 
    
//--STEP2.依據第一列粒子們，著色每一個像素
    // Other columns do the drawing.
    O = T(U);//讀取之前色彩結果，注意此時O是color data(yes)還是position data(no)
    //Drawing! 
    //--重要！ x<N需改成x<=N
    //--重要！*奇特思考方法！不確定效能是否合理，每個待更新的像素，與粒子們比較位置，以距離遠近決定著色方式！
    //讀取第一列由左至右的粒子資訊P,若P.w粒子生存,以length(P.xy-U)著色, P的資訊以座標系統是以pixel為單位
    for (float x=.5; x<=N; x++) {                          // --- draw heads

        vec4 P = T(vec2(x,.5));                            // head state: P, a, t 
        //if (P.w>0.) O += smoothstep(r,0., length(P.xy-U))  // draw head if active
        //                 *(.4);   // coloring scheme (exp(-0.02*P.w))
        if (P.w>0.) O += glow(length( (P.xy-U)/R ), 1.4, 0.004)*(0.002)*vec4(0.9, 0.4, 0.1, 0.2);
    }

//--STEP3.像素著色後，更新第一列粒子們新位置
    //U以整數pixel為單位，需注意特殊用法，第一列為0.5，第二列為1.5
    if (U.y==.5) {                                         // --- head programms: worm strategy
           //讀取第一列粒子狀態指定為P，P.xy表示position, P.z儲存粒子差異化亂數, P.w表示粒子active
        vec4 P = T(U);                                     // head state: P, a, t 
        if (P.w>0.) {                                      // if active
            float a = P.z;                             // a=每個粒子旋轉角度 per particle
            a+=2.1/P.w;
            a+=0.001;
            vec2 newPos= P.xy+ CS(a);
            O = vec4(newPos,mod(a,6.2832),P.w+1.);         // move head, P.w儲存每個粒子的生命age
            if  ( T(P.xy+(r+2.)*CS(a)).w > 0.2 )  { O.w = 0.;} // 若碰撞其它粒子，生命age歸零                      
        }
    }
    
   
  //if (iMouse.w > 0. && distance(iMouse.xy, U) < 50.) O = vec4(0.); // painting
  gl_FragColor=O;
}

/*
    #if defined( BUFFER_0 )
    gl_FragColor = O;
    #else
    gl_FragColor = O;
    #endif
*/



