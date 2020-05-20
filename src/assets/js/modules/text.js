import * as THREE from 'three/build/three.module.js';

import fontJson from 'three/examples/fonts/droid/droid_sans_regular.typeface.json';
import threeTone from '../../img/threeTone.jpg';


class Text {
  constructor(camera) {
    this.setup();
    this.camera = camera;
    const textNum = this.eachParams.letter.length;

    //

    this.group = new THREE.Object3D();

    for (let i = 0; i < textNum; i++) {
      this.geometry = new THREE.TextGeometry(
        this.eachParams.letter[i],
        this.textParams
      );

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

      this.mesh.userData = {
        url: this.eachParams.url[i],
      };

      this.group.add(this.mesh);
    }

    //

    document.addEventListener('mousedown', this.onMouseDown.bind(this), false);
  }

  setup() {
    this.toonTexture = new THREE.TextureLoader().load(threeTone);
    this.toonTexture.minFilter = THREE.NearestFilter;
    this.toonTexture.magFilter = THREE.NearestFilter;

    this.font = new THREE.Font(fontJson);

    this.outlineParams = {
      thickness: 0.003,
      visible: true,
    };

    this.textParams = {
      font: this.font,
      size: 14,
      height: 3,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    this.eachParams = {
      letter: ['about', 'github', 'codepen', 'code'],
      color: [0xe1e5bf, 0xc6f0e0, 0xf0bfbf, 0xc6b8e2],
      pos: {
        x: [-70, 70, -70, 70],
        y: [20, 20, -40, -40],
        z: [110, 110, 110, 110],
      },
      url: [
        'https://yokoyaayako.com/about/',
        'https://github.com/ayakoyokoya/',
        'https://codepen.io/ayakoyokoya/',
        'https://github.com/ayakoyokoya/yaba-kawaii-audio-visualizer/',
      ],
    };
  }

  onMouseDown(event) {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse.x = (event.clientX / this.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.group.children);

    this.group.children.map((mesh) => {
      if (this.intersects.length > 0 && mesh === this.intersects[0].object) {
        window.open(mesh.userData.url);
      }
    });
  }
}

export default Text;
