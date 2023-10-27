exports.getCards = (eleventy, data) => {

  var iframeData = "";
  if(data.ar.video.url){
    iframeData = '<iframe id="iframeVideo" src="https://www.youtube.com/embed/uDjJPtmBcmY?si=japZwtlh16alDnu_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  } 

    return `
        <div id="card" class="card">
          <div class="info-head" onclick="toggleCardBody()">${data.title}</div>
              <div class="card-body" id="cardBody" style="display: none">
                <h4>Infos</h4>
                <p class="info">${data.info}</p>
                <h4>Beschreibung</h4>
                <p class="description">${data.arDesc}</p>
                ${iframeData}
                <p class="duration"></p>
          </div>
        </div>
    `;
}