precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float strength;
uniform bool horizontal;

void main() {
    float weight[5];
    weight[0] = 0.382928;
    weight[1] = 0.241732;
    weight[2] = 0.060598;
    weight[3] = 0.005977;
    weight[4] = 0.000229;

    vec2 uv = vTexCoord;

    vec4 tex = texture2D(tex0,uv);
   
    if(horizontal) {
        for(int i = 0; i < 5; i++) {
            float index = (float)i;
            tex.xyz += texture2D(tex0, uv + vec2(strength * index, 0.0)).xyz * weight[i];
            tex.xyz += texture2D(tex0, uv - vec2(strength * index, 0.0)).xyz * weight[i];
        }
    } else {
        for(int i = 0; i < 5; i++) {
            float index = (float)i;
            tex.xyz += texture2D(tex0, uv + vec2(0.0, strength * index)).xyz * weight[i];
            tex.xyz += texture2D(tex0, uv - vec2(0.0, strength * index)).xyz * weight[i];
        }
    }
    gl_FragColor = tex;
}