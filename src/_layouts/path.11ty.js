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
      const imageUrl = `./images/small/${poi.data.image}`;

      return `
        <li class="arlebnis-item" style="background-image: url(${imageUrl})">
          <a data-js-action-on-touch="move-left" href="${contentUrl}">
            <p class="title">
              <span class="title-text">
                ${poi.data.title}
              </span>
            </p>
          </a>
        </li>`;
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
        ${pageHead}
        <main data-js-on-load-action="move-left">
          ${pathItems}  
          <div class="info">
            <p>
            Hier finden Sie unsere ARlebnisse für den ARlebnispfad <em>${data.title}</em>. Für die meisten ARlebnisse brauchen Sie ein Smartphone, eine Internetverbindung und Sie müssen an der entsprechenden Stelle sein. Viel Spaß 🙌🏽
            </p>
            <p>
            Weitere Informationen zum Projekt finden Sie <a href="http://localhost:8080/ueber-das-projekt/">hier in der App.</a><br>
             Zusätzliche finden Sie ein Video zum Projekt mit Interviews <a href="https://www.vhs-nrw.de/innovationsfonds2023/">hier</a>. Sie müssen auf dieser Seite bitte nach unten scrollen und auf das Video der VHS Oberberg klicken.
            </p>
          </div>
        </main>
        ${pageFoot}
      </div>

      ${aside}
      
    </body>
  </html>`;
};
