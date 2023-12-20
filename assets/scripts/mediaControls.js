
var playableContent;

var playBtn;
var pauseBtn;
var stopBtn;

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

window.onload = function() {
    //var video = document.getElementById("video");
    playBtn = document.getElementById("playButton");
    pauseBtn = document.getElementById("pauseButton");
    stopBtn = document.getElementById("stopButton");

    //console.log(playableContent)

    playBtn.onclick = function (){

        playableContent.play();
        console.log("PLAY")
    }

    pauseBtn.onclick = function (){

        playableContent.pause();
        console.log("PAUSE")
    }

    stopBtn.onclick = function (){

        playableContent.pause();
        playableContent.currentTime = 0;
        console.log("STOP")
    }
}
