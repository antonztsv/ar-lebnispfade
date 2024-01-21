let playableContent;

let playBtn;
let pauseBtn;
let stopBtn;
let mediaControls

AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;
        marker.addEventListener('markerFound', function() {

            mediaControls.classList.add("is-visible")


            var content = marker.getAttribute('content')
            switch (content) {
                case 'video':
                    playableContent = document.getElementById('video')
                    break;
                case 'audio':
                    playableContent = document.getElementById('audio')
                    break;
                default:
                    break;
            }
        });
        marker.addEventListener('markerLost', function() {
            playableContent.pause();
            playableContent.currentTime = 0;
            mediaControls.classList.remove("is-visible")
        });
    }
});

/* Functions
############################################################################ */

let audioIsPlaying = false;

const addingMediaControls = () => {

    playBtn = document.querySelector("[data-js-play-button]");
    pauseBtn = document.querySelector("[data-js-pause-button]");
    stopBtn = document.querySelector("[data-js-stop-button]");
    mediaControls = document.getElementById("media-controls");

    if(!mediaControls || mediaControls === null) return;

    const playAudio = () => {
        playableContent.play();
        audioIsPlaying = true;
        playBtn.classList.add("is-hidden");
        pauseBtn.classList.remove("is-hidden");
    }

    const pauseAudio = () => {
        playableContent.pause();
        audioIsPlaying = false;
        playBtn.classList.remove("is-hidden");
        pauseBtn.classList.add("is-hidden");
    }
    
/*     // Dev Demo
    playableContent = document.getElementById("audio");
    if(playableContent && mediaControls) mediaControls.classList.add("is-visible");

    if(!playBtn) return; */
    
    mediaControls.addEventListener("click", () => {
        if(audioIsPlaying){
            pauseAudio();
        }else{
            playAudio();
        }
    });
};


/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
    addingMediaControls();
});

