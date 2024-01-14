exports.getCard = (eleventy, data) => {

  const pageFooter = require('./page-footer.11ty');
  const pageFoot = pageFooter.getPageFooter(this, data);

  const video = require('./video.11ty');
  const videoData = video.getVideo(eleventy, data);

  const desc = data.arDesc ? `` : '';


  const getPoiInfo = (data) => {
    if(!data.info) return '';
    return `
      <p class="info-card-text info-card-item">
        <figure class="core-info">
          <img src="../images/small/${data.image}" alt="${data.title}">
          <figcaption>${eleventy.markdown(data.info)}</figcaption>
        </figure>
      </p>
    `;
  }


  const getPoiMaps = (data) => {
    const gmapUrl = data.gmaps;
    if (!gmapUrl) return '';

    return `
      <p class="maps-link">
        <a href="${gmapUrl}" target="_blank">
          <span class="icon">map</span>
          <span>${data.title} auf Google Maps anzeigen</span>
        </a>
      </p>
  `;
  };

  const getPoiDesc = (data) => {
    const arDesc = data.arDesc;
    if (!arDesc) return '';
    return `
      <div class="ar-desc info-card-item">
        <h4>  
          <span class="icon">info</span>Was kann ich hier machen?
        </h4>
        <p class="info-card-text">${eleventy.markdown(arDesc)}</p>
      </div>
  `;
  };
  

/*   if(data.ar.video.url){
    videoData = '<iframe id="iframeVideo" src="' + data.ar.video.url + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  } else if(data.ar.video.filename){
    videoData = ' <video controls="controls" src="../ar-media/videos/' + data.ar.video.filename + '"></video>'
  } else{

  } */

    const poiInfo = getPoiInfo(data);
    const poiMaps = getPoiMaps(data);
    const poiDesc = getPoiDesc(data);

    return `
        <div id="card" class="info-card-wrap" data-js-card-wrap>
          <div class="info-card-navigation">
            <button data-js-card-navigation></button>
          </div>
          <div class="info-card-content-wrap">
            ${poiInfo}
            ${poiDesc}
            ${videoData}
            ${poiMaps}
            ${pageFoot}
          </div>
        </div>
    `;
}
