let playableContent;


AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;
        marker.addEventListener('markerFound', function() {

            playBtn.removeAttribute("hidden")
            pauseBtn.removeAttribute("hidden")
            stopBtn.removeAttribute("hidden")

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
            playBtn.setAttribute("hidden", "hidden");
            pauseBtn.setAttribute("hidden", "hidden");
            stopBtn.setAttribute("hidden", "hidden");
        });
    }
});

/* Functions
############################################################################ */

let audioIsPlaying = false;

const addingMediaControls = () => {

    const playBtn = document.querySelector("[data-js-play-button]");
    const pauseBtn = document.querySelector("[data-js-pause-button]");
    const mediaControls = document.getElementById("media-controls");

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
    
    // Dev Demo
    playableContent = document.getElementById("audio");
    if(playableContent && mediaControls) mediaControls.classList.add("is-visible");

    if(!playBtn) return;
    
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

