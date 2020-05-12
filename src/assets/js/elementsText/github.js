import * as THREE from 'three/build/three.module.js';
import Text from './textParent.js';


class Github extends Text {
  constructor() {
    super();

    this.geometry = new THREE.TextGeometry('github', this.textParams);
    this.geometry.center();

    this.material = new THREE.MeshToonMaterial({
      gradientMap: this.toonTexture,
      color: 0xc6f0e0,
    });
    this.material.userData.outlineParameters = this.outlineParams;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(70, 20, 110);
    this.mesh.userData = { url: 'https://github.com/ayako-yokoya' };
  }
}

export default Github;
