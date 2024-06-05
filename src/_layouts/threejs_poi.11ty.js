exports.render = function (data) {

  console.log(data.ar)

  const mediaControls = `
  <div id="media-controls" class="media-controls" data-js-media-controls>
    <button id="play-button" data-js-play-button><span class="icon">play_arrow</span></button>
    <button id="pause-button" class="is-hidden" data-js-pause-button><span class="icon">pause</span></button>
    <button id="stop-button" class="is-hidden" data-js-stop-button><span class="icon">stop</span></button>
  </div>
`;
    return `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js"></script>
    <script type="importmap">
    {
      "imports": {
	      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
	      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/",
	      "mindar-image-three":"https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js"
      }
    }
    </script>
    <script type="module" src="/assets/scripts/threejs.js" defer></script>
    <link href="${this.url('/compiled-assets/main.css')}?${this.getDateString()}" rel="stylesheet" media="screen">
    <style>
      body {
	margin: 0;
      }
      #container {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
      }
      #control {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
      }
      .media-controls {
        opacity: 0;
        transition: all var(--tr-slow) var(--tr-delay);
        display: flex;
        gap: var(--m);
        z-index: 20;
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
      
        &.is-visible{
          opacity: 1;
        }
      
        button {
          width: var(--button-size);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--l);
          aspect-ratio: 1/1;
          cursor: pointer;
          border: none;
          background-color: var(--color-accent);
          border-radius: 50%;
          box-shadow: var(--shadow-card);
      
          .icon {
            color: var(--lightest);
          }
      
          &.is-hidden{
            display: none;
          }
        }
        
        button:hover {
          background-color: var(--color-accent);
        }
        #video {
          width: 400px;
          height: 240px;
        }
      }
    </style>
  </head>
  <body>
  <video
      id="video"
      playsinline
      webkit-playsinline
      controls='true'
      autoplay
      loop
      muted
      width="400"
      height="240"
      src="../ar-media/videos/wahllokal.mp4"
      style="display: none"
    ></video>
    <div id="control">
      <button id="startButton">Start</button>
      <button id="stopButton">Stop</button>
    </div>
    <div id="container">
    </div>
    ${mediaControls}
  </body>
</html>
    `;
}