exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const imageTracking = require('./ar/image-tracking.11ty');
  const cards = require('./components/cards.11ty');
  const pageDialogs = require('./components/dialogs.11ty');
  const pageAside = require('./components/aside.11ty');

  const getArCode = (arData) => {
    if(!arData) return '';
    switch (arData.type) {
      case 'image-tracking':
        return imageTracking.getImageTrackingCode(this, arData);
      default:
    }
  };
  
  const mediaControls = `
    <div id="media-controls" class="media-controls" data-js-media-controls>
      <button id="play-button" data-js-play-button><span class="icon">play_arrow</span></button>
      <button id="pause-button" class="is-hidden" data-js-pause-button><span class="icon">pause</span></button>
    </div>
  `;

  const dialogData = {
    "text": data.arDesc || '',
    "title": data.title || '',
    "ar": data.ar || ''
  };
  const modalDialog = pageDialogs.getModalDialog(this, dialogData)

  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const aside = pageAside.getAside(this, data);

  const card = cards.getCard(this, data);
  const { ar } = data;
  const arCode = getArCode(ar);

  /* ${poiInfo(data)}
     ${poiMaps(data)}
     ${poiDesc(data)}*/
  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="poi">
      <div class="device-wrapper">
        ${pageHead}
        <main>
          <div class="ar-code" data-js-inject-ar-code></div>
          ${data.content}
          ${mediaControls}
          ${card}
        </main>
        ${modalDialog}
      </div>
      ${aside}
    </body>

    <script>
    const arCode = "${encodeURI(arCode)}";
    </script>
  </html>`;
};
