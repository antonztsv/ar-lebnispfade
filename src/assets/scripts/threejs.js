// MEDIACONTROLS
// ==============================================================

let audioIsPlaying = false;

let mediaControls;
const addingMediaControls = () => {
  let playableContent;

  let playBtn;
  let stopBtn;
  let pauseBtn;
  playableContent = document.getElementById("video");

  playBtn = document.querySelector("[data-js-play-button]");
  pauseBtn = document.querySelector("[data-js-pause-button]");
  stopBtn = document.querySelector("[data-js-stop-button]");
  mediaControls = document.getElementById("media-controls");

  //mediaControls.classList.add("is-visible");

  if (!mediaControls || mediaControls == null) return;

  const playMedia = () => {
    playableContent.play();
    audioIsPlaying = true;
    playBtn.classList.add("is-hidden");
    pauseBtn.classList.remove("is-hidden");
  };

  const pauseMedia = () => {
    playableContent.pause();
    audioIsPlaying = false;
    playBtn.classList.remove("is-hidden");
    pauseBtn.classList.add("is-hidden");
  };

  mediaControls.addEventListener("click", () => {
    if (audioIsPlaying) {
      pauseMedia();
    } else {
      playMedia();
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  addingMediaControls();
});

// MINDAR
// ==============================================================
import * as THREE from "three";
import { MindARThree } from "mindar-image-three";

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "../ar-media/images/pulvermuseum.mind",
});

const currentUrl = window.location.href;

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

let video = document.getElementById("video");
let videoTexture = new THREE.VideoTexture(video);

videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

var movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
});

const capabilities = {
  OES_texture_half_float: renderer.extensions.has( 'OES_texture_half_float'  ),
  OES_texture_half_float_linear: renderer.extensions.has( 'OES_texture_half_float_linear'  ),
  OES_texture_float: renderer.extensions.has( 'OES_texture_float'  )
};

console.log( capabilities );

const scanningUI = document.querySelector(".mindar-ui-scanning");

let canvas = document.getElementsByTagName("canvas");


function setMediaControls() {
  const check = scanningUI.classList.contains("hidden");
  if (check) {
    canvas[0].style.height = 300;
    canvas[0].style.width = 500;
    mediaControls.classList.add("is-visible");
  } else {
    mediaControls.classList.remove("is-visible");
  }
}

function animate() {
  //video.play();
  requestAnimationFrame(animate);

  videoTexture.needsUpdate = true;
}

const movieGeometry = new THREE.PlaneGeometry(1, 0.55);
const plane = new THREE.Mesh(movieGeometry, movieMaterial);
anchor.group.add(plane);


const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    setMediaControls();
    animate();
    renderer.render(scene, camera);
  });
};
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
  start();
});
stopButton.addEventListener("click", () => {
  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);
});
