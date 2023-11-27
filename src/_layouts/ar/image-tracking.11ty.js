exports.getImageTrackingCode = (eleventy, arData) => {

  const script = `
  var video
  
  AFRAME.registerComponent('nfthandler', {
    init: function(){
      this.tick = AFRAME.utils.throttle(this.tick, 500, this);
    },
    
    tick: function(t, dt) {
      
      if(document.querySelector("#hammerboy").object3D.visible == true){
        
        video = document.querySelector('#video');

        video.addEventListener('click', function () { playPauseVideo(); console.log("Video Toggle") })
        
      } else{
        
      }
    }
  })
  
  function playPauseVideo(){
    
    if (video.paused)
    video.play();
  else
  video.pause();
}


AFRAME.registerComponent('vidhandler',{
  init: function(){
    let el = this.el;
    let video = document.querySelector("#video");
    video.controls = true
    video.toggle = false;
    video.pause();
    
    el.addEventListener('click',function(){
      if(video.toggle == false){
        video.toggle = true
        video.play()
      }else{
        video.toggle = false;
        video.pause()
      }
    })
    el.addEventListener('dblclick',function(){video.stop()})
  }
});
window.addEventListener('load', () => {
  const camera = document.querySelector('[camera]');
  const marker = document.querySelector('a-nft');
  const compoundEntity = document.createElement('a-entity');
  const text = document.createElement('a-text');
  const textScale = 100
  text.setAttribute('look-at', '[camera]')
  text.setAttribute('scale', {
    x: textScale,
    y: textScale,
    z: textScale
  })
  text.setAttribute('align', 'center')
  compoundEntity.appendChild(text)
  let check;
  
  marker.addEventListener('markerFound', (e) => {
    //fillCard(e);
    /*          let cameraPosition = camera.object3D.position;
    let markerPosition = marker.object3D.position;
    let distance = cameraPosition.distanceTo(markerPosition)
    
    check = setInterval(() => {
      cameraPosition = camera.object3D.position;
      markerPosition = marker.object3D.position;
      distance = cameraPosition.distanceTo(markerPosition)
      
      // do what you want with the distance:
      text.setAttribute('value', toString(distance.toFixed(2)) + '?')
    }, 100); */
  });
  
  marker.addEventListener('markerLost', () => {
    clearInterval(check);
  })
});
`;
var htmlWithARData = ``;

for (const data of arData.nftTest) {
  switch (data.type) {
    case 'model':
      htmlWithARData = htmlWithARData.concat(getModelCode(arData, data));
    case 'video':
      htmlWithARData = htmlWithARData.concat(getVideoCode(arData, data));
    case 'audio':
      htmlWithARData = htmlWithARData.concat(getAudioCode(arData, data));
    default:
      break;
  }
}

function getModelCode(arData, data) {

return `
<a-assets>
        <a-asset-item
          id="optimerBoldFont"
          src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
        ></a-asset-item>
        <!-- <video id="video" controls src="../ar-media/videos/${arData.video.filename}" loop></video> -->
</a-assets>
<a-nft
class="${data.id}-nft"
type="nft"
url="${arData.location}/ar-media/images/${data.id}"
smooth="true"
smoothCount="10"
smoothTolerance=".01"
smoothThreshold="5"
raycaster="objects: .clickable"
emitevents="true"
cursor="fuse: false; rayOrigin: mouse"
card
>

<!-- scale/rotation/position attribute need high values (pixels?) -->
  <a-entity
    gltf-model="../ar-media/models/${data.model}.glb"
    scale="250 250 250"
    position="250 400 -500"
    rotation="0 0 0"
    class="clickable"
    gesture-handler="minScale: 0.5; maxScale: 10"
  >
  <a-entity
    text-geometry="value: ${data.name}"
    material="color: white"
    rotation="-90 0 0"
    position="0 0 -1"
  ></a-entity>
</a-entity>
</a-nft>
`

/*  const html = (arData) => `
<a-assets>
        <a-asset-item
          id="optimerBoldFont"
          src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
        ></a-asset-item>
        <!-- <video id="video" controls src="../ar-media/videos/${arData.video.filename}" loop></video> -->
</a-assets>
<a-nft
class="${arData.nft.id}-nft"
type="nft"
url="${arData.location}/ar-media/images/${arData.nft.id}"
smooth="true"
smoothCount="10"
smoothTolerance=".01"
smoothThreshold="5"
raycaster="objects: .clickable"
emitevents="true"
cursor="fuse: false; rayOrigin: mouse"
card
>

<!-- scale/rotation/position attribute need high values (pixels?) -->
  <a-entity
    gltf-model="../ar-media/models/${arData.nft.model}.glb"
    scale="250 250 250"
    position="250 400 -500"
    rotation="0 0 0"
    class="clickable"
    gesture-handler="minScale: 0.5; maxScale: 10"
  >
  <a-entity
    text-geometry="value: ${arData.nft.name}"
    material="color: white"
    rotation="-90 0 0"
    position="0 0 -1"
  ></a-entity>
</a-entity>
</a-nft>
  `

  return `
  <script>${script}</script>
  <div class="arjs-loader">
  <div>Loading, please wait...</div>
</div>
<a-scene
  embedded
  stats
  vr-mode-ui="enabled: false;"
  renderer="logarithmicDepthBuffer: true;"
  arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  antialias='true'
  gesture-detector
  id="scene"
>
${html(arData)}
<a-entity camera></a-entity>
</a-scene>
`; */
}

function getVideoCode(arData, data) {
  const html = (arData) => `
<a-assets>
        <a-asset-item
          id="optimerBoldFont"
          src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
        ></a-asset-item>
        <video id="video" controls src="../ar-media/videos/${arData.video.filename}" loop></video>
</a-assets>
<a-nft
class="${arData.nft.id}-nft"
type="nft"
url="${arData.location}/ar-media/images/${arData.nft.id}"
smooth="true"
smoothCount="10"
smoothTolerance=".01"
smoothThreshold="5"
raycaster="objects: .clickable"
emitevents="true"
cursor="fuse: false; rayOrigin: mouse"
card
>
        <a-video
          id="video"
          src="#video"
          width="160"
          height="90"
          position="0 0 -20"
          rotation="90 0 180"
          gesture-handler="minScale: 0.25; maxScale: 10"
        ></a-video>
      </a-nft>
  `
  return `
  <script>${script}</script>
  <div class="arjs-loader">
  <div>Loading, please wait...</div>
</div>
<a-scene
  embedded
  stats
  vr-mode-ui="enabled: false;"
  renderer="logarithmicDepthBuffer: true;"
  arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  antialias='true'
  gesture-detector
  id="scene"
>
${html(arData)}
<a-entity camera></a-entity>
</a-scene>
`;
}

function getAudioCode(arData, data){
}

return `
<script>${script}</script>
<div class="arjs-loader">
<div>Loading, please wait...</div>
</div>
<a-scene
embedded
stats
vr-mode-ui="enabled: false;"
renderer="logarithmicDepthBuffer: true;"
arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
antialias='true'
gesture-detector
id="scene"
>
${htmlWithARData}
<a-entity camera></a-entity>
</a-scene>
`

/*const html = (arData) => `
     

      

      <a-nft
        type="nft"
        url="${arData.location}/ar-media/images/${arData.nft3.id}"
        smooth="true"
        smoothCount="10"
        smoothTolerance=".01"
        smoothThreshold="5"
        raycaster="objects: .clickable"
        emitevents="true"
        cursor="fuse: false; rayOrigin: mouse"
      >
      <a-entity 
        gltf-model="url(../ar-media/models/${arData.nft3.model}.glb)"
        animation-mixer
        gesture-handler="minScale: 0.25; maxScale: 10"
        >
        </a-entity>
      </a-nft>
      <!-- static camera that moves according to the device movemenents -->
      <a-entity camera></a-entity>
    </a-scene>
  `;

  return `
    <script>${script}</script>
    ${html(arData)}
  `; */
};
