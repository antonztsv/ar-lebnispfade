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

    /*const overviewItems = collection.map((item) => {
      const contentUrl = this.getContentUrl(item.url);
      const imageUrl = `${contentUrl}images/${item.data.image}`;
      return `<li style="background-image: url(${imageUrl})"><a href="${contentUrl}">${item.data.title}</a></li>`;
    });*/

    const POIs = pathData.map((poi) => {
      const { data } = poi;
      if (data.status === 'hidden') return '';
      if (data.status === 'hidden') return '';

      const contentUrl = `..${poi.url}`;
      const imageUrl = `./images/${poi.data.image}`;

      return `<li style="background-image: url(${imageUrl})"><a href="${contentUrl}"><p class="title">${poi.data.title}</p></a></li>`;
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
      <main>
        ${pathItems}
      </main>
      ${pageFoot}
    </body>
  </html>`;
};
