// Author: Created by FabriceNeyret2 in 2017-04-03
// Title: maze worms / graffitis 3b @ shadertoy
// 20200624_glsl Particle_v5B(動態成像).qtz


#ifdef GL_ES
precision mediump float;
#endif

#if defined( BUFFER_0 )
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float iTime=u_time;                       //更改 shadertoy->glsl editor  
vec2 iResolution=u_resolution;            //更改 shadertoy->glsl editor 
vec2 iMouse=u_mouse.xy;                   //更改 shadertoy->glsl editor
//vec2 fragCoord = gl_FragCoord.xy;       //更改
uniform sampler2D u_buffer0;
uniform sampler2D u_tex0;                 //更改  Target DensityMap
uniform sampler2D u_tex1;                 //更改  Target MotionMap


#define CS(a)  vec2(cos(a),sin(a))
#define rnd(x) ( 2.* fract(456.68*sin(1e3*x+mod(iDate.w,100.))) -1.) // NB: mod(t,1.) for less packed pattern //亂數範圍 [-1,1]
#define T(U1) texture2D(u_buffer0, (U1)/R)  //FBO，持續更新粒子狀態
#define M(U2) texture2D(u_tex1, (U2)/R)  //初始照片，以MotionMap作為
#define D(U2) texture2D(u_tex0, (U2)/R)  //初始照片，以Density作為


float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}
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

//Randomness code from Martin, here: https://www.shadertoy.com/view/XlfGDS
float Random_Final(vec2 uv, float seed)         //亂數範圍 [-1,1]
{
    float fixedSeed = abs(seed) + 1.0;
    float x = dot(uv, vec2(12.9898,78.233) * fixedSeed);
    return 2.*fract(sin(x) * 43758.5453)-1.;
}


/////////////////////////////////
const float r = 1.5, N = 30.; // width , number of worms

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
        //O = vec4( R/2. + R/2.4* vec2(rnd(U.x),rnd(U.x+.1)) , 3.14 * rnd(U.x+.2), 1); //O.z儲存粒子差異化亂數, O.w表示active, 座標系統以window尺寸
        O = vec4( R/2. + R/2.4* vec2(Random_Final(U.xy, iTime),Random_Final(U.xy, iTime+1.11)) , 3.14 * rnd(U.x+.2), 1); //範圍[800x600]
        
        //設定生長條件
        //若該起始點已有舊粒子，則不畫。//導致無法新生粒子，尤其光暈粒子即使消失後，依然佔有領土。改成threshold
        //if (T(O.xy).x>0.) O.w = 0.;                        // invalid start position
        if (D(O.xy).g<0.35) O.w = 0.;               // 亮的地方產生粒子，進入暗的地方則死亡
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
        
        //畫法一 若有乘以P.w，畫筆隨粒子生命增長而變淡
        //if (P.w>0.) O += smoothstep(r,0., length(P.xy-U))  // draw head if active
        //                 *(.4)*(exp(-0.02*P.w))*vec4(0.9, 0.4, 0.1, 0.2);    // coloring scheme (exp(-0.02*P.w))
        //畫法二 持續累加
        //if (P.w>0.) O += glow(length( (P.xy-U)/R ), 1.4, 0.001)*(0.001)*vec4(0.9, 0.4, 0.1, 0.2);
        
        //畫法三 會消失，光暈粒子即便消失，領土還是被佔據無法產生新粒子
        if (P.w>0.) {        
        vec4 newO= glow(length( (P.xy-U)/R ), 1.2, 0.08)*(0.8)*vec4(0.9, 0.4, 0.1, 0.2);
        //O = mix(newO, O, 0.999);    //殘影比例：0.999 or 0.9999
            float duree=-cos(2.0*u_time/60.0*3.14159)*0.00095+0.999;
            O = mix(newO, O, duree);
        }

    }

//--STEP3.像素著色後，更新第一列粒子們新位置
    //U以整數pixel為單位，需注意特殊用法，第一列為0.5，第二列為1.5
    if (U.y==.5) {                                         // --- head programms: worm strategy
           //讀取第一列粒子狀態指定為P，P.xy表示position, P.z儲存粒子差異化亂數, P.w表示粒子active
        vec4 P = T(U);                                     // head state: P, a, t 
        if (P.w>0.) {                                      // if active
            float a = P.z;                             // a=每個粒子旋轉角度 per particle
            a+=2.1/P.w;                                //值大曲度大：4.0初始圈數多,2.0螺旋,0.5小勾,0.1直線 
            a+=0.01;
            
            //Taget Image作用。待處理           
            vec2 V = (-1.0)*M(P.xy).xy;             //讀取MotionMap資訊的RG色版，分別代表XY軸速度
            float D = D(P.xy).g+(0.3*rnd(iTime));       //讀取DensityMap資訊的G色版
            //，加上亂數有關鍵性影響!
          
            //float rot=atan(V.x, V.y);
           //float area=smoothstep(0.05, 0.15, length(V.xy));
            
            //vec2 newPos= P.xy+ 0.*V.xy+ 1.*CS(6.28*gnoise(0.11*P.xy));  //target image
            vec2 newPos= P.xy+ CS(a);                       //parametric
            //vec2 newPos= P.xy+ 4.0*CS(3.14 * rnd(U.x));   //random walk
            //vec2 newPos= P.xy+ CS(3.14*gnoise(0.05*P.xy));//perlin noise
            //vec2 newPos= P.xy+ CS(3.14*gnoise(0.05*P.xy))+ 2.0*CS(3.14 * rnd(U.x));//perlin noise+random
      
            O = vec4(newPos,mod(a,6.2832),P.w+1.);         // move head, P.w儲存每個粒子的生命age
            
            //設定死亡條件
            if  ( O.x<0.|| O.x>R.x || O.y<0.|| O.y>R.y )  { O.w = 0.;} // 若超過邊界，生命age歸零
            if  ( T(P.xy+(r+2.)*CS(a)).w > 0.2 )  { O.w = 0.;} // 若碰撞其它粒子，生命age歸零            
            //if ( length(V)<0.01 ) { O.w = 0.; V=vec2(0.0);} //速度過小，生命age歸零
            if ( D< 0.3)    { O.w = 0.;}                //判定初始位置若過於明亮，生命age歸零   
        }
    }
    
   
  //if (iMouse.w > 0. && distance(iMouse.xy, U) < 50.) O = vec4(0.); // painting
  //O.w=1.0;    //需注意parametric模式會導致靜止不動
  gl_FragColor=O;
}





