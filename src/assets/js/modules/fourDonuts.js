import * as THREE from 'three/build/three.module.js';
import threeTone from '../../img/threeTone.jpg';

class FourDonuts {
  constructor() {
    this.setup();
    this.donutNum = this.eachParams.color.length;

    //

    this.group = new THREE.Object3D();

    for (let i = 0; i < this.donutNum; i++) {
      this.geometry = new THREE.TorusBufferGeometry(40, 20, 60, 50);
      this.geometry.center();

      this.material = new THREE.MeshToonMaterial({
        gradientMap: this.toonTexture,
        color: this.eachParams.color[i],
        userData: { outlineParameters: this.outlineParams },
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.mesh.position.set(
        this.eachParams.pos.x[i],
        this.eachParams.pos.y[i],
        this.eachParams.pos.z[i]
      );

      this.group.add(this.mesh);
    }
  }

  setup() {
    this.toonTexture = new THREE.TextureLoader().load(threeTone);
    this.toonTexture.minFilter = THREE.NearestFilter;
    this.toonTexture.magFilter = THREE.NearestFilter;

    this.outlineParams = {
      thickness: 0.003,
      visible: true,
    };

    this.eachParams = {
      color: [0xe1e5bf, 0xc6f0e0, 0xf0bfbf, 0xc6b8e2],
      pos: {
        x: [-170, 170, -170, 170],
        y: [70, 70, -90, -90],
        z: [-50, -50, -50, -50],
      },
    };
  }

  render(value1, value2, value3, value4) {
    const sec = performance.now() / 1000;

    this.audioValues = [value1, value2, value3, value4];

    for (let i = 0; i < this.donutNum; i++) {
      this.group.children[i].rotation.x = sec - this.audioValues[i]/5;
      this.group.children[i].rotation.y = sec * 2 - this.audioValues[i]/5;
    }
  }
}

export default FourDonuts;
