float random(vec2 st){  return fract( sin( dot(st,vec2(3.678,678.90)) )*678910.0 ); }
float random (in float x) { return fract(sin(x)*43758.5453123); }

vec2 random2(vec2 st)
{
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}