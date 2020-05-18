import * as THREE from 'three/build/three.module.js';
import threeTone from '../../img/threeTone.jpg';

class SpDonuts {
  constructor() {

    this.setup();
    this.donutNum = this.grid.cols * this.grid.rows;

    //

    this.group = new THREE.Object3D();

    for (let row = 0; row < this.grid.rows; row++) {
      for (let col = 0; col < this.grid.cols; col++) {

        this.geometry = new THREE.TorusBufferGeometry(40, 20, 60, 50);

        this.pickColor = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ];

        this.material = new THREE.MeshToonMaterial({
          gradientMap: this.toonTexture,
          color: this.pickColor,
          userData: { outlineParameters: this.outlineParams },
        });

        this.radian = (col / this.grid.cols) * Math.PI * 2;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(
          700 * Math.cos(this.radian),
          row * this.grid.size,
          700 * Math.sin(this.radian)
        );

        this.group.add(this.mesh);
      }
    }

    const centerY = (this.grid.rows - 2) * this.grid.size * 0.5;
    this.group.position.set(0, -centerY, 200);
  }

  setup() {
    this.toonTexture = new THREE.TextureLoader().load(threeTone);
    this.toonTexture.minFilter = THREE.NearestFilter;
    this.toonTexture.magFilter = THREE.NearestFilter;

    this.outlineParams = {
      thickness: 0.003,
      visible: true,
    };

    this.grid = {
      cols: 30,
      rows: 10,
      size: 170,
    };

    this.colors = [0xe1e5bf, 0xc6f0e0, 0xf0bfbf, 0xc6b8e2];
  }

  render() {
    const sec = performance.now() / 1000;

    for (let i = 0; i < this.donutNum; i++) {
      this.group.children[i].rotation.x = sec;
      this.group.children[i].rotation.y = sec;
    }
    this.group.rotation.z = Math.sin(sec) / 3;
    this.group.rotation.y = sec * 0.1;
  }
}

export default SpDonuts;
