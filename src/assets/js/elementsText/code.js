import * as THREE from 'three/build/three.module.js';
import Text from './textParent.js';


class Portfolio extends Text {
  constructor() {
    super();

    this.geometry = new THREE.TextGeometry('</>', this.textParams);
    this.geometry.center();

    this.material = new THREE.MeshToonMaterial({
      gradientMap: this.toonTexture,
      color: 0xc6b8e2,
    });
    this.material.userData.outlineParameters = this.outlineParams;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(70, -40, 110);
    this.mesh.userData = {
      url: 'https://github.com/ayako-yokoya/portfolio-site',
    };
  }
}

export default Portfolio;
