float circle(vec2 st)
{
    return smoothstep(0.0,0.001,-(length(st-0.5)-0.33));
}