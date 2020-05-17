import * as THREE from 'three/build/three.module.js';

import About from '../elementsText/about.js';
import Github from '../elementsText/github.js';
import Codepen from '../elementsText/codepen.js';
import Code from '../elementsText/code.js';


class TextGroup {
  constructor() {
    this.group = new THREE.Object3D();

    const about = new About();
    this.group.add(about.mesh);

    const github = new Github();
    this.group.add(github.mesh);

    const codepen = new Codepen();
    this.group.add(codepen.mesh);

    const code = new Code();
    this.group.add(code.mesh);

    this.mouse = new THREE.Vector2();

    this.meshList = [about.mesh, github.mesh, codepen.mesh, code.mesh];

    this.raycaster = new THREE.Raycaster();

    window.addEventListener('mouseup', this.onMouseUp.bind(this), {
      passive: true,
    });

    this.onMouseUp({ clientX: 0, clientY: 0 });
  }

  onMouseUp({ clientX, clientY }) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse.x = (clientX / this.width) * 2 - 1;
    this.mouse.y = -(clientY / this.height) * 2 + 1;
  }

  render(camera) {
    this.raycaster.setFromCamera(this.mouse, camera);
    this.intersects = this.raycaster.intersectObjects(this.meshList);

    this.meshList.map((mesh) => {
      if (this.intersects.length > 0 && mesh === this.intersects[0].object) {
        window.open(mesh.userData.url);
      }
    });
  }
}

export default TextGroup;
