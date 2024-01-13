exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const pageAside = require('./components/aside.11ty');
  const utils = require('./components/utils.11ty');

  const createPathItems = (pathData) => {

    const POIs = pathData.map((poi) => {
      const { data } = poi;
      if (data.status === 'hidden') return '';
      if (data.status === 'hidden') return '';

      const contentUrl = `..${poi.url}`;
      const imageUrl = `./images/${poi.data.image}`;

      return `<li style="background-image: url(${imageUrl})"><a data-js-action-on-touch="move-left" href="${contentUrl}"><p class="title">${poi.data.title}</p></a></li>`;
    });

    return `
    <ul class="item-list">
      ${POIs.join("\n")}
    </ul>`;
  }

  const pathData = utils.getPoiData(data.collections.sorted, data.page.fileSlug);
  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const pathItems = createPathItems(pathData);
  const aside = pageAside.getAside(this, data);

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="path">
      <div class="device-wrapper">
        <div class="content-wrapper">
          ${pageHead}
          <main data-js-on-load-action="move-left">
            ${pathItems}
  
            <div class="info">
              <p>
              Hier findest Sie unsere ARlebnisse für den ARlebnispfad <em>${data.title}</em>. Für die meisten ARlebnisse brauchen Sie ein Smartphone, eine Internetverbindung und musst an der entsprechenden Stelle sein. Viel Spaß 🙌🏽
              </p>
              <p>
              Weitere <a href="https://www.vhs-nrw.de/innovationsfonds2023/">Informationen zum Projekt</a> gibt es hier.
              </p>
            </div>
          </main>
          ${pageFoot}
        </div>
      </div>

      ${aside}
      
    </body>
  </html>`;
};
