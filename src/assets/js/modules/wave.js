import * as THREE from 'three/build/three.module.js';

import vertexShader from '../../glsl/shader.vert';
import fragmentShader from '../../glsl/shader.frag';

class Wave {
  constructor(dataArray, bufferLength) {

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    this.uniforms = {
      uAudioData: {
        value: new THREE.DataTexture(
          dataArray,
          bufferLength,
          1,
          THREE.LuminanceFormat
        ),
      },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uTime: { value: 1.0 },
      uResolution: { value: new THREE.Vector2() },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthTest: false,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.renderOrder = -10;
  }

  render() {
    const sec = performance.now() / 1000;
    this.uniforms.uTime.value = sec;
    this.uniforms.uAudioData.value.needsUpdate = true;
  }

  onResize(width, height) {
    this.uniforms.uResolution.value.x = width;
    this.uniforms.uResolution.value.y = height;
  }
}

export default Wave;
