import * as THREE from 'three/build/three.module.js';
import fontJson from 'three/examples/fonts/droid/droid_sans_regular.typeface.json';
import threeTone from '../../img/threeTone.jpg';


class Text {
  constructor() {

    this.toonTexture = new THREE.TextureLoader().load(threeTone);
    this.toonTexture.minFilter = THREE.NearestFilter;
    this.toonTexture.magFilter = THREE.NearestFilter;

    this.font = new THREE.Font(fontJson);

    this.outlineParams = {
      thickness: 0.003,
      visible: true,
    }

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
    }
  }
}

export default Text;
