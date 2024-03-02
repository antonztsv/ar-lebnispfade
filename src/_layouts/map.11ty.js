exports.render = function(data) {
  const mapMeta = `
    <script src='https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css' rel='stylesheet' />
    <script src="${this.url('/assets/scripts/map.js')}" defer></script>
  `;

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const pageAside = require('./components/aside.11ty');


  const documentHead = documentHeader.getHeader(this, data, { mapMeta });
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const aside = pageAside.getAside(this, data);
  
  const links = data.links.map((link) => {
    const { icon, title, url } = link;
    return `<li class="text-link"><a href="${url}"><span class="icon">${icon}</span> ${title}</a></li>`;
  });

  const linkList = links.length > 0
    ? `<ul class="links">${links.join("\n")}</ul>`
    : '';

  const mapBoxToken = this.getMapboxToken();

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <script>
      mapboxgl.accessToken = '${mapBoxToken}';
    </script>
    <body class="overview">
      <div class="device-wrapper">
        ${pageHead}
        <main data-js-on-load-action="fade-in">
          <div id="map" class="map"></div>
          ${linkList}
          <div class="info">
            ${data.content}
          </div>
        </main>
        ${pageFoot}
      </div>

      ${aside}
      
    </body>
  </html>`;
};