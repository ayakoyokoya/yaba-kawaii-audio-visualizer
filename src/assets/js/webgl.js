import * as THREE from 'three/build/three.module.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Howl, Howler } from 'howler/dist/howler.min';

import AudioDonut from './modules/audioDonut.js';
import FourDonuts from './modules/fourDonuts.js';
import Heart from './modules/heart.js';
import Wave from './modules/wave.js';
import Text from './modules/text.js';
import { avg } from './helper.js';


class Webgl {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.container = document.querySelector('#container');
    this.links = document.querySelector('#links');
    this.playBtn = document.querySelector('#play');

    this.createAudio();
    this.createScene();
    this.createCamera();
    this.addDirectionalLight();
    this.addOutlineEffect();
    //this.addOrbitControls();
    this.getMesh();
    this.onResize();
    this.render();

    this.playBtn.addEventListener('click', this.controlAudio.bind(this), {
      passive: true,
    });

    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true,
    });

    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.links.style.display = 'display';
    } else {
      this.links.style.display = 'none';
    }
  }

  // only use web audio api
  // this code works fine on iMac(safari and chrome) but no sound on iOS(safari and chrome)...
  /*createAudio() {
    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', 'https://yokoyaayako.com/audio/I_Wish_He_Brings_Donuts.mp3');
    this.audio.loop = true;
    this.audio.preload = true;
    document.querySelector('#audio').appendChild(this.audio);

    this.playingFlag = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    this.src = this.context.createMediaElementSource(this.audio);
    this.src.connect(this.context.destination);

    this.gainNode = this.context.createGain();
    this.src.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.value = 0.1;

    this.analyser = this.context.createAnalyser();
    this.src.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    this.analyser.fftSize = 512;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }*/

  // use howler.js
  createAudio() {
    this.howler = new Howl({
      src: ['https://yokoyaayako.com/audio/I_Wish_He_Brings_Donuts.mp3'],
      preload: true,
      volume: 1.0,
      loop: true,
    });

    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser.connect(Howler.ctx.destination);
    this.analyser.fftSize = 512;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  createScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      10000
    );
    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  addDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-100, 100, 500);
    this.scene.add(this.directionalLight);

    //this.helper = new THREE.DirectionalLightHelper(this.directionalLight, 5, 0x000000);
    //this.scene.add(this.helper);
  }

  addOutlineEffect() {
    this.effect = new OutlineEffect(this.renderer, {
      defaultColor: [0, 0, 0],
      defaultAlpha: 0.8,
      defaultKeepAlive: true,
    });
  }

  //addOrbitControls() {
  //  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  //}

  getMesh() {
    this.audioDonut = new AudioDonut();
    this.scene.add(this.audioDonut.mesh);

    this.heart = new Heart();
    this.scene.add(this.heart.mesh);

    this.wave = new Wave(this.dataArray, this.bufferLength);
    this.scene.add(this.wave.mesh);

    if (!navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.fourDonuts = new FourDonuts();
      this.scene.add(this.fourDonuts.group);

      this.text = new Text();
      this.scene.add(this.text.group);

      this.wave = new Wave(this.dataArray, this.bufferLength);
      this.scene.add(this.wave.mesh);
    }
  }

  // only use web audio api
  // this code works fine on iMac(safari and chrome) but no sound on iOS(safari and chrome)...
  /*controlAudio() {
    if (this.playingFlag) {

      if (this.context.state === 'suspended') {
        this.context.resume();
      }
      this.audio.play();
      this.playBtn.innerHTML = 'pause';
      this.playingFlag = false;

    } else {
      this.audio.pause();
      this.playBtn.innerHTML = 'play';
      this.playingFlag = true;
    }
  }*/

  // use howler.js
  controlAudio() {
    if (this.howler.playing()) {
      this.howler.pause();
      this.playBtn.innerHTML = 'play';
    } else {
      this.howler.play();
      this.playBtn.innerHTML = 'pause';
    }
  }

  updateAudioData() {
    this.analyser.getByteFrequencyData(this.dataArray);

    this.audioArray = [
      this.dataArray.slice(150, 256),
      this.dataArray.slice(0, 25),
      this.dataArray.slice(50, 75),
      this.dataArray.slice(75, 100),
      this.dataArray.slice(100, 150),
    ];

    this.audioValues = []

    for (let i = 0; i < this.audioArray.length; i++) {

      this.audioArrayAvg = avg(this.audioArray[i]);

      this.audioValue = this.audioArrayAvg / this.audioArray[i].length;

      this.audioValues.push(this.audioValue);
    }
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.wave.onResize(this.width, this.height);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.updateAudioData();
    //this.controls.update();

    this.audioDonut.render(this.audioValues[0]);
    this.heart.render();
    this.wave.render();

    if (!navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.fourDonuts.render(
        this.audioValues[1],
        this.audioValues[2],
        this.audioValues[3],
        this.audioValues[4]
      );
      this.text.render(this.camera);
      this.wave.render();
    }

    this.effect.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
  }
}

export default Webgl;
