import * as THREE from 'three/build/three.module.js';
import threeTone from '../../img/threeTone.jpg';


class Donut {
  constructor() {

    const toonTexture = new THREE.TextureLoader().load(threeTone);
    toonTexture.minFilter = THREE.NearestFilter;
    toonTexture.magFilter = THREE.NearestFilter;

    const outlineParams = {
      thickness: 0.003,
      visible: true,
    };

    const geometry = new THREE.TorusBufferGeometry(40, 20, 60, 50);
    const material = new THREE.MeshToonMaterial({
      gradientMap: toonTexture,
      color: 0xffa6c9,
    });
    material.userData.outlineParameters = outlineParams;

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = -10;
  }

  render(upperAvgFr) {
    const sec = performance.now() / 1000;

    const donut = this.mesh;
    donut.rotation.x = sec;
    donut.rotation.y = sec;

    const scale = upperAvgFr + 1.;
    donut.scale.x = scale;
    donut.scale.y = scale;
    donut.scale.z = scale;
  }
}

export default Donut;
