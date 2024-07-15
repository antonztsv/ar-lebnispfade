exports.getImageTrackingCode = (eleventy, arData) => {
/**
 * TODO:
 * add variabel to accomandate different 3D-Model filetypes
 */
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

  let audioData = ''

  if(arData.audio) audioData = `  
  <a-assets>
    <audio id="audio" src="../ar-media/audios/${arData.audio.filename}" preload="auto"></audio>
  </a-assets>`

return `
${audioData}
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
content="audio"
card
nfthandler
registerevents
>

<!-- scale/rotation/position attribute need high values (pixels?) -->
  <a-entity
    gltf-model="../ar-media/models/${data.model}.glb"
    scale="${data.scale}"
    position="${data.position}"
    rotation="${data.rotation}"
    class="clickable"
    gesture-handler="minScale: 0.5; maxScale: 10"
  >
</a-entity>
</a-nft>
`
}

function getVideoCode(arData, data) {

  let audioData = ''

  if(arData.audio) audioData = ` 
    <audio id="audio" src="../ar-media/audios/${arData.audio.filename}" preload="auto"></audio> `

  var localFilename = ''

  for (const data of arData.video){
    if (data.type === 'filename') localFilename = data.filename
  }

  // https://media.arlebnisobk.de/data-proxy/?filename=wahllokal.mp4
  // <video autoplay loop muted playsinline id="video" controls src="../ar-media/videos/${localFilename}"></video>


  return `
  <a-assets>
        ${audioData}
        <video loop muted playsinline id="video" controls src="https://media.arlebnisobk.de/data-proxy/?filename=wahllokal.mp4"></video>
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
          width="50"
          height="28"
          scale="${data.scale}"
          position="${data.position}"
          rotation="${data.rotation}"
          gesture-handler="minScale: 0.25; maxScale: 10"
          ></a-video>
      </a-nft>
  `
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
`;
};
