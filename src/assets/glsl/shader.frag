#pragma glslify:snoise=require(glsl-noise/simplex/3d.glsl)

varying vec2 vUv;
uniform sampler2D uAudioData;
uniform float uAspect;
uniform float uTime;
uniform vec2 uResolution;

void main(){
  const float PI=3.1415926535;
  vec2 uv=vec2(vUv.x*uAspect,vUv.y);

  // color
  vec3 line=vec3(0.,0.,0.);
  vec3 cream=vec3(1.,.953,.837);
  vec3 sky=vec3(.545,.922,.94);
  vec3 color=vec3(0.);

  // noise
  vec3 wave=vec3(3.,0.,.5);
  float noise=snoise(vec3(wave.x*uv.x,wave.y*uv.y,wave.z));

  // wave
  uv*=10.;
  float t=uTime*1.;
  float y=uv.y-sin(uv.x+t*PI)*2.+cos(uv.x+noise*PI);

  if (y < .88) {
    color = cream;
  }
  else if (y<1.) {
    color = line;
  }
  else {
    color = sky;
  }

/*
  vec3 black=vec3(0.);
  vec3 white=vec3(1.);
  vec3 col2=vec3(0.);

  float f=texture2D(uAudioData,vec2(uv.x,0.)).r;
  float i=step(uv.y,f);
  col2=(i<1.)?black:white;
*/

  gl_FragColor=vec4(color,1);
}
