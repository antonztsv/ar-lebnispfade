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
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import * as THREE from "three";
import { MindARThree } from "mindar-image-three";

const currentUrl = window.location.href;

const location = currentUrl.split("/");

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: `../ar-media/images/${location[location.length -2]}.mind`,
});


const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

var video = document.getElementById("video");

var videoTexture;
var movieMaterial;

if(video){
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;

  movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
  });
}

if(document.getElementById("3dmodel")){

  camera.position.set(0, 0, 0)
  camera.lookAt(scene.position)

  var modelData = document.getElementById('3dmodel').dataset.value

  const loader = new GLTFLoader();

  loader.load(`../ar-media/models/${modelData}.glb`, 
    
    function (gltf) {

      const model = gltf.scene.children[0];
      model.scale.set(10,10,10)

		  scene.add(gltf.scene);

		  gltf.animations; // Array<THREE.AnimationClip>
		  gltf.scene; // THREE.Group
		  gltf.scenes; // Array<THREE.Group>
		  gltf.cameras; // Array<THREE.Camera>
		  gltf.asset; // Object

	},
	// called while loading is progressing
	function (xhr) {

		console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded');

	},
	// called when loading has errors
	function (error) {

		console.log('An error happened: ' + error);

	}
)}

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
    mediaControls.classList.add("is-visible");
  } else {
    mediaControls.classList.remove("is-visible");
  }
}

function animate() {
  //video.play();
  requestAnimationFrame(animate);

  if (videoTexture) videoTexture.needsUpdate = true;
}

if(video){
  const movieGeometry = new THREE.PlaneGeometry(1/2, 0.55/2);
  const plane = new THREE.Mesh(movieGeometry, movieMaterial);
  anchor.group.add(plane);
}


const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    setMediaControls();
    animate();
    renderer.render(scene, camera);
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
  start();
})
//const startButton = document.querySelector("#startButton");
//startButton.addEventListener("click", () => {
//  start();
//});
//stopButton.addEventListener("click", () => {
//  mindarThree.stop();
//  mindarThree.renderer.setAnimationLoop(null);
//});
