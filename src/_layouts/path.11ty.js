exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');

  const getData = (collections, pattern) => collections.filter((item) => {
    const { url } = item;
    const extendedPattern = `${pattern}/.*[a-zA-Z0-9]/`;
    return url.match(extendedPattern);
  });

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

  const pathData = getData(data.collections.sorted, data.page.fileSlug);
  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const pathItems = createPathItems(pathData);

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="path">
      ${pageHead}
      <main data-js-on-load-action="move-left">
        ${pathItems}
      </main>
      ${pageFoot}
    </body>
  </html>`;
};
