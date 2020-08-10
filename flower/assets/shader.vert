attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform float time;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying float vtime;

void main(){
  vec4 pos=vec4(aPosition,1.);
  //positionVec4.x += distortion * aNormal.x * amplitude;
  vNormal=aNormal;
  vtime=time;
  //pos.xyz += aNormal * 0.1 * sin(time*0.1 + (pos.x + pos.z)*10.0);
  
  gl_Position=uProjectionMatrix*uModelViewMatrix*pos;
  vTexCoord=aTexCoord;
}