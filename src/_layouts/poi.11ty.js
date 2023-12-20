exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const imageTracking = require('./ar/image-tracking.11ty');
  const cards = require('./components/cards.11ty');

  const poiInfo = (data) => `
  <figure class="core-info">
    <img src="../images/${data.image}" alt="${data.title}">
    <figcaption>${this.markdown(data.info)}</figcaption>
  </figure>`;


  const poiMaps = (data) => {
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

  const poiDesc = (data) => {
    const arDesc = data.arDesc;
    if (!arDesc) return '';

    return `
    <div class="ar-desc">
      <span class="icon">info</span>
      <p>${this.markdown(arDesc)}</p>
    </div>
  `;
  };

  const getArCode = (arData) => {
    switch (arData.type) {
      case 'image-tracking':
        return imageTracking.getImageTrackingCode(this, arData);
      default:

    }
  };

  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const card = cards.getCards(this, data);
  const { ar } = data;
  const arCode = (ar) => {
    const code = getArCode(ar);
    return `
        ${code}
    `;
  };
  /* ${poiInfo(data)}
     ${poiMaps(data)}
     ${poiDesc(data)}*/
  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="poi">
      ${pageHead}
      <main>
        ${data.content}
        ${arCode(ar)}
        </main>
        <div id="media-controls">
        <button id="playButton" hidden="hidden"></button>
        <button id="pauseButton" hidden="hidden"></button>
        <button id="stopButton" hidden="hidden"></button>
        </div>
        ${card}
      ${pageFoot}
    </body>
  </html>`;
};
