exports.render = function (data) {
  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const arMap = require('./components/map.11ty');
  
  const mapMeta = arMap.getMapMeta(this, data);
  const map = arMap.getMap(this, data);
  const documentHead = documentHeader.getHeader(this, data, mapMeta);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);


  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="overview">
      ${pageHead}
      <main data-js-on-load-action="fade-in">
        ${data.content}
        ${map}
      </main>
      ${pageFoot}
    </body>
  </html>`;
};
