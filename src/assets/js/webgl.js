import * as THREE from 'three/build/three.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';

import AudioDonut from './modules/audioDonut.js';
import FourDonuts from './modules/fourDonuts.js';
import Heart from './modules/heart.js';
import Wave from './modules/wave.js';
import Text from './modules/text.js';
import { avg } from './helper.js';


class Webgl {
  setup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.audio = document.querySelector('audio');
    this.playBtn = document.querySelector('#play');
    this.playingFlag = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.src = this.context.createMediaElementSource(this.audio);
    this.analyser = this.context.createAnalyser();

    this.src.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    this.analyser.fftSize = 512;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.playBtn.addEventListener('click', this.controlAudio.bind(this), {
      passive: true,
    });

    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true,
    });
  }

  createScene() {
    const container = document.querySelector('#container');

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(this.renderer.domElement);
  }

  createCamera() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2500);
    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  addDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);

    this.scene.add(this.directionalLight);
  }

  addOutlineEffect() {
    this.effect = new OutlineEffect(this.renderer, {
      defaultColor: [0, 0, 0],
      defaultAlpha: 0.8,
      defaultKeepAlive: true,
    });
  }

  getMesh() {
    this.audioDonut = new AudioDonut();
    this.scene.add(this.audioDonut.mesh);

    this.fourDonuts = new FourDonuts();
    this.scene.add(this.fourDonuts.group);

    this.heart = new Heart();
    this.scene.add(this.heart.mesh);

    this.wave = new Wave(this.dataArray, this.bufferLength);
    this.scene.add(this.wave.mesh);

    this.text = new Text();
    this.scene.add(this.text.group);
  }

  init() {
    this.setup();

    this.createScene();

    this.createCamera();

    this.addDirectionalLight();

    this.addOutlineEffect();

    this.getMesh();

    this.render();
  }

  controlAudio() {
    if (this.playingFlag) {
      if (this.context.state === 'suspended') {
        this.context.resume();
      }
      this.src.connect(this.context.destination);
      this.audio.play();
      this.playBtn.innerHTML = 'stop';
      this.playingFlag = false;
    } else {
      this.audio.pause();
      this.playBtn.innerHTML = 'play';
      this.playingFlag = true;
    }
  }

  updateAudioData() {
    let upperHalfArray, upperAvg;
    this.upperAvgFr;

    this.analyser.getByteFrequencyData(this.dataArray);

    upperHalfArray = this.dataArray.slice(
      this.dataArray.length / 2 - 1,
      this.dataArray.length - 1
    )
    upperAvg = avg(upperHalfArray);
    this.upperAvgFr = upperAvg / upperHalfArray.length;
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.wave.onResize(this.width, this.height);
  }

  render() {
    //controls.update();

    this.updateAudioData();

    this.audioDonut.render(this.upperAvgFr);
    this.fourDonuts.render();
    this.heart.render();
    this.wave.render();
    this.text.render(this.camera);

    this.effect.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}

export default Webgl;
