import * as THREE from 'three/build/three.module.js';
import { TweenMax } from 'gsap';
import threeTone from '../../img/threeTone.jpg';


class Heart {
  constructor() {

    this.setup();
    this.writeShape();
    this.setProps();

    //

    const light = new THREE.PointLight(0xffffff, 1, 800);
    const geometry = new THREE.ExtrudeBufferGeometry(this.shape, this.props);
    const material = new THREE.MeshToonMaterial({
      gradientMap: this.toonTexture,
      color: 0xd9184b,
      userData: { outlineParameters: this.outlineParams },
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(.6, .6, .6);
    this.mesh.rotation.set(0, 0, Math.PI);
    this.mesh.add(light);
  }

  setup() {
    this.toonTexture = new THREE.TextureLoader().load(threeTone);
    this.toonTexture.minFilter = THREE.NearestFilter;
    this.toonTexture.magFilter = THREE.NearestFilter;

    this.outlineParams = {
      thickness: 0.001,
      visible: true,
    };
  }

  writeShape() {
    let x = 0;
    let y = 0;

    this.shape = new THREE.Shape()
      .moveTo(x + 5, y + 5)
      .bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
      .bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
      .bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
      .bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
      .bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
      .bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    return this.shape;
  }

  setProps() {
    this.props = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    return this.props;
  }

  render() {
    const sec = performance.now() / 1000;
    const heart = this.mesh;
    heart.rotation.x = sec;
    heart.rotation.y = sec;
    heart.position.x = Math.sin(sec*.8) * Math.cos(sec*.8) * 200;
    heart.position.y = Math.sin(sec*.4) * 200;
    heart.position.z = Math.cos(sec*.6) * 200;
  }
}

export default Heart;
