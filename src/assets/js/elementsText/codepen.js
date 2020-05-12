import * as THREE from 'three/build/three.module.js';
import Text from './textParent.js';


class Codepen extends Text {
  constructor() {
    super();

    this.geometry = new THREE.TextGeometry('codepen', this.textParams);
    this.geometry.center();

    this.material = new THREE.MeshToonMaterial({
      gradientMap: this.toonTexture,
      color: 0xf0bfbf,
    });
    this.material.userData.outlineParameters = this.outlineParams;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-70, -40, 110);
    this.mesh.userData = { url: 'https://codepen.io/ayako-yokoya' };
  }
}

export default Codepen;
