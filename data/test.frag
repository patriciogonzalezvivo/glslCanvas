#ifdef GL_ES
    precision mediump float;
#endif

#include data/random.glsl
#include data/additional.glsl

#define SECONDS 6.0

uniform vec2 u_resolution;
uniform float u_time;

void main()
{
    vec2 st = u_resolution.xy/gl_FragCoord.xy;
    float t = abs(fract(u_time/SECONDS)-0.5);
    vec3 c = vec3(random(st+t));
    c += circle(st);
    gl_FragColor = vec4(c,1.0);
}