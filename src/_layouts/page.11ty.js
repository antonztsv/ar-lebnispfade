exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const pageAside = require('./components/aside.11ty');

  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const aside = pageAside.getAside(this, data);

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="page ${data.bodyClass}">
      <div class="device-wrapper">
        ${pageHead}
        <main>
          ${data.content}
        </main>
        ${pageFoot}
      </div>

      ${aside}
      
    </body>
  </html>`;
};
