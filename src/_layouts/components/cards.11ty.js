exports.getCards = (eleventy, data) => {

  const pageFooter = require('./page-footer.11ty');
  const pageFoot = pageFooter.getPageFooter(this, data);

  const video = require('./video.11ty');
  const videoData = video.getVideo(eleventy, data);

  const info = data.info ? `<p class="info-card-text info-card-item">${data.info}</p>` : '';
  const desc = data.arDesc ? `<h4 class="info-card-item">Was kann ich hier machen?</h4><p class="info-card-text info-card-item">${data.arDesc}</p>` : '';

  

/*   if(data.ar.video.url){
    videoData = '<iframe id="iframeVideo" src="' + data.ar.video.url + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  } else if(data.ar.video.filename){
    videoData = ' <video controls="controls" src="../ar-media/videos/' + data.ar.video.filename + '"></video>'
  } else{

  } */

    return `
        <div id="card" class="info-card-wrap" data-js-card-wrap>
          <div class="info-card-navigation">
            <button data-js-card-navigation></button>
          </div>
          <div class="info-card-content-wrap">
            ${info}
            ${desc}
            ${videoData}
            ${pageFoot}
          </div>
        </div>
    `;
}
