precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform bool isEnable;

float rand(vec2 co){
  float a=fract(dot(co,vec2(2.067390879775102,12.451168662908249)))-.5;
  float s=a*(6.182785114200511+a*a*(-38.026512460676566+a*a*53.392573080032137));
  float t=fract(s*43758.5453);
  return t;
}

mat2 rotate(float a){
  float s=sin(a),c=cos(a);
  return mat2(c,s,-s,c);
}

void main(){
  vec2 uv=vTexCoord;
  vec4 tex=texture2D(tex0,uv);

  float radius = 0.002;
  float x = uv.x + rand(uv) * radius * 2.0 - radius;
  float y = uv.y + rand(vec2(uv.y, uv.x)) * radius*2.-radius;

  tex = texture2D(tex0, vec2(x, y));

  gl_FragColor=tex;

}