import * as THREE from 'three/build/three.module.js';
import threeTone from '../../img/threeTone.jpg';


class FourDonuts {
  constructor() {

    const toonTexture = new THREE.TextureLoader().load(threeTone);
    toonTexture.minFilter = THREE.NearestFilter;
    toonTexture.magFilter = THREE.NearestFilter;

    const outlineParams = {
      thickness: 0.003,
      visible: true,
    };

    this.group = new THREE.Object3D();

    this.donutNum = 4;

    const colors = [0xf0bfbf, 0xe1e5bf, 0xc6f0e0, 0xc6b8e2];

    for (let i = 0; i < this.donutNum; i++) {
      this.geometry = new THREE.TorusBufferGeometry(40, 20, 60, 50);
      this.geometry.center();

      this.material = new THREE.MeshToonMaterial({
        gradientMap: toonTexture,
        color: colors[i],
      });
      this.material.userData.outlineParameters = outlineParams;

      this.mesh = new THREE.Mesh(this.geometry, this.material);

      switch (i) {
        case 0:
          this.mesh.position.set(-170, -90, -50);
          break;
        case 1:
          this.mesh.position.set(-170, 70, -50);
          break;
        case 2:
          this.mesh.position.set(170, 70, -50);
          break;
        case 3:
          this.mesh.position.set(170, -90, -50);
          break;
      }
      this.group.add(this.mesh);
    }
  }

  render() {
    const sec = performance.now() / 1000;

    for (let j = 0; j < this.donutNum; j++) {
      this.group.children[j].rotation.x = sec;
      this.group.children[j].rotation.y = sec*2.;
    }
  }
}

export default FourDonuts;
