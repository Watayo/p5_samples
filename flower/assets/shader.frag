precision mediump float;
varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 c;

uniform float vtime;

float rand(vec2 co){
  return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);
}

void main(){
  vec3 uv = vTexCoord.xy;
  vec4 c = texture2D()
  gl_FragColor = vec4(c, 1.0);
}