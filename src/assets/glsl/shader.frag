#pragma glslify:snoise=require(glsl-noise/simplex/3d.glsl)

varying vec2 vUv;
//uniform sampler2D uAudioData;
uniform float uAspect;
uniform float uTime;
//uniform vec2 uResolution;

void main(){
  const float PI=3.1415926535;
  vec2 uv=vec2(vUv.x*uAspect,vUv.y);

  /* colors */
  vec3 line=vec3(0.,0.,0.);
  vec3 sky=vec3(.545,.922,.94);
  vec3 cloud=vec3(1.,1.,1.);
  vec3 color=vec3(0.);

  /* simple wave */
  uv=uv*10.;
  float t=uTime*2.;
  float y=uv.y-(sin(uv.x+t)+cos(uv.x))/3.;

  /* noise wave */
  //uv=uv*10.;
  //float t=uTime;
  //vec3 wave=vec3(3.,0.,.5);
  //float noise=snoise(vec3(wave.x*uv.x,wave.y*uv.y,wave.z));
  //float y=uv.y-sin(uv.x+t*PI)+cos(uv.x+noise*PI);

  if(y<.98){
    color=cloud;
  }
  else if(y<1.){
    color=line;
  }
  else{
    color=sky;
  }

  gl_FragColor=vec4(color,1);
}
