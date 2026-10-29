import{a as e,t}from"./boxBuilder-BJ7aRdOk.js";var n=`
precision highp float;
attribute vec3 position;
uniform mat4 worldViewProjection;
varying vec3 vDir;
void main() {
    vDir = position;
    gl_Position = worldViewProjection * vec4(position, 1.0);
}
`,r=`
precision highp float;
varying vec3 vDir;
void main() {
    vec3 d = normalize(vDir);

    vec3 zenith = vec3(0.07, 0.02, 0.18);
    vec3 orange = vec3(1.0, 0.38, 0.18);
    vec3 pink   = vec3(1.0, 0.15, 0.52);
    vec3 cyan   = vec3(0.0, 0.96, 1.0);
    vec3 dark   = vec3(0.04, 0.015, 0.08);

    float h = clamp(d.y, -1.0, 1.0);
    vec3 col = mix(orange, pink, smoothstep(-0.08, 0.52, h));
    col = mix(col, zenith, smoothstep(0.35, 0.92, h));

    // Sliced retro sun (horizontal chops), forward-down (+Z)
    vec2 sunCtr = vec2(0.0, 0.055);
    float sunDist = distance(d.xy, sunCtr) * (d.z > -0.05 ? 1.0 : 4.5);
    float sunDisc = smoothstep(0.17, 0.0, sunDist);
    float chop = fract((d.y - 0.03) * 28.0);
    chop = smoothstep(0.22, 0.78, chop);
    vec3 sunTop = vec3(1.0, 0.95, 0.55);
    vec3 sunBot = vec3(1.0, 0.45, 0.15);
    vec3 sunCol = mix(sunBot, sunTop, clamp((d.y - 0.02) * 12.0, 0.0, 1.0));
    float sunMask = sunDisc * chop;
    col = mix(col, sunCol, sunMask * 0.92);
    col += sunCol * sunDisc * (1.0 - chop * 0.85) * 0.12;

    // Cyan horizon bloom
    float horiz = exp(-pow(d.y * 32.0, 2.0));
    col = mix(col, cyan, horiz * 0.62);

    // Below horizon: night basin (actual neon grid is world geometry at neon city floor)
    if (d.y < 0.0) {
        col = mix(col, dark, smoothstep(0.0, -0.45, d.y));
    }

    gl_FragColor = vec4(col, 1.0);
}
`;function i(i){let a=t(`skybox`,{size:1e3},i);a.infiniteDistance=!0,a.applyFog=!1;let o=new e(`sky-mat`,i,{vertexSource:n,fragmentSource:r},{attributes:[`position`],uniforms:[`worldViewProjection`]});o.backFaceCulling=!1,o.disableDepthWrite=!0,a.material=o}export{i as t};