import * as THREE from 'three/build/three.module.js';
import Text from './textParent.js';


class About extends Text {
  constructor() {
    super();

    this.geometry = new THREE.TextGeometry('about', this.textParams);
    this.geometry.center();

    this.material = new THREE.MeshToonMaterial({
      gradientMap: this.toonTexture,
      color: 0xe1e5bf,
    });
    this.material.userData.outlineParameters = this.outlineParams;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-70, 20, 110);
    this.mesh.userData = { url: 'https://yokoyaayako.com/about' };
  }
}

export default About;
