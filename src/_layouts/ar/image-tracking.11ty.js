exports.getImageTrackingCode = (eleventy, arData) => {

  const script = `

`;
var htmlWithARData = ``;

for (const data of arData.nft) {
  switch (data.type) {
    case 'model':
      htmlWithARData = htmlWithARData.concat(getModelCode(arData, data));
      break
    case 'video':
      htmlWithARData = htmlWithARData.concat(getVideoCode(arData, data));
      break
    case 'audio':
      htmlWithARData = htmlWithARData.concat(getAudioCode(arData, data));
      break
    default:
      break;
  }
}

function getModelCode(arData, data) {

return `
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
nfthandler
registerevents
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

  var localFilename = ''

  for (const data of arData.video){
    if (data.type === 'filename') localFilename = data.filename
  }

  return `
  <a-assets>
        <video id="video" controls src="../ar-media/videos/${localFilename}" loop></video>
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
content="video"
card
nfthandler
registerevents
>
        <a-video
          id="video"
          src="#video"
          width="40"
          height="22"
          position="20 0 -35"
          rotation="90 0 180"
          gesture-handler="minScale: 0.25; maxScale: 10"
          ></a-video>
      </a-nft>
  `
  /* const html = (arData) => `
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
`; */
}

function getAudioCode(arData, data){
  return `
  <a-assets>
            <audio id="audio" src="../ar-media/audios/${arData.audio.filename}" preload="auto"></audio>
        </a-assets>
  <a-nft
  id="${data.type}-nft"
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
content="audio"
card
nfthandler
registerevents
>

<!-- scale/rotation/position attribute need high values (pixels?) -->
<a-entity sound="src: #sound" autoplay="false"></a-entity>
</a-nft>
  `
}

return `
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
