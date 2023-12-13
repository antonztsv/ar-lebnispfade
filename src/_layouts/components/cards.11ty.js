exports.getCards = (eleventy, data) => {


  var videoData = ``;

  for(const videoElement of data.ar.video){
    switch(videoElement.type){
      case 'url':
        videoData = videoData.concat(`<iframe id="iframeVideo" src="${videoElement.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
        break;
      case 'filename':
        videoData = videoData.concat(`<video controls="controls" src="../ar-media/videos/${videoElement.filename}"></video>`)
        break;
      default:
        break;
    }
  }

/*   if(data.ar.video.url){
    videoData = '<iframe id="iframeVideo" src="' + data.ar.video.url + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  } else if(data.ar.video.filename){
    videoData = ' <video controls="controls" src="../ar-media/videos/' + data.ar.video.filename + '"></video>'
  } else{

  } */

    return `
        <div id="card" class="card">
          <div class="info-head" onclick="toggleCardBody()">${data.title}</div>
              <div class="card-body" id="cardBody" style="display: none">
                <h4>Infos</h4>
                <p class="info">${data.info}</p>
                <h4>Beschreibung</h4>
                <p class="description">${data.arDesc}</p>
                ${videoData}
                <p class="duration"></p>
          </div>
        </div>
    `;
}